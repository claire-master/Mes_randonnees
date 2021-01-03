<template>

  <div class="background">
    <p class="title">{{hellomessage}}</p> 
    <img onclick="localisation(this)" src="../../assets/background.jpg" style="width:2500px;height:800px;"/>
  </div>
 
</template>

<script>
export default {
  data(){
    return{
      hellomessage:"Découvrez les randonnées de Suisse"
    }
  }
}
</script>