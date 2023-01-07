import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Scroll from 'react-scroll';
import { fetchApi } from 'Services/fetchApi';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { ButtonLoadMore } from 'components/ButtonLoadMore';
import { Blocks } from 'react-loader-spinner';
import { imgTemplate } from './ImageTemplate';
import { Container, ImageList } from './ImageGallery.styled';

export const ImageGallery = ({
  search,
  showError,
  initialModal,
  showModal,
}) => {
  const [images, setImages] = useState([...imgTemplate]);
  const [loading, setStatusLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(null);
  const [numberPage, setNumbePage] = useState(1);

  useEffect(() => {
    if (search === '') {
      return;
    }
    setImages([]);
    setTotalHits(null);
    setNumbePage(1);
  }, [search]);

  useEffect(() => {
    if (search === '') {
      return;
    }

    setStatusLoading(true);

    fetchImages();
    async function fetchImages() {
      try {
        const { totalHits, hits } = await fetchApi(search, numberPage);

        if (numberPage === 1) {
          setImages([...hits]);
          setTotalHits(totalHits);
          return;
        }

        if (numberPage > 1) {
          setImages(prevState => [...prevState, ...hits]);
          return;
        }

        if (hits.length === 0) {
          setImages([...imgTemplate]);
          setStatusLoading(false);
          setTotalHits(null);
          setNumbePage(1);

          // showError(true);
          return;
        }
      } catch (error) {
        console.log(error);
      } finally {
        setStatusLoading(false);
      }
    }
  }, [search, numberPage]);

  const incrementPage = () => {
    // this.setState(prevState => {
    //   return { numberPage: prevState.numberPage + 1 };
    // });

    setNumbePage(numberPage + 1);

    scrollWindow();
  };

  const scrollWindow = () => {
    const scroll = Scroll.animateScroll;
    scroll.scrollToBottom({ smooth: true, delay: 1000 });
  };

  const showLargeImg = ({ target }) => {
    // const { initialModal, showModal } = this.props;
    if (target.nodeName !== 'IMG') {
      return;
    }
    //elevate data to modal
    const link = target.getAttribute('large');
    const alt = target.getAttribute('alt');
    initialModal({ link, alt });
    showModal();
  };

  return (
    <Container>
      {loading && (
        <Blocks
          visible={true}
          ariaLabel="blocks-loading"
          wrapperClass="blocks-wrapper"
        />
      )}

      <ImageList onClick={showLargeImg}>
        {images.map(({ id, largeImageURL, webformatURL, tags }) => (
          <ImageGalleryItem
            key={id}
            largeImageURL={largeImageURL}
            webformatURL={`${webformatURL}?w=248&fit=crop&auto=format`}
            tags={tags}
          />
        ))}
      </ImageList>
      {totalHits > images.length && (
        <ButtonLoadMore incrementPage={incrementPage} />
      )}
    </Container>
  );
};

ImageGallery.propTypes = {
  search: PropTypes.string.isRequired,
  showError: PropTypes.func.isRequired,
};
