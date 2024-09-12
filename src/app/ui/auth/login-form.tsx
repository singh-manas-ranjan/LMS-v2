"use client";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import {
  Box,
  Text,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  VStack,
  Select,
} from "@chakra-ui/react";
import Link from "next/link";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import { LockKeyholeIcon, User } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { login } from "@/actions/auth/login";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const callbackUrl = searchParams.get("callbackUrl");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values, callbackUrl).then((data) => {
        if (data?.error) {
          form.reset();
          setError(data?.error);
        } else {
          form.reset();
          setSuccess(data?.success);
        }
      });
    });
  };

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: "/dashboard",
    });
  };

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
      bg="rgba(225, 225, 225, 0.8)"
    >
      <Text
        fontSize={{ base: "md", sm: "x-large" }}
        textAlign={"center"}
        mb={5}
      >
        Sign In
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <FormControl isInvalid={!!errors.email}>
            <InputGroup size={{ base: "sm", lg: "md" }}>
              <InputLeftElement>
                <User size={15} color="grey" />
              </InputLeftElement>
              <Input
                type="email"
                placeholder="Email"
                {...form.register("email")}
                size={{ base: "sm", lg: "md" }}
                fontSize={{ base: ".8rem", lg: "md" }}
                bg={"white"}
                rounded={"4"}
                disabled={isPending}
              />
            </InputGroup>
            <FormErrorMessage fontSize={".8rem"}>
              {errors.email?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <InputGroup size={{ base: "sm", lg: "md" }}>
              <InputLeftElement>
                <LockKeyholeIcon size={15} color="grey" />
              </InputLeftElement>
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
                size={{ base: "sm", lg: "md" }}
                fontSize={{ base: ".8rem", lg: "md" }}
                bg={"white"}
                rounded={"4"}
                disabled={isPending}
                autoComplete="password"
              />
            </InputGroup>
            <FormErrorMessage fontSize={".8rem"}>
              {errors.password?.message}
            </FormErrorMessage>
          </FormControl>

          <FormSuccess message={success} />
          <FormError message={error} />
          <Box display={"flex"} justifyContent={"start"} w={"100%"}>
            <Link
              href={"/auth/reset"}
              style={{ color: "#0275d8", fontSize: ".8rem" }}
            >
              Forgot Password?
            </Link>
          </Box>

          <Box w={"100%"} display={"flex"} justifyContent={"center"}>
            <Button
              type="submit"
              isLoading={isPending}
              loadingText="Submitting"
              disabled={isPending}
              size={{ base: "sm", lg: "md" }}
              w={"100%"}
              colorScheme="blue"
              rounded={"4"}
              justifySelf={"right"}
            >
              <Text fontSize={{ base: ".8rem", lg: "md" }}>Submit</Text>
            </Button>
          </Box>

          <Box display={"flex"} justifyContent={"center"} w={"100%"}>
            <Link
              href={"/auth/register"}
              style={{ color: "#0275d8", fontSize: ".8rem" }}
            >
              Don&apos;t have an account?
            </Link>
          </Box>
          {callbackUrl?.startsWith("/dash") && (
            <Box
              w={"100%"}
              display={"flex"}
              justifyContent={"space-between"}
              columnGap={3}
            >
              <Button
                flex={1}
                size={"sm"}
                rounded={4}
                onClick={() => onClick("google")}
              >
                <FcGoogle size={20} />
              </Button>
              <Button
                flex={1}
                size={"sm"}
                rounded={4}
                onClick={() => onClick("github")}
              >
                <FaGithub size={20} />
              </Button>
            </Box>
          )}
        </VStack>
      </form>
    </Box>
  );
};
