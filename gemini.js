/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

require("dotenv").config()

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json"
  }
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
    ],
  });

  let input = `
  You run in a process of Input JSON, Question, Thought, Action, Observation.
  Use Thought to describe your thoughts about the question you have been asked.
  Observation will be the result of running those actions.
  Finally at the end, state the Answer.

  Here are some sample sessions.

  ## SAMPLE 1
  Input JSON: 
  ${JSON.stringify(require("./raw.json"))}
  Question: What is the best agenda for a "Sunday" date starting at 18:00, lasting for 5 hours, based on the current location with latitude -6.194031 and longitude 106.832587, and according to the JSON data we have?
  Thought: This is about recommendations and creating an itinerary for dating. Based on my memory, the key points to consider include choosing a category of restaurants or dining places and spending 2 hours there based on the highest rating, followed by visiting nearby locations.
  Action: lookup: capital of preference dating on night use 24 hours format for times.
  Observation: User location is on latitude -6.194031 longitude 106.832587 the data is already sorted and filtered but need or recommendation based on dating preferences, now need to create a json of itenary based on data dan data opening hours,  implement djikstra algorithm.
  Output must a JSON itenary detail on location which Jakarta, start, end, duration, description, itinerary and on itinerary array object have a data data_id, title, category, location, address, latitude, longitude, duration, start, end and time and the end of ititnerary is 1 hour of headed home.
  Answer: Hello! your location is . Our recommendation for your itenary Saturday on 16.00 - 21.00 
  // Here is our provided itenary as JSON 
 {
  "location": "Jakarta",
  "start": "16.00",
  "end": "21.00",
  "duration": 300,
  "description": "Your evening starts with a visit to Menteng Park, where you can unwind and enjoy the beautiful surroundings. After spending two hours in the park, head to Osteria Gia Plaza Indonesia for a delightful Italian dinner. Conclude your evening with a leisurely drive home, taking in the night views of Jakarta.",
  "itinerary": [
    {
      "data_id": "0x2e69f422b00ee429:0xa28d5c5a0efbe12e",
      "title":"Sunset in City Park"
      "location": "Menteng Park",
      "category": "City park",
      "address": "Jl. HOS. Cokroaminoto, RT.3/RW.5, Menteng, Central Jakarta City, Jakarta 10310",
      "longtitude": 106.8293106,
      "latitude": -6.1964087,
      "description": "This 30-hectare public park features gardens, a playground, sport courts & absorption wells.""duration": 120,
      "duration": 60,
      "start": "18:00",
      "end": "19:00",
      "time": "18.00 - 19.00"
    },
    {
      "data_id": "0x2e69f5a64ca07a41:0xe0b15216c2b89678",
      "title": "Romantic Dinner",
      "location": "Osteria Gia Plaza Indonesia",
      "category": "Italian restaurant",
      "address": "Jl. M.H. Thamrin No.30, RT.9/RW.5, Gondangdia, Menteng, Central Jakarta City, Jakarta 10350",
      "longtitude": 106.8226376,
      "latitude": -6.193935499999999,
      "duration": 120,
      "start": "19:00",
      "end": "21:00",
      "time": "19.00 - 21.00"
    },
    {
      "data_id": null,
      "title": "Headed home",
      "category": "Sightseeing",
      "duration": 60,
      "start": "21:00",
      "end": "22:00",
      "time": "19.00 - 20.00"
    }
  ]}
  // ------ The end of JSON ------
  Let's go!


  ## SAMPLE 2
  Input JSON: 
  ${JSON.stringify(require("./raw.json"))}
  Question: What is the best agenda for a "Sunday" date starting at 12:00, lasting for 8 hours, based on the current location with latitude -6.194031 and longitude 106.832587, and according to the JSON data we have?
  Thought: This is about recommendations and creating an itinerary for dating. Based on my memory, the key points to consider include choosing a category of restaurants or dining places with the highest rating and spending 2 hours there. After that, visit nearby locations, ensuring every path is unique and the itinerary does not return to the same place.
  Action: lookup: capital of preference dating on afternoon use 24 hours format for times.
   Observation: User location is on latitude -6.194031 longitude 106.832587 the data is already sorted and filtered but need or recommendation based on dating preferences, now need to create a json of itenary based on data dan data opening hours,  implement djikstra algorithm.
  Output must a JSON itenary detail on location which Jakarta, start, end, duration, description, itinerary and on itinerary array object have a data data_id, title, category, location, address, latitude, longitude, duration, start, end and time and the end of ititnerary is 1 hour of headed home.
  Answer: Hello! your location is . Our recommendation for your itenary Sunday on 12.00 - 20.00 
  // Here is our provided itenary as JSON 
  {
    "location": "Jakarta",
    "start": "12:00",
    "end": "20.00",
    "duration": 480,
    "description": "This itinerary starts with a morning coffee at Osteria Gia Plaza Indonesia, followed by a visit to Suropati Park for some fresh air and scenic views. After lunch, you can head to Menteng Park for more outdoor activities or simply enjoy the atmosphere. Finally, end your date with dinner at Osteria Gia.",
    "itinerary": [
        {
            "data_id": "0x2e69f416e4052ef9:0x8b3359cdbfba5a81",
            "title": "Suropati Park Visit",
            "category": "City park",
            "location": "Suropati Park",
            "address": "Jl. Taman Suropati No.5, RT.5/RW.5, Menteng, Central Jakarta City, Jakarta 10310",
            "latitude": -6.199387,
            "longitude": 106.8326333,
            "duration": 120,
            "start": "12:00",
            "end": "14:00",
            "time": "12:00 -  14:00"
        },
        {
            "data_id": "0x2e69f5a64ca07a41:0xe0b15216c2b89678",
            "title": "Lunch Break",
            "category": "Restaurant",
            "location": "Osteria Gia Plaza Indonesia",
            "address": "Jl. M.H. Thamrin No.30, RT.9/RW.5, Gondangdia, Menteng, Central Jakarta City, Jakarta 10350",
            "latitude": -6.193935499999999,
            "longitude": 106.8226376,
            "duration": 150,
            "start": "14:00",
            "end": "16:30",
            "time": "14:00 - 16:30",
            "description": ""
        },
        {
            "data_id": "0x2e69f422b00ee429:0xa28d5c5a0efbe12e",
            "title": "Menteng Park Visit",
            "category": "City park",
            "location": "Menteng Park",
            "address": "Jl. HOS. Cokroaminoto, RT.3/RW.5, Menteng, Central Jakarta City, Jakarta 10310",
            "latitude": -6.1964087,
            "longitude": 106.8293106,
            "duration": 90,
            "start": "16:30",
            "end": "18:00",
            "time": "16:30 - 18:00",
            "description": ""
        },
        {
            "data_id": "0x2e69f421ba836281:0x652a20dcf5a173a5",
            "title": "Dinner Time",
            "category": "Restaurant",
            "location": "Social House",
            "address": "Jalan M.H. Thamrin No. 1, RT.1/RW.5 No.1, RT.1/RW.5, Menteng, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10310",
            "longtitude": 106.8226084,
            "latitude": -6.1969077,
            "duration": 60,
            "start": "18:00",
            "end": "19:00",
            "time": "18:00 PM - 19:00 PM",
            "description": ""
        },
        {
            "data_id": null,
            "title": "Headed home",
            "category": "Sightseeing",
            "duration": 60,
            "start": "19:00",
            "end": "20:00",
            "time": "19.00 - 20.00",
        }
    ]
  }
  // ------ The end of JSON ------
  Let's go!
  `

  let template = `
  \n\n\nInput JSON: " ${JSON.stringify(require("./raw.json"))} \n\n \n\n  
  Question: What is the best agenda for a "Sunday" date starting at 09:00, lasting for 12 hours, based on the current location with latitude -6.194031 and longitude 106.832587, and according to the JSON data we have?
  Thought: This is about recommendations and creating an itinerary for dating. Based on my memory, the key points to consider include choosing a category of restaurants or dining places with the highest rating and spending 2 hours there. After that, visit nearby locations, ensuring every path is unique and the itinerary does not return to the same place.
  Action: lookup: capital of preference dating on morning use 24 hours format for times.
  Observation: User location is on latitude -6.194031 longitude 106.832587 the data is already sorted and filtered but need or recommendation based on dating preferences, now need to create a json of itenary based on data dan data opening hours,  implement djikstra algorithm.
  Output must a JSON itenary detail on location which Jakarta, start, end, duration, description, itinerary and on itinerary array object have a data data_id, title, category, location, address, latitude, longitude, duration, start, end and time and the end of ititnerary is 1 hour of headed home.
  Answer :  Hello! your location is . Our recommendation for your itenary Sunday on 09.00 - 21.00 
  // Here is our provided itenary as JSON 
  `


  let prompt = `${input} ${template}`;
  console.log(prompt);
  require("fs").writeFileSync("text-1.txt", prompt)
  const result = await chatSession.sendMessage(prompt);
  console.log(result.response.text());
}

run();