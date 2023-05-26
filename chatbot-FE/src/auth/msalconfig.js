import { PublicClientApplication } from '@azure/msal-browser';




export const msalApp = new PublicClientApplication({
  auth: {
    clientId: import.meta.env.VITE_APP_AZURE_APP_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_APP_AZURE_APP_TENANT_ID}`,
       redirectUri:`${import.meta.env.VITE_APP_REDIRECT_URI}`,
    
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
});


export const loginRequest = {
  scopes: ["User.Read"],

 };

 
