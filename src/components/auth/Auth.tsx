import * as React from "react";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux";
import { auth } from "../../firebase";

type AuthProps = {
  setCurrentUser: (payload: APP.CurrentUserTypes) => APP.AuthActionTypes;
};

const Auth = ({ setCurrentUser }: AuthProps) => {
  React.useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      if (currentUser) setCurrentUser(currentUser);
    });
  });

  return null;
};

const mapDispatchToProps = (dispatch: APP.AuthDispatchTypes) => ({
  setCurrentUser: (payload: APP.CurrentUserTypes) =>
    dispatch(setCurrentUser(payload)),
});

export default connect(null, mapDispatchToProps)(Auth);
