/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import styles from "./EditDeleteButton.module.css";

export const EditDeleteButton = ({
  button,
  className,
  divClassName,
  text = "수정",
  onClick,
}) => {
  return (
    <div className={`${styles.editDeleteButton} ${className}`}>
      <div className={`${styles.div} ${divClassName}`} onClick={onClick}>
        {button === "edit" && <>{text}</>}

        {button === "button-2" && <>삭제</>}
      </div>
    </div>
  );
};

EditDeleteButton.propTypes = {
  button: PropTypes.oneOf(["button-2", "edit"]),
  text: PropTypes.string,
};
