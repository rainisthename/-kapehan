'use client';
import { useState, useEffect } from "react";
import {
    onAuthStateChanged,
    // signInWithEmailAndPassword,
    // createUserWithEmailAndPassword,
    signOut,
    getIdToken
} from "firebase/auth";
import { auth } from "../app/lib/firebase"; // Ensure this points to your Firebase configuration file

function useFirebaseAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const token = user.token
    // Monitor user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Login function
    //   const login = (email, password) => {
    //     return signInWithEmailAndPassword(auth, email, password);
    //   };

    // Signup function
    //   const signup = (email, password) => {
    //     return createUserWithEmailAndPassword(auth, email, password);
    //   };

    // Logout function
    const logout = () => {
        return signOut(auth);
    };

    // Get user token function
    const getToken = async () => {
        if (user) {
            try {
                const token = await getIdToken(user);
                return token;
            } catch (error) {
                console.error("Error getting token:", error);
                throw error;
            }
        } else {
            throw new Error("No user is logged in");
        }
    };

    return {
        user,
        loading,
        // login, 
        // signup, 
        logout,
        getToken
    };
}

export default useFirebaseAuth;
