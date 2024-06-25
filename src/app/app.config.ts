import { ApplicationConfig } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import { environment } from '../environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideRouter} from "@angular/router";
import {routes} from "./app.routes";
import {provideHttpClient} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp({"projectId":"atom-43343","appId":"1:96838121545:web:07b1dcb674d498af63a798","storageBucket":"atom-43343.appspot.com","apiKey":"AIzaSyAF8BiJiK2968BU_LEaG131KZxK4HOkqdk","authDomain":"atom-43343.firebaseapp.com","messagingSenderId":"96838121545","measurementId":"G-SD9YM6RG52"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    provideAnimationsAsync(),
    provideRouter(routes),
    provideHttpClient()
  ]
};
