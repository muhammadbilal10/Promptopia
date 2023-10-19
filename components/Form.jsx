import {
  Box,
  Stack,
  Typography,
  TextField,
  TextareaAutosize,
  Button,
} from "@mui/material";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <Box alignSelf="flex-start" pt={8}>
      <Stack>
        <Typography className="blue_gradient" variant="h3" fontWeight="bold">
          {type} Post
        </Typography>

        <Typography py={3}>
          {type} and share amazing prompts with the world, and let your
          imagination run wild with any AI platform.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextareaAutosize
            rowsMin={5}
            placeholder="write your prompt here"
            name="description"
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            style={{
              width: "100%",
              height: 200,
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            required
          />

          <TextField
            fullWidth
            label="Tag (#product, #webdevelopment, #ai)"
            placeholder="#tag"
            name="title"
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            variant="outlined"
            margin="normal"
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting}
            style={{ marginTop: "10px" }}
          >
            {submitting ? `${type}...` : `${type}`}
          </Button>
        </form>
      </Stack>
    </Box>
  );
};

export default Form;
