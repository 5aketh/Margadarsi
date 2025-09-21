// import { GoogleLogin } from '@react-oauth/google';
import Slide from "./slide";
import { loginUser } from "./api";
// import { useState } from "react";

export default function Login() {
  // const [googleToken, setGoogleToken] = useState(null);

  function togglePassword() {
    const passwordField = document.getElementById("password");
    const toggleButton = document.querySelector(".toggle-btn");
    if (passwordField.type === "password") {
      // alert("show");
      passwordField.type = "text";
      passwordField.style.width = "85%";
      toggleButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff6f61"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>`;
    } else {
      passwordField.type = "password";
      toggleButton.innerHTML =  `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff6f61"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>`;
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    try {
      const result = await loginUser(username, password);
      if (result === null) return; // Login failed, do not redirect\
      localStorage.setItem("username", JSON.stringify(result[0]));
      window.location.href = result[0] + "/dashboard";
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  }

  // function handleGoogleSuccess(credentialResponse) {
    // setGoogleToken(credentialResponse.credential);
    // You can store this token in context or localStorage for use in Calendar
    // Redirect to dashboard or calendar page if needed
  // }

  // function handleGoogleError() {
  //   alert('Google login failed');
  // }

  return (
    <>
    <div style={{ zIndex: '1000', width: 'maxContent', position: 'fixed', top: '20%', left: '10%' }}>
        <h1 style={{ margin: '0%' }}>Welcome Back!</h1>
        <p style={{ margin: '0%', marginTop: '5%' }}>Log in to your account to continue enjoying our features.</p>
    </div>
    <div class="login-container">
        <div class="login-box left-box">
        <Slide 
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

        <div class="login-box right-box">
        <div style={{ height: '60px', display: 'flex', flexDirection: 'row', alignContent: 'center', position: 'relative', marginBottom: '15%' }}>
            <img src="./images/logo.png" alt="" style={{ height: '50px', margin: '0' }}/>
            <h3 style={{ margin: '0', marginLeft: '5%' }}>Margadarsi</h3>
        </div>
        <form>
            <div class="input-group">
              <input type="text" placeholder="Username / Phone" id='username' required/>
            </div>
            <div class="input-group" style={{ marginBottom: '5%' }}>
              <input type="password" id="password" placeholder="Password" required/>
              <button type="button" class="toggle-btn" onClick={ togglePassword }>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff6f61">
                    <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/>
                  </svg>
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'self-end' }}>
            <a href="./signup" class="create">Create Account</a>
            <button type="submit" onClick={handleSubmit}>Login</button>
            </div>
        </form>
        <hr style={{ margin: '0%', marginTop: '5%' }}/>
        <p style={{ padding: '0%', margin: '0%', backgroundColor: '#fff', fontSize: 'small', position: 'relative', top: '-2.3%', left: '50%', width: 'min-content' }}>or</p>
        <p style={{ margin: '0%', marginBottom: '2%', fontSize: 'small', justifySelf: 'center' }}>Continue with</p>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <img src="https://static.vecteezy.com/system/resources/previews/022/613/021/non_2x/google-mail-gmail-icon-logo-symbol-free-png.png" alt="Google" style={{ height: '30px', margin: '10px', cursor: 'pointer', fontSize: 'small', border: '2px solid #000', borderRadius: '50%' }}/>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokEYt0yyh6uNDKL8uksVLlhZ35laKNQgZ9g&s" alt="Linkedin" style={{ height: '30px', margin: '10px', cursor: 'pointer', fontSize: 'small', border: '2px solid #000', borderRadius: '50%' }}/>
            <img src="https://cdn-icons-png.flaticon.com/512/3291/3291667.png" alt="Github" style={{ height: '30px', margin: '10px', cursor: 'pointer', fontSize: 'small', border: '2px solid #000', borderRadius: '50%' }}/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png" alt="Facebook" style={{ height: '30px', margin: '10px', cursor: 'pointer', fontSize: 'small', border: '2px solid #000', borderRadius: '50%' }}/>
        </div>
        </div>
    </div>
    </>
  );
}