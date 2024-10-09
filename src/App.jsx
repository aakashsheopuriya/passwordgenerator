import { useState, useCallback, useEffect, useRef } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(4);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordref = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$&*(){}[]:";

    for (let index = 1; index <= length; index++) {
      let Char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(Char);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-full m-10 max-w-lg bg-white rounded-xl shadow-lg p-6 my-8">
          <h1 className="text-3xl font-extrabold text-teal-500 text-center mb-4">
            Password Generator
          </h1>

          {/* Password Display & Copy Button */}
          <div className="flex shadow-md rounded-lg overflow-hidden mb-4 bg-gray-100">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-2 px-4 bg-gray-200 text-gray-800 placeholder-gray-500"
              placeholder="Your generated password"
              readOnly
              ref={passwordref}
            />
            <button
              onClick={copyPasswordToClipboard}
              className="bg-teal-500 text-white px-4 py-2 hover:bg-teal-600 transition duration-300"
            >
              Copy
            </button>
          </div>

          {/* Range Slider & Checkboxes */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm gap-4">
            {/* Length Slider */}
            <div className="flex items-center gap-x-2">
              <input
                type="range"
                min={4}
                max={16}
                value={length}
                className="cursor-pointer accent-teal-500"
                onChange={(e) => setLength(e.target.value)}
              />
              <label className="text-gray-600 font-medium">
                Length: {length}
              </label>
            </div>

            {/* Number Checkbox */}
            <div className="flex items-center gap-x-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked={numAllowed}
                  id="numberinput"
                  className="hidden"
                  onChange={() => setnumAllowed((prev) => !prev)}
                />
                <span className="w-10 h-4 bg-gray-300 rounded-full relative cursor-pointer transition-colors duration-300">
                  <span
                    className={`absolute left-0 w-4 h-4 bg-teal-500 rounded-full transition-transform duration-300 ${
                      numAllowed ? "transform translate-x-4" : ""
                    }`}
                  ></span>
                </span>
                <span className="ml-2 text-gray-600 font-medium">
                  Include Numbers
                </span>
              </label>
            </div>

            {/* Character Checkbox */}
            <div className="flex items-center gap-x-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked={charAllowed}
                  id="charinput"
                  className="hidden"
                  onChange={() => setCharAllowed((prev) => !prev)}
                />
                <span className="w-10 h-4 bg-gray-300 rounded-full relative cursor-pointer transition-colors duration-300">
                  <span
                    className={`absolute left-0 w-4 h-4 bg-teal-500 rounded-full transition-transform duration-300 ${
                      charAllowed ? "transform translate-x-4" : ""
                    }`}
                  ></span>
                </span>
                <span className="ml-2 text-gray-600 font-medium">
                  Include Symbols
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
