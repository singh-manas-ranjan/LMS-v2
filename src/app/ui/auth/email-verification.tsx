"use client";
import { emailVerification } from "@/actions/auth/email-verification";
import { Box, Text } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import Link from "next/link";

export const EmailVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token!");
      return;
    }

    emailVerification(token)
      .then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <Box
      w={{ base: "300px", sm: "350px" }}
      p={5}
      border={"1px"}
      borderColor={"gray.200"}
      marginInline={"auto"}
      marginTop={"-200px"}
      rounded={"md"}
      shadow={"md"}
      bg="rgba(225, 225, 225, 0.9)"
    >
      <Text fontSize={{ base: "md", sm: "lg" }} textAlign={"center"} mb={5}>
        Verify Your Email
      </Text>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        w={"100%"}
      >
        {!success && !error && <HashLoader size={20} />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </Box>
      <Box w={"100%"} textAlign={"center"} mt={5}>
        <Link
          href={"/auth/login?callbackUrl=dashboard"}
          style={{ fontSize: ".7rem", color: "#0275d8" }}
        >
          Back To Login
        </Link>
      </Box>
    </Box>
  );
};
