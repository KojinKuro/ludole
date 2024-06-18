import {
  Link as ChakraLink,
  Container,
  Heading,
  IconButton,
  Show,
} from "@chakra-ui/react";
import React from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import MobileMenu from "../MobileMenu/MobileMenu";
import CalendarModal from "../Modal/CalendarModal/CalendarModal";
import InstructionModal from "../Modal/InstructionModal/InstructionModal";
import StatsModal from "../Modal/StatModal/StatsModal";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="main-header">
      <Container>
        <ChakraLink as={ReactRouterLink} to="/" className="logo">
          <box-icon color="white" type="solid" name="invader" size="md" />
          <Heading as="h1" size="lg">
            LUDOLE
          </Heading>
        </ChakraLink>
      </Container>
      <nav>
        <Show below="md">
          <MobileMenu />
        </Show>
        <Show above="md">
          <CalendarModal />
          <StatsModal />
          <InstructionModal />
          <IconButton
            variant="ghost"
            aria-label="Navigate to add game page"
            icon={<box-icon color="black" name="info-circle" />}
            onClick={() => navigate("/about")}
          />
          <IconButton
            variant="ghost"
            aria-label="Navigate to add game page"
            icon={<box-icon color="black" type="solid" name="add-to-queue" />}
            onClick={() => navigate("/addgame")}
          />
        </Show>
      </nav>
    </header>
  );
}
