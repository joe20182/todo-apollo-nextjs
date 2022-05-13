import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

const Header = ({ text, handleInput, handleAdd }) => {
  return (
    <>
      <Typography variant="h3" gutterBottom component="div">
        TODO LIST
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          placeholder="ADD TODOS"
          sx={{ marginRight: 1 }}
          onChange={handleInput}
          value={text}
        />
        <Button
          variant="contained"
          size="large"
          onClick={handleAdd}
          disabled={!text}
        >
          ADD
        </Button>
      </Box>
      <Divider sx={{ margin: 3 }} />
    </>
  );
};

export default Header;
