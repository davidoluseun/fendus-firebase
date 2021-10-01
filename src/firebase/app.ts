import firebase from "firebase/app";
import config from "./credentials";

const app = firebase.initializeApp(config);
export default app;
