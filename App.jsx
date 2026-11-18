import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./componant/Router/Routes";

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
