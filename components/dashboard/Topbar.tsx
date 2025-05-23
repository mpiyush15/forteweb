"use client";

import { useEffect, useState } from "react";
import DarkModeToggle from "../DarkModeToggle";

interface TopbarProps {
  userName: string;
}

export default function Topbar({ userName }: TopbarProps) {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setDateTime(
        now.toLocaleString("en-IN", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg   px-6 py-3 flex justify-between items-center  border border-gray-200 dark:border-gray-700 backdrop-blur-md">
      <p className="font-semibold">👋 Welcome, {userName}</p>
      <DarkModeToggle />
      <p className=" text-sm font-medium">{dateTime}</p>
    </div>
  );
}