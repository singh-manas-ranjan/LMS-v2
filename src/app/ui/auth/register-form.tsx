"use client";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
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
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import {
  Edit,
  Edit3Icon,
  LockIcon,
  LockKeyholeIcon,
  MailIcon,
  Phone,
  User,
} from "lucide-react";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      accountType: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      console.log(values);
    });
  };

  return (
    <Box
      w={{ base: "300px", sm: "470px" }}
      p={5}
      border={"1px"}
      borderColor={"gray.200"}
      marginInline={"auto"}
      rounded={"md"}
      shadow={"md"}
      bg="rgba(225, 225, 225, 0.8)"
    >
      <Text
        fontSize={{ base: "md", sm: "x-large" }}
        textAlign={"center"}
        mb={5}
      >
        Sign Up
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <HStack
            flexDir={{ base: "column", sm: "row" }}
            spacing={4}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
          >
            <FormControl isInvalid={!!errors.firstName}>
              <InputGroup size={{ base: "sm" }}>
                <InputLeftElement>
                  <Edit3Icon size={15} color="grey" />
                </InputLeftElement>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  {...form.register("firstName")}
                  size={{ base: "sm" }}
                  fontSize={{ base: "xs", md: "sm" }}
                  bg={"white"}
                  rounded={"4"}
                />
              </InputGroup>
              <FormErrorMessage fontSize={".8rem"}>
                {errors.firstName?.message}
              </FormErrorMessage>
            </FormControl>
            {/* ====== LastName ====== */}
            <FormControl isInvalid={!!errors.lastName}>
              <InputGroup size={{ base: "sm" }}>
                <InputLeftElement>
                  <Edit3Icon size={15} color="grey" />
                </InputLeftElement>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  {...form.register("lastName")}
                  size={{ base: "sm" }}
                  fontSize={{ base: "xs", md: "sm" }}
                  bg={"white"}
                  rounded={"4"}
                />
              </InputGroup>
              <FormErrorMessage fontSize={".8rem"}>
                {errors.lastName?.message}
              </FormErrorMessage>
            </FormControl>
          </HStack>

          <HStack
            flexDir={{ base: "column", sm: "row" }}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
          >
            {/* ====== Email ====== */}
            <FormControl isInvalid={!!errors.email}>
              <InputGroup size={{ base: "sm" }}>
                <InputLeftElement>
                  <MailIcon size={15} color="grey" />
                </InputLeftElement>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...form.register("email")}
                  size={{ base: "sm" }}
                  fontSize={{ base: "xs", md: "sm" }}
                  bg={"white"}
                  rounded={"4"}
                />
              </InputGroup>
              <FormErrorMessage fontSize={".8rem"}>
                {errors.email?.message}
              </FormErrorMessage>
            </FormControl>
            {/* ====== Username ====== */}
            <FormControl isInvalid={!!errors.username}>
              <InputGroup size={{ base: "sm" }}>
                <InputLeftElement>
                  <User size={15} color="grey" />
                </InputLeftElement>
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  {...register("username")}
                  size={{ base: "sm" }}
                  fontSize={{ base: "xs", md: "sm" }}
                  bg={"white"}
                  rounded={"4"}
                />
              </InputGroup>
              <FormErrorMessage fontSize={".8rem"}>
                {errors.username?.message}
              </FormErrorMessage>
            </FormControl>
          </HStack>

          <HStack
            flexDir={{ base: "column", sm: "row" }}
            spacing={4}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
          >
            {/* ====== Password ====== */}
            <FormControl isInvalid={!!errors.password}>
              <InputGroup size={{ base: "sm" }}>
                <InputLeftElement>
                  <LockIcon size={15} color="grey" />
                </InputLeftElement>
                <Input
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                  size={{ base: "sm" }}
                  fontSize={{ base: "xs", md: "sm" }}
                  bg={"white"}
                  rounded={"4"}
                  autoComplete="password"
                />
              </InputGroup>
              <FormErrorMessage fontSize={".8rem"}>
                {errors.password?.message}
              </FormErrorMessage>
            </FormControl>
            {/* ====== Confirm-Password ====== */}
            <FormControl isInvalid={!!errors.confirmPassword}>
              <InputGroup size={{ base: "sm" }}>
                <InputLeftElement>
                  <LockIcon size={15} color="grey" />
                </InputLeftElement>
                <Input
                  type="password"
                  placeholder="Confirm password"
                  {...register("confirmPassword")}
                  size={{ base: "sm" }}
                  fontSize={{ base: "xs", md: "sm" }}
                  bg={"white"}
                  rounded={"4"}
                  autoComplete="confirm-password"
                />
              </InputGroup>
              <FormErrorMessage fontSize={".8rem"}>
                {errors.confirmPassword?.message}
              </FormErrorMessage>
            </FormControl>
          </HStack>
          <HStack
            flexDir={{ base: "column", sm: "row" }}
            spacing={4}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
          >
            {/* ====== Phone ====== */}
            <FormControl isInvalid={!!errors.phone}>
              <InputGroup size={{ base: "sm" }}>
                <InputLeftElement>
                  <Phone size={15} color="grey" />
                </InputLeftElement>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Phone"
                  {...register("phone")}
                  size={{ base: "sm" }}
                  fontSize={{ base: "xs", md: "sm" }}
                  bg={"white"}
                  rounded={"4"}
                />
              </InputGroup>
              <FormErrorMessage fontSize={".8rem"}>
                {errors.phone?.message}
              </FormErrorMessage>
            </FormControl>
            {/* ====== Acc-Type ====== */}
            <FormControl isInvalid={!!errors.accountType}>
              <Select
                {...form.register("accountType")}
                size={{ base: "sm" }}
                placeholder="Account Type"
                bg={"white"}
                fontSize={{ base: "xs", md: "sm" }}
                rounded={"4"}
              >
                <option value="students">Student</option>
                <option value="instructors">Instructor</option>
              </Select>
              <FormErrorMessage fontSize={".8rem"}>
                {errors.accountType?.message}
              </FormErrorMessage>
            </FormControl>
          </HStack>

          <FormSuccess message={success} />
          <FormError message={error} />

          <Box w={"100%"} display={"flex"} justifyContent={"center"}>
            <Button
              type="submit"
              isLoading={isPending}
              loadingText="Submitting"
              disabled={isPending}
              size={{ base: "sm" }}
              w={"100%"}
              colorScheme="blue"
              rounded={"4"}
              justifySelf={"right"}
            >
              <Text fontSize={{ base: "xs", md: "sm" }}>Submit</Text>
            </Button>
          </Box>

          <Box display={"flex"} justifyContent={"center"} w={"100%"}>
            <Link
              href={"/auth/account-type"}
              style={{ color: "#0275d8", fontSize: ".8rem" }}
            >
              Already have an account?
            </Link>
          </Box>
        </VStack>
      </form>
    </Box>
  );
};
