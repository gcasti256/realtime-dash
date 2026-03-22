import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { subscribeCrypto, type CryptoPrice } from "../../lib/mockData";

export default function CryptoWidget() {
  const [data, setData] = useState<CryptoPrice[]>([]);
  const [updated, setUpdated] = useState("");

  useEffect(() => {
    const unsub = subscribeCrypto((next) => {
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
          <span className="icon">&#9733;</span> Crypto Markets
        </span>
        <span className="widget-timestamp">updated {updated}</span>
      </div>

      <div className="widget-content">
        {latest && (
          <div className="crypto-prices">
            <div className="crypto-item">
              <span className="crypto-symbol">BTC</span>
              <span className="crypto-price">
                ${latest.btc.toLocaleString()}
              </span>
            </div>
            <div className="crypto-item">
              <span className="crypto-symbol">ETH</span>
              <span className="crypto-price">
                ${latest.eth.toLocaleString()}
              </span>
            </div>
            <div className="crypto-item">
              <span className="crypto-symbol">SOL</span>
              <span className="crypto-price">
                ${latest.sol.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis
              dataKey="time"
              tick={{ fill: "#63636e", fontSize: 10 }}
              tickLine={false}
              axisLine={{ stroke: "#27272a" }}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={["auto", "auto"]}
              tick={{ fill: "#63636e", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                background: "#1c1c1f",
                border: "1px solid #27272a",
                borderRadius: 8,
                fontSize: 12,
                color: "#f0f0f3",
              }}
              formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]}
            />
            <Line
              type="monotone"
              dataKey="btc"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={false}
              name="BTC"
            />
            <Line
              type="monotone"
              dataKey="eth"
              stroke="#6366f1"
              strokeWidth={2}
              dot={false}
              name="ETH"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
