import Service from '@ember/service';
import $ from 'jquery';
import { inject as service } from '@ember/service';
import TodoList from 'ember-todo-v2/models/todo-list';
export default Service.extend({
  todo: service(),

  getLists() {
    var todoListJSON;
    var todoLists = [];
    var todos = this.todo.getTodos();

    var settings = {
      async: false,
      url: 'caleb-todo-board-rs/v1/todo-boards/all',
    };

    $.ajax(settings).done(function(response) {
      todoListJSON = response['todoboard'];
    });

    for (let i = 0; i < todoListJSON.length; i++) {
      let todoList = TodoList.create({
        id: todoListJSON[i].id,
        name: todoListJSON[i].name,
      });
      let list = [];
      for (let j = 0; j < todos.length; j++) {
        if (todoList.id === todos[j].listId) {
          list.push(todos[j]);
        }
        todoList.set('todos', list);
      }
      todoLists.push(todoList);
    }
    return todoLists;
  },

  createList(listName) {
    let todoList;

    let settings = {
      async: false,
      url: 'caleb-todo-board-rs/v1/todo-boards/create/' + listName,
      method: 'POST',
    };

    $.ajax(settings).done(function(response) {
      let x = response['todoboard'][0];
      todoList = TodoList.create({
        id: x.id,
        name: x.name,
      });
    });

    return todoList;
  },
});
