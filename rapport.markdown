# Rapport 
## Découvrez les randonnées de Suisse
### MDT - GIO1
#### Claire Monney et Marie Tombez

___

## Concept
Dans le cadre du cours "GIO1", du master en développement territorial, un travail de semestre a été proposé ayant comme objectif:

+ Apprendre à structurer un code: principe du code, modèle de conception et modèle architecturaux
+ Utiliser GIT qui est un outil de gestion afin de gérer les versions de code et de travailler à plusieurs personnes en créant des branches
+ Utiliser Vue JS qui un web framework avec des géodonnées

Le choix du thème et des fonctionnalités étaient libres. Ce cours s'est déroulé lors du 3ème semestre et a été encadré par Messieurs Jens Ingensand, Thibaud Chassin et Mathias Oberson.

Le concept de notre projet est de permettre aux randonneurs d'avoir un site qui recense toutes les randonnées possibles. La carte 2D permet de visualiser les randonnées classées par difficultés sur un fond de carte graphique ou sur une orthophoto. La carte 3D permet une immersion concrète dans le terrain grâce à la projection des randonnées sur un modèle numérique de terrain. L'activation de la géolocalisation permet à l'utilisateur de savoir où il se situe exactement sur la carte 2D et 3D.

Ce rapport explique la démarche mise en place au sein de notre groupe, les données utilisées pour la réalisation de ce projet, les divers problèmes rencontrés et les fonctionnalités implémentées. Puis, un regard critique sur les perspectives/améliorations possibles seront discutées et nous terminerons par une conclusion.

## Démarche
Pour débuter notre projet, nous avons dû réaliser une maquette sur un thème qui nous convenait à toutes les deux. Après plusieurs discussion, le thème qui est ressorti est la randonnée. Suite à la crise du Covid-19, ce sport est devenu une activité à la mode et nous avons trouvé que celui-ci était approprié pour notre projet.

Après la mise en commun de nos diverses idées de fonctionnalités, nous avons élaborée notre maquette. Les fonctionnalités et les idées posées, nous avons pu, par la suite, répartir les tâches entre nous deux. La démarche de notre projet s'est déroulée en quatre grandes étapes, soit: 

+ GITUB
+ Openlayer
+ Axios
+ Cesium 

Pour débuter notre projet, nous avons dû créer un GIT qui nous a permis de gérer les différentes versions de notre code et de pouvoir travailler à plusieurs sur ceux-ci. Une base de code développée en Vue.js, nous a été fournie par nos professeurs via GIT. Cette base est un framework Javascript open-source qui permet de construire une interface utilisateur et des applications web monopages. À l'aide de cette base, nous avons pu démarrer la rédaction de notre code.

Dans un premier temps, nous avons dû prendre en main les différentes fonctionnalités de Vue afin de comprendre son fonctionnement. Par la suite, nous avons créé notre cartographie 2D via Openlayer, dans lequel il nous était demandé de créer une fonctionnalité 2D et d'afficher une couche 2D. Par la suite, une recherche de localisation sur carte devait être réalisée. Celle-ci a été effectué via Axios en parallèle de la cartographie 2D. Pour terminer, nous devions créer une cartographie 3D dans lequel, une fonctionnalité 3D et l'affichage d'une couche 3D devaient être réalisées. Ces différentes fonctionnalités seront expliquées dans le chapitre "Fonctionnalités".

Lors de ce travail, nous avons gardé une constante communication afin d'avoir toutes les deux, avant chaque cours, une vision globale et une compréhension commune de notre code. De plus, habitant toutes les deux dans la même région, nous avons pu nous voir et communiquer en direct pour les différentes questions que nous avions à poser aux professeurs. Nous les remercions de leurs aide pour la réalisation de ce projet, sans qui certaine fonctionnalité n'aurait pas fonctionné.

___

