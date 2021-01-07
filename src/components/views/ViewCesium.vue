<template>
  <div id="cesium-container"></div>
</template>

<script>
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from 'cesium';
import {watchposition} from '../../services/geolocation.js';

const mygeojson = require('@/assets/data/donnees_rando_4326.json')

export default {
  name: "CesiumGlobeView",
  data() {
    return{
      center: [7.15, 46.35],
      defaultheight:3000.,
      viewer:null,

      geo_options: {
          enableHignAccuracy: true,
          maximumAge        : 30000, 
          timeout           : 27000
      } 
    }
  },
  methods: {
    /**
     * Fly to position 
     * 
     * @param {number[]} globecenter position to fly to
     * @param {number} globeheight altitude
     * @param {Viewer} viewer cesium viewer
     */
    flytodirection(globecenter,globeheight,viewer){
      viewer.camera.flyTo({
        destination : Cesium.Cartesian3.fromDegrees(globecenter[0], globecenter[1], globeheight)
      });
    },
    /**
     * Init Cesium globe
     * 
     * @returns {Viewer} viewer from cesium
     */
    setupCesiumGlobe () {
      let viewer = new Cesium.Viewer('cesium-container', {
        terrainProvider: new Cesium.createWorldTerrain()
      });
      viewer.scene.primitives.add(Cesium.createOsmBuildings());
      return viewer;
    },

    // import et affichage des randonnees via le fichier geojson
    importjson (){
      this.viewer.dataSources.add(Cesium.GeoJsonDataSource.load(mygeojson, {
        stroke: Cesium.Color.RED,
        fill: Cesium.Color.RED,
        strokeWidth: 3,
        markerSymbol: '?',
        clampToGround: true
      }));
    },

    // fonctions pour la geolocalisation
    marker(position){
      console.log(position.coords.longitude, position.coords.latitude);
      this.posPoint(position.coords.longitude,position.coords.latitude);
    },

    message(message){
       alert (message);
    },

    // affichage d'un point au lieu de la localisation
    posPoint(lon, lat){
      this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(lon, lat),
        point:{
          pixelSize: 12,
          color: Cesium.Color.RED,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
      });
    }

  },
  mounted() {
    // add cesium ion token to the app
    Cesium.Ion.defaultAccessToken = process.env.VUE_APP_CESIUM_ION_TOKEN;
    
    this.viewer = this.setupCesiumGlobe();
    this.flytodirection(this.center,this.defaultheight,this.viewer);

    this.importjson();

    watchposition(this.marker, this.message, this.geo_options);
  },
};
</script>

<style scoped>
#cesium-container {
  height: 800px;
  
}
</style>