import PropTypes from 'prop-types';
import { Overlay } from 'components/Overlay/Overlay.styled';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onCloseModal, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', onEscPress);

    return () => {
      window.removeEventListener('keydown', onEscPress);
    };
  });

  const onEscPress = evt => {
    if (evt.code === 'Escape') {
      onCloseModal();
    }
  };

  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onCloseModal();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <div className="Modal">{children}</div>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
