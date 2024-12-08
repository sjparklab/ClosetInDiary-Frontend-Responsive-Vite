import { EditDeleteButton } from ".";

export default {
  title: "Components/EditDeleteButton",
  component: EditDeleteButton,
  argTypes: {
    button: {
      options: ["button-2", "edit"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    button: "button-2",
    className: {},
    divClassName: {},
    text: "수정",
  },
};
