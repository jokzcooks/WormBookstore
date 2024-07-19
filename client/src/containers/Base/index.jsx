import React, { useCallback, useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import HomePage from '../Home';
import ProfilePage from '../Profile';
import Header from '../../components/Header';
import SearchPage from '../Search';
import LoginPage from './../Login/index';
import RegisterPage from './../Register/index';
import ReceiptPage from '../Receipt';
import ProductPage from '../Product';
import Cart from '../../components/Cart';
import AdminPage from '../Admin/AdminPage';
import CheckoutPage from '../Checkout/index'; // Ensure this path is correct
import ConfirmRegistration from '../ConfirmRegistration';
import {ErrorMessage} from '../../components/Issue';

const Base = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartOpen, setCartOpen] = useState(false)

  const [catalog, setCatalog] = useState([])
  const [featured, setFeatured] = useState([])
  const [coming, setComing] = useState([])


  const [userCart, setUserCart] = useState([]);
    // Mock user data to simulate logged-in user
  const [profileData, setProfileData] = useState();
  console.log("userCart", userCart)

  const getBooks = useCallback(() => {
    fetch('http://localhost:5000/api/book')
      .then(res => res.json())
      .then(setCatalog);
  });
  const getFeatured = useCallback(() => {
    fetch('http://localhost:5000/api/book/featured')
      .then(res => res.json())
      .then(setFeatured);
  });
  const getComing = useCallback(() => {
    fetch('http://localhost:5000/api/book/coming')
      .then(res => res.json())
      .then(setComing);
  });
  useEffect(() => {
    if (location.pathname === '/') {
      navigate("/home"); // Navigate to home only if on the root path
    }
    getBooks();
    getFeatured();
    getComing();
  }, [navigate, location.pathname]);

  const addItemToCart = (item) => {
    const copy = JSON.parse(JSON.stringify(userCart))
    const exists = copy.find(inCart => inCart._id == item._id)
    if (exists) {
      exists.quantity = exists.quantity + 1
      setUserCart(copy)
    } else {
      setUserCart([...userCart, item])
    }
  }

  const handleLogIn = () => {
    setProfileData({
      name: "John Smith",
      email: "john.smith@example.com",
      password: "password123",
      streetAddress: "1234 Apple St",
      city: "Athens",
      state: "GA",
      zipCode: "30605",
      cardName: "John Smith",
      cardNumber: "5555 5544 5544 5544",
      cardCVV: "123",
      cardExp: "2029-02",
    })
  }

  return (
    <div className='mainContainer'>
        <Header toggleCartOpen={() => {cartOpen ? setCartOpen(false) : setCartOpen(true)}} />
        <Routes>
            <Route path='/home' element={<HomePage catalog={catalog} featured={featured} coming={coming} position="home"/>} />
            <Route path='/profile' element={<ProfilePage userData={profileData} setUserData={data => setProfileData(data)}/>} />
            <Route path='/search' element={<SearchPage/>} />
            <Route path='/search/:searchTerm' element={<SearchPage/>} />
            <Route path='/login' element={<LoginPage login={() => handleLogIn()}/>} />
            <Route path='/register' element={<RegisterPage login={() => handleLogIn()}/>} />
            <Route path='/confirmReg' element={<ConfirmRegistration/>} />
            <Route path='/receipt' element={<ReceiptPage cartItems={userCart}/>} />
            <Route path='/product/:id' element={<ProductPage openCart={() => setCartOpen(true)} addToCart={item => addItemToCart(item)} allBooks={catalog} />} />
            <Route path='/admin/*' element={<AdminPage />} /> {/* doesnt work */}
            <Route path='/checkout' element={<CheckoutPage userData={profileData} cartItems={userCart} />} /> {/* doesnt work */}
        </Routes>
        {cartOpen && <Cart items={userCart} close={() => setCartOpen(false)} setCartItems={list => setUserCart(list.filter(item => item != null))} />}
        <div className='testingRouteDisplay'>
          <p>Development Test Links</p>
          {/* <p onClick={e => navigate("/home")}>-/home</p> */}
          <p onClick={e => navigate("/search/Great Gatsby")}>-/search (by title)</p>
          <p onClick={e => navigate("/search/George")}>-/search (by author)</p>
          <p onClick={e => navigate("/search/978-0553573428")}>-/search (by isbn)</p>
          {/* <p onClick={e => navigate("/profile")}>-/profile</p>
          <p onClick={e => navigate("/login")}>-/login</p>
          <p onClick={e => navigate("/register")}>-/register</p>
          <p onClick={e => navigate("/receipt")}>-/receipt</p>
          <p onClick={e => navigate("/product/978-0743273565")}>-/product/:id</p> */}
        </div>

        <ErrorMessage onMount={onErrorMount}/>
    </div>
  );
}

export default Base;
