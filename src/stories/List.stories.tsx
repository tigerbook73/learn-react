import type { Meta, StoryObj } from "@storybook/react-vite";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Comment from "@mui/icons-material/Comment";
import NewLabelOutlined from "@mui/icons-material/NewLabelOutlined";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/List",
  component: List,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    ...meta.args,
  },
  render: () => (
    <List dense>
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete">
            <Comment />
          </IconButton>
        }
        disablePadding
      >
        <ListItemButton>
          <ListItemIcon>
            <NewLabelOutlined />
          </ListItemIcon>
          <ListItemText primary="Item 1" secondary="Secondary text" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton>
          <ListItemText inset primary="Item 2" secondary="Item2" />
        </ListItemButton>
      </ListItem>
    </List>
  ),
};
