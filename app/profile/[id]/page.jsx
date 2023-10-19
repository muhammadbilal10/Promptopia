"use client";
import { Box } from "@mui/material";
import Profile from "@/components/Profile";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const UserProfile = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  console.log(userName);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (params?.id) fetchPosts();
  }, [params?.id]);
  return (
    <Box alignSelf="flex-start">
      <Profile
        name={userName}
        description={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
        data={posts}
      />
    </Box>
  );
};

export default UserProfile;
