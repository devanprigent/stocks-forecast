import { ProjectionResult } from "@stocks-forecast/shared";
import {
  InputType,
  ENDPOINTS,
  ProjectionResultSchema,
} from "@stocks-forecast/shared";

function getBaseUrl() {
  return (
    import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? "http://localhost:3000"
  );
}

function serializeBody(body: unknown) {
  if (
    body instanceof FormData ||
    typeof body === "string" ||
    body === undefined
  ) {
    return body;
  }

  return JSON.stringify(body);
}

export async function getDatasets(input: InputType): Promise<ProjectionResult> {
  const baseUrl = getBaseUrl();
  const path = ENDPOINTS.FORECAST;

  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: serializeBody(input),
  });
  const json = await response.json();
  const data = ProjectionResultSchema.parse(json);
  return data;
}
