// import React, { useEffect } from "react";
// import { useUserContext } from "../context/UserContext";
// import { Navigate } from "react-router-dom";
// import { verifyUser } from "../api/userapi";

// const ProtuctedRoute = ({ children }) => {
//     const { user, setUser } = useUserContext();

//     useEffect(() => {
//         const verify = async () => {
//             try {
//                 const data = await verifyUser();

//                 setUser(data);
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         if (!user) verify();
//     }, []);
//     if (user) return <div>{children}</div>;
//     else return <Navigate to="/auth/signup" />;
// };

// export default ProtuctedRoute;
import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { verifyUser } from "../api/userapi";

const ProtectedRoute = ({ children }) => {
    const { user, setUser } = useUserContext();
    const [isLoading, setIsLoading] = useState(true); // Track loading state

    useEffect(() => {
        const verify = async () => {
            try {
                const data = await verifyUser();
                setUser(data);
            } catch (error) {
                console.error("Error verifying user:", error);
            } finally {
                setIsLoading(false); // Set loading to false after API call
            }
        };

        verify(); // Call verify on component mount
    }, []);

    // Handle loading state and redirect if necessary
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/auth/signup" />;
    }

    return <div>{children}</div>;
};

export default ProtectedRoute;
