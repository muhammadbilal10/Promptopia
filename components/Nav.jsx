"use client";
import Link from "next/link"; // Link component from Next.js
import Image from "next/image";
import { useState, useEffect, use } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

const Nav = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [Providers, setProviders] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders();

      setProviders(providers);
    };
    fetchProviders();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      direction="row"
      padding={4}
      width="100%"
      justifyContent="space-between"
    >
      <Stack direction="row">
        <Link href={"/"}>
          <Image
            src="/assets/images/logo.svg"
            width={30}
            height={30}
            alt="Promptopia Logo"
          />
        </Link>
        <Typography
          variant="h6"
          fontWeight="bold"
          pl={1}
          display={{ xs: "none", sm: "block" }}
        >
          Promptopia
        </Typography>
      </Stack>

      {/* Desktop Navigation */}
      <Box
        flex={1}
        display={{ sm: "flex", xs: "none" }}
        justifyContent="flex-end"
      >
        {session?.user ? (
          <Stack direction="row" spacing={2}>
            <Link href="create-prompt">
              <Button variant="contained">Create Post</Button>
            </Link>
            <Button
              variant="contained"
              onClick={() => {
                signOut();
                router.push("/");
              }}
            >
              Signout
            </Button>
            <Link href="/profile">
              <Avatar
                src={session?.user?.image}
                sx={{ height: 37, width: 37 }}
              />
            </Link>
          </Stack>
        ) : (
          <Box>
            {Providers &&
              Object.values(Providers).map((provider) => (
                <Button
                  key={provider.name}
                  variant="contained"
                  onClick={() => signIn(provider.id)}
                >
                  Sign in with {provider.name}
                </Button>
              ))}
          </Box>
        )}
      </Box>

      {/* Mobile Navigation */}
      <Box
        flex={1}
        display={{ sm: "none", xs: "flex" }}
        justifyContent="flex-end"
      >
        {session?.user ? (
          <Stack>
            <Avatar
              src={session?.user?.image}
              width={30}
              height={30}
              aria-controls={open ? "profile-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            />
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  router.push("/profile");
                }}
                sx={{ justifyContent: "flex-end" }}
              >
                my profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  router.push("create-prompt");
                }}
                sx={{ justifyContent: "flex-end" }}
              >
                create Prompt
              </MenuItem>
              <MenuItem
                disableRipple
                sx={{
                  "&:hover": {
                    background: "transparent",
                  },
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    handleClose();
                    signOut();
                  }}
                  sx={{ width: "100%", mt: 2 }}
                >
                  Signout
                </Button>
              </MenuItem>
            </Menu>
          </Stack>
        ) : (
          <Box>
            {Providers &&
              Object.values(Providers).map((provider) => (
                <Button
                  key={provider.name}
                  variant="contained"
                  onClick={() => signIn(provider.id)}
                >
                  Sign in with {provider.name}
                </Button>
              ))}
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default Nav;
