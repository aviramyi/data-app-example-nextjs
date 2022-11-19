
import Message from "../components/message";
import { GetAllPlayers, GetAllTeams } from "../hooks/data";

// Our main page. Here we are loading data "on the client"
// And showing some loading screen(s) while waiting for the data to be ready
export default function IndexPage() {

  let [allTeamsData, allPlayersData] = [GetAllTeams(), GetAllPlayers()];

  if (allTeamsData == null && allPlayersData == null) return <Message content="Loading..." />
  if (allTeamsData == null || allPlayersData == null) {
    return <Message content="No data could be loaded..." />
  }

  // Just for convenience
  allPlayersData.sort(((a, b) => a.first_name < b.first_name ? -1 : 1));
  let currentlySelectTeams = allTeamsData;

  return (
    <>
      <div className="row">
        {records.map(record => {
          return <div key={record.id} className="item"><div className="content">{record.name}</div></div>
        })}
      </div>
    </>
  )
}
