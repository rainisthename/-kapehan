"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";  // Import the router to navigate programmatically
import { PuffLoader } from "react-spinners";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();  // Create a router instance

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }

    setIsLoading(true);

    // Simulate an API request (this should be replaced by real API logic)
    try {
      // Wait for the simulated API request (replace with real login logic)
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay

      // After success, redirect to the dashboard
      router.push("/auth/dashboard");
    } catch (error) {
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-poppins-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-poppins-medium text-gray-700">
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
            <label htmlFor="remember" className="ml-2 text-sm font-poppins-normal text-gray-700">
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
          <a href="#" className="text-sm font-poppins text-gray-600 hover:text-gray-500">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
}
