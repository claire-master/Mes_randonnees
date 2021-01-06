# Rapport 
## Découvrez les randonnées de Suisse
### MDT - GIO1
#### Claire Monney et Marie Tombez

___

## Concept
**Dans le cadre du cours.... TO DO**

Le concept de notre projet est de permettre aux randonneurs d'avoir un site qui resensse toutes les randonnées possible. La carte 2D permet de visualiser les randonnées classées par difficulté sur un fond de carte graphique ou sur une orthophoto. La carte 3D permet une immersion concrète dans le terrain grâce à la projection des randonnées sur un MNT.

L'activation de la géolocalisation permet à l'utilisateur de savoir où il se situe exactement sur la carte 2D.

## Démarche

**Axios Marie**
Openlayer Claire
Cesium Deux
communication constante
aide des prof
___

## Données
Les données utilisées pour les fonds de cartes sont opensources. CONTRÔLER BING MAPS OPENSOURCES/GRATUIT
Les randonnées ont été extraites par le site AsitVD en format Shapefile. Afin de les introduire dans notre projet, nous avons du transformer ce fichier en GeoJson et reprojecter dans un autre système de projection afin qu'il soit compatible avec Openlayer et Cesium.
___

## Problèmes
**TO DO**
+ chrome/fierfox avec menu déroulant -> selection/affichage rando selon niveau
+ projection Openlayer/cesium -> Mercartor/WGS84 ET Asitvd MN95 -> transformation manuelle QGIS
+ GitHub: difficulté de compréhension et coordination pour l'échange, peur d'écraser des fichiers plus à jour -> solution backup sur dropbox
  * documents en ordre mais problème de reprise de "Master" via invit de commande
___

## Conclusion
Notre projet permet à l'utilisateur de se préparer avant de partir en randonnées grâce aux niveaux de difficultés présentées sur la carte 2D ainsi que par l'immersion 3D qui permet une bonne vision des dénivellées. 
Une fois en randonnée, les personnes peuvent activer la géolocalisation afin de se repérer en tout temps sur la carte 2D.
___

## Perspectives
+ Activation de la géolocalisation via un bouton sur carte 2D afin qu'elle ne soit pas activé par défaut
+ Découverte de la randonnée -> profil, durée, distance
+ Voir la vue depuis le promeneur en 3D

___

## Documentation
### Fonctionnalités
#### Recherche
Nous avons utilisé les démarches Axios.
**MARIE**
#### Carte 2D
La carte 2D a été élaborée via le langage OpenLayer. Cette carte permet de faire trois oppérations différentes.
+ Carte: 
  * Deux fonds de carte: OSM et ortophoto (BingMaps)
  * Visualisation des randonnées via l'import du fichier GeoJSON.
+ Geolocalisation:
  * Indication dela géolocalisation par un point bleu
+ Choix des niveaux:
  * 4 boutons permettent de choisir les randonnées à afficher.
    + Image randonnées permet d'afficher toutes les randonnées
    + Image bleue/blanc permet d'afficher les randonnées niveau expert
    + Image rouge/blanc permet d'afficher les randonnées niveau moyen
    + Image jaune permet d'afficher les randonnées niveau débutant
#### Carte 3D
La partie 3D est élaboré grâce au language Cesium. Cette carte permet de visualiser les randonnées grâce à un fichier GeoJSON
**TO DO**
___
