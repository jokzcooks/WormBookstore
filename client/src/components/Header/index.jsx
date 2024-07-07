import { useLocation, useNavigate } from "react-router-dom"
import { CartIcon, ProfileIcon, SearchIcon } from "../Images"
import { UseWindowScroll } from './../../hooks/Scroll/useWindowScroll';

const Header = ({toggleCartOpen}) => {
    const navigate = useNavigate()
    const location = useLocation()
    var [{x, y}, scrollTo] = UseWindowScroll()

    const goTo = (e, href) => {
        e.preventDefault()
        if (location != href) navigate(href)
    }

    const hideList = [
        "/login",
        "/register"
    ]

    return (
        <div className= { y > 40 ? "headerContainer showPassthrough" : "headerContainer"}>
            <div className="headerContent" style={hideList.indexOf(location.pathname) != -1 ? {justifyContent: "start"} : {}}  >
                {
                    location.pathname == "/home" ?
                        <div className="wormNav">
                            <p onClick={e => scrollTo({left: 0, top: 0, behavior: "smooth"})} >Home</p>
                            <p onClick={e => scrollTo({left: 0, top: window.innerHeight-40, behavior: "smooth"})} >Featured</p>
                            <p onClick={e => scrollTo({left: 0, top: window.innerHeight*2-80, behavior: "smooth"})} >All Books</p>
                        </div>
                    :
                        <div style={hideList.indexOf(location.pathname) != -1 ? {right: 0, left: "unset"} : {}} className="wormNav">
                            <p onClick={e => goTo(e, "/home")}>Return to Home Page</p>
                        </div>
                }
                {
                    location.pathname == "/home" ?
                        <p onClick={e => scrollTo({left: 0, top: 0, behavior: "smooth"})}  className="wormTitle" >Worm</p>
                    :
                        <p onClick={e => goTo(e, "/home")} className="wormTitle">Worm</p>
                }
                {   hideList.indexOf(location.pathname) == -1 &&
                    <div className="wormIcons">
                        <img onClick={e => goTo(e, "/profile")} src={ProfileIcon} alt="" srcset="" />
                        <img onClick={e => goTo(e, "/search/ /")} src={SearchIcon} alt="" srcset="" />
                        <img onClick={e => toggleCartOpen()} src={CartIcon} alt="" srcset="" />
                    </div>
                }
            </div>
        </div>
    )
}

export default Header