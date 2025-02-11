import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default ({ mode }: {mode: string}) => {
  // Load app-level env vars to node-level env vars.
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    plugins: [vue()],
    base: process.env.VITE_BASE_URL,
    server: {
      host: true,
      port: +(process.env.VITE_PORT ?? 5173)
    },
    preview: {
      host: true,
      port: +(process.env.VITE_PREVIEW_PORT ?? 4173)
    }
  })
};
