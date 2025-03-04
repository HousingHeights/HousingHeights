import React, { useState, useEffect } from "react";
import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    role: "agent",
    email: "",
    recentActivity: "",
    userType: "agent",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user"); 
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const getGradientClass = () => {
    switch (user.userType) {
      case "buyer":
        return "gradient-buyer";
      case "seller":
        return "gradient-seller";
      case "agent":
        return "gradient-agent";
      default:
        return "gradient-default";
    }
  };

  return (
    <section className="vh-100 profile-section">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-6 mb-4 mb-lg-0">
            <div className="card mb-3 profile-card">
              <div className="row g-0">
                <div
                  className={`col-md-4 text-center text-white ${getGradientClass()}`}
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                    alt="Avatar"
                    className="img-fluid my-5"
                    style={{ width: "80px" }}
                  />
                  <h5>{user.name || "Veera"}</h5>
                  <p>{user.role || "seller"}</p>
                  
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">{user.email || "veera1299@gmail.com"}</p>
                      </div>
                    </div>
                    <h6>Properties Upload/Listed</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        {/* <h6>{user.recentActivity || "villa-1233"}</h6> */}
                        <h6>{user.recentActivity || "No properties upload."}</h6>
                        <p className="text-muted">
                          
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
