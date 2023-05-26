import { InteractionType } from "@azure/msal-browser";
import { MsalAuthenticationTemplate, MsalProvider, useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { msalApp } from "./msalconfig";
import React from "react";
import { Account } from "msal";




function ErrorComponent({ error }) {
    useEffect(() => {
        window.location.reload()
    }, [])
    return (
        <>
            <p>An Error Occurred :{error && error.errorMessage}</p>
        </>
    );
}

export const AuthProvider = (props) => {
 
  



    return (
        <MsalProvider instance={msalApp}>
            <MsalAuthenticationTemplate
                interactionType={InteractionType.Redirect}
                authenticationRequest={{ scopes: ["openid", "profile", "email", "user.read"], forceRefresh: true }}
                errorComponent={ErrorComponent}
            >
                {props.children}
            </MsalAuthenticationTemplate>
        </MsalProvider>
    )


}  