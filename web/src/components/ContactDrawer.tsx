"use client";

import { FormEvent, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "phone" | "message", boolean>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\-\s]{6,30}$/;

interface ContactDrawerProps {
    open: boolean;
    onClose: () => void;
}

const fieldClass =
    "w-full bg-white/60 border px-4 py-3 text-body text-ink-primary font-sans placeholder:text-ink-tertiary/70 outline-none transition-colors focus:border-accent";

export function ContactDrawer({ open, onClose }: ContactDrawerProps) {
    const t = useTranslations("ContactForm");
    const locale = useLocale();

    const [status, setStatus] = useState<Status>("idle");
    const [errors, setErrors] = useState<Errors>({});
    const [values, setValues] = useState({ name: "", email: "", phone: "", message: "", website: "" });
    const startedAt = useRef(0);
    const panelRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const returnFocus = useRef<HTMLElement | null>(null);

    const mounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );

    // Open lifecycle: scroll lock, focus, form timestamp.
    useEffect(() => {
        if (!open) return;
        returnFocus.current = document.activeElement as HTMLElement | null;
        startedAt.current = Date.now();
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const focusTimer = window.setTimeout(() => nameRef.current?.focus(), 350);

        return () => {
            document.body.style.overflow = prevOverflow;
            window.clearTimeout(focusTimer);
            returnFocus.current?.focus?.();
        };
    }, [open]);

    // Esc + focus trap.
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
                return;
            }
            if (e.key !== "Tab" || !panelRef.current) return;
            const focusable = panelRef.current.querySelectorAll<HTMLElement>(
                'button:not([disabled]), input:not([tabindex="-1"]), textarea, a[href]'
            );
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    // Reset after closing (once the exit animation is done).
    const handleExitComplete = () => {
        setStatus("idle");
        setErrors({});
        setValues((v) => (status === "success" ? { name: "", email: "", phone: "", message: "", website: "" } : v));
    };

    const validate = (v = values): Errors => {
        const e: Errors = {};
        if (v.name.trim().length < 2) e.name = true;
        if (!EMAIL_RE.test(v.email.trim())) e.email = true;
        if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) e.phone = true;
        if (v.message.trim().length < 10) e.message = true;
        return e;
    };

    const setField = (key: keyof typeof values) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const next = { ...values, [key]: e.target.value };
        setValues(next);
        if (key in errors) setErrors(validate(next));
    };

    const onBlurField = (key: keyof Errors) => () => {
        const e = validate();
        setErrors((prev) => ({ ...prev, [key]: e[key] }));
    };

    const onSubmit = async (ev: FormEvent) => {
        ev.preventDefault();
        if (status === "submitting") return;
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length) {
            const firstKey = (["name", "email", "phone", "message"] as const).find((k) => e[k]);
            if (firstKey) panelRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
            return;
        }

        setStatus("submitting");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...values, locale, startedAt: startedAt.current }),
            });
            if (!res.ok) throw new Error(String(res.status));
            setStatus("success");
        } catch {
            setStatus("error");
        }
    };

    const border = (k: keyof Errors) => (errors[k] ? "border-red-600/70" : "border-border/30");

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence onExitComplete={handleExitComplete}>
            {open && (
                <div className="fixed inset-0 z-[100]">
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
                        aria-hidden="true"
                    />
                    <motion.div
                        key="panel"
                        ref={panelRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="contact-drawer-title"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute right-0 top-0 h-[100dvh] w-full md:w-[520px] bg-[#F9F9F7] text-[#1A1A1A] overflow-y-auto shadow-[-20px_0_60px_rgba(0,0,0,0.15)]"
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label={t("close")}
                            className="absolute top-5 right-5 md:top-8 md:right-8 w-11 h-11 flex items-center justify-center text-ink-primary hover:text-accent transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="px-6 md:px-12 pt-20 md:pt-24 pb-10 md:pb-12">
                            {status === "success" ? (
                                <div className="space-y-6" role="status">
                                    <span className="hero-tag !mb-0">{t("overline")}</span>
                                    <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                                        <Check className="w-6 h-6" />
                                    </div>
                                    <h2 id="contact-drawer-title" className="section-title">{t("success_title")}</h2>
                                    <p className="text-body-lg text-ink-secondary text-pretty">{t("success_body")}</p>
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="w-full bg-ink-fixed text-[#F9F9F7] py-4 font-sans font-medium hover:bg-black transition-colors"
                                    >
                                        {t("success_close")}
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-4 mb-8">
                                        <span className="hero-tag !mb-0">{t("overline")}</span>
                                        <h2 id="contact-drawer-title" className="section-title">{t("title")}</h2>
                                        <p className="text-body text-ink-secondary text-pretty">{t("subtitle")}</p>
                                    </div>

                                    <form onSubmit={onSubmit} noValidate className="space-y-5">
                                        <Field id="cf-name" label={`${t("name")} *`} error={errors.name && t("err_name")}>
                                            <input
                                                ref={nameRef}
                                                id="cf-name"
                                                name="name"
                                                type="text"
                                                autoComplete="name"
                                                maxLength={100}
                                                value={values.name}
                                                onChange={setField("name")}
                                                onBlur={onBlurField("name")}
                                                aria-invalid={!!errors.name}
                                                aria-describedby={errors.name ? "cf-name-err" : undefined}
                                                className={`${fieldClass} ${border("name")}`}
                                            />
                                        </Field>
                                        <Field id="cf-email" label={`${t("email")} *`} error={errors.email && t("err_email")}>
                                            <input
                                                id="cf-email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                maxLength={200}
                                                value={values.email}
                                                onChange={setField("email")}
                                                onBlur={onBlurField("email")}
                                                aria-invalid={!!errors.email}
                                                aria-describedby={errors.email ? "cf-email-err" : undefined}
                                                className={`${fieldClass} ${border("email")}`}
                                            />
                                        </Field>
                                        <Field id="cf-phone" label={t("phone")} error={errors.phone && t("err_phone")}>
                                            <input
                                                id="cf-phone"
                                                name="phone"
                                                type="tel"
                                                autoComplete="tel"
                                                maxLength={30}
                                                value={values.phone}
                                                onChange={setField("phone")}
                                                onBlur={onBlurField("phone")}
                                                aria-invalid={!!errors.phone}
                                                aria-describedby={errors.phone ? "cf-phone-err" : undefined}
                                                className={`${fieldClass} ${border("phone")}`}
                                            />
                                        </Field>
                                        <Field id="cf-message" label={`${t("message")} *`} error={errors.message && t("err_message")}>
                                            <textarea
                                                id="cf-message"
                                                name="message"
                                                rows={5}
                                                maxLength={3000}
                                                placeholder={t("message_placeholder")}
                                                value={values.message}
                                                onChange={setField("message")}
                                                onBlur={onBlurField("message")}
                                                aria-invalid={!!errors.message}
                                                aria-describedby={errors.message ? "cf-message-err" : undefined}
                                                className={`${fieldClass} ${border("message")} resize-y min-h-[140px]`}
                                            />
                                        </Field>

                                        {/* Honeypot: hidden from humans and assistive tech */}
                                        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                                            <label>
                                                Website
                                                <input
                                                    type="text"
                                                    name="website"
                                                    tabIndex={-1}
                                                    autoComplete="off"
                                                    value={values.website}
                                                    onChange={setField("website")}
                                                />
                                            </label>
                                        </div>

                                        {status === "error" && (
                                            <p role="alert" className="text-body-sm text-red-700 border border-red-700/30 bg-red-50 px-4 py-3">
                                                {t("error_generic")}
                                            </p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === "submitting"}
                                            className="w-full bg-ink-fixed text-[#F9F9F7] py-4 font-sans font-medium hover:bg-black transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                        >
                                            {status === "submitting" ? t("submitting") : t("submit")}
                                        </button>
                                        <p className="text-body-sm text-ink-tertiary">{t("privacy")}</p>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}

function Field({
    id,
    label,
    error,
    children,
}: {
    id: string;
    label: string;
    error?: string | false;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="block font-sans text-sm font-medium text-ink-primary">
                {label}
            </label>
            {children}
            {error && (
                <p id={`${id}-err`} className="text-body-sm text-red-700">
                    {error}
                </p>
            )}
        </div>
    );
}
