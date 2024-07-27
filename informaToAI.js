const data = require("./databaru.json")
const dataJSON = data.map(element => {
  let { title, category, address, longtitude, latitude, about, open_hours, review_rating, description, cid: data_id } = element
  let facilities = {}
  if (about) {
    about.forEach(el => {
      let rawFacilty = el.options.filter(({ enabled }) => enabled).map(({ name }) => name).join(",")
      facilities[el.id] = rawFacilty
    })
  } else {
    about = []
  }


  const open_hours_day = {
    day: "Sunday",
    open_hours: open_hours["Sunday"] || false
  }
  if (!open_hours_day.open_hours && category === "City park") open_hours_day.open_hours = "Always"

  return {
    data_id,
    title,
    category,
    address,
    longtitude,
    latitude,
    facilities,
    open_hours_day,
    review_rating,
    description
  }

});

let filter = dataJSON.filter((el) => (el.open_hours_day.open_hours))

require("fs").writeFileSync("rawdatabaru.json", JSON.stringify(filter, null, 2))