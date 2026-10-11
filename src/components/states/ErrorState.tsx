import { Icon } from "@/components/basics/Icon";
import { useRouteError } from "react-router-dom";
import { Button } from "@/components/basics/Button";

export interface ErrorStateProps {
  title?: string;
  /** The detail a person could actually act on or paste into a report. */
  detail?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something broke on this screen",
  detail,
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center rounded-xl"
      style={{
        padding: "64px 24px",
        background: "#FFFFFF",
        border: "1px solid #EAEAEF",
      }}
    >
      <div
        className="flex items-center justify-center rounded-full mb-4"
        style={{ width: 40, height: 40, background: "#FBECEC" }}
      >
        <Icon name="alert" size={20} color="#D64545" />
      </div>
      <h3
        className="text-text-primary"
        style={{
          fontSize: 17,
          fontWeight: 600,
          fontFamily: "var(--font-tight)",
          margin: "0 0 6px",
        }}
      >
        {title}
      </h3>
      <p
        className="text-text-secondary"
        style={{ fontSize: 13, margin: 0, maxWidth: 420, lineHeight: "20px" }}
      >
        Your data is safe — this is a display problem, not a delivery one.
      </p>
      {detail && (
        <pre
          className="text-text-tertiary mt-4 rounded-lg px-3 py-2 text-left overflow-auto"
          style={{
            fontSize: 11,
            fontFamily: "var(--font-mono)",
            background: "#F7F7F9",
            border: "1px solid #EAEAEF",
            maxWidth: 480,
            margin: "16px 0 0",
          }}
        >
          {detail}
        </pre>
      )}
      <div className="mt-5">
        <Button
          variant="secondary"
          size="sm"
          onClick={onRetry ?? (() => window.location.reload())}
        >
          Reload
        </Button>
      </div>
    </div>
  );
}

/**
 * Router boundary version — pulls the thrown error out of the router rather
 * than taking it as a prop.
 */
export function RouteErrorState() {
  const error = useRouteError();
  const detail =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : undefined;

  return (
    <div className="p-8">
      <ErrorState detail={detail} />
    </div>
  );
}

export default ErrorState;
