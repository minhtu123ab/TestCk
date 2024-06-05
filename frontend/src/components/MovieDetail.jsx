import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdPlay } from "react-icons/io";

const MovieDetail = ({ dataDetails, onHideDetails }) => {
  return (
    <div className="movie-details-all">
      <img src={dataDetails.image} alt={dataDetails.name} />
      <div className="movie-details-title">
        <div>
          <p className="movie-details-header">{dataDetails.name}</p>
          <div className="movie-deatails-body-time">
            <span>{dataDetails.time} min </span>
            <span>{dataDetails.year}</span>
          </div>
        </div>
        <div className="movie-details-introduce">{dataDetails.introduce}</div>
        <div>
          <button className="btn-movie-detail">
            {" "}
            <IoMdPlay />
            <p>PLAY MOVIE</p>
          </button>
        </div>
      </div>
      <IoCloseOutline
        style={{
          cursor: "pointer",
        }}
        size={60}
        onClick={onHideDetails}
      />
    </div>
  );
};

export default MovieDetail;
