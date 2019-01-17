<template>
    <div :data-inx="itemInx">
        <div class="item-title text-info clearfix">
            <div class="item-name fll">{{listName}}</div>
            <div class="item-del text-hand text-hover flr" @click="delItem">删除</div>
            <div class="item-dropdown text-hand flr"
                :class="{'item-dropdown-in': contentShow === true}"
                @click="toggleShow"
            ></div>
            <div class="item-date flr">{{createTime}}</div>
        </div>
        <div class="item-content" v-show="contentShow">
            <textarea class="item-textarea"
                      placeholder="填写模板内容……"
                      cols="30"
                      rows="5"
                      :disabled="submitStatus"
                      :value="txtContent"
                      @input="txtInput($event)"
            ></textarea>
            <button class="item-submit"
                    :disabled="submitStatus"
                    :class="{
                        'text-hover': !submitStatus, 
                        'text-info': !submitStatus, 
                        'text-hand': !submitStatus, 
                    }"
                    @click="submitModal"
            >
                提交
            </button>
            <span class="item-status">{{submitStatus ? '当前状态：已经提交申请' : '当前状态：未提交'}}</span>
            <span class="flr">{{txtLen + '/100'}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            contentShow: false,
            txtContent: '',
            txtLen: 0,
            submitStatus: false
        }
    },
    props:[
        'listName', 'createTime', 'itemInx'
    ],
    methods: {
        delItem(){
            if(this.submitStatus){
                alert('无法删除已提交审核的模板！');
                return false;
            }
            if(confirm('确认删除' + this.listName + '吗？')){
                this.contentShow = false;
                this.$emit('del', this.itemInx);
            }
        },
        toggleShow(){
            this.contentShow = !this.contentShow;
        },
        txtInput(ev){
            let val = ev.target.value;
            if(val.length > 100){
                ev.target.value = val.slice(0, 100);
            }
            this.txtContent = ev.target.value;
            this.txtLen = ev.target.value.length;
        },
        submitModal() {
            let val = this.txtContent.trim();
            if(!val){
                alert('申请内容不允许为空！');
                return false;
            }
            this.submitStatus = true;
            this.ajax({
                type: 'GET',
                url: 'static/test.json',
                successFn(data){
                    console.info(data);
                },
                errorFn(e){
                    console.error(e);
                }
            });
        }
    }
}
</script>


<style>
.list-group > .list-group-item{
    border: 1px solid #3388ff;
    margin: 10px 0;
    padding: 5px 15px;
    border-radius: 6px;
}

.item-title{
    line-height: 40px;
    padding: 0 15px;
    overflow: hidden;
}

.item-title > .item-name{
    width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.item-title > .item-date, .item-title > .item-dropdown{
    margin-right: 30px;
}

.item-title > .item-dropdown{
    height: 0;
    margin-top: 15px;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom-width: 0;
    border-top: 15px solid #3388ff;
}

.item-title > .item-dropdown.item-dropdown-in{
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top-width: 0;
    border-bottom: 15px solid #3388ff;
}

.item-content{
    padding: 5px 10px;
    overflow: hidden;
}

.item-content > .item-textarea{
    display: block;
    width: 98%;
    outline: 0;
    border: 1px solid #3388ff;
    border-radius: 6px;
    resize: none;
    padding: 5px;
    font-size: 16px;
    margin-bottom: 5px;
}

.item-content > .item-submit{
    outline: 0;
    width: 100px;
    line-height: 20px;
    font-size: 16px;
    background-color: #ddd;
    border: 1px solid #3388ff;
    border-radius: 6px;
}
.item-content > .item-submit:active{
    background-color: #ccc;
}
.item-submit-disabled{
    color: #666;
}
</style>


