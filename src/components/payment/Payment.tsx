import * as React from "react";
import { Box, Grid } from "@chakra-ui/react";
import { useAlert } from "react-alert";
import DeliveryInfo from "./DeliveryInfo";
import DeliveryForm from "./DeliveryForm";
import SubHelperLinks from "../common/SubHelperLinks";
import MakePayment from "./MakePayment";
import PaymentContentLoader from "./PaymentContentLoader";
import Error from "../common/Error";
import { auth, db } from "../../firebase";

const Payment = () => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubscribed, setIsSubscribed] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState<APP.UserInfoTypes>({});
  const alert = useAlert();

  React.useEffect(() => {
    const getuserInfo = async () => {
      try {
        const userDocRef = db.collection("users").doc(auth.currentUser?.uid);
        const querySnapshot = await userDocRef.collection("orders").get();
        const docsLength = querySnapshot.docs.length;
        const userDoc = await userDocRef.get();
        const userInfo = userDoc.data();

        setUserInfo(userInfo);
        if (docsLength) setIsSubmitted(true);
      } catch (err) {
        setHasError(true);
      }

      setIsLoading(false);
      setIsSubscribed(false);
    };

    if (isSubscribed) getuserInfo();

    return () => {
      setIsSubscribed(false);
    };
    
  }, [isSubscribed]);

  const handleTryAgain = () => {
    setIsLoading(true);
    setIsSubscribed(true);
    setHasError(false);
  };

  const handleUpdate = () => setIsSubmitted(false);

  const handleSubmit = async (data: APP.UserInfoTypes) => {
    try {
      await db
        .collection("users")
        .doc(auth.currentUser?.uid)
        .update({ ...data });

      let displayName = data?.fullName;

      if (displayName.indexOf(" ") >= 0)
        displayName = displayName.split(" ").slice(0, -1)[0];

      await auth.currentUser?.updateProfile({ displayName });

      setUserInfo(data);
      setIsSubmitted(true);
      return true;
    } catch (err) {
      alert.show(
        "Oops! An error occurred. Check your internet connection and try again."
      );
      return false;
    }
  };

  return (
    <Box px={{ base: "4", md: "6" }} marginX="auto" maxW="1200px">
      <Box mb={{ lg: "5" }}>
        <SubHelperLinks isPayment={true} />
      </Box>
      <Grid templateColumns={{ lg: "1fr .5fr" }} gridGap="6">
        {isLoading ? (
          <PaymentContentLoader />
        ) : (
          <>
            {hasError ? (
              <Error text="info" onTryAgain={handleTryAgain} />
            ) : (
              <>
                {isSubmitted ? (
                  <DeliveryInfo onUpdate={handleUpdate} userInfo={userInfo} />
                ) : (
                  <DeliveryForm doSubmit={handleSubmit} userInfo={userInfo} />
                )}
              </>
            )}
          </>
        )}
        <MakePayment isSubmitted={isSubmitted} userInfo={userInfo} />
      </Grid>
    </Box>
  );
};

export default Payment;
