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
    responder (resposta = null) {
      var url = this.watson.url
      var bodyFormData = new FormData()
      if (resposta) {
        resposta.input.options = { return_context: true }
        bodyFormData.set('message', JSON.stringify(resposta))
      }
      axios.post(`${url}/session/message/${this.$store.state.session}`,
        bodyFormData
      ).then((r) => {
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

        if (typeof r.data.context !== 'undefined') {
          var userDefined = JSON.parse(localStorage.getItem('user_defined'))
          userDefined.pontuacao = r.data.context.skills['main skill'].user_defined.pontuacao
          userDefined.pontosBaseNao = r.data.context.skills['main skill'].user_defined.pontosBaseNao
          userDefined.pontosBaseSim = r.data.context.skills['main skill'].user_defined.pontosBaseSim

          if (typeof r.data.context.skills['main skill'].user_defined.proxima_acao !== 'undefined') {
            userDefined.proxima_acao = r.data.context.skills['main skill'].user_defined.proxima_acao
          }

          localStorage.setItem('user_defined', JSON.stringify(userDefined))
        }
      })
    },
    carregarDados () {
      var dadosLocais = localStorage.getItem('user_defined')
      if (dadosLocais !== null) {
        dadosLocais = JSON.parse(dadosLocais)
        return {
          input: {
            text: dadosLocais.proxima_acao,
            options: {
              return_context: true
            }
          },
          context: {
            skills: {
              'main skill': {
                user_defined: {
                  pontuacao: dadosLocais.pontuacao,
                  pontosBaseNao: dadosLocais.pontosBaseNao,
                  pontosBaseSim: dadosLocais.pontosBaseSim
                }
              }
            }
          }
        }
      }

      return null
    }
  },
  mounted () {
    var url = this.watson.url

    axios.post(`${url}/session/create`,
      {},
      {
        auth: {
          username: 'apikey',
          password: 'SArCxRv_9hs4AD27Uq2G0kOn0i-ropG63L7jRBA4n3AA'
        }
      }).then((r) => {
      this.$store.commit('addSession', r.data.session_id)

      var configurarWatson = this.carregarDados()
      this.responder(configurarWatson)
      // this.responder({ input: { text: 'sim' } })
    })
  }
}
</script>

<style>

</style>
