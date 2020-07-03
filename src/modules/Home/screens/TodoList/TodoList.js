import React from 'react';
import {
  View,
  Button,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  // SectionList,
} from 'react-native';
import uuid from 'uuid/v4';
import realm, {
  queryAll,
  updateTodoList,
  createNewTodoList,
  deleteTodoList,
  deleteAll,
  filterTodoList,
  todosInTodoList,
  getTodosFromTodoList,
} from '../../../../database/todoSchemas';

import {colors} from '../../../../theme';

export default class TodoList extends React.PureComponent {
  state = {
    todoList: [],
    searchTodo: '',
    todos: [],
  };

  componentDidMount() {
    this.reloadData();
    realm.addListener('change', () => this.reloadData());
  }

  componentWillUnmount() {
    realm.removeAllListeners();
  }

  reloadData = () => {
    queryAll()
      .then(todoList => this.setState({todoList}))
      .catch(e => console.log(e, ' - error'));
  };

  renderItem = info => {
    const {
      item: {id, name},
    } = info;

    return (
      <TouchableOpacity
        onPress={() => deleteTodoList(id)}
        style={{backgroundColor: colors.primaryLight, padding: 15}}>
        <Text>{name}</Text>
        <Button
          title="change todo"
          onPress={() => {
            const newTodoList = {
              id,
              name: 'Changed todo',
            };
            updateTodoList(newTodoList);
          }}
        />
        <Button
          title="add todos"
          onPress={() => {
            const todos = [
              {
                id: uuid(),
                name: 'one',
              },
              {
                id: uuid(),
                name: 'two',
              },
              {
                id: uuid(),
                name: 'three',
              },
            ];
            todosInTodoList(id, todos).then(newList =>
              this.setState({todoList: newList}),
            );
          }}
        />
        <Button
          title="get todos"
          onPress={() => {
            getTodosFromTodoList(id)
              .then(todos => this.setState({todos}))
              .catch(e => console.log(e, ' - error'));
          }}
        />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <FlatList
        data={this.state.todoList}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: colors.primary,
            }}
          />
        )}
        ListHeaderComponent={() => (
          <View>
            <Text>Todo list</Text>
            <TextInput
              value={this.state.searchTodo}
              onChangeText={searchTodo => {
                this.setState({searchTodo});
                filterTodoList(searchTodo).then(filteredList =>
                  this.setState({todoList: filteredList}),
                );
              }}
            />
            <Button
              title="add new"
              onPress={() => {
                const newTodoList = {
                  id: uuid(),
                  name: 'Test todo',
                };
                createNewTodoList(newTodoList);
              }}
            />
          </View>
        )}
        ListFooterComponent={() => (
          <Button
            title="delete all"
            onPress={() => {
              deleteAll();
              this.setState({todos: []});
            }}
          />
        )}
      />
    );
  }
}
