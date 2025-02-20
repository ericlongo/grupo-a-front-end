<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <!-- <img src="../static/m.png" alt="Vue Material Admin" width="120" height="120"> -->
                  <h1 class="flex my-4 primary--text">Bem vindo</h1>
                </div>
                <v-form>
                  <v-text-field append-icon="person" name="login" label="Login" type="text"
                                v-model="model.username"></v-text-field>
                  <v-text-field append-icon="lock" name="password" label="Password" id="password" type="password"
                                v-model="model.password"></v-text-field>
                </v-form>
                <div v-if="error" class="layout row justify-center" style="color: red;">
                  {{ error }}
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';

  export default {
    layout: 'default',
    data: () => ({
      loading: false,
      model: {
        username: '',
        password: ''
      }
    }),

    methods: {
    async login() {
      this.loading = true;
      this.error = '';
      this.success = false;

      try {
        const response = await axios.post('http://localhost:3333/login', {
          email: this.model.username,
          password: this.model.password
        });
        
        this.success = true;
        console.log('Resposta da API:', response);

        // localStorage.setItem('token', response.data.token);
        this.$router.push('/students/list');

      } catch (error) {
        if (error.response) {
          this.error = error.response.data.data.message || 'Erro ao fazer login';
        } else {
          this.error = 'Erro de conexão. Tente novamente.';
        }
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
