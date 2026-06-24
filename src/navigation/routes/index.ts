import MainRoutes from './MainRoutes';

import Login from './Login';

import Dashboard from './Dashboard';

import AuthorList from './AuthorList';

import BookForm from './BookForm';

import AuthorForm from './AuthorForm';

import BookDetails from './BookDetails';

import AuthorDetails from './AuthorDetails';

import SignUp from './SignUp';

export default {
  ...MainRoutes,

  ...Login,

  ...Dashboard,

  ...AuthorList,

  ...BookForm,

  ...AuthorForm,

  ...BookDetails,

  ...AuthorDetails,

  ...SignUp,
};
