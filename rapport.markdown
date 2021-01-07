# Rapport 
## Découvrez les randonnées de Suisse
### MDT - GIO1
#### Claire Monney et Marie Tombez

___

## Concept
Dans le cadre du cours "GIO1", du master en développement territorial, un travail de semestre a été proposé ayant comme objectif:

+ de nous apprendre à structurer un code: principe du code, modèle de conception et modèle architecturaux
+ d'utiliser GIT qui est un outil de gestion des versions de code afin de travailler à plusieurs sur un code et créer des branches, etc...
+ d'utiliser Vue JS qui un web Framework avec des géodonnées

Le choix du thème et des fonctionnalités nous étaient libres. Ce cours s'est déroulé lors du 3ème semestre et a été encadré par Monsieur Jens Ingensand, Thibaud Chassin et Mathias Oberson.

Le concept de notre projet est de permettre aux randonneurs d'avoir un site qui recense toutes les randonnées possible. La carte 2D permet de visualiser les randonnées classées par difficultés  sur un fond de carte graphique ou sur une orthophoto. La carte 3D permet une immersion concrète dans le terrain grâce à la projection des randonnées sur un MNT. L'activation de la géolocalisation permet à l'utilisateur de savoir où il se situe exactement sur la carte 2D et 3D.

Ce rapport explique la démarche qui a été mise en place au sein de notre groupe, les données utilisées pour la réalisation de ce projet, les divers problèmes rencontrés et les fonctionnalités implémenté. Pour terminer, un regard critique sur les perspectives/améliorations possibles seront discutées et nous terminerons par une conclusion.

## Démarche
Pour débuter notre projet, nous avons dû réaliser une maquette sur un thème qui nous convenait a toute les deux. Après plusieurs thèmes discutés, le thème qui est ressorti et la randonnée. Suite à la crise du Covid-19, ce thème est devenu fortement une activité à la mode et nous avons trouvé que celui-ci était approprié pour notre projet.

Après la mise en commun de nos diverses idées pour l'implémentation des fonctionnalités la création de notre maquette était alors née. Les fonctionnalités et les idées posées nous avons pu par la suite répartir les tâches entre nous deux. La démarche de notre projet s'est déroulée en 4 grandes étapes, soit: 

+ GITUB
+ Openlayer
+ Axios
+ Cesium 

Pour débuter notre projet, nous avons dû créer un GIT qui nous a permis de gérer les différentes versions de notre code et de pouvoir travailler à plusieurs sur ceux-ci. Une base de code, nous a été fourni par nos professeurs via GIT. Cette base est un framework Javascript open-source qui permet de construire une interface utilisateur et des applications web monopages. À l'aide de cette base, nous avons pu démarrer la rédaction de notre code. 

Dans un premier temps, nous avons dû prendre en main les différentes fonctionnalités de vue afin de comprendre son fonctionnement. Par la suite, nous avons créé notre cartographie 2D via Openlayer, dans lequel il nous était demandé de créer une fonctionnalité 2D et de créer une couche de visualisation 2 d. Par la suite, une recherche de localisation sur carte devait être réalisé celle-ci a été effectuer via Axios en parralel de la cartographie 2D. Pour terminer nous devions créer une cartographie 3D dans lequel, tous comme dans la cartographie 2D, une fonctionnalité 3D et une couche de visualisation 3D devaient être réalisées. Ces différentes fonctionnalités seront expliquées dans le chapitre "Fonctionnalité".

Lors de ce travail, nous avons gardé une constante communication entre nous deux afin d'avoir tous les deux, avants chaque cours une vision globale et une compréhension commune de notre code. De plus, habitant toutes les deux dans la même région, nous avons pu nous voir et communiquer en live pour les différentes questions que nous avions à poser pour les professeurs. Nous remercions l'aide de nos professeurs pour la réalisation de ce projet sans qui certaine fonctionnalité n'aurait pas forcément fonctionné.

___

## Données
### Geojson
Pour la réalisation de notre projet, il nous était nécessaire d'obtenir les données des chemins de randonnée pédestre. Ne voulant pas travailler avec des fichiers trop volumineux, nous nous somme concentré sur un secteur qui était les Diablerets. Les données ont été extraite via le site AsitVD et fourni par notre professeur Monsieur Jens Ingensand en format Shapefile.
Afin de les introduire dans notre projet, nous avons dû transformer ce fichier en GeoJson et reprojeter dans un autre système de projection afin qu'il soit compatible avec Openlayer et Cesium. A savoir que Openlayer travaille dans du Mercator et que Cesium travaille dans du WGS84 et que les données fournies étaient dans le système MN95.

### Fonds de carte 2D
Pour la création de nos fonds de carte 2D, nous avions déjà à disposition les données OpenStreet Map et celles-ci sont Open source. De plus, nous avons ajouté les données Bing Map, qui sont aussi opensource, pour le switch entre ces deux fonds de carte. 
___

