import Service from '@ember/service';
import $ from 'jquery';
import Todo from 'ember-todo-v2/models/todo';
export default Service.extend({
  getTodos() {
    var todoJSON;
    var todoArray = [];

    var settings = {
      async: false,
      url: 'caleb-todo-rs/v1/todos/all',
    };

    $.ajax(settings).done(function(response) {
      todoJSON = response['todo'];
    });

    for (let i = 0; i < todoJSON.length; i++) {
      let x = todoJSON[i];

      let todo = Todo.create({
        id: x.id,
        title: x.title,
        content: x.content,
        isCompleted: x.completed,
        isCleared: x.cleared,
        listId: x.boardId,
      });
      todoArray.push(todo);
    }
    return todoArray;
  },

  updateTodo(todo) {
    let settings = {
      async: false,
      url:
        'caleb-todo-rs/v1/todos/update/' +
        todo.id +
        '/' +
        todo.title +
        '/' +
        todo.content +
        '/' +
        todo.isCompleted +
        '/' +
        todo.isCleared +
        '/' +
        todo.listId,
      method: 'PUT',
    };

    $.ajax(settings).done(function() {});
  },

  createTodo(title, content, listId) {
    let todo;
    let settings = {
      async: false,
      url: 'caleb-todo-rs/v1/todos/create/' + title + '/' + content + '/' + listId,
      method: 'POST',
    };

    $.ajax(settings).done(function(response) {
      let x = response['todo'][0];
      todo = Todo.create({
        id: x.id,
        title: x.title,
        content: x.content,
        isCompleted: x.completed,
        isCleared: x.cleared,
        listId: x.boardId,
      });
    });
    return todo;
  },
});
