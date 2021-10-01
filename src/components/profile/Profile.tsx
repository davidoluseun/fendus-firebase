import * as React from "react";
import { Box, Grid } from "@chakra-ui/react";
import { connect } from "react-redux";
import { useAlert } from "react-alert";
import AccountNav from "../common/AccountNav";
import UserProfile from "./UserProfile";
import ProfileForm from "./ProfileForm";
import ProfileContentLoader from "./ProfileContentLoader";
import Error from "../common/Error";
import { auth, db, storage } from "../../firebase";
import { setDisplayName, setPhotoURL } from "../../redux";

type ProfileProps = {
  currentUser: APP.CurrentUserTypes;
  setPhotoURL: (payload: APP.CurrentUserTypes) => APP.AuthActionTypes;
  setDisplayName: (payload: APP.CurrentUserTypes) => APP.AuthActionTypes;
};

const Profile = (props: ProfileProps) => {
  const { currentUser, setPhotoURL, setDisplayName } = props;

  const [isSubmitted, setIsSubmitted] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubscribed, setIsSubscribed] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  const [photoIsLoading, setPhotoIsLoading] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState<APP.UserInfoTypes>({});

  const alert = useAlert();

  const photoURL = currentUser?.photoURL;

  React.useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userDocRef = await db
          .collection("users")
          .doc(auth.currentUser?.uid)
          .get();

        const data = userDocRef.data();
        setUserInfo(data);
      } catch (err) {
        setHasError(true);
      }

      setIsSubscribed(false);
      setIsLoading(false);
    };

    if (isSubscribed) getUserInfo();

    return () => {
      setIsSubscribed(false);
    };
  }, [isSubscribed]);

  const handleTryAgain = () => {
    setIsLoading(true);
    setIsSubscribed(true);
    setHasError(false);
  };

  const handleProfileEdit = () => setIsSubmitted(false);

  const handlePhotoURLChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    const regex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

    if (file) {
      if (regex.test(file.name)) {
        setPhotoIsLoading(true);
        const uploadTask = await storage.ref(auth.currentUser?.uid).put(file);
        const link = await uploadTask.ref.getDownloadURL();
        await auth.currentUser?.updateProfile({ photoURL: link });

        setPhotoURL(auth.currentUser);
        setPhotoIsLoading(false);
      } else {
        alert.show("Please select a valid image file.");
      }
    }
  };

  const handleSubmit = async (formData: APP.UserInfoTypes) => {
    try {
      await db
        .collection("users")
        .doc(auth.currentUser?.uid)
        .update({ ...formData });

      let displayName = formData?.fullName;

      if (displayName.indexOf(" ") >= 0)
        displayName = displayName.split(" ").slice(0, -1)[0];

      await auth.currentUser?.updateProfile({ displayName });

      setUserInfo(formData);
      setDisplayName(auth.currentUser);
      setIsSubmitted(true);

      return true;
    } catch (err) {
      if (auth.currentUser)
        alert.show(
          "Oops! An error occurred. Check your internet connection and try again"
        );
      else alert.show("Please sign in to update your profile.");

      return false;
    }
  };

  return (
    <Box as="section" px={{ base: "4", md: "6" }} marginX="auto" maxW="1200px">
      <Grid templateColumns={{ lg: "230px 1fr" }} gridColumnGap="6">
        <AccountNav />

        {isLoading ? (
          <ProfileContentLoader />
        ) : (
          <>
            {hasError ? (
              <Error text="profile" onTryAgain={handleTryAgain} />
            ) : (
              <>
                {isSubmitted ? (
                  <UserProfile
                    userInfo={userInfo}
                    photoURL={photoURL}
                    photoIsLoading={photoIsLoading}
                    onPhotoURLChange={handlePhotoURLChange}
                    onProfileEdit={handleProfileEdit}
                  />
                ) : (
                  <ProfileForm userInfo={userInfo} doSubmit={handleSubmit} />
                )}
              </>
            )}
          </>
        )}
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state: APP.StateTypes) => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = (dispatch: APP.AuthDispatchTypes) => ({
  setPhotoURL: (payload: APP.CurrentUserTypes) =>
    dispatch(setPhotoURL(payload)),

  setDisplayName: (payload: APP.CurrentUserTypes) =>
    dispatch(setDisplayName(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
