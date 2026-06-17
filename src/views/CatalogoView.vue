<template>
  <div>
    <h1>Catálogo</h1>
    <div class="container-catalogo">
      <div v-for="produto in listaProdutos" :key="produto.id">
        <img width="300" height="200" :src="produto.foto" />
        <div>
          <p>{{ produto.nome }}</p>
          <p>R$ {{ produto.valor }},00</p>
          <p>{{ produto.descricao }}</p>
          <button @click="selecionarProduto(produto)">Selecionar</button>
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

    async consultarCatalogo() {
      const response = await fetch(`${process.env.VUE_APP_API_URL}/catalogo`);
      const dados = await response.json();
      this.listaProdutos = [...dados.desktops, ...dados.notebooks];
      console.log(this.listaProdutos);
    },

    selecionarProduto(produtoSelecionado) {
      const parametroProduto = JSON.stringify(produtoSelecionado);
      const encodedProduto = encodeURIComponent(parametroProduto);
      this.$router.push({ path: "/checkout", query: { produto: encodedProduto } });
    },
  },

  mounted() {
    this.consultarCatalogo();
  },
};
</script>

<style scoped>
.container-catalogo {
  display: flex;
}

</style>
