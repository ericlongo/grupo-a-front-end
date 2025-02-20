<template>
  
  <v-card>
    <div v-if="successMessage" class="layout row justify-center" style="color: green;">{{ successMessage }}</div>
    <div v-if="errorMessage" class="layout row justify-center" style="color: red;">{{ errorMessage }}</div>
    <v-toolbar card dense color="transparent">
      <v-toolbar-title><h4>Alunos</h4></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-layout row justify-center>
        <v-spacer></v-spacer>
        <v-flex xs6 md4>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Pesquisar"
            single-line
            hide-details
          ></v-text-field>
        </v-flex>
      </v-layout>
      <template>
        <v-data-table
          :headers="headers"
          :items="students"
          :search="search"
          hide-actions
          class="elevation-0"
        >
          <template v-if="!loading" slot="items" slot-scope="props">
            <td>{{ props.item.ra }}</td>
            <td>{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.email }}</td>
            <td class="text-xs-left">{{ formatCPF(props.item.cpf) }}</td>
            <td class="text-xs-right">
              <v-btn flat icon color="grey" @click="editStudent(props.item.id)" >
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn flat icon color="grey" @click="openDeleteModal(props.item)">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </template>
          <template v-else>
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </template>
        </v-data-table>
      </template>
      <v-divider></v-divider>
    </v-card-text>

    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Confirmar Exclusão</v-card-title>
        <v-card-text>Tem certeza de que deseja excluir este aluno?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="closeDeleteModal">Cancelar</v-btn>
          <v-btn color="red darken-1" flat @click="deleteStudent">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
  </v-card>
</template>

<script>
import { Projects } from '@/api/project';
import axios from 'axios';

export default {
  data () {
    return {
      headers: [
        {
          text: 'Registro Acadêmico',
          align: 'center',
          value: 'ra'
        },
        {
          text: 'Nome',
          align: 'left',
          value: 'name'
        },
        { text: 'Email', value: 'email' },
        { text: 'CPF', value: 'cpf' },
        { text: 'Action', value: 'action', align: 'right' },
      ],
      students: [],
      deleteDialog: false,
      studentToDelete: null,
      loading: false,
      errorMessage: '',
      successMessage: '',
      search: '',
    };
  },
  mounted() {
    this.fetchStudents();
  },
  methods: {
    async fetchStudents() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:3333/students');
        this.students = response.data.students;
      } catch (error) {
        console.error('Erro ao buscar estudantes:', error);
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    },
    editStudent (id) {
      this.$router.push({ path: '/students/new', query: { id: id } });
    },
    openDeleteModal (student) {
      this.studentToDelete = student;
      this.deleteDialog = true;
    },
    closeDeleteModal () {
      this.deleteDialog = false;
      this.studentToDelete = null;
    },
    async deleteStudent () {
      try {
        const response = await axios.post('http://localhost:3333/student/delete', {
          id: this.studentToDelete.id,
        });

        this.fetchStudents();
        this.successMessage = 'Aluno excluído com sucesso.';
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);

      } catch (error) {
        this.errorMessage = 'Erro ao excluir aluno.';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
      this.closeDeleteModal();
    },
    formatCPF(cpf) {
    if (!cpf) return '';
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  },
  },
};
</script>
