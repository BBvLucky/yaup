import Realm from 'realm';

export const USERS_LIST = 'UsersList';
export const DIALOGLIST_SCHEMA = 'DialogList';
export const MESSAGE_SCHEMA = 'Message';

export const UsersListSchema = {
  name: USERS_LIST,
  primaryKey: 'userName',
  properties: {
    userName: {type: 'string'},
    isAuthorized: {type: 'bool', default: false},
    dialogs: {type: 'list', objectType: DIALOGLIST_SCHEMA},
  },
};

export const DialogListSchema = {
  name: DIALOGLIST_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    userName: {type: 'string'},
    messages: {type: 'list', objectType: MESSAGE_SCHEMA},
    lastMessage: {type: 'string'},
  },
};

export const MessageSchema = {
  name: MESSAGE_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    userName: {type: 'string', indexed: true},
    message: {type: 'string'},
    isMine: {type: 'bool', default: true},
  },
};

const dbOptions = {
  path: 'realmmobxMainDB.realm',
  schema: [UsersListSchema, DialogListSchema, MessageSchema],
  schemaVersion: 1,
};

export const addUser = newUser =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(USERS_LIST, newUser);
        });

        resolve(newUser);
      })
      .catch(e => reject(e));
  });

export const checkUser = searchedUserName =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        const userData = realm
          .objects(USERS_LIST)
          .filtered(`userName = "${searchedUserName}"`);

        resolve(userData);
      })
      .catch(e => {
        reject(e);
      });
  });

export const getUserData = () =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        const userData = realm
          .objects(USERS_LIST)
          .filtered(`isAuthorized = ${true}`);

        resolve(userData);
      })
      .catch(e => {
        reject(e);
      });
  });

export const queryAll = () =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        const usersList = realm.objects(USERS_LIST);
        resolve(usersList);
      })
      .catch(e => reject(e));
  });

export const unAuth = userName =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          let updatingTodoList = realm.objectForPrimaryKey(
            USERS_LIST,
            userName,
          );
          updatingTodoList.isAuthorized = false;
        });
        resolve();
      })
      .catch(e => reject(e));
  });

export const auth = userName =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          let updatingTodoList = realm.objectForPrimaryKey(
            USERS_LIST,
            userName,
          );
          updatingTodoList.isAuthorized = true;
        });
        resolve();
      })
      .catch(e => reject(e));
  });

// dialogs

export const createNewDialogList = (userName, newDialogList) =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        const createNewDialog = realm.objectForPrimaryKey(USERS_LIST, userName);
        realm.write(() => {
          createNewDialog.dialogs.push(newDialogList);
          resolve(createNewDialog);
        });
      })
      .catch(e => reject(e));
  });

// export const updateDialogList = dialogList =>
//   new Promise((resolve, reject) => {
//     Realm.open(dbOptions)
//       .then(realm => {
//         realm.write(() => {
//           let updatingDialogList = realm.objectForPrimaryKey(
//             DIALOGLIST_SCHEMA,
//             dialogList.id,
//           );
//           updatingDialogList.lastMessage = dialogList.lastMessage;
//         });
//         resolve();
//       })
//       .catch(e => reject(e));
//   });

export const updateDialogList = (userName, dialogList) =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          let updatingDialogList = realm.objectForPrimaryKey(
            USERS_LIST,
            userName,
          );
          updatingDialogList.dialogs.find(
            item => item.id === dialogList.id,
          ).lastMessage = dialogList.lastMessage;
        });
        resolve();
      })
      .catch(e => reject(e));
  });

// export const deleteDialogList = dialogListId =>
//   new Promise((resolve, reject) => {
//     Realm.open(dbOptions)
//       .then(realm => {
//         realm.write(() => {
//           const deletingDialogList = realm.objectForPrimaryKey(
//             DIALOGLIST_SCHEMA,
//             dialogListId,
//           );
//           realm.delete(deletingDialogList.messages);
//           realm.delete(deletingDialogList);
//           resolve();
//         });
//       })
//       .catch(e => reject(e));
//   });

