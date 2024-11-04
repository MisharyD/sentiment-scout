import Header from "../../Components/Header/Header.jsx";
import '../PagesCSS/homepage.css'
// import Blocker  from "../../assets/block-1.svg"
import InteractionBlock from '../../Components/InteractionBlock/InteractionBlock.jsx';
import FeatureCards from '../../Components/FeatureCards/FeatureCards.jsx';
import Panel from "../../Components/Panel/Panel.jsx"
import BrainGiver from "../../assets/images/BrainGiver.svg"
function HomePage() {
  

  return (<div id='homepage'>
    <Header/>
   <InteractionBlock center={true} title="See what people think in a glance" description={<>Sentiment Scout delivers real-time insights from youtube, twitter and Google maps. <br />
                        Whether you are a content creater, buisness owner, or someone curiuos about public opinions.</>}buttonWidth="20%" buttonHeight= "15.01%"
                       marginBottom="20%" marginTop="20.86vh" width="45.16%" height="46.04vh" fontSize="85px" />
   <FeatureCards />

   <Panel src={BrainGiver}/>
    

  </div>


  )
}

export default HomePage
