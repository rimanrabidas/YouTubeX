import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),VitePWA({
    registerType: "autoUpdate",
    includeAssets: "YouTubeX.jpeg",
    manifest:{
      name: "YouTubeX",
      short_name: "YouTubeX",
      description:"YouTubeX is a fictional, ad-free YouTube experience app concept designed to offer users a seamless, uninterrupted way to enjoy their favorite videos. Imagine a world where buffering, ads, and cluttered interfaces are a thing of the past — YouTubeX brings that vision to life. Built with simplicity and user satisfaction in mind, YouTubeX enhances the standard YouTube platform by removing all advertisements, enabling background playback, and offering a clean, customizable interface. Whether you're watching tutorials, music videos, or vlogs, YouTubeX ensures a smooth, distraction-free viewing experience optimized for both mobile and tablet use.",
      theme_color:"#ffffff",
        "icons": [
    {
      "src": "YouTubeX.jpeg",
      "type": "image/jpeg",
      "sizes": "192x192"
    },
    {
      "src": "YouTubeX.jpeg",
      "type": "image/jpeg",
      "sizes": "512x512"
    }
  ]
    }
  })
]
})
