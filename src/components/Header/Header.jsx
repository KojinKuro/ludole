import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        <box-icon color="white" type="solid" name="invader" size="md" />
        <h1>LUDOLE</h1>
      </Link>
      <nav>
        <NavLink to="/about">
          <box-icon color="black" name="info-circle" />
        </NavLink>
        <NavLink to="/howto">
          <box-icon color="black" type="solid" name="help-circle" />
        </NavLink>
        <NavLink to="/addgame">
          <box-icon color="black" type="solid" name="add-to-queue"></box-icon>
        </NavLink>
      </nav>
    </header>
  );
}
