import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as Scroll from 'react-scroll';
import { fetchImages } from 'Services/fetchImages';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { ButtonLoadMore } from 'components/ButtonLoadMore';
import { Blocks } from 'react-loader-spinner';
import { imgTemplate } from './ImageTemplate';
import { Container, ImageList } from './ImageGallery.styled';

// const INITIAL_VALUE = {
//   images: [],
//   loading: false,
//   totalHits: null,
//   numberPage: 1,
//   imgPerPage: 12,
// };
export const ImageGallery = ({
  search,
  showError,
  initialModal,
  showModal,
}) => {
  // state = {
  //   ...INITIAL_VALUE,
  //   images: [...imgTemplate],
  // };
  const [f, setData] = useState([]);
  const [images, setImages] = useState([...imgTemplate]);
  const [loading, setStatusLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(null);
  const [numberPage, setNumbePage] = useState(1);
  const [imgPerPage, setImgPerGage] = useState(12);

  const fetchData = useCallback(async () => {
    const data = await fetchImages(search, imgPerPage, numberPage);

    setData(data);
    // return data;
  }, []);

  // useEffect(() => {
  //   setStatusLoading(true);

  //   try {
  //     // const res = fetchImages(search, imgPerPage, numberPage);
  //     fetchData();
  //     console.log(f);
  // const { totalHits, hits } = res;

  // if (hits.length === 0) {
  //   setImages([...imgTemplate]);
  //   setStatusLoading(false);
  //   setTotalHits(null);
  //   setNumbePage(1);
  //   setImgPerGage(12);

  //   showError(true);
  //   return;
  // }

  // if (numberPage === 1) {
  //   setImages([...hits]);
  //   setTotalHits(totalHits);
  //   return;
  // }

  // setImages([...images, ...hits]);

  // this.setState(prevState => {
  //   if (prevProps.search !== search) {
  //     return { images: [...hits], totalHits };
  //   }
  //   return { images: [...prevState.images, ...hits] };
  // });
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setStatusLoading(false);
  //   }
  // }, [fetchData, images, numberPage, imgPerPage, search, showError]);

  // async componentDidUpdate(prevProps, prevState) {
  //   const { search, showError } = this.props;
  //   const { imgPerPage, numberPage } = this.state;

  //   if (prevProps.search !== search || prevState.numberPage !== numberPage) {
  //     this.setState({ loading: true });

  //     try {

  //       const res = await fetchImages(search, imgPerPage, numberPage);
  //       const { totalHits, hits } = res;

  //       if (hits.length === 0) {
  //         this.setState({ ...INITIAL_VALUE });
  //         showError(true);
  //         return;
  //       }

  //       this.setState(prevState => {
  //         if (prevProps.search !== search) {
  //           return { images: [...hits], totalHits };
  //         }
  //         return { images: [...prevState.images, ...hits] };
  //       });

  // } catch (error) {
  //   console.log(error);
  // } finally {
  //   this.setState({ loading: false });
  // }
  //   }
  // }

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

  // const { loading, images, totalHits } = this.state;

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
