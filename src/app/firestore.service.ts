import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, firstValueFrom, from, Observable, of, switchMap, tap, throwError} from "rxjs";
import {AuthService} from "./auth.service";
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
formattedDate: string;
apiURL = 'http://localhost:3000/tasks';
  constructor(
    private afAuth: AngularFireAuth,
    private http: HttpClient,
    private authService: AuthService
    ) {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date('2024-06-23');
    this.formattedDate = date.toLocaleDateString('es-ES', options);
  }

  todos: any[] = [];

  async addTodo(data: any): Promise<any> {
    const {user, headers} = await this.getAuthHeaders();
    const dataPost = {
      title: data.title,
      description: data.description,
      date: this.formattedDate,
      state: false,
      uid: user.uid
    };
    return firstValueFrom(
      this.http.post(this.apiURL, dataPost, {headers}).pipe(
        tap((res) => {
          console.log(res)
        }),
        catchError(this.handleError<any>('addTodo'))
      )
    )
  }

  async getTodos(): Promise<any> {
    const {headers} = await this.getAuthHeaders();
    return firstValueFrom(
      this.http.get(this.apiURL, {headers}).pipe(
        tap((res) => {
          return res;
        }),
        catchError(this.handleError<any>('getTodos'))
      )
    )
  }

  async deleteTodo(id: string): Promise<any> {
    const {headers} = await this.getAuthHeaders();
    return firstValueFrom(
      this.http.delete(`${this.apiURL}/${id}`, {headers}).pipe(
        tap((res) => {
          return res;
        }),
        catchError(this.handleError<any>('deleteTodo'))
      )
    )
  }
  async updateTodoState(id: string, data: any): Promise<any> {
    const {headers} = await this.getAuthHeaders();
    const dataUpdate = {
      state: data
    }
    return firstValueFrom(
      this.http.patch(`${this.apiURL}/${id}`, dataUpdate, {headers}).pipe(
        tap((res) => {
          return res;
        }),
        catchError(this.handleError<any>('updateTodoState'))
      )
    )
  }

  async updateTodo(id: string, data: any): Promise<any> {
    const {headers} = await this.getAuthHeaders();
    const dataUpdate = {
      title: data.title,
      description: data.description
    }
    return firstValueFrom(
      this.http.patch(`${this.apiURL}/${id}`, dataUpdate, {headers}).pipe(
        tap((res) => {
          return res;
        }),
        catchError(this.handleError<any>('updateTodo'))
      )
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return new Observable<T>(); // Opcional: Puedes retornar un Observable vacío o un valor por defecto
    };
  }

  async getAuthHeaders(): Promise<{ user: any, headers: HttpHeaders }> {
    const user = await this.afAuth.currentUser;
    if (!user) {
      throw new Error('No hay usuario autenticado');
    }
    const idToken = await user.getIdToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${idToken}`);
    return { user, headers };
  }
}
