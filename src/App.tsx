import React, { memo, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useAppSelector } from "../src/app/hook";
import { Dashboard, Error, Home, Register } from "./pages";
import { GlobalStyles } from "./styles/GlobalStyles";
import { darkTheme, lightTheme } from "./utils/constants";

const App = memo(() => {
  const { theme } = useAppSelector((state) => state.ui);
  const currentTheme = theme === "light" ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <Suspense fallback={<></>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="home" element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
});

export default App;
