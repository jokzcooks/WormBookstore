import { useNavigate } from "react-router-dom"

const Book = ({bookData, gradient}) => {

    const navigate = useNavigate()
    
    // {
    //     "_id": "668484c0de7d7b6ee17c212b",
    //     "ISBN": "978-0385751537",
    //     "category": "Young Adult",
    //     "title": "The Book Thief",
    //     "author": "Markus Zusak",
    //     "rating": 4.7,
    //     "edition": "Reprint Edition",
    //     "publish_year": 2007,
    //     "publisher": "Knopf Books for Young Readers",
    //     "cover_pic": "https://coverart.oclc.org/ImageWebSvc/oclc/+-+38434540_140.jpg",
    //     "qty_in_stock": 58,
    //     "min_threshold": 10,
    //     "buy_price": 10,
    //     "sell_price": 14,
    //     "vendor_id": "60d5ec49f5ee3e2ddca25b01",
    //     "__v": 0
    // }
    return (

        <div className="bookContainerSmall" onClick={e => navigate(`/product/${bookData.ISBN}`)}>
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