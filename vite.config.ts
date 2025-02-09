import { ValidateEnv } from '@julr/vite-plugin-validate-env'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import viteTsConfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
    plugins: [TanStackRouterVite({ autoCodeSplitting: true }), viteTsConfigPaths(), react(), tailwindcss(), svgr(), ValidateEnv()],
    server: {
        port: 9999,
        allowedHosts: ['.ayarayarovich.ru'],
    },
})
