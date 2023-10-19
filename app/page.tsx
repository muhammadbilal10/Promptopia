import Feed from "@/components/Feed";
import { Box, Typography, Stack } from "@mui/material";

const Home = () => {
  return (
    <Box marginTop={15}>
      <Stack alignItems="center">
        <Typography align="center" variant="h2" fontWeight="bold">
          Discover & Share
        </Typography>
        <Typography
          variant="h2"
          className="orange-gradient"
          align="center"
          component="span"
          fontWeight="bold"
          gutterBottom
        >
          AI Powered Prompts
        </Typography>
        <Typography variant="body1" align="center">
          Promptia is an open-source AI prompting tool for modern world to
          discover, create and share creative prompts.
        </Typography>
      </Stack>
      <Feed />
    </Box>
  );
};

export default Home;
