import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCa5c2RIP5LtU5Ccfpzk5kPzz3QzyOc2aA',
  authDomain: 'ecommerce-app-7b71e.firebaseapp.com',
  databaseURL: 'https://ecommerce-app-7b71e.firebaseio.com',
  projectId: 'ecommerce-app-7b71e',
  storageBucket: '',
  messagingSenderId: '332348046277',
  appId: '1:332348046277:web:d963a84940d12e72',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
