<template>
<v-content>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row>
      <v-col>
        <v-card class="mx-auto" width="900" elevation="10">
          <v-list-item three-line>
            <v-list-item-content>
                <v-responsive class="headline">
                  Olá! Eu sou a Sabrina sua consultora digital.<br /><br />
                  <v-container class="subtitle-1">
                  Estou aqui para ajudar a encontrar uma solução para a sua empresa, <br />para isso, vou fazer algumas perguntas e no final lhe apresentar uma solução.<br />Vamos, lá?<br /><br />
                  </v-container>
                </v-responsive>
            </v-list-item-content>
          </v-list-item>
        </v-card>
          <v-responsive class="body-1">
            <br />Clique em um dos botões abaixo<br />
          </v-responsive>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
      </v-col>
      <v-col>
        <v-btn width="195px" height="40px" class="font-weight-regular" color="success" @click="$router.push('financeiro')">Financeiro</v-btn>
      </v-col>
      <v-col>
        <v-btn width="195px" height="40px" class="font-weight-regular" color="primary" @click="$router.push('vendas')">Vendas</v-btn>
      </v-col>
      <v-col>
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
