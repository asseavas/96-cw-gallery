import { createSlice } from '@reduxjs/toolkit';
import { Photo } from '../../types';
import { createPhoto, deletePhoto, fetchPhotos } from './photosThunks';

export interface PhotosState {
  items: Photo[];
  itemsFetching: boolean;
  isCreating: boolean;
  deletingPhotoId: string | null;
  isDeleting: boolean;
}

const initialState: PhotosState = {
  items: [],
  itemsFetching: false,
  isCreating: false,
  deletingPhotoId: null,
  isDeleting: false,
};

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.itemsFetching = true;
      })
      .addCase(fetchPhotos.fulfilled, (state, { payload: photos }) => {
        state.itemsFetching = false;
        state.items = photos;
      })
      .addCase(fetchPhotos.rejected, (state) => {
        state.itemsFetching = false;
      });

    builder
      .addCase(createPhoto.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createPhoto.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createPhoto.rejected, (state) => {
        state.isCreating = false;
      });

    builder
      .addCase(deletePhoto.pending, (state, action) => {
        state.deletingPhotoId = action.meta.arg;
        state.isDeleting = true;
      })
      .addCase(deletePhoto.fulfilled, (state) => {
        state.deletingPhotoId = null;
        state.isDeleting = false;
      })
      .addCase(deletePhoto.rejected, (state) => {
        state.isDeleting = false;
      });
  },
  selectors: {
    selectPhotos: (state) => state.items,
    selectPhotosFetching: (state) => state.itemsFetching,
    selectPhotoCreating: (state) => state.isCreating,
    selectPhotoDeleting: (state) => state.isDeleting,
  },
});

export const photosReducer = photosSlice.reducer;

export const { selectPhotos, selectPhotosFetching, selectPhotoCreating, selectPhotoDeleting } = photosSlice.selectors;
