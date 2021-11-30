import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCGU1tzs7Do6pG-g4Xq69Veegepto8_BQw",
    authDomain: "questionnaire-12ab9.firebaseapp.com",
    projectId: "questionnaire-12ab9",
    storageBucket: "questionnaire-12ab9.appspot.com",
    messagingSenderId: "586525237521",
    appId: "1:586525237521:web:c968b47a7e308202092cb0"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db
