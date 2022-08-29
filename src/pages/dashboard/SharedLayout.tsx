import React, { memo } from "react";
import { Outlet } from "react-router-dom";
import { BigSideBar, Navbar, SmallSideBar } from "../../components/navbar";
import Wrapper from "../../wrappers/SharedLayout";

export interface SharedLayoutProps {}

export const SharedLayout: React.FC<SharedLayoutProps> = memo(() => {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSideBar />
        <BigSideBar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
});
