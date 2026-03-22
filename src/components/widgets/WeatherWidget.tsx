import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { subscribeWeather, type WeatherPoint } from "../../lib/mockData";

export default function WeatherWidget() {
  const [data, setData] = useState<WeatherPoint[]>([]);
  const [updated, setUpdated] = useState("");

  useEffect(() => {
    const unsub = subscribeWeather((next) => {
      setData(next);
      setUpdated(new Date().toLocaleTimeString());
    });
    return unsub;
  }, []);

  const latest = data[data.length - 1];

  return (
    <div className="widget">
      <div className="widget-header">
        <span className="widget-title">
          <span className="icon">&#9788;</span> Weather
        </span>
        <span className="widget-timestamp">updated {updated}</span>
      </div>

      <div className="widget-content">
        {latest && (
          <div className="weather-info">
            <div className="weather-stat">
              <span className="weather-stat-label">Temperature</span>
              <span className="weather-stat-value">{latest.temperature}&deg;C</span>
            </div>
            <div className="weather-stat">
              <span className="weather-stat-label">Humidity</span>
              <span className="weather-stat-value">{latest.humidity}%</span>
            </div>
            <div className="weather-stat">
              <span className="weather-stat-label">Wind</span>
              <span className="weather-stat-value">{latest.wind} km/h</span>
            </div>
          </div>
        )}

        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="humidGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis
              dataKey="hour"
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
            <Area
              type="monotone"
              dataKey="temperature"
              stroke="#ef4444"
              fill="url(#tempGrad)"
              strokeWidth={2}
              name="Temp (&deg;C)"
            />
            <Area
              type="monotone"
              dataKey="humidity"
              stroke="#3b82f6"
              fill="url(#humidGrad)"
              strokeWidth={2}
              name="Humidity (%)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
