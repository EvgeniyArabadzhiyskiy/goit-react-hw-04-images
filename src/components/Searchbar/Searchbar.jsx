import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { BiSearchAlt } from 'react-icons/bi';

import Box from 'components/Box/Box';
import { Searchbars, SearchButton, SearchInput } from './Searchbar.styled';


const Searchbar = ({ onSearhFormSubmit }) => {
  const { register, handleSubmit } = useForm();

  const formSubmit = (data, evt) => {
    const query = data.query.toLowerCase().trim();

    if (!query) {
      toast.error('Enter a search term');
      return;
    }
    onSearhFormSubmit(query);
  };

  return (
    <Searchbars>
      <Box
        bg="white"
        display="flex"
        alignItems="center"
        width="100%"
        maxWidth="600px"
        borderRadius="normal"
        overflow="hidden"
        as="form"
        onSubmit={handleSubmit(formSubmit)}
      >
        <SearchButton type="submit">
          <BiSearchAlt size={24} />
        </SearchButton>

        <SearchInput
          type="text"
          {...register('query')}
          autoFocus
          autoComplete="off"
          placeholder="Search images and photos"
        />
      </Box>
    </Searchbars>
  );
};

Searchbar.propTypes = {
  onSearhFormSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
