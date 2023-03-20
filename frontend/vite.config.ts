import EnvironmentPlugin from 'vite-plugin-environment';
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    plugins: [
      react(),
      EnvironmentPlugin('all')
    ],
    server: {
      port: Number(process.env.VITE_PORT)
    }
  })
}
