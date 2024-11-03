import React  from 'react'

import Header from "../../Components/Header/Header.jsx";
import '../PagesCSS/homepage.css'
// import Blocker  from "../../assets/block-1.svg"
import GreetingBlock from '../../Components/GreetingBlock/GreetingBlock.jsx';
import FeatureCards from '../../Components/FeatureCards/FeatureCards.jsx';
function HomePage() {
  

  return (<div id='homepage'>
    <Header/>
   <GreetingBlock title="See what people think in a glance" description="Sentiment Scout delivers real-time insights from youtube, twitter and Google maps. <br />
                        Whether you are a content creater, buisness owner, or someone curiuos about public opinions."/>
   <FeatureCards />
    

  </div>

   
  )
}

export default HomePage
