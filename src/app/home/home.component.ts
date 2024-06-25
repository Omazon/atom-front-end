import { Component } from '@angular/core';
import {LoginFormComponent} from "../login-form/login-form.component";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        LoginFormComponent
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  title = 'atom';
  notFoundUser: boolean = false;
  constructor(private authService: AuthService, private router: Router) {
  }

  async submitLogin(eventData: any) {
    await this.login(eventData)
  }

  async ngOnInit() {
    await this.authService.signOut();
  }


  async login(data: { email: string; password: string; }) {
    try {
      await this.authService.signIn(data.email, data.password);
      this.router.navigate(['/dashboard']);
    } catch (error:any) {
      if(error.code === 'auth/invalid-credential'){
        this.notFoundUser = true;
      }
    }
    setTimeout(() => this.notFoundUser = false, 0);
  }

  async createUser(data: { email: string; password: string; }) {
    try {
      await this.authService.createUser(data.email, data.password);
      this.router.navigate(['/dashboard']);
    } catch (error:any) {
      if(error.code === 'auth/invalid-credential'){
        alert('El usuario ya existe, redirigiendo a inicio de sesión');
      }
    }
  }
}
