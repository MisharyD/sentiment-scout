import { useParams } from 'react-router-dom';
import Header from "../../Components/Header/Header.jsx";
import GenerateForm from "../../Components/GenerateForm/GenerateForm.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import "../PagesCSS/generatePage.css"

export default function GeneratePage(){
    const { platform } = useParams();
    const renderTitle = () => {
        switch (platform) {
            case "youtube":
                return (
                    <div className="youtube-title">
                        Paste the <span className="highlight">Video</span> URL to generate sentiment analysis report Comments
                    </div>
                );
            case "googleMaps":
                return (
                    <div className="maps-title">
                        Paste the <span className="highlight">Location</span> URL to generate sentiment analysis report
                    </div>
                );
            case "x":
                return (
                    <div className="X-title">
                        Paste the <span className="highlight">Tweet</span> URL to generate sentiment analysis report
                    </div>
                );
        }
    }

    return (
        <div className="generate-page">
            <Header page = "generate" />

            <div className="main">
                {renderTitle()}
                <GenerateForm platform={platform} />
            </div>

            <Footer />
        </div>
    )
}