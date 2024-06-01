
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CategoryProductProvider } from "./context/CategoryProductContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CategoryProductProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CategoryProductProvider>
);
