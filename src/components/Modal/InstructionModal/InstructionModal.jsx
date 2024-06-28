import {
  Button,
  IconButton,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";

export default function InstructionModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        aria-label="Open instructions"
        variant="ghost"
        onClick={onOpen}
        icon={<box-icon color="black" type="solid" name="help-circle" />}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>How to Play</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Guess the video game in 8 tries</Text>
            <UnorderedList>
              <ListItem>
                Each guess must be a valid game from our database.
              </ListItem>
              <ListItem>
                The color of the will change to show how close your guess was to
                the word.
              </ListItem>
              <ListItem>
                Each time you guess incorrectly, the game will become less
                obscured.
              </ListItem>
            </UnorderedList>
            <Text>Every day at midnight a new puzzle will unlock.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
