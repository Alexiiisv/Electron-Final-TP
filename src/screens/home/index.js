import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../logo.svg";
import "../../App.css";

const Home = () => {
  const [path, setPath] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    document.getElementById("path").innerHTML = path;
    if (!path) return;
    navigate("/about", { state: { path: path[0] } });
    return () => {
      setPath("");
    };
  }, [path]);

  useEffect(() => {}, []);

  return (
    <div>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p id="path">
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button
            onClick={() => {
              window.dialog.open();
              window.dialog.getSavedPath(setPath);
            }}
          >
            Get beatmap
          </button>

          <button
            onClick={() => {
              window.dialog.removeSavedPath();
              window.dialog.getSavedPath(setPath);
            }}
          >
            create new beatmap
          </button>
          <h1>Page Home</h1>
          <div style={{ display: "none" }}>
            <Link to="/about">Vers Page About (Methode avec Link)</Link>
            <div>
              <button onClick={() => navigate("/about")}>
                Vers Page About (Methode avec navigate)
              </button>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Home;
