import React from "react";
import "../styles/BillsTicker.css";

type BillsTickerProps = {
  bills: string[]; // array of bill titles or summaries
};

const BillsTicker: React.FC<BillsTickerProps> = ({ bills }) => {
  return (
    <div className="max-w-3xl overflow-hidden whitespace-nowrap border-y border-gray-300 bg-gray-100">
      <div className="inline-block animate-scroll whitespace-nowrap">
        {bills.map((text, i) => (
          <span key={i} className="inline-block px-8 text-sm text-gray-800">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BillsTicker;
