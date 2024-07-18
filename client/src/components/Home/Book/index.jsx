import { useNavigate } from "react-router-dom"

const Book = ({bookData, gradient}) => {

    const navigate = useNavigate()
    
    // {
    //     "_id": "6699711010ae969628557253",
    //     "isbn": "978-1250214181",
    //     "category": "Biography",
    //     "title": "Becoming",
    //     "author": "Michelle Obama",
    //     "rating": 4.9,
    //     "edition": "1st",
    //     "publish_year": 2018,
    //     "publisher": "Crown",
    //     "cover_pic": "https://coverart.oclc.org/ImageWebSvc/oclc/+-+6708695856_140.jpg",
    //     "qty_in_stock": 19,
    //     "min_threshold": 15,
    //     "buy_price": 15,
    //     "sell_price": 25,
    //     "vendor_id": "60d5ec49f5ee3e2ddca25b04",
    //     "__v": 0
    // }

    console.log(bookData, gradient)
    
    return (

        <div className="bookContainerSmall" onClick={e => navigate(`/product/${bookData.isbn}`)}>
            <div style={{backgroundImage: `url("${gradient}")`}} className="bookImageWrapper">
                <img src={bookData.cover_pic} alt="" />
            </div>
            <p className="bookTitle">{bookData.title}</p>
            <p className="bookAuthor">{bookData.author}</p>
            <div className='reviews'>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
            </div>
            <p className="bookPrice">${bookData.sell_price} </p>
        </div>

    )
}

export default Book