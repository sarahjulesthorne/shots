import util from '../../helpers/utils';

const movieBtnListener = () => {
  const movieButtons = Array.from(document.getElementsByClassName('movie-btn'));
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
