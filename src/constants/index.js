import CONFIG from './config';
import FORM from './form';
import NAVIGATION from './navigation';
import PATHS from './paths';

export default {
  ...FORM,
  ...CONFIG,
  ...NAVIGATION,
  ...PATHS,
};
