import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { subscribeGithub, type GithubStats } from "../../lib/mockData";

export default function GithubWidget() {
  const [data, setData] = useState<GithubStats | null>(null);
  const [updated, setUpdated] = useState("");

  useEffect(() => {
    const unsub = subscribeGithub((next) => {
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
          <span className="icon">&#9955;</span> GitHub Activity
        </span>
        <span className="widget-timestamp">updated {updated}</span>
      </div>

      <div className="widget-content">
        <div className="stat-grid">
          <div className="stat-card">
            <span className="stat-label">Commits</span>
            <span className="stat-value">{data.commits}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Pull Requests</span>
            <span className="stat-value">{data.pullRequests}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Issues</span>
            <span className="stat-value">{data.issues}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Stars</span>
            <span className="stat-value">{data.stars}</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={data.weeklyCommits}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis
              dataKey="day"
              tick={{ fill: "#63636e", fontSize: 10 }}
              tickLine={false}
              axisLine={{ stroke: "#27272a" }}
            />
            <YAxis
              tick={{ fill: "#63636e", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "#1c1c1f",
                border: "1px solid #27272a",
                borderRadius: 8,
                fontSize: 12,
                color: "#f0f0f3",
              }}
            />
            <Bar
              dataKey="count"
              fill="#6366f1"
              radius={[4, 4, 0, 0]}
              name="Commits"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
