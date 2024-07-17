// Import the functions you need from the SDKs you need
import { initializeApp } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/10.12.3/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAmVdx8O03KyYL3OflZm7EPK9fHgFfqPFY",
    authDomain: "indeed-2890f.firebaseapp.com",
    projectId: "indeed-2890f",
    storageBucket: "indeed-2890f.appspot.com",
    messagingSenderId: "869688367209",
    appId: "1:869688367209:web:dc7db99b02cdd4e7a22af8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const myf = async () => {
    const res = await axios.get("/.netlify/functions/test")
    console.log(res.data)
}
myf()