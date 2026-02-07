export function formatTimestamp(timestamp: string | number): string {
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function formatMaybeTimestamp(timestamp: string | number): string {
  if (timestamp === "" || timestamp === null || timestamp === undefined) {
    return "-";
  }

  const parsed = Number(timestamp);
  if (Number.isNaN(parsed)) {
    return "-";
  }

  return formatTimestamp(parsed);
}

export function formatDuration(seconds: number | null): string {
  if (seconds === null || Number.isNaN(seconds)) {
    return "-";
  }

  if (seconds < 60) {
    return `${Math.round(seconds)} sec`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${Math.round(minutes)} min`;
  }

  const hours = Math.floor(minutes / 60);
  return `${Math.round(hours)} hours`;
}

export function toUnixSeconds(value: string): string {
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) {
    return "";
  }

  return Math.floor(parsed / 1000).toString();
}
