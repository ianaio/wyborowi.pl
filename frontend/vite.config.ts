import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.svg'], // Explicitly include SVGs
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: ['www.wyborowi.pl'],
    hmr: {
      protocol: 'wss', // Use WebSocket Secure
      // host: 'www.wyborowi.pl', // Remove explicit host/port binding; rely on proxy
      // port: 443, // Proxy handles WSS on 443 // Nginx will upgrade to WSS externally
    },
  },
});
