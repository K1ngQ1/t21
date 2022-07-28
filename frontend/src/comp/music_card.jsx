import React from "react";
import { IconContext } from "react-icons";
import { FcLike, FcEmptyTrash } from "react-icons/fc";

export default function MusicCard(itemsData) {
  //function for user to add song to temp fav list
  const favAdd = async () => {
    console.log("added");
    const data = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemsData.itemsData),
    });
  };

  //function for user to remove song to temp fav list
  const favRemove = async () => {
    console.log("remove");
    const data = await fetch(
      `/api/${itemsData.itemsData.trackId}`,
      {
        method: "DELETE",
      }
    );
  };

  return (
    <div className="container">
      <div className="row align-content-start itemRow">
        <div className="col-md-2">
          <a
            href={itemsData.itemsData.trackViewUrl}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={itemsData.itemsData.artworkUrl100}
              className="img-fluid songPic"
              alt={itemsData.itemsData.trackName}
            />
          </a>
        </div>
        <div className="col">
          <h5>{itemsData.itemsData.trackName}</h5>
          <h6>{itemsData.itemsData.collectionName}</h6>
        </div>
        <div className="col">
          <h6>- {itemsData.itemsData.artistName}</h6>
        </div>
        <div className="col-md-1">
          <div className="btn-group-vertical" role="group">
            <IconContext.Provider value={{ size: "1.5em" }}>
              <button className="btn btn-outline-danger" onClick={favAdd}>
                <FcLike />
              </button>
              <button className="btn btn-outline-primary" onClick={favRemove}>
                <FcEmptyTrash />
              </button>
            </IconContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
}
