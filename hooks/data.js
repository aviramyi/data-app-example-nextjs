import useSWR from "swr";
import { BASE_URL, allTeamsSuffix as ALL_TEAMS_SUFFIX, ALL_PLAYERS_SUFFIX, teamSearchByIdTemplate, delay } from "../config";

// UseSWR needs a fetcher function.
// This is a generic one based on vanilla fetch().
const queryEndpoint = async (endpoint, start_page, max_page, isSearch = false) => {
  let response = { meta: { next_page: start_page } };
  let data = null;
  try {
    while (response.meta != null && response.meta.next_page != null && response.meta.next_page < max_page + 1) {
      const current_page = response.meta.next_page;
      response = await fetch(endpoint.concat(`${isSearch ? `&` : '?'}page=${current_page}&per_page=100`));
      if (response.status === 200) {
        const parsedResponse = await response.json();
        response = parsedResponse;
        if (data == null) {
          data = { data: parsedResponse.data != null ? parsedResponse.data : parsedResponse };
        } else {
          data.data = [...data.data, ...parsedResponse.data]
        }
      } else if (response.status === 429) {
        await delay(1000);
        response = await fetch(endpoint.concat(`${isSearch ? `&` : '?'}page=${current_page}&per_page=100`));
        if (response.status === 429) {
          console.log(`got 429 twice. current page: ${res}`)
        }
      }
    }
  } catch (error) {
    console.log('api error');
    console.error(error);
  }
  return data;
}

export function GetAllTeams() {
  return useSWR([BASE_URL + ALL_TEAMS_SUFFIX, 1, 15], queryEndpoint).data;
}

export function GetTeamById(id) {
  return useSWR([BASE_URL + ALL_TEAMS_SUFFIX + teamSearchByIdTemplate(id), 1, 2, true], queryEndpoint).data;
}

export function GetAllPlayers() {
  return useSWR([BASE_URL + ALL_PLAYERS_SUFFIX, 1, 10], queryEndpoint).data;
}

