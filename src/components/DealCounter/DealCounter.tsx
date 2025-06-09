"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState, useCallback } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

interface DealCountProps {
  endDate: string | number | Date;
}

const DealCount: React.FC<DealCountProps> = ({ endDate }) => {
  const t = useTranslations("hurryUp");

  const calculateTimeLeft = useCallback((): TimeLeft | null => {
    const difference = +new Date(endDate) - +new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return null; // expired
  }, [endDate]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft();
      setTimeLeft(updatedTimeLeft);

      if (!updatedTimeLeft) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  if (!timeLeft) {
    return <p className="text-red-600 font-semibold">{t("expired")}</p>;
  }

  return (
    <div className="text-gray-600 font-medium flex items-center gap-4">
      <span className="text-lg font-bold">{t("offer")}:</span>
      <div className="flex gap-4 text-center text-gray-600 font-bold">
        <TimeBox label={t("Days")} value={timeLeft.days} />
        <TimeBox label={t("Hours")} value={timeLeft.hours} />
        <TimeBox label={t("Minutes")} value={timeLeft.minutes} />
        <TimeBox label={t("Seconds")} value={timeLeft.seconds} />
      </div>
    </div>
  );
};

const TimeBox: React.FC<{ label: string; value: number }> = ({
  label,
  value,
}) => (
  <div className="bg-gray-200 text-sm rounded-lg px-2 py-1">
    <div className="text-lg">{value}</div>
    <div className="uppercase text-xs">{label}</div>
  </div>
);

export default DealCount;
