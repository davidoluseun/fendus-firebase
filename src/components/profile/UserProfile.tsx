import * as React from "react";
import { Box, Flex, Heading, Text, Image, Grid } from "@chakra-ui/react";
import { Icon, Input, FormLabel, Button, keyframes } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { IoCamera } from "react-icons/io5";
import DefaultUser from "../../images/user.webp";

type UserProfileProps = {
  userInfo: APP.UserInfoTypes;
  photoURL: string | null | undefined;
  onPhotoURLChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  photoIsLoading: boolean;
  onProfileEdit: () => void;
};

const UserProfile = (props: UserProfileProps) => {
  const { userInfo, photoURL, onPhotoURLChange, onProfileEdit } = props;
  const { photoIsLoading } = props;

  const spin = keyframes`
  0%{ transform: rotate(0deg);}  
  100% { transform: rotate(360deg);}
`;

  const animation = `${spin} infinite 600ms linear `;

  return (
    <Box>
      <Flex
        as="section"
        justify="space-between"
        fontSize={{ base: "18px", sm: "24px" }}
      >
        <Flex align="center">
          <Icon as={FaUser} color="primary" />
          <Heading as="h1" ml={{ base: "1", sm: "2" }} fontSize="inherit">
            Profile
          </Heading>
        </Flex>

        <Button
          bg="primary"
          color="#fff"
          _hover={{ bg: "primary", color: "#fff" }}
          _active={{ bg: "primary", color: "#fff" }}
          fontSize={{ base: "14px", sm: "1rem" }}
          onClick={onProfileEdit}
        >
          Edit Profile
        </Button>
      </Flex>

      <Box
        mt="6"
        p="4"
        bg="#fff"
        as="section"
        borderRadius="md"
        maxW={{ sm: "450px" }}
        justifySelf={{ sm: "start" }}
        boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
      >
        <Flex
          align="center"
          fontSize={{ base: "16px", sm: "18px" }}
          direction={{ base: "column", sm: "row" }}
        >
          <Flex align="flex-end" position="relative">
            <Image
              w="100px"
              h="100px"
              borderRadius="full"
              src={photoURL ? photoURL : DefaultUser}
              alt="Profile image"
            />

            <FormLabel
              mr="0"
              mb="0"
              ml="-8"
              minW="40px"
              minH="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="full"
              bg="rgb(227, 233, 239)"
              htmlFor="profile-image"
              cursor="pointer"
            >
              <Icon color="rgb(15, 52, 96)" boxSize="22px" as={IoCamera} />
            </FormLabel>

            <Input
              id="profile-image"
              type="file"
              accept="image/*"
              display="none"
              onChange={onPhotoURLChange}
            />
            <Box
              w="40px"
              h="40px"
              left="30px"
              top="30px"
              borderRadius="50%"
              position="absolute"
              animation={animation}
              display={photoIsLoading ? "block" : "none"}
              border="3px solid rgb(15, 52, 96)"
              borderTopColor="transparent"
            ></Box>
          </Flex>
          <Box ml={{ sm: "4" }} mt={{ base: "3", sm: "0" }} alignSelf="center">
            <Heading
              as="h2"
              fontSize={{ base: "16px", sm: "18px" }}
              textAlign={{ base: "center", sm: "left" }}
            >
              {userInfo?.fullName}
            </Heading>
            <Text>{userInfo?.email}</Text>
          </Box>
        </Flex>
      </Box>

      <Grid
        mt="6"
        p="4"
        bg="#fff"
        borderRadius="md"
        fontSize={{ base: "14px", md: "16px" }}
        gridTemplateColumns={{ sm: "1fr .8fr .5fr .8fr" }}
        gridGap="3"
        boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
      >
        <Flex direction="column">
          <Box fontSize={{ base: "12px", md: "14px" }} color="rgb(84 97 125)">
            Full name
          </Box>
          <Box>{userInfo?.fullName}</Box>
        </Flex>

        <Flex direction="column">
          <Box fontSize={{ base: "12px", md: "14px" }} color="rgb(84 97 125)">
            Email address
          </Box>
          <Box>{userInfo?.email}</Box>
        </Flex>

        <Flex direction="column" justifySelf={{ sm: "center" }}>
          <Box fontSize={{ base: "12px", md: "14px" }} color="rgb(84 97 125)">
            State
          </Box>
          <Box>{userInfo?.state}</Box>
        </Flex>

        <Flex direction="column">
          <Box fontSize={{ base: "12px", md: "14px" }} color="rgb(84 97 125)">
            Phone number
          </Box>
          <Box>{userInfo?.phoneNumber}</Box>
        </Flex>
      </Grid>
    </Box>
  );
};

export default UserProfile;
