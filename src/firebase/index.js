import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyC-eUkPNkz5S9L7P2Y7rgMILG2m_UwpvqY',
  authDomain: 'learningapp-cbd76.firebaseapp.com',
  projectId: 'learningapp-cbd76',
  storageBucket: 'learningapp-cbd76.appspot.com',
  messagingSenderId: '132723381108',
  appId: '1:132723381108:web:be369a6070332fd7a01221'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
