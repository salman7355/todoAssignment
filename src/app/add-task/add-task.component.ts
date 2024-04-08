import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { task } from '../../Shared/task';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  @Output() addTask = new EventEmitter<task>();

  newTaskName = '';
  newTaskDescription = '';
  newTaskDate = '';

  AddNewTask() {
    // this.tasks.push(
    //   new task(
    //     (this.tasks.length + 1).toString(),
    //     this.newTaskName,
    //     this.newTaskDescription,
    //     this.newTaskDate
    //   )
    // );

    // this.addTask.emit(
    //   new task(
    //     (localStorage.length + 1).toString(),
    //     this.newTaskName,
    //     this.newTaskDescription,
    //     this.newTaskDate
    //   )
    // );

    const newTask = new task(
      (localStorage.length + 1).toString(),
      this.newTaskName,
      this.newTaskDescription,
      this.newTaskDate
    );

    // Emit the new task
    this.addTask.emit(newTask);

    // Retrieve tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Add the new task to the tasks array
    tasks.push(newTask);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.newTaskName = '';
    this.newTaskDescription = '';
    this.newTaskDate = '';
  }
}
