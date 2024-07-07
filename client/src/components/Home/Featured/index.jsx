import { Gradients } from "../../Images";
import Book from "../Book";

const Featured = ({books}) => {

    return (
        <div className="featuredBooks">
            <p>Featured Books</p>
            <div>
                {books && books.length > 0 
                ?
                    books.map((book, index) =>
                        <Book bookData={book} gradient={Gradients.slice(0, books.length)[index]}/>
                    )
                :
                    <p>No books found!</p>
                }
            </div>
        </div>
    )
}

export default Featured;