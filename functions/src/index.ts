import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore()

// export const createUserDocument = functions.auth
//   .user()
//   .onCreate(async (user) => {
//     db.collection("users")
//       .doc(user.uid)
//       .set(JSON.parse(JSON.stringify(user)));
//   });

// export const createUserDocument = functions.auth
//   .user()
//   .onCreate(async (user) => {
//     const { email, uid } = user;
//     const name = email!.split("@")[0];
//     const existingUser = await db.collection("users").where("userName", "==", name).get();
//     let userName = name;

//     // check if display name already exists in users collection
//     if (!existingUser.empty) {
//       // if exists, add random numbers until unique display name is found
//       let userNameExists = true;
//       while (userNameExists) {
//         userName = name! + Math.floor(Math.random() * 100);
//         const checkExisting = await db.collection("users").where("userName", "==", userName).get();
//         userNameExists = !checkExisting.empty;
//       }
//     }

//     // const userData = {...user, userName }

//     // set user data with unique display name
//     db.collection("users")
//       .doc(uid)
//       .set(JSON.parse(JSON.stringify(userName)));
//   });

export const setFirstLoginCustomClaim = functions.auth.user().onCreate(async (user) => {
  const { uid, email, emailVerified  } = user;

  // set custom claim for first login
  // await admin.auth().setCustomUserClaims(uid, { firstLogin: true });

  // create user document in Firestore
  const name = user.email!.split("@")[0];
  const existingUser = await db.collection("users").where("userName", "==", name).get();
  let displayName = name;

  if (!existingUser.empty) {
    let displayNameExists = true;
    while (displayNameExists) {
      displayName = name! + Math.floor(Math.random() * 100);
      const checkExisting = await db.collection("users").where("userName", "==", displayName).get();
      displayNameExists = !checkExisting.empty;
    }
  }

  await db.collection("users").doc(uid).set({
    firstLogin: true,
    userName: displayName,
    email: email,
    photoURL: user.photoURL,
    emailVerified
  });
});