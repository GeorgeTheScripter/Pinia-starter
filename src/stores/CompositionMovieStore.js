import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export const useCompositionMovieStore = defineStore(
  "CompositionMovieStore",
  () => {
    const movies = ref([]);
    const activeTab = ref(2);

    const moviesInLocalStorage = localStorage.getItem("movies");

    if (moviesInLocalStorage) {
      movies.value = JSON.parse(moviesInLocalStorage);
    }

    const wathedMovies = computed(() => {
      return movies.value.filter((el) => el.isWatched);
    });

    const totalCountMovies = computed(() => {
      return movies.value.length;
    });

    const addMovie = (movie) => {
      movies.value.push(movie);
    };

    const setActiveTab = (id) => {
      activeTab.value = id;
    };

    const toggleWatched = (id) => {
      const idx = movies.value.findIndex((el) => el.id === id);
      movies.value[idx].isWatched = !movies.value[idx].isWatched;
    };

    const deleteMovie = (id) => {
      movies.value = movies.value.filter((el) => el.id !== id);
    };

    watch(
      () => movies,
      (state) => localStorage.setItem("movies", JSON.stringify(state._value)),
      { deep: true }
    );

    return {
      movies,
      activeTab,
      wathedMovies,
      totalCountMovies,
      addMovie,
      setActiveTab,
      toggleWatched,
      deleteMovie,
    };
  }
);
