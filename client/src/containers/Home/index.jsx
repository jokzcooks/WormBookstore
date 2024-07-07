import Catalog from "../../components/Home/Catalog"
import Featured from "../../components/Home/Featured"
import Hero from "../../components/Home/Hero"
import { HeroIcon } from "../../components/Images"
import Coming from './../../components/Home/Coming/index';

const HomePage = ({books}) => {

    return (
        <div className="homePageContainer">
            <Hero/>
            <Featured books={books.slice(0, 3)}/>
            <Coming books={books.slice(3, 6)}/>
            <Catalog books={books}/>
        </div>
    )
}

export default HomePage