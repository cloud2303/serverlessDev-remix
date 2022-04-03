import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation
} from "@remix-run/react";
import type {LinksFunction, MetaFunction} from '@remix-run/node'
import { AnimatePresence, motion } from "framer-motion";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};
import defaultStyle from './styles/root.css';
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: defaultStyle }];
};
export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
      <header>
          <nav className="headers">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/new">About</NavLink>
            <NavLink to="/test">Blogs</NavLink>
          </nav>
        </header>
      <AnimatePresence exitBeforeEnter initial={false}>
      <motion.main
            key={useLocation().key}
            initial={{ x: "10%", opacity: 0 }}
            animate={{ x: "0", opacity: 1 }}
            exit={{ x: "-40%", opacity: 0 }}
          >
           <Outlet/>
          </motion.main>
        </AnimatePresence>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
