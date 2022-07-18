import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { StyledList } from './ImageGallery.styled';

const ImageGallery = ({ articlesHits, galleryRef }) => {
  
  return (
    <StyledList ref={galleryRef}>
      {articlesHits.map(({ id, tags, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            tags={tags}
            ImgUrl={webformatURL}
            largeImageURL={largeImageURL}
          />
        );
      })}
    </StyledList>
  );
};

ImageGallery.propTypes = {
  articlesHits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};

export default ImageGallery;
