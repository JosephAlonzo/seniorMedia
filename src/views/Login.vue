<template>

  <v-container class="">
    <v-row  class="login d-flex justify-center">
      <v-col cols="9" align="center" class="align-self-center col-6 col-sm-4 col-md-6">
        <h2 v-if="!singin">Se connecter</h2>
        <h2 v-else>S'inscrire</h2>
        <v-form ref="form" lazy-validation>
          <v-img
            max-height="200"
            max-width="100"
            src="@/assets/logo.png" 
            class="mb-2"
          ></v-img>

          <v-text-field
            v-model="form.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="form.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="showPassword ? 'text' : 'password'"
            label="Mot de passe"
            hint="At least 8 characters"
            counter
            @click:append="showPassword = !showPassword"
          ></v-text-field>

           <v-text-field
            v-model="form.confirmPassword"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="showPassword ? 'text' : 'password'"
            label="Mot de passe"
            hint="At least 8 characters"
            counter
            @click:append="showPassword = !showPassword"
            v-if="singin"
          ></v-text-field>
          <v-btn rounded color="primary" class="mr-4" @click="validate()" v-if="!singin">
            Se connecter
          </v-btn>
          <v-btn rounded color="primary" class="mr-4" @click="validate()" v-else>
            S'inscrire
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
        <v-col align="center">
            <a class="link mt-2" @click="singin=!singin"  rounded color="primary"> 
              <span v-if="!singin"> S'inscrire </span>
              <span v-if="singin"> Se connecter </span> 
            </a>   
        </v-col>
    </v-row>
   
    <v-alert type="error" id="alert-error" class="alert" v-model="error">
      Nom d'utilisateur ou mot de passe incorrect
    </v-alert>

    
  </v-container>
</template>
<style scoped>
    .login {
        min-height: 65vh;
    }
    .link{
        text-decoration: none;    
    }
    .alert{
      position: fixed;
      top: 5%;
      right: 5%;
      width: 90%;
    }
    .alert-success{
    position: fixed;
    top: 5%;
    width: 80%;
  }
</style>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Login",
  data: () => ({
    form: {
      email: "joseph_alonzo5@g.com",
      password: "password2",
      confirmPassword: "password2"
    },
    emailRules: [
    v => !!v || 'E-mail is required',
    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
    error: false,
    showPassword: false,
    singin: false
  }),
  components: {
  },
  computed: {
    ...mapGetters("deviseManager",["getUserEmail"]),
  },
  methods: {
    ...mapActions("deviseManager",["loginUser", "registerUser"]),
    validate: async function()
    {
      if(this.$refs.form.validate()){
        if(!this.singin){
          let response = await this.loginUser(this.form);
          if(response?.status == 200 ) {
            this.$router.push('/')
          }
        }
        else{
          let response = await this.registerUser(this.form);
          if(response?.status == 201 ) {
            this.$router.push('/')
          }
        }
      }
      else
        this.error = true;

    }
  },
  async created(){
    // this.users = await this.getUsers();
  }
};
</script>