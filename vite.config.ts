import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '', // اتركها فارغة لضمان عمل المسارات النسبية
})