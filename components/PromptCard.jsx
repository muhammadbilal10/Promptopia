"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  Link,
  CardActionArea,
  Typography,
  Stack,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

const PromptCard = ({
  prompt,
  handleTagClick,
  handleEditClick,
  handleDeleteClick,
}) => {
  const pathName = usePathname();
  const { data: session } = useSession();
  const router = useRouter();
  const [copied, setCopied] = useState("");
  const handleCopy = () => {
    setCopied(prompt.prompt);

    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  const handleProfile = () => {
    if (prompt.creator._id === session?.user?.id)
      return router.push("/profile");
    router.push(
      `/profile/${prompt.creator._id}?name=${prompt.creator.userName}`
    );
  };

  return (
    <Card sx={{ maxWidth: 345, mb: 2, width: 345 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" pb={2}>
          <CardActionArea onClick={handleProfile}>
            <Stack direction="row">
              <Avatar
                alt="profile Pic"
                src={prompt.creator.image}
                onClick={handleProfile}
              />
              <Stack pl={1}>
                <Typography variant="h5" component="div">
                  {prompt.creator.userName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {prompt.creator.email}
                </Typography>
              </Stack>
            </Stack>
          </CardActionArea>
          <Box sx={{ marginLeft: "auto", alignSelf: "start" }}>
            {copied ? (
              <CheckIcon fontSize="10px" />
            ) : (
              <ContentCopyIcon onClick={handleCopy} fontSize="10px" />
            )}
          </Box>
        </Stack>
        <Typography gutterBottom variant="body2" color="text.secondary">
          {prompt.prompt}
        </Typography>

        <Link
          sx={{ cursor: "pointer" }}
          underline="none"
          onClick={() => handleTagClick && handleTagClick(prompt.tag)}
        >
          {prompt.tag}
        </Link>
      </CardContent>
      {session?.user?.id === prompt.creator._id && pathName === "/profile" && (
        <Stack mt={4} direction="row" justifyContent="center">
          <Button variant="text" onClick={handleEditClick} color="secondary">
            Edit
          </Button>
          <Button variant="text" onClick={handleDeleteClick}>
            Delete
          </Button>
        </Stack>
      )}
    </Card>
  );
};

export default PromptCard;
