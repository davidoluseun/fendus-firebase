import { Box, Heading, Flex, IconButton } from "@chakra-ui/react";
import ReactTooltip from "react-tooltip";
import { FaPenFancy } from "react-icons/fa";

type DeliveryInfoProps = {
  onUpdate: () => void;
  userInfo: APP.UserInfoTypes;
};

const DeliveryInfo = ({ onUpdate, userInfo }: DeliveryInfoProps) => {
  
  return (
    <Box as="section">
      <Box
        p="4"
        borderRadius="md"
        bg="#fff"
        boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
      >
        <Flex justify="space-between">
          <Heading as="h1" mb="4" fontSize="20px">
            Delivery Info.
          </Heading>

          <IconButton
            bg="bg"
            borderRadius="full"
            _active={{ bg: "bg" }}
            _hover={{ bg: "bg" }}
            aria-label="Update delivery info."
            onClick={onUpdate}
            data-tip="Edit info."
            data-for="edit"
            icon={<FaPenFancy size="20px" />}
          />
          <ReactTooltip id="edit" effect="solid" />
        </Flex>

        <Flex mb="3" direction={{ base: "column", sm: "row" }}>
          <Box as="strong" flexBasis="30%" mr={{ sm: "3" }}>
            Full name:
          </Box>
          <Box as="span" flexBasis="70%">
            {userInfo?.fullName}
          </Box>
        </Flex>

        <Flex mb="3" direction={{ base: "column", sm: "row" }}>
          <Box as="strong" flexBasis="30%" mr={{ sm: "3" }}>
            Email address:
          </Box>
          <Box as="span" flexBasis="70%">
            {userInfo?.email}
          </Box>
        </Flex>

        <Flex mb="3" direction={{ base: "column", sm: "row" }}>
          <Box as="strong" flexBasis="30%" mr={{ sm: "3" }}>
            Phone number:
          </Box>
          <Box as="span" flexBasis="70%">
            {userInfo?.phoneNumber}
          </Box>
        </Flex>

        <Flex mb="3" direction={{ base: "column", sm: "row" }}>
          <Box as="strong" flexBasis="30%" mr={{ sm: "3" }}>
            Address:
          </Box>
          <Box as="span" flexBasis="70%">
            {userInfo?.address}
          </Box>
        </Flex>

        <Flex mb="3" direction={{ base: "column", sm: "row" }}>
          <Box as="strong" flexBasis="30%" mr={{ sm: "3" }}>
            City/Town:
          </Box>
          <Box as="span" flexBasis="70%">
            {userInfo?.city}
          </Box>
        </Flex>

        <Flex mb="3" direction={{ base: "column", sm: "row" }}>
          <Box as="strong" flexBasis="30%" mr={{ sm: "3" }}>
            State:
          </Box>
          <Box as="span" flexBasis="70%">
            {userInfo?.state}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default DeliveryInfo;
