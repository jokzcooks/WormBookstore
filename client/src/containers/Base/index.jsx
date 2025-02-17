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
import { ErrorMessage } from '../../components/Notification/errorMessage';
import { SuccessMessage } from '../../components/Notification/successMessage';

const Base = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartOpen, setCartOpen] = useState(false)

  const [catalog, setCatalog] = useState([])
  const [featured, setFeatured] = useState([])
  const [coming, setComing] = useState([])

  const [userCart, setUserCart] = useState([]);

  const [adminPageData, setAdminPageData] = useState({})

  const [profileData, setProfileData] = useState({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      admin: false,
      payment_cards: [{
        cardName: "",
        cardNumber: "",
        cardCVV: "",
        cardExp: ""
      }]
  });
  console.log("userCart", userCart)
  console.log("profileData", profileData)

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
      navigate("/home");
    }
    if (location.pathname === "/admin" && (!profileData || profileData.admin == false) )
      navigate("/home");
    getBooks();
    getFeatured();
    getComing();
  }, [navigate, location.pathname]);

  const getAdminPageData = useCallback(() => {
    fetch('http://localhost:5000/api/admin/data')
      .then(res => res.json())
      .then(data => {
        console.log("Fetched admin data: ", data)
        setAdminPageData(data)
    });
  });

  useEffect(() => {
    if (profileData && profileData.admin == true) {
      getAdminPageData()
    } else {
      setAdminPageData({})
    }
  }, [profileData])

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

  const handleLogIn = async (email, password, rememberMe) => {
    console.log("logging in", email, password, rememberMe)
    const res = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        rememberMe
      })
    })
    const body = await res.json()
    console.log(body)
    if (res.status >= 400) {
      setError(body.message)
      console.log("Login failed, profileData:")
      return false
    } else {
      setProfileData({...profileData, ...body.data, password})
      return true
    }

    // setProfsileData({
    //   name: "John Smith",
    //   email: "john.smith@example.com",
    //   password: "password123",
    //   streetAddress: "1234 Apple St",
    //   city: "Athens",
    //   state: "GA",
    //   zipCode: "30605",
    //   cardName: "John Smith",
    //   cardNumber: "5555 5544 5544 5544",
    //   cardCVV: "123",
    //   cardExp: "2029-02",
    // })
  }

  const handleForgotPassword = async (email) => {
    if (!email || email == "") return setError("An email is required!")
    const res = await fetch("http://localhost:5000/api/user/forgot", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
        })
      })
      const body = await res.json()
      console.log(body)
      if (res.status >= 400) {
        setError(body.message)
        return false
      } else {
        setSuccess("Successfully sent temporary password!")
        return true
      }
  }

  const handleRegister = async (firstName, lastName, email, phoneNumber, password, returnTo) => {
    console.log("Registering", firstName, lastName, email, phoneNumber, password, returnTo)
    const res = await fetch("http://localhost:5000/api/user/register", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        phoneNumber,
        password
      })
    })
    const body = await res.json()
    console.log(body)
    if (res.status >= 400) {
      setError(body.message || "An error occurred during registration. Please try again.")
      return false
    } else {
      setProfileData({...profileData, ...body.data, password})
      if (returnTo) {
        navigate(`/confirmReg?returnTo=${returnTo}`)
      } else {
        navigate("/confirmReg")
      }
    }
  }

  const logOut = async () => {
    setProfileData({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      admin: false,
      payment_cards: [{
        cardName: "",
        cardNumber: "",
        cardCVV: "",
        cardExp: ""
      }]
  })
  setUserCart([])

  }

  const confirmRegistrationCode = async (code) => {
    console.log("confirming", code)
    const res = await fetch("http://localhost:5000/api/user/confirm", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: profileData.email,
        comf_code: code
      })
    })
    const body = await res.json()
    console.log(body)
    if (res.status >= 400) {
      setError(body.message)
      return false
    } else {
      setProfileData({...profileData, ...body.data})
      return true
    }

  }

  let setError = null;
  const onErrorMount = (data) => setError = data[1];

  let setSuccess = null;
  const onSuccessMount = (data) => setSuccess = data[1];

  return (
    <div className='mainContainer'>
        <Header toggleCartOpen={() => {cartOpen ? setCartOpen(false) : setCartOpen(true)}} />
        <Routes>
            <Route path='/home' element={<HomePage catalog={catalog} featured={featured} coming={coming} position="home"/>} />
            <Route path='/profile' element={<ProfilePage logOut={() => logOut()} userData={profileData} setUserData={data => setProfileData(data)}/>} />
            <Route path='/search' element={<SearchPage/>} />
            <Route path='/search/:searchTerm' element={<SearchPage/>} />
            <Route path='/login' element={<LoginPage login={(email, password, rememberMe) => handleLogIn(email, password, rememberMe)} forgot={(email) => handleForgotPassword(email)}/>} />
            <Route path='/register' element={<RegisterPage register={(firstName, lastName, email, phoneNumber, password, returnTo) => handleRegister(firstName, lastName, email, phoneNumber, password, returnTo)}/>} />
            <Route path='/confirmReg' element={<ConfirmRegistration tryConfirm={code => confirmRegistrationCode(code)}/>} />
            <Route path='/receipt' element={<ReceiptPage cartItems={userCart}/>} />
            <Route path='/product/:id' element={<ProductPage openCart={() => setCartOpen(true)} addToCart={item => addItemToCart(item)} allBooks={catalog} />} />
            <Route path='/admin' element={<AdminPage adminData = {adminPageData}/>} /> {/* doesnt work */}
            <Route path='/checkout' element={<CheckoutPage userData={profileData} cartItems={userCart} />} /> {/* doesnt work */}
        </Routes>
        {cartOpen && <Cart items={userCart} close={() => setCartOpen(false)} setCartItems={list => setUserCart(list.filter(item => item != null))} />}
        {/* <div className='testingRouteDisplay'> */}
          {/* <p>Development Test Links</p> */}
          {/* <p onClick={e => navigate("/home")}>-/home</p> */}
          {/* <p onClick={e => navigate("/search/Great Gatsby")}>-/search (by title)</p>
          <p onClick={e => navigate("/search/George")}>-/search (by author)</p>
          <p onClick={e => navigate("/search/978-0553573428")}>-/search (by isbn)</p> */}
          {/* <p onClick={e => navigate("/profile")}>-/profile</p>
          <p onClick={e => navigate("/login")}>-/login</p>
          <p onClick={e => navigate("/register")}>-/register</p>
          <p onClick={e => navigate("/receipt")}>-/receipt</p>
          <p onClick={e => navigate("/product/978-0743273565")}>-/product/:id</p> */}
        {/* </div> */}

        <ErrorMessage onMount={onErrorMount}/>
        <SuccessMessage onMount={onSuccessMount}/>
    </div>
  );
}

export default Base;
