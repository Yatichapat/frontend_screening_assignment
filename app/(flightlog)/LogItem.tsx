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
    <div style={{ display: "flex" }}>
      <span style={{ flex: 1 }}>{item.passengerName}</span>
      <span style={{ flex: 1 }}>{item.airport}</span>
      <span style={{ flex: 1 }}>{formatTimestamp(item.timestamp)}</span>
      <span style={{ flex: 1 }}>
        {item.type === "departure" ? "Departure" : "Arrival"}
      </span>
    </div>
  );
}

export default LogItem;
