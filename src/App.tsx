import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import { Route, Switch, Redirect } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import PasswordReset from "./components/auth/PasswordReset";
import Contact from "./components/contact/Contact";
import ScrollToTop from "./components/common/ScrollToTop";
import Product from "./components/products/Product";
import Cart from "./components/cart/Cart";
import Payment from "./components/payment/Payment";
import Orders from "./components/orders/Orders";
import Profile from "./components/profile/Profile";
import Wishlist from "./components/wishlist/Wishlist";
import OrderDetails from "./components/orders/OrderDetails";
import ProductCategory from "./components/products/ProductCategory";
import ProtectedRoute from "./components/common/ProtectedRoute";
import LiveChat from "./components/common/LiveChat";
import NotFound from "./components/common/NotFound";
import Auth from "./components/auth/Auth";
import theme from "./utils/theme";

function App() {
  return (
    <ChakraProvider resetCSS={true} theme={theme}>
      <Auth />
      <Header />
      <Switch>
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/password-reset" component={PasswordReset} />
        <Route path="/contact" component={Contact} />
        <Route path="/products/:category/:id" component={Product} />
        <Route path="/products/:category" component={ProductCategory} />
        <Route path="/cart" component={Cart} />
        <ProtectedRoute path="/payment" component={Payment} />
        <ProtectedRoute path="/orders/:id" component={OrderDetails} />
        <ProtectedRoute path="/orders" component={Orders} />
        <ProtectedRoute path="/profile" component={Profile} />
        <Route path="/wishlist" component={Wishlist} />
        <Route exact path="/" component={Home} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
      <Footer />
      <ScrollToTop />
      <LiveChat />
      <ToastContainer position="bottom-left" hideProgressBar={true} />
    </ChakraProvider>
  );
}

export default App;
