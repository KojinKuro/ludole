import {
  Link as ChakraLink,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

export default function HamburgerMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <IconButton
        ref={btnRef}
        variant="ghost"
        onClick={onOpen}
        icon={<box-icon name="menu"></box-icon>}
      >
        Open
      </IconButton>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navigate</DrawerHeader>

          <DrawerBody>
            <Stack>
              <ChakraLink as={ReactRouterLink} to="/" onClick={onClose}>
                Home
              </ChakraLink>
              <ChakraLink as={ReactRouterLink} to="/about" onClick={onClose}>
                About
              </ChakraLink>
              <ChakraLink as={ReactRouterLink} to="/addgame" onClick={onClose}>
                Add Game
              </ChakraLink>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            {/* <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
