import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.879492635bfd4a8da9d213947addab62',
  appName: 'crimson-key-forge',
  webDir: 'dist',
  server: {
    url: 'https://87949263-5bfd-4a8d-a9d2-13947addab62.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#141414',
      showSpinner: false
    }
  }
};

export default config;