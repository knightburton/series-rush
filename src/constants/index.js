import CONFIG from './config';
import FORM from './form';
import MENU from './menu';

export default {
  MENU,
  ...FORM,
  ...CONFIG,
};
