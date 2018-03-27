Vue.component('list-todo', {
  props: ['todos'],
  template: `
    <div>
      <ul id="todo-list">
        <li v-for="todo in todos" :class="todo.checked ? 'checked' : ''">
          <div @click="changeStatus(todo._id)">{{ todo.description }}</div><span class="close" @click="removeTodo(todo._id)">×</span>
        </li>
      </ul>
    </div>
  `,
  methods: {
    changeStatus: function(id) {
      axios.put('http://localhost:3000/todo/' + id, {
        checked: !this.todos[this.todos.findIndex(todo => todo._id == id)].checked
      }, {
        headers: { token: localStorage.token }
      })
      .then(res => {
        console.log(res);
        this.$emit('change-todo', id);
      })
      .catch(err => console.log(err))
    },
    removeTodo: function(id) {
      axios.delete('http://localhost:3000/todo/' + id, {
        headers: { token: localStorage.token }
      })
      .then(res => {
        console.log(res);
        this.$emit('remove-todo', id);
      })
      .catch(err => console.log(err))
    }
  },
  created: function() {
    console.log('created')
  }
})