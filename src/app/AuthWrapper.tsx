"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthState, setUserDetailsState } from "@/store/authSlice";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // For development: Set mock authentication state
    dispatch(setAuthState(true));
    dispatch(
      setUserDetailsState({
        uid: "mock-user-id-123456",
        name: "Development User",
        email: "dev@example.com",
        profilePic: "",
      })
    );

    // Comment out the actual Firebase auth code for now
    /*
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(setAuthState(true));
        dispatch(
          setUserDetailsState({
            uid: user.uid,
            name: user.displayName ?? "",
            email: user.email ?? "",
            profilePic: user.photoURL ?? "",
          })
        );
      } else {
        console.log("User is signed out");
      }
    });

    return () => unsubscribe();
    */
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthWrapper;
