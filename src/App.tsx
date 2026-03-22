import { useCallback, useState } from "react";
import DashboardHeader from "./components/DashboardHeader";
import CryptoWidget from "./components/widgets/CryptoWidget";
import WeatherWidget from "./components/widgets/WeatherWidget";
import GithubWidget from "./components/widgets/GithubWidget";
import SystemWidget from "./components/widgets/SystemWidget";

function App() {
  const [key, setKey] = useState(0);

  const handleRefresh = useCallback(() => {
    setKey((k) => k + 1);
  }, []);

  return (
    <div className="dashboard">
      <DashboardHeader onRefresh={handleRefresh} />

      <div className="dashboard-grid" key={key}>
        <CryptoWidget />
        <WeatherWidget />
        <GithubWidget />
        <SystemWidget />
      </div>
    </div>
  );
}

export default App;
