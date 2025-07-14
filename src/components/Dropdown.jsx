import React from 'react';

const Dropdown = ({ label, options, value, onChange }) => {
  return (
    <div className="form-control w-64 ml-[100px]">
      <label className="block mb-1">
        <span className="label-text text-white text-sm font-[Poppins] font-medium">{label}</span>
      </label>
      <select className="select select-bordered w-64" value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;