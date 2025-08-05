import AuthProvider from "./auth/AuthProvider";
import ProfileProvider from "./profile/ProfileProvider";
import ThemeProvider from "./theme/ThemeProvider";
import { PrimeReactProvider } from "primereact/api";
import { ToastProvider } from "./toast/ToastProvider";
import { LoadingProvider } from "./loading/LoadingProvider";

const UseProviders = ({ children }) => {
  return (
    <PrimeReactProvider>
      <ThemeProvider>
        <LoadingProvider>
          <ToastProvider>
            <AuthProvider>
              <ProfileProvider>{children}</ProfileProvider>
            </AuthProvider>
          </ToastProvider>
        </LoadingProvider>
      </ThemeProvider>
    </PrimeReactProvider>
  );
};

export default UseProviders;
