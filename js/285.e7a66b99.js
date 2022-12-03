"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[285],{4043:function(t,e,r){r.d(e,{Z:function(){return B}});var o=r(3396);const n={class:"orders-history"},i={class:"orders-history__title"},s=(0,o.Uk)(" Histora zamówień "),l=(0,o._)("div",{class:"orders-history__info"},[(0,o._)("div",null,"Numer zamówienia"),(0,o._)("div",null,"Data zamówienia"),(0,o._)("div",null,"Ilość"),(0,o._)("div",null,"Koszt"),(0,o._)("div",null,"Status"),(0,o._)("div",null,"Detale")],-1),a={class:"orders-history__container"},u={class:"orders-history__element"},c={key:1,class:"orders-history__message"};function d(t,e,r,d,m,p){const h=(0,o.up)("history-blue-icon"),w=(0,o.up)("detail-orders-history-element");return(0,o.wg)(),(0,o.iD)("div",n,[(0,o._)("h1",i,[s,(0,o.Wm)(h)]),l,(0,o._)("div",a,[t.$store.state.ordersState.ordersHistory.length>0?((0,o.wg)(!0),(0,o.iD)(o.HY,{key:0},(0,o.Ko)(t.$store.state.ordersState.ordersHistory,(t=>((0,o.wg)(),(0,o.iD)("div",u,[(0,o.Wm)(w,{"order-info":t},null,8,["order-info"])])))),256)):((0,o.wg)(),(0,o.iD)("div",c,"Brak zamówień"))])])}const m={width:"27",height:"27",viewBox:"0 0 27 27",fill:"none",xmlns:"http://www.w3.org/2000/svg"},p=(0,o._)("rect",{width:"27",height:"27",rx:"5",fill:"#3F51B5"},null,-1),h=(0,o._)("path",{d:"M14 10H13V15H17V14H14V10Z",fill:"white"},null,-1),w=(0,o._)("path",{d:"M14 6C11 6 8.4 7.6 7.1 10.1L6 9V13H10L8.5 11.5C9.5 9.5 11.6 8 14 8C17.3 8 20 10.7 20 14C20 17.3 17.3 20 14 20C12.2 20 10.6 19.2 9.5 17.9L8 19.2C9.4 20.9 11.6 22 14 22C18.4 22 22 18.4 22 14C22 9.6 18.4 6 14 6Z",fill:"white"},null,-1),f=[p,h,w];function _(t,e){return(0,o.wg)(),(0,o.iD)("svg",m,f)}var v=r(89);const H={},g=(0,v.Z)(H,[["render",_]]);var Z=g,V=r(7139);function y(t,e,r,n,i,s){const l=(0,o.up)("info-black-icon"),a=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o._)("div",null,(0,V.zw)(t.orderInfo.orderNumber),1),(0,o._)("div",null,(0,V.zw)(t.getDate()),1),(0,o._)("div",null,(0,V.zw)(t.orderInfo.quantity)+" szt",1),(0,o._)("div",null,(0,V.zw)(t.orderInfo.totalPrice)+" zł",1),(0,o._)("div",null,(0,V.zw)(t.orderInfo.status),1),(0,o._)("div",null,[(0,o.Wm)(a,{to:"/d/orders/"+t.orderInfo.id},{default:(0,o.w5)((()=>[(0,o.Wm)(l)])),_:1},8,["to"])])],64)}var D=r(6797),k=r.n(D),C=r(5324),z=(0,o.aZ)({components:{InfoBlackIcon:C.Z},props:{orderInfo:{type:Object,required:!0}},methods:{getDate(){return k()(this.orderInfo.createdAt).format("DD/MM/YYYY")}}});const I=(0,v.Z)(z,[["render",y]]);var M=I,b=(0,o.aZ)({components:{HistoryBlueIcon:Z,DetailOrdersHistoryElement:M},mounted(){const t=this.$route.path.split("/")[2];let e=null;switch(t){case"customers":e="customer";break;case"companies":e="company";break;case"commodities":e="commodity";break;case"suppliers":e="supplier";break;default:break}null!==e&&this.$store.dispatch("getOrdersHistory",{id:this.$route.params.id,type:e})}});const $=(0,v.Z)(b,[["render",d]]);var B=$},8941:function(t,e,r){r.d(e,{Z:function(){return m}});var o=r(3396);const n={width:"27",height:"27",viewBox:"0 0 27 27",fill:"none",xmlns:"http://www.w3.org/2000/svg"},i=(0,o._)("rect",{width:"27",height:"27",rx:"5",fill:"#3F51B5"},null,-1),s=(0,o._)("path",{d:"M13.5002 5.83337C9.2835 5.83337 5.8335 9.28337 5.8335 13.5C5.8335 17.7167 9.2835 21.1667 13.5002 21.1667C17.7168 21.1667 21.1668 17.7167 21.1668 13.5C21.1668 9.28337 17.7168 5.83337 13.5002 5.83337ZM14.4585 18.2917H12.5418V11.5834H14.4585V18.2917ZM14.4585 10.625H12.5418V8.70837H14.4585V10.625Z",fill:"white"},null,-1),l=[i,s];function a(t,e){return(0,o.wg)(),(0,o.iD)("svg",n,l)}var u=r(89);const c={},d=(0,u.Z)(c,[["render",a]]);var m=d},1285:function(t,e,r){r.r(e),r.d(e,{default:function(){return x}});var o=r(3396);function n(t,e,r,n,i,s){const l=(0,o.up)("customer-detail-info"),a=(0,o.up)("customer-detail-supplier"),u=(0,o.up)("detail-orders-history-list");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o.Wm)(l),(0,o.Wm)(a),(0,o.Wm)(u)],64)}var i=r(7139);const s={class:"detail-customer__info"},l=(0,o.Uk)("Informacje o kliencie ");function a(t,e,r,n,a,u){const c=(0,o.up)("info-blue-icon");return(0,o.wg)(),(0,o.iD)("div",s,[(0,o._)("h1",null,[l,(0,o.Wm)(c)]),(0,o._)("p",null," Imię i nazwisko: "+(0,i.zw)(t.$store.state.customersState.customerDetail?.name),1),(0,o._)("p",null," Numer telefonu: "+(0,i.zw)(t.$store.state.customersState.customerDetail?.phoneNumber),1)])}var u=r(8941),c=(0,o.aZ)({components:{InfoBlueIcon:u.Z}}),d=r(89);const m=(0,d.Z)(c,[["render",a]]);var p=m;const h={key:0,class:"detail-customer__supplier"},w=(0,o.Uk)("Firma "),f={key:1,class:"detail-customer__supplier"},_=(0,o.Uk)("Firma "),v=(0,o._)("b",null,"Brak Firmy",-1);function H(t,e,r,n,s,l){const a=(0,o.up)("company-blue-icon");return t.$store.state.customersState.customerDetail?.company?((0,o.wg)(),(0,o.iD)("div",h,[(0,o._)("h1",null,[w,(0,o.Wm)(a)]),(0,o._)("p",null,"Nazwa: "+(0,i.zw)(t.$store.state.customersState.customerDetail?.company.name),1),(0,o._)("p",null," Nip: "+(0,i.zw)(t.$store.state.customersState.customerDetail?.company.nip),1)])):((0,o.wg)(),(0,o.iD)("div",f,[(0,o._)("h1",null,[_,(0,o.Wm)(a)]),v]))}const g={width:"27",height:"27",viewBox:"0 0 27 27",fill:"none",xmlns:"http://www.w3.org/2000/svg"},Z=(0,o._)("rect",{width:"27",height:"27",rx:"5",fill:"#3F51B5"},null,-1),V=(0,o._)("path",{d:"M20 20V9H17V6H8V20H6V21H13V18H15V21H22V20H20ZM12 16H10V14H12V16ZM12 13H10V11H12V13ZM12 10H10V8H12V10ZM15 16H13V14H15V16ZM15 13H13V11H15V13ZM15 10H13V8H15V10ZM19 16H17V14H19V16ZM19 13H17V11H19V13Z",fill:"white"},null,-1),y=[Z,V];function D(t,e){return(0,o.wg)(),(0,o.iD)("svg",g,y)}const k={},C=(0,d.Z)(k,[["render",D]]);var z=C,I=(0,o.aZ)({components:{CompanyBlueIcon:z}});const M=(0,d.Z)(I,[["render",H]]);var b=M,$=r(4043),B=(0,o.aZ)({components:{CustomerDetailInfo:p,CustomerDetailSupplier:b,DetailOrdersHistoryList:$.Z},mounted(){this.$store.dispatch("getCustomerDetail",this.$route.params.id)},unmounted(){this.$store.commit("resetCustomerDetail")}});const W=(0,d.Z)(B,[["render",n]]);var x=W}}]);
//# sourceMappingURL=285.e7a66b99.js.map