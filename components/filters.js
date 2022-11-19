export default function Filters() {
    return (
        <div className="filtersSection">
            <h3 className="filterSectionTitle">Filters</h3>

            <div className="filtersSectionInner">
                <div className="filterObject" id="teamNameSearch">
                    <input type="text" placeholder="Search by team name.." />
                </div>

                <div className="filterObject" id="searchPlayerDiv">
                    <label htmlFor="searchPlayer">Find by player:</label>
                    <select name="searchPlayer" id="searchPlayer" className="filterObject">
                        <option>Select player...</option>
                    </select>
                </div>

                <div className="filterObject">
                    <label htmlFor="teamsSortBy">Sort teams by:</label>
                    <select name="teamsSortBy" id="teamsSortBy" className="filterObject">
                        <option value="nameAsc">Name (Ascending)</option>
                        <option value="nameDesc">Name (Descending)</option>
                        <option value="division">Division</option>
                    </select>
                </div>
            </div>
        </div >)
}