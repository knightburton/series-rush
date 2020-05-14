import { makeStyles } from '@material-ui/core/styles';

const ALIGNS = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  space: 'space-between',
};

const getAligns = (variant, align) => {
  if (variant === 'vertical') return { alignItems: ALIGNS[align] };
  return { justifyContent: ALIGNS[align] };
};

export default makeStyles(theme => ({
  container: ({ variant, align }) => ({
    display: 'flex',
    ...getAligns(variant, align),
    margin: theme.spacing(3, 0, 2),
    ...variant === 'vertical' ? {
      flexDirection: 'column',
      '& button:not(:last-child)': {
        marginBottom: theme.spacing(2),
      },
    } : {
      flexDirection: 'row',
      '& button:not(:last-child)': {
        marginRight: theme.spacing(1),
      },
    },
  }),
}));
