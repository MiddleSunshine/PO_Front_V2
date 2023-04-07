import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import routes from "./config/routes.ts";
import "./App.css";

function App() {

    return (
        <div className={"PO"}>
            <BrowserRouter>
                <Routes>
                    {
                        routes.map((route) => {
                            return (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={<route.component />}
                                />
                            )
                        })
                    }
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
