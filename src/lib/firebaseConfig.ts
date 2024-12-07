/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { envConfig } from "@/config/envConfig";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: envConfig.firebaseApiKey,
  authDomain: envConfig.firebaseAuthDomain,
  projectId: envConfig.firebaseProjectId,
  storageBucket: envConfig.firebaseStorageBucket,
  messagingSenderId: envConfig.firebaseMessagingSendId,
  appId: envConfig.firebaseAppId,
};

const app = initializeApp(firebaseConfig);

export const imageUploadDB = getStorage(app);
