// import {action, observable, flow} from 'mobx';
import TestModuleStore from '../modules/TestModule/TestModuleStore';
import ApplicationStore from '../modules/Application/ApplicationStore';

class mainStore {
  constructor() {
    this.TestModuleStore = new TestModuleStore();
    this.ApplicationStore = new ApplicationStore();
  }
}

export default new mainStore();
