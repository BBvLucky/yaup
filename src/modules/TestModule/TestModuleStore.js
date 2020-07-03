import {action, observable} from 'mobx';

class TestModuleStore {
  @observable titles = {
    h1: 'Test',
    mainText: '',
  };

  @action setTitle = () => {
    this.titles.h1 = 'hi';
  };
}

export default TestModuleStore;
