import { Flex, Box } from "@chakra-ui/react";
import ContentLoader from "react-content-loader";

const ProfileContentLoader = () => {
  return (
    <Box>
      <Flex justify="space-between" height="40px">
        <ContentLoader
          height={"100%"}
          width={100}
          speed={0.9}
          backgroundColor={"#0F3460"}
          foregroundColor={"#999"}
        >
          <rect rx="6" ry="6" width={"100%"} height="100%" />
        </ContentLoader>
        <ContentLoader
          height={"100%"}
          width={120}
          speed={0.9}
          backgroundColor={"#0F3460"}
          foregroundColor={"#999"}
        >
          <rect rx="6" ry="6" width={"100%"} height="100%" />
        </ContentLoader>
      </Flex>
      <Box
        mt="6"
        height={{ base: "190px", sm: "132px" }}
        maxW={{ sm: "450px" }}
      >
        <ContentLoader
          height={"100%"}
          width={"100%"}
          speed={0.9}
          backgroundColor={"#0F3460"}
          foregroundColor={"#999"}
        >
          <rect rx="6" ry="6" width="100%" height="100%" />
        </ContentLoader>
      </Box>

      <Box mt="6" height={{ base: "190px", sm: "77px" }}>
        <ContentLoader
          height={"100%"}
          width={"100%"}
          speed={0.9}
          backgroundColor={"#0F3460"}
          foregroundColor={"#999"}
        >
          <rect rx="6" ry="6" width="100%" height="100%" />
        </ContentLoader>
      </Box>
    </Box>
  );
};

export default ProfileContentLoader;
