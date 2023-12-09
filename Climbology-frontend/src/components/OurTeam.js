import React from 'react';
import './OurTeam.css'; // Import the CSS file for styling

function OurTeam() {
  return (
    <div className="our-team-container">
      <h1>Our Team</h1>
      <div className="team-member">
        <h2>Ricky Sun - Team Member</h2>
        <p>Second Year Master of Data Science Student at Vanderbilt University</p>
        <p>qifeng.sun@vanderbilt.edu</p>
      </div>
      <div className="team-member">
        <h2>Yuning Wu - Team Member</h2>
        <p>Second Year Master of Data Science Student at Vanderbilt University</p>
        <p>yuning.wu@vanderbilt.edu</p>
      </div>
      {/* Add more team members here */}
    </div>
  );
}

export default OurTeam;
