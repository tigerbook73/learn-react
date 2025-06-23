import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import NewLabelOutlined from "@mui/icons-material/NewLabelOutlined";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: { control: "select", options: ["text", "outlined", "contained"] },
    color: { control: "select", options: ["default", "primary", "secondary", "error", "info", "success", "warning"] },
    size: { control: "select", options: ["small", "medium", "large"] },
    disabled: { control: "boolean" },
    onClick: { action: "clicked" }, // This will log the click event in the actions panel
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    variant: "contained",
    color: "primary",
    size: "medium",
    disabled: false,
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    ...meta.args,
  },
  render: (args) => (
    <>
      <Grid container alignItems="center" spacing={0.5}>
        <Grid size="grow">Variant</Grid>
        <Button {...args} variant="contained">
          Btn
        </Button>
        <Button {...args} variant="outlined">
          Btn
        </Button>
        <Button {...args} variant="text">
          Btn
        </Button>
      </Grid>
      <Grid container alignItems="center" spacing={0.5}>
        <Grid
          size="grow"
          sx={{
            bgcolor: "primary",
          }}
        >
          Color
        </Grid>
        <Button {...args} color="primary" startIcon={<NewLabelOutlined />}>
          Btn
        </Button>
        <IconButton aria-label="add label" color="primary">
          <NewLabelOutlined />
        </IconButton>
        <Button {...args} color="secondary">
          Btn
        </Button>
        <Button {...args} color="error">
          Btn
        </Button>
        <Button {...args} color="info">
          Btn
        </Button>
        <Button {...args} color="success">
          Btn
        </Button>
        <Button {...args} color="warning">
          Btn
        </Button>
      </Grid>
    </>
  ),
};