export const deleteDialogList = (userName, dialogListId) =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          const deletingDialogList = realm.objectForPrimaryKey(
            USERS_LIST,
            userName,
          );
          realm.delete(
            deletingDialogList.dialogs.find(item => item.id === dialogListId)
              .messages,
          );
          realm.delete(
            deletingDialogList.dialogs.find(item => item.id === dialogListId),
          );
          resolve();
        });
      })
      .catch(e => reject(e));
  });

// export const deleteMessage = (dialogListId, messageId) =>
//   new Promise((resolve, reject) => {
//     Realm.open(dbOptions)
//       .then(realm => {
//         realm.write(() => {
//           const dialogList = realm.objectForPrimaryKey(
//             DIALOGLIST_SCHEMA,
//             dialogListId,
//           );
//           realm.delete(dialogList.messages.find(item => item.id === messageId));
//           resolve();
//         });
//       })
//       .catch(e => reject(e));
//   });

export const deleteMessage = (userName, dialogListId, messageId) =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          const dialogList = realm.objectForPrimaryKey(USERS_LIST, userName);
          realm.delete(
            dialogList.dialogs
              .find(item => item.id === dialogListId)
              .messages.find(item => item.id === messageId),
          );
          resolve();
        });
      })
      .catch(e => reject(e));
  });

// export const deleteAll = () =>
//   new Promise((resolve, reject) => {
//     Realm.open(dbOptions)
//       .then(realm => {
//         realm.write(() => {
//           const allDialogLists = realm.objects(DIALOGLIST_SCHEMA);
//           for (let i in allDialogLists) {
//             let eachDialogList = allDialogLists[i];
//             realm.delete(eachDialogList.messages);
//           }
//           realm.delete(allDialogLists);
//           resolve();
//         });
//       })
//       .catch(e => reject(e));
//   });

export const queryAllMessages = userName =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        const dialogList = realm.objectForPrimaryKey(USERS_LIST, userName);
        resolve(dialogList.dialogs);
        // resolve(dialogList);
      })
      .catch(e => reject(e));
  });

// export const filterTodoList = (dialogListId, searchText) =>
//   new Promise((resolve, reject) => {
//     Realm.open(dbOptions)
//       .then(realm => {
//         const filteredDialogList = realm.objectForPrimaryKey(
//           DIALOGLIST_SCHEMA,
//           dialogListId,
//         );
//         const filteredMessagesList = filteredDialogList.filtered(
//           `name CONTAINS[c] "${searchText}"`,
//         );
//         resolve(filteredMessagesList);
//       })
//       .catch(e => reject(e));
//   });

// export const messagesInDialogList = (dialogListId, message) =>
//   new Promise((resolve, reject) => {
//     Realm.open(dbOptions)
//       .then(realm => {
//         let dialogList = realm.objectForPrimaryKey(
//           DIALOGLIST_SCHEMA,
//           dialogListId,
//         );
//         realm.write(() => {
//           dialogList.messages.push(message);
//           resolve(dialogList);
//         });
//       })
//       .catch(e => reject(e));
//   });

export const messagesInDialogList = (userName, dialogListId, message) =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        let dialogList = realm.objectForPrimaryKey(USERS_LIST, userName);
        realm.write(() => {
          dialogList.dialogs
            .find(item => item.id === dialogListId)
            .messages.push(message);
          resolve(dialogList);
        });
      })
      .catch(e => reject(e));
  });

// export const getMessagesFromDialogList = dialogListId =>
//   new Promise((resolve, reject) => {
//     Realm.open(dbOptions)
//       .then(realm => {
//         const dialogList = realm.objectForPrimaryKey(
//           DIALOGLIST_SCHEMA,
//           dialogListId,
//         );
//         resolve(dialogList.messages);
//       })
//       .catch(e => reject(e));
//   });

export const getMessagesFromDialogList = (userName, dialogListId) =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        const dialogList = realm.objectForPrimaryKey(USERS_LIST, userName);
        resolve(
          dialogList.dialogs.find(item => item.id === dialogListId).messages,
        );
      })
      .catch(e => reject(e));
  });

export default new Realm(dbOptions);
