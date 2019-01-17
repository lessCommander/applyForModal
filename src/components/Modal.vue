<!-- 申请模板模态窗口 -->
<template>
    <div class="modal" v-show="showModal" @click="closeModal">
        <div class="modal-dialog" @click.stop>
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-cancel text-info text-hand" @click="closeModal">取消</div>
                    <div class="modal-title">申请模板</div>
                    <div class="modal-ok text-info text-hand" @click="okModal">确定</div>
                </div>
                <div class="modal-body">
                    <span>请输入模板名称：</span>
                    <input ref="inp" type="text" class="modal-input" placeholder="新建模板" v-model="txt">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            txt: ''
        }
    },
    props: {
        type: Boolean,
        showModal: false
    },
    methods:{
        closeModal(){
            this.$emit('close');
            this.txt = '';
        },
        okModal() {
            let val = this.txt.trim();
            if (val == '') {
                alert('模板名称不能为空！');
                return false;
            } else {
                this.$emit('close', val);
            }
            this.txt = '';
        }
    },
    updated(){
        if(this.showModal){
            this.$refs.inp.focus();
        }
    }
}
</script>

<style>
.modal{
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1050;
    outline: 0;
}

.modal > .modal-dialog{
    width: 80%;
    margin: 100px auto;
    position: relative;
    outline: 0;
}

.modal > .modal-dialog > .modal-content{
    position: relative;
    background-color: #fff;
    background-clip: padding-box;
    border-radius: 6px;
    box-shadow: 0 0 5px 1px;
    overflow: hidden;
}

.modal-header{
    line-height: 30px;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid #ccc;
    padding: 5px 20px;
}

.modal-header > .modal-cancel{
    float: left;
}

.modal-header > .modal-title{
    text-align: center;
    width: 100px;
    position: absolute;
    left: 50%;
    margin-left: -50px;
}

.modal-header > .modal-ok{
    float: right;
}

.modal-body{
    background-color: #eee;
    padding: 20px;
}

.modal-body > .modal-input{
    width: 70%;
    height: 30px;
    padding: 3px 5px;
    font-size: 16px;
    outline: 0;
}


/* 媒体查询 */
@media (min-width: 768px){
    .modal > .modal-dialog{
        width: 70%;
    }
}
</style>
