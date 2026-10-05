import { NextResponse } from "next/server";

export const runtime = "nodejs";

const LIMITS = { name: 100, email: 200, phone: 30, message: 3000 };
const MIN_FILL_MS = 3000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;

// Best-effort in-memory rate limit (per server instance).
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
    recent.push(now);
    hits.set(ip, recent);
    return recent.length > RATE_MAX;
}

function escapeHtml(s: string) {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\-\s]{6,30}$/;

export async function POST(req: Request) {
    let body: Record<string, unknown>;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ ok: false }, { status: 400 });
    }

    // Honeypot: pretend success so bots don't retry.
    if (typeof body.website === "string" && body.website.trim() !== "") {
        return NextResponse.json({ ok: true });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    if (rateLimited(ip)) {
        return NextResponse.json({ ok: false }, { status: 429 });
    }

    const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
    const name = str(body.name);
    const email = str(body.email);
    const phone = str(body.phone);
    const message = str(body.message);
    const locale = body.locale === "en" ? "en" : "pt";
    const startedAt = Number(body.startedAt);

    const errors: Record<string, true> = {};
    if (name.length < 2 || name.length > LIMITS.name) errors.name = true;
    if (!EMAIL_RE.test(email) || email.length > LIMITS.email) errors.email = true;
    if (phone && (!PHONE_RE.test(phone) || phone.length > LIMITS.phone)) errors.phone = true;
    if (message.length < 10 || message.length > LIMITS.message) errors.message = true;
    if (Object.keys(errors).length) {
        return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // Too-fast submissions are almost always bots.
    if (Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_MS) {
        return NextResponse.json({ ok: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL ?? "sabiolopez@gmail.com";
    const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
    const when = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

    const text = [
        `Nome: ${name}`,
        `E-mail: ${email}`,
        `Telefone: ${phone || "-"}`,
        `Idioma: ${locale}`,
        `Data: ${when}`,
        "",
        message,
    ].join("\n");

    const html = `
<div style="font-family:system-ui,sans-serif;font-size:15px;color:#1a1a1a;line-height:1.5">
  <p><strong>Nome:</strong> ${escapeHtml(name)}<br>
  <strong>E-mail:</strong> ${escapeHtml(email)}<br>
  <strong>Telefone:</strong> ${escapeHtml(phone || "-")}<br>
  <strong>Idioma:</strong> ${locale}<br>
  <strong>Data:</strong> ${escapeHtml(when)}</p>
  <hr style="border:none;border-top:1px solid #ddd">
  <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
</div>`;

    // Dev fallback: no key configured, log instead of sending.
    if (!apiKey) {
        console.log("[contact] RESEND_API_KEY not set, payload:\n" + text);
        return NextResponse.json({ ok: true });
    }

    try {
        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: `Site Sabio Lopez <${from}>`,
                to: [to],
                reply_to: email,
                subject: `[Site] Novo contato: ${name}`.replace(/[\r\n]+/g, " "),
                text,
                html,
            }),
        });
        if (!res.ok) {
            console.error("[contact] Resend error", res.status, await res.text());
            return NextResponse.json({ ok: false }, { status: 500 });
        }
    } catch (err) {
        console.error("[contact] send failed", err);
        return NextResponse.json({ ok: false }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
}
