import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { positions, Provider as AlertProvider } from "react-alert";
import AlertMUITemplate from "react-alert-template-mui";
import { Provider } from "react-redux";
import store from "./redux/store";
import RouteScrollToTop from "./components/common/RouteScrollToTop";
import "./index.css";

const options = {
  position: positions.MIDDLE,
};

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertMUITemplate} {...options}>
      <Router>
        <RouteScrollToTop />
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
