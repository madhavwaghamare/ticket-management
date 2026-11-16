import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { HealthResponse } from "core/types/api";
import ErrorAlert from "@/components/ErrorAlert.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";

export default function HomePage() {
  const health = useQuery({
    queryKey: ["health"],
    queryFn: async () => (await axios.get<HealthResponse>("/api/health")).data,
  });

  return (
    <main className="min-h-screen bg-muted p-8 text-foreground">
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Helpdesk</CardTitle>
          <CardDescription>AI-powered ticket management</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            <span className="font-medium">API status: </span>
            {health.isPending && <span className="text-muted-foreground">checking…</span>}
            {health.isSuccess && <span>connected (uptime {health.data.uptimeSeconds}s)</span>}
            {health.isError && <span className="text-destructive">unreachable</span>}
          </p>
          {health.isError && <ErrorAlert error={health.error} fallback="Could not reach the API" />}
        </CardContent>
      </Card>
    </main>
  );
}
