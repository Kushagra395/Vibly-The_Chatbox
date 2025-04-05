 
// We import the axios library which is a popular way to make HTTP requests in JavaScript.
// We create an instance of axios and configure it to make requests to our backend server (http://localhost:5001/api).
// We set withCredentials to true, which means that when we make a request, we will also send any cookies that are stored in the browser.
// This is useful for authentication, because it allows our backend server to identify the user making the request.
// Axios is a library that makes it easy to make HTTP requests in JavaScript. It provides a simple way to send requests to a server and get responses back.
// We use axios to make requests to our backend server to get data, post data, delete data, etc.
import axios from 'axios';

export const  axiosInstance = axios.create({
    baseURL: import.meta.env.MODE==='development' ? 'http://localhost:5001/api':"/api",
    withCredentials: true, // send cookies true
});
 

//now can use axiousInstance to make request to backend server in anywhere