## Données
### Geojson
Pour la réalisation de notre projet, il nous était nécessaire d'obtenir les données des chemins de randonnée pédestre. Ne voulant pas travailler avec des fichiers trop volumineux, nous nous sommes concentrées sur un secteur qui est les Diablerets. Les données ont été extraites via le site AsitVD et fournies par notre professeur Monsieur Jens Ingensand en format Shapefile.
Afin de les introduire dans notre projet, nous avons dû transformer ce fichier en GeoJson. Nous avons également dû le reprojeter dans d'autres systèmes de projection afin qu'il soit compatible avec Openlayer et Cesium. A savoir que:

+ Openlayer: système de référence Mercator
+ Cesium: système de référence WGS84
+ Données fournies: système de référence MN95

### Fonds de carte 2D
Pour la création de nos fonds de carte 2D, nous avions à disposition les données OpenStreet Map qui sont Open source. De plus, nous avons ajouté les données BingMaps, qui sont disponible gratuitement. 
___

## Problèmes
### Chrome/FireFox
Lors de la création d'un menu déroulant pour le choix des différents niveaux de marche, la fonction "v-on:click" ne fonctionne pas sur le navigateur Chrome mais fonctionne sur Firefox. N'ayant pas tout de suite réalisé que le problème venait de Chrome, nous avons contourné le problème en créant des boutons. C'est seulement sur la fin du projet que nous avons réalisé ce problème et c'est la raison pour laquelle il est possible de passer par les deux types de sélection.
### Projection des données dans Openlayer et Cesium
Pour l'introduction des données GeoJson, soit dans la carte 2D ou la carte 3D, nous avons eu des difficultés par rapport à la projection de celles-ci. Nous avons dû tout d'abord effectuer une transformation manuelle via QGIS de nos données Shapefile afin d'obtenir un format Geojson qui soit lisible par Openlayer et Cesium. Nous avons dû alors exporter à nouveau nos données en format GeoJson mais cette fois-ci dans le système de référence de Mercator et WGS84 afin de pouvoir utiliser celles-ci.
### Git
Pour la prise en main de Git, nous avons eu des difficultés de compréhension de cette plateforme. N'ayant pas l'habitude de travail avec celle-ci, nous avions peur d'écraser des fichiers plus à jour. Nous avons utilisé la solution de Dropbox comme backup et échange de nos données. La sauvegarde sur Git a été réalisée par une seule personne afin d'éviter les problèmes de versions (branching). De plus, nous avons eu des difficultés de reprise de "Master" via l'invite de commande lorsqu'une sauvegarde est effectuée par l'autre personne. Afin de contourner ce problème, nous ajoutons les fichiers via le site internet et la fonctionnaltié "upload File".
___

## Perspectives
Le résultat du projet est un guichet cartographique 2D et 3D avec des données vectorielles sur les randonnées pédestres dans le secteur des Diablerets. La création du code a été réalisée avec l’aide des professeurs ainsi que les informations trouvées sur Internet. Cependant certaines fonctionnalités n'ont pas pu être implémentées soit par l'apparition d'erreur soit par fautes de temps. Nous vous présentons, ci-dessous les fonctionnalités à implémenter pour améliorer notre projet:

+ L'activation de la géolocalisation via un bouton sur la carte 2D, afin qu'elle ne soit pas activée par défaut, mais que l'utilisateur puisse choisir ou non d'afficher sa position.

+ L'affichage du profil de la randonnée ainsi que la durée et la distance de celle-ci serait un outil bénéfique pour l'utilisateur. Ces différentes fonctionnalités permettraient à celui-ci d'identifier les parcours pour lesquels sa condition physique est adaptée, comme illustré par l'image ci-dessous.

