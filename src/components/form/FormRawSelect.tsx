import React from "react";

interface Props {
  labelText: string;
  name: string;
  value: any;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  list: string[];
}

const FormRawSelect: React.FC<Props> = ({
  labelText,
  name,
  value,
  handleChange,
  list,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        className="form-select"
        onChange={handleChange}
      >
        {list.map((status: string, index: number) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormRawSelect;
