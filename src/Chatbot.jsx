import React, { useState } from "react";
import compromise from "compromise";

// What should I do if there is a natural disaster in my area?
// How can I prepare for a hurricane or other severe weather event?
// I need help finding emergency shelter in my area. Can you assist me?
// What resources are available to help me recover from a disaster?
// Can you provide me with tips for staying safe during an earthquake?
// How can I help those affected by a disaster, like volunteering or making a donation?
// What should I include in my disaster preparedness kit?
// How can I sign up for emergency alerts and notifications?
// I am experiencing a medical emergency during a disaster. What should I do?
// Can you provide me with a checklist for creating a family emergency plan?

// User Input: "I need information on preparing for a hurricane"
// Bot Response: "Sure, we have a page dedicated to hurricane preparedness. You can find it here: https://www.disastermanagement.com/hurricane-preparedness/"

// User Input: "What should I do in case of a wildfire?"
// Bot Response: "Our website has a section on wildfire safety tips. Check it out here: https://www.disastermanagement.com/wildfire-safety/"

// User Input: "Is there information on how to create an emergency kit?"
// Bot Response: "Yes, we have a page with a checklist of items to include in an emergency kit. Here is the link: https://www.disastermanagement.com/emergency-kit-checklist/"

// User Input: "How do I prepare my home for an earthquake?"
// Bot Response: "We have a section on earthquake preparedness that includes tips on securing your home. You can find it here: https://www.disastermanagement.com/earthquake-preparedness/"

// User Input: "What should I do during a flood?"
// Bot Response: "Our website has a page with flood safety tips, including what to do during a flood. Check it out here: https://www.disastermanagement.com/flood-safety/"

// [//]: # (Hurricane Preparedness)
// To learn how to prepare for a hurricane, check out our [hurricane preparedness page](https://www.disastermanagement.com/hurricane-preparedness/).

// [//]: # (Wildfire Safety)
// If you're looking for information on what to do in case of a wildfire, our website has a [section on wildfire safety](https://www.disastermanagement.com/wildfire-safety/) that you might find helpful.

// [//]: # (Emergency Kit Checklist)
// Preparing an emergency kit? Here's a [handy checklist](https://www.disastermanagement.com/emergency-kit-checklist/) of items to include.

// [//]: # (Earthquake Preparedness)
// To prepare your home for an earthquake, be sure to check out our [earthquake preparedness section](https://www.disastermanagement.com/earthquake-preparedness/) for tips and advice.

// [//]: # (Flood Safety)
// If you're wondering what to do during a flood, our [flood safety page](https://www.disastermanagement.com/flood-safety/) has information on how to stay safe and what to do in an emergency.

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  function extractMainWord(input) {
    const doc = compromise(input);
    const mainWord = doc.nouns().toSingular().out("text");
    return mainWord;
  }
  function getRandomPhrase(input, link) {
    const phrases = [
      "Sure, we have a page dedicated to",
      "Our website has a section on",
      "You can find information about that on our",
      "We've got a whole page about",
      "If you're interested, we've got a section on",
      "Check out our website's",
      "We've compiled all the information you need in our",
      "To learn more, visit our",
      "We've got you covered with our",
      "Looking for more? Check out our",
      "Visit the link",
      "Check this page",
      "Get emergency preparedness tips from our",
      "We've compiled a list of resources on our",
      "Stay informed with our",
      "You can find disaster recovery information on our",
      "Learn how to stay safe during a disaster on our",
      "To learn more, visit our emergency response page",
      "We've compiled all the information you need in ",
      "To learn more, visit ",
      "We've got you covered with ",
      "Looking for more? Check out ",
      "Get emergency preparedness tips from ",
      "We've compiled a list of resources on ",
      "Stay informed with ",
      "You can find disaster recovery information on ",
      "Learn how to stay safe during a disaster on ",
      "Our website has a section on disaster management",
      "Visit our website for disaster relief updates",
      "Check out our disaster preparedness page",
      "If you're interested in disaster response, we've got a section on that",
    ];

    const linkPhrase = link ? <a href={link}>{input}</a> : input;
    const randomIndex = Math.floor(Math.random() * phrases.length);
    const chosenPhrase = phrases[randomIndex];

    return (
      <>
        {" "}
        {chosenPhrase} {linkPhrase}
      </>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const punctuations = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    const strWithoutPunctuation = inputText.replace(punctuations, "");
    const doc = compromise(strWithoutPunctuation);
    const nouns = doc.normalize().nouns().toSingular().out("array");
    let mainTopics = [];
    nouns.forEach((element) => {
      mainTopics = mainTopics.concat(element.split(" "));
    });
    // [
    //   "// What",
    //   "I",
    //   "a natural disaster",
    //   "my area?"
    // ]

    // List of predetermined words and their corresponding links here
    const wordList = {
      emergency: "emergency",
      shelter: "shelter",
      evacuation: "evacuation",
      // disasterReliefOrganizations: 'disaster relief organizations',
      firstaid: "firstaid",
      water: "water",
      food: "food",
      safe: "safetytips",
      safety: "safetytips",
      volunteer: "volunteeropportunities",
      donations: "donations",
      update: "updates",
      communication: "communication",
      outage: "poweroutage",
      road: "road",
      routes: "road",
      petrol: "petrolpumps",
      medical: "medical",
      temporary: "temporaryhousing",
      fund: "funds",
    };

    const links = mainTopics.filter((noun) => wordList[noun] != undefined);
    const uniqueLinks = Array.from(new Set(links));
    console.log(uniqueLinks)

    if (uniqueLinks.length === 1) {
      setOutputText(
        `Here's a link related to "${nouns.join(", ")}": ${uniqueLinks[0]}`
      );
    } else if (uniqueLinks.length === 0) {
      setOutputText(
        `Sorry, I don't have a link related to "${nouns.join(", ")}".`
      );
    } else {
      setOutputText(
        `I found multiple links related to "${nouns.join(
          ", "
        )}": ${uniqueLinks.join(", ")}`
      );
    }

    setInputText("");
  };

  const handleMessageSubmit = (event) => {
    event.preventDefault();

    // Analyze user input with Compromise.js
    const doc = compromise(inputValue);

    // Check for specific keywords and generate output based on context
    let output = "";
    if (doc.has("hi") || doc.has("hello")) {
      output += "Hi there.";
    }
    if (doc.has("#QuestionWord") && doc.has("find")) {
      const context = doc.match("#Noun").text();
      output += `Here is the link to ${context}: https://www.example.com/${context}`;
    } else if (doc.has("#QuestionWord") && doc.has("provide")) {
      const context = doc.match("#Noun").text();
      output += `Here is the link you requested for ${context}: https://www.example.com/${context}`;
    } else {
      output += "I'm sorry, I didn't understand your request.";
    }

    // Update messages with user input and chatbot output
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputValue, sender: "user" },
      { text: output, sender: "chatbot" },
    ]);

    // Clear input field
    setInputValue("");
  };

  return (
    <>
      <h1>Chatbot</h1>
      <div>
        <div>
          {messages.map((message, index) => (
            <div key={index} className={message.sender}>
              {message.text}
            </div>
          ))}
        </div>
        {/* <form onSubmit={handleMessageSubmit}> */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            // value={inputValue}
            value={inputText}
            // onChange={(event) => setInputValue(event.target.value)}
            onChange={(event) => setInputText(event.target.value)}
          />
          <p>{outputText}</p>
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
