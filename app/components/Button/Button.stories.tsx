import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

/**
 * Meta and StoryObj are generic types and you need to give them the specific component you care about
 */
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
};

type Story = StoryObj<typeof Button>;

// Primary is one state the button can be in
// args are the default props that the component is rendered with - so far so good!
export const Primary: Story = {
  args: {
    label: "Primary 😃",
    size: "large",
    type: "primary",
  },
};

// Secondary is another state
export const Secondary: Story = {
    args: {
      ...Primary.args,
      label: "Secondary 😇",
      type: "secondary",
    },
  };
  

  export default meta;