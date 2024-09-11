import withRoleCheck from "@/app/hoc/WithRoleCheck";
import { Box, Heading } from "@chakra-ui/react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Learnopia | Profile",
  description: "Learnopia | Profile",
};

const main = {
  width: "100%",
  height: "100vh",
  bg: "#fff",
  borderRadius: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const AdminProfile = () => {
  return (
    <Box as="main" sx={main}>
      <Heading>Admin Profile</Heading>
    </Box>
  );
};

export default withRoleCheck(AdminProfile, "admin");
