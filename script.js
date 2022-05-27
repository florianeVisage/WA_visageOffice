/*! For license information please see script.js.LICENSE.txt */
(()=>{"use strict";var e={910:(e,t,o)=>{o.r(t),o.d(t,{Properties:()=>r,VariableDescriptor:()=>i,bootstrapExtra:()=>X,findLayerBoundaries:()=>h,findLayersBoundaries:()=>g,getLayersMap:()=>u,getVariables:()=>a,initDoors:()=>H,initPropertiesTemplates:()=>U,initVariableActionLayer:()=>K,openConfig:()=>s});class r{constructor(e){this.properties=null!=e?e:[]}get(e){const t=this.properties.filter((t=>t.name===e)).map((e=>e.value));if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(0!==t.length)return t[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,t){const o=this.get(e);if(void 0!==o){if(typeof o!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return o}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,t){const o=this.get(e);if(void 0===o)throw new Error('Property "'+e+'" is missing');if(typeof o!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return o}getType(e){const t=this.properties.filter((t=>t.name===e)).map((e=>e.type));if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(0!==t.length)return t[0]}}const n="https://unpkg.com/@workadventure/scripting-api-extra@1.3.2/dist";class i{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new r(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return!e||WA.player.tags.includes(e)}get isWritable(){const e=this.properties.getString("writableBy");return!e||WA.player.tags.includes(e)}}function s(e){const t=e?"#"+e.join():"";WA.nav.openCoWebSite(n+"/configuration.html"+t)}async function a(e,t){const o=await WA.room.getTiledMap(),r=new Map;return l(o.layers,r,e,t),r}function l(e,t,o,r){for(const n of e)if("objectgroup"===n.type){for(const e of n.objects)if("variable"===e.type){if(o&&n.name!==o)continue;if(r&&!r.includes(e.name))continue;t.set(e.name,new i(e))}}else"group"===n.type&&l(n.layers,t,o,r)}let c;async function u(){return void 0===c&&(c=async function(){return function(e){const t=new Map;return p(e.layers,"",t),t}(await WA.room.getTiledMap())}()),c}function p(e,t,o){for(const r of e)"group"===r.type?p(r.layers,t+r.name+"/",o):(r.name=t+r.name,o.set(r.name,r))}function h(e){let t=1/0,o=1/0,r=0,n=0;const i=e.data;if("string"==typeof i)throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let s=0;s<e.height;s++)for(let a=0;a<e.width;a++)0!==i[a+s*e.width]&&(t=Math.min(t,a),n=Math.max(n,a),o=Math.min(o,s),r=Math.max(r,s));return{top:o,left:t,right:n+1,bottom:r+1}}function g(e){let t=1/0,o=1/0,r=0,n=0;for(const i of e){const e=h(i);e.left<t&&(t=e.left),e.top<o&&(o=e.top),e.right>n&&(n=e.right),e.bottom>r&&(r=e.bottom)}return{top:o,left:t,right:n,bottom:r}}var f=Object.prototype.toString,d=Array.isArray||function(e){return"[object Array]"===f.call(e)};function y(e){return"function"==typeof e}function m(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function v(e,t){return null!=e&&"object"==typeof e&&t in e}var b=RegExp.prototype.test,w=/\S/;var A={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"},W=/\s*/,S=/\s+/,x=/\s*=/,B=/\s*\}/,C=/#|\^|\/|>|\{|&|=|!/;function E(e){this.string=e,this.tail=e,this.pos=0}function T(e,t){this.view=e,this.cache={".":this.view},this.parent=t}function L(){this.templateCache={_cache:{},set:function(e,t){this._cache[e]=t},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}E.prototype.eos=function(){return""===this.tail},E.prototype.scan=function(e){var t=this.tail.match(e);if(!t||0!==t.index)return"";var o=t[0];return this.tail=this.tail.substring(o.length),this.pos+=o.length,o},E.prototype.scanUntil=function(e){var t,o=this.tail.search(e);switch(o){case-1:t=this.tail,this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,o),this.tail=this.tail.substring(o)}return this.pos+=t.length,t},T.prototype.push=function(e){return new T(e,this)},T.prototype.lookup=function(e){var t,o,r,n=this.cache;if(n.hasOwnProperty(e))t=n[e];else{for(var i,s,a,l=this,c=!1;l;){if(e.indexOf(".")>0)for(i=l.view,s=e.split("."),a=0;null!=i&&a<s.length;)a===s.length-1&&(c=v(i,s[a])||(o=i,r=s[a],null!=o&&"object"!=typeof o&&o.hasOwnProperty&&o.hasOwnProperty(r))),i=i[s[a++]];else i=l.view[e],c=v(l.view,e);if(c){t=i;break}l=l.parent}n[e]=t}return y(t)&&(t=t.call(this.view)),t},L.prototype.clearCache=function(){void 0!==this.templateCache&&this.templateCache.clear()},L.prototype.parse=function(e,t){var o=this.templateCache,r=e+":"+(t||P.tags).join(":"),n=void 0!==o,i=n?o.get(r):void 0;return null==i&&(i=function(e,t){if(!e)return[];var o,r,n,i,s=!1,a=[],l=[],c=[],u=!1,p=!1,h="",g=0;function f(){if(u&&!p)for(;c.length;)delete l[c.pop()];else c=[];u=!1,p=!1}function y(e){if("string"==typeof e&&(e=e.split(S,2)),!d(e)||2!==e.length)throw new Error("Invalid tags: "+e);o=new RegExp(m(e[0])+"\\s*"),r=new RegExp("\\s*"+m(e[1])),n=new RegExp("\\s*"+m("}"+e[1]))}y(t||P.tags);for(var v,A,T,L,M,V,k=new E(e);!k.eos();){if(v=k.pos,T=k.scanUntil(o))for(var U=0,j=T.length;U<j;++U)i=L=T.charAt(U),function(e,t){return b.call(e,t)}(w,i)?(p=!0,s=!0,h+=" "):(c.push(l.length),h+=L),l.push(["text",L,v,v+1]),v+=1,"\n"===L&&(f(),h="",g=0,s=!1);if(!k.scan(o))break;if(u=!0,A=k.scan(C)||"name",k.scan(W),"="===A?(T=k.scanUntil(x),k.scan(x),k.scanUntil(r)):"{"===A?(T=k.scanUntil(n),k.scan(B),k.scanUntil(r),A="&"):T=k.scanUntil(r),!k.scan(r))throw new Error("Unclosed tag at "+k.pos);if(M=">"==A?[A,T,v,k.pos,h,g,s]:[A,T,v,k.pos],g++,l.push(M),"#"===A||"^"===A)a.push(M);else if("/"===A){if(!(V=a.pop()))throw new Error('Unopened section "'+T+'" at '+v);if(V[1]!==T)throw new Error('Unclosed section "'+V[1]+'" at '+v)}else"name"===A||"{"===A||"&"===A?p=!0:"="===A&&y(T)}if(f(),V=a.pop())throw new Error('Unclosed section "'+V[1]+'" at '+k.pos);return function(e){for(var t,o=[],r=o,n=[],i=0,s=e.length;i<s;++i)switch((t=e[i])[0]){case"#":case"^":r.push(t),n.push(t),r=t[4]=[];break;case"/":n.pop()[5]=t[2],r=n.length>0?n[n.length-1][4]:o;break;default:r.push(t)}return o}(function(e){for(var t,o,r=[],n=0,i=e.length;n<i;++n)(t=e[n])&&("text"===t[0]&&o&&"text"===o[0]?(o[1]+=t[1],o[3]=t[3]):(r.push(t),o=t));return r}(l))}(e,t),n&&o.set(r,i)),i},L.prototype.render=function(e,t,o,r){var n=this.getConfigTags(r),i=this.parse(e,n),s=t instanceof T?t:new T(t,void 0);return this.renderTokens(i,s,o,e,r)},L.prototype.renderTokens=function(e,t,o,r,n){for(var i,s,a,l="",c=0,u=e.length;c<u;++c)a=void 0,"#"===(s=(i=e[c])[0])?a=this.renderSection(i,t,o,r,n):"^"===s?a=this.renderInverted(i,t,o,r,n):">"===s?a=this.renderPartial(i,t,o,n):"&"===s?a=this.unescapedValue(i,t):"name"===s?a=this.escapedValue(i,t,n):"text"===s&&(a=this.rawValue(i)),void 0!==a&&(l+=a);return l},L.prototype.renderSection=function(e,t,o,r,n){var i=this,s="",a=t.lookup(e[1]);if(a){if(d(a))for(var l=0,c=a.length;l<c;++l)s+=this.renderTokens(e[4],t.push(a[l]),o,r,n);else if("object"==typeof a||"string"==typeof a||"number"==typeof a)s+=this.renderTokens(e[4],t.push(a),o,r,n);else if(y(a)){if("string"!=typeof r)throw new Error("Cannot use higher-order sections without the original template");null!=(a=a.call(t.view,r.slice(e[3],e[5]),(function(e){return i.render(e,t,o,n)})))&&(s+=a)}else s+=this.renderTokens(e[4],t,o,r,n);return s}},L.prototype.renderInverted=function(e,t,o,r,n){var i=t.lookup(e[1]);if(!i||d(i)&&0===i.length)return this.renderTokens(e[4],t,o,r,n)},L.prototype.indentPartial=function(e,t,o){for(var r=t.replace(/[^ \t]/g,""),n=e.split("\n"),i=0;i<n.length;i++)n[i].length&&(i>0||!o)&&(n[i]=r+n[i]);return n.join("\n")},L.prototype.renderPartial=function(e,t,o,r){if(o){var n=this.getConfigTags(r),i=y(o)?o(e[1]):o[e[1]];if(null!=i){var s=e[6],a=e[5],l=e[4],c=i;0==a&&l&&(c=this.indentPartial(i,l,s));var u=this.parse(c,n);return this.renderTokens(u,t,o,c,r)}}},L.prototype.unescapedValue=function(e,t){var o=t.lookup(e[1]);if(null!=o)return o},L.prototype.escapedValue=function(e,t,o){var r=this.getConfigEscape(o)||P.escape,n=t.lookup(e[1]);if(null!=n)return"number"==typeof n&&r===P.escape?String(n):r(n)},L.prototype.rawValue=function(e){return e[1]},L.prototype.getConfigTags=function(e){return d(e)?e:e&&"object"==typeof e?e.tags:void 0},L.prototype.getConfigEscape=function(e){return e&&"object"==typeof e&&!d(e)?e.escape:void 0};var P={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(e){M.templateCache=e},get templateCache(){return M.templateCache}},M=new L;P.clearCache=function(){return M.clearCache()},P.parse=function(e,t){return M.parse(e,t)},P.render=function(e,t,o,r){if("string"!=typeof e)throw new TypeError('Invalid template! Template should be a "string" but "'+(d(n=e)?"array":typeof n)+'" was given as the first argument for mustache#render(template, view, partials)');var n;return M.render(e,t,o,r)},P.escape=function(e){return String(e).replace(/[&<>"'`=\/]/g,(function(e){return A[e]}))},P.Scanner=E,P.Context=T,P.Writer=L;const V=P;class k{constructor(e,t){this.template=e,this.state=t,this.ast=V.parse(e)}getValue(){return void 0===this.value&&(this.value=V.render(this.template,this.state)),this.value}onChange(e){const t=[];for(const o of this.getUsedVariables().values())t.push(this.state.onVariableChange(o).subscribe((()=>{const t=V.render(this.template,this.state);t!==this.value&&(this.value=t,e(this.value))})));return{unsubscribe:()=>{for(const e of t)e.unsubscribe()}}}isPureString(){return 0===this.ast.length||1===this.ast.length&&"text"===this.ast[0][0]}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,t){for(const o of e){const e=o[0],r=o[1],n=o[4];["name","&","#","^"].includes(e)&&t.add(r),void 0!==n&&"string"!=typeof n&&this.recursiveGetUsedVariables(n,t)}}}async function U(){var e;const t=await u();for(const[o,r]of t.entries()){const t=null!==(e=r.properties)&&void 0!==e?e:[];for(const e of t){if("int"===e.type||"bool"===e.type||"object"===e.type||"string"!=typeof e.value)continue;const t=new k(e.value,WA.state);if(t.isPureString())continue;const r=t.getValue();j(o,e.name,r),t.onChange((t=>{j(o,e.name,t)}))}}}function j(e,t,o){WA.room.setProperty(e,t,o),"visible"===t&&(o?WA.room.showLayer(e):WA.room.hideLayer(e))}let G,O,R=0,I=0;function N(e){if(WA.state[e.name]){let t=e.properties.mustGetString("openLayer");for(const e of t.split("\n"))WA.room.showLayer(e);t=e.properties.mustGetString("closeLayer");for(const e of t.split("\n"))WA.room.hideLayer(e)}else{let t=e.properties.mustGetString("openLayer");for(const e of t.split("\n"))WA.room.hideLayer(e);t=e.properties.mustGetString("closeLayer");for(const e of t.split("\n"))WA.room.showLayer(e)}}function _(e){return e.map((e=>G.get(e))).filter((e=>"tilelayer"===(null==e?void 0:e.type)))}function D(e){const t=g(_(e)),o=32*((t.right-t.left)/2+t.left),r=32*((t.bottom-t.top)/2+t.top);return Math.sqrt(Math.pow(R-o,2)+Math.pow(I-r,2))}function q(e){WA.state.onVariableChange(e.name).subscribe((()=>{WA.state[e.name]?function(e){const t=e.properties.getString("openSound"),o=e.properties.getNumber("soundRadius");let r=1;if(o){const t=D(e.properties.mustGetString("openLayer").split("\n"));if(t>o)return;r=1-t/o}t&&WA.sound.loadSound(t).play({volume:r})}(e):function(e){const t=e.properties.getString("closeSound"),o=e.properties.getNumber("soundRadius");let r=1;if(o){const t=D(e.properties.mustGetString("closeLayer").split("\n"));if(t>o)return;r=1-t/o}t&&WA.sound.loadSound(t).play({volume:r})}(e),N(e)})),N(e)}function $(e,t,o,r){const n=e.name;let i,s,a=!1;const l=o.getString("tag");let c=!0;l&&!WA.player.tags.includes(l)&&(c=!1);const u=!!l;function p(){var e;i&&i.remove(),i=WA.ui.displayActionMessage({message:null!==(e=o.getString("closeTriggerMessage"))&&void 0!==e?e:"Press SPACE to close the door",callback:()=>{WA.state[t.name]=!1,h()}})}function h(){var e;i&&i.remove(),i=WA.ui.displayActionMessage({message:null!==(e=o.getString("openTriggerMessage"))&&void 0!==e?e:"Press SPACE to open the door",callback:()=>{WA.state[t.name]=!0,p()}})}function f(){s&&(WA.room.website.delete(s.name),s=void 0)}WA.room.onEnterLayer(n).subscribe((()=>{a=!0,o.getBoolean("autoOpen")&&c?WA.state[t.name]=!0:WA.state[t.name]||(!u||c)&&u||!o.getString("code")&&!o.getString("codeVariable")?c&&(WA.state[t.name]?p():h()):function(e){const o=g(_(t.properties.mustGetString("closeLayer").split("\n")));s=WA.room.website.create({name:"doorKeypad"+e,url:r+"/keypad.html#"+encodeURIComponent(e),position:{x:32*o.right,y:32*o.top,width:96,height:128},allowApi:!0})}(n)})),WA.room.onLeaveLayer(n).subscribe((()=>{a=!1,o.getBoolean("autoClose")&&(WA.state[t.name]=!1),i&&i.remove(),f()})),WA.state.onVariableChange(t.name).subscribe((()=>{a&&(o.getBoolean("autoClose")||!0!==WA.state[t.name]||p(),s&&!0===WA.state[t.name]&&f(),o.getBoolean("autoOpen")||!1!==WA.state[t.name]||h())}))}function z(e){void 0===WA.state[e.name]&&(WA.state[e.name]=0),WA.state.onVariableChange(e.name).subscribe((()=>{WA.state[e.name]&&function(e){const t=e.properties.mustGetString("bellSound"),o=e.properties.getNumber("soundRadius");let r=1;if(o){const t=Math.sqrt(Math.pow(e.x-R,2)+Math.pow(e.y-I,2));if(t>o)return;r=1-t/o}WA.sound.loadSound(t).play({volume:r})}(e)}))}function F(e,t,o){let r;const n=t.getString("bellPopup");WA.room.onEnterLayer(o).subscribe((()=>{var o;n?r=WA.ui.openPopup(n,"",[{label:null!==(o=t.getString("bellButtonText"))&&void 0!==o?o:"Ring",callback:()=>{WA.state[e]=WA.state[e]+1}}]):WA.state[e]=WA.state[e]+1})),WA.room.onLeaveLayer(o).subscribe((()=>{r&&(r.close(),r=void 0)}))}async function H(e){e=null!=e?e:n;const t=await a();G=await u();for(const e of t.values())e.properties.get("door")&&q(e),e.properties.get("bell")&&z(e);for(const o of G.values()){const n=new r(o.properties),i=n.getString("doorVariable");if(i&&"tilelayer"===o.type){const r=t.get(i);if(void 0===r)throw new Error('Cannot find variable "'+i+'" referred in the "doorVariable" property of layer "'+o.name+'"');$(o,r,n,e)}const s=n.getString("bellVariable");s&&F(s,n,o.name)}WA.player.onPlayerMove((e=>{R=e.x,I=e.y}))}function K(e,t){const o=e.getString("bindVariable");o&&function(e,t,o,r,n,i){i&&!WA.player.tags.includes(i)||(void 0!==o&&WA.room.onEnterLayer(t).subscribe((()=>{n||(WA.state[e]=o)})),void 0!==r&&WA.room.onLeaveLayer(t).subscribe((()=>{WA.state[e]=r})))}(o,t,e.get("enterValue"),e.get("leaveValue"),e.getString("triggerMessage"),e.getString("tag"))}function Z(e,t,o){let r;const n=o.getString("openConfigAdminTag");let i=!0;function a(){WA.nav.closeCoWebSite()}n&&!WA.player.tags.includes(n)&&(i=!1),WA.room.onEnterLayer(t).subscribe((()=>{const t=o.getString("openConfigTrigger");var n;i&&(t&&"onaction"===t?(r&&r.remove(),r=WA.ui.displayActionMessage({message:null!==(n=o.getString("openConfigTriggerMessage"))&&void 0!==n?n:"Press SPACE or touch here to configure",callback:()=>s(e)})):s(e))})),WA.room.onLeaveLayer(t).subscribe((()=>{r?(r.remove(),a()):a()}))}const J=[{lowerBound:0,uppperBound:.5,config:{width:250,height:390,scale:1}},{lowerBound:.5,uppperBound:.8,config:{width:224,height:350,scale:.9}},{lowerBound:.8,uppperBound:1.25,config:{width:132,height:211,scale:.53}},{lowerBound:1.25,uppperBound:2.28,config:{width:64,height:99,scale:.25}},{lowerBound:1.25,config:{width:39,height:63,scale:.16}}],Q=[{lowerBound:0,uppperBound:1,config:{width:427,height:270,scale:1}},{lowerBound:1,uppperBound:1.9,config:{width:300,height:188,scale:.7}},{lowerBound:1.9,uppperBound:3.5,config:{width:150,height:94,scale:.35}},{lowerBound:3.5,uppperBound:5,config:{width:93,height:58,scale:.21}},{lowerBound:4,config:{width:75,height:46,scale:.17}}];function X(){return WA.onInit().then((()=>{H().catch((e=>console.error(e))),async function(){const e=await u();for(const t of e.values())K(new r(t.properties),t.name)}().catch((e=>console.error(e))),async function(e){const t=await WA.room.getTiledMap();e=null!=e?e:n,O=await u();const o=t.layers.find((e=>"configuration"===e.name));if(o){const t=new r(o.properties).getString("tag");t&&!WA.player.tags.includes(t)||WA.ui.registerMenuCommand("Configure the room",(()=>{WA.nav.openCoWebSite(e+"/configuration.html",!0)}));for(const e of O.values()){const t=new r(e.properties),o=t.getString("openConfig");o&&"tilelayer"===e.type&&Z(o.split(","),e.name,t)}}}().catch((e=>console.error(e))),U().catch((e=>console.error(e))),async function(){var e;const t=WA.player.state.tutorialDone,o=/Mobi|Android/i.test(navigator.userAgent),r=await WA.room.getTiledMap(),i=await(null===(e=r.properties)||void 0===e?void 0:e.find((e=>"tutorial"===e.name))),s=i&&i.value;if(!t&&s){!function(e){let t={allow:"",name:"tutorial",url:n+"/tutorial.html",position:{height:224,width:407,x:16,y:-112},visible:!0,allowApi:!0,origin:"player",scale:.9};e&&(t={...t,position:{x:32,y:-225,height:390,width:250},scale:1}),WA.room.website.create(t)}(o);let e,t=await WA.player.getPosition();const r=await WA.room.website.get("tutorial"),i=()=>{const o=t.x+r.x+r.width>e.x+e.width,n=t.x+r.x<e.x,i=t.y+r.y+r.height>e.y+e.height,s=t.y+r.y<e.y;o?r.x=-r.width-24:n&&(r.x=24),i?r.y=-r.height:s&&(r.y=16)},s=e=>{r.width=e.width,r.height=e.height,r.scale=e.scale},a=e=>{const t=(o?J:Q).filter((t=>{if(t.lowerBound&&t.uppperBound)return t.lowerBound<e&&e<=t.uppperBound;if(t.lowerBound&&!t.uppperBound)return t.lowerBound<e;if(!t.lowerBound&&t.uppperBound)return e<=t.uppperBound;throw new Error(`Zoom level of: ${e} could not fit in any of the desktopConfig's ranges.`)}));s(t[0].config)},l=()=>{if(void 0===e)return;const t=e.zoom;a(t),i()};WA.player.onPlayerMove((e=>{t=e,l()})),WA.camera.onCameraUpdate().subscribe((t=>{e=t,l()})),WA.player.state.tutorialDone=!0}}().catch((e=>console.error(e)))})).catch((e=>console.error(e)))}}},t={};function o(r){var n=t[r];if(void 0!==n)return n.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,o),i.exports}o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{const e=o(910);let t;console.log("Script started successfully");const r=["Nebulae","Equinox","Pulsar","Lionel"];function n(){void 0!==t&&(t.close(),t=void 0)}WA.onInit().then((()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags),WA.chat.sendChatMessage("Hello world","Mr Robot");for(const e of r)WA.room.onEnterLayer(e+"OfficeTrigger").subscribe((()=>{t=WA.ui.openPopup(e+"Title",`Welcome to ${e} office`,[])})),WA.room.onLeaveLayer(e+"OfficeTrigger").subscribe(n);(0,e.bootstrapExtra)().then((()=>{console.log("Scripting API Extra ready")})).catch((e=>console.error(e)))})).catch((e=>console.error(e)))})()})();
//# sourceMappingURL=script.js.map