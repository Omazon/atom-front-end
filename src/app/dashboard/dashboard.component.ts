import {Component, TemplateRef, ViewChild} from '@angular/core';
import {
  MatCard, MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatSelect} from "@angular/material/select";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FirestoreService} from "../firestore.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardFooter,
    MatRadioGroup,
    MatRadioButton,
    MatCardTitle,
    MatCardSubtitle,
    FormsModule,
    MatCardActions,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatSelect,
    MatInput,
    MatLabel,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  @ViewChild('editTodo') editTodo!: TemplateRef<any>;

  constructor(private dialog: MatDialog, private firestore: FirestoreService) {
  }

  async ngOnInit() {
    setTimeout(async () => await this.getTodos(), 500);
  }

  items: any[] = [];

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
  });

  openEdit(data: any) {
    const selectedData = {
      id: data.id,
      title: data.title,
      description: data.description
    };
    this.form.setValue(selectedData);
    this.dialog.open(this.editTodo);
  }

  openModal() {
    this.form.reset();
    this.dialog.open(this.editTodo);
  }
  async addTodo(data: any) {
    if(data.get('id').value) {
      const todo = {
        title: data.get('title').value,
        description: data.get('description').value,
      }
      await this.firestore.updateTodo(data.get('id').value, todo);
    } else {
      const todo = {
        title: data.get('title').value,
        description: data.get('description').value,
      }
      await this.firestore.addTodo(todo);
    }
    await this.getTodos();
  }

  async getTodos() {
    const data = await this.firestore.getTodos();
    this.items = data.todos;
  }

  async deleteTodo(id: string) {
    await this.firestore.deleteTodo(id);
    await this.getTodos();
  }
  async updateTodoState(id:string, event: any) {
    await this.firestore.updateTodoState(id, event.value);
  }
  async updateTodo(id:string, data: any) {
    await this.firestore.updateTodo(id, data);
  }
}
