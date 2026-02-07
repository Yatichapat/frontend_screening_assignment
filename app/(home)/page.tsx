"use client";

import { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import { FlightLogService } from "../(flightlog)/fightlog.service";
import LogCard from "../(flightlog)/LogCard";
import LogForm from "../(flightlog)/LogForm";
// import BoardingPassCard from "../(boardingpass)/BoardingPassCard";

const flightLogService = new FlightLogService();

function formatDuration(seconds: number): string {
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


export default function Home() {
  const [logs, setLogs] = useState<any[]>([]);
  const [avgTimes, setAvgTimes] = useState<Record<string, number>>({});

  const handleAddLog = useCallback(
    (departureLog: any, arrivalLog: any) => {
      setLogs((prev) => [...prev, departureLog, arrivalLog]);
  },
  []
  );

  useEffect(() => {
    const fetch = async () => {
      const data = await flightLogService.getLogs();
      setLogs(data as any[]);
    };

    fetch();
  }, []);

  useEffect(() => {
  const departures: Record<string, any> = {};
  const routes: Record<string, { sum: number; count: number }> = {};

  logs.forEach((log) => {
    if (log.type === "departure") {
      // collect latest departure per passenger
      departures[log.passengerName] = log;
    }

    if (log.type === "arrival") {
      const departure = departures[log.passengerName];
      if (!departure) return; // not found matching departure

      const routeKey = `${departure.airport} to ${log.airport}`;

      const duration =
        Number(log.timestamp) - Number(departure.timestamp);

      if (!routes[routeKey]) {
        routes[routeKey] = { sum: 0, count: 0 };
      }

      routes[routeKey].sum += duration;
      routes[routeKey].count += 1;

          // remove the departure once matched
      delete departures[log.passengerName];
    }
  });

  const result: Record<string, number> = {};

  Object.entries(routes).forEach(([route, { sum, count }]) => {
    result[route] = sum / count;
  });

  setAvgTimes(result);
}, [logs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-sky-50 to-rose-50">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12">
        <div className="flex flex-col items-start gap-3">
          <div className="flex w-full justify-center">
            <span className="text-black text-6xl font-bold">
              Welcome to
            </span>
            <span className="mx-3 text-blue-800 text-6xl font-bold">
              Next Airline!
            </span>
          </div>

          <div className="flex w-full justify-center">
            <p className="max-w-2xl text-center text-base text-slate-600">
              Track departures and arrivals in real time. Review your logs, then
              calculate average travel time by route.
            </p>
          </div>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-slate-200/60 backdrop-blur">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            Booking Form
          </h2>
          <LogForm data={logs} onSubmit={handleAddLog}></LogForm>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-slate-200/60 backdrop-blur">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-slate-900">Flight Logs</h2>
            </div>
            <LogCard data={logs}></LogCard>
          </div>
        </section>

        {/* Render boarding pass here */}
        {/* {[].map((_, i) => ( */}
        {/*   <BoardingPassCard key={i} /> */}
        {/* ))} */}
      </main>

      <footer className="border-t border-slate-200/80 bg-white/70 px-6 py-6">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto flex w-full max-w-6xl items-center justify-center gap-3 text-sm font-medium text-slate-500"
        >
          Powered by <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  );
}
