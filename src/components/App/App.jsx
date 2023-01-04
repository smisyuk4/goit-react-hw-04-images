import { useState } from 'react';

import { SearchBar } from 'components/SearchBar';
import { Message } from 'components/Message';
import { ImageGallery } from 'components/ImageGallery';
import { Modal } from 'components/Modal';

export const App = () => {
  const [search, setSearch] = useState('')
  const [isErrorLoad, setError] = useState(false)
  const [isShowModal, setModal] = useState(false)
  const [largeImg, setLargeImg] = useState({})

  const handleSubmit = ({ search }) => {
    setSearch(search)
  };

  const showError = status => {
    setError(status)

    setTimeout(() => {
      setError(!status)
    }, 2000);
  };

  const initialModal = (data) => {
    setLargeImg(data)
  }

  const showModal = () => {
    setModal(!isShowModal)
  }

  return (
    <div>
      {isShowModal && <Modal largeImageURL={largeImg.link} tags={largeImg.alt} onClose={showModal} />}
      
      <SearchBar handleSubmit={handleSubmit} />

      {isErrorLoad && (
        <Message text="status 200, but not images" />
      )}
      
      <ImageGallery
        search={search}
        initialModal={initialModal}
        showModal={showModal}
        showError={showError}
      />
    </div>
  );
}
