<template>
   <v-card
    color="grey lighten-4"
    flat
    tile
    center
  >
      <v-toolbar
      dark
      color="teal"
    >
      
      <v-toolbar-title>Senior media</v-toolbar-title>

      <v-spacer></v-spacer> 
       <v-autocomplete
      v-model="select"
      :items="EmailsList"
      cache-items
      class="mx-4"
      flat
      hide-no-data
      hide-details
      label="Chercher utilisateur"
      solo-inverted
      v-on:keyup.enter="searchUser"
      @change="searchUser"
      v-if="$route.name!='Login'"
    ></v-autocomplete>
    
      <v-tooltip bottom v-if="$route.name!='Login'">
        <template v-slot:activator="{ on, attrs }">
          <v-btn fab elevation="0" small class="ml-2" color="teal" v-bind="attrs" v-on="on">
            <v-icon @click="logout">mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>

    </v-toolbar>
  </v-card>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";

  export default {
    name: 'tokens_component',
    props: ["user", "maxValue"],

    data: () => ({
        search: null,
        items: [],
        select: null,
    }),
    computed:{
        ...mapGetters("users",["EmailsList"])
    },
    methods: {
        ...mapActions("users", ["getUsers", "setSearch"]),
        ...mapActions("deviseManager",["logoutUser"]),
        async logout(){
        const response = await this.logoutUser();
        if(response?.status == 200) {
            this.$router.push('/login') 
        }
        },
        searchUser(){
          this.setSearch(this.select)
        }
    },
    watch: {
        search (val) {
        val && val !== this.select && this.querySelections(val)
        },
    },
  }
</script>
<style scoped>
  .card{
    min-height: 300px;
  }
</style>