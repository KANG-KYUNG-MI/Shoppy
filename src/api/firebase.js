
import { initializeApp } from "firebase/app";
import {v4 as uuid} from 'uuid';
import { getAuth, signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";


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

//log In
export function login(){
signInWithPopup(auth, provider).catch(error=> console.error(error)
    );
}

//Log Out
export function logout(){
 signOut(auth).catch(error=> console.error(error)
    );
}

//Listen to state changes
export function onUserStateChange ( callback ){
onAuthStateChanged(auth, async (user)=>{

  const updatedUser = user ? await adminUser(user) : null;
  callback(updatedUser)}
  );
}

//Auth 
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

// Add product
export async function addNewProduct(product, url){
  const id = uuid();
set (ref(database, `products/${id}`),{
  ...product, // receive all keys and values from curent product
  id, 
  imageUrl:url,
  price: parseInt(product.price), // store info as nimber price
  
});
}

export async function getProducts(){

  return get(ref(database, 'products')).then(snapshot=>{

    if(snapshot.exists()){
return Object.values(snapshot.val());
    }
  return [];
})
  }

