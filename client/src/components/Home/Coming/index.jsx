import { Gradients } from "../../Images";
import Book from "../Book";

const Coming = ({books}) => {

    return (
        <div className="featuredBooks">
            <p>Coming Soon</p>
            <div>
                {books && books.length > 0 
                ?
                    books.map((book, index) =>
                        <Book bookData={book} gradient={Gradients.slice(3, books.length+3)[index]}/>
                    )
                :
                    <p>No books found!</p>
                }
            </div>
        </div>
    )
}

export default Coming;