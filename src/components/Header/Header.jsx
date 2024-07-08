import { Link as ChakraLink, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";

import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import CalendarModal from "../Modal/CalendarModal/CalendarModal";
import InstructionModal from "../Modal/InstructionModal/InstructionModal";
import StatsModal from "../Modal/StatModal/StatsModal";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="main-header">
      <Flex as="nav" justifyContent="space-between">
        <HamburgerMenu />
        <div>
          <ChakraLink
            as={ReactRouterLink}
            to="/"
            className="logo"
            display="flex"
            alignItems="center"
          >
            <box-icon color="white" type="solid" name="invader" size="md" />
            <Heading as="h1" size="lg" textTransform="capitalize">
              LUDOLE
            </Heading>
          </ChakraLink>
        </div>
        <div>
          <CalendarModal />
          <StatsModal />
          <InstructionModal />
        </div>
      </Flex>
    </header>
  );
}
