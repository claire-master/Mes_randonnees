export function watchposition(callback, errorcallback){
    if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition(callback);
      } else {
        errorcallback('pas de geolocalisation')
        /* la géolocalisation n'est pas disponible */
      }
    
}