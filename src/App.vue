<template>
  <div id="app">
    <div class="container">
        <div class="title-wrap clearfix">
            <h4 class="blockquote">短信推广</h4>
            <span class="apply-for text-info text-hand text-hover" @click="createList">
                申请模板
            </span>
        </div>
        <div class="list-wrap">
            <div class="no-des" v-if="listContent.length === 0">当前暂时无模板可用</div>
            <ul class="list-group" v-if="listContent.length !== 0">
                <li class="list-group-item"
                    v-for="(item, index) in listContent"
                    :key="index"
                >
                    <list :listName="item.name"
                        :createTime="item.time"
                        :item-inx="index"
                        @del="delItem"
                    ></list>
                </li>
            </ul>
        </div>
    </div>
    <modal :show-modal="isShow" @close="closeModal"></modal>
  </div>
</template>

<script>
    import Modal from './components/Modal';
    import List from './components/List';

    export default {
        name: "App",
        components: {
            Modal,
            List
        },
        data(){
            return {
                isShow: false,
                listContent: []
            }
        },
        methods: {
            createList() {
                this.isShow = true;
            },
            closeModal(val){
                if(val){
                    this.listContent.push({
                        name: val,
                        time: this.getTime()
                    });
                }
                this.isShow = false;
            },
            delItem(inx){
                this.listContent.splice(inx, 1);
            },
            getTime() {
              var d = new Date();
              return d.getFullYear() +
                '-' +
                (d.getMonth() + 1).toString().padStart(2, "0") +
                '-' +
                d.getDate().toString().padStart(2, "0") +
                ' ' +
                d.getHours().toString().padStart(2, "0") +
                ':' +
                d.getMinutes().toString().padStart(2, "0") +
                ':' +
                d.getSeconds().toString().padStart(2, "0");
            }
        }
    };
</script>

<style>
body,div,ul,li,h1,h2,h3,h4,h5,h6{
    margin: 0;
    padding: 0;
}

body{
    background-color: #a0bbdd;
}

ul,li{
    list-style: none;
}

/* 公用 */
.text-info{
    color: #3388ff;
}

.text-hover:hover{
    color: #003886;
}

.text-hand{
    cursor: pointer;
}

.fll{
    float: left;
}

.flr{
    float: right;
}

.clearfix:after{
    content: "";
    height: 0;
    line-height: 0;
    font-size: 0;
    display: block;
    visibility: hidden;
    clear: both;
}

.fade{
    opacity: 0;
    transition: opacity .15s linear;
}

.fade.in{
    opacity: 1;
}

/* 内容 */
.container{
    margin: 20px;
    padding: 10px;
    overflow: hidden;
}

.container > .title-wrap{
    height: 20px;
    width: 100%;
}

.container > .title-wrap > .blockquote{
    margin-bottom: 10px;
    float: left;
}

.container > .title-wrap > .apply-for{
    width: 100px;
    line-height: 20px;
    text-align: center;
    background-color: #fff;
    border: 1px solid #666;
    float: right;
    margin-right: -10px;
}

.container > .list-wrap{
    width: 100%;
    background-color: #fff;
    position: relative;
    overflow: hidden;
    padding: 10px;
}

/* 当前暂时无模板可用 */
.no-des{
    text-align: center;
    margin: 30px auto;
}

/* 列表框ul*/
.list-group{
    padding: 10px 20px;
}
</style>
