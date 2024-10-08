import { Box } from "@chakra-ui/react";
import React, { Suspense } from "react";
import Overview from "../ui/adminDashboard/overview/Overview";
import WithRoleCheck from "../hoc/WithRoleCheck";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learnopia | Dashboard",
  description: "Learnopia | Dashboard",
};

const main = {
  width: "100%",
  height: "fit-content",
  borderRadius: "4px",
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  bg: "#ffffff",
};

const AdminDashboard = () => {
  return (
    <Box as="main" sx={main} rowGap={5} overflow={"hidden"}>
      <Suspense>
        <Overview />
      </Suspense>
    </Box>
  );
};

export default WithRoleCheck(AdminDashboard, "admin");
