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

  function getRandomPhrase(input, link) {
    console.log(input, link);
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
    const strWithoutPunctuation = inputValue.replace(punctuations, "");
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
    const disasterWords = {
      avalanche: ['snow', 'mountain', 'ice', 'slope', 'danger'],
      earthquake: ['tremor', 'quake', 'seismic', 'fault', 'magnitude'],
      hurricane: ['storm', 'wind', 'rain', 'flood', 'category'],
      tornado: ['twister', 'wind', 'funnel', 'damage', 'warning'],
      flood: ['water', 'overflow', 'rain', 'river', 'disaster'],
      wildfire: ['fire', 'burn', 'smoke', 'evacuate', 'flame'],
      tsunami: ['wave', 'ocean', 'earthquake', 'coast', 'warning'],
      volcano: ['eruption', 'lava', 'smoke', 'ash', 'active'],
      cyclone: ['storm', 'wind', 'rain', 'coast', 'destruction'],
      drought: ['dry', 'water', 'crop', 'heat', 'famine'],
      blizzard: ['snow', 'wind', 'cold', 'freeze', 'storm'],
      landslide: ['earth', 'slide', 'rocks', 'debris', 'slope'],
      hailstorm: ['hail', 'ice', 'storm', 'damage', 'crop'],
      typhoon: ['storm', 'wind', 'rain', 'coast', 'destruction'],
      heatWave: ['heat', 'hot', 'temperature', 'sun', 'wave'],
      coldWave: ['cold', 'temperature', 'freeze', 'snow', 'wave'],
      pandemic: ['disease', 'virus', 'outbreak', 'pandemic', 'infect'],
      chemicalSpill: ['chemical', 'spill', 'toxic', 'poison', 'contamination'],
      gasLeak: ['gas', 'leak', 'toxic', 'poison', 'contamination'],
      nuclearDisaster: ['nuclear', 'radiation', 'accident', 'leak', 'meltdown'],
      biologicalDisaster: ['biological', 'disease', 'outbreak', 'contagious', 'virus'],
      cyberAttack: ['cyber', 'attack', 'hacker', 'security', 'data'],
      blackout: ['power', 'outage', 'electricity', 'dark', 'grid'],
      asteroidImpact: ['asteroid', 'impact', 'collision', 'space', 'danger'],
      meteorStrike: ['meteor', 'strike', 'impact', 'space', 'destruction'],
      zombieApocalypse: ['zombie', 'apocalypse', 'undead', 'survival', 'outbreak'],
      alienInvasion: ['alien', 'invasion', 'extraterrestrial', 'spaceship', 'abduction'],
      robotUprising: ['robot', 'uprising', 'machine', 'autonomous', 'rebellion'],
      monsterAttack: ['monster', 'attack', 'creature', 'giant', 'rampage']
    };
    
    const disasterList = {
      avalanche: '/disaster/avalanche',
      asteroidImpact: '/disaster/asteroid-impact',
      blizzard: '/disaster/blizzard',
      chemicalExplosion: '/disaster/chemical-explosion',
      cyclone: '/disaster/cyclone',
      drought: '/disaster/drought',
      earthquake: '/disaster/earthquake',
      famine: '/disaster/famine',
      flood: '/disaster/flood',
      gasLeak: '/disaster/gas-leak',
      hailstorm: '/disaster/hailstorm',
      heatWave: '/disaster/heat-wave',
      hurricane: '/disaster/hurricane',
      iceStorm: '/disaster/ice-storm',
      insectInfestation: '/disaster/insect-infestation',
      insectPlague: '/disaster/insect-plague',
      landslide: '/disaster/landslide',
      marinePollution: '/disaster/marine-pollution',
      meteorImpact: '/disaster/meteor-impact',
      nuclearAccident: '/disaster/nuclear-accident',
      nuclearExplosion: '/disaster/nuclear-explosion',
      pandemic: '/disaster/pandemic',
      powerOutage: '/disaster/power-outage',
      quake: '/disaster/quake',
      radiationExposure: '/disaster/radiation-exposure',
      radiationLeak: '/disaster/radiation-leak',
      radioactiveContamination: '/disaster/radioactive-contamination',
      snowstorm: '/disaster/snowstorm',
      tornado: '/disaster/tornado',
      tsunami: '/disaster/tsunami',
      typhoon: '/disaster/typhoon',
      volcano: '/disaster/volcano',
      volcanicEruption: '/disaster/volcanic-eruption',
      wildfire: '/disaster/wildfire',
    };
    
    // List of predetermined words and their corresponding links here
    const wordList = {
      earthquake: "/disaster/earthquake",
      hurricane: "/disaster/hurricane",
      tornado: "/disaster/tornado",
      flood: "/disaster/flood",
      wildfire: "/disaster/wildfire",
      drought: "/disaster/drought",
      tsunami: "/disaster/tsunami",
      volcanicEruption: "/disaster/volcanic-eruption",
      pandemic: "/disaster/pandemic",
      terroristAttack: "/disaster/terrorist-attack",
      cyclone: "/disaster/cyclone",
      landslide: "/disaster/landslide",
      blizzard: "/disaster/blizzard",
      heatWave: "/disaster/heat-wave",
      avalanche: "/disaster/avalanche",
      hailstorm: "/disaster/hailstorm",
      epidemic: "/disaster/epidemic",
      blackout: "/disaster/blackout",
      chemicalSpill: "/disaster/chemical-spill",
      thunderstorm: "/disaster/thunderstorm",
      iceStorm: "/disaster/ice-storm",
      mudslide: "/disaster/mudslide",
      winterStorm: "/disaster/winter-storm",
      drought: "/disaster/drought",
      extremeCold: "/disaster/extreme-cold",
      extremeHeat: "/disaster/extreme-heat",
      forestFire: "/disaster/forest-fire",
      landslip: "/disaster/landslip",
      powerOutage: "/disaster/power-outage",
      sinkhole: "/disaster/sinkhole",
      stormSurge: "/disaster/storm-surge",
      typhoon: "/disaster/typhoon",
      acidRain: "/disaster/acid-rain",
      dustStorm: "/disaster/dust-storm",
      blizzard: "/disaster/blizzard",
      drought: "/disaster/drought",
      flashFlood: "/disaster/flash-flood",
      hailstorm: "/disaster/hailstorm",
      landslide: "/disaster/landslide",
      lighteningStrike: "/disaster/lightening-strike",
      mudflow: "/disaster/mudflow",
      pandemicFlu: "/disaster/pandemic-flu",
      solarFlare: "/disaster/solar-flare",
      spaceDebrisImpact: "/disaster/space-debris-impact",
      superOutbreak: "/disaster/super-outbreak",
      thunderstorm: "/disaster/thunderstorm",
      tornado: "/disaster/tornado",
      volcanicWinter: "/disaster/volcanic-winter",
      acidification: "/disaster/acidification",
      blizzard: "/disaster/blizzard",
      coralBleaching: "/disaster/coral-bleaching",
      cyclone: "/disaster/cyclone",
      drought: "/disaster/drought",
      extremeWeather: "/disaster/extreme-weather",
      famine: "/disaster/famine",
      flashFlood: "/disaster/flash-flood",
      forestFire: "/disaster/forest-fire",
      hailstorm: "/disaster/hailstorm",
      tornado: "/disaster/tornado",
      flood: "/disaster/flood",
      wildfire: "/disaster/wildfire",
      fire: "/disaster/fire",
      drought: "/disaster/drought",
      volcanic: "/disaster/volcanic-eruption",
      eruption: "/disaster/volcanic-eruption",
      terroristAttack: "/disaster/terrorist-attack",
      insectInfestation: "/disaster/insect-infestation",
      landslide: "/disaster/landslide",
      marinePollution: "/disaster/marine-pollution",
      radioactiveContamination: "/disaster/radioactive-contamination",
      tornado: "/disaster/tornado",
      volcanicEruption: "/disaster/volcanic-eruption",
      wildlandFire: "/disaster/wildland-fire",
      avalanche: "/disaster/avalanche",
      blizzard: "/disaster/blizzard",
      dustStorm: "/disaster/dust-storm",
      extremeHeat: "/disaster/extreme-heat",
      flood: "/disaster/flood",
      gasLeak: "/disaster/gas-leak",
      hailstorm: "/disaster/hailstorm",
      insectPlague: "/disaster/insect-plague",
      landslide: "/disaster/landslide",
      radiationLeak: "/disaster/radiation-leak",
      snowstorm: "/disaster/snowstorm",
      tornado: "/disaster/tornado",
      typhoon: "/disaster/typhoon",
      volcano: "/disaster/volcano",
      wildfire: "/disaster/wildfire",
      avalanche: "/disaster/avalanche",
      blizzard: "/disaster/blizzard",
      cyclone: "/disaster/cyclone",
      drought: "/disaster/drought",
      famine: "/disaster/famine",
      flood: "/disaster/flood",
      hailstorm: "/disaster/hailstorm",
      iceStorm: "/disaster/ice-storm",
      landslide: "/disaster/landslide",
      meteorImpact: "/disaster/meteor-impact",
      powerOutage: "/disaster/power-outage",
      quake: "/disaster/quake",
      radiationExposure: "/disaster/radiation-exposure",
      snowstorm: "/disaster/snowstorm",
      tornado: "/disaster/tornado",
      tsunami: "/disaster/tsunami",
      volcanicEruption: "/disaster/volcanic-eruption",
      wildfire: "/disaster/wildfire",
      asteroidImpact: "/disaster/asteroid-impact",
      blizzard: "/disaster/blizzard",
      chemicalExplosion: "/disaster/chemical-explosion",
      cyclone: "/disaster/cyclone",
      drought: "/disaster/drought",
      famine: "/disaster/famine",
      flood: "/disaster/flood",
      hailstorm: "/disaster/hailstorm",
      iceStorm: "/disaster/ice-storm",
      landslide: "/disaster/landslide",
      nuclear: "/disaster/nuclear-accident",//nuclearMeltdown explosion war
      oilSpill: "/disaster/oil-spill,",

      //keyWord : relative links to pagesk
      emergency: "emergency",
      shelter: "shelter",
      evacuation: "evacuation",
      // disasterReliefOrganizations: 'disaster relief organizations',
      first: "firstaid",
      aid: "firstaid",
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

    const presentWords = mainTopics.filter(
      (noun) => wordList[noun] != undefined
    );
    let chatbotText = [];
    presentWords.forEach((word) => {
      chatbotText = chatbotText.concat([[word, wordList[word]]]);
    });

    console.log(chatbotText);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputValue, sender: "User" },
    ]);
    if (chatbotText.length == 0) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Sorry, I don't have any link related to your queries 😔",
          sender: "Chatbot",
        },
      ]);
    }
    chatbotText.forEach((line) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: getRandomPhrase(line[0], line[1]), sender: "Chatbot" },
      ]);
    });

    setInputValue("");
  };

  return (
    <>
      <h1>Chatbot</h1>
      <div>
        <div>
          {messages.map((message, index) => (
            <div key={index} className={message.sender}>
              {message.sender}:{message.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
