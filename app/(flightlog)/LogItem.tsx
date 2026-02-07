function formatTimestamp(timestamp: string | number): string {
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

function formatMaybeTimestamp(timestamp: string | number): string {
  if (timestamp === "" || timestamp === null || timestamp === undefined) {
    return "-";
  }

  const parsed = Number(timestamp);
  if (Number.isNaN(parsed)) {
    return "-";
  }

  return formatTimestamp(parsed);
}

function formatDuration(seconds: number | null): string {
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

function LogItem(props: {
  item: {
    passengerName: string;
    route: string;
    departureTimestamp: string;
    arrivalTimestamp: string;
    durationSeconds: number | null;
  };
}) {
  const { item } = props;
  return (
    <div className="grid grid-cols-5 gap-4 rounded-lg border border-slate-100 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
      <span className="font-medium text-slate-900">{item.passengerName}</span>
      <span className="capitalize">{item.route}</span>
      <span>{formatMaybeTimestamp(item.departureTimestamp)}</span>
      <span>{formatMaybeTimestamp(item.arrivalTimestamp)}</span>
      <span className="font-semibold text-slate-600">
        {formatDuration(item.durationSeconds)}
      </span>
    </div>
  );
}

export default LogItem;
