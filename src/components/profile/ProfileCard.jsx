import React, { useState } from "react";
import "./profilecard.css";

const ProfileCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    profilePic: "/images/profile.png",
    name: "John Doe",
    username: "@johndoe",
    bio: "Real estate enthusiast | Home buyer & seller",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    location: "New York, USA",
    dob: "1995-06-15",
    gender: "Male",
    language: "English",
    social: {
      facebook: "https://facebook.com/johndoe",
      twitter: "https://twitter.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
    },
  });

  const handleEdit = () => setIsEditing(!isEditing);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={user.profilePic} alt="User" className="profile-pic" />
        
        {isEditing ? (
          <div className="profile-info">
            <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
            <input type="text" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
            <textarea value={user.bio} onChange={(e) => setUser({ ...user, bio: e.target.value })} />
            <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
            <input type="text" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
            <input type="text" value={user.location} onChange={(e) => setUser({ ...user, location: e.target.value })} />
            <input type="date" value={user.dob} onChange={(e) => setUser({ ...user, dob: e.target.value })} />
            <select value={user.gender} onChange={(e) => setUser({ ...user, gender: e.target.value })}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <select value={user.language} onChange={(e) => setUser({ ...user, language: e.target.value })}>
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        ) : (
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p>{user.username}</p>
            <p>{user.bio}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.location}</p>
            <p>DOB: {user.dob}</p>
            <p>Gender: {user.gender}</p>
            <p>Language: {user.language}</p>
          </div>
        )}

        <button className="edit-btn" onClick={handleEdit}>
          {isEditing ? "Save" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
