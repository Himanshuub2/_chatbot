import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import Mkcert from 'vite-plugin-mkcert/dist/mkcert/index'
// import mkcert from 'vite-plugin-mkcert'
// import basicSsl from '@vitejs/plugin-basic-ssl'


// https://vitejs.dev/config/
export default defineConfig({
  base: "/chatbot",
  plugins: [react()],
  server:{
      
      watch:{
        usePolling:true
      },
      // host:true,
      strictPort:true,
    
    port:3000,  
  },
  preview:{
    port:3000
  },
})
