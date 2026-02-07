import { useState, useEffect, useMemo } from "react";
import LogItem from "./LogItem";
import { FlightLog, FlightLogRow } from "./types";

function LogCard(props: { data: FlightLog[] }) {
  const { data } = props;
  const [logs, setLogs] = useState<FlightLog[]>(data);

  useEffect(() => {
    setLogs(data);
  }, [data]);

  const pairedLogs = useMemo<FlightLogRow[]>(() => {
    const departures: Record<string, FlightLog> = {};
    const rows: FlightLogRow[] = [];

    const ordered = [...logs].sort(
      (a, b) => Number(a.timestamp) - Number(b.timestamp)
    );

    ordered.forEach((log) => {
      if (log.type === "departure") {
        departures[log.passengerName] = log;
        return;
      }

      if (log.type === "arrival") {
        const departure = departures[log.passengerName];
        if (!departure) {
          rows.push({
            passengerName: log.passengerName,
            route: `- -> ${log.airport}`,
            departureTimestamp: "",
            arrivalTimestamp: log.timestamp,
            durationSeconds: null,
          });
          return;
        }

        const durationSeconds =
          Number(log.timestamp) - Number(departure.timestamp);

        rows.push({
          passengerName: log.passengerName,
          route: `${departure.airport} -> ${log.airport}`,
          departureTimestamp: departure.timestamp,
          arrivalTimestamp: log.timestamp,
          durationSeconds,
        });

        delete departures[log.passengerName];
      }
    });

    Object.values(departures).forEach((departure) => {
      rows.push({
        passengerName: departure.passengerName,
        route: `${departure.airport} -> -`,
        departureTimestamp: departure.timestamp,
        arrivalTimestamp: "",
        durationSeconds: null,
      });
    });

    return rows;
  }, [logs]);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-5 gap-4 rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-slate-600">
        <span>Passenger Name</span>
        <span>Airport</span>
        <span>Departure</span>
        <span>Arrival</span>
        <span>Duration</span>
      </div>
      <div className="flex flex-col gap-2">
        {pairedLogs.map((item) => (
          <LogItem
            key={`${item.passengerName}-${item.route}-${item.departureTimestamp}-${item.arrivalTimestamp}`}
            item={item}
          ></LogItem>
        ))}
      </div>
    </div>
  );
}

export default LogCard;
