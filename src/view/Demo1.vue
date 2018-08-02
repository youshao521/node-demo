<template>
    <div>
        <span>我是demo16666</span>
        <a @click="test">get测试请求</a>
        <a @click="p">post测试请求</a>
    </div>
</template>
<script>
import { get, post } from '../api/index.js';

export default {
    data() {
        return {};
    },
    computed: {},
    methods: {
        test() {
            get('/demo1', {params: {
                name: 'tom',
                second: 'cat',
            }})
            .then((data) => {
                console.log(data);
            }).catch((err) => {
                console.log(err);
            })
        },
        p() {
            post('/demo2', {
                name: 'tom',
                second: 'cat',
            })
            .then((data) => {
                console.log(data);
            }).catch((err) => {
                console.log(err);
            })
        },
    },
}
</script>

