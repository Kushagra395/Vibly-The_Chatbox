//This is a zustand store which is a global state management system
//think of it like a big box where you can store data and access it from anywhere in your app
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io} from 'socket.io-client'

const Base_url = import.meta.env.MODE==='development'?"http://localhost:5001":"/";

//axios is a library that makes it easy to make HTTP requests in JavaScript
//it's like a messenger that goes to the backend server and says "hey can you do this for me?"
//axiosInstance is a special version of axios that we created in another file
//we configured it to make requests to our backend server (http://localhost:5001/api)
//so when we use axiosInstance, it will make requests to our backend server

export const UseAuthStore = create((set, get) => ({
  // ye function hi haar jagah call hoga
  authUser: null, //WE DONT KNOW USER IS AUTHENTICATED OR NOT
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true, //refresh karte hi checking chalu karega
  onlineUsers: [],
  socket: null,

  //in this file, we're using zustand to create a store that keeps track of some data
  //the data is:
  // - authUser: the user who is currently logged in (or null if no one is logged in)
  // - isSigningUp: a boolean that says whether we're currently signing up or not
  // - isLoggingIn: a boolean that says whether we're currently logging in or not
  // - isUpdatingProfile: a boolean that says whether we're currently updating our profile or not
  // - isCheckingAuth: a boolean that says whether we're currently checking if someone is logged in or not

  //the checkAuth function is called when we want to check if someone is logged in or not
  //it makes a GET request to the backend server to ask if someone is logged in
  //if someone is logged in, it sets the authUser to the user who is logged in
  //if no one is logged in, it sets the authUser to null
  //it also sets isCheckingAuth to false, which means we're done checking if someone is logged in or not
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/Check");
      console.log("res.data", res);
      set({ authUser: res.data, isCheckingAuth: false });
      get().connectSocket(res.data); // Pass the authUser object here
    } catch (error) {
      console.log("error in checkAuth", error);
      set({ authUser: undefined, isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    //will run when sign up button is clicked and state is loading
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
     get().connectSocket();
      toast.success("Signup successful");
      console.log("res.data", res);
      // navigate("/profile")
    } catch (error) {
      console.log("error in signup", error);
      toast.error("Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      console.log("res.data", res);
      set({ authUser: null });
      toast.success("Logout successful");
      
      // navigate("/login")
    } catch (error) {
      console.log("error in logout", error);
      toast.error("Logout failed");
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true }); //this is transition state ki jabtak logging hoga tho means yes true
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      get().connectSocket();
      toast.success("Login successful");
      console.log("res.data", res);
      // navigate("/profile")
    } catch (error) {
      console.log("error in login", error);
      toast.error("Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  updatingprofile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/updateProfile", data);
      set({ authUser: res.data });
      toast.success("profile uploaded");
    } catch (error) {
      console.error(error);
      toast.error("Error updating profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: (authUser) => {
    if(!authUser) return;
  
    const socket = io(Base_url, {
      query: {
        userId: authUser._id,
      },
    });
  
    socket.connect();
  
    set({ socket: socket });
  
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: (socket) => {
   set ({socket:socket})
   if(get().socket?.connected) get().socket.disconnect();
   get().socket.disconnect()
    
  },
}));
 
///in my language axios ka kaam hai ki backend sai communicate karna and haame pata hai http.localhost:50001/api itna tho same hi hoga so utna set karke rakha and waha sai data lena ho bhejna ho tho kar sakte hai
// and zustand is ek store rakha hai staatus ka ki loggin hai ki nhi checking kar raha hai ki nhi authicate ho gaya hai ki nhi in frontend

// //This is a zustand store which is a global state management system
// //think of it like a big box where you can store data and access it from anywhere in your app
// import {create} from 'zustand'
// import { axiosInstance } from '../lib/axios'

// //axios is a library that makes it easy to make HTTP requests in JavaScript
// //it's like a messenger that goes to the backend server and says "hey can you do this for me?"
// //axiosInstance is a special version of axios that we created in another file
// //we configured it to make requests to our backend server (http://localhost:5001/api)
// //so when we use axiosInstance, it will make requests to our backend server

// export const UseAuthStore = create(set => ({ // ye function hi haar jagah call hoga
//     authUser: null, //WE DONT KNOW USER IS AUTHENTICATED OR NOT
//     isSigningUp: false,
//     isLoggingIn: false,
//     isUpdatingProfile : false,
//     isCheckingAuth: true, //refresh karte hi checking chalu karega

// //in this file, we're using zustand to create a store that keeps track of some data
// //the data is:
// // - authUser: the user who is currently logged in (or null if no one is logged in)
// // - isSigningUp: a boolean that says whether we're currently signing up or not
// // - isLoggingIn: a boolean that says whether we're currently logging in or not
// // - isUpdatingProfile: a boolean that says whether we're currently updating our profile or not
// // - isCheckingAuth: a boolean that says whether we're currently checking if someone is logged in or not

// //the checkAuth function is called when we want to check if someone is logged in or not
// //it makes a GET request to the backend server to ask if someone is logged in
// //if someone is logged in, it sets the authUser to the user who is logged in
// //if no one is logged in, it sets the authUser to null
// //it also sets isCheckingAuth to false, which means we're done checking if someone is logged in or not
//     checkAuth : async () => {
//          try {
//              const  token = document.cookie
//              .split(';')
//              .find((cookie) => cookie.startsWith('token='))
//              ?.split('=')[1];

//             const res = await fetch(`http://localhost:5001/api/auth/Check`, {
//                 method: "GET",
//                 credentials: "include",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 }
//             });
//             console.log("res.data", res)
//             set({authUser: res.data, isCheckingAuth: false})
//             console.log("authUser", authUser);

//         } catch (error) {
//             console.log("error in checkAuth", error)
//             set ({authUser: undefined , isCheckingAuth: false})
//         }

//     }
// }))
