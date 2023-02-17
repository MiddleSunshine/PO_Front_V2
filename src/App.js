import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import WhiteBord from "./pages/WhiteBord.jsx";
import Index from "./pages/index.jsx";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          element={<Index />}
        />
        <Route
          path={"/whitebord/:id"}
          element={<WhiteBord />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
