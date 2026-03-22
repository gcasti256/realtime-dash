import { useState, useEffect } from "react";
import { subscribeSystem, type SystemMetrics } from "../../lib/mockData";

function barColor(value: number): string {
  if (value > 85) return "#ef4444";
  if (value > 65) return "#f59e0b";
  return "#22c55e";
}

interface MetricBarProps {
  label: string;
  value: number;
}

function MetricBar({ label, value }: MetricBarProps) {
  return (
    <div className="metric-row">
      <span className="metric-label">{label}</span>
      <div className="metric-bar-track">
        <div
          className="metric-bar-fill"
          style={{
            width: `${value}%`,
            background: barColor(value),
          }}
        />
      </div>
      <span className="metric-value">{value.toFixed(1)}%</span>
    </div>
  );
}

export default function SystemWidget() {
  const [data, setData] = useState<SystemMetrics | null>(null);
  const [updated, setUpdated] = useState("");

  useEffect(() => {
    const unsub = subscribeSystem((next) => {
      setData(next);
      setUpdated(new Date().toLocaleTimeString());
    });
    return unsub;
  }, []);

  if (!data) return null;

  return (
    <div className="widget">
      <div className="widget-header">
        <span className="widget-title">
          <span className="icon">&#9881;</span> System Metrics
        </span>
        <span className="widget-timestamp">updated {updated}</span>
      </div>

      <div className="widget-content">
        <MetricBar label="CPU" value={data.cpu} />
        <MetricBar label="Memory" value={data.memory} />
        <MetricBar label="Disk" value={data.disk} />
        <MetricBar label="Network" value={data.network} />

        <div className="system-info-row">
          <div className="system-info-item">
            <span className="system-info-label">Uptime</span>
            <span className="system-info-value">{data.uptime}</span>
          </div>
          <div className="system-info-item">
            <span className="system-info-label">Processes</span>
            <span className="system-info-value">{data.processes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
