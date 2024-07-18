import Catalog from "../../components/Home/Catalog"
import Featured from "../../components/Home/Featured"
import Hero from "../../components/Home/Hero"
import { HeroIcon } from "../../components/Images"
import Coming from './../../components/Home/Coming/index';

const HomePage = ({catalog, featured, coming}) => {


    return (
        <div className="homePageContainer">
            <Hero/>
            <Featured books={featured}/>
            <Coming books={coming}/>
            <Catalog books={catalog}/>
        </div>
    )
}

export default HomePage