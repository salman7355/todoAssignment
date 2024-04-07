import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { task } from '../Shared/task';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, FormsModule ,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  EditIcon = faPen;
  DeleteIcon = faTrash;
  completedIcon = faCircleCheck;
  doneEditing = faCheck;
  newTaskName = '';
  newTaskDescription = '';
  newTaskDate = '';
  EditName = '';
  editDescription = '';
  editDate = '';
  tasks: any[] = [];

  constructor() {
    const storedTasks = localStorage.getItem('tasks');
    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
  }

  toggleItem(e: task) {
    e.isCompleted = !e.isCompleted;
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  AddNewTask() {
    this.tasks.push(
      new task(
        (this.tasks.length + 1).toString(),
        this.newTaskName,
        this.newTaskDescription,
        this.newTaskDate
      )
    );
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.newTaskName = '';
    this.newTaskDescription = '';
    this.newTaskDate = '';
  }

  deleteTask(item: task) {
    this.tasks = this.tasks.filter((e) => e.id !== item.id);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  editTask(item: task) {
    item.isEditing = true;
  }

  applyEdit(item: task) {
    if (this.EditName) {
      item.title = this.EditName;
    }
    if (this.editDate) {
      item.date = this.editDate;
    }
    if (this.editDescription) {
      item.description = this.editDescription;
    }

    item.isEditing = false;
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
