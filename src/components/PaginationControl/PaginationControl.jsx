/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { IconHeroiconsMini } from "../IconHeroiconsMini";
import "./style.css";

export const PaginationControl = ({
  text = true,
  type,
  state,
  size,
  className,
  divClassName,
  divClassNameOverride,
}) => {
  return (
    <div className={`pagination-control ${size} ${state} ${className}`}>
      {["last", "next"].includes(type) && (
        <>
          <>
            {text && (
              <div className={`next ${divClassNameOverride}`}>
                {type === "next" && <>Next</>}

                {type === "last" && <>Last</>}
              </div>
            )}
          </>
        </>
      )}

      <IconHeroiconsMini
        type={
          type === "last"
            ? "chevron-double-right"
            : type === "back"
              ? "chevron-left"
              : type === "first"
                ? "chevron-double-left"
                : "chevron-right"
        }
      />

      {["back", "first"].includes(type) && (
        <>
          <>
            {text && (
              <div className={`back ${divClassName}`}>
                {type === "back" && <>Back</>}

                {type === "first" && <>First</>}
              </div>
            )}
          </>
        </>
      )}
    </div>
  );
};

PaginationControl.propTypes = {
  text: PropTypes.bool,
  type: PropTypes.oneOf(["back", "next", "first", "last"]),
  state: PropTypes.oneOf(["disabled", "hover", "default"]),
  size: PropTypes.oneOf(["md", "lg", "sm"]),
};
