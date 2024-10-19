import Header from "../../Components/Header/Header.jsx";
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

                <div className="report-introduction-section">
                    <div className="report-introduction-title">
                        What you will uncover with Sentiment Scout
                    </div>
                    <div className="report-info-container">
                        <div>
                        <svg className = "report-info-logo happy-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z" /></svg>
                            <div className="report-info-section">Positive Feedback %</div>
                        </div>
                        <div>
                        <svg className="report-info-logo neutral-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M8.5,11A1.5,1.5 0 0,1 7,9.5A1.5,1.5 0 0,1 8.5,8A1.5,1.5 0 0,1 10,9.5A1.5,1.5 0 0,1 8.5,11M17,9.5A1.5,1.5 0 0,1 15.5,11A1.5,1.5 0 0,1 14,9.5A1.5,1.5 0 0,1 15.5,8A1.5,1.5 0 0,1 17,9.5M16,14V16H8V14H16Z" /></svg>
                            <div className="report-info-section">Neutral Feedback %</div>
                        </div>
                        <div>
                            <svg className="report-info-logo sad-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M15.5,8C16.3,8 17,8.7 17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M12,14C13.75,14 15.29,14.72 16.19,15.81L14.77,17.23C14.32,16.5 13.25,16 12,16C10.75,16 9.68,16.5 9.23,17.23L7.81,15.81C8.71,14.72 10.25,14 12,14Z" /></svg>
                            <div className="report-info-section">Negative Feedback %</div>
                        </div>
                        <div>
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
        <div className="footer">
            <div className="footer-title">
                Sentiment Scout
            </div>

            <div className="socials-container">
                <a className="social-link" href="https://github.com/MisharyD/sentiment-scout">
                <svg className = "social-logo" width="37" height="35" viewBox="0 0 37 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.4997 0.5C16.1468 0.5 13.817 0.952651 11.6433 1.83211C9.46951 2.71157 7.49439 4.00061 5.83068 5.62563C2.47065 8.90752 0.583008 13.3587 0.583008 18C0.583008 25.735 5.72509 32.2975 12.838 34.625C13.7338 34.765 14.0205 34.2225 14.0205 33.75V30.7925C9.05759 31.8425 8.00051 28.4475 8.00051 28.4475C7.17634 26.4175 6.01176 25.875 6.01176 25.875C4.38134 24.79 6.13717 24.825 6.13717 24.825C7.92884 24.9475 8.87842 26.6275 8.87842 26.6275C10.4372 29.2875 13.0709 28.5 14.0922 28.08C14.2534 26.9425 14.7193 26.1725 15.2209 25.735C11.2434 25.2975 7.06884 23.7925 7.06884 17.125C7.06884 15.1825 7.74967 13.625 8.91426 12.3825C8.73509 11.945 8.10801 10.125 9.09342 7.7625C9.09342 7.7625 10.5984 7.29 14.0205 9.5475C15.4359 9.1625 16.9768 8.97 18.4997 8.97C20.0226 8.97 21.5634 9.1625 22.9788 9.5475C26.4009 7.29 27.9059 7.7625 27.9059 7.7625C28.8913 10.125 28.2643 11.945 28.0851 12.3825C29.2497 13.625 29.9305 15.1825 29.9305 17.125C29.9305 23.81 25.738 25.28 21.7426 25.7175C22.3876 26.26 22.9788 27.3275 22.9788 28.955V33.75C22.9788 34.2225 23.2655 34.7825 24.1793 34.625C31.2922 32.28 36.4163 25.735 36.4163 18C36.4163 15.7019 35.9529 13.4262 35.0525 11.303C34.1521 9.17984 32.8324 7.25066 31.1687 5.62563C29.505 4.00061 27.5298 2.71157 25.3561 1.83211C23.1823 0.952651 20.8525 0.5 18.4997 0.5Z" fill="white"/>
                </svg>
                </a>

                <svg className = "social-logo" width="41" height="36" viewBox="0 0 41 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.5348 23.7747C25.6982 23.9308 25.6982 24.2604 25.5348 24.4512C24.0433 25.6655 21.2646 25.7696 20.4269 25.7696C19.63 25.7696 16.8513 25.6655 15.4006 24.4512C15.1963 24.2604 15.1963 23.9308 15.4006 23.7747C15.6254 23.6012 15.9727 23.6012 16.1771 23.7747C17.1169 24.5726 19.0579 24.7981 20.4269 24.7981C21.8366 24.7981 23.8185 24.5726 24.7175 23.7747C24.9423 23.6012 25.2896 23.6012 25.5348 23.7747ZM17.8729 19.6634C17.8729 18.6747 16.9126 17.8593 15.748 17.8593C14.5834 17.8593 13.6231 18.6747 13.6231 19.6634C13.6231 20.6522 14.5834 21.4849 15.748 21.4675C16.9126 21.4675 17.8729 20.6522 17.8729 19.6634ZM25.1057 17.8593C23.9411 17.8593 22.9808 18.7267 22.9808 19.6808C22.9808 20.6349 23.9411 21.4849 25.1057 21.4849C26.2703 21.4849 27.2306 20.6522 27.2306 19.6808C27.2306 18.7267 26.2703 17.8593 25.1057 17.8593ZM40.8586 17.8593C40.8586 27.4002 31.6643 35.2064 20.4269 35.2064C9.1894 35.2064 -0.00488281 27.4002 -0.00488281 17.8593C-0.00488281 8.31849 9.1894 0.512329 20.4269 0.512329C31.6643 0.512329 40.8586 8.31849 40.8586 17.8593ZM34.0548 17.8593C34.0548 16.4542 32.6859 15.3267 31.0922 15.3267C30.275 15.3267 29.5394 15.6042 29.0082 16.0379C26.965 14.7889 24.1659 13.991 21.0398 13.8869L22.4087 8.45726L26.8424 9.27257C26.8833 10.2267 27.8231 10.9899 28.9673 10.9899C30.1319 10.9899 31.0922 10.1746 31.0922 9.18584C31.0922 8.19706 30.1319 7.38175 28.9673 7.38175C28.1296 7.38175 27.3941 7.79807 27.0672 8.40522L22.1023 7.50318C21.9592 7.45113 21.8162 7.50318 21.7141 7.57256C21.5915 7.64195 21.5302 7.74603 21.5097 7.86746L19.9978 13.9042C16.8309 13.991 13.9704 14.7889 11.8864 16.0553C11.3552 15.6216 10.6196 15.3614 9.82278 15.3614C8.16781 15.3614 6.83975 16.4889 6.83975 17.8593C6.83975 18.9175 7.57529 19.7849 8.59688 20.1838C8.55602 20.4614 8.53558 20.6696 8.53558 20.9471C8.53558 24.7981 13.8683 28.0073 20.4269 28.0073C27.0263 28.0073 32.3794 24.8502 32.3794 20.9471C32.3794 20.7043 32.359 20.4614 32.2977 20.1838C33.3193 19.7849 34.0548 18.9002 34.0548 17.8593Z" fill="white"/>
                </svg>

                <svg className = "social-logo" width="41" height="35" viewBox="0 0 41 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M41 35L30.2375 27.3913L31.529 30.4348H5.125C3.76577 30.4348 2.4622 30.034 1.50108 29.3205C0.539954 28.6071 0 27.6394 0 26.6304V3.80435C0 2.79537 0.539954 1.82772 1.50108 1.11427C2.4622 0.400814 3.76577 0 5.125 0H35.875C37.2342 0 38.5378 0.400814 39.4989 1.11427C40.46 1.82772 41 2.79537 41 3.80435V35ZM20.5 8.82609C15.006 8.82609 11.152 10.5761 11.152 10.5761C13.2635 9.17609 16.9535 8.36957 16.9535 8.36957L16.605 8.11087C13.1405 8.15652 10.004 9.93696 10.004 9.93696C6.478 15.4 6.7035 20.1174 6.7035 20.1174C9.5735 22.8717 13.8375 22.6739 13.8375 22.6739L15.293 21.3043C12.7305 20.8935 11.111 19.2043 11.111 19.2043C11.111 19.2043 14.965 21.1522 20.5 21.1522C26.035 21.1522 29.889 19.2043 29.889 19.2043C29.889 19.2043 28.2695 20.8935 25.707 21.3043L27.1625 22.6739C27.1625 22.6739 31.4265 22.8717 34.2965 20.1174C34.2965 20.1174 34.522 15.4 30.996 9.93696C30.996 9.93696 27.8595 8.15652 24.395 8.11087L24.0465 8.36957C24.0465 8.36957 27.7365 9.17609 29.848 10.5761C29.848 10.5761 25.994 8.82609 20.5 8.82609ZM16.2565 14.5935C17.589 14.5935 18.6755 15.4609 18.655 16.5261C18.655 17.5761 17.589 18.4587 16.2565 18.4587C14.9445 18.4587 13.8785 17.5761 13.8785 16.5261C13.8785 15.4609 14.924 14.5935 16.2565 14.5935ZM24.805 14.5935C26.1375 14.5935 27.2035 15.4609 27.2035 16.5261C27.2035 17.5761 26.1375 18.4587 24.805 18.4587C23.493 18.4587 22.427 17.5761 22.427 16.5261C22.427 15.4609 23.4725 14.5935 24.805 14.5935Z" fill="white"/>
                </svg>
            </div>
        </div>
    </>
  
  ) 
}

export default HomePage
