import { useState, useEffect } from "react";
import LogItem from "./LogItem";

function LogCard(props: { data: any[] }) {
  const { data } = props;
  const [logs, setLogs] = useState(data);

  useEffect(() => {
    setLogs(data);
  }, [data]);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-4 gap-4 rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-slate-600">
        <span>Passenger Name</span>
        <span>Airport</span>
        <span>Timestamp</span>
        <span>Type</span>
      </div>
      <div className="flex flex-col gap-2">
        {logs.map((item) => (
          <LogItem
            key={`${item.passengerName}-${item.airport}-${item.timestamp}-${item.type}`}
            item={item}
          ></LogItem>
        ))}
      </div>
    </div>
  );
}

export default LogCard;
