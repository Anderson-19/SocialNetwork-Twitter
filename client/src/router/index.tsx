import { createBrowserRouter } from "react-router-dom";
import { Login, Register } from "../auth/index";
import { App } from "../App";
import { Home, Likes, Profile } from "../Home";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/home',
                element: <Home />
            },
            /* {
                path: '/notifications',
                element: <Notifications />
            },
            {
                path: '/bookmarks',
                element: <Bookmarks />
            },
            {
                path: '/messages',
                element: <Messages />
            }, */
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/likes',
                element: <Likes />
            }
        ]
    }
])