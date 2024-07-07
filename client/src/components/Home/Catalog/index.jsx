import { Gradients } from "../../Images";
import Book from "../Book";

const Catalog = ({books}) => {

    return (
        <div className="catalogBooks">
            <p>All Books</p>
            <div>
                {books && books.length > 0 
                ?
                    books.map((book, index) =>
                        <Book bookData={book} gradient={Gradients.slice(3, books.length)[index]}/>
                    )
                :
                    <p>No books found!</p>
                }
            </div>
        </div>
    )
}

export default Catalog;