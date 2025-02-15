<template>
    <div id="page-text-fields">
      <v-container grid-list-xl fluid>
        <v-layout row wrap>
          <v-flex sm12>
            <v-widget title="Dados do aluno">
              <div slot="widget-content">
                <v-container>
                  <v-layout row>
                    <v-flex xs4>
                      <v-subheader>Nome</v-subheader>
                    </v-flex>
                    <v-flex xs8>
                      <v-text-field
                        label="Nome"
                        v-model="nome"
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
                        :rules="[rules.required, rules.ra]"
                        maxlength="6"
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
                        value="000.000.000-00"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
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
            @click="createStudent" 
            :loading="loading"
        >Cadastrar</v-btn>
        <v-btn 
            block 
            color="primary" 
            @click="students" 
            :loading="loading"
        >Voltar</v-btn>
      </v-card-actions>
    </div>
  </template>
  
  <script>
    import VWidget from '@/components/VWidget';
  
    export default {
      layout: 'main',
      components: {
        VWidget
      },
      data() {
        return {
            nome: '',
            email: '',
            ra: '',
            cpf: '',
            rules: {
                required: (value) => !!value || 'Campo obrigatório.',
                nome: (value) => {
                    const pattern = /^[a-zA-Z]+ [a-zA-Z]+$/;
                    return pattern.test(value) || 'Nome inválido. Deve conter pelo menos nome e sobrenome.';
                },
                email: (value) => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return pattern.test(value) || 'E-mail inválido.';
                },
                ra: (value) => {
                const pattern = /^\d{6}$/;
                return pattern.test(value) || 'RA inválido. Deve conter exatamente 6 números.';
                }
            },
        };
      },
      computed: {},
      methods: {
        students() {
            this.loading = true;
            setTimeout(() => {
            this.$router.push('/students/list');
            }, 100);
        }, 
        createStudent() {
            this.loading = true;
            setTimeout(() => {
            this.$router.push('/students/create');
            }, 100);
        }
      },
    };
  </script>
  