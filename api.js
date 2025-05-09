import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where
} from "firebase/firestore/lite"

const firebaseConfig = {
    apiKey: "AIzaSyCz4nq-0GBvoDP4W2p2zvQ5QbMeidJxYvM",
    authDomain: "vanlife2061.firebaseapp.com",
    projectId: "vanlife2061",
    storageBucket: "vanlife2061.firebasestorage.app",
    messagingSenderId: "974963409078",
    appId: "1:974963409078:web:1a47345925c9f677e52617"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")

/*
// TO ADD VANS TO FIRESTORE

import vans from "./firestore_data.json"

for (const van of vans) {
    try {
        const docRef = await addDoc(vansCollectionRef, van);
        console.log(`Added van with Firestore ID: ${docRef.id}`);
    } catch (err) {
        console.error("Error adding document:", err);
    }
}
*/ 


export async function getVans() {
    const querySnapshot = await getDocs(vansCollectionRef)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArr
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const vanSnapshot = await getDoc(docRef)
    return {
        ...vanSnapshot.data(),
        id: vanSnapshot.id
    }
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "456"))
    const querySnapshot = await getDocs(q)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArr
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}