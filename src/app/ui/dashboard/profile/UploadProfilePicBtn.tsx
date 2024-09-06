"use client";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { FaCameraRetro } from "react-icons/fa";
import { useSession } from "next-auth/react";
const UploadProfilePicBtn = ({
  user,
}: {
  user: "STUDENTS" | "INSTRUCTORS";
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session, update } = useSession();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    // formData.append("id", session.user.id);

    // try {
    //   const response = await axios.patch(
    //     `http://localhost:3131/api/v1/${user.toLowerCase()}/avatar`,
    //     {
    //       formData,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    //   onClose();
    // } catch (error) {
    //   console.error("Failed to upload profile picture:", error);
    // }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        position={"absolute"}
        bottom={-1}
        right={-1}
        display={"grid"}
        placeItems={"center"}
        boxSize={10}
        borderRadius={"50%"}
        bg={"#E5E9F28C"}
        _hover={{ bg: "#97CAF0" }}
      >
        <FaCameraRetro />
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInTop"
        size={{ base: "xs", sm: "sm" }}
        closeOnEsc={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Picture</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              style={{
                display: "grid",
                justifyContent: "center",
                padding: ".5rem",
              }}
              onSubmit={handleSubmit}
            >
              <input
                type="file"
                name="avatar"
                style={{ width: "100%" }}
                accept="image/jpeg, image/png , image/jpg"
              />
              <Button type="submit" mt={3} size={"sm"} colorScheme="teal">
                Submit
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default React.memo(UploadProfilePicBtn);
