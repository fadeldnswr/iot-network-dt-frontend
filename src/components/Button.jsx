import React from 'react';

const Button = ({ label, onClick }) => {
  return (
    <button onClick={onClick} className="btn btn-primary mt-4 ml-[200px] w-40 font-[Poppins]">
      {label}
    </button>
  );
};

export default Button;