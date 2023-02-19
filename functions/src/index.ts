import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore()

export const createUserDocument = functions.auth
  .user()
  .onCreate(async (user) => {
    const { email, uid } = user;
    const name = email!.split("@")[0];
    const existingUser = await db.collection("users").where("displayName", "==", name).get();
    let displayName = name;
    console.log("I made it this FAAAAAR");


    // check if display name already exists in users collection
    if (!existingUser.empty) {
      // if exists, add random numbers until unique display name is found
      let displayNameExists = true;
      while (displayNameExists) {
        displayName = name! + Math.floor(Math.random() * 100);
        const checkExisting = await db.collection("users").where("displayName", "==", displayName).get();
        displayNameExists = !checkExisting.empty;
      }
    }

    // set user data with unique display name
    db.collection("users")
      .doc(uid)
      .set({
        email,
        displayName
      });
  });