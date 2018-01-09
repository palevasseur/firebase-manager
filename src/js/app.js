import React from "react";
import ReactDOM from "react-dom";
import FirebaseBackup from "./FirebaseBackup";

const wrapper = document.getElementById("firebase-backup");
wrapper ? ReactDOM.render(
  <div>
    <FirebaseBackup name="notes" config={{
      apiKey: "AIzaSyCnaOC0gmAab9iEGN9I1UyIR3G8zwCvkWk",
      authDomain: "notes-6f837.firebaseapp.com",
      databaseURL: "https://notes-6f837.firebaseio.com",
      projectId: "notes-6f837",
      storageBucket: "notes-6f837.appspot.com",
      messagingSenderId: "294714633105"
    }} />

    <FirebaseBackup name="heures" config={{
      apiKey: "AIzaSyAbU4Ok7ufne_5sZt1CBuTe2jCGh2V9IAo",
      authDomain: "project-3010963349219589577.firebaseapp.com",
      databaseURL: "https://project-3010963349219589577.firebaseio.com",
      projectId: "project-3010963349219589577",
      storageBucket: "project-3010963349219589577.appspot.com",
      messagingSenderId: "633176171362"
    }} />
  </div>
  , wrapper) : false;

