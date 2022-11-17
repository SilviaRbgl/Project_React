import React, { useEffect, useState } from "react";
import { data } from "../API-data/response";
import Movie from "../Components/Movie";
import Pagination from "../Components/Pagination";
import SearchBar from "../Components/SearchBar";


function Movies() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchMovies = async () => {
    try {
      // const url = `https://imdb-api.com/en/API/Top250Movies/${process.env.REACT_APP_KEY}`
      // const response = await fetch();
      // const result = await response.json();
      // setMovies(result.items);
      // const paginatedMovies = [];
      // data.items.map((res, index) => {
      //   if (10 > index <= 20) {
      //     // create variables for each number, modifie those values with onclick, and put them in the useEffect as dependecy
      //     paginatedMovies.push(res);
      //   }
        // console.log("paginatedMovies:>> ", paginatedMovies);
      // });
      // setMovies(paginatedMovies);
      // setMovies(data.items); // use this line if you want to preserve the "fetch" behaviour, but with local data
      // console.log("movies from data>>>", data.items);
      // console.log("movies>>>", result.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const getInput = (input) => {
    console.log("get input>>", input);

    setSearch(input);
    console.log("search >>", search);
  };

  const filterMovies = () => {
    const filteredMovies = movies.filter((movie) => {
      return movie.title.toLowerCase().includes(search.toLowerCase());
    });
    return filteredMovies;
  };


  return (
    <div className="container-main">
      <SearchBar getInput={getInput} />
      {/* <>
        {filterMovies().map((movie, index) => {
          return <Movie key={movie.id} movie={movie} search={search} />;
        })}
      </> */}
      
      <>
      {data.items.length > 0 ? (
        <>
          <Pagination
            data={data.items}
            RenderComponent={Movie}
            title="Movies"
            pageLimit={5}
            dataLimit={24}
          />
        </>
      ) : (
       <h1>No Posts to display</h1>
      )}
      </>
      
    </div>
  );
}

export default Movies;
