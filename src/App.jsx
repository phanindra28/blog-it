import './App.css'
import {routes} from "./routes/routes.jsx";
import {createBrowserRouter, RouterProvider} from "react-router";

function App() {
    const router = createBrowserRouter(routes);

    return <RouterProvider router={router} />;
}

export default App
