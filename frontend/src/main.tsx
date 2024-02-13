import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { GenerateImages } from './pages/GenerateImages/GenerateImages.tsx';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';

const queryClient = new QueryClient();
const router = createBrowserRouter([
    {
      path: "/",
      element: <GenerateImages />,
    },
  ]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
            maxSnack={1}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
            >
        <StyledEngineProvider injectFirst>
          <CssBaseline />
          <RouterProvider router={router} />
        </StyledEngineProvider>
      </SnackbarProvider>
    </QueryClientProvider>

)
