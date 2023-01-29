const firebase = require('firebase');

const firebaseConfig = {
  apiKey: "AIzaSyDTUsils4h6nhMS4Fcm-IdkrJZbvQl665o",
  authDomain: "funcionarios-26777.firebaseapp.com",
  databaseURL: "https://funcionarios-26777-default-rtdb.firebaseio.com",
  projectId: "funcionarios-26777",
  storageBucket: "funcionarios-26777.appspot.com",
  messagingSenderId: "45408219142",
  appId: "1:45408219142:web:1eabef38dd4f9f6cf91387",
  measurementId: "G-R3HHJ6ZVLB"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const Funcionario = db.collection("Funcionarios");
module.exports = Funcionario;