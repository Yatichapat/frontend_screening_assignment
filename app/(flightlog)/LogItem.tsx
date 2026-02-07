import { formatMaybeTimestamp, formatDuration } from "./utils";
import { FlightLogRow } from "./types";

function LogItem(props: { item: FlightLogRow }) {
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
