import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoService } from '../services/todo.service';
import { TodoViewModel } from '../models/todo-view-model';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(private todoService: TodoService,
              private modalService: NgbModal,
              private afAuth: AngularFireAuth) { }

  user: User;

  todos: TodoViewModel[] = [];

  ngOnInit(): void {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.buttonLoadTodoList(user.uid);
      }
    });

  }

  clickAddTodo() {
    const modal = this.modalService.open(TodoFormComponent);
    modal.result.then(
      this.handleModalTodoFormClose.bind(this),
       this.handleModalTodoFormClose.bind(this));
  }

  handleModalTodoFormClose(response) {
    // is response an object?
    if (response === Object(response)) {
      if (response.createMode) {
        response.todo.id = response.id;
        this.todos.unshift(response.todo);
      } else {
        // tslint:disable-next-line:triple-equals
        const index = this.todos.findIndex(value => value.id == response.id);
        this.todos[index] = response.todo;
      }
    }
  }

  buttonLoadTodoList(userId: string) {
    this.todoService.getTodos(userId).subscribe(response => {
      this.todos = [];
      response.docs.forEach(value => {
        const data = value.data();
        const id = value.id;
        const todo: TodoViewModel = {
          id: id,
          title: data.title,
          description: data.description,
          done: data.done,
          lastModifiedDate: data.lastModifiedDate.toDate()
        };

        this.todos.push(todo);
      });
    });
  }

  buttonClickCompleteTask(index: number) {
    const newDoneValue = !this.todos[index].done;
    this.todos[index].done = newDoneValue;
    const obj = { done: newDoneValue };
    const id = this.todos[index].id;
    this.todoService.editTodoPartial(id, obj);
  }

  buttonClickEdit(todo: TodoViewModel) {
    const modal = this.modalService.open(TodoFormComponent);
    modal.result.then(
      this.handleModalTodoFormClose.bind(this),
      this.handleModalTodoFormClose.bind(this)
    );
    modal.componentInstance.createMode = false;
    modal.componentInstance.todo = todo;
  }

  buttonClickDelete(todoId: string, index: number) {
    this.todoService.deleteTodo(todoId)
      .then(() => {
        this.todos.splice(index, 1);
      })
      .catch(err => console.error(err));
  }

}
