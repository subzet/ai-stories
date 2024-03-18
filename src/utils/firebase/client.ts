import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAfbgAPD6plO-WmiG-YALDDhyBHAnT7yL4",
  authDomain: "story4kids-dev.firebaseapp.com",
  projectId: "story4kids-dev",
  storageBucket: "story4kids-dev.appspot.com",
  messagingSenderId: "590055231940",
  appId: "1:590055231940:web:52e0e40cf21b06394ad491"
};


export const app = initializeApp(firebaseConfig);