import Component from '@ember/component';
import { set } from '@ember/object';
export default Component.extend({
  
  classNames: ['draggableDropZone'],
  classNameBindings: ['dragClass'],
  dragClass: 'deactivated',

  dragLeave(event) {
    event.preventDefault();
    set(this, 'dragClass', 'deactivated');
  },

  dragOver(event) {
    event.preventDefault();
    set(this, 'dragClass', 'activated');
  },

  drop(event) {

    var data = event.dataTransfer.getData('text');
 
    this.onTodoDropped(this.listId, data);

  },

});