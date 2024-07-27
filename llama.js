const axios = require("axios")

let input = `
You run in a process of Input JSON, Question, Thought, Action, Observation.
Use Thought to describe your thoughts about the question you have been asked.
Observation will be the result of running those actions.
Finally at the end, state the Answer.

Here are some sample sessions.


Input JSON: 
${JSON.stringify(require("./raw.json"))}

Question: What is the best agenda for a date starting at 6:00 PM, lasting for 5 hours, based on the current location with latitude -6.194031 and longitude 106.832587, and according to the JSON data we have?
Thought: This is about recommendations and creating an itinerary for dating. Based on my memory, the key points to consider include choosing a category of restaurants or dining places and spending 2 hours there based on the highest rating, followed by visiting nearby locations.
Action: lookup: capital of preference dating on afternoon.
Observation: User location is on latitude -6.194031 longitude 106.832587 the data is already sorted and filtered but need or recommendation based on dating preferences, now need to create a json of itenary based on data dan data opening hours.
Answer: Hello! your location is . Our recommendation for your itenary Saturday on 16.00 - 21.00 

// Here is our provided itenary as JSON 
{
"location": "Jakarta",
"start": "16.00",
"end": "21.00",
"duration": 300,
"description": "Your evening starts with a visit to Menteng Park, where you can unwind and enjoy the beautiful surroundings. After spending two hours in the park, head to Osteria Gia Plaza Indonesia for a delightful Italian dinner. Conclude your evening with a leisurely drive home, taking in the night views of Jakarta.",
"itenary": [
  {
    "data_id": "0x2e69f422b00ee429:0xa28d5c5a0efbe12e",
    "title": "Menteng Park",
    "category": "City park",
    "address": "Jl. HOS. Cokroaminoto, RT.3/RW.5, Menteng, Central Jakarta City, Jakarta 10310",
    "longtitude": 106.8293106,
    "latitude": -6.1964087,
    "description": "This 30-hectare public park features gardens, a playground, sport courts & absorption wells.""duration": 120,
    "plan": "18.00 - 19.00"
  },
  {
    "data_id": "0x2e69f5a64ca07a41:0xe0b15216c2b89678",
    "title": "Osteria Gia Plaza Indonesia",
    "category": "Italian restaurant",
    "address": "Jl. M.H. Thamrin No.30, RT.9/RW.5, Gondangdia, Menteng, Central Jakarta City, Jakarta 10350",
    "longtitude": 106.8226376,
    "latitude": -6.193935499999999,
    "review_rating": 4.8,
    "description": "",
    "duration": 120,
    "plan": "19.00 - 21.00"
  },
  {
    "data_id": null,
    "title": "Headed home",
    "category": "Sightseeing",
    "duration": 60,
    "plan": "21.00 - 22.00"
  }
]}
// ------ The end of JSON ------
Let's go!
`
let prompt = `${input} + "\n\n Input JSON: " + ${JSON.stringify(require("./raw.json"))} \n\n Question: What is the best agenda for a date starting at 10:00 AM, lasting for 10 hours, based on the current location with latitude -6.194031 and longitude 106.832587, and according to the JSON data we have? provide like JSON itenary\n\n Answer : `;
axios({
  method: "POST",
  url: "https://llm.ayusudi.me/api/generate",
  data: {
    model: "llama3",
    prompt: prompt,
    stream: false
  },
})