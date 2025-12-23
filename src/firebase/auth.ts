import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "./config";

export const firebaseAuth = getAuth(firebaseApp);
export const auth = firebaseAuth;

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});
