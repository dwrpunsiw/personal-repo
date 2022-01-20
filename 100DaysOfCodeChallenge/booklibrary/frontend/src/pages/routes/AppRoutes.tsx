import { Routes, Route } from "react-router-dom";
import { Administrator } from "../views/admin/Administrator";
import { Collections } from "../views/collections/Collections";

import Dashboard from "../views/dashboard/Dashboard";
import { Library } from "../views/library/Library";
import Profile from "../views/profile/Profile";
import { Settings } from "../views/settings/Settings";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/library" element={<Library />} />
      <Route path="/admin" element={<Administrator />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/logout" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
