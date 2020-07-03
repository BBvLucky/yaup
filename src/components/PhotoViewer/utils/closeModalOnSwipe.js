export const closeModalOnSwipe = (event, closeModal) => {
  const {
    nativeEvent: {zoomScale, contentOffset},
  } = event;

  if (zoomScale === 1 && contentOffset.y > 100) {
    closeModal(false);
  }
};
