"use client";

import { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import { FlightLogService } from "../(flightlog)/fightlog.service";
import { FlightLog } from "../(flightlog)/types";
import LogCard from "../(flightlog)/LogCard";
import LogForm from "../(flightlog)/LogForm";
// import BoardingPassCard from "../(boardingpass)/BoardingPassCard";

const flightLogService = new FlightLogService();

export default function Home() {
  const [logs, setLogs] = useState<FlightLog[]>([]);

  const handleAddLog = useCallback(
    (departureLog: FlightLog, arrivalLog: FlightLog) => {
      setLogs((prev) => [...prev, departureLog, arrivalLog]);
  },
  []
  );

  useEffect(() => {
    const fetch = async () => {
      const data = await flightLogService.getLogs();
      setLogs(data);
    };

    fetch();
  }, []);

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
          <LogForm onSubmit={handleAddLog}></LogForm>
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
