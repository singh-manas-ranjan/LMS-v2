import {
  Box,
  Divider,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import socialLinksData from "../../../../../../public/socialLinksData";
import UpdatePassword from "../UpdatePassword";
import SocialLinks from "../socialLinks/SocialLinks";
import TextEditor from "../textEditor/TextEditor";
import { sxScrollbar } from "../../../../../../public/scrollbarStyle";
import PersonalInfo from "./PersonalInfo";
import { TAddress } from "../../../navbar/Navbar";
import { auth } from "@/auth";

export type TUserInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  address: TAddress;
};

const getGender = (gender: string): string => {
  switch (gender) {
    case "M":
      return "Male";
    case "F":
      return "Female";
    case "O":
      return "Other";
    default:
      return "-NA-";
  }
};

const DetailedProfileInfo = async () => {
  const session = await auth();

  const userInfo: TUserInfo = {
    firstName: session?.user.firstName,
    lastName: session?.user.lastName,
    email: session?.user.email,
    phone: session?.user.phone,
    gender: getGender(session?.user.gender!),
    address: session?.user.address,
  } as TUserInfo;

  return (
    <Tabs w={"100%"} h={"100%"}>
      <TabList color={"#364A63"}>
        <Tab p={3} fontSize={{ base: "sm" }}>
          Profile
        </Tab>
        <Tab p={3} fontSize={{ base: "sm" }}>
          Password
        </Tab>
        <Tab p={3} fontSize={{ base: "sm" }}>
          Social Links
        </Tab>
      </TabList>
      <TabPanels
        h={{ base: "100%" }}
        overflowY={{ base: "scroll" }}
        paddingBlock={".1rem"}
        sx={sxScrollbar}
      >
        <TabPanel
          p={0}
          paddingBlock={1}
          mt={5}
          overflowY={"scroll"}
          sx={sxScrollbar}
        >
          <Box
            borderRadius={6}
            display={"flex"}
            flexDir={"column"}
            rowGap={3}
            w={"100%"}
            h={"100%"}
            paddingInline={".1rem"}
          >
            <Box
              boxShadow={
                "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"
              }
              borderRadius={6}
              width={"100%"}
            >
              <Flex
                flexDir={"column"}
                width={"100%"}
                height={"100%"}
                p={{ base: ".9rem" }}
              >
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  width={"100%"}
                  h={"fit-content"}
                >
                  <Heading fontSize={{ base: "md" }} color={"#364A63"}>
                    Personal Information
                  </Heading>
                  {/* <EditPersonalInfo
                    userId={user._id ?? ""}
                    userInfo={user}
                    handleUpdateUserInfo={handleNewUserInfo}
                  /> */}
                </Box>
                <Divider marginBlock={2} orientation="horizontal" />
                <PersonalInfo userData={userInfo} />
              </Flex>
            </Box>
            <Box
              borderRadius={6}
              boxShadow={
                "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"
              }
              p={"1rem"}
              display={"flex"}
              flexDir={"column"}
              width={"100%"}
              h={"100%"}
            >
              <TextEditor label={"Bio"} />
            </Box>
          </Box>
        </TabPanel>
        <TabPanel>
          <UpdatePassword />
        </TabPanel>
        <TabPanel>
          <Box h={"100%"}>
            <SocialLinks socialLinks={socialLinksData} />
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default DetailedProfileInfo;
