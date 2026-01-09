import { useState, useEffect } from "react";
import "./App.css";
import About from "./components/About";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import Alert from "./components/Alert";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { themes, getTheme } from "./themes";

function App() {
  const [themeName, setThemeName] = useState(() => {
    return localStorage.getItem("textforge-theme") || "pink";
  });
  const [theme, setTheme] = useState(getTheme(themeName));
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("textforge-theme") || "pink";
    setThemeName(savedTheme);
    setTheme(getTheme(savedTheme));
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = theme.bodyBg;
    document.body.style.transition = "background-color 0.3s ease";
    document.documentElement.setAttribute("data-theme", themeName);
  }, [theme, themeName]);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const changeTheme = (newThemeName) => {
    setThemeName(newThemeName);
    const newTheme = getTheme(newThemeName);
    setTheme(newTheme);
    localStorage.setItem("textforge-theme", newThemeName);
    showAlert(`${newTheme.name} theme activated`, "success");
  };

  return (
    <>
      <Router>
        <Navbar
          title="TextForge"
          theme={theme}
          themeName={themeName}
          changeTheme={changeTheme}
          themes={themes}
        />
        <Alert alert={alert} theme={theme} />
        <div className="my-3">
          <Routes>
            <Route path="/about" element={<About theme={theme} />} />
            <Route
              path="/"
              element={
                <TextForm
                  showAlert={showAlert}
                  heading="Enter the text to analyze below"
                  theme={theme}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
