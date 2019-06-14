import Component from '@ember/component';


export default Component.extend({
  classNames: ['ui', 'raised', 'link', 'card'],
  attributeBindings: ['draggable'],
  draggable: 'true',
  isHovered: false,

    mouseEnter(){
      this.set('isHovered', true);
    },

    mouseLeave(){
      this.set('isHovered', false);
    },

    doubleClick(){
      this.onTodoDoubleClicked();
    },    

    dragStart(event) {
        return event.dataTransfer.setData('text', this.todo.id);
      },
    
      actions:{
        changeTodoStatus(todo){
            this.onStatusChange(todo);
        },

        archiveTodo(){
          this.onTodoArchiveClicked();
        }
      }

});
