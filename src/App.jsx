import { useState } from "react";

export default function PasswordGenerator() {

  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  // Character sets
  const CHARACTERS = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+[]{}|;:,.<>?",
  };

  // Generate Password
  const generatePassword = () => {
    let characterPool = "";

    if (includeUppercase) characterPool += CHARACTERS.uppercase;
    if (includeLowercase) characterPool += CHARACTERS.lowercase;
    if (includeNumbers) characterPool += CHARACTERS.numbers;
    if (includeSymbols) characterPool += CHARACTERS.symbols;

    if (characterPool === "") {
      alert("Select at least one option.");
      return;
    }

    let generatedPassword = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      generatedPassword += characterPool[randomIndex];
    }

    setPassword(generatedPassword);
  };

  // Copy Password
  const copyPassword = () => {
    if (!password) return;

    navigator.clipboard.writeText(password);
    alert("Password copied!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Password Generator
        </h1>

        {/* Password Display */}
        <div className="flex gap-2 mb-5">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Generated Password"
            className="flex-1 border rounded-md px-3 py-2"
          />

          <button
            onClick={copyPassword}
            className="bg-blue-500 text-white px-4 rounded-md hover:bg-blue-600"
          >
            Copy
          </button>
        </div>

        {/* Length Slider */}
        <div className="mb-5">
          <label className="font-medium">
            Password Length: {length}
          </label>

          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full mt-2"
          />
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
            />
            Uppercase Letters
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={() => setIncludeLowercase(!includeLowercase)}
            />
            Lowercase Letters
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
            />
            Numbers
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
            />
            Symbols
          </label>
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}