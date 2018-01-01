import React from "react";
import ReactDOM from "react-dom";
import FirebaseBackup from "./FirebaseBackup";

const wrapper = document.getElementById("firebase-backup");
wrapper ? ReactDOM.render(<FirebaseBackup />, wrapper) : false;

