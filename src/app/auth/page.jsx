"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PuffLoader } from "react-spinners";
import { useAuth } from "../context/authContext"; // Import the context to access login
import { loginUser } from "../context/authAction"; // Import the login action
import Cookies from "js-cookie"; // Ensure this import is present at the top

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuth(); // Access the dispatch function from context
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!username || !password) {
      return alert("Please fill in both fields.");
    }

    setIsLoading(true);

    try {
      // Call loginUser with dispatch, credentials, and router
      await loginUser(dispatch, { username, password }, router);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* username Input */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-poppins-medium text-gray-700"
            >
              username Address
            </label>
            <input
              type="username"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
              placeholder="Enter your username"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-poppins-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
              placeholder="Enter your password"
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="w-4 h-4 text-gray-600 rounded border-gray-300 focus:ring-2 focus:ring-gray-400"
            />
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-poppins-normal text-gray-700"
            >
              Remember Me
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 px-4 rounded-md shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              disabled={isLoading}
            >
              {isLoading ? (
                <PuffLoader color="#ffffff" loading={isLoading} size={20} />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>

        {/* Forgot Password Link */}
        <div className="text-center mt-4">
          <a
            href="#"
            className="text-sm font-poppins text-gray-600 hover:text-gray-500"
          >
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
}
