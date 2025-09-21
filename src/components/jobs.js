import { useState, useEffect } from 'react';
import { scrapeJobs } from './api.js';
import Header from "./header";

export default function Reference({ keyword='python', location = '', experience = '0'}) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Unique cache key based on search params
  const cacheKey = `jobs_${keyword}_${location}_${experience}`;

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      setError(null);
      setJobs([]);

      // Try to get from localStorage cache first
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setJobs(JSON.parse(cached));
        setLoading(false);
        return;
      }

      try {
        const data = await scrapeJobs(keyword, location, experience);
        setJobs(data);
        // Store in localStorage cache
        localStorage.setItem(cacheKey, JSON.stringify(data));
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, [keyword, location, experience, cacheKey]);

  return (
    <>
      <div className="dash-container">
        <Header options={[
          { label: "Home", href: "/dashboard" },
          { label: "News", href: " /news" },
          { label: "Mentor", href: "/mentor" },
          { label: "Community", href: "/community" },
          { label: "Reference", href: "/reference" }
        ]} />

        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {jobs.length > 0 && (
          <div style={{ width: '80%', height: '100%', alignSelf: 'center', overflowY: 'scroll', scrollbarWidth: 'none' }}>
            <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: 0 }}>
              {jobs.map((job, index) => (
                <div key={index} className='news-container'>
                  <a href={job.link} target="_blank" rel="noopener noreferrer">
                    <h3>
                      {job.title}
                    </h3>
                    <p>
                      {job.company} | {job.posted_time}
                    </p>
                    <h4>
                      {job.description}
                    </h4>
                    <div>
                      {job.more_skills.map((skill, idx) => (
                        <span key={idx} className="skill-badge">{skill}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', marginTop: '10px', color: '#000' }}>
                      <div style={{ marginRight: '2%' }}>{job.location}</div>
                      <div style={{ marginRight: '2%' }}>{job.experience}</div>
                      <div>{job.salary}</div>
                    </div>
                  </a>
                </div>
              ))}
            </ul>
          </div>
        )}
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
  