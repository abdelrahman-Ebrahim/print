// utils/countryApi.ts
import axios from 'axios';

export interface Country {
  id: number;
  name: string;
  code: string;
  has_university: boolean;
}

export interface City {
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
 * Gets cities for a specific country (static for now, can be extended)
 * This should be replaced with an API call if cities endpoint is available
 */
export const getCitiesForCountry = (countryId: number): City[] => {
  // Static cities mapping - replace with API call when available
  const cityMapping: { [key: number]: City[] } = {
    1: [ // Saudi Arabia
      { id: 1, value: "riyadh", label: "Riyadh", countryId: 1 },
      { id: 2, value: "jeddah", label: "Jeddah", countryId: 1 },
      { id: 3, value: "dammam", label: "Dammam", countryId: 1 },
      { id: 4, value: "mecca", label: "Mecca", countryId: 1 },
      { id: 5, value: "medina", label: "Medina", countryId: 1 },
    ],
    3: [ // UAE
      { id: 6, value: "dubai", label: "Dubai", countryId: 3 },
      { id: 7, value: "abu_dhabi", label: "Abu Dhabi", countryId: 3 },
      { id: 8, value: "sharjah", label: "Sharjah", countryId: 3 },
    ],
    61: [ // Egypt
      { id: 9, value: "cairo", label: "Cairo", countryId: 61 },
      { id: 10, value: "alexandria", label: "Alexandria", countryId: 61 },
      { id: 11, value: "giza", label: "Giza", countryId: 61 },
    ],
  };

  return cityMapping[countryId] || [];
};