import EnrolledCourses from "@/app/ui/dashboard/enrolledCoursesContainer/EnrolledCourses";
import { Box } from "@chakra-ui/react";
import React from "react";
import { sxScrollbar } from "../../../../../public/scrollbarStyle";
import WithRoleCheck from "@/app/hoc/WithRoleCheck";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learnopia | My Courses",
  description: "Learnopia | My Courses",
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

const MyCourses = () => {
  return (
    <Box as="main" sx={main} rowGap={5} overflow={"hidden"}>
      <Box overflowY={"scroll"} w={"100%"} h={"100%"} sx={sxScrollbar}>
        <EnrolledCourses />
      </Box>
    </Box>
  );
};

export default WithRoleCheck(MyCourses, "student");
