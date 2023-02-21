import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import routes from "./config/routes.ts";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                {
                    routes.map((route) => {
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<route.component/>}
                            />
                        )
                    })
                }
            </Routes>
        </BrowserRouter>
    );
}

export default App;
