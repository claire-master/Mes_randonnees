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


    importjson (){
      this.viewer.dataSources.add(Cesium.GeoJsonDataSource.load(mygeojson, {
        stroke: Cesium.Color.RED,
        fill: Cesium.Color.RED,
        strokeWidth: 3,
        markerSymbol: '?',
        clampToGround: true
      }));
    },

    marker(position){
      // console.log(position.coords.accuracy, position.timestamp, position.coords.latitude, position.coords.longitude);
      // var coordinates = [position.coords.longitude, position.coords.latitude];
      console.log(position.coords.longitude, position.coords.latitude)
      // coordinates = olProj.transform(coordinates, 'EPSG:4326', 'EPSG:3857');
      this.posPoint(position.coords.longitude, position.coords.latitude);
    },

    message(message){
       alert (message);
    },

    posPoint(lon, lat){
      this.viewer.entities.add({
        position : Cesium.Cartesian3.fromDegrees(lon, lat),
        Point : {
          pixelSize : 5,
          color : Cesium.Color.RED,
          outlineColor : Cesium.Color.WHITE,
          outlineWidth : 2
        },
        // label : {
        //   text : 'Vous êtes ici',
        //   font : '14pt monospace',
        //   style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        //   outlineWidth : 2,
        //   verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
        //   pixelOffset : new Cesium.Cartesian2(0, -9)
        // }
      });
      console.log('coucou')
    }


  },
  mounted() {
    // add cesium ion token to the app
    Cesium.Ion.defaultAccessToken = process.env.VUE_APP_CESIUM_ION_TOKEN;
    
    this.viewer = this.setupCesiumGlobe();
    this.flytodirection(this.center,this.defaultheight,this.viewer)

    this.viewer = this.importjson();
    //this.viewer.zoomTo(dataSource);

    watchposition(this.marker, this.message, this.geo_options);
    this.viewer = this.posPoint(7.15, 46.35);
  },
};
</script>

<style scoped>
#cesium-container {
  height: 500px;
  
}
</style>