//------------------- nav bar (menu)-----------------
function toggleMenu() {
  document.querySelector(".nav-right").classList.toggle("active");
}
//-------------- Active link highlighting ------------------
const navLinks = document.querySelectorAll('.nav-right li a');

navLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});


//--------------- search bar -----------------------
document.getElementById("searchForm").addEventListener("submit", function(event) {
  event.preventDefault();   // Stop page reload
  searchPlaces();
});

function searchPlaces() {
  const input = document.getElementById("searchInput").value.toLowerCase().trim();
  const placeCards = document.querySelectorAll(".place-card");
  const noResultMsg = document.getElementById("noResults");

  let hasVisible = false;

  // Hide all place cards not matching search
  placeCards.forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    const location = card.querySelector("h6").textContent.toLowerCase();

    if (name.includes(input) || location.includes(input)) {
      card.style.display = "block";
      hasVisible = true;
    } else {
      card.style.display = "none";
    }
  });

// Hide only main page section <h2> titles
const sectionHeadings = document.querySelectorAll(".subcategory > h2");
sectionHeadings.forEach(h => {
  if (input.length > 0) {
    h.style.display = "none";
  } else {
    h.style.display = "block";
  }
});

// Show "No matching..." only if no cards match
  if (!hasVisible && input.length > 0) {
    noResultMsg.style.display = "block";
  } else {
    noResultMsg.style.display = "none";
  }
}


//--------------- slide show-----------------------
let index = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(i) {
  if (i >= slides.length) index = 0;
  if (i < 0) index = slides.length - 1;
  document.querySelector(".slides").style.transform = `translateX(${-index * 100}%)`;
}
function nextSlide() {
    index++;
    showSlide(index);
  }
// Auto-slide every 3 seconds
  setInterval(() => {
    nextSlide();
  }, 3000);



//------------------- contact form -----------------
// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  form.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent page reload

    // Collect form values (optional)
    const name = form.name.value;
    const favType = form.favType.value;

    // Show confirmation message
    formMessage.textContent = `Thank you, ${name}! We’ve received your message and noted your love for ${favType}.`;
    formMessage.style.color = "green";
    formMessage.style.fontWeight = "bold";

    // Reset form
    form.reset();

    // Scroll to confirmation message (optional)
    formMessage.scrollIntoView({ behavior: "smooth" });
  });
});



