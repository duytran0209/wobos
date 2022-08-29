import React, { memo, useState } from "react";
import { FormRaw } from "../../components/form";
import Wrapper from "../../wrappers/DashboardFormPage";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { toast } from "react-toastify";
import { updateUser } from "../../slices/userSlice";

export interface ProfileProps {
  children?: string;
}
export interface ProfileStates {
  initialState: {
    name?: string;
    email: string;
    lastName: string;
    location: string;
  };
}

export const Profile: React.FC<ProfileProps> = memo(({ children }) => {
  const { isLoading, user } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<ProfileStates["initialState"]>({
    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
    location: user?.location || "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !userData.name ||
      !userData.email ||
      !userData.lastName ||
      !userData.location
    ) {
      toast.error("Please fill all fields");
      return;
    }
    dispatch(updateUser(userData));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        <div className="form-center">
          <FormRaw
            type="text"
            name="name"
            labelText="Name"
            value={userData.name}
            handleChange={handleChange}
          />

          <FormRaw
            type="text"
            labelText="Last Name"
            name="lastName"
            value={userData.lastName}
            handleChange={handleChange}
          />

          <FormRaw
            type="email"
            name="email"
            labelText="Email"
            value={userData.email}
            handleChange={handleChange}
          />

          <FormRaw
            type="text"
            name="location"
            labelText="Location"
            value={userData.location}
            handleChange={handleChange}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Please wait..." : "Save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
});