![Profil](https://www.wandern.ch/ewalc/images/ewalk2/922/profile/web.jpg)

+ Le projet peut être étandu à plus grande échelle (canton/Suisse). La seule modification a apportée serait la modification des données GeoJSON.

+ Dans Cesium, il aurait été intéressant de pouvoir manipuler un promeneur qui effectue le parcours en 3D afin d'avoir une immersion complète du parcours.

+ Sur la carte 3D, le filtrage des randonnées selon les niveaux peut être implémenté. Ceci permettrait à l'utilisateur de sélectionner les randonnées selon son envie du jour.
___

## Fonctionnalités implémentées
### Recherche
Nous avons utilisé les démarches Axios pour effectuer la fonctionnalité de recherche. A l'aide de l'API de GeoAdmin nous avons pu extraire les longitudes et les latitudes des lieux introduient dans la boxe de recherche. Cette fonction permet à l'utilisateur d'effectuer un zoom sur la carte 2D du lieu souhaité.
De plus, un lien a été mise à disposition de l'utilisateur dans lequel celui-ci peut retrouver des conseils de préparation et d'équipements pour une journée de randonnées.

### Carte 2D
La carte 2D a été élaborée via le langage OpenLayer. Cette carte permet de faire trois opérations différentes, soit:

+ Pour la carte: 
  
  * Deux fonds de carte ont été mis à disposition de l'utilisateur afin d'améliorer la visualisation du lieu soit: 
    
    + OSM (OpenStreetMap) qui permet une visualisation plus graphique 
    + Orthophoto via BingMaps qui permet d'avoir une visualisation aérienne
  
  * Une visualisation des randonnées via l'import du fichier GeoJSON permet à l'utilisateur de différencier les niveaux des randonnées caractérisés par trois couleurs pour les niveaux expert, moyen et débutant. 

+ Pour la géolocalisation:
  
  * La position de l'utilisateur est indiqué par un point bleu afin que celui-ci puisse retrouver sa position par rapport à la randonnée.

+ Choix des niveaux:
  
  * 4 boutons permettent de choisir les randonnées à afficher. Ceci permet à l'utilisateur d'afficher uniquement les randonnées de son niveau.
    
    + Image "évolution du randonneur" permet d'afficher toutes les randonnées
    
    ![evolution](https://img.aws.la-croix.com/2019/06/18/1201029697/Lhomme-devrait-devenir-cyborg-personne-capacites-physiques-decuplees-elements-numeriques-sitot_0_538_206.jpg)

    + Image bleue/blanc permet d'afficher les randonnées niveau expert
    
    ![expert](https://www.randonner.ch/images/2729_70103099.jpg)
    
    + Image rouge/blanc permet d'afficher les randonnées niveau moyen
    
    ![Moyen](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8xQ4KZoZbPaeXcENoIV0iXaWOWzX1BtBOyg&usqp=CAU)
    
    + Image jaune permet d'afficher les randonnées niveau débutant
    
    ![Débutant](https://static.mycity.travel/manage/uploads/7/38/60296/1/hiking_1080.jpg)
    
  * De plus, un menu déroulant effectuant les mêmes fonctionnalités ont été implémentées.

### Carte 3D
La partie 3D est élaboré grâce au langage Cesium. Cette carte permet de visualiser les randonnées en 3D grâce à un fichier GeoJSON qui est projeté sur le globe 3D. 
Cette carte permet plonger l'utilisateur dans l'environnement de la randonnée. Le modèle 3D lui permet d'évaluer les dénivellées auquelles il sera confronté lors de sa future promenade.
Lors de sa randonnée, il peut activer la géolocalisation afin d'identifier sa position sur le modèle numérique de terrain. Cette fonctionnalité permet à l'utilisateur de découvrir des lieux cachés derrières une colline ou une forêt qu'il ne verrait pas à l'oeil nu.

![cesium](https://raw.githubusercontent.com/claire-master/Mes_randonnees/main/src/assets/cesium_capture.jpg)

___

## Conclusion
Notre projet permet à l'utilisateur de se préparer avant de partir en randonnées grâce aux niveaux des difficultés présentées sur la carte 2D ainsi que par l'immersion 3D qui permet une bonne vision des dénivelés. 
Une fois en randonnée, les personnes peuvent en tout temps observer leur géolocalisation sur la carte 2D. Nous sommes satisfaite de notre projet qui remplit les exigences minimales demandées. De plus, nous avons apprécié ce cours qui nous a permis de découvrir de nouveaux outils pour notre expérience professionelle.
___
