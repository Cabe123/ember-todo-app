import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';
export default Controller.extend({
  selectedList: '',
  selectedTodo: null,

  todoListService: service('todoList'),
  todoService: service('todo'),

  findTodoList(id) {
    return this.model.findBy('id', id);
  },

  actions: {
    todoListChange(listId, todoId) {
      let todo;
      let destinationList = this.findTodoList(listId);

      for (let i = 0; i < this.model.length; i++) {
        for (let j = 0; j < this.model[i].todos.length; j++) {
          if (this.model[i].todos[j].id === todoId) {
            todo = this.model[i].todos[j];
            todo.set('listId', listId);
            this.model[i].todos.removeObject(todo);
          }
        }
      }

      if (destinationList.name === 'Today') {
        todo.set('isCompleted', false);
      }

      destinationList.todos.pushObject(todo);
      this.todoService.updateTodo(todo);
    },

    changeTodoStatus(todo) {
      todo.set('isCompleted', !todo.isCompleted);
      this.todoService.updateTodo(todo);
    },

    addTodo() {
      let title = this.get('todoTitle');
      let content = this.get('todoContent');
      let listId = this.get('selectedList');

      if (title.trim() != '' || content.trim() != '') {
        let newTodo = this.todoService.createTodo(title, content, listId);
        let todoList = this.findTodoList(listId);
        todoList.todos.pushObject(newTodo);

        this.set('todoTitle', '');
        this.set('todoContent', '');
        this.set('selectedList', '');
      }
    },

    showAddTodoModal(listId) {
      this.set('selectedList', listId);
      $('.ui.addTodo.modal.mini').modal('show');
    },

    showAddListModal() {
      $('.ui.list.modal.mini').modal('show');
    },

    addList() {
      let name = this.get('listName');
      if (name.trim() != '' && name != 'Today') {
        let list = this.todoListService.createList(name);
        this.model.pushObject(list);
        this.set('listName', '');
      }
    },

    updateTodo() {
      this.selectedTodo.set('title', this.get('updatedTodoTitle'));
      this.selectedTodo.set('content', this.get('updatedTodoContent'));
      this.todoService.updateTodo(this.selectedTodo);
    },

    archiveTodo() {
      this.selectedTodo.set('isCleared', true);
      this.todoService.updateTodo(this.selectedTodo);
    },

    showUpdateTodoModal(todo) {
      this.selectedTodo = todo;
      this.set('updatedTodoTitle', todo.title);
      this.set('updatedTodoContent', todo.content);
      $('.ui.updateTodo.modal.mini').modal('show');
    },

    showArchiveTodoModal(todo) {
      this.selectedTodo = todo;
      $('.ui.basic.archiveTodo.modal').modal('show');
    },
  },
});
