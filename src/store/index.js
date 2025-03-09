import { createStore } from 'vuex';
import Workconfirm from '../components/render/workconfirm.vue';

export default createStore({
    state: {
        button1:'加载路网',
        button2:'加载数据',
        button3:'加载poi',
        datasummary:false,
        sumpeople:false,
        filterparams:'',
        renderdata:undefined,
        evaluate:false,
        savedata:null,
        prediction:null,
        weatherdata:false,
        analysesgrade:false,
        analysesdata:null,
        editscreen:null,
        drawer:false,
        WorkingData:null,
        workconfirm:false,
        workconfirm_data:null,
    },
    mutations: {
    // 进行数据更新，改变数据状态
    cleardata (state) {
        // 变更状态
        state.savedata=null
      },
    },
    actions: {
    //执行动作，数据请求
       
        },
    getters:{
          // 获取到最终的数据结果
    }
})
   

