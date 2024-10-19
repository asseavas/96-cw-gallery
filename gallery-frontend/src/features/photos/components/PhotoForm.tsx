import React, { useState } from 'react';
import { PhotoMutation } from '../../../types';
import { FormHelperText, Grid2, TextField } from '@mui/material';
import FileInput from '../../../UI/FileInput/FileInput';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

interface Props {
  onSubmit: (photo: PhotoMutation) => void;
  isLoading: boolean;
}

const PhotoForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<PhotoMutation>({
    title: '',
    image: null,
  });

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!state.title.trim()) {
      setError('Title cannot be empty or just whitespace.');
      return;
    }

    if (!state.image) {
      setError('Image is required.');
      return;
    }

    setError(null);
    onSubmit({ ...state });
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Grid2
      container
      spacing={2}
      component="form"
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      onSubmit={submitFormHandler}
    >
      <Grid2 width="100%">
        <TextField
          required
          label="Title"
          id="title"
          name="title"
          value={state.title}
          onChange={inputChangeHandler}
          error={!!error}
          helperText={error}
        />
      </Grid2>
      <Grid2 width="100%">
        <FileInput label="Image" name="image" onChange={fileInputChangeHandler} />
        {error && !state.image && <FormHelperText error>{error}</FormHelperText>}
      </Grid2>
      <Grid2 width="100%">
        <LoadingButton
          sx={{
            width: '100%',
            height: '45px',
            backgroundColor: error ? 'red' : 'primary.main',
            '&:hover': {
              backgroundColor: error ? 'darkred' : 'primary.dark',
            },
          }}
          type="submit"
          loading={isLoading}
          startIcon={<SaveIcon />}
          variant="contained"
        >
          Add
        </LoadingButton>
      </Grid2>
    </Grid2>
  );
};

export default PhotoForm;
