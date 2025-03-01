import React, { useState } from "react";
import Profile from "./Profile";
import Interest from "./Interest";
import Settings from "./Settings";

const MainComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [mail, setMail] = useState("");
  const [number, setNumber] = useState("");
  const [interests, setInterests] = useState([]);
  const [error, setError] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);

  const validateFields = (step) => {
    const newError = {};
    if (step == 0) {
      if (!firstName || firstName.length < 2) {
        newError.firstName = "First Name is not valid";
      }
      if (!lastName || lastName.length < 2) {
        newError.lastName = "Last Name is not valid";
      }
      if (!age || age < 18) {
        newError.age = "Age must be at least 18";
      }
      if (!mail || !/\S+@\S+\.\S+/.test(mail)) {
        newError.mail = "Email is not valid";
      }
      if (!number || number.length !== 10) {
        newError.number = "Phone number should be 10 digits";
      }
    }
    if (step == 1) {
      if (interests.length === 0) {
        newError.interests = "Please select at least one interest";
      }
    }

    setError(newError);

    return Object.keys(newError).length === 0;
  };

  const handleClick = (index) => {
    if (validateFields(activeIndex)) {
      setActiveIndex(index);
    }
  };

  const handleNext = () => {
    if (validateFields(activeIndex)) {
      setActiveIndex((prev) => Math.min(prev + 1, headings.length - 1));
    }
  };

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    if (validateFields()) {
      console.log("Form submitted");
    }
  };

  const headings = [
    {
      name: "Profile",
      component: (
        <Profile
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          age={age}
          setAge={setAge}
          mail={mail}
          setMail={setMail}
          number={number}
          setNumber={setNumber}
          error={error}
        />
      ),
    },
    {
      name: "Interest",
      component: (
        <Interest
          selectedInterests={interests}
          setSelectedInterests={setInterests}
          error={error}
        />
      ),
    },
    { name: "Settings", component: <Settings error={error} /> },
  ];

  return (
    <div>
      <div className="border flex flex-col border-black h-[35rem] rounded-lg bg-gray-200 max-w-[85%]">
        <div className="w-[100%] flex space-x-5 p-3 border-b border-gray-400">
          {headings.map((heading, index) => (
            <div
              key={index}
              className={`h-min w-[100%] shadow-lg bg-gray-300 border border-gray-500 rounded-lg p-1 cursor-pointer hover:scale-105 hover:bg-gray-400 text-sm font-bold duration-150 ${
                activeIndex === index ? "bg-gray-400" : ""
              }`}
              onClick={() => handleClick(index)}
            >
              {heading.name}
            </div>
          ))}
        </div>

        {headings[activeIndex].component}

        <div className="mt-2 flex space-x-3 ml-5">
          {activeIndex > 0 && (
            <button
              onClick={handlePrev}
              className="border border-gray-500 p-1 cursor-pointer hover:bg-gray-400 rounded-lg bg-gray-300 font-bold"
            >
              Prev
            </button>
          )}
          {activeIndex < headings.length - 1 && (
            <button
              onClick={handleNext}
              className="border border-gray-500 p-1 cursor-pointer hover:bg-gray-400 rounded-lg bg-gray-300 font-bold"
            >
              Next
            </button>
          )}
          {activeIndex === headings.length - 1 && (
            <button
              onClick={handleSubmit}
              className="border border-gray-500 p-1 cursor-pointer hover:bg-gray-400 rounded-lg bg-gray-300 font-bold"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
