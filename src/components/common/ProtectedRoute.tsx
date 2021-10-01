import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = (props: any) => {
  const { render, component: Component, currentUser, ...rest } = props;
  
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser)
          return (
            <Redirect
              to={{
                pathname: "/sign-in",
                state: { from: props.location },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

const mapStateToProps = (state: APP.StateTypes) => ({
  currentUser: state.auth.currentUser,
});

export default connect(mapStateToProps)(ProtectedRoute);
