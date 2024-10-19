import { Box, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <Box>
      <Button component={NavLink} to="/register" color="inherit" sx={{ marginRight: '15px' }}>
        Sign up
      </Button>
      <Button component={NavLink} to="/login" color="inherit">
        Sign in
      </Button>
    </Box>
  );
};

export default AnonymousMenu;
