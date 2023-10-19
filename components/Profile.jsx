import { Box, Typography } from "@mui/material";
import PromptCard from "./PromptCard";
import Grid from "@mui/material/Unstable_Grid2";

const PromCardList = ({ data, handleEditClick, handleDeleteClick }) => {
  return (
    <Grid container spacing={2} mt={6}>
      {data.map((prompt) => (
        <Grid
          xs={12}
          sm={data.length > 1 ? 6 : 12 / data.length}
          md={data.length > 2 ? 4 : 12 / data.length}
          lg={data.length > 3 ? 3 : 12 / data.length}
          key={prompt.id}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleEditClick={() => handleEditClick && handleEditClick(prompt)}
            handleDeleteClick={() =>
              handleDeleteClick && handleDeleteClick(prompt)
            }
          />
        </Grid>
      ))}
    </Grid>
  );
};

const Profile = ({
  name,
  description,
  data,
  handleDeleteClick,
  handleEditClick,
}) => {
  return (
    <Box pl={4} mt={6}>
      <Typography gutterBottom className="blue_gradient" variant="h2">
        {name}
      </Typography>
      <Typography gutterBottom variant="body2" color="text.secondary">
        {description}
      </Typography>
      <PromCardList
        data={data}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
      />
    </Box>
  );
};

export default Profile;
