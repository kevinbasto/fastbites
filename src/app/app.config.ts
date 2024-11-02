import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"fastbites-321c9","appId":"1:325344888930:web:dd366c2c8e745a3c1f293b","storageBucket":"fastbites-321c9.firebasestorage.app","apiKey":"AIzaSyBmD-u1GQpGvTOVdb7LekupmIuHkML1cgw","authDomain":"fastbites-321c9.firebaseapp.com","messagingSenderId":"325344888930","measurementId":"G-P1V0EYXYCW"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideFunctions(() => getFunctions()), provideStorage(() => getStorage())
  ]
};
