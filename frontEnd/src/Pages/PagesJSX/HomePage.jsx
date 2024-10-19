import Header from "../../Components/Header/Header.jsx";
import { NavLink } from "react-router-dom";
import "../../index.css"
import '../PagesCSS/homepage.css'
import heroImage from "../../assets/images/hero-image.png"
import regularUser from "../../assets/images/regular-user.svg"
import contentCreator from "../../assets/images/content-creator.svg"
import businessOwner from "../../assets/images/business-owner.svg"

function HomePage() {
  

  return (

    <>
        <Header page="home" />
        <div className='homepage'>  
            <div className="hero">
                <img className ="hero-image" src={heroImage} alt="hero image" />
                <div className="hero-title-container">
                    <div className="title-part1">Discover What People Really</div>
                    <div className="title-part2">Think in a Glance!</div>
                </div>
            </div>
            <div className="overview">
                <div className="introduction-container">
                    <div className="introduction-title">
                        Empoworing you with instant sentiment insights
                    </div>
                    <div className="introduction-description">
                        Sentiment Scout delivers real-time insights from youtube, twitter and Google maps.
                        Whether you are a content creater, buisness owner, or someone curiuos about public opinions. 
                        See how we can provide the data you need.
                    </div>
                </div>

                <div className="user-types">
                    <div className="user-card">
                        <div>
                            <img src={contentCreator} alt="contentCreator" className="user-type-logo"/>
                        </div>
                        <div className="user-name">
                            Content Creator
                        </div>
                        <div className="user-description">
                        Understand your audience at a glance! 
                        Get detailed insights on how viewers react to your content and fine-tune your strategy.
                        </div>
                    </div>

                    <div className="user-card">
                        <div>
                            <img src={regularUser} alt="regular user" className="user-type-logo" />
                        </div>
                        <div className="user-name">
                            Buisness Owner
                        </div>
                        <div className="user-description">
                        Curious about public opinion on a topic or post? Our tool helps you get quick insights.
                        </div>
                    </div>

                    <div className="user-card">
                        <div>
                            <img src={businessOwner} alt="business owner" className="user-type-logo"/>
                        </div>
                        <div className="user-name">
                            Regular User
                        </div>
                        <div className="user-description">
                        Empower your decision-making with real-time sentiment analysis. 
                        Track public opinion across multiple platforms and make data-driven choices.
                        </div>
                    </div>
                </div>

                <div className="report-introduction-container">
                    <div className="report-introduction-title">
                        What you will uncover with Sentiment Scout
                    </div>
                    <div className="report-info"></div>
                </div>

                <div className="platform-selection">
                    <div className="platform-selection-title">
                        Select a platform
                    </div>
                    <div className="platforms">
                        <NavLink className="nav-item" to='/'>Home page</NavLink>
                    </div>
                </div>
            </div>
        </div>
        <div className="footer">
            <div className="footer-title">
                Sentiment Scout
            </div>

            <div className="socials-container">
                <div className="social">

                </div>
            </div>
        </div>
    </>
  
  ) 
}

export default HomePage
