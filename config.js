// Use this for configuration settings instead of scattering config "constants"
// throughout your application
export const BASE_URL = "https://www.balldontlie.io/api/v1";
export const ALL_TEAMS_SUFFIX = "/teams";
export const ALL_PLAYERS_SUFFIX = "/players"
export const teamSearchByIdTemplate = (teamId) => `/${teamId}`

// Supabase
export const SUPABASE_URL = process.env.SUPABASE_URL;
export const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
export const LIKED_PLAYERS_TABLE_NAME = "liked_player"

//API 
export const LIKED_PLAYERS_ENDPOINT = "/api/liked_player/"

export function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

// NOTE: the common approach is to set these values from environment variables
// and not to have the values "hard-coded" with the code.
// Then, you use the host or wherever the process is running to set the variables
// and you read them in here
// So if you do that it will look something like:
// export const API_BASE = process.env.API_BASE