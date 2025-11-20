type RestCountry = {
  name: { common: string };
  cca2: string;
};

type CityListResponse = {
  error: boolean;
  msg: string;
  data?: string[];
};

type GeocodeResult = {
  latitude: number;
  longitude: number;
};

export type CountryOption = {
  name: string;
  code: string;
};

const REST_COUNTRIES_URL =
  "https://restcountries.com/v3.1/all?fields=name,cca2,capital,capitalInfo,latlng";
const COUNTRY_CITY_URL =
  "https://countriesnow.space/api/v0.1/countries/cities";
const GEOCODING_BASE_URL =
  "https://geocoding-api.open-meteo.com/v1/search?count=1&language=en&format=json";

export async function fetchCountries(): Promise<CountryOption[]> {
  const response = await fetch(REST_COUNTRIES_URL);

  if (!response.ok) {
    throw new Error("Unable to load countries");
  }

  const data: RestCountry[] = await response.json();

  return data
    .map((country) => ({
      name: country.name?.common ?? country.cca2,
      code: country.cca2,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function fetchCitiesByCountry(
  countryName: string,
): Promise<string[]> {
  const response = await fetch(COUNTRY_CITY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ country: countryName }),
  });

  if (!response.ok) {
    throw new Error("Unable to load cities");
  }

  const data: CityListResponse = await response.json();

  if (data.error || !data.data) {
    throw new Error(data.msg || "City list unavailable");
  }

  return Array.from(new Set(data.data))
    .filter(Boolean)
    .sort((a, b) =>
      a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase()),
    );
}

export async function fetchCityCoordinates(
  city: string,
  countryCode?: string,
): Promise<GeocodeResult | null> {
  const params = new URLSearchParams({
    name: city,
  });
  if (countryCode) {
    params.set("country", countryCode);
  }

  const response = await fetch(`${GEOCODING_BASE_URL}&${params.toString()}`);

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  const match = data.results?.[0];

  if (!match) {
    return null;
  }

  return {
    latitude: match.latitude,
    longitude: match.longitude,
  };
}
