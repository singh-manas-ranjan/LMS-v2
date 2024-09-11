"use client";
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { MdOutlineFilterAlt } from "react-icons/md";
import { HiSortAscending } from "react-icons/hi";
import { orderByBtnType } from "../../../../../public/orderByBtns";
import { useRouter } from "next/navigation";

interface Props {
  button: orderByBtnType;
  selectedOptn: string;
}

const getIcon = (btnName: string): JSX.Element | null => {
  switch (btnName) {
    case "Filter":
      return <MdOutlineFilterAlt />;
    case "Sort":
      return <HiSortAscending />;
    default:
      return null;
  }
};

const OrderByBtn = ({ button: { btnName, options }, selectedOptn }: Props) => {
  const router = useRouter();

  const handleOnChange = (value: string | string[]) => {
    const queryParam = btnName.toLowerCase();
    const url = new URL(window.location.href);
    url.searchParams.set(queryParam, value.toString());
    router.push(url.toString());
  };

  return (
    <Menu closeOnSelect={true}>
      <MenuButton
        as={Button}
        colorScheme="teal"
        variant="outline"
        display={"flex"}
        alignItems={"center"}
        borderColor={"#A0AEC0"}
        size={{ base: "xs", sm: "sm", lg: "md" }}
      >
        <Text
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          columnGap={1}
          fontSize={{ base: "xs", sm: "sm" }}
        >
          {getIcon(btnName)} {btnName}
        </Text>
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup
          defaultValue={selectedOptn}
          title={btnName.toLowerCase()}
          type="radio"
          value={selectedOptn}
          onChange={handleOnChange}
        >
          {options.map((optn, idx) => (
            <MenuItemOption key={idx} value={optn.split(" ")[0].toLowerCase()}>
              {optn}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default OrderByBtn;
