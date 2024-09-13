import './App.scss';
import { Grid } from '@mui/material'

//components
import AppRoutes from './views/routing/appRoutes';

function App() {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12}>
        <AppRoutes />
      </Grid>
    </Grid>
  );
}

export default App;
