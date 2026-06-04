import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="page-wrapper form-page">
            <Form />
          </div>
        } />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;