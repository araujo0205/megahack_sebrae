<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
        <span>
          Seja bem vindo ao sistema {{nome}}. Onde a solução para o seu negócio está aqui
        </span>
        <v-form>
          <v-text-field
            label="Usuario"
            ></v-text-field>
          <v-text-field
            label="password"
            type="password"
              ></v-text-field>
          <v-btn text color="primary">Enviar</v-btn>
        </v-form>
        <div>
          <router-link to="/cadastro">Fazer cadastro</router-link>
        </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      nome: 'Bussiness Problem'
    }
  }
}
</script>

<style>

</style>
