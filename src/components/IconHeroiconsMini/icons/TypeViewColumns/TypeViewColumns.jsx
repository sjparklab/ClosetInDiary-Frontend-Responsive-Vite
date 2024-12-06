/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

export const TypeViewColumns = ({ className }) => {
  return (
    <svg
      className={`type-view-columns ${className}`}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M14 17H16.75C17.9926 17 19 15.9926 19 14.75V5.25C19 4.00736 17.9926 3 16.75 3H14V17Z"
        fill="#626262"
      />

      <path className="path" d="M12.5 3H7.5V17H12.5V3Z" fill="#626262" />

      <path
        className="path"
        d="M3.25 3H6V17H3.25C2.00736 17 1 15.9926 1 14.75V5.25C1 4.00736 2.00736 3 3.25 3Z"
        fill="#626262"
      />
    </svg>
  );
};
