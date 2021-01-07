<template>
  <div class="top">
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

  <!-- boutons pour la selection des randonnees selon niveau -->
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

  <!-- menu deroulant pour le choix des niveaux (seulement sur Fierfox) -->
  <div class="field">
    <div class="control">
      <div class="select is-primary" onChange={this.onSelect}>
        <select>
          <option v-on:click="changeJSON('toutes les randonnees')">Toutes les randonnées</option>
          <option v-on:click="changeJSON('debutant')">Débutant</option>
          <option v-on:click="changeJSON('moyen')">Moyen</option>
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

    // creation d'une couche par niveau
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

    //permet d'afficher l'orthophoto
    changeImageMap(event) {
      this.layersBingMaps.setVisible(true);
      this.layersOSM.setVisible(false);                    
    },

    // méthodes pour obtenir la géolocalisation 

    marker(position){
      var coordinates = [position.coords.longitude, position.coords.latitude];
      console.log(coordinates)
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

    //import donnees par fichier GeoJSON
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
    },

    //parse du fichier afin d'effectuer le filtrage
    filtreJSON(geojson, cat){
      var jsoncopie = JSON.parse(JSON.stringify(geojson))
      var jsonfiltre = geojson.features.filter(function (entry) {
        return entry.properties.CAT_CODE === cat;
      });
      jsoncopie.features = jsonfiltre;
      console.log(mygeojson);
      return jsoncopie;
    },

    // fonction pour afficher les randonnees selon le niveau de difficulte
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

    // reprise des coordonnees de la recherche Axios et les appliquer au centrage de la carte
    setcenter(lon, lat){
      if(lat != null){
        this.olmap.getView().setCenter(olProj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
      }
    }

  },
  
  // affichage des calques et des fonctions
  mounted() {
    this.olmap = this.setupMap(this.center3857,this.zoom);
    this.olmap.addLayer(this.layersBingMaps);
    this.olmap.addLayer(this.layersOSM);
    this.olmap.addLayer(this.layerDebutant);
    this.olmap.addLayer(this.layerMoyen);
    this.olmap.addLayer(this.layerExpert);
    this.setcenter(this.lon, this.lat);
    //watchposition(this.marker, this.message, this.geo_options);

  }, 

}
</script>

<style scoped>
/* mise en page des classes */
.top {
  width: 30px;
  height: 20px;
}

.map {
  height: 500px;
}
</style>