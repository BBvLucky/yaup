import React from 'react';
import {observer, inject} from 'mobx-react';
import {SafeAreaView, Text, Button} from 'react-native';

@inject('TestModuleStore')
@observer
class TestModule extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const {h1} = this.props.TestModuleStore.titles;
    const {setTitle} = this.props.TestModuleStore;

    return (
      <SafeAreaView>
        <Text>{h1}</Text>
        <Button onPress={setTitle} title="set title" />
      </SafeAreaView>
    );
  }
}

export default TestModule;
