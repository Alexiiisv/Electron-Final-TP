import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../App.css";
import { BeatmapDecoder } from "osu-parsers";
import { Canvas } from "./style";
import { Vector2, HitObject } from "osu-classes";

const About = () => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [beatmap, setBeatmap] = useState({});
  const [background, setBackground] = useState("");
  const location = useLocation();
  const decoder = new BeatmapDecoder();

  useEffect(() => {
    const before_ = location.state.path.substring(
      0,
      location.state.path.lastIndexOf("\\")
    );
    if (content === "") return;
    const beatmap2 = decoder.decodeFromString(content, {
      parseGeneral: true,
      parseEditor: true,
      parseMetadata: true,
      parseDifficulty: true,
      parseEvents: true,
      parseTimingPoints: true,
      parseHitObjects: true,
      parseStoryboard: true,
      parseColours: true,
    });
    setBeatmap(beatmap2);
    setBackground(before_ + "\\" + beatmap2["events"].backgroundPath);

    console.log(beatmap2);
  }, [content]);

  useEffect(() => {
    if (location.state && location.state.path) {
      window.dialog.read(location.state.path, setContent);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  //Essai de chargement de l'image non fonctionnel
  useEffect(() => {
    console.log(background);
    setTimeout(() => {
      console.log("aaa");
      var bg = new Image();
      bg.src = background;
      bg.onload = function () {
        document.getElementById("canvas").getContext("2d").drawImage(bg, 0, 0);
      };
    }, 1500);
  }, [background]);

  if (loading) {
    return (
      <>
        <p>loading</p>
        <Link to="/">Home page</Link>
      </>
    );
  }
  // valeur à récupérer: [General], [Editor], [Metadata], [Difficulty], [Events], [TimingPoints], [Colours], [HitObjects] //obsolete

  return (
    <div>
      <header className="App-header">
        <h1>Beatmap</h1>
        <h3>
          {beatmap["metadata"].title} - {beatmap["metadata"].artist}
        </h3>
        <Link to="/">Return</Link>
        <div>
          <Canvas
            // img={
            //   "C:\\Users\\Alexis\\AppData\\Local\\osu!\\Songs\\1854021 himmel - Empyrean\\FIRIKA BG.jpg"
            // }
            id="canvas"
            onMouseDown={(event) => {
              var canvas = document.getElementById("canvas");
              var ctx = canvas.getContext("2d");
              const element = event.target;
              let rect = element.getBoundingClientRect();
              let x = event.clientX - rect.left;
              let y = event.clientY - rect.top;
              var point = new Vector2(Math.floor(x), y);
              const hitObject = new HitObject(point);
              hitObject["startPosition"] = point;
              console.log(beatmap["hitObjects"].slice(-1)[0].startTime);
              hitObject["startTime"] =
                beatmap["hitObjects"].slice(-1)[0].startTime + 10;
              beatmap["hitObjects"].push(hitObject);
              window.dialog.writeEndFile(
                location.state.path,
                hitObject.startPosition +
                  "," +
                  hitObject.startTime +
                  ",1,0,0:0:0:0:\n"
              );
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              beatmap["hitObjects"].slice(-10).forEach((hitObject) => {
                console.log(hitObject);
                ctx.fillRect(
                  hitObject.startPosition.x / 2.15,
                  hitObject.startPosition.y / 2.35,
                  5,
                  5
                );
              });
              console.log(
                "Coordinate x: " + Math.floor(x),
                "Coordinate y: " + y,
                "\nId du hitpoint ",
                beatmap["hitObjects"].length - 1,
                beatmap["hitObjects"][beatmap["hitObjects"].length - 1],
                beatmap
              );
            }}
          />
        </div>
      </header>
    </div>
  );
};

export default About;
