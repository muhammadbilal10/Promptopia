"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@/components/Profile";
import { Box } from "@mui/material";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (session?.user?.id) fetchPosts();
  }, []);
  const handleEditClick = (post) => {
    router.push(`/update-prompt?id=/${post._id}`);
  };
  const handleDeleteClick = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        if (response.ok) {
          const filterPost = posts.filter((p) => p._id !== post._id);
          setPosts(filterPost);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Box alignSelf="flex-start">
      <Profile
        name="My Profile"
        description="Welcome to your personalized profile page. Share your exceptional prompts and inspire other with the power of your imagination"
        data={posts}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
      />
    </Box>
  );
};

export default MyProfile;
