import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Local dev port
    host: '0.0.0.0', // Expose to network (for remote server)
    allowedHosts: ['www.wyborowi.pl'], // Allow your domain
  },
});
