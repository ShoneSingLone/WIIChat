<template> 
    <h1>hello{{isString("hello")}}</h1> 
</template>

<script>
import isString from "lodash";

export default {
    methods: {
        isString
    },
}
</script>

<style lang="scss">

*{
    color:gray;
}
</style>