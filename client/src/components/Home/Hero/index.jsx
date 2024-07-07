import { useState } from "react";
import { HeroIcon, SearchIcon } from "../../Images";
import ScrollWord from "./scrollWord";
import { useNavigate } from "react-router-dom";

const Hero = ({}) => {

    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    const submitSearch = () => {
        if (search != "") {
            navigate(`/search/${search}`)
        }
    }

    return (
        <div className="hero">
            <div className="choke">
                <div className="left">
                    <p>Browse our<br/>collection of<br/><ScrollWord /></p>
                    <div className="searchInputContainer">
                        <input onChange={e => setSearch(e.target.value)} onKeyUp={e => e.key === 'Enter' || e.keyCode === 13 ? submitSearch() : ""} type="text" placeholder="Search ISBN, Author, Title..." value={search}/>
                        <img onClick={e => {e.preventDefault(); submitSearch()}} className="search" src={SearchIcon} alt="" />
                    </div>
                </div>
                <img className="books" src={HeroIcon} alt="" />
            </div>
        </div>
    )
}

export default Hero;