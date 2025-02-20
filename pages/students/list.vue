<template>
    <div id="pageStudent">
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-btn block color="primary" @click="newStudent" >Novo aluno</v-btn>
        </v-card-actions>
        <v-container grid-list-xl fluid>
        <v-layout row wrap>
          <v-flex lg12 sm12 xs12>
            <plain-table></plain-table>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </template>
  
  <script>
    import PlainTable from '@/components/widgets/list/PlainTable';
  
    export default {
      layout: 'main',
      components: {
        PlainTable
      },
      data: () => ({
        loading: false,
        error: null
      }),
      methods: {
        newStudent() {
            setTimeout(() => {
            this.$router.push('/students/new');
            }, 100);
        }
      },
  
    };
  </script>
  