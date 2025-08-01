import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from "./layout/MainLayout"
import ProductList from './pages/ProductList';
import InventoryReports from './pages/InventoryReports';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={< ProductList/>} />
        <Route path="/InventoryReports" element={< InventoryReports/>} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
