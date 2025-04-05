import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SettingDropDown = () => {
  const navigate = useNavigate();
  const [dropped, setDropped] = useState(false);
  const [darkModeOn, setDarkModeOn] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("ColorMode");
    if (storedDarkMode != null) setDarkModeOn(storedDarkMode == "Dark");
  });

  function toggleDarkMode() {
    const newDark = !darkModeOn;
    setDarkModeOn(newDark);
    localStorage.setItem("ColorMode", newDark ? "Dark" : "Light");
  }
  function goToUserSettings() {
    navigate("/settings");
  }
  return dropped ? (
    <div className="absolute top-10 right-20 bg-cyan-600 p-2">
      <div className="bg-[#ec3f5b] p-10">
        {toggleButton(toggleDarkMode, darkModeOn)}
        <div>
          <button onClick={goToUserSettings}>Go To User Settings</button>
        </div>
        <div>
          <button onClick={() => setDropped(!dropped)}>Close Settings</button>
        </div>
      </div>
    </div>
  ) : (
    <button
      className="text-white text-4xl hover:brightness-90 transition-all focus:outline-none"
      onClick={() => setDropped(!dropped)}
      aria-label="Settings"
    >
      ⚙️
    </button>
  );
};

function toggleButton(setCallback: () => void, checked: boolean = false) {
  return (
    <div>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          onChange={setCallback}
          checked={checked}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Toggle me
        </span>
      </label>
    </div>
  );
}

export { SettingDropDown };
