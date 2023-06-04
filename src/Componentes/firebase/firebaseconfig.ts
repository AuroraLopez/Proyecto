import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyApUyf5QTfMBAium0BbJKWDuWzqUTCgnOM",
  authDomain: "gatos-ea705.firebaseapp.com",
  projectId: "gatos-ea705",
  storageBucket: "gatos-ea705.appspot.com",
  messagingSenderId: "382958428191",
  appId: "1:382958428191:web:428929fd77b46f73b6352a",
  measurementId: "G-R6XQXC1157"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
