type LogLevel = "info" | "warn" | "error";

type LogPayload = Record<string, unknown>;

export function logEvent(level: LogLevel, message: string, payload: LogPayload = {}) {
  const body = {
    level,
    message,
    payload,
    timestamp: new Date().toISOString(),
  };

  console[level](JSON.stringify(body));
}
