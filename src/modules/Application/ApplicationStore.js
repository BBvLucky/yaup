import {action, observable, flow} from 'mobx';
import {queryAllMessages} from '../../database/mainSchema';

class ApplicationStore {
  @observable user = {
    id: '',
    userName: '',
    isAuthorized: false,
    dialogs: [],
  };

  // @action setUserData = user => {
  //   this.user.userName = user.userName;
  //   this.user.isAuthorized = user.isAuthorized;
  //   this.user.dialogs = user.dialogs;
  // };

  @action setUserData = (name, isAuthorized) => {
    this.user.userName = name.username || name.userName;
    this.user.id = name.password;
    this.user.isAuthorized = isAuthorized;
  };

  @action setUserAuth = isAuthorized => {
    this.user.isAuthorized = isAuthorized;
  };

  @action setUserDialogs = dialogs => {
    this.user.dialogs = dialogs;
  };
}

export default ApplicationStore;
