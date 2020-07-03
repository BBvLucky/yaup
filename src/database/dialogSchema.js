import Realm from 'realm';

export const DIALOGLIST_SCHEMA = 'DialogList';
export const MESSAGE_SCHEMA = 'Message';

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
  path: 'realmmobxMess.realm',
  schema: [DialogListSchema, MessageSchema],
  schemaVersion: 2,
};

export const createNewDialogList = newDialogList =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(DIALOGLIST_SCHEMA, newDialogList);
        });
        resolve(newDialogList);
      })
      .catch(e => reject(e));
  });

export const updateDialogList = dialogList =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          let updatingDialogList = realm.objectForPrimaryKey(
            DIALOGLIST_SCHEMA,
            dialogList.id,
          );
          updatingDialogList.lastMessage = dialogList.lastMessage;
        });
        resolve();
      })
      .catch(e => reject(e));
  });

export const deleteDialogList = dialogListId =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          const deletingDialogList = realm.objectForPrimaryKey(
            DIALOGLIST_SCHEMA,
            dialogListId,
          );
          realm.delete(deletingDialogList.messages);
          realm.delete(deletingDialogList);
          resolve();
        });
      })
      .catch(e => reject(e));
  });

export const deleteMessage = (dialogListId, messageId) =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          const dialogList = realm.objectForPrimaryKey(
            DIALOGLIST_SCHEMA,
            dialogListId,
          );
          realm.delete(dialogList.messages.find(item => item.id === messageId));
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
          const allDialogLists = realm.objects(DIALOGLIST_SCHEMA);
          for (let i in allDialogLists) {
            let eachDialogList = allDialogLists[i];
            realm.delete(eachDialogList.messages);
          }
          realm.delete(allDialogLists);
          resolve();
        });
      })
      .catch(e => reject(e));
  });

export const queryAll = () =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        const dialogList = realm.objects(DIALOGLIST_SCHEMA);
        resolve(dialogList);
      })
      .catch(e => reject(e));
  });

export const filterTodoList = (dialogListId, searchText) =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        const filteredDialogList = realm.objectForPrimaryKey(
          DIALOGLIST_SCHEMA,
          dialogListId,
        );
        const filteredMessagesList = filteredDialogList.filtered(
          `name CONTAINS[c] "${searchText}"`,
        );
        resolve(filteredMessagesList);
      })
      .catch(e => reject(e));
  });

export const messagesInDialogList = (dialogListId, message) =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        let dialogList = realm.objectForPrimaryKey(
          DIALOGLIST_SCHEMA,
          dialogListId,
        );
        realm.write(() => {
          dialogList.messages.push(message);
          resolve(dialogList);
        });
      })
      .catch(e => reject(e));
  });

export const getMessagesFromDialogList = dialogListId =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        const dialogList = realm.objectForPrimaryKey(
          DIALOGLIST_SCHEMA,
          dialogListId,
        );
        resolve(dialogList.messages);
      })
      .catch(e => reject(e));
  });

export default new Realm(dbOptions);
