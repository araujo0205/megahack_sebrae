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
            style="margin:15px"
            v-html="pergunta"
            >
          </v-row>
          <v-row>
            <v-col>
            </v-col>
            <v-col
            :key="opcao.value.input.text"
            v-for="opcao in opcoes"
            >
            <v-btn :color="corBotao(opcao.label)"  width="195px" height="40px" class="font-weight-regular" @click="enviarPergunta(opcao.value)">{{opcao.label}}</v-btn>
            </v-col>
            <v-col>
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
        url: `https://cors-anywhere.herokuapp.com/${process.env.VUE_APP_WATSON_URL_FINANCEIRO}`
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
      /*
      var bodyFormData = new FormData()
      if (resposta) {
        resposta.input.options = { return_context: true }
        bodyFormData.set('message', JSON.stringify(resposta))
      }
      */
      var input = {}
      if (resposta) {
        input = {
          text: resposta.input.text,
          options: { return_context: true }
        }
      }
      axios.post(`${url}/${this.$store.state.session}/message?version=${process.env.VUE_APP_WATSON_ASSIST_VERSION}`,
        {
          input
        },
        {
          auth: {
            username: 'apikey',
            password: process.env.VUE_APP_WATSON_API_KEY_FINANCEIRO
          }
        }
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
          var userDefined = {}
          if (localStorage.getItem('user_defined_financeiro')) {
            userDefined = JSON.parse(localStorage.getItem('user_defined_financeiro'))
          }

          if (typeof r.data.context.skills['main skill'].user_defined.fim !== 'undefined' && r.data.context.skills['main skill'].user_defined.fim === true) {
            localStorage.removeItem('user_defined_financeiro')
            return
          }

          userDefined.pontuacao = r.data.context.skills['main skill'].user_defined.pontuacao
          userDefined.pontosBaseNao = r.data.context.skills['main skill'].user_defined.pontosBaseNao
          userDefined.pontosBaseSim = r.data.context.skills['main skill'].user_defined.pontosBaseSim

          if (typeof r.data.context.skills['main skill'].user_defined.proxima_acao !== 'undefined') {
            userDefined.proxima_acao = r.data.context.skills['main skill'].user_defined.proxima_acao
          }

          localStorage.setItem('user_defined_financeiro', JSON.stringify(userDefined))
        }
      })
    },
    carregarDados () {
      var dadosLocais = localStorage.getItem('user_defined_financeiro')
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
    },
    corBotao (valor) {
      return valor === 'Não' ? 'error' : 'primary'
    }
  },
  mounted () {
    var url = this.watson.url

    axios.post(`${url}?version=${process.env.VUE_APP_WATSON_ASSIST_VERSION}`, {},
      {
        auth: {
          username: 'apikey',
          password: process.env.VUE_APP_WATSON_API_KEY_FINANCEIRO
        }
      })
      .then((r) => {
        this.$store.commit('addSession', r.data.session_id)

        var configurarWatson = this.carregarDados()
        this.responder(configurarWatson)
      })
  }
}
</script>

<style>

</style>
