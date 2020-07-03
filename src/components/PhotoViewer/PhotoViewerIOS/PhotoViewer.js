import React, {useState} from 'react';
import {ScrollView, Image, TouchableWithoutFeedback} from 'react-native';

import {getWindowWidth, imageAutoHeigth} from '../../../utils';
import {closeModalOnSwipe} from '../utils';

import styles from './PhotoViewerStyles';

const PhotoViewer = ({src, closeModal}) => {
  // const [lastPress, setLastPress] = useState(0);
  const [zoom, setZoom] = useState(1);

  // const zoomOnDoublePress = () => {
  //   const time = new Date().getTime();
  //   const delta = time - lastPress;

  //   const DOUBLE_PRESS_DELAY = 400;
  //   if (delta < DOUBLE_PRESS_DELAY) {
  //     zoom > 1 ? setZoom(1) : setZoom(2);
  //   }
  //   setLastPress(time);
  // };

  const resetZoom = event => {
    const {
      nativeEvent: {zoomScale},
    } = event;

    if (zoomScale <= 1 && zoom > 1) {
      setZoom(1);
    }
  };

  const width = getWindowWidth();
  const height = imageAutoHeigth(width, src);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        zoom === 1 ? styles.alignCenter : null,
      ]}
      maximumZoomScale={5}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      onScrollEndDrag={e => {
        resetZoom(e);
        closeModalOnSwipe(e, closeModal);
      }}
      zoomScale={zoom}>
      <Image source={src} style={{width, height}} />
    </ScrollView>
  );
};

export default PhotoViewer;
