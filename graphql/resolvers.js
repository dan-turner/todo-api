import todos from '../models/todos'

const resolvers = {
  Query: {
    async todos() {
      console.log('resolvers: todos()')
      const items = await todos.list();
      console.log(items)
      return items;
    },
  },
  Mutation: {
    createTodo(root, { input }) {
      console.log('resolvers: createTodo()')
      console.log(input)
      return todos.create(input);
    },
    updateTodo(root, { input }) {
      return todos.update(input);
    },
  }
};

export default resolvers;
