<template>
  <main>
    <header class="header">
      <img src="/logo.svg" alt="logo" class="header-logo" />
      <h2>My Favorite Movies</h2>
    </header>

    <div class="tabs">
      <button
        @click="setTab(1)"
        :class="['btn', { btn_green: movieStore.activeTab === 1 }]"
      >
        Favorite
      </button>
      <button
        @click="setTab(2)"
        :class="['btn', { btn_green: movieStore.activeTab === 2 }]"
      >
        Search
      </button>
    </div>

    <div v-if="movieStore.activeTab === 1" class="movies">
      <h3>Watched movies</h3>
      <Movie
        v-for="movie in movieStore.wathedMovies"
        :key="movie.id"
        :movie="movie"
      />

      <h3>All movies (count: {{ movieStore.totalCountMovies }})</h3>
      <Movie
        v-for="movie in movieStore.movies"
        :key="movie.id"
        :movie="movie"
      />
    </div>

    <div v-else class="search">
      <h3>Search</h3>
    </div>
  </main>
</template>

<script>
import Movie from "./components/Movie.vue";
import { useMovieStore } from "./stores/MovieStore";

// const movieStore = useMovieStore();
// const setTab = (id) => {
//   movieStore.setActiveTab(id);
// };
export default {
  components: {
    Movie,
  },
  data() {
    return {
      movieStore: useMovieStore(),
    };
  },

  methods: {
    setTab(id) {
      this.movieStore.setActiveTab(id);
    },
  },
};
</script>

<style>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.header-logo {
  max-width: 50px;
  margin-right: 10px;
}
.btn {
  border: none;
  width: 100px;
  height: 40px;
  font-size: 14px;
  margin: 0 10px;
  border-radius: 10px;
  cursor: pointer;
  background: #efefef;
}
.btn:hover {
  opacity: 0.7;
}
.btn_green {
  background: #37df5c;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
</style>
