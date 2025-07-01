import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useCompositionMovieStore } from "./CompositionMovieStore";

const url = "/api/v1.4/movie/search?page=1&limit=10&query=";

export const useCompositionSearchStore = defineStore(
  "CompositionSearchStore",
  () => {
    const movies = ref([]);
    const isLoading = ref(false);
    const movieStore = useCompositionMovieStore();

    const getMovies = async (search) => {
      try {
        isLoading.value = true;
        const response = await axios.get(`${url}${search}`, {
          headers: {
            "X-API-KEY": "AZFXD6Q-BYVMST7-K3QVXV4-YDW9NDF",
          },
        });
        movies.value = await response.data.docs;
      } catch (error) {
        console.log(error);
      } finally {
        isLoading.value = false;
      }
    };

    const addToMovieFavorite = (movie) => {
      movieStore.addMovie({ ...movie, isWatched: false });
      movieStore.setActiveTab(1);
    };

    return {
      movies,
      isLoading,
      getMovies,
      addToMovieFavorite,
    };
  }
);
