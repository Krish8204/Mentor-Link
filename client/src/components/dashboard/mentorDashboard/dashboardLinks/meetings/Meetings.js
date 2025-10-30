import React, { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { authContext } from "../../../../../contexts/authContext";
import { Roles } from "../../../../../utility";
import MeetingForm from "./meetingForm/MeetingForm";
import MeetingTile from "./meetingTile/MeetingTile";

// Add this CSS in your component's stylesheet or in a <style> tag
const styles = `
  .meetings-container {
    display: flex;
    height: 100%;
    gap: 24px;
    padding: 16px;
    max-width: 1280px;
    margin: 0 auto;
    position: relative;
  }

  .meetings-list {
    flex: 1;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    background: #fff;
    transition: all 0.3s ease;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .meetings-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    border-bottom: 1px solid #f0f0f0;
    background: #ffffff;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .meetings-header h3 {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .meetings-count {
    background: #f4f5f7;
    color: #5e6c84;
    font-weight: 600;
    font-size: 14px;
    padding: 4px 12px;
    border-radius: 16px;
    min-width: 32px;
    text-align: center;
    transition: all 0.3s ease;
  }

  .meetings-list-content {
    padding: 16px;
    overflow-y: auto;
    flex: 1;
  }

  .meetings-form-container {
    width: 380px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    height: 100%;
    overflow-y: auto;
    transition: all 0.3s ease-in-out;
  }

  /* Smooth animation for meeting tiles */
  .meeting-tile-enter {
    opacity: 0;
    transform: translateY(20px);
  }

  .meeting-tile-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.3s, transform 0.3s;
  }

  /* Add this to your existing MeetingTile component */
  .meeting-tile {
    margin-bottom: 16px;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.4s forwards;
    animation-delay: calc(var(--animation-order) * 0.1s);
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Responsive design */
  @media (max-width: 1024px) {
    .meetings-container {
      flex-direction: column;
    }
    
    .meetings-form-container {
      width: 100%;
      margin-top: 16px;
    }
  }
`;

const Meetings = () => {
    // getting user role
    const { role } = useContext(authContext);
    // global meeting state
    const { meetings } = useSelector((state) => state.meeting);

    // meeting state
    const [meeting, setMeeting] = useState({
        id: "",
        participants: [],
        description: "",
        url: "",
        date: null,
        minutes: "",
    });

    // For animation purposes
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
        
        // Add the style sheet to the document
        const styleSheet = document.createElement("style");
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
        
        return () => {
            document.head.removeChild(styleSheet);
        };
    }, []);

    const sortedMeetings = [...(meetings || [])].sort((a, b) => {
        return a.createdAt < b.createdAt ? 1 : -1;
    });

    return (
        <div className="meetings-container">
            <div className={`meetings-list ${mounted ? 'fade-in' : ''}`}>
                <div className="meetings-header">
                    <h3>All Meetings</h3>
                    <div className="meetings-count">{meetings.length}</div>
                </div>
                <div className="meetings-list-content">
                    {sortedMeetings.map((meet, index) => (
                        <div 
                            key={meet._id} 
                            className="meeting-tile" 
                            style={{"--animation-order": index}}
                        >
                            <MeetingTile {...meet} setMeeting={setMeeting} />
                        </div>
                    ))}
                    
                    {sortedMeetings.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No meetings found
                        </div>
                    )}
                </div>
            </div>
            
            {role === Roles.MENTOR && (
                <div className={`meetings-form-container ${mounted ? 'fade-in' : ''}`}>
                    <MeetingForm meeting={meeting} setMeeting={setMeeting} />
                </div>
            )}
        </div>
    );
};

export default Meetings;