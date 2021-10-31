<template>
  <div>
    <img :src="details[0].src" />
    <h1>{{ details[0].title }}</h1>
    <h2>Release Date: {{ details[0].release_date }}</h2>
    <h2>Popularity: {{ details[0].popularity }}</h2>
    <h3>Vote Average: {{ details[0].vote_average }}</h3>
    <h3>Vote Count: {{ details[0].vote_count }}</h3>
    <p>Overview: {{ details[0].overview }}</p>
    <h2>Rate {{ details[0].title }}</h2>
    <input id="Rating" />
    <button @click="Rate">Rate</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Details",
  data: function () {
    return {
      details: [],
    };
  },
  async created() {
    const response = await axios.get(
      "http://127.0.0.1:5000/movies/" + this.$route.params.id
    );
    this.details = response.data;
    console.log(this.details);
  },
  methods: {
    async Rate() {
      var Rating = document.getElementById("Rating");
      if (Rating != null) {
        const response = await axios.post(
          `http://127.0.0.1:5000/movies/${this.$route.params.id}/ratings`,
          { ratingVal: Rating }
        );
        this.details = response.data;
      }
    },
  },
};
</script>
