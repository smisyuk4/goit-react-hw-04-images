import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import urlPropType from 'url-prop-type';
import { IconContext } from 'react-icons';
import { CgCloseR } from 'react-icons/cg';
import { Overlay, ModalWrp, ButtonClose, Image } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeImageURL, tags, onClose }) => {
  const handleKeyDown = useCallback(
    ({ code }) => {
      return code === 'Escape' ? onClose() : null;
    },
    [onClose]
  );

  const handleClickOverlay = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return createPortal(
    <Overlay onClick={handleClickOverlay}>
      <ModalWrp>
        <Image src={largeImageURL} alt={tags} width="1000" height="1000" />
        <ButtonClose onClick={onClose} type="button">
          <IconContext.Provider
            value={{
              size: '20px',
            }}
          >
            <CgCloseR />
          </IconContext.Provider>
        </ButtonClose>
      </ModalWrp>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  largeImageURL: urlPropType.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
