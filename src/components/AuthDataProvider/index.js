/* Justin Edwards
 * 09/15/2020
 * AuthDataProvider Component - Stores information about auth state
 * initially checks for auth data in localStorage or a 
 * cookie (to be configured later) and sets it if found. 
 * Otherwise, initializes empty context to be used in app
 */

import React, { createContext, useState, useEffect, useMemo, useContext } from "react";
import * as Firestore from '../Firestore';

export const AuthDataContext = createContext(null);

const initialAuthData = {};

const AuthDataProvider = props => {
    const [authData, setAuthData] = useState(initialAuthData);

    /* On initial render, it will check for auth info 
     * somewhere.
     */
    useEffect(() => {
        // check if user currently signed in
        Firestore.auth.onAuthStateChanged((user) => {
            // if so, set state
            if (user) {
                Firestore.getCurrentUserFirstLastName()
                .then(response => {
                    let userData = response.data();
                    let tempUser = {
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        uid: user.uid,
                        email: user.email}
                    setAuthData({user: tempUser});
                });
            }
        });

    }, []);

    const onLogout = () => setAuthData(initialAuthData);

    // will pass user information into this when user is authenticated
    const onLogin = newAuthData => {
        Firestore.getCurrentUserFirstLastName()
        .then(response => {
            let userData = response.data();
            let tempUser = {
                firstName: userData.firstName,
                lastName: userData.lastName,
                uid: newAuthData.uid,
                email: newAuthData.email
            }
            setAuthData({user: tempUser});
        })
    }

    // memoizes the information, honestly no clue what is going on here,
    // need to do some research
    const authDataValue = useMemo(() => ({ ...authData, onLogin, onLogout }), [authData]);
    // see above comment
    return <AuthDataContext.Provider value={authDataValue} {...props} />;
};
export const useAuthDataContext = () => useContext(AuthDataContext);
export default AuthDataProvider;