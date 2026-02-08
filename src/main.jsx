import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App.jsx";
import toast, { Toaster } from "react-hot-toast";
import AuthContextProvider from "./context/auth.context.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchInterval:500,
      refetchOnMount:false,
    }
  }
});
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient} >
    <ReactQueryDevtools initialIsOpen={false} />
    <AuthContextProvider>
      <StrictMode>
        <App />
        <Toaster />
      </StrictMode>
    </AuthContextProvider>
  </QueryClientProvider>,
);
