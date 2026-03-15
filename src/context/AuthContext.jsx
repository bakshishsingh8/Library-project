// import { createContext, useContext, useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { auth, db } from "../firebase";

// // Create context
// const AuthContext = createContext();

// // Provider
// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userData, setUserData] = useState(null); // Firestore user data
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setCurrentUser(user);

//         // Fetch user role from Firestore
//         const userRef = doc(db, "users", user.uid);
//         const snap = await getDoc(userRef);

//         if (snap.exists()) {
//           setUserData(snap.data()); // { role: "admin" | "student", ... }
//         } else {
//           setUserData(null);
//         }
//       } else {
//         setCurrentUser(null);
//         setUserData(null);
//       }

//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         currentUser,
//         userData,
//         loading,
//       }}
//     >
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook
// export const useAuth = () => {
//   return useContext(AuthContext);
// };


// import { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "../firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebase";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const ref = doc(db, "users", user.uid);
//         const snap = await getDoc(ref);

//         if (snap.exists()) {
//           setUserData({ uid: user.uid, ...snap.data() });
//         } else {
//           setUserData(null);
//         }
//       } else {
//         setUserData(null);
//       }

//       setLoading(false); // ✅ DO NOT MISS THIS
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ userData, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);


// import { createContext, useContext, useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");

//     if (token) {
//       try {
//         const decoded = jwtDecode(token);

//         setUserData({
//           id: decoded.id,
//           role: decoded.role,
//         });
//       } catch (error) {
//         console.error("Invalid token");
//         localStorage.removeItem("authToken");
//         setUserData(null);
//       }
//     }

//     setLoading(false);
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("authToken");
//     setUserData(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{ userData, setUserData, loading, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);


import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserData({
          id: decoded.id,
          role: decoded.role,
        });
      } catch (error) {
        console.error("Invalid token");
        localStorage.removeItem("authToken");
        setUserData(null);
      }
    }
    setLoading(false);
  }, []);

  // --- NEW: Add this function ---
  const login = (token) => {
    // 1. Save to Local Storage
    localStorage.setItem("authToken", token);
    
    // 2. Update React State immediately
    try {
      const decoded = jwtDecode(token);
      setUserData({
        id: decoded.id,
        role: decoded.role,
      });
    } catch (error) {
      console.error("Login failed: Invalid token");
    }
  };
  // ------------------------------

  const logout = () => {
    localStorage.removeItem("authToken");
    setUserData(null);
  };

  return (
    // Pass 'login' to the value object
    <AuthContext.Provider value={{ userData, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);