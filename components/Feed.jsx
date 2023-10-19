"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { Box, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const PromCardList = ({ data, handleTagClick }) => {
  return (
    <Grid container spacing={2}>
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
            handleTagClick={handleTagClick}
          />
        </Grid>
      ))}
    </Grid>
  );
};
const Feed = () => {
  const [formData, setFormData] = useState({
    search: "",
  });
  const [prmpts, setPrmpts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    setTimeout(() => {
      setSearchResults(handleFilter(value));
    }, 500);
  };

  const handleFilter = (search) => {
    const regex = new RegExp(search, "i");
    return prmpts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchResults(handleFilter(formData.search));
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch("api/prompt/");
      const data = await response.json();
      setPrmpts(data);
      setSearchResults(data);
    };
    fetchPrompts();
  }, []);

  const handleTagClick = (tag) => {
    setFormData({ ...formData, search: tag });
    setSearchResults(handleFilter(tag));
  };

  return (
    <Box>
      <form
        onSubmit={handleSubmit}
        style={{ margin: "80px 0px", textAlign: "center" }}
      >
        <TextField
          label="Search for a tag or username"
          name="search"
          onChange={handleInputChange}
          value={formData.search}
          sx={{
            width: { xs: 300, sm: 500 },
            backgroundColor: "white",
            borderRadius: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
          required
        />
      </form>
      <PromCardList
        data={formData.search ? searchResults : prmpts}
        handleTagClick={handleTagClick}
      />
    </Box>
  );
};

export default Feed;
