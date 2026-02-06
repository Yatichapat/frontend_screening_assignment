"use client";

import { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Home.module.css";
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
    (log: any) => {
      setLogs((prev) => [...prev, log]);
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
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next Airline!</a>
        </h1>
        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>app/(home)/page.tsx</code>
        </p>
        <div className={styles.card} style={{ margin: 16, width: "100%" }}>
          <h2>Flight Logs</h2>
          <LogCard style={{ width: "100%" }} data={logs}></LogCard>
          <button
            onClick={() => {
              console.log("Average Travel Time Per Route:");
              Object.entries(avgTimes).forEach(([route, avg]) => {
                console.log(`${route}: ${formatDuration(avg)}`);
              });
            }}
          >
            Print avg time to console
          </button>
        </div>
        <div className={styles.card} style={{ margin: 16, width: "100%" }}>
          <h2>Departure Logging</h2>
          <LogForm
            style={{ width: "100%" }}
            data={logs}
            type={"departure"}
            onSubmit={handleAddLog}
          ></LogForm>
        </div>
        <div className={styles.card} style={{ margin: 16, width: "100%" }}>
          <h2>Arrival Logging</h2>
          <LogForm
            style={{ width: "100%" }}
            data={logs}
            type={"arrival"}
            onSubmit={handleAddLog}
          ></LogForm>
        </div>
        {/* Render boarding pass here */}
        {/* {[].map((_, i) => ( */}
        {/*   <BoardingPassCard key={i} /> */}
        {/* ))} */}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