//--------------------- modal functionality-------------
// --------------------
function openModal(id) {
  document.getElementById(id).style.display = "block";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

 // close modal when clicking outside
window.addEventListener("click", function (e) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach(modal => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}); 

// ---------------- MODAL OPEN / CLOSE ----------------  a84a8cc057c42c15116a24a34889d632
// weather.js
// IndiSpaces — fetch weather by lat/lon for many Indian places
// NOTE: This file uses your OpenWeatherMap API key directly for demo/submission.
// In production, hide the key on the server or use environment vars / secrets.

const apiKey = "a84a8cc057c42c15116a24a34889d632"; // your key

// --------------- Places list: id, displayName, lat, lon ---------------
// IDs should match the <div id="..."> elements in your modals/pages.
const places = [
  // Mountains & Hill Stations
  { id: "shimlaWeather", name: "Shimla, Himachal Pradesh", lat: 31.1048, lon: 77.1734 },
  { id: "manaliWeather", name: "Manali (Kullu)", lat: 32.2432, lon: 77.1892 },
  { id: "darjeelingWeather", name: "Darjeeling", lat: 27.0360, lon: 88.2627 },
  { id: "ootyWeather", name: "Ooty (Udhagamandalam)", lat: 11.4064, lon: 76.6950 },
  { id: "lehWeather", name: "Leh-Ladakh", lat: 34.1526, lon: 77.5770 },
  { id: "munnarWeather", name: "Munnar", lat: 10.0889, lon: 77.0595 },
  { id: "nainitalWeather", name: "Nainital", lat: 29.3919, lon: 79.4542 },

  // Beaches
  { id: "goaWeather", name: "Panaji (Goa)", lat: 15.4909, lon: 73.8278 },
  { id: "marinaWeather", name: "Marina Beach (Chennai)", lat: 13.0827, lon: 80.2707 },
  { id: "varkalaWeather", name: "Varkala", lat: 8.7374, lon: 76.7150 },
  { id: "puriWeather", name: "Puri", lat: 19.8135, lon: 85.8312 },
  { id: "radhanagarWeather", name: "Radhanagar (Havelock Island)", lat: 11.9496, lon: 92.9888 },
  { id: "kovalamWeather", name: "Kovalam / Thiruvananthapuram", lat: 8.5241, lon: 76.9366 },

  // Waterfalls & Lakes
  { id: "dudhsagarWeather", name: "Dudhsagar Falls (Goa)", lat: 15.3230, lon: 74.3160 },
  { id: "jogWeather", name: "Jog Falls (Karnataka)", lat: 14.2333, lon: 74.5069 },
  { id: "athirappillyWeather", name: "Athirappilly Falls (Kerala)", lat: 10.2827, lon: 76.5955 },
  { id: "pangongWeather", name: "Pangong Lake (Ladakh)", lat: 33.8278, lon: 78.9231 },
  { id: "dalLakeWeather", name: "Dal Lake (Srinagar)", lat: 34.0869, lon: 74.7973 },
  { id: "loktakWeather", name: "Loktak Lake (Manipur)", lat: 24.5089, lon: 93.9345 },

  // Viewpoints
  { id: "tigerHillWeather", name: "Tiger Hill (Darjeeling)", lat: 27.0410, lon: 88.2630 },
  { id: "nandiWeather", name: "Nandi Hills (Karnataka)", lat: 13.3707, lon: 77.6838 },
  { id: "echoWeather", name: "Echo Point (Munnar)", lat: 10.0900, lon: 77.0590 },
  { id: "sunsetWeather", name: "Sunset Point (Kanyakumari)", lat: 8.0883, lon: 77.5385 },
  { id: "jaivanaWeather", name: "Jaivana Cannon Viewpoint (Nahargarh, Jaipur)", lat: 26.9124, lon: 75.7873 },
  { id: "bomdilaWeather", name: "Bomdila (Arunachal Pradesh)", lat: 27.5459, lon: 92.2500 },

  // Temples & Heritage
  { id: "vaishnoWeather", name: "Vaishno Devi (Katra)", lat: 32.9838, lon: 74.9410 },
  { id: "goldenTempleWeather", name: "Golden Temple (Amritsar)", lat: 31.6200, lon: 74.8765 },
  { id: "kashiWeather", name: "Kashi (Varanasi)", lat: 25.3176, lon: 82.9739 },
  { id: "tirupatiWeather", name: "Tirupati", lat: 13.6288, lon: 79.4192 },
  { id: "somnathWeather", name: "Somnath / Veraval", lat: 20.9000, lon: 70.3900 },
  { id: "jagannathWeather", name: "Jagannath Temple (Puri)", lat: 19.8126, lon: 85.8312 },
  { id: "amberWeather", name: "Amber Fort (Jaipur)", lat: 26.9859, lon: 75.8513 },
  { id: "mehrangarhWeather", name: "Mehrangarh Fort (Jodhpur)", lat: 26.2958, lon: 73.0205 },
  { id: "cityPalaceWeather", name: "City Palace (Udaipur)", lat: 24.5893, lon: 73.6648 },
  { id: "mysorePalaceWeather", name: "Mysore Palace (Mysuru)", lat: 12.2958, lon: 76.6394 },
  { id: "redFortWeather", name: "Red Fort (Delhi)", lat: 28.6562, lon: 77.2410 },
  { id: "golcondaWeather", name: "Golconda Fort (Hyderabad)", lat: 17.3833, lon: 78.4011 },
  { id: "tajMahalWeather", name: "Taj Mahal (Agra)", lat: 27.1751, lon: 78.0421 },      //
  { id: "ajantaWeather", name: "Ajanta / Aurangabad", lat: 19.8762, lon: 75.3433 },
  { id: "konarkWeather", name: "Konark Sun Temple", lat: 19.8871, lon: 86.0941 },
  { id: "victoriaWeather", name: "Victoria Memorial (Kolkata)", lat: 22.5448, lon: 88.3461 },
  { id: "indianMuseumWeather", name: "Indian Museum (Kolkata)", lat: 22.5726, lon: 88.3639 },
  { id: "sanchiWeather", name: "Sanchi Stupa (near Bhopal)", lat: 23.4860, lon: 77.7370 },

  // Festivals (mapped to representative city coords)
  { id: "diwaliWeather", name: "Diwali (Representative: New Delhi)", lat: 28.6139, lon: 77.2090 },
  { id: "holiWeather", name: "Holi (Representative: Mathura)", lat: 27.4924, lon: 77.6737 },
  { id: "durgaPujaWeather", name: "Durga Puja (Kolkata)", lat: 22.5726, lon: 88.3639 },
  { id: "pushkarWeather", name: "Pushkar (Rajasthan)", lat: 26.4704, lon: 74.5400 },
  { id: "navratriWeather", name: "Navratri (Ahmedabad)", lat: 23.0225, lon: 72.5714 },
  { id: "pongalWeather", name: "Pongal (Chennai)", lat: 13.0827, lon: 80.2707 },

  // Treks & Adventure
  { id: "chadarWeather", name: "Chadar Trek (Leh region)", lat: 34.1526, lon: 77.5770 },
  { id: "roopkundWeather", name: "Roopkund (Uttarakhand area)", lat: 30.2791, lon: 79.5546 },
  { id: "hamptaWeather", name: "Hampta Pass (near Manali)", lat: 32.2300, lon: 77.3700 },
  { id: "valleyFlowersWeather", name: "Valley of Flowers (Joshimath area)", lat: 30.7277, lon: 79.6074 },
  { id: "rajmachiWeather", name: "Rajmachi (near Lonavala)", lat: 18.7500, lon: 73.4094 },
  { id: "kedarkanthaWeather", name: "Kedarkantha (Uttarakhand)", lat: 31.0986, lon: 78.3911 },

  // Wildlife & National Parks
  { id: "corbettWeather", name: "Jim Corbett (Ramnagar)", lat: 29.4030, lon: 79.4500 },
  { id: "ranthamboreWeather", name: "Ranthambore (Sawai Madhopur)", lat: 26.0173, lon: 76.5026 },
  { id: "kazirangaWeather", name: "Kaziranga (near Tezpur)", lat: 26.5775, lon: 93.1711 },
  { id: "girWeather", name: "Gir (Sasan)", lat: 21.1204, lon: 70.8169 },
  { id: "sundarbansWeather", name: "Sundarbans (representative)", lat: 21.9497, lon: 88.6686 },
  { id: "periyarWeather", name: "Periyar (Thekkady)", lat: 9.6010, lon: 77.1798 },

  // Adventure sports & watersports
  { id: "scubaWeather", name: "Scuba (Port Blair / Andaman)", lat: 11.6234, lon: 92.7265 },
  { id: "raftingWeather", name: "River Rafting (Rishikesh)", lat: 30.0869, lon: 78.2676 },
  { id: "parasailingWeather", name: "Parasailing (Goa/Panaji)", lat: 15.4909, lon: 73.8278 },
  { id: "zanskarWeather", name: "Zanskar (Ladakh region)", lat: 34.1526, lon: 77.5770 },
  { id: "surfingWeather", name: "Surfing (Pondicherry)", lat: 11.9416, lon: 79.8083 },
  { id: "snorkelingWeather", name: "Snorkeling (Kavaratti / Lakshadweep)", lat: 10.5650, lon: 72.6369 },

  // Cities & Gardens
  { id: "delhiWeather", name: "Delhi", lat: 28.6139, lon: 77.2090 },
  { id: "mumbaiWeather", name: "Mumbai", lat: 19.0760, lon: 72.8777 },
  { id: "bengaluruWeather", name: "Bengaluru", lat: 12.9716, lon: 77.5946 },
  { id: "chennaiWeather", name: "Chennai", lat: 13.0827, lon: 80.2707 },
  { id: "kolkataWeather", name: "Kolkata", lat: 22.5726, lon: 88.3639 },
  { id: "hyderabadWeather", name: "Hyderabad", lat: 17.3850, lon: 78.4867 },
  { id: "lodhiWeather", name: "Lodhi Gardens (New Delhi)", lat: 28.5934, lon: 77.2190 },
  { id: "brindavanWeather", name: "Brindavan Gardens (Mysuru)", lat: 12.4244, lon: 76.5038 },
  { id: "lalbaghWeather", name: "Lalbagh (Bengaluru)", lat: 12.9507, lon: 77.5848 },
  { id: "rashtrapatiWeather", name: "Rashtrapati Bhavan / Mughal Gardens", lat: 28.6143, lon: 77.1995 },
  { id: "rockGardenWeather", name: "Rock Garden (Chandigarh)", lat: 30.7415, lon: 76.7685 },
  { id: "shalimarWeather", name: "Shalimar Bagh (Srinagar)", lat: 34.0996, lon: 74.7990 },

  // Markets & Shopping
  { id: "chandniWeather", name: "Chandni Chowk (Delhi)", lat: 28.6562, lon: 77.2303 },
  { id: "johariWeather", name: "Johari Bazaar (Jaipur)", lat: 26.9124, lon: 75.7873 },
  { id: "colabaWeather", name: "Colaba (Mumbai)", lat: 18.9218, lon: 72.8309 },
  { id: "newMarketWeather", name: "New Market (Kolkata)", lat: 22.5736, lon: 88.3606 },
  { id: "mgRoadWeather", name: "MG Road (Bengaluru)", lat: 12.9719, lon: 77.5965 },
  { id: "laadBazaarWeather", name: "Laad Bazaar (Hyderabad)", lat: 17.3871, lon: 78.4867 },

  // Food spots (representative city coords)
  { id: "hyderabadiBiryaniWeather", name: "Hyderabad (Biryani)", lat: 17.3850, lon: 78.4867 },
  { id: "amritsariFoodWeather", name: "Amritsar (Kulcha/Lassi)", lat: 31.6340, lon: 74.8723 },
  { id: "kolkataFoodWeather", name: "Kolkata (Rasgulla & Street Food)", lat: 22.5726, lon: 88.3639 },
  { id: "lucknowFoodWeather", name: "Lucknow (Awadhi)", lat: 26.8467, lon: 80.9462 },
  { id: "chaatWeather", name: "Delhi (Chaat)", lat: 28.6139, lon: 77.2090 },
  { id: "dalBaatiWeather", name: "Jaipur (Dal Baati Churma)", lat: 26.9124, lon: 75.7873 },
  { id: "seafoodWeather", name: "Goa (Seafood)", lat: 15.4909, lon: 73.8278 },
  { id: "filterCoffeeWeather", name: "Chennai (Filter Coffee)", lat: 13.0827, lon: 80.2707 },
  { id: "varanasiFoodWeather", name: "Varanasi (Street Snacks)", lat: 25.3176, lon: 82.9739 },
  { id: "vadaPavWeather", name: "Mumbai (Vada Pav)", lat: 19.0760, lon: 72.8777 },

  // Offbeat & Hidden Gems (representative coords)
  { id: "ziroWeather", name: "Ziro (Arunachal Pradesh)", lat: 27.6448, lon: 93.8200 },
  { id: "mawlynnongWeather", name: "Mawlynnong (Meghalaya)", lat: 25.1893, lon: 91.7716 },
  { id: "majuliWeather", name: "Majuli (Assam)", lat: 26.9560, lon: 94.2135 },
  { id: "kasarWeather", name: "Kasar Devi (Almora)", lat: 29.6293, lon: 79.6584 },
  { id: "chettinadWeather", name: "Chettinad (Karaikudi)", lat: 10.0685, lon: 78.7904 },
  { id: "khimsarWeather", name: "Khimsar (Rajasthan)", lat: 27.6320, lon: 73.4249 },
  { id: "livingRootBridgesWeather", name: "Living Root Bridges (Meghalaya)", lat: 25.2900, lon: 91.7111 },
  { id: "magneticHillWeather", name: "Magnetic Hill (Ladakh)", lat: 34.1526, lon: 77.5770 },
  { id: "marbleRocksWeather", name: "Bhedaghat Marble Rocks (Jabalpur)", lat: 22.9476, lon: 79.0708 },
  { id: "lonarWeather", name: "Lonar Crater (Maharashtra)", lat: 19.9756, lon: 76.5050 },
  { id: "sandDunesJaipurWeather", name: "Sand Dunes (Jaisalmer area)", lat: 26.9157, lon: 70.9083 }  //
];

// --------- Fetch logic (dedupe by lat/lon, update DOM) ----------
const fetchedCache = {}; // key = "lat,lon" -> data snippet HTML

async function fetchWeatherByLatLon(lat, lon) {
  const key = `${lat},${lon}`;
  if (fetchedCache[key]) return fetchedCache[key];

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok && data && data.weather) {
      const html = buildWeatherHtml(data);
      fetchedCache[key] = html;
      return html;
    } else {
      // fallback message
      const msg = `<p>Weather not found</p>`;
      fetchedCache[key] = msg;
      return msg;
    }
  } catch (err) {
    console.error("Weather fetch error:", err);
    const msg = `<p>Unable to load weather</p>`;
    fetchedCache[key] = msg;
    return msg;
  }
}

