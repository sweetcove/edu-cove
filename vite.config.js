import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/edu-cove/', // GitHub Pages 仓库名称
  publicDir: 'public', // 确保 public 目录被正确处理
})
