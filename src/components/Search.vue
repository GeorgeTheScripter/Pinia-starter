<template>
  <div>
    <h3>Search</h3>

    <form @submit.prevent="searchStore.getMovies(searchMovie)">
      <input
        type="text"
        class="search-input"
        placeholder="Search movie..."
        v-model="searchMovie"
      />
    </form>

    <Loader v-if="searchStore.isloading" />

    <div v-else class="movies">
      <Movie
        v-for="movie in searchStore.movies"
        :key="movie.id"
        :movie="movie"
        :is-searched="true"
      />
    </div>
  </div>
</template>

<script>
import { useSearchStore } from "../stores/SearchStore";
import { useCompositionSearchStore } from "../stores/CompositionSearchStore";
import Loader from "./Loader.vue";
import Movie from "./Movie.vue";

export default {
  components: {
    Loader,
    Movie,
  },
  data() {
    return {
      searchStore: useCompositionSearchStore(),
      searchMovie: "",
    };
  },
};
</script>

<style scoped>
.search-input {
  border: 1px solid #e7e7e7;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  margin-bottom: 20px;
  border-radius: 10px;
}
</style>
