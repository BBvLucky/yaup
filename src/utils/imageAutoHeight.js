import {Dimensions, Image} from 'react-native';

export const getSize = image => {
  const {width, height} = Image.resolveAssetSource(image);
  return {width, height};
};

export const getWindowWidth = () => {
  const {width} = Dimensions.get('window');
  return width;
};

export const imageAutoHeigth = (width, image) => {
  const autoHeight = (width * getSize(image).height) / getSize(image).width;
  return autoHeight;
};
