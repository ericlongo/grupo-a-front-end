<template>
    <div id="page-text-fields">
      <v-container grid-list-xl fluid>
        <v-layout row wrap>
          <v-flex sm12>
            <v-widget title="Dados do aluno">
              <div slot="widget-content">
                <v-container>
                  <v-form ref="form">
                    <v-layout row>
                      <v-flex xs4>
                        <v-subheader>Nome</v-subheader>
                      </v-flex>
                      <v-flex xs8>
                        <v-text-field
                          label="Nome"
                          v-model="name"
                          :rules="[rules.required, rules.nome]"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>

                    <v-layout row>
                      <v-flex xs4>
                        <v-subheader>Email</v-subheader>
                      </v-flex>
                      <v-flex xs8>
                        <v-text-field
                          label="E-mail"
                          v-model="email"
                          :rules="[rules.required, rules.email]"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>

                    <v-layout row>
                      <v-flex xs4>
                        <v-subheader>RA</v-subheader>
                      </v-flex>
                      <v-flex xs8>
                        <v-text-field
                          label="RA"
                          v-model="ra"
                          disabled
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
  
                    <v-layout row>
                      <v-flex xs4>
                        <v-subheader>CPF</v-subheader>
                      </v-flex>
                      <v-flex xs8>
                        <v-text-field 
                          label="CPF"
                          v-model="cpf" 
                          :rules="[rules.required]"
                          mask="###.###.###-##"
                          :disabled="!!studentId"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>

                    <v-layout row>
                      <v-flex xs4>
                        <v-subheader></v-subheader>
                      </v-flex>
                      <v-flex xs8>
                      <div v-if="error" class="layout row justify-center" style="color: red;">
                        {{ error }}
                      </div>
                      <div v-if="successMessage" class="layout row justify-center" style="color: green;">
                        {{ successMessage }}
                      </div>
                      </v-flex>
                    </v-layout>
                  </v-form>
                </v-container>
              </div>
            </v-widget>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn 
            block 
            color="primary" 
            @click="students" 
            :loading="loading"
        >Cancelar</v-btn>
        <v-btn 
            block 
            color="primary" 
            @click="createStudent" 
            :loading="loading"
        >Salvar</v-btn>
      </v-card-actions>
    </div>
  </template>
  
  <script>
    import axios from 'axios';
  
    export default {
      layout: 'main',
      data() {
        return {
            name: '',
            email: '',
            ra: '',
            cpf: '',
            error: '',
            successMessage: '',
            studentId: null,
            rules: {
                required: (value) => !!value || 'Campo obrigatório.',
                name: (value) => {
                    const pattern = /^[a-zA-Z]+ [a-zA-Z]+$/;
                    return pattern.test(value) || 'Nome inválido. Deve conter pelo menos nome e sobrenome.';
                },
                email: (value) => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return pattern.test(value) || 'E-mail inválido.';
                },
            },
        };
      },
      mounted() {
        this.fetchStudent();
      },
      methods: {
        async fetchStudent() {
          this.studentId = this.$route.query.id;
          if (this.studentId) {
            try {
              const response = await axios.get(`http://localhost:3333/student/${this.studentId}`);
              const student = response.data.data.student;
              this.name = student.name;
              this.email = student.email;
              this.cpf = student.cpf;
              this.ra = student.ra;
            } catch (error) {
              this.error = 'Erro ao buscar aluno.';
            }
          }
        },
        students() {
            this.loading = true;
            setTimeout(() => {
            this.$router.push('/students/list');
            }, 100);
        }, 
        async createStudent() {
            this.loading = true;   
            this.error = '';
            this.successMessage = '';
            this.success = false;

            const isValid = this.$refs.form.validate();
            if (!isValid) {
              this.loading = false;
              return;
            }
            
            try {
              let response = null;
              if(!this.studentId){
                response = await axios.post('http://localhost:3333/student/create', {
                  name: this.name,
                  email: this.email,
                  cpf: this.cpf
                });
              }else{
                response = await axios.post('http://localhost:3333/student/update', {
                  id: this.studentId,
                  name: this.name,
                  email: this.email,
                });
              }
              

              this.success = true;
              this.successMessage = response.data.data.message || 'Aluno cadastrado com sucesso.';
              setTimeout(() => {
                this.$router.push('/students/list');
              }, 2000);
            }catch (error) {
              console.log(error)
              if (error.response) {
                this.error = error.response.data.data.message || 'Erro ao cadastrar o aluno';
              } else {
                this.error = error;
              }
            } finally {
              this.loading = false;
            }
        }
      },
    };
  </script>
  