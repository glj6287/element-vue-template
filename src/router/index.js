import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will not redirct in the levelbar
 * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
 * meta : `{ role: ['admin'] }`  will control the page role
 **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    name: '首页',
    hidden: true,
    icon: 'zujian',
    children: [
      {
        path: 'index',
        component: _import('dashboard/index')
      },
    ],
  },
]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // {
  //   path: '/taskagents',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   icon: 'clipboard',
  //   meta: { code: '/permission/taskagents' },
  //   name: '待办任务',
  //   children: [
  //     // {
  //     //   path: 'taskagents',
  //     //   name: '上游待办任务',
  //     //   meta: { code: '/taskagents/taskagents' },
  //     //   component: _import('taskagents/up/index')
  //     // },
  //     {
  //       path: 'taskagentlist',
  //       name: '待办任务',
  //       meta: { code: '/taskagents/taskagents' },
  //       component: _import('taskagents/index')
  //     },
  //     {
  //       path: 'taskagents/auditcontract',
  //       name: '上游合同审核',
  //       hidden: true,
  //       // meta: { code: 'sys-department' },
  //       component: _import('taskagents/up/auditcontract')
  //     },
  //     // {
  //     //   path: 'downtaskagents',
  //     //   name: '下游待办任务',
  //     //   meta: { code: '/taskagents/downtaskagents' },
  //     //   component: _import('taskagents/down/downindex')
  //     // },
  //     {
  //       path: 'downtaskagents/auditcontract',
  //       name: '下游合同审核',
  //       hidden: true,
  //       // meta: { code: 'sys-department' },
  //       component: _import('taskagents/down/auditcontract')
  //     }
  //   ]
  // },

  
  // {
  //   path: '/house',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   icon: 'form',
  //   meta: { code: '/permission/house' },
  //   name: '房源管理',
  //   children: [
  //     {
  //       path: 'house',
  //       name: '房源管理',
  //       meta: { code: '/house/house' },
  //       component: _import('house/index')
  //     },
  //     {
  //       path: 'allOfHouse',
  //       name: '房源查询',
  //       meta: { code: '/house/allOfHouse' },
  //       component: _import('house/indexAll')
  //     },
  //     {
  //       path: 'detail',
  //       name: '房源详情',
  //       hidden: true,
  //       component: _import('house/housedetails')
  //     }
  //   ]
  // },
  // {
  //   path: '/tenancymanagement',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   icon: 'shouce',
  //   meta: { code: '/permission/tenancymanagement' },
  //   name: '租务管理',
  //   children: [
  //     {
  //       path: 'withroomfor',
  //       name: '拿房申请',
  //       meta: { code: '/tenancymanagement/withroomfor' },
  //       component: _import('tenancymanagement/withroomfor/index')
  //     },
  //     {
  //       path: 'withroomfor/housecollection',
  //       name: '详情',
  //       hidden: true,
  //       component: _import('tenancymanagement/withroomfor/housecollection')
  //     },
  //     {
  //       path: 'rentApply',
  //       name: '租出申请',
  //       meta: { code: '/tenancymanagement/rentApply' },
  //       component: _import('rent/index')
  //     },
  //     {
  //       path: 'rentdetailnav',
  //       hidden: true,
  //       name: '租出申请-详情',
  //       component: _import('rent/detailnav')
  //     }
  //   ]
  // },
  // {
  //   path: '/contractmanagement',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   icon: 'tubiao',
  //   meta: { code: '/permission/contractmanagement' },
  //   name: '合同管理',
  //   children: [
  //     {
  //       path: 'upstreamcontract',
  //       name: '上游合同',
  //       meta: { code: '/contractmanagement/upstreamcontract' },
  //       component: _import('contractmanagement/upstreamcontract/index')
  //     },
  //     {
  //       path: 'downstreamcontract',
  //       name: '下游合同',
  //       meta: { code: '/contractmanagement/downstreamcontract' },
  //       component: _import('contractmanagement/downstreamcontract/index')
  //     },
  //     {
  //       path: 'upstreamcontract/detailinfo',
  //       name: '上游合同详情',
  //       hidden: true,
  //       // meta: { code: 'sys-department' },
  //       component: _import('contractmanagement/upstreamcontract/detailinfo')
  //     },
  //     {
  //       path: 'downstreamcontract/auditcontract',
  //       name: '下游合同详情',
  //       hidden: true,
  //       component: _import('contractmanagement/downstreamcontract/auditcontract')
  //     },
  //     {
  //       path: 'landlordInfo',
  //       meta: { code: '/clientmanagement/landlordInfo' },
  //       name: '业主信息',
  //       component: _import('client/landlordInfo')
  //     },
  //     {
  //       path: 'tenantsInfo',
  //       meta: { code: '/clientmanagement/tenantsInfo' },
  //       name: '租客管理',
  //       component: _import('client/tenantsInfo')
  //     },
  //     {
  //       path: 'payeeInfo',
  //       meta: { code: '/clientmanagement/payeeInfo' },
  //       name: '收款人管理',
  //       component: _import('payee/index')
  //     }
  //   ]
  // },
  // {
  //   path: '/housingallocation',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   icon: 'component',
  //   name: '房屋配置管理',
  //   children: [
  //     {
  //       path: 'housingallocation',
  //       name: '房屋配置工单',
  //       // meta: { code: '/json/organmenu' },
  //       component: _import('housingallocation/index')
  //     },
  //   ]
  // },
  // {
  //   path: '/billmanagement',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   icon: 'EXCEL',
  //   meta: { code: '/permission/billmanagement' },
  //   name: '账单管理',
  //   children: [
  //     {
  //       path: 'upstreambillpayable',
  //       name: '上游应付账单',
  //       meta: { code: '/billmanagement/upstreambillpayable' },
  //       component: _import('billmanagement/upstreambillpayable')
  //     },
  //     {
  //       path: 'payablebilldetail',
  //       name: '上游应付账单详情',
  //       hidden: true,
  //       component: _import('billmanagement/payablebilldetail')
  //     },
  //     {
  //       path: 'membershipbill',
  //       name: '上游会员费账单',
  //       meta: { code: '/billmanagement/membershipbill' },
  //       component: _import('billmanagement/membershipbill')
  //     },
  //     {
  //       path: 'receivablebilldetail',
  //       name: '上游会员账单详情',
  //       hidden: true,
  //       component: _import('billmanagement/receivablebilldetail')
  //     },
  //     {
  //       path: 'receichargeoffbill',
  //       name: '上游会员账单销账',
  //       hidden: true,
  //       component: _import('billmanagement/receichargeoffbill')
  //     },
  //     {
  //       path: 'downstreambill/downstreambill',
  //       name: '下游应收账单',
  //       meta: { code: '/billmanagement/downstreambill' },
  //       component: _import('billmanagement/downstreambill/downstreambill')
  //     },
  //     {
  //       path: 'downstreambill/downstreambilldetail',
  //       name: '下游应收账单详情',
  //       hidden: true,
  //       component: _import('billmanagement/downstreambill/downstreambilldetail')
  //     },
  //     {
  //       path: 'downstreambill/downstreambillrecerecord',
  //       name: '下游收款流水',
  //       meta: { code: '/downstreambill/downstreambillrecerecord' },
  //       component: _import('billmanagement/downstreambill/downstreambillrecerecord')
  //     }
  //   ]
  // },
  // {
  //   path: '/website',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   icon: 'zip',
  //   meta: { code: '/website/manager' },
  //   name: '网站管理',
  //   children: [
  //     {
  //       path: 'bannermanage',
  //       name: 'banner管理',
  //       meta: { code: '/website/bannermanage' },
  //       component: _import('website/bannermanage')
  //     },
  //     {
  //       path: 'visitorlist',
  //       name: '访客清单',
  //       meta: { code: '/website/visitorlist' },
  //       component: _import('website/visitorlist')
  //     },
  //     {
  //       path: 'entrustlist',
  //       name: '委托清单',
  //       meta: { code: '/website/entrustlist' },
  //       component: _import('website/entrustlist')
  //     },
  //     {
  //       path: 'channeldeliverylist',
  //       name: '渠道投放数据记录',
  //       meta: { code: '/website/channeldeliverylist' },
  //       component: _import('website/channeldeliverylist')
  //     }
  //   ]
  // },
  // {
  //   path: '/commonbill',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   icon: 'star',
  //   meta: { code: '/commonbill/manager' },
  //   name: '账单计算',
  //   children: [
  //     {
  //       path: 'upaccountmanagement',
  //       name: '上游账单计算',
  //       // meta: { code: '/json/organmenu' },
  //       component: _import('commonbill/upindex'),
  //     },
  //     {
  //       path: 'accountmanagement',
  //       name: '租客账单计算',
  //       // meta: { code: '/json/organmenu' },
  //       component: _import('commonbill/index'),
  //     }
  //   ]
  // },
  // {
  //   path: '/clientmanagement',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   icon: 'user',
  //   meta: { code: '/clientmanagement/management' },
  //   name: '客户管理',
  //   children: [
  //     {
  //       path: 'landlordInfo',
  //       meta: { code: '/clientmanagement/landlordInfo' },
  //       name: '房东信息',
  //       component: _import('client/landlordInfo')
  //     }
  //   ]
  // },


  // {
  //   path: '/makeTicketManage',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   icon: 'user',
  //   // meta: { code: '/clientmanagement/management' },
  //   name: '开票管理',
  //   children: [
  //     {
  //       path: 'summary',
  //       // meta: { code: '/clientmanagement/landlordInfo' },
  //       name: '开票总表',
  //       component: _import('makeTicketManage/summary/index')
  //     },
  //     {
  //       path: 'particulars',
  //       // meta: { code: '/clientmanagement/landlordInfo' },
  //       name: '开票明细',
  //       component: _import('makeTicketManage/particulars/index')
  //     }
  //   ]
  // },
  // {
  //   path: '/certificate',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   icon: 'user',
  //   // meta: { code: '/clientmanagement/management' },
  //   name: '凭证管理',
  //   children: [
  //     {
  //       path: 'pzDownload',
  //       // meta: { code: '/clientmanagement/landlordInfo' },
  //       name: '凭证下载',
  //       component: _import('certificate/pzDownload/index')
  //     }
  //   ]
  // },
  // {
  //   path: '/basicdata',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   icon: 'zonghe',
  //   meta: { code: '/permission/basicdata' },
  //   name: '基础数据管理',
  //   children: [
  //     {
  //       path: 'community',
  //       name: '社区管理',
  //       meta: { code: '/basicdata/community' },
  //       component: _import('basicdata/community')
  //     },
  //     {
  //       path: 'littledistrict',
  //       name: '小区管理',
  //       meta: { code: '/basicdata/littledistrict' },
  //       component: _import('basicdata/littledistrict')
  //     },
  //     {
  //       path: `moduledetails`,
  //       name: '小区详情',
  //       hidden: true,
  //       component: _import('basicdata/moduledetails')
  //     },
  //     {
  //       path: `jdDataProcessing`,
  //       name: '金蝶数据处理',
  //       // hidden: true,
  //       component: _import('basicdata/jdDataProcessing')
  //     },
  //     {
  //       path: 'therentstrategy',
  //       name: '租金策略管理',
  //       meta: { code: '/basicdata/therentstrategy' },
  //       component: _import('basicdata/therentstrategy')
  //     },
  //     {
  //       path: 'therentstrategy1',
  //       name: '租金策略管理1',
  //       meta: { code: '/basicdata/therentstrategy' },
  //       component: _import('basicdata/therentstrategy1')
  //     },
  //   ]
  // },
  {
    path: '/organization',
    component: Layout,
    redirect: 'noredirect',
    name: '组织机构管理',
    icon: 'component',
    children: [
      {
        path: 'department',
        name: '部门管理',
        meta: { code: '/json/organdepat' },
        component: _import('organization/index')
      },
      {
        path: 'role',
        name: '角色管理',
        meta: { code: '/json/organrole' },
        component: _import('role/index')
      },
      {
        path: 'user',
        name: '用户管理',
        meta: { code: '/json/organuser' },
        component: _import('user/index')
      },

    ]
  },
  // {
  //   path: '/oldfiledata',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   icon: 'xinrenzhinan',
  //   meta: { code: '/oldfiledata/odlfiles' },
  //   name: '图片处理',
  //   children: [
  //     {
  //       path: 'housefiles',
  //       name: '房源图片处理',
  //       component: _import('odlfiles/houseFiles')
  //     },
  //     {
  //       path: 'contractFiles',
  //       name: '合同图片处理',
  //       component: _import('odlfiles/contractFiles')
  //     },
  //     {
  //       path: 'tenantFiles',
  //       name: '租客图片处理',
  //       component: _import('odlfiles/tenantFiles')
  //     },
  //     {
  //       path: 'neighbodFiles',
  //       name: '小区图片处理',
  //       component: _import('odlfiles/neighbodFiles')
  //     }
  //   ]
  // },
  {
    path: '/sys',
    component: Layout,
    redirect: 'noredirect',
    icon: 'quanxian',
    name: '系统配置',
    children: [
      {
        path: 'menu',
        name: '菜单管理',
        meta: { code: '/json/organmenu' },
        component: _import('menu/index')
      },
      {
        path: 'limit',
        name: '权限配置',
        meta: { code: '/limit/config' },
        component: _import('limit/index')
      },
      {
        path: 'dict',
        name: '数据字典',
        meta: { code: '/system/dataDict' },
        component: _import('dict/index')
      },
      {
        path: 'msgtemp',
        name: '消息模板',
        meta: { code: '/system/msgTemp' },
        component: _import('msgtemp/index')
      },
      {
        path: 'msgpush',
        name: '消息推送',
        meta: { code: '/system/msgPush' },
        component: _import('msgpush/index')
      },
      {
        path: 'appvadd',
        name: 'APP版本更新',
        meta: { code: '/system/appvadd' },
        component: _import('app/appvadd')
      },
      {
        path: 'appvhistory',
        name: 'APP更新历史',
        meta: { code: '/system/appvhistory' },
        component: _import('app/appvhistory')
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
];
