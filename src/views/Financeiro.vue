<template>
<v-content>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
    >
      <v-col >
        <v-responsive class="display-1">
          Qual o seu problema no setor de financeiro ?
        </v-responsive>
      </v-col>
    </v-row>
    </v-container>
    <v-footer
      absolute>
      <v-text-field
        v-model="pergunta"
        placeholder="Pergunta"
        v-on:keyup.enter="enviarPergunta"
        >
        </v-text-field>
        <v-icon @click="enviarPergunta">mdi-send</v-icon>
    </v-footer>
</v-content>
</template>

<script>
export default {
  name: 'Home',
  data: () => {
    return {
      pergunta: ''
    }
  },
  methods: {
    enviarPergunta: function () {
      console.log(this.pergunta)
    }
  }
}
</script>

<style>

</style>
