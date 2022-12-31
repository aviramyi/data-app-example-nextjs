
import React, { useState, useMemo, memo, useEffect } from "react";
import Message from "../components/message";
import Filters from "../components/filters";
import Row from "../components/row";
import { GetAllPlayers, GetAllTeams, GetTeamById } from "../hooks/data";
import Script from 'next/script'

function getPlayerOfSelectedTeams(selectedTeams, allPlayers) {
  const teamIds = Object.values(selectedTeams).map((element) => element.id);
  const currentPlayers = JSON.parse(JSON.stringify(allPlayers));
  return Object.values(currentPlayers).filter((player) => teamIds.includes(player.team.id));
}

// Our main page. Here we are loading data "on the client"
// And showing some loading screen(s) while waiting for the data to be ready
export default function IndexPage() {

  // State management
  const [teamNameSearch, setTeamNameSearch] = useState("-");
  const [playerSelection, setPlayerSelection] = useState('0');
  const [sortSelection, setSortSelection] = useState('0');

  // API query
  const allTeamsData = GetAllTeams(playerSelection)
  const allPlayersData = GetAllPlayers()


  function getDataQueryKeys(event) {
    if (event.target.id === "team-name-search") {
      setTeamNameSearch(event.target.value);
    }
    if (event.target.id === "search-player") {
      setPlayerSelection(event.target.value);
    }
    if (event.target.id === "teams-sort") {
      setSortSelection(event.target.value);
    }
  }

  const memoFilters = useMemo(() => <Filters playersList={allPlayersData ? allPlayersData.data : {}} changeHandler={getDataQueryKeys} selectedValues={[playerSelection, sortSelection]} />, [allPlayersData, playerSelection, sortSelection])


  if (allTeamsData == null || allPlayersData == null) return <Message content="Loading..." />

  let currentTeamsData;
  if (playerSelection !== '0') {
    currentTeamsData = [allTeamsData.data];
  }

  let currentPlayerData = Object.values(allPlayersData.data);
  currentTeamsData = currentTeamsData == undefined ? Object.values(allTeamsData.data) : currentTeamsData;
  currentPlayerData.sort(((a, b) => a.first_name < b.first_name ? -1 : 1));
  let currentlySelectTeams = currentTeamsData;

  // Appliyng team name search filter 
  if (teamNameSearch !== "-") {
    const teamSearchResults = Object.values(JSON.parse(JSON.stringify(currentTeamsData))).filter(element => element.full_name.toLowerCase().includes(teamNameSearch.toLowerCase()));
    let relevantPlayers = {};

    if (teamSearchResults.length > 0) {
      relevantPlayers = getPlayerOfSelectedTeams(teamSearchResults, currentPlayerData);
    }
    currentlySelectTeams = teamSearchResults;
  }


  // Applying player selection filter happens automatically using the different API query

  //Applying order selection
  if (sortSelection !== "0") {
    switch (sortSelection) {
      case 'nameAsc':
        currentlySelectTeams.sort((a, b) => a.full_name < b.full_name ? -1 : 1);
        break;
      case 'nameDesc':
        currentlySelectTeams.sort((a, b) => a.full_name > b.full_name ? -1 : 1);
        break;
      case 'divisions':
        currentlySelectTeams.sort((a, b) => a.division < b.division ? -1 : 1);
        break;
    }
  }

  return (
    <>
      {memoFilters}
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async={true}
        defer={true}
      />
      <Row teamList={currentlySelectTeams} playerList={currentPlayerData} />
      <div
        className="cf-turnstile checkbox"
        data-sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}
      />
    </>
  )
}
