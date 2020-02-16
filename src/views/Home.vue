<template>
<v-content>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
    >
      <v-col>
        <v-responsive class="display-1">
          Olá! Vamos te ajudar a criar soluções para sua empresa. <br />
          Me informe a primeira dificuldade encontrada na sua empresa.<br />
          Qual a área do seu problema ?
        </v-responsive>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn text small class="display-1" color="primary" @click="$router.push('financeiro')">Financeiro</v-btn>
      </v-col>
      <v-col>
        <v-btn text small class="display-1" color="error" @click="$router.push('vendas')">Vendas</v-btn>
      </v-col>
    </v-row>
    </v-container>
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
