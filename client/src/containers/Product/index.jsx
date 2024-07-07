import { useParams } from 'react-router-dom';
import { Gradients } from '../../components/Images';
import { useCallback, useEffect, useState } from 'react';
const ProductPage = ({addToCart, openCart}) => {

    const [bookData, setBookData] = useState({});
    const {id} = useParams()

    const getBookData = useCallback(() => {
      fetch(`http://localhost:5000/books/${id}`)
        .then(res => res.json())
        .then(setBookData);
    });

    useEffect(() => {
      getBookData()
    }, [id]);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
      
    // const randomGradient = Gradients[Math.floor(Math.random()*Gradients.length)]; 
    // no more random
    const randomGradient = Gradients[0]; 

    // {
    //     "_id": "668484c0de7d7b6ee17c2126",
    //     "ISBN": "978-0316015844",
    //     "category": "Fantasy",
    //     "title": "Twilight",
    //     "author": "Stephenie Meyer",
    //     "rating": 4.6,
    //     "edition": "1st",
    //     "publish_year": 2005,
    //     "publisher": "Little, Brown and Company",
    //     "cover_pic": "https://coverart.oclc.org/ImageWebSvc/oclc/+-+19784620_140.jpg",
    //     "qty_in_stock": 64,
    //     "min_threshold": 10,
    //     "buy_price": 12,
    //     "sell_price": 18,
    //     "vendor_id": "60d5ec49f5ee3e2ddca25b03",
    //     "__v": 0
    // }

    return (
        <div className='productPage'>
            <div style={{backgroundImage: `url("${randomGradient}")`}} className='productImageWrapper'>
                <img src={bookData.cover_pic} alt="" />
            </div>
            <div className='bookData'>
                <p className='price'>{formatter.format(bookData.sell_price)}</p>
                <p className='title'>{bookData.title}</p>
                <p className='author'>{bookData.author}</p>
                <div className='reviews'>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                </div>
                <p className='description'>{bookData.description}</p>
                <p className='description'>ISBN: {bookData.ISBN}</p>
                <button onClick={e => {addToCart({...bookData, quantity: 1}); openCart()}} style={{backgroundImage: `url("${randomGradient}")`}} className='addToCart'>Add To Cart</button>
            </div>
        </div>
    )
}

export default ProductPage