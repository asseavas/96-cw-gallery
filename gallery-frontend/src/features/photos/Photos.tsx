import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toast } from 'react-toastify';
import { CircularProgress, Grid2, Typography } from '@mui/material';
import { ContentContainer } from '../../constants';
import { selectPhotoDeleting, selectPhotos, selectPhotosFetching } from './photosSlice';
import { deletePhoto, fetchPhotos } from './photosThunks';
import PhotoCard from './components/PhotoCard';
import { useParams } from 'react-router-dom';
import { Photo } from '../../types';

const Photos = () => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectPhotos);
  const isFetching = useAppSelector(selectPhotosFetching);
  const isDeleting = useAppSelector(selectPhotoDeleting);
  const { user } = useParams();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handleOpen = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleClose = () => {
    setSelectedPhoto(null);
  };

  const pageTitle = useMemo(() => {
    if (!user) {
      return 'Gallery';
    }

    const userName = photos.find((photo) => photo.user._id === user);

    if (!userName) {
      return '...';
    }

    return `${userName.user.displayName}'s gallery`;
  }, [photos, user]);

  const handleDeletePhoto = async (id: string) => {
    try {
      if (window.confirm('Are you sure you want to delete this photo?')) {
        await dispatch(deletePhoto(id)).unwrap();
        await dispatch(fetchPhotos());
        toast.success('Photo has been deleted!');
      }
    } catch (error) {
      toast.error('Photo has not been deleted!');
    }
  };

  let content: React.ReactNode = (
    <Grid2 container>
      <Grid2
        component={Typography}
        variant="body1"
        color="text.secondary"
        sx={{ marginInline: 'auto', marginTop: '10%' }}
      >
        There are no photos here!
      </Grid2>
    </Grid2>
  );

  if (isFetching) {
    content = (
      <Grid2 sx={{ marginInline: 'auto', marginTop: '10%' }}>
        <CircularProgress />
      </Grid2>
    );
  } else if (photos.length > 0) {
    content = photos.map((photo) => (
      <PhotoCard
        key={photo._id}
        photo={photo}
        isDeleting={isDeleting}
        onDelete={() => handleDeletePhoto(photo._id)}
        onClick={() => handleOpen(photo)}
        onClose={handleClose}
        open={selectedPhoto?._id === photo._id}
      />
    ));
  }

  useEffect(() => {
    dispatch(fetchPhotos(user));
  }, [dispatch, user]);

  return (
    <ContentContainer container direction="column" spacing={3}>
      <Grid2>
        <Typography variant="h4">{pageTitle}</Typography>
      </Grid2>
      <Grid2 container>{content}</Grid2>
    </ContentContainer>
  );
};

export default Photos;
