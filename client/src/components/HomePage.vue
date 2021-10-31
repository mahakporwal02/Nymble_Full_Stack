<template>
  <div>
    <input id="movie" />
    <button class="btn btn-primary" @click="search">Search</button>
    <div v-for="movie in movies" v-bind:key="movie.id" class="card" style="width: 18rem">
      <img
        class="card-img-top"
        width="200px"
        height="200px"
        :src="movie.src"
        alt="Card image cap"
      />
      <div class="card-body">
        <router-link :to="{path:'/'+movie.id}"><a><h5 class="card-title">{{movie.title}}</h5></a></router-link> 
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  name: "HomePage",
  data: function () {
    return {
      movies: [],
    };
  },
  async created() {
    const response = await axios.get("http://127.0.0.1:5000/movies");
    this.movies = response.data;
    console.log(this.movies);
  },
  methods: {
    async search() {
      var a = (<HTMLInputElement>document.getElementById("movie")).value;
      const response = await axios.get(
        "http://localhost:5000/movies?search=" + a
      );
      this.movies = response.data;
    },
  },
});
</script>
