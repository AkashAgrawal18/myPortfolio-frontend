import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout, EditProfile, Login } from './Components/index.js'
import 'bootstrap/dist/css/bootstrap.css';
import './assets/style.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Signup from './pages/Signup'
import Resume from './pages/Resume.jsx'
import Project from './pages/Project.jsx'
import Education from './pages/Education.jsx'
import Experience from './pages/Experience.jsx'
import PortFollioSite from './pages/PortFollioSite.jsx'
// import EditPost from "./pages/EditPost";

// import Post from "./pages/Post";

// import AllPosts from "./pages/AllPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
      
        {
            path: "/edit-profile",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditProfile />
                </AuthLayout>
            ),
        },
        {
            path: "/education",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Education />
                </AuthLayout>
            ),
        },
        {
            path: "/experience",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Experience />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-experience/:experienceId",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Experience />
                </AuthLayout>
            ),
        },
        {
            path: "/project",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Project />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-project/:ProjectId",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Project />
                </AuthLayout>
            ),
        },
        {
            path: "/resume",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Resume />
                </AuthLayout>
            ),
        },
        // {
        //     path: "/user-profile/:userName",
        //     element: (
        //         <AuthLayout authentication>
        //             {" "}
        //             <Resume />
        //         </AuthLayout>
        //     ),
        // },
      
    ],
},{
    path: "/user-profile/:userName",
    element: (
        // <AuthLayout authentication={false}>
        //     {" "}
            <PortFollioSite />
        // </AuthLayout>
    ),
}, 
{
   path: "/user-resume/:userName",
   element: (
    //    <AuthLayout authentication={false}>
        //    {" "}
           <Resume />
    //    </AuthLayout>
   ),
}
])

ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
//    </React.StrictMode>,
)