import React, { useEffect, useState } from "react";
import "./PasswordGenerator.css";
import copyIcon from "../assets/copy-icon.svg";
import changePsdIcon from "../assets/change-psd-icon.svg";
import { ToastContainer, toast } from "react-toastify";
import { IoMdSync } from "react-icons/io";
import Psd_img from "../assets/psd_favicon.png";

function PasswordGenerator() {
  const lowercaseList = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbersList = "0123456789";
  const symbolsList = "!@#$%^&*()?";

  const [password, setPassword] = useState("");
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [excludeDuplicates, setExcludeDuplicates] = useState(false);
  const [passwordLength, setPasswordLength] = useState(8);
  //   const [strength, setStrength] = useState(0);
  const [strengthType, setStrengthType] = useState("weak");
  const [selectedChoices, setSelectedChoices] = useState([
    "lowercase",
    "uppercase",
    "numbers",
    "symbols",
  ]);
  const generatePassword = () => {
    let characterList = "";
    if (lowerCase) {
      characterList += lowercaseList;
    }
    if (upperCase) {
      characterList += uppercaseList;
    }
    if (numbers) {
      characterList += numbersList;
    }
    if (symbols) {
      characterList += symbolsList;
    }

    let tempPassword = "";
    const characterListLength = characterList.length;
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      tempPassword += characterList.charAt(characterIndex);
    }
    if (excludeDuplicates) {
      tempPassword = removeDuplicateCharacters(tempPassword);
    }
    setPassword(tempPassword);
    // console.log(password);
  };

  const removeDuplicateCharacters = (str) => {
    return str
      .split("")
      .filter((item, index, self) => self.indexOf(item) === index)
      .join("");
  };

  const getPasswordStrength = () => {
    let strength = 0;

    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numbersRegex = /[0-9]/;
    const symbolsRegex = /[^a-zA-Z0-9]/;

    if (lowerCase && password.match(lowercaseRegex)) {
      strength++;
    }

    if (upperCase && password.match(uppercaseRegex)) {
      strength++;
    }

    if (numbers && password.match(numbersRegex)) {
      strength++;
    }

    if (symbols && password.match(symbolsRegex)) {
      strength++;
    }
    return strength;
  };

  const psdStrength = getPasswordStrength();

  const handleCheckbox = (type) => {
    let tempChoices = selectedChoices;
    if (tempChoices.includes(type)) {
      const index = tempChoices.indexOf(type);
      tempChoices.splice(index, 1);
    } else {
      tempChoices.push(type);
    }
    console.log(tempChoices);
    setSelectedChoices(tempChoices);
  };

  useEffect(() => {
    const strength = getPasswordStrength();
    psdStrengthMeter(strength);

    generatePassword();
  }, [
    passwordLength,
    lowerCase,
    upperCase,
    numbers,
    symbols,
    strengthType,
    excludeDuplicates,
  ]);

  const psdStrengthMeter = (strength) => {
    if (strength <= 1) {
      setStrengthType("weak");
      document.querySelector(".strength_type_color").style.color = "#DF0505";
    } else if (strength === 2) {
      setStrengthType("average");
      document.querySelector(".strength_type_color").style.color = "#DFA505";
    } else if (strength === 3) {
      setStrengthType("good");
      document.querySelector(".strength_type_color").style.color = "#DFDF05";
    } else if (strength === 4) {
      setStrengthType("strong");
      document.querySelector(".strength_type_color").style.color = "#05DF22";
    }
    // console.log(strengthType)
    return strengthType;
  };

  const copyPassword = async () => {
    const copiedText = await navigator.clipboard.readText();
    if (password.length && copiedText !== password) {
      navigator.clipboard.writeText(password);
      toast.success("Password copied to clipboard", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container ">
        <div className="row">
          <div className="title title_heading ">
            <img src={Psd_img} alt="" className="img img-fluid psd_logo " />
            <p className="">Strong Password Generator</p>
          </div>
          <div className="password-wrapper ">
            <div className="password-area">
              <div className="password">
                <input
                  type="text"
                  value={password}
                  disabled
                  placeholder="Click on the Generate Password"
                />
                <img
                  src={copyIcon}
                  alt="copyicon"
                  className="copyIcon"
                  onClick={copyPassword}
                />
              </div>
            </div>
          </div>
          <div className="setting">
            <h3>Customize your password</h3>
            <div className="customize">
              <div className="checkboxes">
                <div className="left">
                  <div className="checkbox-field">
                    <input
                      type="checkbox"
                      name="lower"
                      id="lower"
                      checked={lowerCase}
                      disabled={
                        selectedChoices.length === 1 &&
                        selectedChoices.includes("lowercase")
                      }
                      onChange={() => {
                        setLowerCase(!lowerCase);
                        handleCheckbox("lowercase");
                      }}
                    />
                    <label htmlFor="lower">Include LowerCase(a-z)</label>
                  </div>
                  <div className="checkbox-field">
                    <input
                      type="checkbox"
                      name="upper"
                      id="upper"
                      checked={upperCase}
                      disabled={
                        selectedChoices.length === 1 &&
                        selectedChoices.includes("uppercase")
                      }
                      onChange={() => {
                        setUpperCase(!upperCase);
                        handleCheckbox("uppercase");
                      }}
                    />
                    <label htmlFor="upper">Include UpperCase(A-Z)</label>
                  </div>
                  <div className="checkbox-field">
                    <input
                      type="checkbox"
                      name="excludeDuplicates"
                      id="excludeDuplicates"
                      checked={excludeDuplicates}
                      onChange={() => setExcludeDuplicates(!excludeDuplicates)}
                    />
                    <label htmlFor="excludeDuplicates">
                      Exclude Duplicate Characters
                    </label>
                  </div>
                </div>
                <div className="right">
                  <div className="checkbox-field">
                    <input
                      type="checkbox"
                      name="numbers"
                      id="numbers"
                      checked={numbers}
                      disabled={
                        selectedChoices.length === 1 &&
                        selectedChoices.includes("numbers")
                      }
                      onChange={() => {
                        setNumbers(!numbers);
                        handleCheckbox("numbers");
                      }}
                    />
                    <label htmlFor="numbers">Include Numbers(0-9)</label>
                  </div>
                  <div className="checkbox-field">
                    <input
                      type="checkbox"
                      name="symbols"
                      id="symbols"
                      checked={symbols}
                      disabled={
                        selectedChoices.length === 1 &&
                        selectedChoices.includes("symbols")
                      }
                      onChange={() => {
                        setSymbols(!symbols);
                        handleCheckbox("symbols");
                      }}
                    />
                    <label htmlFor="symbols">Include Symbols(&-#)</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="password-length">
            <h3>Password Length :</h3>
            <div className="slider">
              <p className="rangeValue">{passwordLength}</p>
              <div className="range">
                <input
                  type="range"
                  min={6}
                  max={40}
                  defaultValue={passwordLength}
                  onChange={(event) =>
                    setPasswordLength(event.currentTarget.value)
                  }
                />
              </div>
            </div>
          </div>
          <div className="password-strength ">
            <h3>Password strength :</h3>
            <div className=" ">
              <span className="strength_type_color">{strengthType}</span>
            </div>
          </div>
          <div className="">
            <div className="buttons ">
              <button type="button" onClick={copyPassword}>
                Copy Password
              </button>
              <button type="button" onClick={generatePassword}>
                Generate Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PasswordGenerator;
