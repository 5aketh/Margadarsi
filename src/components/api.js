const API_BASE_URL = 'http://127.0.0.1:5000';

// ---------------- LOGIN ----------------
export const loginUser = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  if (data.message === 'Wrong credentials') {
    alert('Invalid credentials');
    return null;
  } else {
    localStorage.setItem('user_data', response);
  }

  return data;
};

// ---------------- SIGNUP (not in backend yet) ----------------
export const signupUser = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/api/signup`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

// ---------------- NEWS ----------------
export const scrapeNews = async (keyword) => {
  const response = await fetch(`${API_BASE_URL}/api/news`, {
    method: 'POST', // ✅ must be POST in backend
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ keyword }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

// ---------------- JOBS ----------------
export const scrapeJobs = async (keyword, location, experience) => {
  const response = await fetch(`${API_BASE_URL}/api/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // ✅ fixed typo
    },
    body: JSON.stringify({ keyword, location, experience }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

// ---------------- QUESTIONS ----------------
export const getQuestions = async (keyword, location, experience) => {
  const response = await fetch(`${API_BASE_URL}/api/questions`, {
    method: 'POST', // ✅ must be POST in backend
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ keyword, location, experience }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

// ---------------- INTERVIEW RESULT ----------------
export const sendVideoUrl = async (url, keyword, location, experience) => {
  const response = await fetch(`${API_BASE_URL}/api/interview_result`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, keyword, location, experience }), // ✅ matches backend
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
