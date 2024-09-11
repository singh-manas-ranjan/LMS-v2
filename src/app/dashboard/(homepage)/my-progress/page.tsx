import WithRoleCheck from "@/app/hoc/WithRoleCheck";
import { Box, Heading } from "@chakra-ui/react";
import { Metadata } from "next";
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
export const metadata: Metadata = {
  title: "Learnopia | My Progress",
  description: "Learnopia | My Progress",
};
const MyProgress = () => {
  return (
    <Box as="main" sx={main}>
      <Heading>MyProgress</Heading>
    </Box>
  );
};

export default WithRoleCheck(MyProgress, "student");
