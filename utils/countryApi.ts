import axios from 'axios';

export interface Country {
  id: number;
  name: string;
  code: string;
  has_university: boolean;
}

export interface City {
  id: number;
  name: string;
}

export interface FormattedCity {
  id: number;
  value: string;
  label: string;
  countryId: number;
}

export interface CountryApiResponse {
  status: boolean;
  show_message: boolean;
  message: string | null;
  code: number;
  data: {
    countries: Country[];
    educationalStages: any[];
  };
}

export interface CitiesApiResponse {
  status: boolean;
  show_message: boolean;
  message: string | null;
  code: number;
  data: City[];
}

/**
 * Fetches the list of countries from the API
 * @param locale - The locale for the request (e.g., 'ar-SA', 'en-US')
 * @returns Promise<Country[]>
 */
export const fetchCountries = async (locale: string = 'en-US'): Promise<Country[]> => {
  try {
    const response = await axios.post<CountryApiResponse>(
      '/api/countries',
      {},
      {
        headers: {
          'Accept-Language': locale === 'ar' ? 'ar-SA' : 'en-US',
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.status && response.data.data?.countries) {
      return response.data.data.countries;
    } else {
      throw new Error(response.data.message || 'Failed to fetch countries');
    }
  } catch (error) {
    console.error('Error fetching countries:', error);
    // Return fallback countries in case of error
    return [
      { id: 1, name: "Saudi Arabia", code: "966", has_university: true },
      { id: 3, name: "United Arab Emirates", code: "971", has_university: false },
      { id: 61, name: "Egypt", code: "20", has_university: false },
    ];
  }
};

/**
 * Fetches the list of cities for a specific country from the API
 * @param countryId - The country ID to fetch cities for
 * @param locale - The locale for the request (e.g., 'ar-SA', 'en-US')
 * @returns Promise<City[]>
 */
export const fetchCitiesForCountry = async (countryId: number, locale: string = 'en-US'): Promise<City[]> => {
  try {
    const response = await axios.post<CitiesApiResponse>(
      '/api/cities',
      {
        country_id: countryId
      },
      {
        headers: {
          'Accept-Language': locale === 'ar' ? 'ar-SA' : 'en-US',
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.status && response.data.data) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch cities');
    }
  } catch (error) {
    console.error(`Error fetching cities for country ${countryId}:`, error);
    // Return fallback cities based on your provided data for Saudi Arabia (country_id: 1)
    if (countryId === 1) {
      return [
        { id: 1, name: "Abha" },
        { id: 44, name: "Dammam" },
        { id: 76, name: "Jeddah" },
        { id: 97, name: "Makkah" },
        { id: 93, name: "Madinah" },
        { id: 138, name: "Riyadh" },
        { id: 165, name: "Taif" },
        { id: 164, name: "Tabuk" },
        { id: 60, name: "Hail" },
        { id: 110, name: "Najran" },
      ];
    }
    return [];
  }
};

/**
 * Maps API countries to the format expected by the form
 * @param countries - Array of countries from API
 * @returns Array of countries in form format
 */
export const mapCountriesToFormFormat = (countries: Country[]) => {
  return countries.map(country => ({
    id: country.id,
    value: country.name.toLowerCase().replace(/\s+/g, '_'),
    label: country.name,
    code: country.code,
    has_university: country.has_university,
  }));
};

/**
 * Maps API cities to the format expected by the form
 * @param cities - Array of cities from API
 * @param countryId - The country ID to associate with cities
 * @returns Array of cities in form format
 */
export const mapCitiesToFormFormat = (cities: City[], countryId: number): FormattedCity[] => {
  return cities.map(city => ({
    id: city.id,
    value: city.name.toLowerCase().replace(/\s+/g, '_'),
    label: city.name,
    countryId: countryId,
  }));
};

/**
 * This function is now deprecated since we fetch cities dynamically per country
 * @deprecated Use fetchCitiesForCountry instead
 */
export const getCitiesForCountry = (countryId: number, allCities: FormattedCity[] = []): FormattedCity[] => {
  console.warn('getCitiesForCountry is deprecated. Use fetchCitiesForCountry instead.');
  return allCities.filter(city => city.countryId === countryId);
};