<template>
  <v-container>
    <v-row>
      <v-col>
      <h1>Cadastro</h1>
      <v-form>
        <v-text-field
          label="Usuario"
          ></v-text-field>
        <v-text-field
          label="Senha"
          type="password"
          ></v-text-field>
        <v-text-field
          label="Repetir Senha"
          type="password"
          ></v-text-field>
        <v-btn text color="primary">Enviar</v-btn>
      </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
