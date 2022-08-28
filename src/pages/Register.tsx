import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { FormRaw } from "../components/form";
import { loginUser, registerUser } from "../slices/userSlice";
import Wrapper from "../wrappers/RegisterPage";
const logo: string = require("../images/logo.svg").default;

export interface RegisterProps {
  children?: string;
}
export interface RegisterStates {
  initialState: {
    name: string;
    email: string;
    password: string;
    isMember: boolean;
  };
}
const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

export const Register: React.FC<RegisterProps> = memo(({ children }) => {
  const [values, setValues] =
    useState<RegisterStates["initialState"]>(initialState);
  const toggleMember = (): void => {
    setValues({ ...values, isMember: !values.isMember });
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useAppSelector((store) => store.user);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email.length || !password.length || (!name.length && !isMember)) {
      toast.error("Please fill out all fields");
      return;
    } else if (isMember) {
      // @ts-ignore
      dispatch(loginUser({ email, password }));
      return;
    }
    // @ts-ignore
    dispatch(registerUser({ name, email, password }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <img src={logo} alt="logo-page" className="logo" />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {!values.isMember && (
          <FormRaw
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        <FormRaw
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />

        <FormRaw
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block">
          {isLoading ? "loading..." : "submit"}
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
});
