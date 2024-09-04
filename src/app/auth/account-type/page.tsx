import { AccountType } from "@/app/ui/auth/account-type";
import { LoginForm } from "@/app/ui/auth/login-form";
import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

const navStyle = {
  w: "100%",
  paddingInline: "2rem",
  justifyContent: "space-between",
  alignItems: "center",
};
const LoginPage = () => {
  return (
    <Box>
      <Flex as="nav" sx={navStyle} boxShadow={"0 2px 2px -2px gray"}>
        <Link href={"/"}>
          <Text
            fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
            fontWeight={"bold"}
            padding={"1rem"}
            color={"#044F63"}
            position={"absolute"}
            pl={"2rem"}
            top={"0"}
            left={"0"}
            right={"0"}
            boxShadow={"0 2px 2px -2px gray"}
          >
            Learnopia
          </Text>
        </Link>
      </Flex>
      <Box
        bgImage={"/bgImg.jpg"}
        bgSize={"cover"}
        bgRepeat={"no-repeat"}
        bgPosition={"center"}
        w={"100%"}
        h={"92dvh"}
        mt={"3rem"}
      >
        <Box
          w={"100%"}
          h={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          bg="rgba(0, 0, 0, 0.4)"
          p={5}
        >
          <AccountType />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
