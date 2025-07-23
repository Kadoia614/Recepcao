import AuthProvider from "./auth/AuthProvider";
import ProfileProvider from "./profile/ProfileProvider";
import ThemeProvider from "./theme/ThemeProvider";
import { PrimeReactProvider } from "primereact/api";
import { ToastProvider } from "./toast/ToastProvider";

const UseProviders = ({ children }) => {
  return (
    <PrimeReactProvider>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <ProfileProvider>{children}</ProfileProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </PrimeReactProvider>
  );
};

export default UseProviders;
