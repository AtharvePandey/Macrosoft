import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/polispacelogo.svg';
import { FeedScope } from "../datamodels";

const Home = () => {
  const [activeFeed, setActiveFeed] = useState<FeedScope>(FeedScope.Local);
  const navigate = useNavigate();

  const feedScopes = Object.values(FeedScope)
    .filter(value => typeof value === 'number') as FeedScope[];

  return (
    <div className="bg-[#F5F5F5] min-h-screen font-sans">
      {/* Navbar */}
      <header 
        className="text-white p-4 flex justify-between items-center sticky top-0 z-10" 
        style={{ backgroundColor: '#ec3f5b' }}
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
        <button 
          className="text-white text-4xl hover:brightness-90 transition-all focus:outline-none"
          onClick={() => navigate('/settings')}
          aria-label="Settings"
        >
          ⚙️
        </button>
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
                  ${activeFeed === scope ? "border-b-4 border-black" : "opacity-80"}
                  hover:brightness-90`}
                style={{
                  backgroundColor:
                    scope === FeedScope.Local ? "#ec3f5b" :
                    scope === FeedScope.State ? "#6A5ACD" :
                    "#1E3A8A",
                }}
                onClick={() => setActiveFeed(scope)}
              >
                {FeedScope[scope]}
              </button>
            ))}
          </div>

          {/* Fancy Placeholder Area */}
          <div className="p-6">
            <div className="text-center py-12">
              <h2 className="text-xl font-bold text-gray-700 mb-2">
                {FeedScope[activeFeed]} Feed Component
              </h2>
              <p className="text-gray-500">
                This space will contain the {FeedScope[activeFeed].toLowerCase()} feed content.
                <br />
                The Feed component with Post and Comment components will be rendered here.
              </p>
              <div className="mt-6 border-2 border-dashed border-gray-300 rounded-lg p-8">
                <p className="text-gray-400">
                  Future implementation area for:
                  <br />
                  - Post components
                  <br />
                  - Comment sections
                  <br />
                  - Interactive elements
                  <br />
                  - {FeedScope[activeFeed]}-specific content
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;