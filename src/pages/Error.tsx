import React, { memo } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../wrappers/ErrorPage";

const notFound: string = require("../images/not-found.svg").default;

export interface ErrorProps {
  children?: string;
}

export const Error: React.FC<ErrorProps> = memo(({ children }) => {
  return (
    <Wrapper>
      <div>
        <img src={notFound} alt="notFoundpage" />
        <h3>Ohh!Page not Found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to="/">Back home</Link>
      </div>
    </Wrapper>
  );
});
