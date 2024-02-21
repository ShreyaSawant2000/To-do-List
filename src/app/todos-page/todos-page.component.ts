import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.css']
})
export class TodosPageComponent implements OnInit {
  private searchSubject = new Subject<string>();
  todos: any[] = [];
  titleInput: string = '';
  descriptionInput: string = '';
  dateInput: string = '';
  searchQuery: string = '';
  filteredTodos: any[] = [];
  constructor(private router: Router) {}
  addTodo() {
    if (this.titleInput && this.descriptionInput && this.dateInput) {
      const newTodo = {
        title: this.titleInput,
        description: this.descriptionInput,
        date: this.dateInput,
      };
      alert("Todo Added")

      this.todos.push(newTodo);
      this.saveToLocalStorage();
      this.clearInputs();
      this.search();
    }
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
    this.saveToLocalStorage();
    this.search();
    alert("Todo Deleted")
  }

  saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadFromLocalStorage() {
    const storedTodos = localStorage.getItem('todos');
    this.todos = storedTodos ? JSON.parse(storedTodos) : [];
    this.search();
  }

  clearInputs() {
    this.titleInput = '';
    this.descriptionInput = '';
    this.dateInput = '';
  }

  // ngOnInit() {
  //   this.loadFromLocalStorage();
  // }

  ngOnInit() {
    this.loadFromLocalStorage();
    
    // Subscribe to the search subject with a debounce time of 300 milliseconds
    this.searchSubject.pipe(debounceTime(500)).subscribe(() => {
      this.search();
    });
  }


  onSearchInput(event: any) {
    this.searchQuery = event.target.value;
    // Push the search query to the subject for debouncing
    this.searchSubject.next(this.searchQuery);
  }

  search() {
    this.filteredTodos = this.todos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        todo.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        todo.date.includes(this.searchQuery)
    );
  }
  

  logout() {
    
    this.router.navigate(['/loginsignup']);
  }

}