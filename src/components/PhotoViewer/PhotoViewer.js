import React from 'react';
import {Modal, View} from 'react-native';

import PhotoViewerIOS from './PhotoViewerIOS/PhotoViewer';

const PhotoViewer = ({visible, src, closeModal}) => (
  <Modal visible={visible} onRequestClose={() => closeModal(false)}>
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <PhotoViewerIOS src={src} closeModal={closeModal} />
    </View>
  </Modal>
);

export default PhotoViewer;
