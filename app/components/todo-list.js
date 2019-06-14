import Component from '@ember/component';

export default Component.extend({
    actions: {
        onAddTodoClicked(listId){
            this.onAddTodoClicked(listId);
        },

        onTodoDoubleClicked(todo){
            this.onTodoDoubleClicked(todo)
        },

        onTodoArchiveClicked(todo){
            this.onTodoArchiveClicked(todo)
        }
    }
});
