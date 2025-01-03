// src/app/auth/layout.js
import { AuthProvider } from '../context/authContext'; // Adjust the import based on your actual folder structure

export default function AuthLayout({ children }) {
  return (
    <AuthProvider>
      {/* You can include additional UI elements here like a header or background */}
      <div className="auth-layout">
        {children}
      </div>
    </AuthProvider>
  );
}
