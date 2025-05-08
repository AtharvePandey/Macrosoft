import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/polispacelogo.svg";
import { FeedScope } from "../datamodels";
import Feed from "@component/Feed";
import { SettingDropDown } from "@component/SettingDropDown";

const Home = () => {
  const [activeFeed, setActiveFeed] = useState<FeedScope>(FeedScope.Local);
  const navigate = useNavigate();

  const feedScopes = Object.values(FeedScope).filter(
    (value) => typeof value === "number"
  ) as FeedScope[];

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen font-sans">
      {/* Navbar */}
      <header className="text-white p-4 flex justify-between items-center sticky top-0 z-10 bg-[#ec3f5b]">
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="PoliSpace Logo"
            className="h-10 w-10"
            aria-hidden="true"
          />
          <h1 className="text-2xl font-bold">PoliSpace</h1>
        </div>
        <div className="flex items-center space-x-4">
        <SettingDropDown />
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white text-[#ec3f5b] rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex justify-center items-start p-6">
        <div className="bg-white shadow-sm rounded-lg w-full max-w-4xl">
          {/* Tab Navigation */}
          <div className="flex">
            {feedScopes.map((scope) => (
              <button
                key={scope}
                className={`flex-1 px-6 py-3 font-bold text-white text-lg transition-all
                  ${
                    activeFeed === scope
                      ? "border-b-4 border-black"
                      : "opacity-80"
                  }
                  hover:brightness-90`}
                style={{
                  backgroundColor:
                    scope === FeedScope.Local
                      ? "#ec3f5b"
                      : scope === FeedScope.State
                      ? "#6A5ACD"
                      : "#1E3A8A",
                }}
                onClick={() => setActiveFeed(scope)}
              >
                {FeedScope[scope]}
              </button>
            ))}
          </div>

          {/* Fancy Placeholder Area */}
          <div className="p-6">
            <Feed feedScope={activeFeed}></Feed>
          </div>
        </div>
      </div>

      {/* Bottom Navigation (for mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around items-center p-2">
        <a
          href="/"
          className="flex flex-col items-center text-[#ec3f5b] p-2"
        >
          <span className="text-xs">Home</span>
        </a>
        <a
          href="/settings"
          className="flex flex-col items-center text-gray-600 p-2"
        >
          <span className="text-xs">Settings</span>
        </a>
        <a
          href="/createpost"
          className="flex flex-col items-center text-gray-600 p-2"
        >
          <span className="text-xs">Create Post</span>
        </a>
      </nav>
    </div>
  );
};

export default Home;