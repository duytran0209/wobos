import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hook";

interface Props {
  children: any;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user } = useAppSelector((store) => store.user);
  if (!user) {
    return <Navigate to="/home" />;
  }
  return children;
};

export default ProtectedRoute;
