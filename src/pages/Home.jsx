import DarkMode from "../components/darkmode/DarkMode";
import React from "react";
import styled from "styled-components";
const Home = () => {
  return (
    <HomeStyled>
      <p>Xin chao cac ban</p>
      <DarkMode />
    </HomeStyled>
  );
};

const HomeStyled = styled.div`
  p {
    color: ${(props) => props.theme.primary};
  }
`;
export default Home;
