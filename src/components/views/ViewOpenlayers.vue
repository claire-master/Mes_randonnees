<template>
  <div class="top_right">
    <img
      v-on:click="watchposition(marker(), message(), geo_options)"
      src="../../assets/localisation.png"
      style="width: 30px; height: 30px"
    >

    <img
      v-on:click="changeImageMap($event)"
      src="../../assets/bingaerial.png"
      style="width: 30px; height: 30px"
    >
  </div>

  <div class="test">
    <img
      v-on:click="changeJSON('toutes les randonnees')"
      src="../../assets/rando.png"
      style="width: 80px; height: 30px"
    >

    <img
      v-on:click="changeJSON('expert')"
      src="../../assets/expert.png"
      style="width: 30px; height: 30px"
    >
    <img
      v-on:click="changeJSON('moyen')"
      src="../../assets/moyen.png"
      style="width: 30px; height: 30px"
    >

    <img
      v-on:click="changeJSON('debutant')"
      src="../../assets/debutant.png"
      style="width: 30px; height: 30px"
    >
 </div>   


  <div class="field">
    <div class="control">
      <div class="select is-primary" onChange={this.onSelect}>
        <select>
          <option>Toutes les randonnées</option>
          <option>Débutant</option>
          <option>Moyen</option>
          <option v-on:click="changeJSON('expert')">Expert</option>
        </select>
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

const mygeojson = require('@/assets/data/donnees_rando_3857_def.json')


export default {
  
  props:{lat:Number, lon:Number},
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
    },

    layerDebutant(){
    return this.importGeoJSON(1, 'yellow');
    },
    

    layerMoyen(){
      return this.importGeoJSON(2, 'red');
    },

    layerExpert(){
      return this.importGeoJSON(3, 'blue');
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
        })
      })
    },

    changeImageMap(event) {
      if (event) {
        this.layersBingMaps.setVisible(true);
        this.layersOSM.setVisible(false);                    
      };
      
      // else (event) {
      //   this.layersOSM.setVisible(true);
      //   this.layersBingMaps.setVisible(false); 
      // }
    },

    // méthodes pour obtenir la géolocalisation 
    marker(position){
      //console.log(position.coords.accuracy, position.timestamp, position.coords.latitude, position.coords.longitude);
      var coordinates = [position.coords.longitude, position.coords.latitude];
      //console.log(coordinates)
      coordinates = olProj.transform(coordinates, 'EPSG:4326', 'EPSG:3857');
      this.posPoint(coordinates);
      
    },

    message(message){
       alert (message);
    },

    //dessin d'un cercle à la position
    posPoint(coordinates){
      var positionFeature = new Feature();
      positionFeature.setGeometry(coordinates ?
        new Point(coordinates): null);

      var layer = new VectorLayer({
        source: new VectorSource({
          features:[positionFeature]
        }),
        style: new Style({
          image: new Circle({
            radius: 6,
            fill: new Fill({
              color: '#3399CC'
            }),
          })          
        }),
      });
      this.olmap.addLayer(layer)
    },

    //import GeoJSON

    //reprendre les données pour trier les randos
    /*readFeature(features){
      //var myfeature = features.item(0);
      var code = features.get('CAT_CODE');
      console.log(code);
    },*/

    importGeoJSON (cat, col){
      var geojson = new VectorLayer({
        source: new VectorSource({
          features: new GeoJSON().readFeatures(this.filtreJSON(mygeojson,cat))
        }),
        style: new Style({
          stroke: new Stroke({
            color: col,
            width: 2,
          })
        })

      })
      return geojson
      //this.olmap.addLayer(geojson)

      //lire les infos du geojson
     // var json = readFeatures(mygeojson);
     // var obj = JSON.parse(json);
     // console.log(obj.CAT_CODE);
    },


    filtreJSON(geojson, cat){
      var jsoncopie = JSON.parse(JSON.stringify(geojson))
      var jsonfiltre = geojson.features.filter(function (entry) {
        return entry.properties.CAT_CODE === cat;
      });
      jsoncopie.features = jsonfiltre;
      console.log(mygeojson);
      return jsoncopie;
    },

    changeJSON(value) {
      if (value == "expert") {
        this.layerDebutant.setVisible(false);
        this.layerMoyen.setVisible(false);
        this.layerExpert.setVisible(true);
      };
      if (value == "moyen") {
        this.layerDebutant.setVisible(false);
        this.layerMoyen.setVisible(true);
        this.layerExpert.setVisible(false);
      };
      if (value == "debutant") {
        this.layerDebutant.setVisible(true);
        this.layerMoyen.setVisible(false);
        this.layerExpert.setVisible(false);
      };
      if (value == "toutes les randonnees") {
        this.layerDebutant.setVisible(true);
        this.layerMoyen.setVisible(true);
        this.layerExpert.setVisible(true);
      };
    },

    //zoom sur la carte depuis Axios
    // this.searchLieu.lieu = response.data.results[0].attrs.label;
    // this.searchLieu.lat = response.data.results[0].attrs.lat;
    // this.searchLieu.lon = response.data.results[0].attrs.lon;
    setcenter(lon, lat){
      if(lat != null){
        this.olmap.getView().setCenter(olProj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
      }
    }

  },
  
  mounted() {
    this.olmap = this.setupMap(this.center3857,this.zoom);
    this.olmap.addLayer(this.layersBingMaps);
    this.olmap.addLayer(this.layersOSM);
    //this.olmap.getvisible(OSM);


    //this.localisation(this.marker, this.message, this.geo_options);
    //this.posPoint(watchposition(this.marker, this.message, this.geo_options), this.olmap);
    // watchposition(this.marker, this.message, this.geo_options);
    this.olmap.addLayer(this.layerDebutant);
    this.olmap.addLayer(this.layerMoyen);
    this.olmap.addLayer(this.layerExpert);
    //this.content = JSON.parse(importGeoJSON);

    this.setcenter(this.lon, this.lat);
  }, 

}
</script>

<style scoped>
.top_right {
  width: 30px;
  height: 20px;
}

.map {
  height: 500px;
}
</style>