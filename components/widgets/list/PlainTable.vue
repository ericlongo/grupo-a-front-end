<template>
  <v-card>
    <v-toolbar card dense color="transparent">
      <v-toolbar-title><h4>Alunos</h4></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <template>
        <v-data-table
          :headers="headers"
          :items="projects"
          hide-actions
          class="elevation-0"
        >
          <template slot="items" slot-scope="props">
            <td>
              <v-avatar size="36px">
                <img :src="props.item.avatar" :alt="props.item.username" />
              </v-avatar>
            </td>
            <td>{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.deadline }}</td>
            <td class="text-xs-left"><v-progress-linear :value="props.item.progress" height="5" :color="props.item.color"></v-progress-linear> </td>
            <td class="text-xs-right">
              <v-btn flat icon color="grey" @click="editStudent" >
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn flat icon color="grey" @click="openDeleteModal(props.item)">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
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
export default {
  data () {
    return {
      headers: [
        {
          text: '',
          align: 'center',
          sortable: false,
          value: 'avatar'
        },
        {
          text: 'Name',
          align: 'left',
          value: 'name'
        },
        { text: 'Deadline', value: 'deadline' },
        { text: 'Progress', value: 'progress' },
        { text: 'Action', value: 'action', align: 'right' },

      ],
      deleteDialog: false,
      studentToDelete: null,
    };
  },
  methods: {
    editStudent () {
      this.$router.push('/students/new');
    },
    openDeleteModal (student) {
      this.studentToDelete = student;
      this.deleteDialog = true;
    },
    closeDeleteModal () {
      this.deleteDialog = false;
      this.studentToDelete = null;
    },
    deleteStudent () {
      // Lógica para deletar o aluno
      console.log('Deleting student:', this.studentToDelete);
      this.closeDeleteModal();
    }
  },
  computed: {
    projects () {
      return Projects;
    }
  }
};
</script>
