<template>
 <div class="app-container" >
    <h3 class="housing_title">基本信息</h3>
    <div class="main">
     <el-row class="housing_detail">
       <el-col :span="4">
           <div class="grid-content bg-purple"><span>房源编号:</span></div>
       </el-col>
      <el-col :span="6">
           <div class="grid-content bg-purple-light"><span>{{ houseCode }}</span></div>
      </el-col>
     </el-row>

      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>所属公司:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{houseInfoVo.signCompanyText}}</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>社区名称:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{houseInfoVo.communityName}}</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>小区名称:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{houseInfoVo.neighborhoodName}}</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>门牌号:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{houseInfoVo.houseNoText}}</span>
            </div>
        </el-col>
      </el-row>
       <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>地址:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{houseInfoVo.neighborhoodAddress}}</span>
            </div>
        </el-col>
      </el-row>
       <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>户型:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{houseInfoVo.layoutText}}</span>
            </div>
        </el-col>
      </el-row>
       <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>面积:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{houseInfoVo.houseArea}}㎡</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>楼层:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{houseInfoVo.curFloor}} / {{houseInfoVo.totalFloor}}层</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>房源状态:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{houseInfoVo.statusText}}</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail" v-if="$store.getters.buttons.includes('btnFixedPrice')">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>底价:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{houseInfoVo.fixedPrice}}元/月</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>售价:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{houseInfoVo.sellingPrice}}元/月</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>空置期:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{houseInfoVo.vacancyPeriod == null? '无': houseInfoVo.vacancyPeriod + '天'}}</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>管家:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{houseInfoVo.stewardName}} </span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>上游合同:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span v-for="val in houseInfoVo.contractCodeList">{{ val }}</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>上游合同租期:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{houseInfoVo.leaseDeadlineDateStart}}-{{houseInfoVo.leaseDeadlineDateEnd}}</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>上游合同延长期:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{houseInfoVo.extendedPeriodDateStart}}-{{houseInfoVo.extendedPeriodDateEnd}}</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail" v-if="$store.getters.buttons.includes('btnTakeHousePrice')">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>拿房价:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div v-if="houseInfoVo.rentType == '5001'" class="grid-content bg-purple-light">
                <span>{{houseInfoVo.rentMoney}}元/月</span>
            </div>
            <div v-if="houseInfoVo.rentType == '5002'" class="grid-content bg-purple-light">
              <ul style="padding: 0px;">
                <li v-for="rentVo in houseInfoVo.houseLeaseRentList" style="list-style: none"><span>{{ rentVo.rentStartedTimeText }} - {{ rentVo.rentEndedTimeText }} : {{ rentVo.monthMoney }}元/月</span></li>
              </ul>
            </div>
        </el-col>
      </el-row>
    </div>

   <h3 class="housing_title">租约信息</h3>
   <div class="main">
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>合同类型:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span>{{ rentApply.rentOutVo.contractTypeText }}</span>
         </div>
       </el-col>
     </el-row>

     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>租期:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light"><span>{{ rentApply.rentOutVo.dateStartedRent }}-{{ rentApply.rentOutVo.dateEndedRent }}</span></div>
       </el-col>
     </el-row>

     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>灵活期:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span v-if="rentApply.rentOutVo.dateStartedFlexible === null">无</span>
           <span v-if="rentApply.rentOutVo.dateStartedFlexible !== null">{{ rentApply.rentOutVo.dateStartedFlexible }}-{{ rentApply.rentOutVo.dateEndedFlexible }}</span>
         </div>
       </el-col>
     </el-row>

     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple"><span>纯租金:</span></div>
       </el-col>
       <el-col :span="6">
         <div v-if="rentApply.rentOutVo.isGThanTwoYear === false ">
         <div class="grid-content bg-purple-light"><span>{{ rentApply.rentOutVo.pureRentMoney }}元/月</span></div>
         </div>
         <div v-if="rentApply.rentOutVo.isGThanTwoYear === true ">
           <div class="grid-content bg-purple-light">
             <ul style="padding: 0px;">
               <li v-for="rentVo in pureRentList" style="list-style: none"><span>{{ rentVo.rentStartedTimeText }} - {{ rentVo.rentEndedTimeText }} : {{ rentVo.monthMoney }}元/月</span></li>
             </ul>
           </div>
         </div>
       </el-col>
     </el-row>

     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple"><span>增配租金:</span></div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light"><span>{{ rentApply.rentOutVo.additionMoney }}元/月</span></div>
       </el-col>
     </el-row>

     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple"><span>租金:</span></div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light"><span>{{ rentApply.rentOutVo.totalRentMoney }}元/月</span></div>
       </el-col>
     </el-row>

     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple"><span>押金:</span></div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light"><span>{{ rentApply.rentOutVo.guaranteeMoney }}元</span></div>
       </el-col>
     </el-row>

     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple"><span>付款方式:</span></div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light"><span>{{ rentApply.rentOutVo.paymentTypeValue }}</span></div>
       </el-col>
     </el-row>

     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple"><span>宽带费:</span></div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light"><span>{{ rentApply.rentOutVo.networkFeeText }}</span></div>
       </el-col>
     </el-row>

     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple"><span>租客要求:</span></div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span v-if="rentApply.rentOutVo.renterDemand == null">无</span>
           <span v-if="rentApply.rentOutVo.renterDemand != null">{{ rentApply.rentOutVo.renterDemand }}</span>
         </div>
       </el-col>
     </el-row>
   </div>

   <h3 class="housing_title">租客信息</h3>
   <div class="main">
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>租客类型:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light"><span>{{ rentApply.rentOutVo.renterTypeText }}</span></div>
       </el-col>
     </el-row>
     <div v-if="rentApply.rentOutVo.renterType === 'personal'">
       <el-row class="housing_detail">
         <el-col :span="4">
           <div class="grid-content bg-purple">
             <span>租客姓名:</span>
           </div>
         </el-col>
         <el-col :span="6">
           <div class="grid-content bg-purple-light"><span>{{ rentApply.rentOutVo.renterName }}</span></div>
         </el-col>
       </el-row>

       <el-row class="housing_detail">
         <el-col :span="4">
           <div class="grid-content bg-purple">
             <span>手机号码:</span>
           </div>
         </el-col>
         <el-col :span="6">
           <div class="grid-content bg-purple-light"><span>{{ rentApply.rentOutVo.renterMobile }}</span></div>
         </el-col>
       </el-row>
     </div>
     <div v-else>
       <el-row class="housing_detail">
         <el-col :span="4">
           <div class="grid-content bg-purple">
             <span>租客企业名称:</span>
           </div>
         </el-col>
         <el-col :span="6">
           <div class="grid-content bg-purple-light"><span>{{ rentApply.rentOutVo.renterOrg }}</span></div>
         </el-col>
       </el-row>
     </div>
   </div>

   <h3 class="housing_title">租客来源</h3>
   <div class="main">
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>租客来源:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light"><span>{{ rentApply.rentOutVo.renterSourceText }}</span></div>
       </el-col>
     </el-row>

     <div v-if="isAgent && agentInfo != null" >
       <el-row class="housing_detail">
         <el-col :span="4">
           <div class="grid-content bg-purple">
             <span>中介名称:</span>
           </div>
         </el-col>
         <el-col :span="6">
           <div class="grid-content bg-purple-light"><span>{{ agentInfo.agentName }}</span></div>
         </el-col>
       </el-row>

       <el-row class="housing_detail">
         <el-col :span="4">
           <div class="grid-content bg-purple">
             <span>联系人:</span>
           </div>
         </el-col>
         <el-col :span="6">
           <div class="grid-content bg-purple-light"><span>{{ agentInfo.contactName }}</span></div>
         </el-col>
       </el-row>

       <el-row class="housing_detail">
         <el-col :span="4">
           <div class="grid-content bg-purple">
             <span>联系人电话:</span>
           </div>
         </el-col>
         <el-col :span="6">
           <div class="grid-content bg-purple-light"><span>{{ agentInfo.contactMobile }}</span></div>
         </el-col>
       </el-row>

       <el-row class="housing_detail">
         <el-col :span="4">
           <div class="grid-content bg-purple">
             <span>佣金:</span>
           </div>
         </el-col>
         <el-col :span="6">
           <div class="grid-content bg-purple-light"><span>{{ agentInfo.brokerage }}元</span></div>
         </el-col>
       </el-row>
     </div>
   </div>
 </div>
