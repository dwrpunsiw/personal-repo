import { Routes, Route, Navigate } from "react-router-dom";
import { Administrator } from "../views/admin/Administrator";
import { Collections } from "../views/collections/Collections";

import Dashboard from "../views/dashboard/Dashboard";
import Profile from "../views/profile/Profile";
import { Friends } from "../views/friends/Friends";
import { Library } from "../views/library/Library";
import { Settings } from "../views/settings/Settings";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/library" element={<Library />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/admin" element={<Administrator />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppRoutes;
