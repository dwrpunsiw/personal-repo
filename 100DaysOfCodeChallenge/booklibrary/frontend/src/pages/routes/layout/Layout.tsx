import AppRoutes from "../AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../../../shared/components/layout/navbar/Navbar";
import Header from "../../../shared/components/layout/header/Header";
import classes from "./Layout.module.css";

const Layout: React.FC = () => {
  return (
    <Router>
      <section className={classes.main}>
        <Navbar />
        <main className="w-full">
          <Header />
          <AppRoutes />
        </main>
      </section>
    </Router>
  );
};

export default Layout;
