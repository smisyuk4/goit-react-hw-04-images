import PropTypes from 'prop-types';
import { Formik, ErrorMessage } from 'formik';
import { IconContext } from 'react-icons';
import { GiArchiveResearch } from 'react-icons/gi';
import * as Yup from 'yup';

import {
  Container,
  Header,
  FormWrp,
  InputWrp,
  ErrorMsg,
  ButtonSearch,
} from './SearchBar.styled';

const SearchSchema = Yup.object().shape({
  search: Yup.string()
    .trim()
    .min(2, 'Need more than 2 characters!')
    .max(10, 'Less than 10 characters required!'),
});

export const SearchBar = ({ handleSubmit }) => {
  const searchQuery = (values, { resetForm }) => {
    handleSubmit(values);
    resetForm({ values: '' });
  };

  return (
    <Header>
      <Container>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={searchQuery}
          validationSchema={SearchSchema}
        >
          {({ dirty, isValid }) => (
            <FormWrp>
              <InputWrp
                name="search"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
              />
              <ErrorMessage name="search" component={ErrorMsg} />
              <ButtonSearch type="submit" disabled={!(isValid && dirty)}>
                <IconContext.Provider
                  value={{
                    size: '30px',
                  }}
                >
                  <GiArchiveResearch />
                </IconContext.Provider>
              </ButtonSearch>
            </FormWrp>
          )}
        </Formik>
      </Container>
    </Header>
  );
};

SearchBar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
