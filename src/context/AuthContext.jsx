import React, {createContext, useContext, useEffect, useState} from 'react';
import { login, logout, onUserStateChange } from '../api/firebase';

//import {adminUser,login, logout, onUserStateChange } from '../api/firebase';
//import { getAuth, onAuthStateChanged } from 'firebase/auth';
//const auth = getAuth();


const AuthContext = createContext()

export function AuthContextProvider({children}) {
  
    const [user, setUser] = useState(); 

 useEffect( ()=>{onUserStateChange((user)=>{setUser(user)})} , []);

    return (
        <div>
            <AuthContext.Provider value={{user,uid: user && user.uid, login:login, logout:logout}}>
                {children}
            </AuthContext.Provider>
        </div>
    );
}

export function useAuthContext(){
    return useContext(AuthContext);
}

