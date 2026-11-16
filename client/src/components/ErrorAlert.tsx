import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert.tsx";

type Props =
  | { message: string; error?: never; fallback?: never }
  | { error: unknown; fallback: string; message?: never };

// Pulls the `{ error }` message out of an Axios error response, if there is one.
// Checked structurally (not with axios.isAxiosError) so it still works when axios is mocked in tests.
function getErrorMessage(error: unknown): string | undefined {
  if (typeof error !== "object" || error === null || !("response" in error)) return undefined;
  const data = (error as { response?: { data?: unknown } }).response?.data;
  if (typeof data === "object" && data !== null && "error" in data && typeof data.error === "string") {
    return data.error;
  }
  return undefined;
}

export default function ErrorAlert(props: Props) {
  const message = props.message ?? getErrorMessage(props.error) ?? props.fallback;

  return (
    <Alert variant="destructive">
      <AlertCircle />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
