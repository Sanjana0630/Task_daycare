import { BrowserRouter, Routes, Route } from "react-router-dom";
import StaffDashboard from "./pages/StaffDashboard";
import AlertsPage from "./pages/AlertsPage";
import SchedulePage from "./pages/SchedulePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StaffDashboard />} />
        <Route path="/dashboard" element={<StaffDashboard />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
