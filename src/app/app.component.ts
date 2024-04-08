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
import { AddTaskComponent } from './add-task/add-task.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FontAwesomeModule,
    AddTaskComponent,
    FormsModule,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  EditIcon = faPen;
  DeleteIcon = faTrash;
  completedIcon = faCircleCheck;
  doneEditing = faCheck;
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
