import { getAuth } from "firebase/auth";
import { firebaseApp } from "./config";

export const auth = getAuth(firebaseApp);
