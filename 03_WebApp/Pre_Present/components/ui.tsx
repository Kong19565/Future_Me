"use client";

import Link from "next/link";
import type { EvidenceStrength } from "@/lib/decision-engine/types";
import { useT } from "@/components/PreferencesProvider";
import PreferenceControls from "@/components/PreferenceControls";

export function Shell({
  children,
  step,
}: {
  children: React.ReactNode;
  step?: 1 | 2 | 3 | 4 | 5;
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-6 sm:px-6 sm:py-10">
      <Header />
      {step ? <Steps current={step} /> : null}
      <main id="main" className="flex-1 pt-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  const t = useT();
  return (
    <header className="flex flex-wrap items-center justify-between gap-3">
      <Link href="/" className="flex items-center gap-3">
        <span
          aria-hidden
          className="grid h-9 w-9 place-items-center rounded-[12px] bg-gradient-to-br from-indigo via-magenta to-coral"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-canvas">
            <span className="h-2 w-2 rounded-full bg-mint" />
          </span>
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-bold">{t.chrome.productName}</span>
          <span className="block text-[11px] font-semibold tracking-widest text-muted">
            {t.chrome.productTag}
          </span>
        </span>
      </Link>
      <div className="flex flex-wrap items-center gap-2">
        <PreferenceControls />
        {/* The footer carries the same disclaimer on every page; on a phone this
            row was pushing the actual content down. */}
        <span className="hidden rounded-full border border-line bg-surface px-3 py-1 text-[11px] font-semibold text-muted sm:inline">

          {t.chrome.demoBadge}
        </span>
      </div>
    </header>
  );
}

export function Steps({ current }: { current: number }) {
  const t = useT();
  const phases = [
    t.chrome.phases.answer,
    t.chrome.phases.try,
    t.chrome.phases.compare,
    t.chrome.phases.act,
  ];
  // Five screens, four things a learner is doing: routes and compare are both
  // the act of weighing options, so they share a stop on the line.
  const currentPhase = [0, 1, 2, 2, 3][current - 1] ?? 0;
  return (
    <nav aria-label={t.chrome.progressLabel} className="mx-auto mt-6 w-full max-w-md">
      <ol className="grid grid-cols-4 text-xs sm:text-sm" data-testid="journey-steps">
        {phases.map((label, i) => {
          const state = i < currentPhase ? "done" : i === currentPhase ? "current" : "todo";
          return (
            <li
              key={label}
              aria-current={state === "current" ? "step" : undefined}
              data-state={state}
              className={[
                "relative flex flex-col items-center gap-1",
                state === "current"
                  ? "font-bold text-mint"
                  : state === "done"
                    ? "text-ink"
                    : "text-muted",
              ].join(" ")}
            >
              {i > 0 ? (
                <span
                  aria-hidden
                  className={`absolute right-1/2 top-[6px] w-full border-t-[3px] border-dashed ${
                    i <= currentPhase ? "border-mint" : "border-line"
                  }`}
                />
              ) : null}
              <span
                aria-hidden
                className={[
                  "relative z-10 h-4 w-4 rounded-full border-[3px]",
                  state === "todo"
                    ? "border-line bg-surface"
                    : "border-mint bg-mint",
                  state === "current" ? "ring-4 ring-surface2" : "",
                ].join(" ")}
              />
              <span>{label}</span>
              {state === "done" ? <span className="sr-only">{t.chrome.stepCompleted}</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function Footer() {
  const t = useT();
  return (
    <footer className="mt-12 border-t border-line pt-5 text-xs text-muted">
      <p>{t.chrome.footerDisclaimer}</p>
      <p className="mt-2">
        <Link href="/privacy" className="text-mint underline underline-offset-2">
          {t.chrome.privacyLink}
        </Link>
      </p>
    </footer>
  );
}

export function Card({
  children,
  className = "",
  as: Tag = "div",
  testId,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "li";
  /**
   * A `data-testid` written on `<Card>` used to vanish: the component named its
   * props explicitly and never spread the rest, so the attribute was dropped
   * without a type error and the test failed looking for an element that had
   * quietly lost its handle.
   */
  testId?: string;
}) {
  return (
    <Tag
      className={`rounded-card border border-line bg-surface p-5 ${className}`}
      data-testid={testId}
    >
      {children}
    </Tag>
  );
}

export function Button({
  children,
  onClick,
  href,
  variant = "primary",
  disabled,
  type = "button",
  className = "",
  ...rest
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "coral";
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
} & Record<string, unknown>) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-40";
  const styles =
    variant === "primary"
      ? "bg-mint text-mintInk hover:bg-mint/90"
      : variant === "coral"
        ? "bg-coral text-canvas hover:bg-coral/90"
        : "border border-line bg-surface2 text-ink hover:border-muted";
  const cls = `${base} ${styles} ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls} {...rest}>
      {children}
    </button>
  );
}

const STRENGTH_STYLE: Record<EvidenceStrength, string> = {
  strong: "border-mint/50 text-mint",
  moderate: "border-indigo/60 text-indigoText",
  limited: "border-warning/50 text-warning",
  insufficient: "border-line text-muted",
};

/**
 * Evidence strength never relies on colour alone — it always carries the shape
 * marker and the word, so it survives greyscale and colour blindness.
 */
export function EvidenceBadge({
  strength,
  label,
}: {
  strength: EvidenceStrength;
  label: string;
}) {
  const bars = { strong: "▮▮▮", moderate: "▮▮▯", limited: "▮▯▯", insufficient: "▯▯▯" }[strength];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${STRENGTH_STYLE[strength]}`}
    >
      <span aria-hidden className="tracking-[0.15em]">
        {bars}
      </span>
      <span>{label}</span>
    </span>
  );
}

export function Notice({
  tone = "info",
  title,
  children,
}: {
  tone?: "info" | "warning";
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      role="note"
      className={`rounded-control border px-4 py-3 text-sm ${
        tone === "warning" ? "border-warning/40 bg-warning/5" : "border-line bg-surface2"
      }`}
    >
      {title ? <p className="mb-1 font-bold">{title}</p> : null}
      <div className="text-muted">{children}</div>
    </div>
  );
}
