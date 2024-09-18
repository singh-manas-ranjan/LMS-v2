import { currentUser } from "@/lib/auth-session";
import { Box, Grid, Heading } from "@chakra-ui/react";
import Image from "next/image";

const getEducation = (education: string): string => {
  switch (education) {
    case "X":
      return "Secondary";
    case "XII":
      return "Senior Secondary";
    case "UG":
      return "Under-Graduate";
    case "PG":
      return "Post-Graduate";
    default:
      return "-NA-";
  }
};

const BriefProfileInfo = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await currentUser();
  return (
    <Box
      p={".3rem"}
      width={"100%"}
      h={"100%"}
      display={"flex"}
      flexDir={{ base: "column", md: "column" }}
      borderRadius={6}
    >
      <Box
        flex={{ base: 1 }}
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        rowGap={3}
        borderRadius={6}
        p={".9rem"}
        boxShadow={
          "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"
        }
      >
        <Box
          borderRadius={"50%"}
          w={"100px"}
          h={"100px"}
          display={"grid"}
          placeItems={"center"}
          position={"relative"}
        >
          <Image
            loading="lazy"
            alt="profile-pic"
            src={
              user?.isOAuth
                ? user?.image ?? "/avatar.svg"
                : user?.avatar ?? "/avatar.svg"
            }
            width={100}
            height={100}
            style={{
              borderRadius: "50%",
              boxShadow:
                "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
            }}
          />
          {children}
        </Box>
        <Grid textAlign={"center"} rowGap={2} color={"#364A63"}>
          <Heading fontSize={{ base: "sm", lg: "md" }}>
            {user ? `${user?.firstName} ${user?.lastName}` : ""}
          </Heading>
          <Heading fontSize={{ base: ".8rem", lg: "sm" }}>
            {" "}
            Std.ID: <span>3636</span>{" "}
          </Heading>
          <Heading fontSize={{ base: ".8rem", lg: "sm" }}>
            {user?.qualification ? getEducation(user?.qualification) : "-"}
          </Heading>
        </Grid>
      </Box>
    </Box>
  );
};

export default BriefProfileInfo;
