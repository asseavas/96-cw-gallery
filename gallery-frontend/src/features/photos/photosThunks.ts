import { createAsyncThunk } from '@reduxjs/toolkit';
import { Photo, PhotoMutation } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchPhotos = createAsyncThunk<Photo[], string | undefined>('photos/fetchAll', async (user) => {
  const { data: photos } = await axiosApi.get<Photo[]>('/photos', { params: { user: user } });
  return photos;
});

export const createPhoto = createAsyncThunk<void, PhotoMutation>('photos/create', async (photoMutation) => {
  const formData = new FormData();

  const keys = Object.keys(photoMutation) as (keyof PhotoMutation)[];
  keys.forEach((key) => {
    const value = photoMutation[key];
    if (value !== null) {
      formData.append(key, value);
    }
  });

  await axiosApi.post('/photos', formData);
});

export const deletePhoto = createAsyncThunk<void, string>('photos/delete', async (id) => {
  await axiosApi.delete(`/photos/${id}`);
});
