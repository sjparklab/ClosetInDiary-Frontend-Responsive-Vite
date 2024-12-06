import { PaginationControl } from ".";

export default {
  title: "Components/PaginationControl",
  component: PaginationControl,
  argTypes: {
    type: {
      options: ["back", "next", "first", "last"],
      control: { type: "select" },
    },
    state: {
      options: ["disabled", "hover", "default"],
      control: { type: "select" },
    },
    size: {
      options: ["md", "lg", "sm"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    text: true,
    type: "back",
    state: "disabled",
    size: "md",
    className: {},
    divClassName: {},
    divClassNameOverride: {},
  },
};
