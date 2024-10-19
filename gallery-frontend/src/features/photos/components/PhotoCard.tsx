import React from 'react';
import { Photo } from '../../../types';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { API_URL, CardItem, style } from '../../../constants';
import { Box, Button, CardMedia, Grid2, Modal, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

interface Props {
  photo: Photo;
  isDeleting?: boolean;
  onDelete?: VoidFunction;
  onClick: VoidFunction;
  onClose: VoidFunction;
  open: boolean;
}

const PhotoCard: React.FC<Props> = ({ photo, isDeleting, onDelete, onClick, onClose, open }) => {
  const user = useAppSelector(selectUser);
  const location = useLocation();
  const showToUser = location.pathname === `/photos/${photo.user._id}`;

  let cardImage = '';

  if (photo.image) {
    cardImage = `${API_URL}/${photo.image}`;
  }

  return (
    <CardItem
      sx={{
        width: '23%',
        height: '340px',
      }}
    >
      <Grid2 container direction="column" spacing={2} onClick={onClick}>
        <Grid2
          component={CardMedia}
          image={cardImage}
          sx={{
            width: '100%',
            height: '250px',
            borderRadius: '15px',
            borderBottomLeftRadius: '0',
            borderBottomRightRadius: '0',
          }}
        />
        <Grid2 component={Typography} variant="h6" sx={{ mb: '5px', textAlign: 'center' }}>
          {photo.title}
        </Grid2>
      </Grid2>
      <Grid2 container direction="column">
        <Grid2
          component={Link}
          to={`/photos/${photo.user._id}`}
          sx={{
            color: 'black',
            mb: 1,
            textAlign: 'center',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {photo.user.displayName}
        </Grid2>
        {user?.role === 'admin' ||
          (user?._id === photo.user._id && showToUser && (
            <Grid2
              mt={2}
              component={LoadingButton}
              loading={isDeleting}
              color="error"
              variant="contained"
              onClick={onDelete}
              sx={{ width: '100%', height: '30px' }}
            >
              Delete
            </Grid2>
          ))}
      </Grid2>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Box
            sx={{
              width: '100%',
              height: '90%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundImage: `url(${cardImage})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
          <Button onClick={onClose} sx={{ marginInline: '46%', mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </CardItem>
  );
};

export default PhotoCard;
