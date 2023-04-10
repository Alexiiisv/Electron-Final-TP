import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../logo.svg";
import "../../App.css";

const Home = () => {
  const [path, setPath] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
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
          <h1>Osu Beatmap</h1>
          <button
            onClick={() => {
              window.dialog.open();
              window.dialog.getSavedPath(setPath);
            }}
          >
            Choose the beatmap
          </button>
        </header>
      </div>
    </div>
  );
};

export default Home;
