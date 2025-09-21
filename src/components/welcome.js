import Header from "./header";
import Boxs from "./box";

export default function Welcome() {
  return (
    <>
      <Header options={[
        { label: "Home", href: "#" },
        { label: "About", href: "#about" },
        { label: "Workflow", href: "#workflow" },
        { label: "Features", href: "#features" },
        { label: "Contact", href: "#contact" }
      ]}/>
      
      <a style={{ position: 'fixed', top: '20px', right: '20px', zIndex: '1000', padding: '10px 20px', fontSize: 'medium', borderRadius: '20px', border: 'none', backgroundColor: '#ff6f61', color: 'white', cursor: 'pointer', textDecoration: 'none' }} href="./login">Login</a>

      <div class="container container1">
        <div class="welcome">
        <h3>Welcome to</h3>
        <h1>Margadarsi</h1>
        <p style={{ fontSize: 'large' }}>Unlock personalized career paths and skill development plans with our AI-driven advisor. Start your journey today!</p>
        <button style={{ padding: '10px 20px', fontSize: 'medium', borderRadius: '20px', border: 'none', backgroundColor: '#ff6f61', color: 'white', cursor: 'pointer' }}>Get Started</button>
        </div>
        <div>
        <img src="https://media.istockphoto.com/id/1494976167/vector/professional-business-adviser-provides-solutions-for-business.jpg?s=612x612&w=0&k=20&c=fGJs2LrkGvFGmaJesCyP_9hN6fn-m_nyyJfIB5PcB_U=" alt="img"/>
        </div>
      </div>

      <div class="container container2" id="about">
        <h4 style={{ paddingTop: '3%', marginBottom: '-0%' }}>About Us</h4>
        <p style={{ maxWidth: '80vw', textAlign: 'left', fontSize: 'medium' }}>Students in India often face a bewildering array of career choices, compounded by generic guidance that fails to account for their unique interests, aptitudes, and the rapidly evolving job market. The traditional approach to career counseling struggles to keep pace with the emergence of new job roles and the specific skills required to succeed in them. This leaves many students feeling lost and unprepared, creating a critical need for a more dynamic, personalized, and insightful advisory tool.</p>
        <p style={{ maxWidth: '80vw', textAlign: 'left', fontSize: 'medium', marginTop: '0.2%' }}>At Margadarsi, we are dedicated to empowering individuals to achieve their career goals through personalized guidance and support. Our team of experienced advisors leverages cutting-edge technology to provide tailored solutions that meet the unique needs of each client. Whether you're just starting out or looking to advance your career, we're here to help you navigate the path to success.</p>
      </div>  

      <div class="container container2" id="workflow">
        <h4 style={{ paddingTop: '3%', marginBottom: '2%' }}>Workflow</h4>
        <div style={{ display: 'flex', flexDirection: 'row', maxWidth: '80%', flexWrap: 'wrap', justifyContent: 'center'  }}>
          <Boxs 
            count={4}
            imageNames={["user-check.png", "explore.png", "learn.png", "ahead.png"]}
            titles={["Discover Yourself", "Explore Your Options", "Build Your Skills", "Stay Ahead"]}
            description={[
              "Take our personalized, AI-powered assessment to uncover your unique interests, aptitudes, and strengths.",
              "Receive a curated list of career paths perfectly matched to your profile, with detailed insights.",
              "Get a custom learning roadmap outlining the specific skills, courses, and projects you need to succeed.",
              "Access real-time job market data and future-proof your career with insights on emerging roles."
            ]} 
          />
        </div>
      </div>

      <div class="container container2" id="features">
        <h4 style={{ paddingTop: '3%', marginBottom: '2%' }}>Features</h4>
        <div style={{ display: 'flex', flexDirection: 'row', maxWidth: '80%', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '5%'  }}>
          <Boxs
            count={7}
            imageNames={["plan.png", "insight.png", "road-map.png", "ai-chat.png", "chat.png", "interview.png", "news.png"]}
            titles={["AI-Powered Personalization", "Real-time Market Insights", "Actionable Roadmaps", "24/7 Expert Chat", "Community Chat", "Interview Practice", "Latest Updates"]}
            description={[
              "We go beyond generic advice. Our system uses Google Cloud's generative AI to create a profile as unique as you are.",
              "Our data is always up-to-date, ensuring your career path is based on the latest industry demands and salary trends.",
              "We don't just tell you what to do; we show you how to do it with step-by-step guidance on skills and learning resources.",
              "Our friendly AI chatbot is always available to answer your specific career questions, from interview prep to industry trends.",
              "Join a vibrant community of learners and professionals to share experiences, advice, and opportunities.",
              "Access our huge libreray of interview questoins and even have ono-on-one mock interviews with our AI and get reports in seconds.",
              "Our news corner brings you the latest news in the job market to keep you updated."
            ]} 
          />
        </div>
      </div>

      <div style={{ height: '20vh', width: '100%', backgroundColor: '#4a4a4a', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} id="contact">
        <p style={{ fontSize: 'medium' }}>From any quries reach out to us on</p>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <img src="./images/mail.png" alt="" className="contacts" onclick="window.location.href='mailto:bakraguy@gmail.com';"/>
          <img src="./images/phone.png" alt="" className="contacts" onclick="window.location.href='tel:+919999999999';"/>
          <img src="./images/insta.png" alt="" className="contacts" onclick="window.location.href='https://www.instagram.com';"/>
          <img src="./images/fb.png" alt="" className="contacts" onclick="window.location.href='https://www.facebook.com';"/>
        </div>
        <p style={{ fontSize: 'small' }}>We are here to help you!</p>
      </div>
    </>
  );
}
