<template>
    <div>
        <form @submit="criarPedido($event)">
            <div>
                <p>
                    {{ produto && produto.nome ? produto.nome : "--" }}
                </p>
                <img :src="produto && produto.foto ? produto.foto : ''" />
            </div>
            <div>
                <label>Nome</label>
                <input v-model="nomeCliente" type="text" placeholder="Digite seu Nome" />
            </div>
            <div>
                <label>Opcoes de frete</label>
                <select v-model="opcaoFreteSelecionada" name="ponto-carne">
                    <option value="" selected>Selecione a opcao de frete</option>
                    <option v-for="opcaoFrete in listaOpcoesFrete" :key="opcaoFrete.id" :value="opcaoFrete">
                        {{ opcaoFrete.descricao }}
                    </option>
                </select>
            </div>
            <div>
                <label>Selecione hardwares extras</label>
                <div v-for="hardwares in listaHardwareExtras" :key="hardwares.id">
                    <input type="checkbox" :name="hardwares.nome" :value="hardwares"
                        v-model="hardwareExtraSelecionado" />
                    <span>{{ hardwares.nome }}</span>
                </div>

                <label>Adicione um periférico</label>
                <div v-for="periferico in listaPerifericos" :key="periferico.id">
                    <input type="checkbox" :name="periferico.nome" :value="periferico" v-model="perifericosSelecionados" />
                    <span>{{ periferico.nome }}</span>
                </div>

                <div>
                    <input type="submit" value="Confirmar Pedido" />
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
