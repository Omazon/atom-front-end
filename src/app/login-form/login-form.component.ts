import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnChanges {
  @ViewChild('createUserDialog') createUserDialog!: TemplateRef<any>;

  constructor(private dialog: MatDialog) {
  }

  @Input() notFoundUser: boolean = false;
  ngOnChanges(changes: SimpleChanges) {
    if(changes['notFoundUser'].currentValue){
      this.dialog.open(this.createUserDialog);
    }
  }

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('123456'),
  });

  submit() {
    if (this.form.valid) {
      this.submitLogin.emit(this.form.value);
    }
  }

  createUser(email: string) {
    this.createUserEvent.emit(this.form.value);
  }
  @Input() error: string | null | undefined | boolean;

  @Output() submitLogin  = new EventEmitter<any>();
  @Output() createUserEvent  = new EventEmitter<any>();

}
