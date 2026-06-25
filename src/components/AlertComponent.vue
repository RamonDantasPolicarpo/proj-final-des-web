<template>
    <div v-if="visivel" :class="['alert-container', tipo]">
        <p>{{ mensagem }}</p>
    </div>
</template>

<script>
export default {
    name: "AlertComponent",
    props: {
        messagem: {
            type: String,
            required: true
        },
        tipo: {
            type: String,
            defalt: "info"
        },
        visivel: {
            type: Boolean,
            defalt: false
        }
    }
}
</script>

<style>

</style>