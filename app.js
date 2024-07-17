// Import the functions you need from the SDKs you need
import { all } from "axios";
import { initializeApp } from "firebase/app";
import { deleteDoc, deleteField, getDoc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"
import { v4 as uuid } from "uuid";
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
const date = new Date()
const db = getFirestore(app);
// console.log(uuid().substring(0, 10))
// const url = `https://de.indeed.com/jobs?q=${searchField}&l=&from=searchOnDesktopSerp`;

document.getElementById("mainForm").addEventListener("submit", async (e) => {
    e.preventDefault()
    document.getElementById("showjob").innerHTML = ""
    document.getElementById("loading").style.display = "block"
    const jobTitle = e.target.elements.jobTitle.value
    const newJobTitle = jobTitle.replaceAll(" ", "%20")
    try {
        let url = ""
        if (document.getElementById("serverSource").textContent === "local") {
            url = "http://localhost:5000/"
        } else {
            url = "/.netlify/functions/test"
        }

        const res = await axios.post(url, { jobTitle: newJobTitle })
        let data = res.data
        if (url === "http://localhost:5000/") {
            data = JSON.parse(data)
        }
        data.jobs.forEach((job) => {
            const div = document.createElement("div")
            const titlespan = document.createElement("p")
            const titlelocation = document.createElement("p")
            const titlecompany = document.createElement("p")
            titlespan.textContent = job.title
            titlelocation.textContent = job.location
            titlecompany.textContent = job.company
            div.appendChild(titlespan)
            div.appendChild(titlelocation)
            div.appendChild(titlecompany)
            document.getElementById("showjob").appendChild(div)
            const add = document.createElement("button")
            add.textContent = "Add"
            add.addEventListener("click", async (e) => {
                const jobId = uuid().substring(0, 10)
                const userRef = doc(db, "jobs", `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
                try {
                    await updateDoc(userRef, { [jobId]: job })
                    add.textContent = "Added"
                } catch (error) {
                    console.log(error)
                }
            })
            div.appendChild(add)
        })
        document.getElementById("loading").style.display = "none"
    } catch (error) {
        console.log(error)
        document.getElementById("loading").style.display = "none"
    }
})

document.getElementById("serverSource").addEventListener("click", (e) => {
    if (e.target.textContent === "local") {
        e.target.textContent = "netlify"
    } else {
        e.target.textContent = "local"
    }
})



document.getElementById("allJobs").addEventListener("click", async (e) => {
    const userRef = doc(db, "jobs", `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
    try {
        document.getElementById("loading").style.display = "block"
        document.getElementById("showjob").innerHTML = ""
        const alljobs = await getDoc(userRef)
        console.log(Object.entries(alljobs.data()))
        Object.entries(alljobs.data()).forEach((job) => {

            const div = document.createElement("div")
            const jobId = document.createElement("p")
            const titlespan = document.createElement("p")
            const titlelocation = document.createElement("p")
            const titlecompany = document.createElement("p")
            jobId.textContent = "ID:" + job[0]
            titlespan.textContent = job[1].title
            titlelocation.textContent = job[1].location
            titlecompany.textContent = job[1].company
            div.appendChild(jobId)
            div.appendChild(titlespan)
            div.appendChild(titlelocation)
            div.appendChild(titlecompany)
            document.getElementById("showjob").appendChild(div)
            const remove = document.createElement("button")
            remove.textContent = "Remove"
            remove.addEventListener("click", async (e) => {
                const userRef = doc(db, "jobs", `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
                try {
                    await updateDoc(userRef, { [job[0]]: deleteField() })
                    remove.textContent = "removed successfully"
                } catch (error) {
                    console.log(error)
                }
            })
            div.appendChild(remove)
        })
        document.getElementById("loading").style.display = "none"

    }
    catch (error) {
        document.getElementById("loading").style.display = "none"

        console.log(error)
    }
})

// const myf = async () => {
//     const res = await axios.post("/.netlify/functions/test", { jobTitle })
//     const userRef = doc(db, "jobs", `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
//     try {
//         await setDoc(userRef, {
//             test: "test"
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }
// myf()