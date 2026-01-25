"use client";
import React, { useState, useEffect } from "react";

const DigitalClock = (): React.ReactElement => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Europe/Madrid",
  });

  const formattedTime = formatter.format(time);

  return (
    <time className="hidden md:block min-w-[120px] text-center align-middle" suppressHydrationWarning>
      Barcelona {formattedTime}
    </time>
  );
};

export default DigitalClock;
