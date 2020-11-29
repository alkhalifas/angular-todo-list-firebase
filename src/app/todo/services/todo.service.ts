import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Todo} from '../models/todo';
import {TodoViewModel} from '../models/todo-view-model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoCollectionName = 'todos';

  constructor(private db: AngularFirestore) {
  }

  getTodos(userId: string): Observable<firebase.firestore.QuerySnapshot> {
    // tslint:disable-next-line:max-line-length
    return this.db.collection<Todo>(this.todoCollectionName, ref => ref.where('userId', '==', userId).orderBy('lastModifiedDate', 'desc')).get();
  }

  saveTodo(todo: Todo): Promise<DocumentReference> {
    return this.db.collection(this.todoCollectionName).add(todo);
  }

  editTodo(todo: TodoViewModel): Promise<void> {
    return this.db.collection(this.todoCollectionName).doc(todo.id).update(todo);
  }

  // tslint:disable-next-line:ban-types
  editTodoPartial(id: string, obj: Object): Promise<void> {
    return this.db.collection(this.todoCollectionName).doc(id).update(obj);
  }

  deleteTodo(idTodo: string): Promise<void> {
    return this.db.collection(this.todoCollectionName).doc(idTodo).delete();
  }
}
