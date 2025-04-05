import { useState } from "react";
import logo from "../assets/polispacelogo.svg";
import { FeedScope } from "../datamodels";
import Feed from "@component/Feed";
import { SettingDropDown } from "@component/SettingDropDown";

const Home = () => {
  const [activeFeed, setActiveFeed] = useState<FeedScope>(FeedScope.Local);

  const feedScopes = Object.values(FeedScope).filter(
    (value) => typeof value === "number"
  ) as FeedScope[];

  return (
    <div className="bg-[#F5F5F5] min-h-screen font-sans">
      {/* Navbar */}
      <header
        className="text-white p-4 flex justify-between items-center sticky top-0 z-10 bg-[#ec3f5b]"
        // style={{ backgroundColor: "#ec3f5b" }}
      >
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="PoliSpace Logo"
            className="h-10 w-10"
            aria-hidden="true"
          />
          <h1 className="text-2xl font-bold">PoliSpace</h1>
        </div>
        <SettingDropDown />
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
    </div>
  );
};

export default Home;
