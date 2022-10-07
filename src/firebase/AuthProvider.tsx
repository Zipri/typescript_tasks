import React from 'react';
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { AuthContext } from "./AuthContext";
import { auth } from "./firebase";

interface APProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<APProps> = ({ children }) => {
    const [user, setUser] = useState<firebase.User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser);
        });

        return unsubscribe;
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};