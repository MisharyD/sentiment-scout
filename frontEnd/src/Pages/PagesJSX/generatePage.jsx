import { useParams } from 'react-router-dom';
import {useState} from "react";
import Header from "../../Components/Header/Header.jsx";
import GenerateForm from "../../Components/GenerateForm/GenerateForm.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import "../PagesCSS/generatePage.css"
import "../PagesCSS/starsBackground.css"
export default function GeneratePage(){
    const { platform } = useParams();
    const [requestResponse, setRequestResponse] = useState("")

    const renderTitle = () => {
        switch (platform) {
            case "youtube":
                return (
                    <div className="youtube-title generate-title">
                        Paste the <span className="highlight">Video</span> URL to generate sentiment analysis report
                    </div>
                );
            case "maps":
                return (
                    <div className="maps-title generate-title">
                        Paste the <span className="highlight">Location</span> URL to generate sentiment analysis report
                    </div>
                );
            case "x":
                return (
                    <div className="X-title generate-title">
                        Paste the <span className="highlight">Tweet</span> URL to generate sentiment analysis report
                    </div>
                );
        }
    }

    return (
        <div className="generate-page">
<div id='stars'></div>
<div id='stars2'></div>
<div id='stars3'></div>
            <Header page = "generate" />
            

            <div className="main">
                {renderTitle()}
                <GenerateForm platform={platform} setRequestResponse = {setRequestResponse} />
            <div className="request-response">
                {requestResponse}
            </div>
            </div>
            <Footer />
        </div>
    )
}