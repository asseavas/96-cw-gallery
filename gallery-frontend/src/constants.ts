import { Box, Grid2, styled } from '@mui/material';
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

export const ContentContainer = styled(Grid2)({
  borderRadius: '10px',
  paddingTop: 2,
  paddingBottom: '32px',
  marginBottom: '30px',
  paddingInline: '25px',
});

export const CardItem = styled(Box)({
  paddingBottom: '15px',
  backgroundColor: 'white',
  borderRadius: '15px',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    boxShadow: '0px 0px 8px 10px rgba(0, 0, 0, 0.03)',
  },
  cursor: 'pointer',
});

export const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1100,
  height: 'auto',
  backgroundColor: 'white',
  boxShadow: 24,
  borderRadius: '15px',
  paddingBottom: 2,
};
