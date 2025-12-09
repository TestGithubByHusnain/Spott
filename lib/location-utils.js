import { State, City } from "country-state-city";

const pakistanLocations = {
  Punjab: [
    "Lahore",
    "Faisalabad",
    "Rawalpindi",
    "Gujranwala",
    "Multan",
    "Bahawalpur",
    "Sargodha",
    "Sialkot",
    "Gujrat",
    "Jhang",
    "Sheikhupura",
    "Okara",
    "Sahiwal",
    "Rahim Yar Khan",
  ],
  Sindh: [
    "Karachi",
    "Hyderabad",
    "Sukkur",
    "Larkana",
    "Mirpur Khas",
    "Nawabshah",
    "Kotri",
    "Sanghar",
  ],
  "Khyber Pakhtunkhwa": [
    "Peshawar",
    "Mardan",
    "Abbottabad",
    "Swat",
    "Charsadda",
    "Kohat",
    "Mingora",
  ],
  Balochistan: ["Quetta", "Gwadar", "Turbat", "Khuzdar", "Ziarat"],
  "Islamabad Capital Territory": ["Islamabad"],
};

function normalizeName(name) {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Parse and validate a location slug (city‑state) for Pakistan.
 * - First tries to match against the hard‑coded map.
 * - If not found there, as fallback tries to use country-state-city (if data exists).
 * @param {string} slug  e.g. "lahore-punjab"
 * @returns {{ city: string|null, state: string|null, isValid: boolean }}
 */
export function parseLocationSlug(slug) {
  if (!slug || typeof slug !== "string") {
    return { city: null, state: null, isValid: false };
  }

  const parts = slug.split("-");
  if (parts.length < 2) {
    return { city: null, state: null, isValid: false };
  }

  const cityName = normalizeName(parts[0]);
  const stateName = normalizeName(parts.slice(1).join(" "));

  // Try hard‑coded map first
  const citiesInState = pakistanLocations[stateName];
  if (citiesInState) {
    const found = citiesInState.some(
      (c) => c.toLowerCase() === cityName.toLowerCase()
    );
    if (found) {
      return { city: cityName, state: stateName, isValid: true };
    }
    // else fallthrough to try external package
  }

  // Fallback: use country-state-city package
  const stateObj = State.getStatesOfCountry("PK").find(
    (s) => s.name.toLowerCase() === stateName.toLowerCase()
  );
  if (!stateObj) {
    return { city: null, state: null, isValid: false };
  }
  const cities = City.getCitiesOfState("PK", stateObj.isoCode);
  const cityObj = cities.find(
    (c) => c.name.toLowerCase() === cityName.toLowerCase()
  );
  if (cityObj) {
    return { city: cityObj.name, state: stateObj.name, isValid: true };
  }

  return { city: null, state: null, isValid: false };
}

/**
 * Create a slug from city + state (for Pakistan).
 * - If city/state match hard‑coded map → return slug.
 * - Else if fallback matches in country-state-city → return slug.
 * - Otherwise return empty string.
 * @param {string} city
 * @param {string} state
 * @returns {string} slug or empty
 */
export function createLocationSlug(city, state) {
  if (!city || !state) return "";

  const cityNorm = normalizeName(city);
  const stateNorm = normalizeName(state);

  const citiesInState = pakistanLocations[stateNorm];
  if (citiesInState) {
    const exists = citiesInState.some(
      (c) => c.toLowerCase() === cityNorm.toLowerCase()
    );
    if (!exists) return "";
  } else {
    // fallback check
    const stateObj = State.getStatesOfCountry("PK").find(
      (s) => s.name.toLowerCase() === stateNorm.toLowerCase()
    );
    if (!stateObj) return "";
    const cityList = City.getCitiesOfState("PK", stateObj.isoCode);
    const cityObj = cityList.find(
      (c) => c.name.toLowerCase() === cityNorm.toLowerCase()
    );
    if (!cityObj) return "";
  }

  const citySlug = cityNorm.toLowerCase().replace(/\s+/g, "-");
  const stateSlug = stateNorm.toLowerCase().replace(/\s+/g, "-");
  return `${citySlug}-${stateSlug}`;
}
