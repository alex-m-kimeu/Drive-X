import { SignIn } from "./pages/SignIn/SignIn";
import { SignUp } from "./pages/SignUp/SignUp";
import { Home } from "./pages/Home/Home";
import { Fleet } from "./pages/Fleet/Fleet";
import { About } from "./pages/About/About";
import { Contact } from "./pages/Contact/Contact";
import { Faq } from "./pages/FAQ/Faq";

const routes = [
    {
        path: "/signin",
        Element: SignIn,
        isAuthenticated: false,
        layout: "None",
    },
    {
        path: "/signup",
        Element: SignUp,
        isAuthenticated: false,
        layout: "None",
    },
    {
        path: "/",
        Element: Home,
        isAuthenticated: true,
        layout: "Main",
    },
    {
        path: "/fleet",
        Element: Fleet,
        isAuthenticated: true,
        layout: "Main",
    },
    {
        path: "/about",
        Element: About,
        isAuthenticated: true,
        layout: "Main",
    },
    {
        path: "/contact",
        Element: Contact,
        isAuthenticated: true,
        layout: "Main",
    },
    {
        path: "/faq",
        Element: Faq,
        isAuthenticated: true,
        layout: "Main",
    },
];

export default routes;