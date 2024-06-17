import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { formatDate } from "date-fns";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router";

export default function CalendarModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [date, setDate] = useState();

  const navigateDate = (chosenDate) => {
    const navigateDate = chosenDate || date;
    console.log(navigateDate);
    if (!navigateDate) return;

    navigate(`/challenge/${formatDate(navigateDate, "yyyy-MM-dd")}`);
    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Open challenge calendar"
        onClick={onOpen}
        variant="ghost"
        icon={<box-icon name="calendar" type="solid" />}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Calendar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Calendar onChange={setDate} maxDate={new Date()} />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              variant="ghost"
              mr={3}
              onClick={() => navigateDate(new Date())}
            >
              Go to today
            </Button>
            <Button colorScheme="blue" mr={3} onClick={() => navigateDate()}>
              Go to Challenge
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
