/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { IconHeroiconsMini } from "../IconHeroiconsMini";
import "./style.css";

export const PaginationPage = ({
  page = "1",
  stateProp,
  size,
  className,
  divClassName,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    state: stateProp || "default",

    size: size || "sm",
  });

  return (
    <div
      className={`pagination-page size-1-${state.size} state-${state.state} ${className}`}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
    >
      {["active", "default", "hover"].includes(state.state) && (
        <div className={`element-2 ${divClassName}`}>{page}</div>
      )}

      {["more-hover", "more"].includes(state.state) && (
        <IconHeroiconsMini type="ellipsis-horizontal" />
      )}
    </div>
  );
};

function reducer(state, action) {
  if (state.size === "sm" && state.state === "default") {
    switch (action) {
      case "mouse_enter":
        return {
          size: "sm",

          state: "hover",
        };
    }
  }

  if (state.size === "sm" && state.state === "hover") {
    switch (action) {
      case "mouse_leave":
        return {
          size: "sm",

          state: "default",
        };
    }
  }

  if (state.size === "sm" && state.state === "more") {
    switch (action) {
      case "mouse_enter":
        return {
          size: "sm",

          state: "more-hover",
        };
    }
  }

  if (state.size === "sm" && state.state === "more-hover") {
    switch (action) {
      case "mouse_leave":
        return {
          size: "sm",

          state: "more",
        };
    }
  }

  if (state.size === "md" && state.state === "default") {
    switch (action) {
      case "mouse_enter":
        return {
          size: "md",

          state: "hover",
        };
    }
  }

  if (state.size === "md" && state.state === "hover") {
    switch (action) {
      case "mouse_leave":
        return {
          size: "md",

          state: "default",
        };
    }
  }

  if (state.size === "md" && state.state === "more") {
    switch (action) {
      case "mouse_enter":
        return {
          size: "md",

          state: "more-hover",
        };
    }
  }

  if (state.size === "md" && state.state === "more-hover") {
    switch (action) {
      case "mouse_leave":
        return {
          size: "md",

          state: "more",
        };
    }
  }

  if (state.size === "lg" && state.state === "default") {
    switch (action) {
      case "mouse_enter":
        return {
          size: "lg",

          state: "hover",
        };
    }
  }

  if (state.size === "lg" && state.state === "hover") {
    switch (action) {
      case "mouse_leave":
        return {
          size: "lg",

          state: "default",
        };
    }
  }

  if (state.size === "lg" && state.state === "more") {
    switch (action) {
      case "mouse_enter":
        return {
          size: "lg",

          state: "more-hover",
        };
    }
  }

  if (state.size === "lg" && state.state === "more-hover") {
    switch (action) {
      case "mouse_leave":
        return {
          size: "lg",

          state: "more",
        };
    }
  }

  return state;
}

PaginationPage.propTypes = {
  page: PropTypes.string,
  stateProp: PropTypes.oneOf([
    "active",
    "default",
    "more",
    "hover",
    "more-hover",
  ]),
  size: PropTypes.oneOf(["md", "lg", "sm"]),
};
