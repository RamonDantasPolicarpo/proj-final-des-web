<template>
  <div>
    <h1>Menu</h1>
    <div>
      <div
        v-for="produto in listaProdutos"
        :key="produto .id"
      >
        <div>
          <div>
            <img width="300" height="200" :src="produto.foto" />
            <div>
              <p>{{ produto.nome }}</p>
              <p>R$ {{ produto.valor }},00</p>
              <p>{{ produto.descricao }}</p>
              <button @click="selecionarBurguer(produto)">Selecionar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuView",
  data() {
    return {
      listaProdutos: [],
    };
  },

  methods: {

    async consultarMenu() {
      const response = await fetch("http://localhost:3000/catalogo");
      const dados = await response.json();
      this.listaProdutos = [...dados.desktops, ...dados.notebooks];
      console.log(this.listaProdutos);
    },

    selecionarBurguer(burguerSelecionado) {
      const parametroBurguer = JSON.stringify(burguerSelecionado);
      const encodedBurguer = encodeURIComponent(parametroBurguer);
      this.$router.push({ path: "/config-pedido", query: { burguer: encodedBurguer } });
    },
  },

  mounted() {
    this.consultarMenu();
  },
};
</script>

<style scoped>
</style>
