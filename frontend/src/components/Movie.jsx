import React, { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import MovieDetail from "./MovieDetail";
import axios from "axios";

const Movie = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showMovieDetails, setShowMovieDetails] = useState(false);
  const [dataDetails, setDataDetails] = useState(null);
  const moviesPerPage = 4;
  useEffect(() => {
    try {
      const getData = async () => {
        const { data } = await axios.get("http://localhost:8080/films");
        setData(data.data);
      };
      getData();
      console.log(data);
    } catch (e) {
      console.log("Lỗi");
    }
  }, []);

  const startIndex = currentPage * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const currentMovies = data.slice(startIndex, endIndex);

  const handleShowDetails = (item) => {
    setShowMovieDetails(true);
    setDataDetails(item);
  };

  const handleHideDetails = () => {
    setShowMovieDetails(false);
  };

  const handleNext = () => {
    if (endIndex < data.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="movie-all">
      {showMovieDetails ? (
        <MovieDetail
          dataDetails={dataDetails}
          onHideDetails={handleHideDetails}
        />
      ) : (
        <div>
          <div className="movie-header">
            <IoMdMenu />
            <div className="header">
              <span className="header-title">MOVIE</span>
              <span className="header-ui">UI</span>
            </div>
            <IoSearch />
          </div>
          <div className="movie-body">
            <div className="movie-body-header">Most Popular Movies</div>
            <div className="movie-body-content">
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                className="nav-button"
              >
                <IoIosArrowBack />
              </button>
              <div className="movie-body-item">
                {currentMovies.map((item) => (
                  <div
                    key={item._id}
                    className="movie-item"
                    onClick={() => handleShowDetails(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="movie-image"
                    />
                    <p>{item.name}</p>
                    <div className="movie-body-time">
                      <span>{item.time} min </span>
                      <span>{item.year}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={handleNext}
                disabled={endIndex >= data.length}
                className="nav-button"
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
