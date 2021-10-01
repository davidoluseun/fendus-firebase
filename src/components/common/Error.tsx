import { Flex, Text, Heading, Button } from "@chakra-ui/react";

type ErrorProps = {
  onTryAgain: () => void;
  text: string;
};

const Error = ({ onTryAgain, text }: ErrorProps) => {
  
  return (
    <Flex
      p="4"
      bg="#fff"
      as="section"
      borderRadius="md"
      direction="column"
      align="center"
      justify="center"
      boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
    >
      <Heading as="h1" fontSize={{ base: "16px", sm: "24px" }}>
        Something Went Wrong
      </Heading>
      <Text
        maxW="470px"
        mb="4"
        mt={{ base: "1", sm: "2" }}
        textAlign="center"
        fontSize={{ base: "16px", sm: "18px" }}
      >
        We couldn't load your {text}. Check your internet connection and try
        again.
      </Text>
      <Button
        bg="primary"
        color="#fff"
        _hover={{ bg: "primary" }}
        _active={{ bg: "primary" }}
        onClick={onTryAgain}
      >
        Try Again
      </Button>
    </Flex>
  );
};

export default Error;
