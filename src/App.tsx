// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductList from './pages/ProductList';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/kursy" element={<ProductList />} />
        <Route path="/kursy/:id" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
