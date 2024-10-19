import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toast } from 'react-toastify';
import { PhotoMutation } from '../../types';
import { Container, Grid2, Typography } from '@mui/material';
import PhotoForm from './components/PhotoForm';
import { createPhoto } from './photosThunks';
import { selectPhotoCreating } from './photosSlice';

const NewPhoto = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectPhotoCreating);

  const onFormSubmit = async (photoMutation: PhotoMutation) => {
    try {
      await dispatch(createPhoto(photoMutation));
      navigate('/');
      toast.success('New photo created');
    } catch (error) {
      toast.error('No new photo created');
    }
  };

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          background: 'rgb(255,255,255)',
          borderRadius: 4,
          padding: '30px',
        }}
      >
        <Grid2 container direction="column">
          <Grid2>
            <Typography variant="h4" mb={4} fontWeight="bold">
              New photo
            </Typography>
          </Grid2>
          <Grid2 justifyContent="space-between">
            <PhotoForm onSubmit={onFormSubmit} isLoading={isCreating} />
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
};

export default NewPhoto;
