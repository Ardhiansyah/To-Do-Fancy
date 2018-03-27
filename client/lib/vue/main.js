new Vue({
  el: '#app',
  data: function() {
    return {
      todos: [],
      user: {},
    };
  },
  methods: {
    getData: function() {
      axios.get('http://localhost:3000/todo', {
        headers: { token: localStorage.token }
      })
      .then(res => {
        this.user = res.data.data;
        this.todos = res.data.data.todo;
      })
      .catch(err => {
        console.log(err)
        window.location = '/login.html';
      })
    },
    addTodo: function() {
      axios.post('http://localhost:3000/todo', {
        description: document.querySelector('#myInput').value
      }, {
        headers: { token: localStorage.token }
      })
      .then(res => {
        this.todos.push(res.data.data);
        document.querySelector('#myInput').value = '';
      })
      .catch(err => console.error(err))
    },
    changeTodo: function(id) {
      this.todos[this.todos.findIndex(todo => todo._id == id)].checked = !this.todos[this.todos.findIndex(todo => todo._id == id)].checked;
    },
    removeTodo: function(id) {
      this.todos.splice(this.todos.findIndex(e => e._id == id), 1);
    },
  },
  created: function() {
    this.getData();
  }
});