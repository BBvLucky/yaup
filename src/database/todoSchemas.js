import Realm from 'realm';

export const TODOLIST_SCHEMA = 'TodoList';
export const TODO_SCHEMA = 'Todo';

export const TodoListSchema = {
  name: TODOLIST_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: {type: 'string'},
    todos: {type: 'list', objectType: TODO_SCHEMA},
  },
};

export const TodoSchema = {
  name: TODO_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: {type: 'string', indexed: true},
    done: {type: 'bool', default: false},
  },
};

const dbOptions = {
  path: 'realmmobx.realm',
  schema: [TodoListSchema, TodoSchema],
  schemaVersion: 1,
};

export const createNewTodoList = newTodoList =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(TODOLIST_SCHEMA, newTodoList);
        });
        resolve(newTodoList);
      })
      .catch(e => reject(e));
  });

export const updateTodoList = todoList =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          let updatingTodoList = realm.objectForPrimaryKey(
            TODOLIST_SCHEMA,
            todoList.id,
          );
          updatingTodoList.name = todoList.name;
        });
        resolve();
      })
      .catch(e => reject(e));
  });

export const deleteTodoList = todoListId =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          const deletingTodoList = realm.objectForPrimaryKey(
            TODOLIST_SCHEMA,
            todoListId,
          );
          realm.delete(deletingTodoList.todos);
          realm.delete(deletingTodoList);
          resolve();
        });
      })
      .catch(e => reject(e));
  });

export const deleteAll = () =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          const allTodoList = realm.objects(TODOLIST_SCHEMA);
          for (let i in allTodoList) {
            let eachTodoList = allTodoList[i];
            realm.delete(eachTodoList.todos);
          }
          realm.delete(allTodoList);
          resolve();
        });
      })
      .catch(e => reject(e));
  });

export const queryAll = () =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        const todoList = realm.objects(TODOLIST_SCHEMA);
        resolve(todoList);
      })
      .catch(e => reject(e));
  });

export const filterTodoList = searchText =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        const filteredTodoList = realm
          .objects(TODOLIST_SCHEMA)
          .filtered(`name CONTAINS[c] "${searchText}"`);
        resolve(filteredTodoList);
      })
      .catch(e => reject(e));
  });

export const todosInTodoList = (todoListId, todos) =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        let todoList = realm.objectForPrimaryKey(TODOLIST_SCHEMA, todoListId);
        realm.write(() => {
          for (let i in todos) {
            todoList.todos.push(todos[i]);
          }
          resolve(todoList);
        });
      })
      .catch(e => reject(e));
  });

export const getTodosFromTodoList = todoListId =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        const todoList = realm.objectForPrimaryKey(TODOLIST_SCHEMA, todoListId);
        resolve(todoList.todos);
      })
      .catch(e => reject(e));
  });

export default new Realm(dbOptions);
