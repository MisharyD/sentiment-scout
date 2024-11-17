import Header from "../../Components/Header/Header.jsx";
import "../PagesCSS/homepage.css";
// import Blocker  from "../../assets/block-1.svg"
import InteractionBlock from "../../Components/InteractionBlock/InteractionBlock.jsx";
import FeatureCards from "../../Components/FeatureCards/FeatureCards.jsx";
import Panel from "../../Components/Panel/Panel.jsx";
import BrainGiver from "../../assets/images/brain-giver.svg";
import Footer from "../../Components/Footer/Footer.jsx";
import HappySadFace from "../../assets/images/happy-sad-face.svg";
function HomePage() {
  return (
    <div id="homepage">
      <Header />
      <InteractionBlock
        gradient={true}
        path="/generate/youtube"
        center={true}
        title="See what people think in a glance"
        description="
            Sentiment Scout delivers real-time insights from youtube, twitter
            and Google maps.
            Whether you are a content creater, buisness owner, or someone
            curiuos about public opinions."
        buttonText="Get Started"


      />
      <FeatureCards type="platforms" />
      <Panel
        gradient={false}
        flipped={false}
        src={BrainGiver}
        title="Summarize Audience Feedback"
        description="Quickly understand what your audience is saying across YouTube, Twitter, and Google Maps. AllowAlert provides concise summaries of comments, posts, and reviews, highlighting key sentiments and popular keywords to help you make informed decisions"
        buttonText="Discover More"
      />

      <FeatureCards />

      <Panel
        gradient={true}
        flipped={true}
        src={HappySadFace}
        title="Analyze Sentiment Trends"
        description="Track the number of positive and negative comments and posts. Our AI-driven analysis breaks down sentiment metrics and extracts key phrases, empowering you to refine your strategies and enhance customer satisfaction"
        buttonText="Analyze Now"
      />
      <Footer />
    </div>
  );
}

export default HomePage;
