"use client";

import Link from "next/link";
import { Button, Shell } from "@/components/ui";
import { Tabs } from "@/components/Tabs";
import { routeDataAsOf } from "@/lib/decision-engine";
import { useT } from "@/components/PreferencesProvider";
import FutureMeMascot from "@/components/mascot/FutureMeMascot";

/**
 * Renders a sentence with one emphasised span in the middle.
 *
 * The honest-limitations list needs a bolded phrase inside otherwise ordinary
 * prose, and where that phrase sits in the sentence differs between English and
 * Thai. Splitting on the `{strong}` placeholder keeps the emphasis attached to
 * the right words in both languages instead of hard-coding an English clause
 * order into the markup.
 */
function WithStrong({ template, strong }: { template: string; strong: string }) {
  const [before, after = ""] = template.split("{strong}");
  return (
    <>
      {before}
      <strong className="text-ink">{strong}</strong>
      {after}
    </>
  );
}

/**
 * The first screen.
 *
 * It used to open with four paragraphs, three cards and a warning panel before
 * anyone met the product. A learner arriving here has not agreed to read a
 * briefing — they are deciding whether this is worth their time at all.
 *
 * So the page leads with the character, one sentence and one action, and
 * everything that was explanation moved behind tabs. Nothing was deleted: the
 * three principles and the honest limitations are the product's position and
 * are still one click away, in panels that stay in the DOM so find-in-page and
 * screen readers still reach them.
 */
export default function Home() {
  const t = useT();

  return (
    <Shell>
      <section className="grid gap-6 pt-2 lg:grid-cols-2 lg:gap-x-12 lg:pt-8">
        <div className="lg:col-start-1 lg:row-start-1">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            {t.landing.headlineLead}
            <br />
            <span className="bg-gradient-to-r from-indigo via-magenta to-coral bg-clip-text text-transparent">
              {t.landing.headlineAccent}
            </span>
          </h1>
          <p className="mt-5 w-fit max-w-md rounded-[20px] rounded-bl-md border border-line bg-surface2 px-4 py-3 text-base leading-relaxed">
            {t.landing.heroNote}
          </p>
        </div>

        {/*
          The whole journey on one dashed line, next to the character. Decorative
          mascot still — the heading says what this is, and a screen reader does
          not need it twice. The component writes its width inline, so the
          responsive sizes need `!` to win.
        */}
        <div className="flex items-end justify-between gap-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:items-center">
          <ol className="flex flex-col gap-4 border-l-[3px] border-dashed border-mint pl-5 sm:gap-6">
            {[
              [t.chrome.phases.answer, t.landing.phaseAnswerBody],
              [t.chrome.phases.try, t.landing.phaseTryBody],
              [t.chrome.phases.compare, t.landing.phaseCompareBody],
              [t.chrome.phases.act, t.landing.phaseActBody],
            ].map(([title, body]) => (
              <li key={title}>
                <p className="text-lg font-bold">{title}</p>
                <p className="text-sm text-muted">{body}</p>
              </li>
            ))}
          </ol>
          <div data-testid="landing-mascot" className="shrink-0">
            <FutureMeMascot
              emotion="smile"
              pose="wave"
              crop="full"
              size={300}
              animated
              className="!w-[172px] sm:!w-[240px] lg:!w-[280px]"
            />
          </div>
        </div>

        {/*
          One action, named. The other three ways in are links rather than
          buttons of equal weight — four buttons side by side asked a learner to
          choose before they knew what any of them were.
        */}
        <div className="lg:col-start-1 lg:row-start-2">
          <Button
            href="/interview"
            data-testid="start-guest"
            className="w-full !py-4 text-lg lg:w-auto lg:px-10"
          >
            {t.landing.startGuest}
          </Button>
          <p className="mt-3 max-w-xl text-xs text-muted">{t.landing.noAccount}</p>
        </div>
      </section>

      <section className="mt-10">
        <Tabs
          ariaLabel={t.landing.howTitle}
          items={[
            {
              id: "how",
              label: t.landing.tabHow,
              content: (
                <div className="grid gap-5 sm:grid-cols-3">
                  <div>
                    <h3 className="text-sm font-bold">{t.landing.card1Title}</h3>
                    <p className="mt-2 text-sm text-muted">{t.landing.card1Body}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">{t.landing.card2Title}</h3>
                    <p className="mt-2 text-sm text-muted">{t.landing.card2Body}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">{t.landing.card3Title}</h3>
                    <p className="mt-2 text-sm text-muted">{t.landing.card3Body}</p>
                  </div>
                </div>
              ),
            },
            {
              id: "honest",
              label: t.landing.tabHonest,
              content: (
                <>
                  <h3 className="text-sm font-bold">{t.landing.honestTitle}</h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted">
                    <li>
                      • <WithStrong template={t.landing.honest1} strong={t.landing.honest1Strong} />
                    </li>
                    <li>
                      •{" "}
                      <WithStrong
                        template={t.landing.honest2.replace("{date}", routeDataAsOf())}
                        strong={t.landing.honest2Strong}
                      />
                    </li>
                    <li>
                      • <WithStrong template={t.landing.honest3} strong={t.landing.honest3Strong} />
                    </li>
                    <li>• {t.landing.honest4}</li>
                  </ul>
                  <p className="mt-4 flex flex-wrap gap-4 text-sm">
                    <Link href="/how-it-works" className="text-mint underline underline-offset-2">
                      {t.landing.howItWorks}
                    </Link>
                    <Link href="/privacy" className="text-mint underline underline-offset-2">
                      {t.landing.readData}
                    </Link>
                  </p>
                </>
              ),
            },
            {
              id: "more",
              label: t.landing.tabMore,
              content: (
                <>
                  <p className="text-sm text-muted">{t.landing.tabMoreBody}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button href="/chat" variant="secondary" data-testid="open-chat">
                      {t.landing.chatButton}
                    </Button>
                    <Button href="/nearby" variant="secondary" data-testid="open-nearby">
                      {t.landing.nearbyButton}
                    </Button>
                    <Button href="/privacy" variant="secondary">
                      {t.landing.whatHappens}
                    </Button>
                  </div>
                </>
              ),
            },
          ]}
        />
      </section>
    </Shell>
  );
}
