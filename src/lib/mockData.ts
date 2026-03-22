// ---------------------------------------------------------------------------
// Mock Data Generators
// Simulate real-time feeds for the dashboard widgets.
// Each generator returns an initial snapshot *and* exposes a subscribe()
// helper that pushes new values on a setInterval cadence.
// ---------------------------------------------------------------------------

export interface CryptoPrice {
  time: string;
  btc: number;
  eth: number;
  sol: number;
}

export interface WeatherPoint {
  hour: string;
  temperature: number;
  humidity: number;
  wind: number;
}

export interface GithubStats {
  commits: number;
  pullRequests: number;
  issues: number;
  stars: number;
  weeklyCommits: { day: string; count: number }[];
}

export interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  uptime: string;
  processes: number;
}

// ---- helpers ---------------------------------------------------------------

function rand(min: number, max: number, decimals = 2): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function drift(current: number, maxDelta: number, min: number, max: number): number {
  const delta = rand(-maxDelta, maxDelta);
  return Math.min(max, Math.max(min, parseFloat((current + delta).toFixed(2))));
}

function formatTime(d: Date): string {
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

// ---- Crypto ----------------------------------------------------------------

function makeCryptoSnapshot(): CryptoPrice[] {
  let btc = rand(62000, 68000);
  let eth = rand(3200, 3800);
  let sol = rand(120, 180);

  const points: CryptoPrice[] = [];
  const now = Date.now();

  for (let i = 19; i >= 0; i--) {
    const t = new Date(now - i * 3000);
    btc = drift(btc, 250, 58000, 72000);
    eth = drift(eth, 45, 2800, 4200);
    sol = drift(sol, 4, 90, 220);
    points.push({ time: formatTime(t), btc, eth, sol });
  }
  return points;
}

export function subscribeCrypto(cb: (data: CryptoPrice[]) => void, interval = 3000) {
  let data = makeCryptoSnapshot();
  cb(data);

  const id = setInterval(() => {
    const last = data[data.length - 1];
    const next: CryptoPrice = {
      time: formatTime(new Date()),
      btc: drift(last.btc, 250, 58000, 72000),
      eth: drift(last.eth, 45, 2800, 4200),
      sol: drift(last.sol, 4, 90, 220),
    };
    data = [...data.slice(1), next];
    cb(data);
  }, interval);

  return () => clearInterval(id);
}

// ---- Weather ---------------------------------------------------------------

function makeWeatherSnapshot(): WeatherPoint[] {
  let temperature = rand(18, 28);
  let humidity = rand(40, 80);
  let wind = rand(5, 25);

  const points: WeatherPoint[] = [];
  const baseHour = new Date().getHours();

  for (let i = 0; i < 12; i++) {
    const h = ((baseHour - 11 + i + 24) % 24);
    const label = `${h.toString().padStart(2, "0")}:00`;
    temperature = drift(temperature, 1.5, 10, 38);
    humidity = drift(humidity, 3, 20, 95);
    wind = drift(wind, 2, 0, 50);
    points.push({ hour: label, temperature, humidity, wind });
  }
  return points;
}

export function subscribeWeather(cb: (data: WeatherPoint[]) => void, interval = 3000) {
  let data = makeWeatherSnapshot();
  cb(data);

  const id = setInterval(() => {
    const last = data[data.length - 1];
    const hour = new Date().getHours().toString().padStart(2, "0") + ":00";
    const next: WeatherPoint = {
      hour,
      temperature: drift(last.temperature, 1, 10, 38),
      humidity: drift(last.humidity, 2, 20, 95),
      wind: drift(last.wind, 1.5, 0, 50),
    };
    data = [...data.slice(1), next];
    cb(data);
  }, interval);

  return () => clearInterval(id);
}

// ---- GitHub ----------------------------------------------------------------

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function makeGithubSnapshot(): GithubStats {
  return {
    commits: Math.floor(rand(120, 350, 0)),
    pullRequests: Math.floor(rand(8, 30, 0)),
    issues: Math.floor(rand(5, 25, 0)),
    stars: Math.floor(rand(400, 1200, 0)),
    weeklyCommits: DAYS.map((day) => ({ day, count: Math.floor(rand(2, 28, 0)) })),
  };
}

export function subscribeGithub(cb: (data: GithubStats) => void, interval = 3000) {
  let data = makeGithubSnapshot();
  cb(data);

  const id = setInterval(() => {
    data = {
      ...data,
      commits: data.commits + Math.floor(rand(0, 4, 0)),
      pullRequests: data.pullRequests + (Math.random() > 0.7 ? 1 : 0),
      issues: data.issues + (Math.random() > 0.8 ? 1 : 0),
      stars: data.stars + (Math.random() > 0.6 ? 1 : 0),
      weeklyCommits: data.weeklyCommits.map((d) => ({
        ...d,
        count: d.count + (Math.random() > 0.7 ? Math.floor(rand(1, 3, 0)) : 0),
      })),
    };
    cb(data);
  }, interval);

  return () => clearInterval(id);
}

// ---- System Metrics --------------------------------------------------------

function makeSystemSnapshot(): SystemMetrics {
  return {
    cpu: rand(15, 65),
    memory: rand(40, 78),
    disk: rand(45, 72),
    network: rand(10, 90),
    uptime: "14d 7h 32m",
    processes: Math.floor(rand(180, 320, 0)),
  };
}

export function subscribeSystem(cb: (data: SystemMetrics) => void, interval = 3000) {
  let data = makeSystemSnapshot();
  cb(data);

  const id = setInterval(() => {
    data = {
      ...data,
      cpu: drift(data.cpu, 8, 5, 98),
      memory: drift(data.memory, 3, 30, 95),
      disk: drift(data.disk, 0.5, 40, 90),
      network: drift(data.network, 12, 2, 100),
      processes: Math.max(150, data.processes + Math.floor(rand(-5, 5, 0))),
    };
    cb(data);
  }, interval);

  return () => clearInterval(id);
}
