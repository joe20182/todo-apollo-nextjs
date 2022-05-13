import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const TodoList = ({ todos, handleDelete, handleCheck }) => {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {todos.map((item) => {
        return (
          <ListItem
            key={item.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="comments"
                onClick={() => handleDelete(item)}
              >
                <DeleteForeverIcon sx={{ color: "text.primary" }} />
              </IconButton>
            }
          >
            <ListItemButton
              role={undefined}
              dense
              onClick={() => handleCheck(item)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={item.status}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default TodoList;
