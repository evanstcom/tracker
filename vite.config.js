import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {VitePWA} from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
    base: '/',
    plugins: [
        vue(),
        VitePWA({
            manifest: {
                name: 'Tracker by Evans',
                short_name: 'Tracker',
                description: 'Твой персональный трекер',
                theme_color: '#000000',
                background_color: '#000000',
                icons: [
                    {
                        src: 'img/icons/192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'img/icons/512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
                start_url: '/',
                display: 'standalone',
                orientation: 'portrait',
            },
            registerType: 'autoUpdate',
            workbox: {
                runtimeCaching: [
                    {
                        urlPattern: /.*\.(png|jpg|jpeg|svg|gif|css|js)/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'assets',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 600, // 10 минут
                            },
                        },
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    css: {
        preprocessorOptions: {
            sass: {
                api: 'modern-compiler' // or "modern"
            }
        }
    }
})
