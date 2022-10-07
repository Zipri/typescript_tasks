import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDA-FjbqfYUAlvjqx3Lgo0BfWpx_z4cBxw",
    authDomain: "my-ts-tasks.firebaseapp.com",
    projectId: "my-ts-tasks",
    storageBucket: "my-ts-tasks.appspot.com",
    messagingSenderId: "712109562333",
    appId: "1:712109562333:web:8aa7f66b7b5d7bcf71be34"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();