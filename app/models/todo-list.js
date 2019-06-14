import EmberObject from '@ember/object';


export default EmberObject.extend({
    id: "",
    name: "",

    init() {
        this._super(...arguments);

        if (!this.todos) {
            this.set('todos', []);
        }
    },
});
