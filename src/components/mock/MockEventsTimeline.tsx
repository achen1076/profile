"use client";

import Card from "../atoms/Card.tsx";
import {
  FaCalendar,
  FaDollarSign,
  FaBuilding,
  FaChartLine,
} from "react-icons/fa";

type MockEvent = {
  type: "earnings" | "macro" | "fomc";
  title: string;
  description: string;
  date: string;
  symbol?: string;
};

const MOCK_EVENTS: MockEvent[] = [
  {
    type: "macro",
    title: "Employment Situation",
    description: "Monthly employment report from Bureau of Labor Statistics",
    date: "In 5 days",
  },
  {
    type: "macro",
    title: "Consumer Price Index",
    description: "Consumer Price Index - key inflation indicator",
    date: "Jan 13",
  },
  {
    type: "fomc",
    title: "FOMC Meeting",
    description:
      "Federal Reserve interest rate decision and economic projections",
    date: "Jan 28",
  },
  {
    type: "earnings",
    title: "AAPL Earnings Report",
    description: "Est. EPS: $2.65 | Est. revenue: $138.25B",
    date: "Jan 29",
    symbol: "AAPL",
  },
  {
    type: "macro",
    title: "Employment Situation",
    description: "Monthly employment report from Bureau of Labor Statistics",
    date: "Feb 6",
  },
  {
    type: "macro",
    title: "Consumer Price Index",
    description: "Consumer Price Index - key inflation indicator",
    date: "Feb 11",
  },
];

const getEventIcon = (type: string) => {
  switch (type) {
    case "earnings":
      return FaDollarSign;
    case "fomc":
      return FaBuilding;
    case "macro":
      return FaChartLine;
    default:
      return FaCalendar;
  }
};

const getEventColor = (type: string) => {
  switch (type) {
    case "earnings":
      return "text-emerald-400";
    case "fomc":
      return "text-rose-400";
    case "macro":
      return "text-amber-400";
    default:
      return "text-slate-400";
  }
};

export function MockEventsTimeline() {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-semibold text-[#0f172a] mb-4">
        Upcoming Events
      </h3>
      <div className="space-y-1">
        {MOCK_EVENTS.map((event, idx) => {
          const Icon = getEventIcon(event.type);
          const color = getEventColor(event.type);

          return (
            <div
              key={idx}
              className="flex items-center justify-between py-2.5 border-b border-[#e2e8f0] last:border-0"
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 shrink-0 ${color}`} />
                <div>
                  <div className="text-sm font-medium text-[#0f172a] text-left">
                    {event.title}
                  </div>
                  <div className="text-xs text-[#64748b]">
                    {event.description}
                  </div>
                </div>
              </div>
              <span className="text-xs text-[#64748b] shrink-0 ml-4">
                {event.date}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
