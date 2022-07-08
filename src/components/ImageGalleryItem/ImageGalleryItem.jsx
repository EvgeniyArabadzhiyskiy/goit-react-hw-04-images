import { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal/Modal';
import { GalleyImg, StyledItem } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ tags, ImgUrl, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <StyledItem>
        <GalleyImg src={ImgUrl} alt={tags} onClick={() => setShowModal(true)} />
      </StyledItem>

      {showModal && (
        <Modal onCloseModal={closeModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </div>
  );
};

ImageGalleryItem.propTypes = {
  ImgUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
