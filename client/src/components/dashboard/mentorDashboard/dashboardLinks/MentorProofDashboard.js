import React, { useEffect, useState } from "react";

const MentorProofDashboard = () => {
  const [mentors, setMentors] = useState([]);
  const [fullScreenImage, setFullScreenImage] = useState(null);

  // Static entry for a mentor
  const staticMentor = {
    firstName: "Krish",
    lastName: "Vaghasiya",
    email: "22it151@charusat.edu.in",
    qualificationProof: {
      url: "https://res.cloudinary.com/dz1w9jjp4/image/upload/v1741669809/mentor_qualifications/irkteqjfzz5qpq8jofcv.png"
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/admin/mentor-proof", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Combine static entry with fetched data
        setMentors([staticMentor, ...data]);
      })
      .catch((error) => {
        // If fetch fails, still show the static entry
        console.error("Error fetching mentor proofs:", error);
        setMentors([staticMentor]);
      });
  }, []);

  // Full-screen image overlay styles
  const fullScreenOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    cursor: 'pointer'
  };

  const fullScreenImageStyle = {
    maxWidth: '90%',
    maxHeight: '90%',
    objectFit: 'contain'
  };

  const containerStyle = {
    fontFamily: "'Inter', sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f4f6f9"
  };

  const headerStyle = {
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "24px",
    fontWeight: "600"
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "white"
  };

  const thStyle = {
    backgroundColor: "#3498db",
    color: "white",
    padding: "12px 15px",
    textAlign: "left",
    fontWeight: "600"
  };

  const tdStyle = {
    padding: "12px 15px",
    borderBottom: "1px solid #e0e0e0",
    verticalAlign: "middle"
  };

  const emptyRowStyle = {
    ...tdStyle,
    textAlign: "center",
    color: "#7f8c8d"
  };

  const linkStyle = {
    color: "#3498db",
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.3s ease"
  };

  const imageStyle = {
    borderRadius: "4px",
    maxWidth: "100px",
    height: "auto",
    objectFit: "cover",
    cursor: "pointer",
    transition: "transform 0.3s ease"
  };

  // Handle opening full-screen image
  const handleImageClick = (imageUrl) => {
    setFullScreenImage(imageUrl);
  };

  // Handle closing full-screen image
  const handleCloseFullScreen = () => {
    setFullScreenImage(null);
  };

  return (
    <div style={containerStyle}>
      {/* Full-screen image overlay */}
      {fullScreenImage && (
        <div 
          style={fullScreenOverlayStyle} 
          onClick={handleCloseFullScreen}
        >
          <img 
            src={fullScreenImage} 
            alt="Full Screen Proof" 
            style={fullScreenImageStyle}
          />
        </div>
      )}

      <h2 style={headerStyle}>Mentor Qualification Proofs</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Qualification Proof</th>
          </tr>
        </thead>
        <tbody>
          {mentors.length > 0 ? (
            mentors.map((mentor) => (
              <tr key={mentor.email}>
                <td style={tdStyle}>{mentor.firstName} {mentor.lastName}</td>
                <td style={tdStyle}>{mentor.email}</td>
                <td style={tdStyle}>
                  {mentor.qualificationProof?.url ? (
                    mentor.qualificationProof.url.endsWith(".pdf") ? (
                      <a 
                        href={mentor.qualificationProof.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          ...linkStyle,
                          ':hover': { color: '#2980b9' }
                        }}
                      >
                        View PDF
                      </a>
                    ) : (
                      <img 
                        src={mentor.qualificationProof.url} 
                        alt="Proof" 
                        onClick={() => handleImageClick(mentor.qualificationProof.url)}
                        style={{
                          ...imageStyle,
                          ':hover': { transform: 'scale(1.05)' }
                        }}
                      />
                    )
                  ) : (
                    <span style={{ color: "#e74c3c" }}>Not Uploaded</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={emptyRowStyle}>No mentor proofs available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MentorProofDashboard;