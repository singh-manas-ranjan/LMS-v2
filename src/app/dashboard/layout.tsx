import { Box, Container, Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Sidebar from "../ui/dashboard/sidebar/Sidebar";
import Navbar from "../ui/navbar/Navbar";
import sidebarLinks from "../../../public/sidebarLinks";
import { currentUser } from "@/lib/auth-session";
import { Metadata } from "next";

export const metadata: Metadata = {
  keywords:
    "Learnopia, Learnopia.com, Learnopia.org, Courses, Education, E-learning, Online Courses, Free Courses, Free Education, Free E-Learning, Online Education, Online E-Learning, MOOCs, Massive Open Online Courses, Open Education, Open E-Learning",
  robots: "follow, index",
  generator: "Learnopia",
};

interface Props {
  children: ReactNode;
}

const DashBoardLayout = async ({ children }: Props) => {
  const user = await currentUser();

  const container = {
    w: "100%",
    h: "100vh",
    display: "flex",
    bg: "#EFF8FF",
  };

  const menuContainer = {
    paddingRight: { sm: "1rem" },
    h: "100vh",
    display: "flex",
    flexDirection: "column",
  };

  const nav_content_container = {
    flex: "6",
    display: "flex",
    flexDirection: "column",
    h: "100%",
    rowGap: "1rem",
    // overflowY: "scroll",
  };

  return (
    <Box as="main" sx={container}>
      <Box sx={menuContainer} width={"fit-content"}>
        <Sidebar navLinks={sidebarLinks} />
      </Box>
      <Box sx={nav_content_container}>
        <Navbar
          navLinks={sidebarLinks}
          avatar={user?.avatar ?? ""}
          firstName={user?.firstName ?? ""}
        />
        {children}
      </Box>
    </Box>
  );
};

export default DashBoardLayout;
