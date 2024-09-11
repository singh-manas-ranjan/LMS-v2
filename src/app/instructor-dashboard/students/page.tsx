import WithRoleCheck from "@/app/hoc/WithRoleCheck";
import { Box, Heading } from "@chakra-ui/react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Learnopia | Students",
  description: "Learnopia | Students",
};

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
const Students = () => {
  return (
    <Box as="main" sx={main}>
      <Heading>Students</Heading>
    </Box>
  );
};

export default WithRoleCheck(Students, "instructor");
