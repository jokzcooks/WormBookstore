import React, { useEffect, useState, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import HomePage from '../Home';
import ProfilePage from '../Profile';
import Header from '../../components/Header';
import SearchPage from '../Search';
import LoginPage from '../Login';
import RegisterPage from '../Register';
import ReceiptPage from '../Receipt';
import ProductPage from '../Product';
import Cart from '../../components/Cart';
import AdminPage from '../Admin/AdminPage';
import CheckoutPage from '../Checkout';
import ConfirmRegistration from '../ConfirmRegistration';
import { NotificationError } from '../../components/Notification/NotificationError';
import { NotificationSuccess } from '../../components/Notification/NotificationSuccess';

function Base() {
  const navigator = useNavigate();
  const currentLocation = useLocation();
  const [isCartOpen, setCartOpen] = useState(false);
  const [bookCatalog, setBookCatalog] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [upcomingBooks, setUpcomingBooks] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [userData, setUserData] = useState({});

  const fetchBooks = useCallback(() => {
    fetch('http://localhost:5000/api/books')
      .then(response => response.json())
      .then(data => setBookCatalog(data));
  }, []);

  const fetchFeaturedBooks = useCallback(() => {
    fetch('http://localhost:5000/api/books/featured')
      .then(response => response.json())
      .then(data => setFeaturedBooks(data));
  }, []);

  const fetchUpcomingBooks = useCallback(() => {
    fetch('http://localhost:5000/api/books/coming')
      .then(response => response.json())
      .then(data => setUpcomingBooks(data));
  }, []);

  useEffect(() => {
    if (currentLocation.pathname === '/') {
      navigator("/home");
    }
    fetchBooks();
    fetchFeaturedBooks();
    fetchUpcomingBooks();
  }, [navigator, currentLocation.pathname]);

  const handleAddToCart = (book) => {
    const existingItem = cartItems.find(item => item._id === book._id);
    if (existingItem) {
      existingItem.quantity += 1;
      setCartItems([...cartItems]);
    } else {
      setCartItems([...cartItems, { ...book, quantity: 1 }]);
    }
  };

  return (
    <div className='mainContainer'>
      <Header toggleCart={() => setCartOpen(!isCartOpen)} />
      <Routes>
        <Route path='/home' element={<HomePage books={bookCatalog} />} />
        <Route path='/profile' element={<ProfilePage userData={userData} updateUserData={setUserData} />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/search/:searchTerm' element={<SearchPage />} />
        <Route path='/login' element={<LoginPage handleLogin={setUserData} />} />
        <Route path='/register' element={<RegisterPage handleRegistration={setUserData} />} />
        <Route path='/confirmReg' element={<ConfirmRegistration />} />
        <Route path='/receipt' element={<ReceiptPage items={cartItems} />} />
        <Route path='/product/:id' element={<ProductPage addToCart={handleAddToCart} />} />
        <Route path='/admin/*' element={<AdminPage />} />
        <Route path='/checkout' element={<CheckoutPage userInfo={userData} cart={cartItems} />} />
      </Routes>
      {isCartOpen && <Cart items={cartItems} close={() => setCartOpen(false)} updateItems={setCartItems} />}
      <div className='testingRouteDisplay'>
        <p>Development Test Links</p>
        <p onClick={() => navigator("/home")}>-/home</p>
        <p onClick={() => navigator("/search/Great Gatsby")}>-/search (by title)</p>
      </div>
      <NotificationError />
      <NotificationSuccess />
    </div>
  );
}

export default Base;
