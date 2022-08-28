import React, { memo } from "react";

export interface FormRawProps {
  children?: string;
  type: "text" | "password" | "email";
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelText?: string;
  value: any;
}

export const FormRaw: React.FC<FormRawProps> = memo(
  ({ type, name, value, handleChange, labelText }) => {
    return (
      <div className="form-row">
        <label htmlFor={name} className="form-label">
          {labelText || name}
        </label>
        <input
          id={name}
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
