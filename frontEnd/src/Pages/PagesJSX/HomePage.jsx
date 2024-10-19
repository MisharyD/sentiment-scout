import Header from "../../Components/Header/Header.jsx";
import { NavLink } from "react-router-dom";
import '../PagesCSS/homepage.css'
import heroImage from "../../assets/images/hero-image.png"
import "../../index.css"
function HomePage() {
  

  return (

    <>
    <Header page="home"/>
    <div className='homepage'>  
        <div className="hero">
            <img className ="hero-image" src={heroImage} alt="hero image" />
            <div className="hero-title-container">
                <div className="title-part1">Discover What People Really</div>
                <div className="title-part2">Think in a Glance</div>
            </div>
        </div>
        <div className="overview">
            <div className="introduction">
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
                    <div className="user-card-logo">
                        Logo
                    </div>
                    <div className="user-name">
                        Content creator
                    </div>
                    <div className="user-description">
                        Understand your
                    </div>
                </div>

                <div className="user-card">
                    <div className="user-card-logo">
                        Logo
                    </div>
                    <div className="user-name">
                        Buisness Owner
                    </div>
                    <div className="user-description">
                        Curious about
                    </div>
                </div>

                <div className="user-card">
                    <div className="user-card-logo">
                        Logo
                    </div>
                    <div className="user-name">
                        Regular User
                    </div>
                    <div className="user-description">
                        Empower your
                    </div>
                </div>
            </div>

            <div className="report-introduction">
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
