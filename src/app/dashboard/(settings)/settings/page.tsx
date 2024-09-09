import WithRoleCheck from "@/app/hoc/WithRoleCheck";
import { signOut } from "@/auth";
import { currentUser } from "@/lib/auth-session";
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
  const user = await currentUser();
  return (
    <Box sx={main}>
      <Heading as="h1" size="md">
        Settings
      </Heading>
    </Box>
  );
};

export default WithRoleCheck(Settings, "student");
