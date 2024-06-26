import { Button, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import "./ErrorComponent.css";

export default function ErrorComponent({ error, resetErrorBoundary }) {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
    resetErrorBoundary();
  };

  return (
    <>
      <Text>
        {error.name} {error.message}
      </Text>
      <Button onClick={navigateHome}>Return Home</Button>
    </>
  );
}

ErrorComponent.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
};
