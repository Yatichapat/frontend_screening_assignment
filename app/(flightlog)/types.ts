export interface FlightLog {
  passengerName: string;
  airport: string;
  timestamp: string | number;
  type: "departure" | "arrival";
}

export interface FlightLogPair {
  departureLog: FlightLog;
  arrivalLog: FlightLog;
}

export interface FlightLogRow {
  passengerName: string;
  route: string;
  departureTimestamp: string | number;
  arrivalTimestamp: string | number;
  durationSeconds: number | null;
}