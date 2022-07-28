import React, { useState, useEffect } from "react";
import MusicCard from "./music_card.jsx";

export default function Main() {
  //array of items loaded
  const [items, setItems] = useState([]);
  //sets search term
  const [s_params, setSearch_params] = useState("");
  //set content type
  const [c_type, setC_type] = useState("all");
  // favourite selection
  const [isFav, setIsFav] = useState(false);
  //LISTENER FOR FAVOURITES TAB
  const [favList, setFavList] = useState(false);

  //simple fetch to load some items on screen when user enters page
  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  //FETCH FUNCTION FOR USER TO SEARCH THEIR ITEMS
  const search = async () => {
    const data = await fetch(
      `/api/search?s_params=${s_params}&c_type=${c_type}`
    );
    const itemData = await data.json();
    await setItems(itemData);
    setFavList(false);
  };

  //fetch to get the users liked list
  const getFav = async () => {
    const data = await fetch("/api/fav");
    const itemData = await data.json();
    await setItems(itemData);
    await setFavList(true);
  };

  return (
    <div className="containerMain">
      <div className="row sticky-top searchBarRow">
        <div className="col searchBar">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search Here!"
              name="s_params"
              value={s_params}
              onChange={(e) => setSearch_params(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && search()}
            />
            <button
              className="btn btn-outline-info"
              id="button-addon2"
              type="button"
              onClick={search}
            >
              Search
            </button>
          </div>
          <div className="row">
            <div className="col-sm-3 align-self-start">
              <h6>Content type:</h6>
            </div>
            <div className="col">
              {/* select form for the user to specify search query */}
              <select
                className="form-control form-select-sm searchFilters"
                name="c_type"
                onChange={(e) => setC_type(e.target.value)}
                data-testid='select-form'
              >
                <option value="all">All</option>
                <option value="music">Music</option>
                <option value="musicVideo">Music Video</option>
                <option value="podcast">Podcast</option>
                <option value="audiobook">Audiobook</option>
                <option value="movie">Movie</option>
                <option value="shortFilm">Short Film</option>
                <option value="tvShow">TV Show</option>
                <option value="software">Software</option>
                <option value="ebook">E-Book</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="row musicContainer">
        <div className="row"></div>
        <div className="row justify-content-center">
          <div className="col-md-7">
            <h2>
              {favList ? (
                <h2>Click "your favourites" to see items after delete: </h2>
              ) : (
                "Search Results:"
              )}
            </h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="card-grid col-md">
            {/* maps items and allows user to see search results */}
            {items.map((item) => (
              <MusicCard key={item.trackId} itemsData={item} isFav={isFav} />
            ))}
          </div>
        </div>
        <button
          type="button"
          className="btn btn-outline-info btn-lg btn-block favBtn"
          onClick={getFav}
        >
          Your Favourites
        </button>
      </div>
    </div>
  );
}
