<template>
<v-content>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row>
      <v-col >
        <v-responsive class="headline">
          <v-row
            class="d-flex justify-center"
            :key="pergunta"
            v-for="pergunta in perguntas"
            >
            {{pergunta}}
          </v-row>
          <v-row>
            <v-col
            :key="opcao.value.input.text"
            v-for="opcao in opcoes"
            >
            <v-btn text small class="display-1" @click="enviarPergunta(opcao.value)">{{opcao.label}}</v-btn>
            </v-col>
          </v-row>
        </v-responsive>
      </v-col>
    </v-row>
  </v-container>
</v-content>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data: () => {
    return {
      perguntas: ['Aguarde'],
      opcoes: [],
      watson: {
        url: process.env.VUE_APP_WATSON_URL,
        assistantId: process.env.VUE_APP_WATSON_ASSIST_ID,
        version: process.env.VUE_APP_WATSON_ASSIST_VERSION
      }
    }
  },
  methods: {
    enviarPergunta: function (value) {
      this.perguntas = ['Aguarde']
      this.opcoes = []
      this.responder(value)
    },
    responder (resposta = {}) {
      var url = 'https://cors-anywhere.herokuapp.com/' + this.watson.url

      axios.post(`${url}/${this.watson.assistantId}/sessions/${this.$store.state.session}/message?version=${this.watson.version}`,
        resposta,
        {
          auth: {
            username: 'apikey',
            password: process.env.VUE_APP_WATSON_API_KEY
          }
        }).then((r) => {
        this.perguntas = []
        this.opcoes = []
        r.data.output.generic.forEach(r => {
          switch (r.response_type) {
            case 'text':
              this.perguntas.push(r.text)
              break

            case 'option':
              this.perguntas.push(r.title)
              this.opcoes = r.options
              break

            default:
              break
          }
        })
      })
    }
  },
  mounted () {
    var url = 'https://cors-anywhere.herokuapp.com/' + this.watson.url

    axios.post(`${url}/${this.watson.assistantId}/sessions?version=${this.watson.version}`,
      {},
      {
        auth: {
          username: 'apikey',
          password: 'SArCxRv_9hs4AD27Uq2G0kOn0i-ropG63L7jRBA4n3AA'
        }
      }).then((r) => {
      this.$store.commit('addSession', r.data.session_id)
      this.responder()
    })
  }
}
</script>

<style>

</style>
