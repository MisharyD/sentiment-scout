import Header from "../../Components/Header/Header.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import { NavLink } from "react-router-dom";
import "../../index.css"
import '../PagesCSS/homepage.css'
import heroImage from "../../assets/images/hero-image.png"
import regularUser from "../../assets/images/regular-user.svg"
import contentCreator from "../../assets/images/content-creator.svg"
import businessOwner from "../../assets/images/business-owner.svg"
import youtube from "../../assets/images/youtube.svg"
import x from "../../assets/images/x.svg"
import googleMaps from "../../assets/images/google-maps.svg"

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
                <div className="introduction-section">
                    <div className="introduction-title">
                        Empoworing you with instant sentiment insights
                    </div>
                    <div className="introduction-description">
                        Sentiment Scout delivers real-time insights from youtube, twitter and Google maps. <br />
                        Whether you are a content creater, buisness owner, or someone curiuos about public opinions. <br />
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

                <div className="report-introduction-section">
                    <div className="report-introduction-title">
                        What you will uncover with Sentiment Scout
                    </div>
                    <div className="report-info-container">
                        <div className="info">
                            <svg className = "report-info-logo happy-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z" /></svg>
                            <div className="report-info-section">Positive Feedback %</div>
                        </div>
                        <div className="info">
                            <svg className="report-info-logo neutral-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M8.5,11A1.5,1.5 0 0,1 7,9.5A1.5,1.5 0 0,1 8.5,8A1.5,1.5 0 0,1 10,9.5A1.5,1.5 0 0,1 8.5,11M17,9.5A1.5,1.5 0 0,1 15.5,11A1.5,1.5 0 0,1 14,9.5A1.5,1.5 0 0,1 15.5,8A1.5,1.5 0 0,1 17,9.5M16,14V16H8V14H16Z" /></svg>
                            <div className="report-info-section">Neutral Feedback %</div>
                        </div>
                        <div className="info">
                            <svg className="report-info-logo sad-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M15.5,8C16.3,8 17,8.7 17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M12,14C13.75,14 15.29,14.72 16.19,15.81L14.77,17.23C14.32,16.5 13.25,16 12,16C10.75,16 9.68,16.5 9.23,17.23L7.81,15.81C8.71,14.72 10.25,14 12,14Z" /></svg>
                            <div className="report-info-section">Negative Feedback %</div>
                        </div>
                        <div className="info">
                            <svg className="report-info-logo" width="101" height="76" viewBox="0 0 101 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100.121 36.2585C91.9291 18.4626 73.4166 0.500122 50.5 0.500122C27.5833 0.500122 9.07078 18.4626 0.879119 36.2585C0.629927 36.8053 0.500977 37.3992 0.500977 38.0001C0.500977 38.601 0.629927 39.195 0.879119 39.7418C9.07078 57.5376 27.5833 75.5001 50.5 75.5001C73.4166 75.5001 91.9291 57.5376 100.121 39.7418C100.37 39.195 100.499 38.601 100.499 38.0001C100.499 37.3992 100.37 36.8053 100.121 36.2585ZM50.5 67.1668C32.1208 67.1668 16.5583 52.3668 9.29162 38.0001C16.5583 23.6335 32.1208 8.83346 50.5 8.83346C68.8791 8.83346 84.4416 23.6335 91.7083 38.0001C84.4416 52.3668 68.8791 67.1668 50.5 67.1668Z" fill="#808080"/>
                            <path d="M50.5003 17.1668C46.3799 17.1668 42.352 18.3886 38.926 20.6778C35.4999 22.967 32.8297 26.2207 31.2528 30.0275C29.676 33.8343 29.2634 38.0232 30.0673 42.0645C30.8712 46.1058 32.8554 49.8179 35.7689 52.7315C38.6825 55.6451 42.3947 57.6293 46.436 58.4331C50.4772 59.237 54.6661 58.8244 58.4729 57.2476C62.2797 55.6708 65.5334 53.0005 67.8226 49.5745C70.1118 46.1485 71.3337 42.1206 71.3337 38.0001C71.3271 32.4768 69.13 27.1816 65.2244 23.276C61.3188 19.3705 56.0236 17.1734 50.5003 17.1668ZM50.5003 50.5001C48.0281 50.5001 45.6113 49.767 43.5557 48.3935C41.5001 47.02 39.8979 45.0677 38.9518 42.7837C38.0057 40.4996 37.7582 37.9862 38.2405 35.5615C38.7228 33.1367 39.9133 30.9094 41.6615 29.1613C43.4097 27.4131 45.6369 26.2226 48.0617 25.7403C50.4865 25.258 52.9998 25.5055 55.2839 26.4516C57.568 27.3977 59.5202 28.9999 60.8937 31.0555C62.2672 33.1111 63.0003 35.5278 63.0003 38.0001C63.0003 41.3153 61.6834 44.4947 59.3392 46.8389C56.995 49.1832 53.8155 50.5001 50.5003 50.5001Z" fill="#808080"/>
                            </svg>
                            <div className="report-info-section">People Overview</div>
                        </div>
                    </div>
                </div>

                <div className="platform-selection-section">
                    <div className="platform-selection-title">
                        Select a platform
                    </div>
                    <div className="platforms-container">
                        <NavLink className="nav-item" to='/'>
                        <img src={youtube} alt="" className="platform-logo" />
                        </NavLink>

                        <NavLink className="nav-item" to='/'>
                        <img src={x} alt="" className="platform-logo" />
                        </NavLink>

                        <NavLink className="nav-item" to='/'>
                        <img src={googleMaps} alt="" className="platform-logo" />
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
  
  ) 
}

export default HomePage
