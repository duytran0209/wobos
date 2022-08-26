import React, { memo } from "react";

export interface FormRawProps {
  children?: string;
  type: "text" | "password" | "email";
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormRaw: React.FC<FormRawProps> = memo(
  ({ type, name, value, handleChange }) => {
    return (
      <div className="form-row">
        <label htmlFor={name} className="form-label">
          {name}
        </label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className="form-input"
        />
      </div>
    );
  }
);
