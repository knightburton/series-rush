import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Avatar from '@material-ui/core/Avatar';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import ProfileContext from '../../../contexts/profile';

import useStyles from './profile-photo.styles';

const ProfilePhoto = ({ alt, size, withGutter, withDisabledColor }) => {
  const classes = useStyles();
  const { photoURL } = useContext(ProfileContext);

  return (photoURL ? (
    <Avatar
      alt={alt}
      src={photoURL}
      imgProps={{ draggable: false }}
      className={clsx(
        { [classes[size]]: size },
        classes.border
      )}
    />
  ) : (
    <AccountCircleIcon
      className={clsx({
        [classes[size]]: size,
        [classes.margin]: withGutter,
      })}
      color={withDisabledColor ? 'disabled' : 'inherit'}
    />
  ));
};

ProfilePhoto.propTypes = {
  alt: PropTypes.string,
  size: PropTypes.oneOf(['extraSmall', 'small', 'medium', 'large', 'extraLarge', 'huge']),
  withGutter: PropTypes.bool,
  withDisabledColor: PropTypes.bool,
};

ProfilePhoto.defaultProps = {
  alt: 'Profile avatar',
  size: 'medium',
  withGutter: false,
  withDisabledColor: false,
};

export default ProfilePhoto;
