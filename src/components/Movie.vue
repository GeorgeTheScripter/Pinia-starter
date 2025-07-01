<template>
  <div class="movie">
    <img
      :src="`${movie.poster?.previewUrl}`"
      :alt="movie.name"
      class="movie-img"
    />

    <div>
      <div class="movie-name">
        {{ movie.name || movie.alternativeName }} ({{ movie.year }})

        <span class="movie-overview">{{ movie.description }}</span>
      </div>
      <div class="movie-buttons" v-if="!isSearched">
        <button
          @click="toggleWatched(movie.id)"
          class="btn movie-buttons-watched"
        >
          <span v-if="movie.isWatched">Unwatched</span>
          <span v-else>Watched</span>
        </button>

        <button @click="deleteMovie(movie.id)" class="btn movie-buttons-delete">
          delete
        </button>
      </div>

      <div v-else>
        <button
          class="btn movie-buttons-delete"
          @click="addToMovieFavorite(movie)"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useMovieStore } from "../stores/MovieStore";
import { useCompositionMovieStore } from "../stores/CompositionMovieStore";
import { useSearchStore } from "../stores/SearchStore";
import { useCompositionSearchStore } from "../stores/CompositionSearchStore";

export default {
  data() {
    return {
      movieStore: useCompositionMovieStore(),
      searchStore: useCompositionSearchStore(),
    };
  },
  props: {
    movie: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    isSearched: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    toggleWatched(id) {
      this.movieStore.toggleWatched(id);
    },
    deleteMovie(id) {
      this.movieStore.deleteMovie(id);
    },
    addToMovieFavorite(movie) {
      console.log(movie);
      this.searchStore.addToMovieFavorite(movie);
    },
  },
};
</script>

<style scoped>
.movie {
  display: grid;
  grid-template-columns: 200px 1fr;
  column-gap: 30px;
  margin-bottom: 20px;
  border: 2px solid #efefef;
  padding: 10px;
  border-radius: 10px;
}

.movie-accept {
  margin-right: 10px;
}

.movie-img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
}

.movie-name {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex-direction: column;
  font-size: 20px;
  margin-bottom: 20px;
}

.movie-overview {
  display: block;
  margin-bottom: 20px;
}

.movie-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}

.movie-buttons-watched {
  color: #fff;
  background: #1eb4c3;
}

.movie-buttons-watched__icon {
  width: 15px;
  margin-left: 10px;
}

.movie-buttons-delete {
  color: #fff;
  background: #ff2a2a;
}
</style>
