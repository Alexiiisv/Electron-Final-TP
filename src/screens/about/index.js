import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../App.css";
import TableCustom from "../../components/tableCustom";
import { BeatmapDecoder } from "osu-parsers";

const About = (props) => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const decoder = new BeatmapDecoder();

  useEffect(() => {
    console.log(content);
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

  if (loading) {
    return (
      <>
        <p>loading</p>
        <Link to="/">Home page</Link>
      </>
    );
  }
  // valeur à récupérer: [General], [Editor], [Metadata], [Difficulty], [Events], [TimingPoints], [Colours], [HitObjects]

  // fonction qui retourne la chaine de caractère entre 2 autres chaine de caractère
  /* exemple: string_between_strings("[General]", "[Editor]", content)
    retourne: "AudioFilename: 01 - The Beginning.mp3
    AudioLeadIn: 0
    PreviewTime: 0
    Countdown: 0
    SampleSet: Soft
    StackLeniency: 0.7
    Mode: 0
    LetterboxInBreaks: 0
    SpecialStyle: 0
    WidescreenStoryboard: 0"
  */
  const string_between_strings = (startStr, endStr, str) => {
    var pos = str.indexOf(startStr) + startStr.length + 2; // position de la fin de startStr

    // si endStr est vide, on retourne la fin de la chaine avec les sauts de ligne remplacés par des <br>
    if (endStr === "") return str.substring(pos).replace(/\n/g, "<br>");

    // on récupère la chaine entre startStr et endStr et on remplace les sauts de ligne par des <br>
    str = str.substring(pos, str.indexOf(endStr, pos) - 4).replace(/\n/g, ",");
    // console.log(str);
    return str;
  };
  return (
    <div>
      <header className="App-header">
        <h1>Page About</h1>
        <Link to="/">Home page</Link>
        <div style={{ display: "none" }}>
          <button onClick={() => navigate("/")}>
            Vers Page Home (Methode avec navigate)
          </button>
        </div>
        <div>
          <TableCustom
            title={"General"}
            content={string_between_strings("[General]", "[Editor]", content)}
            id={0}
          />
          <TableCustom
            title={"Editor"}
            content={string_between_strings("[Editor]", "[Metadata]", content)}
            id={1}
          />
        </div>
      </header>
    </div>
  );
};

export default About;
