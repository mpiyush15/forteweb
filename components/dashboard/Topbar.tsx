"use client";

import { useEffect, useState } from "react";

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
    <div className="w-full bg-white shadow-sm px-6 py-3 flex justify-between items-center">
      <p className="text-gray-800 font-semibold">👋 Welcome, {userName}</p>
      <p className="text-gray-600 text-sm font-medium">{dateTime}</p>
    </div>
  );
}