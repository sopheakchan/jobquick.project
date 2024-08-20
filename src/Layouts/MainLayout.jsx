import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../Components/NavbarComponent";
import FooterComponent from "../Components/FooterComponent";
import ParticlesBackground from "../common/ParticlesBackground";

const MainLayout = () => {
  const particlesUrl = "/particles.json";

  return (
    <>
      {/* { style={{ position: 'relative', minHeight: '100vh' }}} */}
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <ParticlesBackground url={particlesUrl} />
        <header>
          <NavbarComponent />
        </header>
        <main style={{ position: "relative", zIndex: 1 }}>
          <Outlet />
        </main>
      </div>
      <FooterComponent />
    </>
  );
};

export default MainLayout;
