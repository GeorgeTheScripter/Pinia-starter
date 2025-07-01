import { defineStore } from "pinia";
import axios from "axios";
import { useMovieStore } from "./MovieStore";

const url = "/api/v1.4/movie/search?page=1&limit=10&query=";

export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    isloading: false,
    movies: [],
  }),

  actions: {
    async getMovies(search) {
      try {
        this.isloading = true;
        const response = await axios.get(`${url}${search}`, {
          headers: {
            "X-API-KEY": "AZFXD6Q-BYVMST7-K3QVXV4-YDW9NDF",
          },
        });
        this.movies = await response.data.docs;
        console.log(this.movies);
      } catch (error) {
        console.log(error);
      } finally {
        this.isloading = false;
      }
    },

    addToMovieFavorite(movie) {
      const { movies, setActiveTab } = useMovieStore();
      movies.push({ ...movie, isWatched: false });
      setActiveTab(1);
    },
  },
});
