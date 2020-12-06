<template>
  <div class="top_right">
    <img v-on:click="localisation(this)" src="../../assets/localisation.png" style="width:30px;height:30px;"/>
    <img v-on:click="changeImageMap(this)" src="../../assets/bingaerial.png" style="width:30px; height:30px;"/>
  </div>  
  
  <div class="dropdown is-active">
    <div class="dropdown-trigger">
      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
        <span>Mes randonnees</span>
        <span class="icon is-small">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <a href="#" class="dropdown-item is-active">
          Débutant
        </a>
        <a href="www.google.ch" class="dropdown-item">
          Moyen
        </a>
        <a href="#" class="dropdown-item">
          Expert
        </a>
        <hr class="dropdown-divider">
        <a href="#" class="dropdown-item">
          Toutes les randonnees
        </a>
      </div>
    </div>
  </div>
 
  <div id="ol-container" class="map"></div>


</template>

<script>
/** import des composants Openlayers*/
import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import BingMaps from 'ol/source/BingMaps';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import * as olProj from 'ol/proj';
import Geolocation from 'ol/Geolocation';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import {Fill, Stroke, Circle, Style} from 'ol/style';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';


import {watchposition} from '../../services/geolocation.js'
//import {changeImageMap} from '../../services/changeimage.js'

/**import {} from '../../services/menu.js'*/

export default {
  data() {
    return{
      center: [7.15, 46.35],
      olmap:null,
      zoom: 15,
      layersOSM: (
        new TileLayer({
          source: new OSM(),
        })),
      layersBingMaps: (
        new TileLayer({
          source: new BingMaps({
            key: 'AkGbxXx6tDWf1swIhPJyoAVp06H0s0gDTYslNWWHZ6RoPqMpB9ld5FY1WutX8UoF',
            imagerySet: 'Aerial'}),
        })),     
      geo_options: {
        enableHignAccuracy: true,
        maximumAge        : 30000, 
        timeout           : 27000
      }, 
      position: null,
    }


  },
  computed:{
    /**
     * Transform coordinate from EPSG:4326 to EPSG:3857
     * 
     * @use center in EPSG:4326
     * @return center in EPSG:3857
     */
    center3857(){
      return olProj.transform(this.center, 'EPSG:4326', 'EPSG:3857');
    }


  },
  methods: {
    /**
     * Init Openlayers map
     * 
     * @param {number[]} mapcenter center of the map in EPSG:3857
     * @param {number} mapzoom zommlevel
     * @returns {Map} initmap new openlayers map
     */
    setupMap (mapcenter,mapzoom) {
      return new Map({
        target: 'ol-container',
        view: new View({
          center: mapcenter,
          zoom: mapzoom,
        //visible: 1,
        })
      })
    },

    changeImageMap(image) {
      if (image.src.match('../../assets/bingaerial.png')) {
        image.src = "../../assets/osm.png";
        layersBingMaps.setVisible(true);
        layersOSM.setVisible(false);                    
      }
      else if (image.src.match("../../assets/osm.png")) {
        image.src = '../../assets/bingaerial.png';
        layersOSM.setVisible(true);
        layersBingMaps.setVisible(false); 
      }
    },

    // méthodes pour obtenir la géolocalisation 
    marker(position){
      console.log(position.coords.accuracy, position.timestamp, position.coords.latitude, position.coords.longitude);
      var coordinates = [position.coords.latitude, position.coords.longitude];
      return coordinates

    },

    message(message){
       alert (message);
    },

    localisation(callback, errorcallback, geooptions){
      watchposition(callback, errorcallback, geooptions)
    }, 

    posPoint(coordinates, map){
      var positionFeature = new Feature();
      positionFeature.setGeometry(coordinates ?
        new Point(coordinates): null);

      new VectorLayer({
        map: map,
        source: new VectorSource({
          features:[positionFeature]
        })
      });
    },

    //import GeoJSON
    readFeature(features){
      //var myfeature = features.item(0);
      var code = features.get('CAT_CODE');
      console.log(code);
    },

    importGeoJSON (){
      var geojson = new VectorLayer({
        source: new VectorSource({
          projection : 'EPSG:3857',
          url: 'donnees_rando_3857_def.geojson',
          format: new GeoJSON(),
        })
      })
      //console.log(new GeoJSON().readFeatures('../../assets/data/donnees_rando_3857_def.geojson'))
      //console.log(geojson.parse)
      //this.olmap.addLayer(geojson)
      //this.readFeature(geojson)
      //console.log(this.olmap)
    },



  },
  
  mounted() {
    this.olmap = this.setupMap(this.center3857,this.zoom);
    this.olmap.addLayer(this.layersBingMaps);
    this.olmap.addLayer(this.layersOSM);
    //this.olmap.getvisible(OSM);


    //this.localisation(this.marker, this.message, this.geo_options);
    this.posPoint(this.localisation(this.marker, this.message, this.geo_options), this.olmap)

    //this.olmap.addLayer(
    this.importGeoJSON();
    //this.content = JSON.parse(importGeoJSON);


  }, 

}
</script>

<style scoped>

.top_right{
  width:30px;
  height:30px;
}
  
.map {
  height: 500px;
}

</style>