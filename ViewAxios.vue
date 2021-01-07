<template>

  <!-- mise en page et texte d'accueil -->
  <div id="card" class="card">
    <div class="card-content">
      <div id="app">
        Chercher un lieu <input v-model="query" />

        <!-- <router-link to="/Openlayers">   -->
        <button @click="recherche">Ok</button>
        <!-- </router-link> -->
      </div>
      <p class="subtitle">Dépêche toi de découvrir ta randonnée</p>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item">
        <span>
          C'est parti !!!
          <a target="_blank" rel="noopener noreferrer" :href="trucetastuce"
            >Astuces</a
          >
        </span>
      </p>
    </footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // liens pour recherche Axios et autres
      trucetastuce:"https://www.novo-monde.com/randonnee/#rando-journee",
      url:
        "https://api3.geo.admin.ch/rest/services/api/SearchServer?searchText=",
      query: "Diablerets",
      type: "&type=locations",
    };
  },

  methods: {
    /**
     *
     * @param {String} url url of the api
     * @param {String} query query send to the api (word)
     * @returns {Promise<String>} quote from the API || default string if quote not found || default string if error
     * @catch error from the request
     */
    async recherche() {
      let response = await axios
        .get(this.url + this.query + this.type)

        .catch((error) => {
          console.error(error);
          return null;
        });
      //request error

      if (response == null) {
        alert("Aie ça marche pas");
      } 
      else {
        console.log (response)
        // extraire les localisations du premier lieu ressorti de la recherche
        const resultlat = response.data.results[0].attrs.lat 
        const resultlong = response.data.results[0].attrs.lon 
        this.$router.push({
          name: "Openlayers",
          params: { lat: resultlat , lon: resultlong},
        });
      }

      return response;
    },
  },
};
</script>

<style scoped>
#card {
  width: 50%;
  margin: auto;
}
</style>
