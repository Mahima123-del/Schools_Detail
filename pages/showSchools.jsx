import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch('/api/getSchools')
      .then(res => res.json())
      .then(data => setSchools(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      {/* ====== Header Section ====== */}
      <header className="site-header">
        <div className="logo">SchoolDB</div>
        <nav>
          <a href="/addSchool">Add School</a>
          <a href="/showSchools">Show Schools</a>
        </nav>
        <div className="header-actions">
          <button className="btn btn-login">Login</button>
          <button className="btn btn-signup">Sign Up</button>
        </div>
      </header>

      {/* ====== Banner Section ====== */}
      <div className="banner">
        <img src="/images/bg1.avif" alt="Schools Banner" className="banner-img" />
        <h1 className="banner-text">All Schools</h1>
      </div>

      {/* ====== Page Content ====== */}
      <div className="page-content">
        <div className="heading"><h1>Schools Detail</h1></div>
        <div className="school-list">
          {schools.map((school) => (
            <div key={school.id} className="school-card">
              <div className="card-header">
                <img src={`/schoolImages/${school.image}`} alt={school.name} />
              </div>
              <div className="card-body">
                <h3>{school.name}</h3>
                <p>{school.address}, {school.city}</p>
                <button className="btn-details">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
