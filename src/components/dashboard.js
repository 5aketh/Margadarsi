import Header from "./header";
import Calendar from "./calendar";
import { useEffect, useState } from "react";

export default function Dashboard() {
  // const [checked, setChecked] = useState(false);
  // const username = localStorage.getItem("username");

  // useEffect(() => {
  //   if (!username) {
  //     window.location.href = "/login";
  //   } else {
  //     setChecked(true);
  //   }
  // }, []);

  // if (!checked) {
  //   // Optionally show a loader or nothing while checking
  //   return null;
  // }

  function handleProfileClick() {
    const dropdown = document.getElementById('profile-dropdown');
    if (dropdown) {
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }
  }
  return (
    <div className="dash-container">
      <Header options={[
        { label: "Home", href: "/dashboard" },
        { label: "News", href: "/news" },
        { label: "Mentor", href: "/mentor" },
        { label: "Community", href: "/community" },
        { label: "Reference", href: "/reference" }
      ]} />

      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: '1000', borderRadius: '2vh', border: 'none', backgroundColor: '#ff6f61', color: 'white', cursor: 'pointer' }} onMouseOver={handleProfileClick} onMouseOut={handleProfileClick}>
        <img src='https://e7.pngegg.com/pngimages/321/296/png-clipart-computer-icons-user-svg-free-customers-miscellaneous-text-thumbnail.png' alt='Profile' style={{ width: '30px', height: '30px', borderRadius: '50%', verticalAlign: 'middle' }} />
        <div id='profile-dropdown' style={{ position: 'absolute', top: '40px', right: '0', display: 'none' /* Change to 'block' to show the dropdown */ }}>
          <ul style={{ listStyleType: 'none', margin: 0, padding: 0, backgroundColor: 'white', color: 'black', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
            <li style={{ padding: '8px 16px', borderBottom: '1px solid #ddd' }}>Profile</li>
            <li style={{ padding: '8px 16px', borderBottom: '1px solid #ddd' }}>Settings</li>
            <li style={{ padding: '8px 16px', borderBottom: '1px solid #ddd' }}>Logout</li>
          </ul>
        </div>
      </div>

      <div style={{ padding: '20px', marginTop: '80px', display: 'flex', flexWrap: 'wrap', justifyContent: 'start', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0' }}>Hi Saketh!!</h3>
          <p style={{ marginTop: '1vh', marginBottom: '3vh' }}>Welcome to your dashboard. Lets track your progress here.</p>
          <div className='dash-boxes' style={{ marginTop: '0', width: '55vw', height: '30vh' }}>
            Roadmap
          </div>
        </div>
        <div className="dash-boxes" style={{ marginTop: '0', width: '35vw', height: '40vh' }}>
          <Calendar />
        </div>
        <div className="dash-boxes" style={{ marginTop: '0', width: '25vw', height: '20vh' }}>
          <img src='/images/ai-chat.png' style={{ height: '60%', marginTop: '1vh', marginLeft: '1vw' }}/>
          <div style={{ marginLeft: '1vw', marginRight: '1vw' }}>
            <a style={{ fontSize: 'medium', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'none', color: 'black', display: 'flex', flexDirection: 'row' }} href="/interview">
              AI Mentor
              <div style={{ marginLeft: '0.2vw', marginTop: '0.1vh' }}>
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#000000">
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
                </svg>
              </div>
            </a>
            <p style={{ fontSize: 'small' }}>Chat with your own personalized AI mentor to get guidance</p>
          </div>
        </div>
        <div className="dash-boxes" style={{ marginTop: '0', width: '25vw', height: '20vh' }}>
          <img src='/images/chat.png' style={{ height: '60%', marginTop: '1vh', marginLeft: '1vw' }}/>
          <div style={{ marginLeft: '1vw', marginRight: '1vw' }}>
            <a style={{ fontSize: 'medium', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'none', color: 'black', display: 'flex', flexDirection: 'row' }} href="/interview">
              Community
              <div style={{ marginLeft: '0.2vw', marginTop: '0.1vh' }}>
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#000000">
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
                </svg>
              </div>
            </a>
            <p style={{ fontSize: 'small' }}>Stay active on our community and expand your network</p>
          </div>
        </div>
        <div className="dash-boxes" style={{ marginTop: '0', width: '25vw', height: '20vh' }}>
          <img src='/images/interview.png' style={{ height: '60%', marginTop: '1vh', marginLeft: '1vw' }}/>
          <div style={{ marginLeft: '1vw', marginRight: '1vw' }}>
            <a style={{ fontSize: 'medium', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'none', color: 'black', display: 'flex', flexDirection: 'row' }} href="/interview">
              AI Interview
              <div style={{ marginLeft: '0.2vw', marginTop: '0.1vh' }}>
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#000000">
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
                </svg>
              </div>
            </a>
            <p style={{ fontSize: 'small' }}>Practice with mock interview sessions and build your confidence and knowledge</p>
          </div>
        </div>
        <div className="dash-boxes" style={{ marginTop: '0', width: '12vw', height: '20vh', flexDirection: 'column' }}>
          <p style={{ fontSize: 'medium', width: '80%', textAlign: 'center' }}>Craft a resume using our AI</p>
          <button style={{ border: 'none', borderRadius: '2vh', padding: '2vh 2vw', backgroundColor: '#ff6f61', color: 'white' }}>Craft</button>
        </div>
      </div>
    </div>
  );
}
