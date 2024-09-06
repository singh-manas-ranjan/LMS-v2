import { auth, signOut } from "@/auth";
import { Box, Button, Heading } from "@chakra-ui/react";
import React from "react";

const main = {
  width: "100%",
  height: "100%",
  bg: "#fff",
  borderRadius: "4px",
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  overflow: "hidden",
};
const Settings = async () => {
  const session = await auth();
  return (
    <Box sx={main}>
      <Heading as="h1" size="md">
        Settings
      </Heading>
    </Box>
  );
};

export default Settings;
