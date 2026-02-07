function formatTimestamp(timestamp: string | number): string {
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleString("en-US", {
    // year: "numeric",
    // month: "short",
    // day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function LogItem(props: {
  item: {
    passengerName: string;
    airport: string;
    timestamp: string;
    type: "departure" | "arrival";
  };
}) {
  const { item } = props;
  return (
    <div className="grid grid-cols-4 gap-4 rounded-lg border border-slate-100 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
      <span className="font-medium text-slate-900">{item.passengerName}</span>
      <span className="capitalize">{item.airport}</span>
      <span>{formatTimestamp(item.timestamp)}</span>
      <span className="font-semibold text-slate-600">
        {item.type === "departure" ? "Departure" : "Arrival"}
      </span>
    </div>
  );
}

export default LogItem;
