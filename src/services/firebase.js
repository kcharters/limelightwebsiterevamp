import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAxrir49sZJiksk1UjfgUgr0-HYw2eMRAk",
    authDomain: "limelightwebsiteblog.firebaseapp.com",
    projectId: "limelightwebsiteblog",
    storageBucket: "limelightwebsiteblog.firebasestorage.app",
    messagingSenderId: "664920712535",
    appId: "1:664920712535:web:64a117936353e8f04f4a12",
    measurementId: "G-5TGD0XY62V"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
