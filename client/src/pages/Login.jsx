import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
import toast from "react-hot-toast";


import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
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
    const res = await loginUser(form);

    console.log("Axios Response:", res);
    console.log("Response Data:", res.data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data));

    console.log("Saved user:", localStorage.getItem("user"));

    toast.success("Welcome Back!");

    navigate("/");

  } catch (err) {
    console.log(err);

    toast.error(
      err.response?.data?.message || "Login Failed"
    );
  }
};

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-6 py-10">

      <div className="max-w-6xl w-full bg-white rounded-[40px] shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* LEFT */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-pink-200 via-pink-100 to-green-100 p-12">

          <h1 className="text-5xl font-bold leading-tight">

            Welcome
            <br />
            Back 🌸

          </h1>

          <p className="mt-6 text-lg text-gray-700">

            Continue writing your stories,
            sharing your knowledge,
            and inspiring thousands.

          </p>

          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"
            alt=""
            className="rounded-3xl mt-10 h-72 object-cover"
          />

        </div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-10 lg:p-14"
        >

          <h2 className="text-4xl font-bold">

            Login

          </h2>

          <p className="text-gray-500 mt-2">

            Continue your JournalX journey.

          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >

            {/* Email */}

            <div>

              <label>Email</label>

              <div className="mt-2 flex items-center border rounded-2xl px-4">

                <FiMail className="text-gray-400"/>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full p-4 outline-none"
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label>Password</label>

              <div className="mt-2 flex items-center border rounded-2xl px-4">

                <FiLock className="text-gray-400"/>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter password"
                  className="w-full p-4 outline-none"
                  onChange={handleChange}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword
                    ? <FiEyeOff/>
                    : <FiEye/>}
                </button>

              </div>

            </div>

            <button
  type="submit"
  className="w-full bg-pink-500 text-white py-3 rounded-xl"
>
  Login
</button>

          </form>

          <p className="text-center mt-8">

            Don't have an account?

            <Link
              to="/register"
              className="text-pink-500 ml-2"
            >
              Register
            </Link>

          </p>

        </motion.div>

      </div>

    </div>
  );
}

export default Login;