import type { Ref } from "react";
import { Button } from "@/components/ui";

export default function ChatComposer({
  value,
  onChange,
  onSubmit,
  disabled,
  labels,
  maxLength,
  inputRef,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  labels: {
    label: string;
    placeholder: string;
    hint: string;
    send: string;
    sending: string;
  };
  maxLength: number;
  inputRef?: Ref<HTMLTextAreaElement>;
}) {
  return (
    <form
      className="border-t border-line bg-surface p-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <label htmlFor="chat-input" className="text-xs font-bold text-muted">
        {labels.label}
      </label>
      <textarea
        ref={inputRef}
        id="chat-input"
        data-testid="chat-input"
        rows={3}
        maxLength={maxLength}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        placeholder={labels.placeholder}
        aria-describedby="chat-input-hint chat-input-count"
        className="mt-2 w-full resize-y rounded-control border border-line bg-surface px-4 py-3 text-sm leading-relaxed text-ink transition placeholder:text-muted/80 hover:border-muted focus:border-mint focus:ring-2 focus:ring-mint/20 disabled:cursor-not-allowed disabled:opacity-60"
      />
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <div className="text-[11px] text-muted">
          <span id="chat-input-hint">{labels.hint}</span>
          <span id="chat-input-count" className="ml-2 tabular-nums">
            {value.length}/{maxLength}
          </span>
        </div>
        <Button
          type="submit"
          variant="coral"
          disabled={disabled || value.trim().length === 0}
          data-testid="chat-send"
        >
          {disabled ? labels.sending : labels.send}
        </Button>
      </div>
    </form>
  );
}
