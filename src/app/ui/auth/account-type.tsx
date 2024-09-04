"use client";

import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";

export const AccountType = () => {
  return (
    <Box
      display={"flex"}
      flexDir={{ base: "column", md: "row" }}
      rowGap={5}
      columnGap={{ base: 5, md: 10 }}
    >
      <Box
        flex={1}
        w={{ base: "250px" }}
        p={5}
        border={"1px"}
        borderColor={"gray.200"}
        marginInline={"auto"}
        rounded={"md"}
        shadow={"md"}
        bg="rgba(225, 225, 225, 1)"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        _hover={{
          cursor: "pointer",
          bg: "rgba(225, 225, 225, 0.8)",
        }}
        position={"relative"}
      >
        <Box
          w={90}
          h={90}
          position={"absolute"}
          top={-12}
          bgImage={"/student.png"}
          bgSize={"cover"}
          bgRepeat={"no-repeat"}
          bgPosition={"center"}
          rounded={"50%"}
        />
        <Link href={"/dashboard"} style={{ marginTop: "15px" }}>
          <Text
            fontSize={{ base: "md", sm: "x-large" }}
            textAlign={"center"}
            m={5}
          >
            Student
          </Text>
        </Link>
      </Box>
      <Box
        flex={1}
        w={{ base: "250px" }}
        p={5}
        border={"1px"}
        borderColor={"gray.200"}
        marginInline={"auto"}
        rounded={"md"}
        shadow={"md"}
        bg="rgba(225, 225, 225, 1)"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        _hover={{
          cursor: "pointer",
          bg: "rgba(225, 225, 225, 0.8)",
        }}
        position={"relative"}
      >
        <Box
          w={90}
          h={90}
          position={"absolute"}
          top={-12}
          bgImage={"/instructor1.png"}
          bgSize={"cover"}
          bgRepeat={"no-repeat"}
          bgPosition={"center"}
          rounded={"50%"}
        />
        <Link href={"/instructor-dashboard"} style={{ marginTop: "15px" }}>
          <Text
            fontSize={{ base: "md", sm: "x-large" }}
            textAlign={"center"}
            m={5}
          >
            Instructor
          </Text>
        </Link>
      </Box>
    </Box>
  );
};
