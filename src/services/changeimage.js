export function changeImageMap(image) {
         // Test la source de l'image
    if (image.src.match('../../assets/bingaerial.png')) {
        image.src = "../../assets//osm.png";
        bingAerial.setVisible(true);
        osm.setVisible(false);                    
    }
    else if (image.src.match("../../assets//osm.png")) {
        image.src = '../../assets/bingaerial.png';
        osm.setVisible(true);
        bingAerial.setVisible(false); 
    }
}