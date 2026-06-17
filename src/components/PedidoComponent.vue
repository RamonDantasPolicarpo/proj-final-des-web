<template>
    <div>
        <form id="pedido-form" @submit="criarPedido($event)">
            <div>
                <p id="nome-hamproduto-content">
                    {{ produto && produto.nome ? produto.nome : "--" }}
                </p>
                <img id="foto-content" :src="produto && produto.foto ? produto.foto : ''" />
            </div>
            <div class="inputs" id="form-pedido">
                <label>Nome</label>
                <input v-model="nomeCliente" type="text" placeholder="Digite seu Nome" id="nome-cliente" />
            </div>
            <div class="inputs">
                <label>Opcoes de frete</label>
                <select v-model="opcaoFreteSelecionada" name="ponto-carne" id="ponto-carne">
                    <option value="" selected>Selecione a opcao de frete</option>
                    <option v-for="opcaoFrete in listaOpcoesFrete" :key="opcaoFrete.id" :value="opcaoFrete">
                        {{ opcaoFrete.descricao }}
                    </option>
                </select>
            </div>
            <div class="inputs">
                <label id="opcionais-titulo">Selecione hardwares extras</label>
                <div v-for="hardwares in listaHardwareExtras" :key="hardwares.id" class="checkbox-container">
                    <input type="checkbox" :name="hardwares.nome" :value="hardwares"
                        v-model="hardwareExtraSelecionado" />
                    <span>{{ hardwares.nome }}</span>
                </div>

                <label>Adicione um periférico</label>
                <div v-for="periferico in listaPerifericos" :key="periferico.id" class="checkbox-container">
                    <input type="checkbox" :name="periferico.nome" :value="periferico" v-model="perifericosSelecionados" />
                    <span>{{ periferico.nome }}</span>
                </div>

                <div class="inputs">
                    <input type="submit" class="submit-btn" value="Confirmar Pedido" />
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "PedidoComponent",
    props: {
        produto: null,
    },
    data() {
        return {
            listaOpcoesFrete: [],
            listaHardwareExtras: [],
            listaPerifericos: [],
            nomeCliente: "",
            opcaoFreteSelecionada: "",
            hardwareExtraSelecionado: [],
            perifericosSelecionados: [],
        };
    },

    methods: {

        async getOpcoesFrete() {
            const response = await fetch("http://localhost:3000/opcoes_frete");
            const dados = await response.json();
            this.listaOpcoesFrete = dados;
        },
        
        async getOpcionais() {
            const response = await fetch("http://localhost:3000/opcionais");
            const dados = await response.json();
            this.listaHardwareExtras = dados.hardware_extra;
            this.listaPerifericos = dados.perifericos;
        },
        
        async criarPedido(e) {
            e.preventDefault();
            const dadosPedido = {
                nome: this.nomeCliente,
                frete: this.opcaoFreteSelecionada,
                hardware_extra: Array.from(this.hardwareExtraSelecionado),
                perifericos: Array.from(this.perifericosSelecionados),
                produto_princiapal: this.produto,
                statusId: 1,
            };
            console.log("Enviando dados payload: ", dadosPedido);
            const dadosJson = JSON.stringify(dadosPedido);
            const req = await fetch("http://localhost:3000/pedidos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: dadosJson,
            });


        },
    },

    mounted() {
        this.getOpcoesFrete();
        this.getOpcionais();
    },
};
</script>

<style scoped>
</style>
