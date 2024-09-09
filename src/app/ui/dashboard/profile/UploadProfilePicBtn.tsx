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
import React from "react";
import { FaCameraRetro } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { updateUserAvatar, updateUserInfo } from "@/actions/profile";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
const UploadProfilePicBtn = ({
  user,
}: {
  user: "STUDENTS" | "INSTRUCTORS";
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session, update } = useSession();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("id", session?.user?.id as string);
    startTransition(() => {
      updateUserAvatar(formData).then(() => update());
      onClose();
      router.refresh();
    });
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
                disabled={isPending}
                type="file"
                name="avatar"
                style={{ width: "100%" }}
                accept="image/jpeg, image/png , image/jpg"
              />
              <Button
                isLoading={isPending}
                loadingText="Uploading"
                disabled={isPending}
                type="submit"
                mt={3}
                size={"sm"}
                colorScheme="teal"
              >
                Upload
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default React.memo(UploadProfilePicBtn);
