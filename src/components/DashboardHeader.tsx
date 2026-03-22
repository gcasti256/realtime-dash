import { useState, useEffect } from "react";
import { format } from "date-fns";

interface DashboardHeaderProps {
  onRefresh: () => void;
}

export default function DashboardHeader({ onRefresh }: DashboardHeaderProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <span style={{ fontSize: 22 }}>&#9670;</span>
        <h1 className="header-title">Realtime Dash</h1>
        <span className="header-badge">Live</span>
      </div>

      <div className="header-right">
        <span className="header-clock">
          {format(time, "EEE, MMM d yyyy  HH:mm:ss")}
        </span>
        <button className="header-btn" onClick={onRefresh}>
          &#8635; Refresh
        </button>
      </div>
    </header>
  );
}
