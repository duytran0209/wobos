import React, { memo, useState } from "react";
import { Outlet } from "react-router-dom";
import { BigSideBar, SmallSideBar, Navbar } from "../../components/navbar";
import Wrapper from "../../wrappers/SharedLayout";

export interface SharedLayoutProps {
  children?: string;
}

export const SharedLayout: React.FC<SharedLayoutProps> = memo(
  ({ children }) => {
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
  }
);
