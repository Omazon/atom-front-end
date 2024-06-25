import {Component} from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {AuthService} from "./auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatToolbarRow,
    MatToolbar,
    MatIcon,
    MatButton,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(protected authService: AuthService) {
  }

  async singOut() {
    await this.authService.signOut();
  }
}
