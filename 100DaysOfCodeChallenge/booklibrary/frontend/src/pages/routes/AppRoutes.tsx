import { Routes, Route } from "react-router-dom";

import Dashboard from "../views/dashboard/Dashboard";
import Profile from "../views/profile/Profile";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/:userId/dashboard" element={<Dashboard />} />
      <Route path="/:userId/profile" element={<Profile />} />
      <Route path="/:userId/collections" element={<Dashboard />} />
      <Route path="/:userId/library" element={<Dashboard />} />
      <Route path="/:userId/admin" element={<Dashboard />} />
      <Route path="/:userId/settings" element={<Dashboard />} />
      <Route path="/:userId/logout" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
