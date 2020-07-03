import Realm from 'realm';

export const REGISTERED_USERS_LIST = 'RegisteredUsersList';

export const RegisteredUsersListSchema = {
  name: REGISTERED_USERS_LIST,
  primaryKey: 'userName',
  properties: {
    userName: {type: 'string'},
    isAuthorized: {type: 'bool', default: false},
  },
};

const dbOptions = {
  path: 'realmmobxAuth.realm',
  schema: [RegisteredUsersListSchema],
  schemaVersion: 2,
};

export const addUser = newUser =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(REGISTERED_USERS_LIST, newUser);
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
          .objects(REGISTERED_USERS_LIST)
          .filtered(`userName CONTAINS[c] "${searchedUserName}"`); //[c] = case insensitive

        resolve(userData);
      })
      .catch(e => {
        reject(e);
      });
  });

export const getUsersName = () =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        const userData = realm
          .objects(REGISTERED_USERS_LIST)
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
        const dialogList = realm.objects(REGISTERED_USERS_LIST);
        resolve(dialogList);
      })
      .catch(e => reject(e));
  });

export const unAuth = userName =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          let updatingTodoList = realm.objectForPrimaryKey(
            REGISTERED_USERS_LIST,
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
            REGISTERED_USERS_LIST,
            userName,
          );
          updatingTodoList.isAuthorized = true;
        });
        resolve();
      })
      .catch(e => reject(e));
  });

export default new Realm(dbOptions);
