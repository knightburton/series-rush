import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/AddCircleOutline';
import RightIcon from '@material-ui/icons/KeyboardArrowRightOutlined';

import { getEllipsisText } from '../../../../utils';
import { SEARCH_TYPES, ELLIPSIS_LENGTHS } from '../../../../constants/config';

import useStyles from './search-results.styles';

const SearchResults = ({ results }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      {results.map(result => (
        <Grid key={result.id} item xs={12} md={6}>
          {result.type === SEARCH_TYPES.TV && (
            <Card className={classes.card}>
              <img
                src={result.posterPath}
                alt={result.name}
                draggable={false}
              />
              <Box className={classes.container}>
                <CardHeader
                  title={result.name}
                  subheader={result.premiere}
                />
                <CardContent className={classes.content}>
                  <Typography variant="body2" component="p">
                    {getEllipsisText(result.overview, ELLIPSIS_LENGTHS.XS)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                  <Box className={classes.grow} />
                  <IconButton>
                    <RightIcon />
                  </IconButton>
                </CardActions>
              </Box>
            </Card>
          )}
        </Grid>
      ))}
    </Grid>
  );
};

SearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    name: PropTypes.string,
    premiere: PropTypes.string,
    poster: PropTypes.string,
    overview: PropTypes.string,
    vote: PropTypes.number,
  })).isRequired,
};

export default SearchResults;