## Problèmes
### Chrome/FireFox
Lors de la création d'un menu déroulant pour le choix des différents niveaux de marche. La fonction "v-on:click" ne fonctionnait pas sur chrome mais fonctionnait sur Firefox. N'ayant pas tout de suite réaliser que le problème venait de Chrome. Nous avons contourné le problème en créer des boutons. C'est seulement sur la fin du projet que nous avons réalisé ce problème et c'est la raison pour laquelle il est possible de passer par les deux styles de sélection.
### Projection des données dans Openlayer et Cesium
Pour l'introduction des données GeoJson, soit dans la carte 2D ou la carte 3D, nous avons eu des difficultés par rapport à la projection de celles-ci. Nous avons dû tout d'abord effectuer une transformation manuelle via QGIS de nos données Shapefile afin d'obtenir un format Geojson qui soit lisible par Openlayer et Cesium. Ces données étant en MN95, il était à savoir qu'Openlayer travaille en Mercator et que Cesium travaille en WGS84. Nous avons dû alors exporter à nouveau nos données en format GeoJson mais cette fois-ci dans le système de référence de Mercator et WGS84 afin de pouvoir utiliser celles-ci.
### GitHub
Pour la prise en main de GitHub, nous avons eu des difficultés de compréhension de cette plateforme. N'ayant pas l'habitude de travail avec celle-ci, nous avions peur d'écraser des fichiers plus à jour. Nous nous sommes plus aidé sur la solution de Dropbox comme backup et échange de nos données dans le groupe et une seule de nous deux gérait le GitHub.

De plus, nous avions eu des difficultés de reprise de "Master" via l'invite de commande lorsqu'un dépôts était effectué par l'autre du groupe.
___

## Conclusion
Notre projet permet à l'utilisateur de se préparer avant de partir en randonnées grâce aux niveaux des difficultés présentées sur la carte 2D ainsi que par l'immersion 3D qui permet une bonne vision des dénivelés. 
Une fois en randonnée, les personnes peuvent en tout temps observer leur géolocalisation  sur la carte 2D. Nous sommes satisfaite de notre projet qui remplit les exigences minimales demandées. De plus, nous avons apprécié ce cours qui nous a permis de découvrir de nouveaux outils pour notre expérience professionelle.
___

## Perspectives
Le résultat du projet est un guichet cartographique 2D et 3D avec des données vectorielles sur les randonnées pédestres dans le secteur des Diablerets. La création du code a été réalisée avec l’aide des professeurs ainsi que les informations trouvées sur Internet. Cependant certaines fonctionnalités n'ont pas pu être implémentées soit par l'apparition d'erreur soit par fautes de temps. Nous vous présentons, ci-dessous les fonctionnalités a implémenter pour améliorer notre projet:

+ Activation de la géolocalisation via un bouton sur la carte 2D afin qu'elle ne soit pas activée par défaut mais que l'utilisateur puisse choisir ou non d'afficher sa position

+ L'affichage du profil de la randonnée ainsi que la durée et la distance de celle-ci serait un outil bénéfique pour l'utilisateur. Ces différentes fonctionnalités permettraient à celui-ci d'identifier les parcours pour lesquels sa condition physique est adaptée. Comme illustré par l'image ci-dessous:

![Profil](https://www.wandern.ch/ewalc/images/ewalk2/922/profile/web.jpg)

+ Dans Cesium, il aurait été intéressant de pouvoir manipuler un promeneur qui effectue le parcours en 3D afin d'avoir une immersion complète du parcours.

___

## Documentation
Ce chapitre retrace les fonctionnalités implémentées dans le code en commençant par la première partie consacrée à la cartographie 2D. 
### Fonctionnalités
#### Recherche
Nous avons utilisé les démarches Axios pour effectuer la fonctionnalité de recherche. A l'aide de l'API de GeoAdmin nous avons pu extraire les longitudes et les latitudes des lieux introduient dans la boxe de recherche. Cette fonction permet à l'utilisateur d'effectuer un zoom sur la carte 2D du lieu souhaité.
De plus, un lien a été mise à disposition à l'utilisateur dans lequel celui-ci peut retrouver des conseils de préparation et d'équipements pour une journée de randonnées.  
#### Carte 2D
La carte 2D a été élaborée via le langage OpenLayer. Cette carte permet de faire trois opérations différentes, soit:

+ Pour la carte: 
  
  * Deux fonds de carte ont été mise à disposition pour l'utilisateur soit: 
    
    + OSM (OpenStreetMap) qui permet une visualisation plus graphique 
    + Ou une orthophoto via BingMaps qui permet d'avoir une visualisation aérienne
  
  * Une visualisation des randonnées via l'import du fichier GeoJSON permet à l'utilisateur de différencier les niveaux des randonnées caractérisées par trois couleurs pour les niveaux expert, moyen et débutant. 

+ Pour la géolocalisation:
  
  * La position de l'utilisateur est indiqué par un point bleu afin que celui-ci puisse retrouver sa position par rapport à la randonnée.

+ Choix des niveaux:
  
  * 4 boutons permettent de choisir les randonnées à afficher.
    
    + Image randonnée permet d'afficher toutes les randonnées
    
    + Image bleue/blanc permet d'afficher les randonnées niveau expert
    
    ![Moyen](https://www.valrando.ch/images/14594_e26f9b78.jpg)
    
    + Image rouge/blanc permet d'afficher les randonnées niveau moyen
    
    ![Moyen](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8xQ4KZoZbPaeXcENoIV0iXaWOWzX1BtBOyg&usqp=CAU)
    
    + Image jaune permet d'afficher les randonnées niveau débutant
    
    ![Débutant](https://static.mycity.travel/manage/uploads/7/38/60296/1/hiking_1080.jpg)
    
  * De plus un menu déroulant effectuant la même fonctionnalité a été implémenté.
#### Carte 3D
La partie 3D est élaboré grâce au language Cesium. Cette carte permet de visualiser les randonnées en 3D grâce à un fichier GeoJSON qui est projeté sur le globe 3D. 
___
