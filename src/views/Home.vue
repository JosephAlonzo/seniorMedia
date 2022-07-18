<template class="container">
  <div class="home">
    <h1 class="my-3">Liste d'utilisateurs</h1>
    <v-row>
      <v-col cols="12">
        <v-card
          color="teal"
          dark
        >
          <v-card-title class="text-h5">
            utilisateur actuel: {{getUser.email}}
          </v-card-title>
          <v-card-subtitle>
            tokens disponibles: 
            <v-chip class="ma-2" color="#DDAF2D" text-color="white" flat>
              {{getUser.tokens}}
            </v-chip>
          </v-card-subtitle>
        </v-card>
        

      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="4" class="my-2" v-for="user in getListUsers" :key="user.id" v-if="show(user)">
        <tokensComponent :user=user @spendTokens="getUser.tokens -= $event" :maxValue="getUser.tokens"></tokensComponent>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import tokensComponent from "@/components/tokens_component.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  data: () => ({
    
  }),
  components: {
    tokensComponent
  },
  computed: {
    ...mapGetters("users",["getListUsers", "getSelectedEmail"]),
    ...mapGetters("deviseManager", ["getUserID", "getUser"])
  },
  methods: {
    ...mapActions("users", ["getUsers"]),
    ...mapActions("deviseManager", [ "getCurrentUser"]),
    show(user){
      return this.getSelectedEmail == null || user.email == this.getSelectedEmail
    }
  },
  async mounted(){
    await this.getUsers();
    await this.getCurrentUser();

  },
};
</script>
