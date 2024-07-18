import { useCallback, useEffect, useState } from "react"
import { useNavigate, useLocation, useParams } from "react-router-dom"
import { Gradients, SearchIcon } from "../../components/Images"
import Book from "../../components/Home/Book"

const SearchPage = ({}) => {
    const navigate = useNavigate()
    const {searchTerm} = useParams()
    const [search, setSearch] = useState("")

    useEffect(() => {
        if (searchTerm && search != searchTerm) {
            setSearch(searchTerm)
            navigate(`/search`)
        }
    }, [searchTerm])

    const [searchResults, setSearchResults] = useState({});

    const getSearchResults = useCallback(() => {
        setSearchResults({})
        if (search && search.replace(/ /mg, "") != "")
      fetch(`http://localhost:5000/api/search/${search}`)
        .then(res => res.json())
        .then(setSearchResults);
    });

    useEffect(() => {
      getSearchResults()
    }, [search]);
    
    useEffect(() => {
        console.log(searchResults)
    }, [searchResults])

    
    return (
        <div className="searchPage">
            <div className="search">
            <p className="title">Find your book</p>
            <div className="searchInputContainer">
                    <input onChange={e => setSearch(e.target.value)} type="text" placeholder="Search ISBN, Author, Title..." value={search}/>
                    <img className="search" src={SearchIcon} alt="" />
                </div>
            </div>
            <div className="searchResults">
                {searchResults && searchResults.length > 0 
                ?
                    searchResults.map((book, index) =>
                        <Book bookData={book} gradient={Gradients.slice(0, searchResults.length)[index]}/>
                    )
                :  search && search.replace(/ /mg, "") != "" && (<p className="delayAppear">Sorry, no books found!</p>)
                }
            </div>
            
        </div>
    )
}

export default SearchPage