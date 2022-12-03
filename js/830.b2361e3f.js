"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[830],{5106:function(e,t,a){a.d(t,{Z:function(){return c}});var u=a(3396),l=a(7139);const o={class:"form-group"},i=["for"],r=["type","placeholder","name"];function n(e,t,a,n,d,m){return(0,u.wg)(),(0,u.iD)("div",o,[(0,u._)("label",{for:e.nameValue},(0,l.zw)(e.labelValue),9,i),(0,u._)("input",{ref:"input",onInput:t[0]||(t[0]=(...t)=>e.updateValue&&e.updateValue(...t)),type:e.typeValue,placeholder:e.placeholderValue,name:e.nameValue,step:".01",autocomplete:"off"},null,40,r)])}var d=a(4870),m=(0,u.aZ)({setup(){const e=(0,d.iH)(null);return{input:e}},props:{placeholderValue:{type:String,required:!0},typeValue:{type:String,required:!0},labelValue:{type:String,required:!0},nameValue:{type:String,required:!0},defaultValue:{type:[String,Number]}},watch:{defaultValue:function(e){this.input&&this.defaultValue&&(this.input.value=e)}},methods:{updateValue(e){this.$emit("update:modelValue",e.target.value)}}}),p=a(89);const s=(0,p.Z)(m,[["render",n]]);var c=s},7774:function(e,t,a){a.d(t,{Z:function(){return c}});var u=a(3396),l=a(7139);const o={class:"form-group-textarea"},i=["for"],r=["type","placeholder","name"];function n(e,t,a,n,d,m){return(0,u.wg)(),(0,u.iD)("div",o,[(0,u._)("label",{for:e.nameValue},(0,l.zw)(e.labelValue),9,i),(0,u._)("textarea",{ref:"input",onInput:t[0]||(t[0]=(...t)=>e.updateValue&&e.updateValue(...t)),type:e.typeValue,placeholder:e.placeholderValue,name:e.nameValue},null,40,r)])}var d=a(4870),m=(0,u.aZ)({setup(){const e=(0,d.iH)(null);return{input:e}},props:{placeholderValue:{type:String,required:!0},typeValue:{type:String,required:!0},labelValue:{type:String,required:!0},nameValue:{type:String,required:!0},defaultValue:{type:String}},watch:{defaultValue:function(e){this.input&&this.defaultValue&&(this.input.value=e)}},methods:{updateValue(e){this.$emit("update:modelValue",e.target.value)}}}),p=a(89);const s=(0,p.Z)(m,[["render",n]]);var c=s},4830:function(e,t,a){a.r(t),a.d(t,{default:function(){return V}});var u=a(3396);const l=(0,u._)("h2",{class:"add-form__header"},"Dodaj nowy towar",-1),o={class:"add-form__body"},i=(0,u._)("button",{class:"add-form__button",type:"submit"},"Dodaj",-1);function r(e,t,a,r,n,d){const m=(0,u.up)("form-group"),p=(0,u.up)("form-group-textarea");return(0,u.wg)(),(0,u.iD)("form",{class:"add-form",onSubmit:t[3]||(t[3]=(...t)=>e.submitForm&&e.submitForm(...t))},[l,(0,u._)("div",o,[(0,u.Wm)(m,{modelValue:e.name,"onUpdate:modelValue":t[0]||(t[0]=t=>e.name=t),"label-value":"Nazwa towaru","type-value":"text","placeholder-value":"Podaj nazwę towaru","name-value":"name","default-value":e.name},null,8,["modelValue","default-value"]),(0,u.Wm)(m,{modelValue:e.indexNumber,"onUpdate:modelValue":t[1]||(t[1]=t=>e.indexNumber=t),"label-value":"Numer katalogowy","type-value":"text","placeholder-value":"Numer nie wymagany","name-value":"indexNumber","default-value":e.indexNumber},null,8,["modelValue","default-value"]),(0,u.Wm)(p,{modelValue:e.description,"onUpdate:modelValue":t[2]||(t[2]=t=>e.description=t),"label-value":"Opis","type-value":"text","placeholder-value":"Dodatkowy opis","name-value":"description","default-value":e.description},null,8,["modelValue","default-value"]),i])],32)}var n=a(4870),d=a(5106),m=a(7774),p=a(4997),s=a(2483),c=(0,u.aZ)({components:{FormGroup:d.Z,FormGroupTextarea:m.Z},setup(){const e=(0,p.oR)(),t=(0,s.yj)();e.dispatch("getCompanies");const a=(0,n.iH)(""),u=(0,n.iH)(""),l=(0,n.iH)(""),o=(0,n.iH)("");return e.dispatch("getCommodityDetail",t.params.id).then((()=>{e.state.commoditiesState.commodityDetail&&(a.value=e.state.commoditiesState.commodityDetail.id,u.value=e.state.commoditiesState.commodityDetail.name,l.value=e.state.commoditiesState.commodityDetail.indexNumber,o.value=e.state.commoditiesState.commodityDetail.description)})),{commodityId:a,name:u,description:o,indexNumber:l}},methods:{async submitForm(e){e.preventDefault();const t={name:this.name,indexNumber:this.indexNumber,description:this.description},a={id:this.commodityId,data:t};await this.$store.dispatch("editCommodity",a),this.$store.state.commoditiesState.isError?this.$store.commit("toggleCommodityError"):this.$router.replace({replace:!0,path:"/d/commodities"})}}}),f=a(89);const h=(0,f.Z)(c,[["render",r]]);var V=h}}]);
//# sourceMappingURL=830.b2361e3f.js.map