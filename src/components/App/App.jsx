import { useState } from 'react';

import { SearchBar } from 'components/SearchBar';
import { ImageGallery } from 'components/ImageGallery';
import { Modal } from 'components/Modal';

export const App = () => {
  const [search, setSearch] = useState('')
  const [isShowModal, setModal] = useState(false)
  const [largeImg, setLargeImg] = useState({})

  const handleSubmit = ({ search }) => {
    setSearch(search)
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
      
      <ImageGallery
        search={search}
        initialModal={initialModal}
        showModal={showModal}
      />
    </div>
  );
}
