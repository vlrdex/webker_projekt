import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {provideAnimations} from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: "szonyeg-webker",
        appId: "1:239410796123:web:acd64765c1c79e328d517e",
        storageBucket: "szonyeg-webker.firebasestorage.app",
        apiKey: "AIzaSyDoiEF8g_RovjMj7Nul7qeHe7iTPkKyS_M",
        authDomain: "szonyeg-webker.firebaseapp.com",
        messagingSenderId: "239410796123",
        measurementId: "G-BQJYBRD3HC"
      })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ]
};
