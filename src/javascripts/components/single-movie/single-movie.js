import util from '../../helpers/utils';

const movieButtons = Array.from(document.getElementsByClassName('movie-btn'));

const movieBtnListener = () => {
  movieButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      util.printToDom('app', e.target.id);
    });
  });
};

export default {
  movieBtnListener,
};
