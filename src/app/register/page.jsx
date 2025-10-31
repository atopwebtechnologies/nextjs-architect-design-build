"use client";
import { registerAction } from "@/actions/register-action";
import { useAuth } from "@/context/AuthProvider";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Function to validate the input fields
  const validate = (data) => {
    let errors = {};

    if (!data.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!data.surname.trim()) {
      errors.surname = "Last name is required";
    }

    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    return errors;
  };

  // Function to submit the form
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    //Create an array of validationErrors object and then check if the length is 0, so that your form data can be submitted and send to the database
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);

      // Here, you would typically make an API call in a try-catch block and handle the response accordingly.

      // But for now I will simulate the submission with a set time out to delay the submission
      setTimeout(() => {
        setIsSubmitting(false);
        registerAction(formData);
        setIsAuthenticated(true);
        router.replace("/dashboard");
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen max-w-[1440px mx-auto bg-black relative overflow-hidden ">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/signup-bg.png"
          alt="background image"
          fill
          className="object-fit max-lg:object-cover"
        />
      </div>
      <div className="p-4 md:p-8">
        <h1 className="relative text-white text-[20px] font-extrabold">
          ATOPBANK
        </h1>
      </div>

      <div className="relative w-full z-10 pr-20 max-lg:pr-0 max-lg:my-8">
        {/* Register Form Container */}
        <div className="ml-auto max-lg:mx-auto max-w-sm sm:max-w-md p-6 md:p-8 bg-[#1D1D1D47] max-md:bg-[#00000047] rounded-[10px] backdrop-blur-xl max-md:backdrop-blur-2xl border border-[#FFFFFF1F] space-y-[47px]">
          <h2 className="text-white text-2xl font-medium">Create an account</h2>
          <form
            onSubmit={handleSubmit}
            aria-label="Registration form"
            className="space-y-7"
          >
            {/* First Name */}
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                aria-label="First Name"
                className="w-full px-[20px] py-[17px] h-[54px] bg-transparent border border-white/15 rounded-[10px] text-white placeholder-white/60 placeholder:text-[16px] placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs pl-1 pt-1 absolute">
                  {errors.firstName}
                </p>
              )}
            </div>

            {/* Surname */}
            <div>
              <input
                type="text"
                name="surname"
                placeholder="Surname"
                value={formData.surname}
                onChange={handleInputChange}
                aria-label="Family Name"
                className="w-full px-[20px] py-[17px] h-[54px] bg-transparent border border-white/15 rounded-[10px] text-white placeholder-white/60 placeholder:text-[16px] placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
              {errors.surname && (
                <p className="text-red-500 text-xs pl-1 pt-1 absolute">
                  {errors.surname}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                aria-label="password"
                className="w-full px-[20px] py-[17px] h-[54px] bg-transparent border border-white/15 rounded-[10px] text-white placeholder-white/60 placeholder:text-[16px] placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
              {errors.password && (
                <p className="text-red-500 text-xs pl-1 pt-1 absolute">
                  {errors.password}
                </p>
              )}
              <span className="absolute right-4 top-4 text-[#9F9F9FF0]">
                {showPassword ? (
                  <EyeOff
                    className=" cursor-pointer h-[22.5px] w-[15px]"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <Eye
                    className=" cursor-pointer h-[22.5px] w-[15px]"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-[54px] bg-[#943FC3] hover:bg-[#943FC3]/80 ease-in-out transition-all duration-200 text-white/91 font-semibold py-[15px] rounded-full border-r border-t border-white/80 hover:border-white/50 hover:scale-105 flex items-center justify-center group"
            >
              {isSubmitting ? (
                <p className="text-[16px] font-medium">Loading...</p>
              ) : (
                <>
                  <p className="text-[16px] font-medium">Create Account</p>
                  <svg
                    className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-white/70 text-[16px] font-medium">
            Already have an account?{" "}
            <Link
              href="/"
              aria-label="Login to your account"
              className="text-[#A6CEFF] underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
