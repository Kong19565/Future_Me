import type { ReactNode } from "react";
import ChatAvatar from "@/components/chat/ChatAvatar";

export default function AssessmentTimelineMessage({
  role,
  questionId,
  kind,
  label,
  answerValue,
  active = false,
  showAvatar = true,
  children,
}: {
  role: "assistant" | "user";
  questionId: string;
  kind: "question" | "answer";
  label: string;
  answerValue?: string;
  active?: boolean;
  showAvatar?: boolean;
  children: ReactNode;
}) {
  const assistant = role === "assistant";
  const pointsToMascot = assistant && !showAvatar;

  return (
    <article
      aria-label={label}
      data-active={active ? "true" : "false"}
      data-answer-value={answerValue}
      data-message-kind={kind}
      data-question-id={questionId}
      data-role={role}
      data-side={assistant ? "left" : "right"}
      data-testid={`interview-message-${role}`}
      className={`flex w-full min-w-0 flex-col ${assistant ? "items-start" : "items-end"}`}
    >
      <div
        data-bubble-side={assistant ? "left" : "right"}
        data-testid={`interview-bubble-${role}`}
        className={[
          "relative min-w-0 rounded-[20px] border px-4 py-3 text-sm leading-relaxed shadow-[var(--shadow-card)] sm:px-5 sm:py-4",
          showAvatar ? "max-w-[calc(100%_-_2.5rem)] sm:max-w-[82%]" : "max-w-full",
          assistant
            ? `${showAvatar ? "ml-10 sm:ml-12" : "interview-active-bot-bubble"} rounded-bl-control border-line bg-surface2 text-ink`
            : "mr-10 rounded-br-control border-me bg-me text-white sm:mr-12",
        ].join(" ")}
      >
        <span
          aria-hidden="true"
          data-tail-target={pointsToMascot ? "mascot" : "avatar"}
          data-testid={`interview-tail-${role}`}
          className={
            pointsToMascot
              ? "interview-active-bot-tail absolute -top-[9px] left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l-2 border-t-2 border-indigo/70 sm:-left-[9px] sm:top-1/2 sm:translate-x-0 sm:-translate-y-1/2 sm:border-b-2 sm:border-t-0"
              : `absolute -bottom-[9px] h-4 w-4 rotate-45 border-b-2 border-r-2 ${
                  assistant
                    ? "left-7 border-line bg-surface2"
                    : "right-7 border-me bg-me"
                }`
          }
        />
        <p className={`mb-1.5 text-[11px] font-bold ${assistant ? "text-indigoText" : "text-white"}`}>
          {label}
        </p>
        <div className="min-w-0 whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
          {children}
        </div>
      </div>

      {showAvatar ? (
        <div className={assistant ? "ml-2 mt-3" : "mr-2 mt-3"}>
          <ChatAvatar role={role} />
        </div>
      ) : null}
    </article>
  );
}
