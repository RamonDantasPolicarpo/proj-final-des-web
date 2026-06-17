<template>
    <div>
        <div v-for="pedido in listaPedidosRealizados" :key="pedido.id">
            <div>{{ pedido.id }}</div>
            <div>{{ pedido.nome }}</div>
            <div>{{ pedido.produto_principal ? pedido.produto_principal.nome : 'N/A' }}</div>
            <div>{{ pedido.frete ? pedido.frete.descricao : 'N/A' }}</div>
            <div>
                <ul>
                    <li v-for="(hardware, index) in pedido.hardware_extra" :key="'hw-' + index">
                        {{ hardware.nome }}
                    </li>
                </ul>
                <div style="height: 1px; background: #ccc; margin: 4px 0;"></div>
                <ul>
                    <li v-for="(periferico, index) in pedido.perifericos" :key="'perif' + index">
                        {{ periferico.nome }}
                    </li>
                </ul>
            </div>
            <div>
                <select @change="atualizarStatusPedido($event, pedido.id)" name="status">
                    <option value="">Selecione</option>
                    <option v-for="status in listaStatusPedido" :key="status.id" :value="status.id"
                        :selected="status.id == pedido.statusId">
                        {{ status.descricao }}
                    </option>
                </select>
            </div>
            <div>
                <button @click="deletarPedido(pedido.id)">🗑️ Deletar</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "ListaPedidoComponent",
    data() {
        return {
            listaPedidosRealizados: [],
            listaStatusPedido: [],
        };
    },

    methods: {

        async consultarPedidos() {
            const response = await fetch(`${process.env.VUE_APP_API_URL}/pedidos`);
            this.listaPedidosRealizados = await response.json();
        },

        async consultarStatusPedido() {
            const response = await fetch(`${process.env.VUE_APP_API_URL}/status_pedido`);
            this.listaStatusPedido = await response.json();
        },

        async atualizarStatusPedido(event, idPedido) {
            const idPedidoAtualizado = event.target.value;
            const atualizacaoJson = JSON.stringify({ statusId: idPedidoAtualizado });
            await fetch(`${process.env.VUE_APP_API_URL}/pedidos/${idPedido}`, {
                method: "PATCH",
                headers: { "Content-type": "application/json" },
                body: atualizacaoJson,
            });
            this.consultarPedidos();
        },

        async deletarPedido(idPedido) {
            await fetch(`${process.env.VUE_APP_API_URL}/pedidos/${idPedido}`, {
                method: "DELETE",
            });
            this.listaPedidosRealizados;
            this.consultarPedidos();
        },
    },
    mounted() {
        this.consultarPedidos();
        this.consultarStatusPedido();
    },
};
</script>

<style scoped></style>