function buildWeatherHtml(data) {
  const temp = (data.main && data.main.temp !== undefined) ? data.main.temp : "--";
  const humidity = (data.main && data.main.humidity !== undefined) ? data.main.humidity : "--";
  const cond = (data.weather && data.weather[0] && data.weather[0].description) ? data.weather[0].description : "";
  const icon = (data.weather && data.weather[0] && data.weather[0].icon) ? data.weather[0].icon : "";
  const name = data.name || "";
  return `
    <div class="weather-block">
      <p><img src="https://openweathermap.org/img/wn/${icon}.png" alt="${cond}" /></p>
      <p><strong>${name}</strong> — ${cond}</p>
      <p>🌡️ ${temp} °C &nbsp;|&nbsp; 💧 ${humidity}%</p>
    </div>
  `;
}

// Loop places, fetch & update DOM if element exists
(async function loadAllPlacesWeather() {
  for (const p of places) {
    try {
      const el = document.getElementById(p.id);
      if (!el) {
        console.warn(`weather.js: element not found for id="${p.id}" (${p.name})`);
        continue; // don't create DOM nodes automatically to avoid layout issues
      }
      // show loading state
      el.innerHTML = `<p>Loading weather for ${p.name}...</p>`;

      const html = await fetchWeatherByLatLon(p.lat, p.lon);
      el.innerHTML = html;
    } catch (err) {
      console.error("Error processing place:", p, err);
      const el = document.getElementById(p.id);
      if (el) el.innerHTML = `<p>Unable to load weather for ${p.name}</p>`;
    }
  }
})();
