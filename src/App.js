import React from 'react';
import {Provider} from 'mobx-react';

import stores from './store';
import {SwitchNavigator} from './routing';

class App extends React.Component {
  render() {
    return (
      <Provider {...stores}>
        <SwitchNavigator />
      </Provider>
    );
  }
}

export default App;
