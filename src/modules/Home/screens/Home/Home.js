import React from 'react';
import {Text, SafeAreaView} from 'react-native';

import {PhotoViewer, Card} from '../../../../components';

class Home extends React.PureComponent {
  state = {
    showPhotoViewer: false,
  };

  setPhotoViewer = val => {
    this.setState({showPhotoViewer: val});
  };

  render() {
    return (
      <SafeAreaView style={{paddingHorizontal: 10}}>
        <Text>Home</Text>
        <Card
          onPress={() => this.setPhotoViewer(true)}
          image={require('../../../../assets/test.jpg')}
          title="The Travolta"
          price="300"
        />
        <PhotoViewer
          src={require('../../../../assets/test.jpg')}
          visible={this.state.showPhotoViewer}
          closeModal={this.setPhotoViewer}
        />
      </SafeAreaView>
    );
  }
}

export default Home;