</template>

<script>
import Utils from "@/utils/common";
import { view } from "@/api/rent";
import { getHouseInfo4Rent } from "@/api/house";
export default {
  data() {
    return {
      getDataLoading: false,
      rentApplyCode: this.$route.query.rentApplyCode,
      houseCode: this.houseCode,
      rentApply: {
        rentOutVo: ""
      },
      houseInfoVo: "",
      pureRentList: "",
      isAgent: false,
      agentInfo: ""
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      view(this.rentApplyCode)
        .then(response => {
          this.rentApply = response.data;
          this.houseCode = response.data.houseCode;
          this.viewHouseInfo4Rent(this.houseCode);
          if (response.data.rentOutVo.renterSource === "1903" || response.data.rentOutVo.renterSource === "1904") {
            this.isAgent = true;
          } else {
            this.isAgent = false;
          }
          if (response.data.rentOutVo.isGThanTwoYear === true) {
            this.pureRentList = response.data.rentOutVo.pureRentList;
          }
          this.agentInfo = response.data.rentOutVo.agentInfo;
        })
        .catch(error => {
          Utils.error(error);
        });
    },
    viewHouseInfo4Rent() {
      getHouseInfo4Rent(this.houseCode).then(response => {
        this.houseInfoVo = response.data;
      }).catch(error => {
          Utils.error(error);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
    .housing_title{
        height: 50px;
        background-color: #ccc;
        line-height: 50px;
        text-indent: 10px;
    }
    .main{
        padding-left: 20px;
        padding-top: 10px;
    }
    .housing_detail{
        margin-bottom: 20px;
    }
    .housing_detail_pic{
        display: inline-block;
        width: 100px;
        height: 50px;
    }
</style>

