<template>
  <!-- Bulma: menu tabs -->
  <div id="trump-card" class="card">
    <div class="card-content">
    <div id="app">
      Chercher un lieu <input v-model="name">
      
    <router-link to="/Openlayers">  
      <button @click="recherche_lieu(apiURL)" >Ok</button>
    </router-link>
    
    </div>  
      <p class="title">
        “{{trumpquote}}”
      </p>
      <p class="subtitle">
        Dépêche toi de découvrir ta randonnée
      </p>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item">
        <span>
          C'est parti !!! <a target="_blank" rel="noopener noreferrer" :href="tronalddumpURL">@Tronald Dump</a>
        </span>
      </p>
    </footer>
  </div>
  <!-- end Bulma: menu tabs -->
</template>

<script>
import axios from 'axios'
//import {recherche}from '../../services/recherche.js'

export default {
  data(){
    return{
    //  tronalddumpURL:"https://www.tronalddump.io/",
      apiURL:'https://api3.geo.admin.ch/rest/services/api/SearchServer?searchText=wabern&type=locations',
        
      query:name,
      type:"&type=locations",
      trumpquote:""
    }
  },
 
  methods: {
    /**
     * [Get] dumb quote from Donald Trump
     * 
     * @param {String} url url of the api
     * @param {String} query query send to the api (word)
     * @returns {Promise<String>} quote from the API || default string if quote not found || default string if error
     * @catch error from the request 
     */
    async recherche(url,query,type){
      let response = await axios.get(url+query+type)
      .then(function (response) {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
        return 0
      })
      //request error
      if(response == 0){
        return "Ouch an error occurred"
      }
      // don't find an answer
      if(response.data.count == 0){
        return "Didn't found any answers"
      }
      // Get first quote
      return response.data._embedded.quotes[0].value;
    }
  },
}
</script>

<style scoped>
#trump-card{
  width: 50%;
  margin: auto;
}
</style>
