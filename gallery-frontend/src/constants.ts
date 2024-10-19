import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const API_URL = 'http://localhost:8000';
export const GOOGLE_CLIENT_ID = '502498586430-f8mdljgbrhr87sd3kpgcg6vfj0136jm9.apps.googleusercontent.com';

export const StyledToolbarLink = styled(Link)({
  color: 'white',
  fontWeight: 'bold',
  textDecoration: 'none',
  '&hover': {
    color: 'inherit',
  },
});
