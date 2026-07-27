import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, API_BASE } from "../services/authService";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(form);

      toast.success("Account created successfully!");

      navigate("/login");
   } catch (error) {
  console.log(error.response?.data);
  console.log(error);

  // show inline error and toast
  const msg = error.response?.data?.message || error.message;
  setLastError(msg);
  toast.error(msg);
}
};

  const [lastError, setLastError] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF9F6] px-6">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-pink-500 mb-8">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3 outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3 outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl"
          >
            Register
          </button>

        </form>

        {/* Debug info for mobile troubleshooting */}
        <div className="mt-4 text-xs text-gray-500">
          <div>API base: <span className="font-mono">{API_BASE}</span></div>
          {lastError && (
            <div className="mt-2 text-red-600">Last error: {lastError}</div>
          )}
        </div>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-500 font-semibold"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;