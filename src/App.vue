<template>
  <v-app >
    {{$router.name}}
    <navComponent></navComponent>
    <v-main>
      <router-view class="center"/>
    </v-main>
  </v-app>
</template>

<script>
import navComponent from "@/components/nav_component.vue";
export default {
  name: 'App',

  data: () => ({
   
  }),
  components: {
    navComponent
  }
  
};
</script>
<style scoped>
  .center{
    margin: auto;
    width: 80%;
  }
</style>
