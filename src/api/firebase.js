
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL:process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
 
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export function login(){

signInWithPopup(auth, provider).catch(error=> console.error(error)
    );
}


export function logout(){

 signOut(auth).catch(error=> console.error(error)
    );
}


export function onUserStateChange ( callback ){

onAuthStateChanged(auth, async (user)=>{

  const updatedUser = user ? await adminUser(user) : null;
  callback(updatedUser)}
  );
}




export async function adminUser(user){

  return get(ref(database,'admins'))//

        .then((snapshot)=>{
    if(snapshot.exists()){
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid); //check if admin is already in the database. isAdmin: true or false??
      return { ...user, isAdmin}
    }
      return user;
  });

}
