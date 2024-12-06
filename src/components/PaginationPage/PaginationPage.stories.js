import { PaginationPage } from ".";

export default {
  title: "Components/PaginationPage",
  component: PaginationPage,
  argTypes: {
    stateProp: {
      options: ["active", "default", "more", "hover", "more-hover"],
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
    page: "1",
    stateProp: "active",
    size: "md",
    className: {},
    divClassName: {},
  },
};
