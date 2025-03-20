import { assets } from '../../assets/assets';
import './Main.css';

const Main = () => {
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="user_icon" />
      </div>
      <div className="main-container">
        <div className="greet">
          <p>
            <span>Hello, Josaphat</span>
            <p>How can I help you today?</p>
          </p>
        </div>
        {/* <div className="cards">
          <div className="card">
            <p>Suggest beautiful places to see on a upcoming road trip</p>
            <img src={assets.compass_icon} alt="compass_icon" />
          </div>
          <div className="card">
            <p>Briefly summarize this concept:urban planning</p>
            <img src={assets.bulb_icon} alt="compass_icon" />
          </div>
          <div className="card">
            <p>Brainstorm team bonding activities for for our work retreat</p>
            <img src={assets.message_icon} alt="compass_icon" />
          </div>
          <div className="card">
            <p>Improve the readability of the follwing code</p>
            <img src={assets.code_icon} alt="compass_icon" />
          </div>
        </div> */}

        <div className="main-bottom">
          <div className="search-box">
            <input type="text" placeholder="Ask Gemini" />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className="bottom-info">
            Gemini can make mistakes, so double-check it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
