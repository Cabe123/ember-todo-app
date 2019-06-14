import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  todoService: service('todo'),

  model() {
    return this.todoService.getTodos();
  },
});
