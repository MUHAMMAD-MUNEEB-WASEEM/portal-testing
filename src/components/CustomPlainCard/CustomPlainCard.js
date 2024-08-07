import React from 'react';
// bg-[${!!bg ? bg: "red"}]
const CustomPlainCard = ({ bg, icon, heading, text }) => {
  return (
    <div className={`${bg ? bg : "bg-red-500"} p-4 text-white w-full rounded-lg`}>
      <p className="flex items-center justify-start">
        <img
          src={icon}
          className="h-16 w-16 object-cover"
          alt="Donut Icon"
        />
      </p>
      <h2 className="text-lg font-bold mt-2">{heading}</h2>
      <p className='mt-1'>{text}</p>
    </div>
  );
};

export default CustomPlainCard;
