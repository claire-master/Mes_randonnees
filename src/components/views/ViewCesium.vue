<template>
  <div id="cesium-container">
    <div id="toolbar"></div>
      <div id="zoomButtons"></div>
        <select class="cesium-button">
            <option value="undefined">Débutant</option>
            <option value="undefined">Moyen</option>
            <option value="undefined">Expert</option>
        </select>
  </div>
</template>

<script>
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from 'cesium';

const mygeojson = require('@/assets/data/donnees_rando_4326.json')

export default {
  name: "CesiumGlobeView",
  data() {
    return{
      center: [7.15, 46.35],
      defaultheight:3000.,
      viewer:null
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


    importjson (){
      this.viewer.dataSources.add(Cesium.GeoJsonDataSource.load(mygeojson, {
        stroke: Cesium.Color.RED,
        fill: Cesium.Color.RED,
        strokeWidth: 3,
        markerSymbol: '?',
        clampToGround: true
      }));
    },

  },
  mounted() {
    // add cesium ion token to the app
    Cesium.Ion.defaultAccessToken = process.env.VUE_APP_CESIUM_ION_TOKEN;
    
    this.viewer = this.setupCesiumGlobe();
    this.flytodirection(this.center,this.defaultheight,this.viewer)

    this. viewer = this.importjson();
    //this.viewer.zoomTo(dataSource);
  },
};
</script>

<style scoped>
#cesium-container {
  height: 500px;
  
}
</style>