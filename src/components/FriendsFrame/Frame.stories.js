import { Frame } from ".";

export default {
  title: "Components/Frame",
  component: Frame,
  argTypes: {
    mode: {
      options: ["request", "message", "delete", "default"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    mode: "request",
    className: {},
  },
};
