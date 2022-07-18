<template>
  <v-container>
    <v-form ref="form" lazy-validation>
        <v-card color="#FFFFFF" class="card">
          <v-card-title class="text-h5"> {{user.email}} </v-card-title>
          <v-card-subtitle>
            Nombre actuel de tokens
            <v-chip class="ma-2" color="#DDAF2D" text-color="white" flat>
              {{user.tokens}}
            </v-chip>
          </v-card-subtitle>

          <v-card-text class="my-0 py-0" v-if="maxValue>0">
            <v-list-item-subtitle>
              Nombre de tokens à donner
            </v-list-item-subtitle>
        
            <v-text-field type="number" v-model="tokens" min=0 :max=maxValue >
              <v-icon slot="append" color="primary"> mdi-hand-coin </v-icon>
            </v-text-field>
          </v-card-text>

          <v-card-actions class="pb-5 ml-1" v-if="maxValue>0">
            <v-btn color="primary" @click="send" :disabled="tokens>maxValue"> transfer tokens </v-btn>
          </v-card-actions>
          <v-card-text class="pb-4" v-else>
            <v-list-item-subtitle>
              Tu n'as plus de tokens disponibles
            </v-list-item-subtitle>
          </v-card-text>
        </v-card>
    </v-form>

    <v-alert
      v-model="alert"
      dismissible
      color="danger"
      border="left"
      elevation="2"
      colored-border
      icon="mdi-aler-circle"
    >
      Erreur lors de la transference de tokens
    </v-alert>
  </v-container>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";

  export default {
    name: 'tokens_component',
    props: ["user", "maxValue"],

    data: () => ({
      tokens: "",
      alert: false
    }),
    methods: {
      ...mapActions("users", ["sendTokens"]),
      async send(){
        let payload = {
          id: this.user.id,
          tokens: this.tokens
        }
        let response = await this.sendTokens(payload);
        if(response.status == 200){
          this.user.tokens = response.data.tokens;
          this.$emit("spendTokens", this.tokens);
        }
        else{
          console.log(response)
          this.alert = true;
        }
      }
    },

  }
</script>
<style scoped>
  .card{
    min-height: 300px;
  }
</style>