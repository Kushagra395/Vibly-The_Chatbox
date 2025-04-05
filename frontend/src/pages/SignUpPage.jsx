import React from 'react'
import { useState } from 'react'
import { UseAuthStore } from '../Store/UseAuthStore(zustand)'
import { Eye, EyeOff, Loader2, Lock, Mail, MailCheck, MessageCircleDashed, MessageCircleMoreIcon, MessageSquare, MessageSquareCodeIcon, User, User2, UserCircle2 } from "lucide-react";
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
     fullname: '',
    email: '',
    password: '',
  })
  const {signup,isSigningUp} = UseAuthStore() // issigningup is a boolean that says whether we're currently signing up or not and signup is function which run during the state is loading
  const validateForm = () => { // it will check is all data is wriiten in form or not
    if (!formData.fullname.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;

  };
  const handleSubmit = (e) => {
    e.preventDefault(); // it will prevent the default action of the form means it will not refresh the page
    const sucess = validateForm();
    if (sucess===true) {
      signup(formData);
    }
  }
  
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
     

      {/* right side */}
 
      <AuthImagePattern
        title="Your Community, Your Vibely !"
        subtitle="Chat. Connect. Vibe."
      /> 

        {/* left side */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
            {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageCircleDashed className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create New Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
  <div className="form-control">
    <label className="label">
      <span className="label-text font-medium">User Name</span>
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <UserCircle2 className="size-5  z-25 text-base-content/40" /> // user icon
      </div>
      <input
        type="text"
        className={`input input-bordered w-full pl-10`}
        placeholder="Night Owl"
        value={formData.fullname}
      />
    </div>
    <p className=" text-red-500 text-xs text-base-content/60 mt-2 ml-1">  * Don't use your real name</p>
  </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5  z-20 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 z-20 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••" //
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;