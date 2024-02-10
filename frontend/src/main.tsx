import ReactDOM from 'react-dom/client'
import './index.css'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { GenerateImages } from './pages/GenerateImages/GenerateImages.tsx';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// const queryClient = new QueryClient();
const router = createBrowserRouter([
    {
      path: "/",
      element: <GenerateImages />,
    },
  ]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <QueryClientProvider client={queryClient}>
        <StyledEngineProvider injectFirst>
            <CssBaseline />
            <RouterProvider router={router} />
        </StyledEngineProvider>
    // </QueryClientProvider>

)
