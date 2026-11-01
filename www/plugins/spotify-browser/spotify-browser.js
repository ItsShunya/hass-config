(()=>{var di=new Set;function B(a,t){di.has(a)||(di.add(a),console.warn(`[SpotifyBrowser] config: ${t}`))}function Ss(a,t){let e=Array.from({length:t.length+1},(i,s)=>s);for(let i=1;i<=a.length;i++){let s=[i];for(let r=1;r<=t.length;r++)s[r]=Math.min(e[r]+1,s[r-1]+1,e[r-1]+(a[i-1]===t[r-1]?0:1));e=s}return e[t.length]}function Cs(a,t){let e=null,i=1/0;for(let s of t){let r=Ss(a.toLowerCase(),s.toLowerCase());r<i&&(i=r,e=s)}return i<=Math.max(2,Math.floor(a.length/4))?e:null}var hi={entity_id:"entity",spotify_accounts:"accounts",custom_hash:"browser.hash",auto_close:"browser.auto_close",autoclose:"browser.auto_close",auto_close_seconds:"browser.auto_close",home_on_exit:"browser.home_on_exit",homeonexit:"browser.home_on_exit",cache_size:"browser.cache_size",debug:"browser.debug",performance:"appearance.performance",perf:"appearance.performance",animations:"appearance.animations",desktop_style:"appearance.desktop",homescreen:"home",home_order:"home.sort",madeforyou:"home.pinned.items",desktop_madeforyou_pills:null,device_playback:"devices",volume:"devices.volume",external_providers:"integrations",storage_sensor:"storage.sensor",storage_event:"storage.event",storage_script:"storage.script",close_on_disconnect:null,closeondisconnect:null,advanced:null},Ps=["type","view_layout","grid_options","visibility","card_mod"];function zt(a,t,e){if(!(!a||typeof a!="object"||Array.isArray(a)))for(let i of Object.keys(a)){if(t.includes(i))continue;let s=e?`${e}.${i}`:i;if(!e&&i in hi){let n=hi[i];B(s,n?`"${i}" was renamed in v2 \u2014 use "${n}" (see README migration table). Ignored.`:`"${i}" was removed in v2 and is ignored (see README migration table).`);continue}let r=Cs(i,t);B(s,`unknown option "${s}"${r?` \u2014 did you mean "${r}"?`:""}. Ignored.`)}}var A=a=>a===!0,Dt=a=>t=>Number.isFinite(Number(t))?Number(t):a,E=a=>a==null?null:String(a),Mt=(a,t)=>(e,i)=>{let s=String(e).toLowerCase();return a.includes(s)?s:(B(i,`"${i}: ${e}" is not one of ${a.join("|")} \u2014 using "${t}".`),t)},R=a=>a==null?null:typeof a=="number"?`${a}px`:typeof a=="string"&&!isNaN(a)?`${a}px`:String(a),fi=a=>{let t=String(a);return t.startsWith("#")?t:`#${t}`},Ts=a=>{if(!a)return null;let t=String(a);return t.includes(".")?t:`script.${t}`},me=a=>(t,e)=>Array.isArray(t)?t.filter(i=>i&&typeof i=="object").map((i,s)=>{zt(i,Object.keys(a),`${e}[${s}]`);let r={};for(let[n,o]of Object.entries(a))r[n]=i[n]===void 0?o===A?!1:null:o(i[n],`${e}[${s}].${n}`);return r}):(B(e,`"${e}" must be a list. Ignored.`),[]),ve={pinned:"pinned",recently_played:"recent",favourite_playlists:"favorites",followed_artists:"artists",favourite_albums:"albums"},As=Object.values(ve),Es=(a,t)=>{if(!Array.isArray(a)){B(t,`"${t}" must be a list of sections. Using default order.`);return}let e=[];for(let i of a){let s=String(i).toLowerCase();if(s==="made_for_you"||s==="madeforyou")continue;let r=ve[s]||(As.includes(s)?s:null);r?e.push(r):B(`${t}.${i}`,`"${t}" has unknown section "${i}" \u2014 expected one of ${Object.keys(ve).join(", ")}. Dropped.`)}return e.length?e:void 0},be=(a,t)=>{if(!Array.isArray(a))return B(t,`"${t}" must be a list. Ignored.`),[];let e=[],i=(s,r={})=>{s&&e.push({id:String(s),type:"playlist",...r})};return a.forEach((s,r)=>{if(typeof s=="string")i(s);else if(!s||typeof s!="object")B(`${t}[${r}]`,`"${t}[${r}]" is not a valid item. Ignored.`);else if(!s.likedsongs)if(Array.isArray(s.playlists))s.playlists.forEach(n=>i(n));else if(Array.isArray(s.playlists_recommended))s.playlists_recommended.forEach(n=>{n&&(typeof n=="string"?i(n,{recommended:!0}):i(n.id,{...n.title?{title:String(n.title)}:{},recommended:!0}))});else if(s.id){let n={id:String(s.id),type:s.type?String(s.type).toLowerCase():"playlist"};(s.title||s.name)&&(n.title=String(s.title||s.name)),s.recommended===!0&&(n.recommended=!0),e.push(n)}else B(`${t}[${r}]`,`"${t}[${r}]" needs an id. Ignored.`)}),e},Is=a=>JSON.parse(JSON.stringify(a));function gi(a,t,e){let i=Is(t.defaults),s=()=>t.post?t.post(i,a):i;if(a===void 0)return s();if(a===!0)return"enabled"in i&&(i.enabled=!0),s();if(a===!1)return"enabled"in i?i.enabled=!1:t.onFalse&&t.onFalse(i),s();if(typeof a!="object"||Array.isArray(a)){if(!t.primary)return B(e,`"${e}" expects an object \u2014 using defaults.`),s();let r=t.fields[t.primary],n=r(a,`${e}.${t.primary}`);return n!==void 0&&(i[t.primary]=n),"enabled"in i&&(i.enabled=!0),s()}zt(a,Object.keys(t.fields),e),"enabled"in i&&a.enabled===void 0&&(i.enabled=!0);for(let[r,n]of Object.entries(t.fields)){if(a[r]===void 0)continue;let o=n.fields?gi(a[r],n,`${e}.${r}`):n(a[r],`${e}.${r}`);o!==void 0&&(i[r]=o)}return s()}var pi=a=>({defaults:{enabled:a,timeout:0},primary:"timeout",fields:{enabled:A,timeout:Dt(0)}});function Ms(){try{let a=navigator.deviceMemory,t=navigator.hardwareConcurrency;if(typeof a=="number"&&a<=4||typeof t=="number"&&t<=4)return!0}catch{}return!1}var ui={browser:{defaults:{hash:"#spotify-browser",auto_close:{enabled:!1,timeout:0},home_on_exit:{enabled:!0,timeout:0},cache_size:10,debug:!1},fields:{hash:fi,auto_close:{...pi(!1),post:a=>({enabled:a.enabled&&a.timeout>0,timeout:a.timeout})},home_on_exit:pi(!0),cache_size:Dt(10),debug:A}},appearance:{defaults:{performance:{mode:"auto",lite:!1},animations:{page_transition:"fade",browser_open:"fade",blur:!0},desktop:{mode:"default",width:"85vw",height:"85vh",fullscreen:!1,margin_top:"24px",margin_bottom:"24px",margin_left:"24px",margin_right:"24px"}},fields:{performance:{defaults:{mode:"auto",lite:!1},primary:"mode",fields:{mode:Mt(["auto","high","low"],"auto")},post:a=>({mode:a.mode,lite:a.mode==="low"?!0:a.mode==="high"?!1:Ms()})},animations:{defaults:{page_transition:"fade",browser_open:"fade",blur:!0},onFalse:a=>{a.page_transition="none",a.browser_open="none",a.blur=!1},fields:{page_transition:E,browser_open:E,blur:A}},desktop:{defaults:{mode:"default",width:"85vw",height:"85vh",fullscreen:!1,margin_top:"24px",margin_bottom:"24px",margin_left:"24px",margin_right:"24px"},fields:{mode:Mt(["default","fixed","fullscreen"],"default"),width:R,height:R,fullscreen:A,margin:R,margin_top:R,margin_bottom:R,margin_left:R,margin_right:R},post:(a,t)=>{let e=t&&typeof t=="object"?t:{};e.mode===void 0&&(e.width!==void 0||e.height!==void 0)&&(a.mode="fixed");let i=e.margin!==void 0?R(e.margin):"24px";for(let s of["top","bottom","left","right"])a[`margin_${s}`]=e[`margin_${s}`]!==void 0?R(e[`margin_${s}`]):i;return delete a.margin,a}}}},home:{defaults:{sort:["pinned","recent","favorites","artists","albums"],pinned:{enabled:!1,scope:"shared",items:[]},made_for_you:[]},fields:{sort:Es,pinned:{defaults:{enabled:!1,scope:"shared",items:[]},primary:"items",fields:{enabled:A,scope:Mt(["shared","account"],"shared"),items:be}},made_for_you:{defaults:{content:[]},primary:"content",fields:{content:be,pills:()=>{}},post:a=>a.content}},post:(a,t)=>{if(t&&typeof t=="object"&&t.made_for_you!==void 0){B("home.made_for_you",'"home.made_for_you" was folded into "home.pinned.items" in v3 \u2014 its items now show in the pinned row (the "pills" option is gone).');let e=new Set(a.pinned.items.map(i=>i.id));for(let i of a.made_for_you)e.has(i.id)||a.pinned.items.push(i);a.pinned.items.length&&(a.pinned.enabled=!0)}return delete a.made_for_you,a}},devices:{defaults:{default:null,icons:[],volume:{fallback:25,rules:[],rate_control:!0,optimistic:!0}},fields:{default:E,icons:me({name:E,id:E,icon:E}),volume:{defaults:{fallback:25,rules:[],rate_control:!0,optimistic:!0},primary:"fallback",fields:{fallback:Dt(25),rules:me({start:E,end:E,level:Dt(0)}),rate_control:a=>a===!0,optimistic:a=>a===!0}}}},queue:{defaults:{open_on_desktop:!1,miniplayer:{enabled:!0,shuffle:!0,previous:!0,next:!0,like:!0,volume:!0,device:!0}},fields:{open_on_desktop:A,miniplayer:{defaults:{enabled:!0,shuffle:!0,previous:!0,next:!0,like:!0,volume:!0,device:!0},fields:{enabled:A,shuffle:A,previous:A,next:A,like:A,volume:A,device:A}}}},sonos:{defaults:{enabled:!1,launch_mode:"local",prefer_sonos:!1,debug:!1,device_map:[]},fields:{enabled:A,launch_mode:Mt(["local","spotifyplus"],"local"),prefer_sonos:A,debug:A,device_map:me({spotify:E,entity:E,is_sonos:A})}},storage:{defaults:{sensor:"sensor.spotify_browser_data",event:"spotify_browser_store_data",script:null},fields:{sensor:E,event:E,script:Ts}},card:{defaults:{title:"Spotify Browser",label:"launch",icon:"mdi:spotify",color:"#1DB954"},fields:{title:E,label:E,icon:E,color:E}},integrations:{defaults:{lastfm:{api_key:null}},fields:{lastfm:{defaults:{api_key:null},fields:{api_key:E}}}}},Lt=class{static parse(t){let e=t&&typeof t=="object"?t:{};zt(e,["entity","accounts",...Object.keys(ui),...Ps],"");let i=(Array.isArray(e.accounts)?e.accounts:[]).filter(n=>n&&typeof n=="object").map((n,o)=>{zt(n,["entity","name","image","hash","default","pinned"],`accounts[${o}]`);let c=n.pinned&&typeof n.pinned=="object"&&!Array.isArray(n.pinned)?n.pinned.items:n.pinned;return{entity:n.entity||null,name:n.name||null,image:n.image||null,hash:n.hash?fi(n.hash):null,is_default:n.default===!0,pinned:c===void 0?[]:be(c,`accounts[${o}].pinned`)}}),s=i.find(n=>n.is_default)?.entity||i[0]?.entity||e.entity;if(!s)throw new Error("SpotifyBrowser: No entity found. Configure 'entity' or 'accounts'.");let r={entity:s,accounts:i};for(let[n,o]of Object.entries(ui))r[n]=gi(e[n],o,n);return r.appearance.performance.lite&&(r.appearance.animations.blur=!1),r}};var Bt=globalThis,Se=Bt.ShadowRoot&&(Bt.ShadyCSS===void 0||Bt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ce=Symbol(),mi=new WeakMap,Rt=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Ce)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.i,e=this.t;if(Se&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=mi.get(e)),t===void 0&&((this.i=t=new CSSStyleSheet).replaceSync(this.cssText),i&&mi.set(e,t))}return t}toString(){return this.cssText}},Ds=a=>new Rt(typeof a=="string"?a:a+"",void 0,Ce),_=(a,...t)=>{let e=a.length===1?a[0]:t.reduce(((i,s,r)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+a[r+1]),a[0]);return new Rt(e,a,Ce)},zs=(a,t)=>{if(Se)a.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(let e of t){let i=document.createElement("style"),s=Bt.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,a.appendChild(i)}},vi=Se?a=>a:a=>a instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return Ds(e)})(a):a,{is:Ls,defineProperty:Bs,getOwnPropertyDescriptor:Rs,getOwnPropertyNames:Vs,getOwnPropertySymbols:qs,getPrototypeOf:Os}=Object,Qt=globalThis,bi=Qt.trustedTypes,Hs=bi?bi.emptyScript:"",js=Qt.reactiveElementPolyfillSupport,gt=(a,t)=>a,we={toAttribute(a,t){switch(t){case Boolean:a=a?Hs:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,t){let e=a;switch(t){case Boolean:e=a!==null;break;case Number:e=a===null?null:Number(a);break;case Object:case Array:try{e=JSON.parse(a)}catch{e=null}}return e}},Di=(a,t)=>!Ls(a,t),yi={attribute:!0,type:String,converter:we,reflect:!1,useDefault:!1,hasChanged:Di};Symbol.metadata??=Symbol("metadata"),Qt.litPropertyMetadata??=new WeakMap;var F=class extends HTMLElement{static addInitializer(t){this.o(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this.u&&[...this.u.keys()]}static createProperty(t,e=yi){if(e.state&&(e.attribute=!1),this.o(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Bs(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:r}=Rs(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:s,set(n){let o=s?.call(this);r?.call(this,n),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??yi}static o(){if(this.hasOwnProperty(gt("elementProperties")))return;let t=Os(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(gt("finalized")))return;if(this.finalized=!0,this.o(),this.hasOwnProperty(gt("properties"))){let e=this.properties,i=[...Vs(e),...qs(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this.u=new Map;for(let[e,i]of this.elementProperties){let s=this.p(e,i);s!==void 0&&this.u.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(vi(s))}else t!==void 0&&e.push(vi(t));return e}static p(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this.v=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.m=null,this._()}_(){this.S=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this.$(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this.P??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this.P?.delete(t)}$(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this.v=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return zs(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this.P?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this.P?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}C(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor.p(t,i);if(s!==void 0&&i.reflect===!0){let r=(i.converter?.toAttribute!==void 0?i.converter:we).toAttribute(e,i.type);this.m=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this.m=null}}_$AK(t,e){let i=this.constructor,s=i.u.get(t);if(s!==void 0&&this.m!==s){let r=i.getPropertyOptions(s),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:we;this.m=s;let o=n.fromAttribute(e,r.type);this[s]=o??this.T?.get(s)??o,this.m=null}}requestUpdate(t,e,i){if(t!==void 0){let s=this.constructor,r=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??Di)(r,e)||i.useDefault&&i.reflect&&r===this.T?.get(t)&&!this.hasAttribute(s.p(t,i))))return;this.M(t,e,i)}this.isUpdatePending===!1&&(this.S=this.k())}M(t,e,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this.T??=new Map).has(t)&&(this.T.set(t,n??e??this[t]),r!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this.m!==t&&(this.A??=new Set).add(t))}async k(){this.isUpdatePending=!0;try{await this.S}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this.v){for(let[s,r]of this.v)this[s]=r;this.v=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,r]of i){let{wrapped:n}=r,o=this[s];n!==!0||this._$AL.has(s)||o===void 0||this.M(s,void 0,r,o)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this.P?.forEach((i=>i.hostUpdate?.())),this.update(e)):this.U()}catch(i){throw t=!1,this.U(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this.P?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}U(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.S}shouldUpdate(t){return!0}update(t){this.A&&=this.A.forEach((e=>this.C(e,this[e]))),this.U()}updated(t){}firstUpdated(t){}};F.elementStyles=[],F.shadowRootOptions={mode:"open"},F[gt("elementProperties")]=new Map,F[gt("finalized")]=new Map,js?.({ReactiveElement:F}),(Qt.reactiveElementVersions??=[]).push("2.1.1");var Pe=globalThis,Vt=Pe.trustedTypes,_i=Vt?Vt.createPolicy("lit-html",{createHTML:a=>a}):void 0,Te="$lit$",V=`lit$${Math.random().toFixed(9).slice(2)}$`,Ae="?"+V,Us=`<${Ae}>`,J=document,vt=()=>J.createComment(""),bt=a=>a===null||typeof a!="object"&&typeof a!="function",Ee=Array.isArray,zi=a=>Ee(a)||typeof a?.[Symbol.iterator]=="function",ye=`[ 	
\f\r]`,ft=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,xi=/-->/g,wi=/>/g,K=RegExp(`>|${ye}(?:([^\\s"'>=/]+)(${ye}*=${ye}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ki=/'/g,$i=/"/g,Li=/^(?:script|style|textarea|title)$/i,Ie=a=>(t,...e)=>({_$litType$:a,strings:t,values:e}),l=Ie(1),I=Ie(2),$r=Ie(3),P=Symbol.for("lit-noChange"),C=Symbol.for("lit-nothing"),Si=new WeakMap,X=J.createTreeWalker(J,129);function Bi(a,t){if(!Ee(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return _i!==void 0?_i.createHTML(t):t}var Ri=(a,t)=>{let e=a.length-1,i=[],s,r=t===2?"<svg>":t===3?"<math>":"",n=ft;for(let o=0;o<e;o++){let c=a[o],d,p,u=-1,g=0;for(;g<c.length&&(n.lastIndex=g,p=n.exec(c),p!==null);)g=n.lastIndex,n===ft?p[1]==="!--"?n=xi:p[1]!==void 0?n=wi:p[2]!==void 0?(Li.test(p[2])&&(s=RegExp("</"+p[2],"g")),n=K):p[3]!==void 0&&(n=K):n===K?p[0]===">"?(n=s??ft,u=-1):p[1]===void 0?u=-2:(u=n.lastIndex-p[2].length,d=p[1],n=p[3]===void 0?K:p[3]==='"'?$i:ki):n===$i||n===ki?n=K:n===xi||n===wi?n=ft:(n=K,s=void 0);let f=n===K&&a[o+1].startsWith("/>")?" ":"";r+=n===ft?c+Us:u>=0?(i.push(d),c.slice(0,u)+Te+c.slice(u)+V+f):c+V+(u===-2?o:f)}return[Bi(a,r+(a[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},yt=class a{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0,o=t.length-1,c=this.parts,[d,p]=Ri(t,e);if(this.el=a.createElement(d,i),X.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=X.nextNode())!==null&&c.length<o;){if(s.nodeType===1){if(s.hasAttributes())for(let u of s.getAttributeNames())if(u.endsWith(Te)){let g=p[n++],f=s.getAttribute(u).split(V),h=/([.?@])?(.*)/.exec(g);c.push({type:1,index:r,name:h[2],strings:f,ctor:h[1]==="."?Ot:h[1]==="?"?Ht:h[1]==="@"?jt:tt}),s.removeAttribute(u)}else u.startsWith(V)&&(c.push({type:6,index:r}),s.removeAttribute(u));if(Li.test(s.tagName)){let u=s.textContent.split(V),g=u.length-1;if(g>0){s.textContent=Vt?Vt.emptyScript:"";for(let f=0;f<g;f++)s.append(u[f],vt()),X.nextNode(),c.push({type:2,index:++r});s.append(u[g],vt())}}}else if(s.nodeType===8)if(s.data===Ae)c.push({type:2,index:r});else{let u=-1;for(;(u=s.data.indexOf(V,u+1))!==-1;)c.push({type:7,index:r}),u+=V.length-1}r++}}static createElement(t,e){let i=J.createElement("template");return i.innerHTML=t,i}};function Z(a,t,e=a,i){if(t===P)return t;let s=i!==void 0?e.N?.[i]:e.O,r=bt(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(a),s._$AT(a,e,i)),i!==void 0?(e.N??=[])[i]=s:e.O=s),s!==void 0&&(t=Z(a,s._$AS(a,t.values),s,i)),t}var qt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}R(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??J).importNode(e,!0);X.currentNode=s;let r=X.nextNode(),n=0,o=0,c=i[0];for(;c!==void 0;){if(n===c.index){let d;c.type===2?d=new Yt(r,r.nextSibling,this,t):c.type===1?d=new c.ctor(r,c.name,c.strings,this,t):c.type===6&&(d=new Ut(r,this,t)),this._$AV.push(d),c=i[++o]}n!==c?.index&&(r=X.nextNode(),n++)}return X.currentNode=J,s}V(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},Yt=class Vi{get _$AU(){return this._$AM?._$AU??this.D}constructor(t,e,i,s){this.type=2,this._$AH=C,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this.D=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),bt(t)?t===C||t==null||t===""?(this._$AH!==C&&this._$AR(),this._$AH=C):t!==this._$AH&&t!==P&&this.L(t):t._$litType$!==void 0?this.j(t):t.nodeType!==void 0?this.I(t):zi(t)?this.H(t):this.L(t)}B(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}I(t){this._$AH!==t&&(this._$AR(),this._$AH=this.B(t))}L(t){this._$AH!==C&&bt(this._$AH)?this._$AA.nextSibling.data=t:this.I(J.createTextNode(t)),this._$AH=t}j(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=yt.createElement(Bi(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.V(e);else{let r=new qt(s,this),n=r.R(this.options);r.V(e),this.I(n),this._$AH=r}}_$AC(t){let e=Si.get(t.strings);return e===void 0&&Si.set(t.strings,e=new yt(t)),e}H(t){Ee(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let r of t)s===e.length?e.push(i=new Vi(this.B(vt()),this.B(vt()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=t.nextSibling;t.remove(),t=i}}setConnected(t){this._$AM===void 0&&(this.D=t,this._$AP?.(t))}},tt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=C,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=C}_$AI(t,e=this,i,s){let r=this.strings,n=!1;if(r===void 0)t=Z(this,t,e,0),n=!bt(t)||t!==this._$AH&&t!==P,n&&(this._$AH=t);else{let o=t,c,d;for(t=r[0],c=0;c<r.length-1;c++)d=Z(this,o[i+c],e,c),d===P&&(d=this._$AH[c]),n||=!bt(d)||d!==this._$AH[c],d===C?t=C:t!==C&&(t+=(d??"")+r[c+1]),this._$AH[c]=d}n&&!s&&this.W(t)}W(t){t===C?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ot=class extends tt{constructor(){super(...arguments),this.type=3}W(t){this.element[this.name]=t===C?void 0:t}},Ht=class extends tt{constructor(){super(...arguments),this.type=4}W(t){this.element.toggleAttribute(this.name,!!t&&t!==C)}},jt=class extends tt{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??C)===P)return;let i=this._$AH,s=t===C&&i!==C||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==C&&(i===C||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ut=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}},Fs={q:Te,J:V,Z:Ae,F:1,G:Ri,K:qt,X:zi,Y:Z,tt:Yt,st:tt,it:Ht,et:jt,ht:Ot,ot:Ut},Ns=Pe.litHtmlPolyfillSupport;Ns?.(yt,Yt),(Pe.litHtmlVersions??=[]).push("3.3.1");var qi=(a,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let r=e?.renderBefore??null;i._$litPart$=s=new Yt(t.insertBefore(vt(),r),r,void 0,e??{})}return s._$AI(a),s},Me=globalThis;var b=class extends F{constructor(){super(...arguments),this.renderOptions={host:this},this.rt=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.rt=qi(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.rt?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.rt?.setConnected(!1)}render(){return P}};b._$litElement$=!0,b.finalized=!0,Me.litElementHydrateSupport?.({LitElement:b});var Gs=Me.litElementPolyfillSupport;Gs?.({LitElement:b});(Me.litElementVersions??=[]).push("4.2.1");var{tt:Ws}=Fs,Qs=a=>a===null||typeof a!="object"&&typeof a!="function";var Ci=(a,t)=>t===void 0?a?._$litType$!==void 0:a?._$litType$===t,Ys=a=>a?._$litType$?.h!=null;var Oi=a=>a.strings===void 0,Pi=()=>document.createComment(""),N=(a,t,e)=>{let i=a._$AA.parentNode,s=t===void 0?a._$AB:t._$AA;if(e===void 0){let r=i.insertBefore(Pi(),s),n=i.insertBefore(Pi(),s);e=new Ws(r,n,a,a.options)}else{let r=e._$AB.nextSibling,n=e._$AM,o=n!==a;if(o){let c;e._$AQ?.(a),e._$AM=a,e._$AP!==void 0&&(c=a._$AU)!==n._$AU&&e._$AP(c)}if(r!==s||o){let c=e._$AA;for(;c!==r;){let d=c.nextSibling;i.insertBefore(c,s),c=d}}}return e},U=(a,t,e=a)=>(a._$AI(t,e),a),Ks={},_t=(a,t=Ks)=>a._$AH=t,ke=a=>a._$AH,_e=a=>{a._$AR(),a._$AA.remove()},Hi=a=>{a._$AR()};var z=a=>(...t)=>({_$litDirective$:a,values:t}),L=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this.nt=t,this._$AM=e,this.ct=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var mt=(a,t)=>{let e=a._$AN;if(e===void 0)return!1;for(let i of e)i._$AO?.(t,!1),mt(i,t);return!0},Ft=a=>{let t,e;do{if((t=a._$AM)===void 0)break;e=t._$AN,e.delete(a),a=t}while(e?.size===0)},ji=a=>{for(let t;t=a._$AM;a=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(a))break;e.add(a),Zs(t)}};function Xs(a){this._$AN!==void 0?(Ft(this),this._$AM=a,ji(this)):this._$AM=a}function Js(a,t=!1,e=0){let i=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(t)if(Array.isArray(i))for(let r=e;r<i.length;r++)mt(i[r],!1),Ft(i[r]);else i!=null&&(mt(i,!1),Ft(i));else mt(this,a)}var Zs=a=>{a.type==2&&(a._$AP??=Js,a._$AQ??=Xs)},xt=class extends L{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),ji(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(mt(this,t),Ft(this))}setValue(t){if(Oi(this.nt))this.nt._$AI(t,this);else{let e=[...this.nt._$AH];e[this.ct]=t,this.nt._$AI(e,this,0)}}disconnected(){}reconnected(){}};var Nt=class{constructor(t){this.lt=t}disconnect(){this.lt=void 0}reconnect(t){this.lt=t}deref(){return this.lt}},Gt=class{constructor(){this.ut=void 0,this.dt=void 0}get(){return this.ut}pause(){this.ut??=new Promise((t=>this.dt=t))}resume(){this.dt?.(),this.ut=this.dt=void 0}};var Wt=class extends xt{constructor(){super(...arguments),this.ft=new Nt(this),this.vt=new Gt}render(t,e){return P}update(t,[e,i]){if(this.isConnected||this.disconnected(),e===this.yt)return P;this.yt=e;let s=0,{ft:r,vt:n}=this;return(async(o,c)=>{for await(let d of o)if(await c(d)===!1)return})(e,(async o=>{for(;n.get();)await n.get();let c=r.deref();if(c!==void 0){if(c.yt!==e)return!1;i!==void 0&&(o=i(o,s)),c.commitValue(o,s),s++}return!0})),P}commitValue(t,e){this.setValue(t)}disconnected(){this.ft.disconnect(),this.vt.pause()}reconnected(){this.ft.reconnect(this),this.vt.resume()}},Sr=z(Wt),Cr=z(class extends Wt{constructor(a){if(super(a),a.type!==2)throw Error("asyncAppend can only be used in child expressions")}update(a,t){return this.rt=a,super.update(a,t)}commitValue(a,t){t===0&&Hi(this.rt);let e=N(this.rt);U(e,a)}}),Ti=a=>Ys(a)?a._$litType$.h:a.strings,Pr=z(class extends L{constructor(a){super(a),this.bt=new WeakMap}render(a){return[a]}update(a,[t]){let e=Ci(this.gt)?Ti(this.gt):null,i=Ci(t)?Ti(t):null;if(e!==null&&(i===null||e!==i)){let s=ke(a).pop(),r=this.bt.get(e);if(r===void 0){let n=document.createDocumentFragment();r=qi(C,n),r.setConnected(!1),this.bt.set(e,r)}_t(r,[s]),N(r,void 0,s)}if(i!==null){if(e===null||e!==i){let s=this.bt.get(i);if(s!==void 0){let r=ke(s).pop();Hi(a),N(a,void 0,r),_t(a,[r])}}this.gt=t}else this.gt=void 0;return this.render(t)}});var Tr=z(class extends L{constructor(a){if(super(a),a.type!==1||a.name!=="class"||a.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(a){return" "+Object.keys(a).filter((t=>a[t])).join(" ")+" "}update(a,[t]){if(this.wt===void 0){this.wt=new Set,a.strings!==void 0&&(this._t=new Set(a.strings.join(" ").split(/\s/).filter((i=>i!==""))));for(let i in t)t[i]&&!this._t?.has(i)&&this.wt.add(i);return this.render(t)}let e=a.element.classList;for(let i of this.wt)i in t||(e.remove(i),this.wt.delete(i));for(let i in t){let s=!!t[i];s===this.wt.has(i)||this._t?.has(i)||(s?(e.add(i),this.wt.add(i)):(e.remove(i),this.wt.delete(i)))}return P}}),tr={},Ar=z(class extends L{constructor(){super(...arguments),this.St=tr}render(a,t){return t()}update(a,[t,e]){if(Array.isArray(t)){if(Array.isArray(this.St)&&this.St.length===t.length&&t.every(((i,s)=>i===this.St[s])))return P}else if(this.St===t)return P;return this.St=Array.isArray(t)?Array.from(t):t,this.render(t,e)}});var Er=z(class extends L{constructor(){super(...arguments),this.key=C}render(a,t){return this.key=a,t}update(a,[t,e]){return t!==this.key&&(_t(a),this.key=t),e}}),Ir=z(class extends L{constructor(a){if(super(a),a.type!==3&&a.type!==1&&a.type!==4)throw Error("The `live` directive is not allowed on child or event bindings");if(!Oi(a))throw Error("`live` bindings can only contain a single expression")}render(a){return a}update(a,[t]){if(t===P||t===C)return t;let e=a.element,i=a.name;if(a.type===3){if(t===e[i])return P}else if(a.type===4){if(!!t===e.hasAttribute(i))return P}else if(a.type===1&&e.getAttribute(i)===t+"")return P;return _t(a),t}});var xe=new WeakMap,Mr=z(class extends xt{render(a){return C}update(a,[t]){let e=t!==this.lt;return e&&this.lt!==void 0&&this.$t(void 0),(e||this.Tt!==this.xt)&&(this.lt=t,this.Et=a.options?.host,this.$t(this.xt=a.element)),C}$t(a){if(this.isConnected||(a=void 0),typeof this.lt=="function"){let t=this.Et??globalThis,e=xe.get(t);e===void 0&&(e=new WeakMap,xe.set(t,e)),e.get(this.lt)!==void 0&&this.lt.call(this.Et,void 0),e.set(this.lt,a),a!==void 0&&this.lt.call(this.Et,a)}else this.lt.value=a}get Tt(){return typeof this.lt=="function"?xe.get(this.Et??globalThis)?.get(this.lt):this.lt?.value}disconnected(){this.Tt===this.xt&&this.$t(void 0)}reconnected(){this.$t(this.xt)}}),Ai=(a,t,e)=>{let i=new Map;for(let s=t;s<=e;s++)i.set(a[s],s);return i},De=z(class extends L{constructor(a){if(super(a),a.type!==2)throw Error("repeat() can only be used in text expressions")}Ct(a,t,e){let i;e===void 0?e=t:t!==void 0&&(i=t);let s=[],r=[],n=0;for(let o of a)s[n]=i?i(o,n):n,r[n]=e(o,n),n++;return{values:r,keys:s}}render(a,t,e){return this.Ct(a,t,e).values}update(a,[t,e,i]){let s=ke(a),{values:r,keys:n}=this.Ct(t,e,i);if(!Array.isArray(s))return this.Pt=n,r;let o=this.Pt??=[],c=[],d,p,u=0,g=s.length-1,f=0,h=r.length-1;for(;u<=g&&f<=h;)if(s[u]===null)u++;else if(s[g]===null)g--;else if(o[u]===n[f])c[f]=U(s[u],r[f]),u++,f++;else if(o[g]===n[h])c[h]=U(s[g],r[h]),g--,h--;else if(o[u]===n[h])c[h]=U(s[u],r[h]),N(a,c[h+1],s[u]),u++,h--;else if(o[g]===n[f])c[f]=U(s[g],r[f]),N(a,s[u],s[g]),g--,f++;else if(d===void 0&&(d=Ai(n,f,h),p=Ai(o,u,g)),d.has(o[u]))if(d.has(o[g])){let m=p.get(n[f]),x=m!==void 0?s[m]:null;if(x===null){let v=N(a,s[u]);U(v,r[f]),c[f]=v}else c[f]=U(x,r[f]),N(a,s[u],x),s[m]=null;f++}else _e(s[g]),g--;else _e(s[u]),u++;for(;f<=h;){let m=N(a,c[h+1]);U(m,r[f]),c[f++]=m}for(;u<=g;){let m=s[u++];m!==null&&_e(m)}return this.Pt=n,_t(a,c),P}}),Ui="important",er=" !"+Ui,Dr=z(class extends L{constructor(a){if(super(a),a.type!==1||a.name!=="style"||a.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(a){return Object.keys(a).reduce(((t,e)=>{let i=a[e];return i==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`}),"")}update(a,[t]){let{style:e}=a.element;if(this.Mt===void 0)return this.Mt=new Set(Object.keys(t)),this.render(t);for(let i of this.Mt)t[i]==null&&(this.Mt.delete(i),i.includes("-")?e.removeProperty(i):e[i]=null);for(let i in t){let s=t[i];if(s!=null){this.Mt.add(i);let r=typeof s=="string"&&s.endsWith(er);i.includes("-")||r?e.setProperty(i,r?s.slice(0,-11):s,r?Ui:""):e[i]=s}}return P}}),zr=z(class extends L{constructor(a){if(super(a),a.type!==2)throw Error("templateContent can only be used in child bindings")}render(a){return this.At===a?P:(this.At=a,document.importNode(a.content,!0))}}),nt=class extends L{constructor(t){if(super(t),this.gt=C,t.type!==2)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===C||t==null)return this.kt=void 0,this.gt=t;if(t===P)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.gt)return this.kt;this.gt=t;let e=[t];return e.raw=e,this.kt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};nt.directiveName="unsafeHTML",nt.resultType=1;var Lr=z(nt);var wt=class extends nt{};wt.directiveName="unsafeSVG",wt.resultType=2;var Br=z(wt),Ei=a=>!Qs(a)&&typeof a.then=="function",Ii=1073741823;var $e=class extends xt{constructor(){super(...arguments),this.Ot=Ii,this.Ut=[],this.ft=new Nt(this),this.vt=new Gt}render(...t){return t.find((e=>!Ei(e)))??P}update(t,e){let i=this.Ut,s=i.length;this.Ut=e;let r=this.ft,n=this.vt;this.isConnected||this.disconnected();for(let o=0;o<e.length&&!(o>this.Ot);o++){let c=e[o];if(!Ei(c))return this.Ot=o,c;o<s&&c===i[o]||(this.Ot=Ii,s=0,Promise.resolve(c).then((async d=>{for(;n.get();)await n.get();let p=r.deref();if(p!==void 0){let u=p.Ut.indexOf(c);u>-1&&u<p.Ot&&(p.Ot=u,p.setValue(d))}})))}return P}disconnected(){this.ft.disconnect(),this.vt.pause()}reconnected(){this.ft.reconnect(this),this.vt.resume()}},Rr=z($e);var ir=Symbol.for(""),sr=a=>{if(a?.r===ir)return a?._$litStatic$};var Mi=new Map,Fi=a=>(t,...e)=>{let i=e.length,s,r,n=[],o=[],c,d=0,p=!1;for(;d<i;){for(c=t[d];d<i&&(r=e[d],(s=sr(r))!==void 0);)c+=s+t[++d],p=!0;d!==i&&o.push(r),n.push(c),d++}if(d===i&&n.push(t[i]),p){let u=n.join("$$lit$$");(t=Mi.get(u))===void 0&&(n.raw=n,Mi.set(u,t=n)),e=o}return a(t,...e)},Vr=Fi(l),qr=Fi(I);window.litDisableBundleWarning||console.warn("Lit has been loaded from a bundle that combines all core features into a single file. To reduce transfer size and parsing cost, consider using the `lit` npm package directly in your project.");function Ni(a){if(!a)return"--:--";let t=Math.floor(a/1e3%60);return`${Math.floor(a/(1e3*60)%60)}:${t<10?"0":""}${t}`}var Gi=!1;function Wi(a){Gi=!!a}function q(...a){Gi&&console.log("[SpotifyBrowser]",...a)}function k(a){let t=new CustomEvent("haptic",{detail:a,bubbles:!0,composed:!0});window.dispatchEvent(t)}var Xt={playlist:"spf-playlist-sort",album:"spf-album-sort",artist:"spf-artist-sort"};function G(a="playlist"){try{return localStorage.getItem(Xt[a]||Xt.playlist)==="alpha"?"alpha":"recents"}catch{return"recents"}}function ze(a,t){try{localStorage.setItem(Xt[a]||Xt.playlist,t==="alpha"?"alpha":"recents")}catch{}}function rr(a="playlist"){return{sort_result:G(a)==="alpha"}}function Le(){return G("playlist")}function Qi(a){ze("playlist",a)}function et(){return rr("playlist")}function W(a){return a?Array.isArray(a)?a:Array.isArray(a.result)?a.result:Array.isArray(a.result?.Items)?a.result.Items:[]:[]}function Yi(a){return a?Array.isArray(a)?a:Array.isArray(a.result)?a.result:Array.isArray(a.result?.devices)?a.result.devices:Array.isArray(a.result?.Items)?a.result.Items:Array.isArray(a.devices)?a.devices:[]:[]}function Q(a){return{id:a.id||a.Id,name:a.name||a.Name,type:a.type||a.DeviceInfo?.DeviceType||"Speaker",brand:Be(a),isActive:!!(a.is_active||a.IsActive),isSaved:!1}}function Be(a){return a&&(a.brand||a.DeviceInfo?.BrandDisplayName||a.DeviceInfo?.Brand)||null}function M(a,t=a?.type){return a?a.image?a.image:t==="track"&&a.album?.images?.length?a.album.images[0].url:a.images?.length?a.images[0].url:a.album?.images?.length?a.album.images[0].url:a.track?.album?.images?.length?a.track.album.images[0].url:"":""}function kt(a){if(!a)return null;let e=String(a).replace(/%3a/gi,":").match(/spotify:track:[A-Za-z0-9]+/);return e?e[0]:null}function Jt(a){if(!a||typeof a!="string"||!a.startsWith("spotify:"))return null;let t=a.split(":");return t.length<3?null:{type:t[1],id:t[2]}}function ot(a,t){return!a||!t?null:a.states[t]||null}function Re(a,t){let e=ot(a,t)?.attributes?.media_content_id;return e?e.replace("spotify:track:",""):null}function Zt(a,t){let e=ot(a,t);return!e||e.state!=="playing"?null:Re(a,t)}function O(a){if(!a)return 0;let t=a.attributes||{},e=t.media_position||0;return a.state==="playing"&&t.media_position!==void 0&&a.last_updated&&(e+=(Date.now()-new Date(a.last_updated).getTime())/1e3),e}function lt(a,t,e){let i=ot(a,t);if(!i||i.state!=="playing"||!e)return!1;let s=i.attributes;return s.media_context_content_id===e||s.media_content_id===e}var Kt=new Map;function ar(a,t,e){let i=.299*a+.587*t+.114*e;if(i<55){let s=55/Math.max(i,1);a*=s,t*=s,e*=s}else if(i>200){let s=200/i;a*=s,t*=s,e*=s}return[Math.min(255,a)|0,Math.min(255,t)|0,Math.min(255,e)|0]}function Ki(a){return a?Kt.has(a)?Promise.resolve(Kt.get(a)):new Promise(t=>{let e=new Image;e.crossOrigin="anonymous",e.onload=()=>{let i=null;try{let r=document.createElement("canvas");r.width=r.height=32;let n=r.getContext("2d",{willReadFrequently:!0});n.drawImage(e,0,0,32,32);let o=n.getImageData(0,0,32,32).data,c=new Map;for(let p=0;p<o.length;p+=4){if(o[p+3]<125)continue;let u=o[p],g=o[p+1],f=o[p+2],h=u>>4<<8|g>>4<<4|f>>4,m=c.get(h);m||(m={r:0,g:0,b:0,n:0},c.set(h,m)),m.r+=u,m.g+=g,m.b+=f,m.n++}let d=-1;c.forEach(p=>{let u=p.r/p.n,g=p.g/p.n,f=p.b/p.n,h=Math.max(u,g,f),m=Math.min(u,g,f),x=(h+m)/510,v=h===m?0:(h-m)/(255-Math.abs(h+m-255)),y=Math.max(1-Math.abs(x-.5)*1.2,.15),w=p.n*(.25+v)*y;w>d&&(d=w,i=ar(u,g,f))})}catch{i=null}Kt.set(a,i),t(i)},e.onerror=()=>{Kt.set(a,null),t(null)},e.src=a}):Promise.resolve(null)}function Xi(a,t,e){let i=[...a];if(t===e||t<0||e<0||t>=i.length||e>=i.length)return i;let[s]=i.splice(t,1);return i.splice(e,0,s),i}function Ji(a,t,e){if(!a||!a.length)return 0;let i=0;return a.forEach((s,r)=>{r!==e&&s<t&&i++}),Math.max(0,Math.min(a.length-1,i))}var nr={computer:"Computer",smartphone:"Smartphone",phone:"Smartphone",tablet:"Tablet",tv:"TV",speaker:"Speaker",castaudio:"Cast audio",castvideo:"Cast video",avr:"AVR",stb:"Set-top box",audiodongle:"Audio dongle"};function ct(a){let t=String(a||"").trim();return t?nr[t.toLowerCase()]||t.charAt(0).toUpperCase()+t.slice(1):"Speaker"}function Zi(a,t){let e=String(a??"").trim();return!e||e===t?null:e}function ts(a,t,e){let i=t.width,s=t.height,r=e.width,n=e.height,o=a?{left:a.left-t.left,top:a.top-t.top,bottom:a.bottom-t.top}:null,c=o?o.left:(i-r)/2,d=Math.min(Math.max(8,c),i-r-8),p=o?o.bottom+6:(s-n)/2;p+n>s-8&&(p=(o?o.top:s)-n-6),p=Math.min(Math.max(8,p),s-n-8);let u=o&&o.top>p?"top left":"bottom left";return{left:d,top:p,origin:u}}function es(a,t){let e=new Set((t||[]).map(i=>i.id));return(a||[]).filter(i=>!e.has(i.id))}function $t(a){if(!a||a<0||isNaN(a))return"0:00";let t=Math.floor(a/60),e=Math.floor(a%60);return`${t}:${e<10?"0":""}${e}`}var or=[{code:"cast_token",test:/Spotify Desktop Player authorization token was not found|Spotify Cast Application could not be activated/i,reopenPicker:!1,duration:8e3,message:`This Chromecast needs SpotifyPlus's one-time Desktop Player token setup. See the SpotifyPlus wiki ("Spotify Desktop Player Token"), then try again.`},{code:"zeroconf",test:/discoverable via Zeroconf/i,reopenPicker:!0,duration:6e3,message:"Device is unreachable on the network. Make sure it's awake and on the same network as Home Assistant, then pick it again."},{code:"no_active_device",test:/no active Spotify player device/i,reopenPicker:!0,duration:4e3,message:"No active Spotify player. Pick a device to start playback."},{code:"stalled_device",test:/did not start playing/i,reopenPicker:!0,duration:6e3,message:null}];function St(a){let t=a?.message||(typeof a=="string"?a:"");if(!t)return null;let e=or.find(i=>i.test.test(t));return e?{...e,message:e.message||t}:null}var te=class a{static PLAYBACK_SERVICES=new Set(["player_media_play_context","player_media_play_tracks","player_media_play_track_favorites","player_transfer_playback","add_player_queue_items"]);static MAX_PAGE_LIMIT=10;static PENDING_PLAY_TTL_MS=12e4;static STALLED_LAUNCH_MS=5e3;static playerHasItem(t){let e=t?.attributes;return!!(e&&(e.media_title||e.media_content_id))}constructor(t,e,i=null,s=null,r=null,n=null){this.hass=t,this.entityId=e,this.deviceResolver=i,this.sonosBridge=null,this.deviceManager=null,this.defaultVolumeConfig=s,this.onNotification=r,this.onError=n,this._resumedAt=Date.now(),this._onVisibility=()=>{typeof document<"u"&&!document.hidden&&(this._resumedAt=Date.now())},typeof document<"u"&&document.addEventListener("visibilitychange",this._onVisibility),this._socketReady=this.hass?.connection?.connected===!0,this._connection=null,this._transferScanTimers=[],this._lastScanAt=0,this._pendingPlay=null,this._readyScanTimer=null,this._readyScanPromise=null,this._onSocketReady=()=>{this._socketReady=!0,this._resumedAt=Date.now()},this._onSocketDisconnected=()=>{this._socketReady=!1},this._bindConnection()}_bindConnection(){let t=this.hass?.connection||null;t!==this._connection&&(this._connection?.removeEventListener&&(this._connection.removeEventListener("ready",this._onSocketReady),this._connection.removeEventListener("disconnected",this._onSocketDisconnected)),this._connection=t,t?.addEventListener&&(t.addEventListener("ready",this._onSocketReady),t.addEventListener("disconnected",this._onSocketDisconnected)))}_notify(t){this.onNotification&&this.onNotification(t)}_reportError(t){this.onError&&this.onError(t)}_entityActive(){let t=this.hass?.states?.[this.entityId];return["playing","paused","buffering"].includes(t?.state)&&a.playerHasItem(t)}_watchStalledLaunch(t,e,i,s){let r=this._launchWatchId=(this._launchWatchId||0)+1;setTimeout(()=>{if(r!==this._launchWatchId)return;let n=this.hass?.states?.[this.entityId];if(n?.state==="playing"||a.playerHasItem(n))return;this._storePendingPlay(t,e,i);let o={code:"stalled_device",_sbReported:!0,message:`${s} did not start playing. Pick a device to try again.`};this._reportError(o)},a.STALLED_LAUNCH_MS)}_storePendingPlay(t,e,i){this._pendingPlay={uri:t,type:e,extraOptions:i,at:Date.now()}}_takePendingPlay(){let t=this._pendingPlay;return this._pendingPlay=null,!t||Date.now()-t.at>a.PENDING_PLAY_TTL_MS?null:t}hasPendingPlay(){let t=this._pendingPlay;return!t||Date.now()-t.at>a.PENDING_PLAY_TTL_MS?!1:!this._entityActive()}_resolveDefaultVolume(){if(!this.defaultVolumeConfig)return null;let{fallback:t,rules:e}=this.defaultVolumeConfig;if(!e||e.length===0)return t;let i=new Date,s=i.getHours(),r=i.getMinutes(),n=s*60+r;for(let o of e){if(!o.start||!o.end||!o.level)continue;let[c,d]=o.start.split(":").map(Number),[p,u]=o.end.split(":").map(Number),g=c*60+d,f=p*60+u,h=!1;if(g<f?n>=g&&n<f&&(h=!0):(n>=g||n<f)&&(h=!0),h)return Number(o.level)}return Number(t)}updateHass(t){this.hass=t,this.sonosBridge&&this.sonosBridge.setHass(t),this._bindConnection()}setSonosBridge(t){this.sonosBridge=t}setDeviceManager(t){this.deviceManager=t}destroy(){this._onVisibility&&typeof document<"u"&&(document.removeEventListener("visibilitychange",this._onVisibility),this._onVisibility=null),this._connection?.removeEventListener&&(this._connection.removeEventListener("ready",this._onSocketReady),this._connection.removeEventListener("disconnected",this._onSocketDisconnected)),this._connection=null,this._transferScanTimers.forEach(clearTimeout),this._transferScanTimers=[],clearTimeout(this._readyScanTimer),this._readyScanTimer=null,this._readyScanPromise=null}_controlEntity({perSpeaker:t=!1}={}){if(this.sonosBridge){let e=this._activeAttributes(),i=this.sonosBridge.activeTarget(e);if(i.isSonos){if(i.entity){let s=t?i.entity:this.sonosBridge.coordinatorFor(i.entity);return this.sonosBridge.log(`control \u2192 ${s} (LOCAL, bypassing SpotifyPlus cloud)`),s}this.sonosBridge.reportUnmapped(e.source||e.sp_device_name)}}return this.entityId}_sonosLaunchLocal(){return!!this.sonosBridge&&this.sonosBridge.launchMode!=="spotifyplus"}async _playSonosLocal(t,e,i,s){if(!t)return!1;if(typeof e=="string"&&e.endsWith(":collection")){if(i==null&&s){let c=await this.sonosBridge.playTrack(t,s);return c&&this.triggerScan(),c}return await this.fetchSpotifyPlus("player_media_play_track_favorites",{shuffle:!1},!1)?(i!=null&&i>0&&this.sonosBridge.jumpWhenLoaded(t,i,{tries:40,intervalMs:500}),this.triggerScan(),!0):!1}let n=await this.sonosBridge.playContext(t,e,{offsetPosition:i??0});return n&&this.triggerScan(),n}async fetchSpotifyPlus(t,e={},i=!0,s=!0,r=!1){if(!this.hass)return null;let n={player_media_next_track:"media_next_track",player_media_previous_track:"media_previous_track",player_media_play:"media_play",player_media_pause:"media_pause",player_shuffle:"shuffle_set",player_repeat:"repeat_set"};if(n[t]){let o=n[t],c={entity_id:this._controlEntity()};t==="player_shuffle"&&(c.shuffle=e.state==="true"||e.state===!0),t==="player_repeat"&&(c.repeat=e.state||"all");try{let d=null;if(t==="player_shuffle"&&c.entity_id!==this.entityId){let p=this.hass.states?.[c.entity_id]?.attributes;p?.repeat&&(d=p.repeat)}return await this.hass.callService("media_player",o,c),d&&await this.hass.callService("media_player","repeat_set",{entity_id:c.entity_id,repeat:d}),this.triggerScan(),{success:!0}}catch(d){return console.warn(`[SpotifyAPI] Standard Service Call Failed [${o}]:`,d),null}}try{let o={type:"call_service",domain:"spotifyplus",service:t,service_data:{entity_id:this.entityId,...e}};i&&(o.return_response=!0);let c=await this.hass.callWS(o);return t==="player_transfer_playback"&&this._scheduleTransferScans(),i?c&&c.response?c.response:c:!0}catch(o){let c=o.code||"",d=o.message||"",p=c==="service_validation_error"||d.includes("Validation error");if(a.PLAYBACK_SERVICES.has(t)&&(p||St(o))&&(o._sbReported=!0,this._reportError(o)),r)throw o;return s&&console.warn(`[SpotifyAPI] Failed Call [${t}]:`,JSON.stringify(o,null,2)),null}}async fetchPaginated(t,e,i,s=a.MAX_PAGE_LIMIT){let r=[],n=e.offset||0,o=null;for(;r.length<i&&!(o!==null&&n>=o);){let c=Math.min(s,i-r.length),d=await this.fetchSpotifyPlus(t,{...e,limit:c,offset:n}),p=d?.result?.items||[];if(o===null&&(o=d?.result?.total??null),r.push(...p),n+=c,p.length===0||o!==null&&n>=o)break}return{items:r,total:o??r.length,offset:n}}get _connectionUp(){return this._socketReady&&this.hass?.connection?.connected!==!1}get _canScanNow(){return!(typeof document<"u"&&document.hidden||!this._connectionUp||Date.now()-this._resumedAt<4e3)}async triggerScan(){if(!(!this.hass||!this._canScanNow))try{await this.hass.callService("spotifyplus","trigger_scan_interval",{entity_id:this.entityId}),this._lastScanAt=Date.now(),await new Promise(t=>setTimeout(t,40))}catch(t){console.warn("[SpotifyAPI] Trigger Scan Failed:",t)}}scanWhenReady({timeoutMs:t=15e3,dedupeMs:e=4e3}={}){return Date.now()-this._lastScanAt<e?Promise.resolve(!1):this._readyScanPromise?this._readyScanPromise:(this._readyScanPromise=new Promise(i=>{let s=Date.now()+t,r=o=>{clearTimeout(this._readyScanTimer),this._readyScanTimer=null,this._readyScanPromise=null,i(o)},n=async()=>{if(!this.hass)return r(!1);if(this._canScanNow)return await this.triggerScan(),r(!0);if(Date.now()>=s)return r(!1);this._readyScanTimer=setTimeout(n,1e3)};n()}),this._readyScanPromise)}_scheduleTransferScans(){this._transferScanTimers.forEach(clearTimeout),this.triggerScan(),this._transferScanTimers=[2e3,6e3].map(t=>setTimeout(()=>this.triggerScan(),t))}async playMedia(t,e,i=null,s={}){if(!this.hass)return{success:!1,error:"No HASS"};this._pendingPlay=null,this._launchWatchId=(this._launchWatchId||0)+1;let r=this.hass.states[this.entityId],n=r&&["playing","paused","buffering"].includes(r.state),o=null,c=null;if(i)c=typeof i=="object"?i:null,o=c?c.id:i;else if(n)o=null;else if(this.deviceResolver)try{let h=await this.deviceResolver();if(h)c=typeof h=="object"?h:null,o=typeof h=="object"?h.id:h;else return q("Playback cancelled: No device selected."),{success:!1,error:"No Device Selected"}}catch(h){return console.error("[SpotifyBrowser] Device resolution failed:",h),{success:!1,error:"Device Resolution Failed"}}else console.warn("[SpotifyBrowser] Player idle & no device resolver. Playback may fail.");let d=!!this.sonosBridge&&this.sonosBridge.isSonosTarget(c,n?r?.attributes||{}:{}),p=null;d&&(p=this.sonosBridge.resolveSonosEntity(c,n?r?.attributes||{}:{}),p&&this.sonosBridge.noteLaunch(p)),d&&["playlist","album","artist","show"].includes(e)&&this.sonosBridge.log(`playMedia: Sonos target \u2192 ${s.offset_position!=null?`offset_position=${s.offset_position}`:"offset_uri (no index)"}`);let u=null;if(!i&&!n){let h=this._resolveDefaultVolume();if(h!==null){let m=c?.id||(typeof o=="string"?o:null);!p&&this.deviceManager?.getVolumeCapability(m)===!1?q(`[SpotifyAPI] Skipping default volume \u2014 ${m} does not support remote volume`):p?(q("Applying Default Volume (Sonos local):",h),this.setVolume(h/100)):u=h/100}}let f=await(async h=>{let{offset_uri:m,offset_position:x,...v}=s,y={...v};h&&(y.device_id=h);try{if(["playlist","album","artist","show"].includes(e)){if(d&&this._sonosLaunchLocal()&&await this._playSonosLocal(p,t,x,m))return{success:!0};y.context_uri=t,d&&x!=null?y.offset_position=x:m&&(y.offset_uri=m);let w=await this.fetchSpotifyPlus("player_media_play_context",y,!1,!0,!0);return(!w||w.error)&&m?(console.warn("[SpotifyAPI] Context jump failed. Falling back to Track Play."),await this.playMedia(s.offset_uri,"track",h)):w?(this.triggerScan(),{success:!0}):{success:!1,error:"Call Failed"}}else{if(e==="likedsongs")return y.shuffle=!0,await this.fetchSpotifyPlus("player_media_play_track_favorites",y,!1,!0,!0)?(this.triggerScan(),{success:!0}):{success:!1,error:"Call Failed"};if(h||Array.isArray(t)){let w=Array.isArray(t)?t:[t];if(y.uris=w.join(","),!await this.fetchSpotifyPlus("player_media_play_tracks",y,!1,!0,!0))return{success:!1,error:"Call Failed"}}else{let w=Array.isArray(t)?t[0]:t;if(d&&this._sonosLaunchLocal()&&p&&await this.sonosBridge.playTrack(p,w))return this.triggerScan(),{success:!0};await this.hass.callService("media_player","play_media",{entity_id:this.entityId,media_content_id:w,media_content_type:e})}return this.triggerScan(),{success:!0}}}catch(w){return console.error("Playback execution failed:",w),{success:!1,error:w}}})(o);return f.success&&u!==null&&this._applyLaunchVolume(u),f.success&&!i&&n&&!a.playerHasItem(r)&&this._watchStalledLaunch(t,e,s,r.attributes?.source||"The active device"),!i&&!n&&f.success===!1&&o&&((f.error?._sbReported||St(f.error))&&this._storePendingPlay(t,e,s),f.error?._sbReported||this._notify(`Playback failed on ${c?.name||o}`)),f}async _applyLaunchVolume(t){let e=await this.setVolume(t,{silent:!0});e?.success||e?.skipped||setTimeout(()=>this.setVolume(t,{silent:!0}),1500)}async transferPlayback(t,{play:e=!0}={}){if(!this._entityActive()){let i=this._takePendingPlay();if(i){let s=await this.playMedia(i.uri,i.type,t,i.extraOptions);return s?.success?{success:!0,replayed:!0}:(this._storePendingPlay(i.uri,i.type,i.extraOptions),{success:!1,replayed:!0,reported:!!s?.error?._sbReported})}}try{return await this.fetchSpotifyPlus("player_transfer_playback",{device_id:t.id,play:e},!1,!0,!0),{success:!0}}catch(i){return{success:!1,reported:!!i._sbReported}}}async togglePlayback(t){if(!this.hass)return;let e=t?"media_play":"media_pause";try{await this.hass.callService("media_player",e,{entity_id:this._controlEntity()}),this.triggerScan()}catch(i){console.error(`Failed to ${e}:`,i)}}_activeAttributes(){return this.hass?.states?.[this.entityId]?.attributes||{}}async addToQueue(t){if(!this.hass||!t)return{success:!1};let e=this.sonosBridge?.activeTarget(this._activeAttributes());return e?.isSonos&&e.entity?await this.sonosBridge.addToQueue(e.entity,t):(e?.isSonos&&!e.entity&&this.sonosBridge.reportUnmapped(this._activeAttributes().source),{success:!!await this.fetchSpotifyPlus("add_player_queue_items",{uris:t},!1)})}async followPlaylist(t,e=!0){if(!this.hass||!t)return{success:!1};try{return await this.hass.callService("spotifyplus","follow_playlist",{entity_id:this.entityId,playlist_id:t,public:e}),{success:!0}}catch(i){return console.error("Follow Playlist failed:",i),{success:!1,error:i}}}async unfollowPlaylist(t){if(!this.hass||!t)return{success:!1};try{return await this.hass.callService("spotifyplus","unfollow_playlist",{entity_id:this.entityId,playlist_id:t}),{success:!0}}catch(e){return console.error("Unfollow Playlist failed:",e),{success:!1,error:e}}}async getCurrentUserProfile(){if(!this.hass)return null;try{return(await this.fetchSpotifyPlus("get_playlist_favorites",{limit_total:1},!0))?.user_profile}catch(t){return console.warn("Get Current User Profile failed:",t),null}}async getCurrentUserId(){if(this._currentUserId)return this._currentUserId;let t=this.hass?.states?.[this.entityId]?.attributes?.sp_user_id;if(t)return this._currentUserId=t,t;let e=await this.getCurrentUserProfile();return e?.id&&(this._currentUserId=e.id),this._currentUserId||null}async checkUserFollowsPlaylist(t,e){if(!this.hass||!t||!e)return null;try{let i=Array.isArray(e)?e.join(","):e,s=await this.fetchSpotifyPlus("check_playlist_followers",{playlist_id:t,user_ids:i},!0);return s?.result?Object.values(s.result):null}catch(i){return console.warn("Check Playlist Followers failed:",i),null}}async createPlaylist({name:t,description:e="",isPublic:i=!0,collaborative:s=!1}){if(!this.hass||!t)return{success:!1,error:new Error("Playlist name is required")};try{return{success:!0,playlist:(await this.fetchSpotifyPlus("playlist_create",{name:t,description:e,public:s?!1:i,collaborative:s},!0,!0,!0))?.result||null}}catch(r){return console.error("Create Playlist failed:",r),{success:!1,error:r}}}async changePlaylistDetails(t,{name:e,description:i="",isPublic:s=!0,collaborative:r=!1}){if(!this.hass||!t||!e)return{success:!1,error:new Error("Playlist id and name are required")};try{return await this.hass.callService("spotifyplus","playlist_change",{entity_id:this.entityId,playlist_id:t,name:e,description:i,public:r?!1:s,collaborative:r}),{success:!0}}catch(n){return console.error("Change Playlist Details failed:",n),{success:!1,error:n}}}async addPlaylistItems(t,e,i=void 0){let s=Array.isArray(e)?e.filter(Boolean):e?[e]:[];if(!this.hass||!t||s.length===0)return{success:!1,error:new Error("Playlist id and track URIs are required")};try{let r=null;for(let n=0;n<s.length;n+=100){let o={playlist_id:t,uris:s.slice(n,n+100).join(",")};Number.isInteger(i)&&(o.position=i+n);let c=await this.fetchSpotifyPlus("playlist_items_add",o,!0,!0,!0);typeof c?.result=="string"&&(r=c.result)}return{success:!0,snapshotId:r}}catch(r){return console.error("Add Playlist Items failed:",r),{success:!1,error:r}}}async removePlaylistItems(t,e,i=void 0){let s=Array.isArray(e)?e.filter(Boolean):e?[e]:[];if(!this.hass||!t||s.length===0)return{success:!1,error:new Error("Playlist id and track URIs are required")};try{let r=i||null;for(let n=0;n<s.length;n+=100){let o={playlist_id:t,uris:s.slice(n,n+100).join(",")};r&&(o.snapshot_id=r);let c=await this.fetchSpotifyPlus("playlist_items_remove",o,!0,!0,!0);typeof c?.result=="string"&&(r=c.result)}return{success:!0,snapshotId:r}}catch(r){return console.error("Remove Playlist Items failed:",r),{success:!1,error:r}}}async reorderPlaylistItems(t,e,i,s=1,r=void 0){if(!this.hass||!t)return{success:!1};try{let n={playlist_id:t,range_start:e,insert_before:i,range_length:s};r&&(n.snapshot_id=r);let o=await this.fetchSpotifyPlus("playlist_items_reorder",n,!0,!0,!0);return{success:!0,snapshotId:typeof o?.result=="string"?o.result:null}}catch(n){return console.error("Reorder Playlist Items failed:",n),{success:!1,error:n}}}async replacePlaylistItems(t,e){let i=Array.isArray(e)?e.filter(Boolean):e?[e]:[];if(!this.hass||!t||i.length===0)return{success:!1,error:new Error("Playlist id and track URIs are required")};if(i.length>100)return{success:!1,error:new Error("playlist_items_replace is limited to 100 tracks")};try{let s=await this.fetchSpotifyPlus("playlist_items_replace",{playlist_id:t,uris:i.join(",")},!0,!0,!0);return{success:!0,snapshotId:typeof s?.result=="string"?s.result:null}}catch(s){return console.error("Replace Playlist Items failed:",s),{success:!1,error:s}}}async getPlaylistItemsPage(t,e=0,i=50,s=void 0){if(!this.hass||!t)return null;let r={playlist_id:t,offset:e,limit:i};return s&&(r.fields=s),(await this.fetchSpotifyPlus("get_playlist_items",r))?.result||null}async getCurrentUserOwnedPlaylists(){if(!this.hass)return[];let t=await this.fetchSpotifyPlus("get_playlist_favorites",{limit_total:200,...et()}),e=t?.result?.items||[],i=t?.user_profile?.id||await this.getCurrentUserId();return i&&!this._currentUserId&&(this._currentUserId=i),i?e.filter(s=>s?.owner?.id===i):[]}async followArtist(t){if(!this.hass||!t)return{success:!1};try{return await this.hass.callService("spotifyplus","follow_artists",{entity_id:this.entityId,ids:Array.isArray(t)?t.join(","):t}),{success:!0}}catch(e){return console.error("Follow Artist failed:",e),{success:!1,error:e}}}async unfollowArtist(t){if(!this.hass||!t)return{success:!1};try{return await this.hass.callService("spotifyplus","unfollow_artists",{entity_id:this.entityId,ids:Array.isArray(t)?t.join(","):t}),{success:!0}}catch(e){return console.error("Unfollow Artist failed:",e),{success:!1,error:e}}}async checkArtistsFollowing(t){if(!this.hass||!t)return null;try{let e=Array.isArray(t)?t.join(","):t,i=await this.fetchSpotifyPlus("check_artists_following",{ids:e},!0);return i?.result?!Array.isArray(t)&&!e.includes(",")?i.result[e]:i.result:null}catch(e){return console.error("Check Artists Following failed:",e),null}}async checkTrackFavorites(t){if(!this.hass||!t)return null;try{let e=Array.isArray(t)?t.slice():String(t).split(","),i=e.join(","),s=await this.fetchSpotifyPlus("check_track_favorites",{ids:i},!0),r=s?.result??s;if(typeof r=="string")try{r=JSON.parse(r)}catch{}if(r==null)return null;let n=d=>d===!0||d==="true",o={};if(Array.isArray(r))e.forEach((d,p)=>{o[d]=n(r[p])});else if(typeof r=="object"){for(let[d,p]of Object.entries(r))o[d]=n(p);if(e.length&&!e.some(d=>d in o)){let d=Object.values(r);o={},e.forEach((p,u)=>{o[p]=n(d[u])})}}else typeof r=="boolean"&&(o[e[0]]=r);return!Array.isArray(t)&&!i.includes(",")?o[e[0]]===!0:o}catch(e){return console.error("Check Track Favorites failed:",e),null}}async getTrackFavorites(t={}){return this.hass?await this.fetchSpotifyPlus("get_track_favorites",t):null}async getCurrentUserPlaylists(t={}){return this.hass?await this.fetchSpotifyPlus("get_playlist_favorites",{...et(),...t}):null}async getArtistGenres(t){if(!this.hass||!t)return[];if(this._artistGenreCache||(this._artistGenreCache=new Map),this._artistGenreCache.has(t))return this._artistGenreCache.get(t);let e=[];try{let i=await this.fetchSpotifyPlus("get_artist",{artist_id:t});e=i?.result?.genres||i?.genres||[]}catch{e=[]}return this._artistGenreCache.set(t,e),e}async getTrackArt(t){if(!this.hass||!t)return null;if(this._trackArtCache||(this._trackArtCache=new Map),this._trackArtCache.has(t))return this._trackArtCache.get(t);let e=null;try{let i=await this.fetchSpotifyPlus("get_track",{track_id:t});e=(i?.result||i)?.album?.images?.[0]?.url||null}catch{e=null}return this._trackArtCache.set(t,e),e}async searchPlaylists(t,e=10,i=0){if(!this.hass||!t)return{result:{items:[]}};let{items:s,total:r}=await this.fetchPaginated("search_playlists",{criteria:t,offset:i},e);return{result:{items:s,total:r}}}async saveTrackFavorites(t){if(!this.hass||!t)return{success:!1};try{return await this.hass.callService("spotifyplus","save_track_favorites",{entity_id:this.entityId,ids:Array.isArray(t)?t.join(","):t}),{success:!0}}catch(e){return console.error("Save Track Favorites failed:",e),{success:!1,error:e}}}async removeTrackFavorites(t){if(!this.hass||!t)return{success:!1};try{return await this.hass.callService("spotifyplus","remove_track_favorites",{entity_id:this.entityId,ids:Array.isArray(t)?t.join(","):t}),{success:!0}}catch(e){return console.error("Remove Track Favorites failed:",e),{success:!1,error:e}}}async checkAlbumFavorites(t){if(!this.hass||!t)return null;try{let e=Array.isArray(t)?t.join(","):t,i=await this.fetchSpotifyPlus("check_album_favorites",{ids:e},!0);return i?.result?!Array.isArray(t)&&!e.includes(",")?i.result[e]:i.result:null}catch(e){return console.error("Check Album Favorites failed:",e),null}}async saveAlbumFavorites(t){if(!this.hass||!t)return{success:!1};try{return await this.hass.callService("spotifyplus","save_album_favorites",{entity_id:this.entityId,ids:Array.isArray(t)?t.join(","):t}),{success:!0}}catch(e){return console.error("Save Album Favorites failed:",e),{success:!1,error:e}}}async removeAlbumFavorites(t){if(!this.hass||!t)return{success:!1};try{return await this.hass.callService("spotifyplus","remove_album_favorites",{entity_id:this.entityId,ids:Array.isArray(t)?t.join(","):t}),{success:!0}}catch(e){return console.error("Remove Album Favorites failed:",e),{success:!1,error:e}}}async setVolume(t,{silent:e=!1}={}){if(!this.hass)return{success:!1};let i=this._controlEntity({perSpeaker:!0});if(i===this.entityId){let s=this._activeAttributes().sp_device_id;if(this.deviceManager?.getVolumeCapability(s)===!1)return q(`[SpotifyAPI] setVolume: ${s} does not support remote volume \u2014 skipping`),{success:!1,skipped:!0}}try{return await this.hass.callService("media_player","volume_set",{entity_id:i,volume_level:t}),{success:!0}}catch(s){if(console.error("Failed to set volume:",s),!e){let r=St(s);this._notify(r?r.message:(s?.message||"").includes("Cannot control device volume")?"This device doesn't support remote volume control.":"Couldn't change the volume.")}return{success:!1,error:s}}}async seek(t){if(!this.hass)return{success:!1};try{return await this.hass.callService("media_player","media_seek",{entity_id:this._controlEntity(),seek_position:Math.max(0,Math.floor(t))}),this.triggerScan(),{success:!0}}catch(e){return console.error("Failed to seek:",e),{success:!1,error:e}}}};var Ct=_`
    .art-fallback {
        background-color: var(--spf-bg-card-hover, #282828);
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23535353'%3E%3Cpath d='M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z'/%3E%3C/svg%3E");
        background-size: 45%;
        background-repeat: no-repeat;
        background-position: center;
    }
`,$=_`
    ${Ct}

    :host {
        display: block;
        position: absolute;
        top: 0; left: 0; width: 0; height: 0;
        z-index: 9999;

        /* This is an app-like UI, not a document: suppress the native text
           selection, blue tap highlight, and long-press callout that fire when
           touching/dragging on touch devices (tablet/phone). Inherited, so it
           propagates to every component that uses these shared styles. */
        user-select: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -webkit-tap-highlight-color: transparent;

        /* Spotify's typeface. The @font-face set is registered at document
           level by styles/fonts.js (ensureAppFonts); falls back cleanly when
           the woff2 files aren't deployed. Inherited by every component. */
        --spf-font-family: 'Circular Std', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
        font-family: var(--spf-font-family);

        /* Type scale (Spotify-compact, anchored to metrics measured off the
           iOS app). Custom properties inherit across shadow boundaries, so
           components that skip sharedStyles still resolve these. Weights:
           Circular is registered at 400/500/700/900 only — declare those. */
        --spf-text-xs: 11px;     /* eyebrows, fine print */
        --spf-text-sm: 12px;     /* metadata, subtitles */
        --spf-text-base: 13.5px; /* body, list rows, menus */
        --spf-text-md: 15px;     /* emphasized rows, inputs */
        --spf-text-lg: 17px;     /* section headers */
        --spf-text-xl: 22px;     /* page/sheet titles */
        --spf-text-2xl: 26px;    /* large titles */
        --spf-text-hero: 34px;   /* biggest non-banner titles */

        /* Dynamic Island / notch safe area */
        --spf-safe-top: env(safe-area-inset-top, 0px);
        /* Home-indicator safe area (kept off the footer buttons) */
        --spf-safe-bottom: env(safe-area-inset-bottom, 0px);

        /* --- THEME VARIABLES --- */
        --spf-brand: #1db954;
        --spf-brand-hover: #1ed760;
        --spf-bg: #121212;
        --spf-bg-card: #181818;
        --spf-bg-card-hover: #282828;
        --spf-skeleton-bg: #282828;
        --spf-text-main: #ffffff;
        --spf-text-sub: #b3b3b3;
        --spf-hover-white: rgba(255, 255, 255, 0.1);
        --spf-active-white: rgba(255, 255, 255, 0.2);
        --spf-btn-bg: rgba(0, 0, 0, 0.3);
        --spf-border: rgba(255, 255, 255, 0.1);
        --spf-border-subtle: rgba(255, 255, 255, 0.05);
        --spf-scroll-thumb: rgba(255, 255, 255, 0.2);
    }

    /* Form controls don't inherit font-family by default — keep them on the
       app typeface instead of the UA font. */
    button, input, textarea, select {
        font-family: inherit;
    }

    /* Keep selection/caret behavior for real text fields. */
    input, textarea {
        user-select: text;
        -webkit-user-select: text;
        -webkit-touch-callout: default;
    }

    /* --- Global Backdrop --- */
    .backdrop {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.6);
        opacity: 0; pointer-events: none; 
        transition: opacity 0.3s ease;
        z-index: 9998; 
        backdrop-filter: blur(4px);
    }
    .backdrop.open { opacity: 1; pointer-events: auto; }

    /* --- Main Browser Shell --- */
    .browser-wrapper {
        position: fixed;
        background: var(--spf-bg); 
        color: var(--spf-text-main);
        display: flex; flex-direction: column;
        transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 9999;
        overflow: hidden;
        box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        box-sizing: border-box;
    }

    /* ================= DESKTOP STYLES ================= */
    @media (min-width: 769px) {
        .browser-wrapper {
            top: 50%; left: 50%;
            /* On touch tablets the height is locked in px at open time (see
               _captureAppHeight) so the keyboard overlays the window; pointer-fine
               desktops fall back to live 85vh. */
            width: 85vw; max-width: 1200px; height: var(--spf-app-height, 85vh);
            border-radius: 16px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.6);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            
            /* Base State (Hidden) varies by animation */
            pointer-events: none;
            opacity: 0; 
        }

        /* --- FADE (Default) --- */
        .browser-wrapper.anim-fade {
            transform: translate(-50%, -45%) scale(0.95);
            transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .browser-wrapper.open.anim-fade {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1; pointer-events: auto;
        }

        /* --- SLIDE (Legacy-ish) --- */
        .browser-wrapper.anim-slide {
            transform: translate(-50%, 100vh); /* Start off-screen bottom */
            opacity: 1; /* Visible, just off screen */
            transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .browser-wrapper.open.anim-slide {
            transform: translate(-50%, -50%);
            opacity: 1; pointer-events: auto;
        }

        /* --- NONE --- */
        .browser-wrapper.anim-none {
            transform: translate(-50%, -50%); /* Just center it */
            transition: none !important;
            display: none; /* Hide when closed */
        }
        .browser-wrapper.open.anim-none {
            display: flex;
            opacity: 1; pointer-events: auto;
        }

        /* --- NO BLUR (Opaque Fallback) --- */
        .browser-wrapper.no-blur {
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            background: #121212 !important; /* Solid Opaque */
            box-shadow: 0 20px 50px rgba(0,0,0,0.9);
        }
        
        .queue-header-wrapper {
            position: relative;
            padding: 0 !important; /* Critical: Remove wrapper padding */
            overflow: visible;      /* Allow floating volume to hang out */
            background: var(--spf-bg);
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 5;
        }
        
        .page-container {
            transition: margin-right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .browser-wrapper.queue-open .page-container { margin-right: 350px; }
        
        .browser-wrapper.is-dragging .page-container {
            transition: none !important;
        }
        
        .mobile-drag-handle { display: none; }

        /* While the on-screen keyboard is up (kb-open, toggled by JS), anchor the
           floating window to the top at its full pre-keyboard height so the
           keyboard overlays the lower edge instead of shrinking/reflowing it. */
        .browser-wrapper.open.kb-open {
            top: 0 !important;
            height: var(--spf-app-height, 85vh) !important;
            transform: translateX(-50%) !important;
            border-radius: 0 0 16px 16px;
            transition: none !important;
        }
    }

    /* ================= MOBILE STYLES ================= */
    @media (max-width: 768px) {
        .browser-wrapper {
            /* Anchored to the top with a height locked at open time, so the
               on-screen keyboard overlays the panel instead of resizing it. */
            top: 0; left: 0; width: 100%; height: var(--spf-app-height, 100%);
            max-width: none; max-height: none;
            border-radius: 0;
            margin-top: 0;
            border: none;

            /* Base Mobile Hidden State */
            pointer-events: none;
        }

        /* --- MOBILE FADE (Slide-up panel with fade) --- */
        .browser-wrapper.anim-fade {
            transform: translateY(100%);
            opacity: 0;
            transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
        }
        .browser-wrapper.open.anim-fade {
            transform: translateY(0);
            opacity: 1; pointer-events: auto;
        }

        /* --- MOBILE SLIDE --- */
        .browser-wrapper.anim-slide {
            transform: translateY(100%);
            opacity: 1; 
            transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .browser-wrapper.open.anim-slide {
            transform: translateY(0);
            pointer-events: auto;
        }
        
        /* --- MOBILE NONE --- */
        .browser-wrapper.anim-none {
            display: none;
            transform: translateY(0);
        }
        .browser-wrapper.open.anim-none {
            display: block; opacity: 1; pointer-events: auto;
        }

        /* Fix Queue Mobile - Slide OVER header (z-index 120 > 110) */
        spotify-queue {
            z-index: 200000 !important;
        }

        .queue-panel {
            top: 0 !important;
            padding-top: 0;
            height: 100% !important;
        }

        .queue-panel::before {
            content: '';
            position: absolute;
            bottom: 0; left: 0; width: 100%; height: 200vh; 
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            z-index: -1; 
            pointer-events: none; 
            opacity: var(--blur-opacity);
            transition: opacity 0.3s ease;
        }
        
        .browser-wrapper.queue-open .queue-panel::before {
            pointer-events: auto;
        }
        
        .queue-panel.is-dragging::before {
            transition: none !important;
        }

        .queue-header-wrapper {
            border-radius: 20px 20px 0 0;
            border-top: 1px solid var(--spf-border);
            padding-bottom: 8px;
            background: var(--spf-bg); 
            box-shadow: 0 -10px 40px rgba(0,0,0,0.5); 
            padding-top: 12px; 
            overflow: hidden;
        }

        .queue-list { background: var(--spf-bg); }

        .mobile-drag-handle {
            display: block !important;
            width: 40px; height: 4px;
            background: #ffffff; opacity: 0.3; 
            border-radius: 2px;
            margin: 16px auto 4px auto; 
        }
        
        .browser-wrapper.queue-open .page-container { margin-right: 0 !important; }
        .search-container.active { width: auto !important; flex: 1; margin-right: 8px; }
        .hero-title { font-size: 2rem !important; }
        .grid-layout { grid-template-columns: repeat(2, 1fr) !important; gap: 12px; }
        
        .header { padding: var(--spf-safe-top, 0px) 12px 0 12px !important; }
        .header-left, .header-right { gap: 8px !important; }

        /* Mobile Bottom Nav and Mini Player styles */
        .mobile-bottom-nav {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: calc(60px + var(--spf-safe-bottom, 0px));
            padding-bottom: var(--spf-safe-bottom, 0px);
            background: rgba(18, 18, 18, 0.95);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border-top: 1px solid var(--spf-border-subtle, rgba(255,255,255,0.05));
            display: flex;
            justify-content: space-around;
            align-items: center;
            z-index: 10000;
            box-sizing: border-box;
        }
        .nav-tab {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #b3b3b3;
            font-size: var(--spf-text-xs, 11px);
            font-weight: 500;
            cursor: pointer;
            gap: 4px;
            flex: 1;
            height: 100%;
            transition: color 0.2s ease;
        }
        .nav-tab svg {
            width: 22px;
            height: 22px;
            fill: currentColor;
        }
        .nav-tab.active {
            color: #ffffff;
        }
        .mobile-mini-player {
            position: absolute;
            bottom: calc(60px + var(--spf-safe-bottom, 0px) + 8px);
            left: 8px;
            right: 8px;
            height: 62px;
            background: rgba(40, 40, 40, 0.95);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            padding: 8px 8px 8px 10px;
            z-index: 9999;
            cursor: pointer;
            box-sizing: border-box;
            gap: 10px;
            overflow: hidden;
        }
        .mini-player-art {
            width: 44px;
            height: 44px;
            border-radius: 4px;
            background-size: cover;
            background-position: center;
            background-color: var(--spf-skeleton-bg);
            flex-shrink: 0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .mini-player-info {
            flex: 1;
            min-width: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 3px;
        }
        .mini-player-title {
            font-size: var(--spf-text-base, 13.5px);
            font-weight: 700;
            color: #ffffff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 1.2;
        }
        .mini-player-sep { color: #b3b3b3; }
        .mini-player-artist-inline { color: #b3b3b3; font-weight: 500; }
        .mini-player-artist {
            font-size: var(--spf-text-xs, 11px);
            color: #b3b3b3;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 1.2;
        }
        .mini-player-device-line {
            display: flex;
            align-items: center;
            gap: 5px;
            cursor: pointer;
            color: var(--spf-brand, #1ed760);
            font-size: var(--spf-text-sm, 12px);
            font-weight: 700;
            line-height: 1.2;
            min-width: 0;
        }
        .mini-player-device-line svg {
            width: 14px; height: 14px; fill: currentColor; flex-shrink: 0;
        }
        .mini-player-device-line span {
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .mini-player-device-btn {
            background: transparent;
            border: none;
            color: #ffffff;
            width: 38px;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            padding: 0;
            flex-shrink: 0;
            border-radius: 50%;
            transition: transform 0.1s ease, color 0.15s ease;
        }
        .mini-player-device-btn.connected { color: var(--spf-brand, #1ed760); }
        .mini-player-device-btn:active { transform: scale(0.9); }
        .mini-player-device-btn svg { width: 22px; height: 22px; }
        .mini-player-play-btn {
            background: transparent;
            border: none;
            color: #ffffff;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            padding: 0;
            flex-shrink: 0;
            border-radius: 50%;
            transition: transform 0.1s ease;
        }
        .mini-player-play-btn:active {
            transform: scale(0.9);
        }
        .mini-player-play-btn svg {
            width: 24px;
            height: 24px;
            fill: currentColor;
        }
        .mini-player-progress {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: rgba(255, 255, 255, 0.1);
        }
        .mini-player-progress-bar {
            height: 100%;
            background: var(--spf-brand, #1ed760);
            width: 0%;
            transition: width 0.5s linear;
        }

        /* Ensure view containers are padded above mini player and bottom nav */
        .scroll-content {
            padding-bottom: calc(130px + var(--spf-safe-bottom, 0px)) !important;
        }
        .main-scroll-container {
            padding-bottom: calc(130px + var(--spf-safe-bottom, 0px)) !important;
        }
        .list-container {
            padding-bottom: calc(130px + var(--spf-safe-bottom, 0px)) !important;
        }
    }

    /* --- Header --- */
    .header {
        position: absolute; top: 0; left: 0; right: 0;
        height: calc(64px + var(--spf-safe-top));
        padding-top: var(--spf-safe-top);
        display: flex; justify-content: space-between; align-items: center;
        padding-left: 24px; padding-right: 24px; padding-bottom: 0;
        background: rgba(18, 18, 18, 1);
        z-index: 110; 
        transition: border-bottom 0.3s ease;
        box-sizing: border-box;
    }
    
    .header-center-title {
        position: absolute; left: 50%; transform: translateX(-50%);
        font-weight: 700; font-size: var(--spf-text-lg, 17px); color: var(--spf-text-main);
        opacity: 0; transition: opacity 0.2s ease;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        max-width: 40%; pointer-events: none; z-index: 120; 
    }

    .header-left, .header-right { display: flex; align-items: center; gap: 16px; }
    .spotify-logo { width: 32px; height: 32px; fill: var(--spf-text-main); }
    
    .nav-btn {
        background: var(--spf-btn-bg); border: none; color: var(--spf-text-main);
        width: 32px; height: 32px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; transition: background 0.2s; flex-shrink: 0;
    }
    @media (hover: hover) { .nav-btn:hover { background: var(--spf-hover-white); } }
    .nav-btn:active { background: var(--spf-active-white); }
    .nav-btn svg { pointer-events: none; } 
    
    /* --- Search Box --- */
    .search-container {
        display: flex; align-items: center; justify-content: center; 
        background: var(--spf-btn-bg); 
        border-radius: 50%; width: 40px; height: 40px;
        padding: 0; overflow: hidden;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @media (hover: hover) { .search-container:not(.active):hover { background: var(--spf-hover-white); } }
    
    .search-container.active {
        width: 240px; background: var(--spf-text-main); border-radius: 20px;
        padding: 0 8px; justify-content: flex-start; 
    }
    .search-icon-btn {
        width: 40px; height: 40px; 
        background: none; border: none; color: var(--spf-text-main);
        cursor: pointer; padding: 0; margin: 0;
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0; position: relative; z-index: 2; 
    }
    .search-icon-btn svg { transform: translate(1px, 1px); }
    .search-container.active .search-icon-btn { color: #000; width: 32px; }

    .search-input {
        background: transparent !important; border: none; outline: none;
        color: #000; font-size: var(--spf-text-base, 13.5px); opacity: 0; width: 0; min-width: 0; 
        padding: 0; margin: 0; pointer-events: none; position: relative; z-index: 1; 
        transition: opacity 0.2s, width 0.3s ease; line-height: 40px; 
    }
    .search-container.active .search-input { 
        opacity: 1; width: 100%; margin-left: 4px; pointer-events: auto; 
    }
    
    /* --- Page & Transitions --- */
    
    .scroll-content {
        position: relative;
        z-index: 1;
        /* This is the margin you lost */
        padding: 24px; 
        /* This ensures you can scroll past the bottom player */
        padding-bottom: 100px; 
    }

    .page-container { position: relative; flex: 1; overflow: hidden; background: var(--spf-bg); box-sizing: border-box; }
    .page {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        overflow-y: auto; overflow-x: hidden;
        background: var(--spf-bg);
        transition: transform 0.3s ease, opacity 0.3s ease;
        padding-top: calc(64px + var(--spf-safe-top)); box-sizing: border-box;
        
        /* GPU Acceleration Hints */
        will-change: transform, opacity;
        backface-visibility: hidden;
        transform: translateZ(0); 
    }
    .page.has-hero { padding-top: 0 !important; }
    .page.has-hero-header { padding-top: 0; }
    /* Mobile search/library own their own top bar (no app header), so drop the page inset. */
    @media (max-width: 768px) {
        .page.search-page { padding-top: 0 !important; }
        /* Home's header is shrunk to just the collapse arrow + avatar, so its
           content clears a much smaller bar (matches the header rule). */
        .page.home-page { padding-top: calc(52px + var(--spf-safe-top)) !important; }

        /* Tighter side margins to match the native app (was 24px). */
        .scroll-content { padding-left: 16px; padding-right: 16px; }
        /* Keep horizontal carousels bleeding exactly to the screen edge. */
        .carousel-layout { margin-left: -16px; margin-right: -16px; padding-left: 16px; padding-right: 16px; }

        /* --- Mobile type scale ---
           Our text ran a touch larger than the native app. shared-styles is
           imported into every component's shadow root, so reducing these shared
           text primitives here scales them app-wide. This is the single place to
           tune mobile text sizing. */
        .media-title { font-size: var(--spf-text-base, 13.5px); }
        .media-subtitle { font-size: var(--spf-text-xs, 11px); }
        .section-title { font-size: var(--spf-text-md, 15px); }
        .list-item-title { font-size: var(--spf-text-md, 15px); }
        .list-item-subtitle { font-size: var(--spf-text-base, 13.5px); }
        .track-name { font-size: var(--spf-text-base, 13.5px); }
        .track-artist { font-size: var(--spf-text-sm, 12px); }
    }
    .page-hidden { display: none; }
    
    .slide-in-right { animation: slideInRight 0.3s forwards; }
    .slide-out-left { animation: slideOutLeft 0.3s forwards; }
    .slide-in-left { animation: slideInLeft 0.3s forwards; }
    .slide-out-right { animation: slideOutRight 0.3s forwards; }
    .fade-in { animation: fadeIn 0.3s forwards; }

    @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
    @keyframes slideOutLeft { from { transform: translateX(0); } to { transform: translateX(-30%); opacity: 0; } }
    @keyframes slideInLeft { from { transform: translateX(-30%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slideOutRight { from { transform: translateX(0); } to { transform: translateX(100%); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }




    /* --- Device Popup --- */
    /* --- Generic Popup & Dialog --- */
    .popup-backdrop {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
        z-index: 200000; /* Must be > header (100002) */
        display: none; align-items: center; justify-content: center;
        opacity: 0; pointer-events: none; transition: opacity 0.3s;
    }
    .popup-backdrop.visible { opacity: 1; pointer-events: auto; display: flex; }
    
    .popup-backdrop.no-blur {
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        background: rgba(0,0,0,0.9); /* Darker overlay if no glass */
    }
    
    .popup-content {
        background: var(--spf-bg); width: 90%; max-width: 400px;
        border-radius: 16px; padding: 24px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.8);
        display: flex; flex-direction: column; gap: 16px;
        position: relative;
    }
    .popup-title { margin: 0; font-size: var(--spf-text-lg, 17px); font-weight: 700; text-align: center; color: var(--spf-text-main); }
    .popup-scroll-content { max-height: 300px; overflow-y: auto; }
    .popup-close-btn { background: transparent; border: none; color: var(--spf-text-main); font-weight: 700; padding: 12px; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; align-self: center; }

    /* Alert / Confirm Specifics */
    .alert-dialog { max-width: 320px; text-align: center; }
    .alert-buttons { display: flex; gap: 12px; justify-content: center; margin-top: 8px; }
    .alert-btn { flex: 1; padding: 10px; border-radius: 20px; border: 1px solid var(--spf-border); background: transparent; color: var(--spf-text-main); cursor: pointer; font-weight: 700; }
    .alert-btn.primary { background: var(--spf-brand); color: black; border: none; }
    
    /* Device List specific styles (reused inside popup) */
    .device-row {
        display: flex; align-items: center; gap: 12px;
        padding: 12px; border-radius: 8px; cursor: pointer;
        transition: background 0.2s; color: var(--spf-text-sub);
    }
    @media (hover: hover) { .device-row:hover { background: var(--spf-hover-white); color: var(--spf-text-main); } }
    .device-row:active { background: var(--spf-active-white); color: var(--spf-text-main); }
    .device-row.active { color: var(--spf-brand); }
    
    .device-icon { width: 24px; height: 24px; }
    .device-info { flex: 1; }
    .device-name { font-weight: 700; font-size: var(--spf-text-base, 13.5px); display:flex; align-items:center; gap:6px; }
    .device-type { font-size: var(--spf-text-sm, 12px); opacity: 0.7; text-transform: capitalize; }
    .device-active-icon { display: flex; }

    /* --- Toast Notification --- */
    .toast-container {
        position: absolute; bottom: 80px; left: 50%; transform: translateX(-50%);
        display: flex; flex-direction: column; gap: 8px; z-index: 300; pointer-events: none;
        width: 90%; max-width: 400px;
    }
    .toast-message {
        background: var(--spf-bg-card-hover); color: var(--spf-text-main);
        padding: 12px 16px; border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        font-size: var(--spf-text-base, 13.5px); text-align: center;
        opacity: 0; transform: translateY(20px);
        animation: toastEnter 0.3s forwards;
    }
    .toast-message.hiding { animation: toastExit 0.3s forwards; }
    
    @keyframes toastEnter { to { opacity: 1; transform: translateY(0); } }
    @keyframes toastExit { to { opacity: 0; transform: translateY(-10px); } }

    /* Re-add device refresh btn styling compatible with new popup */
    .device-refresh-btn {
        margin-top: 16px; background: transparent; 
        border: 1px solid var(--spf-border);
        color: var(--spf-text-main); padding: 8px 20px; 
        border-radius: 20px; cursor: pointer; 
        font-size: var(--spf-text-sm, 12px); font-weight: 700; 
        text-transform: uppercase; letter-spacing: 1px;
        transition: all 0.2s;
    }
    .device-refresh-btn:hover { border-color: var(--spf-text-main); background: var(--spf-hover-white); }
    
    /* --- Dropdown Menu --- */
    .dropdown-menu {
        position: absolute; top: calc(60px + var(--spf-safe-top)); right: 60px;
        background: var(--spf-bg-card-hover); border-radius: 8px;
        width: 180px; box-shadow: 0 8px 24px rgba(0,0,0,0.5);
        display: none; flex-direction: column; z-index: 30;
    }
    .dropdown-menu.visible { display: flex; }
    
    .menu-item { padding: 12px 16px; cursor: pointer; font-size: var(--spf-text-base, 13.5px); color: var(--spf-text-main); transition: background 0.2s; }
    @media (hover: hover) { .menu-item:hover { background: var(--spf-hover-white); } }
    .menu-item:active { background: var(--spf-active-white); }
    .menu-item:first-child { border-radius: 8px 8px 0 0; }
    .menu-item:last-child { border-radius: 0 0 8px 8px; }

    /* --- Content Components --- */
    .section-title { font-size: var(--spf-text-lg, 17px); font-weight: 700; margin-bottom: 16px; margin-top: 32px; }
    .section-title:first-child { margin-top: 0; }
    .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; margin-top: 32px; }
    .section-header .section-title { margin: 0; }
    .see-all-btn { background: none; border: none; color: var(--spf-text-sub); font-weight: 700; cursor: pointer; font-size: var(--spf-text-sm, 12px); letter-spacing: 1px; text-transform: uppercase; transition: color 0.2s; }
    .see-all-btn:hover { color: var(--spf-text-main); text-decoration: underline; }

    .carousel-wrapper { position: relative; }
    .carousel-layout { 
        display: flex; overflow-x: auto; gap: 20px; 
        margin-left: -24px; margin-right: -24px; padding-left: 24px; padding-right: 24px;
        padding-bottom: 10px; 
        scroll-behavior: smooth; scrollbar-width: none; -webkit-overflow-scrolling: touch; 
    }
    .carousel-layout::-webkit-scrollbar { height: 6px; background: transparent; }
    .carousel-layout:hover::-webkit-scrollbar-thumb { background: var(--spf-scroll-thumb); border-radius: 4px; }
    .carousel-layout .media-card { min-width: 125px; width: 125px; flex-shrink: 0; }

    .grid-layout { display: grid; grid-template-columns: repeat(auto-fill, minmax(125px, 1fr)); gap: 20px; }
    .section-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(125px, 1fr)); gap: 20px; }

    .scroll-btn {
        position: absolute; top: 45%; transform: translateY(-50%); z-index: 2;
        background: rgba(0,0,0,0.7); color: var(--spf-text-main); border: none; border-radius: 50%; 
        width: 32px; height: 32px; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        opacity: 0; transition: opacity 0.3s; right: -10px;
    }
    .carousel-wrapper:hover .scroll-btn { opacity: 1; }

    /* Media Card */
    .media-card {
        padding: 16px; background: var(--spf-bg-card); border-radius: 8px;
        transition: background 0.3s ease, transform 0.1s ease; 
        cursor: pointer; position: relative; box-sizing: border-box;
        backface-visibility: hidden; 
        
        /* FIX: Enforce minimum width so skeletons don't squish */
        min-width: 125px; 
    }
    
    @media (hover: hover) { 
        .media-card:hover { background: var(--spf-bg-card-hover); } 
        .media-card:active { transform: scale(0.96); background: var(--spf-bg-card-hover); }
    }
    
    .media-card.playing .media-title { color: var(--spf-brand); }
    
    .media-image-wrapper { 
        position: relative; 
        width: 100%; 
        /* FIX: Reserve square space immediately, even if empty */
        aspect-ratio: 1 / 1; 
        margin-bottom: 12px; 
        box-shadow: 0 4px 8px rgba(0,0,0,0.3); 
    }
    
    .media-image, .card-image-sk { 
        position: absolute; top: 0; left: 0; /* Pin to corners of wrapper */
        width: 100%; height: 100%; 
        border-radius: 4px; background-size: cover; background-position: center; 
    }
    
    .play-btn-overlay {
        position: absolute; top: 50%; left: 50%; 
        width: 48px; height: 48px; border-radius: 50%; 
        background-color: var(--spf-brand); color: black; border: none;
        box-shadow: 0 8px 16px rgba(0,0,0,0.3); 
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; opacity: 0; 
        transform: translate(-50%, -50%) scale(0.5); 
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .play-btn-overlay svg { width: 24px; height: 24px; fill: currentColor; }

    @media (hover: hover) { 
        .media-card:hover .play-btn-overlay { opacity: 1; transform: translate(-50%, -50%) scale(1); } 
    }
    .play-btn-overlay:hover { transform: translate(-50%, -50%) scale(1.1) !important; background-color: var(--spf-brand-hover); }
    
    .media-card.artist-card { background: transparent; padding: 10px; }
    /* Circular art: no square shadow box, and hover highlights the circle
       (a ring) instead of drawing a rectangle around a transparent card */
    .media-card.artist-card .media-image-wrapper { box-shadow: none; }
    @media (hover: hover) {
        .media-card.artist-card:hover { background: transparent; }
        .media-card.artist-card:hover .media-image { box-shadow: 0 0 0 3px var(--spf-hover-white); }
    }
    
    .media-title { font-weight: 700; font-size: var(--spf-text-base, 13.5px); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 4px; }
    .media-subtitle { font-size: var(--spf-text-sm, 12px); color: var(--spf-text-sub); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

    /* Hero & artist-pill styles live in spotify-context-view.styles.js
       (playlist/artist views are the only consumers and import it).
       .recent-grid-layout lives in spotify-home.styles.js (home is the only
       consumer); the scrollbar rules below still reference it. */

    /* Track Rows (also consumed by spotify-context-list, which imports only
       sharedStyles — keep these here) */
    .track-row {
        overflow: visible;
        display: grid;
        /* num/art | title+artist | action buttons (flush right) */
        grid-template-columns: 40px 1fr auto;
        padding: 8px 16px; border-radius: 4px; align-items: center; cursor: pointer;

        /* FIX: Enforce minimum height to match loaded content */
        min-height: 56px;
        box-sizing: border-box;
    }
    .track-row.with-art { grid-template-columns: 40px 48px 1fr auto; }

    @media (hover: hover) { 
        .track-row:hover { background: var(--spf-hover-white); } 
        .track-row:active { background: var(--spf-active-white); }
    }
    
    .track-row.playing .track-name { color: var(--spf-brand); }
    .track-num { color: var(--spf-text-sub); font-size: var(--spf-text-base, 13.5px); text-align: center; }
    
    .track-art-small {
        width: 40px; height: 40px; background-size: cover; background-position: center;
        border-radius: 4px; background-color: var(--spf-skeleton-bg);
    }

    .track-name { color: var(--spf-text-main); font-size: var(--spf-text-md, 15px); }
    .track-artist { color: var(--spf-text-sub); font-size: var(--spf-text-base, 13.5px); }
    .track-duration { color: var(--spf-text-sub); font-size: var(--spf-text-base, 13.5px); text-align: right; }

    .track-actions-right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 8px;
    }
    
    
    .track-action-btn { background: transparent; border: none; color: var(--spf-text-sub); cursor: pointer; padding: 8px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: color 0.2s, background 0.2s; }
    @media (hover: hover) { .track-action-btn:hover { color: var(--spf-text-main); background: var(--spf-hover-white); } }
    .track-action-btn.is-favorite { color: var(--spf-brand); }
    .track-action-btn.is-favorite svg { fill: var(--spf-brand); }
    
    
    /* Artist / Skeleton Styles */
    .skeleton-pulse { animation: pulse 1.5s infinite ease-in-out; background: var(--spf-bg-card-hover); }
    .card-image-sk { background: var(--spf-bg-card-hover); }
    .card-text-sk { height: 12px; background: var(--spf-bg-card-hover); margin-bottom: 8px; border-radius: 2px; width: 80%; }
    .card-text-sk.short { width: 50%; }
    @keyframes pulse { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }

    .browser-wrapper.is-dragging .page-container,
    .browser-wrapper.is-dragging .queue-panel {
        transition: none !important;
    }
    
    /* ================================================= */
    /* SCROLLBAR STYLING (Floating & Hover Only)        */
    /* ================================================= */

    /* 1. Mobile/Touch: Native Overlay (Fade on scroll) */
    @media (max-width: 768px) {
        .queue-list, .device-list, .page, .carousel-layout, .recent-grid-layout, .scroll-content {
            scrollbar-width: none; /* Hide standard bars */
            -ms-overflow-style: none;
        }
        ::-webkit-scrollbar { display: none; } 
    }

    /* 2. Desktop: Invisible Track + Floating Thumb */
    @media (min-width: 769px) {
        .queue-list, .device-list, .page, .carousel-layout, .recent-grid-layout, .scroll-content {
            /* Try to force overlay (Chrome/Edge feature) */
            overflow-y: overlay !important;
            
            /* Firefox: Thin and invisible until hover */
            scrollbar-width: thin;
            scrollbar-color: transparent transparent;
            transition: scrollbar-color 0.3s;
        }

        /* Firefox Hover */
        .queue-list:hover, .page:hover, .device-list:hover, .scroll-content:hover {
            scrollbar-color: rgba(255,255,255,0.2) transparent;
        }

        /* --- Webkit (Chrome/Edge/Safari) --- */

        /* The Container */
        ::-webkit-scrollbar {
            width: 8px !important; /* Width of the interactive zone */
            background: transparent !important;
        }

        /* The Highway (Track) - Must be invisible */
        ::-webkit-scrollbar-track {
            background: transparent !important;
            margin: 4px 0;
        }

        /* The Moving Part (Thumb) */
        ::-webkit-scrollbar-thumb {
            background-color: transparent; /* Invisible by default */
            
            /* MAGIC TRICK: Simulates a "floating" pill */
            border-radius: 8px;
            border: 2px solid transparent; 
            background-clip: content-box; 
        }

        /* Show Thumb on Container Hover */
        .queue-list:hover::-webkit-scrollbar-thumb,
        .device-list:hover::-webkit-scrollbar-thumb,
        .page:hover::-webkit-scrollbar-thumb,
        .scroll-content:hover::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.25); /* Visible Grey */
        }

        /* Brighten on Grab */
        ::-webkit-scrollbar-thumb:hover {
            background-color: rgba(255, 255, 255, 0.5) !important;
        }
    }
    
`;var ee=class extends EventTarget{constructor(t,e,i){super(),this.host=t,this.container=e,this.config=i||{},this.history=[],this.currentPageId=null,this.currentPageData=null,this.pageCache=new Map,this.maxCacheSize=this.config.browser?.cache_size||10,this.hass=null,this.api=null,this.pinned=null}updateDependencies({hass:t,api:e,config:i,pinned:s}){t&&(this.hass=t,this.pageCache.forEach(r=>r.hass=t)),e&&(this.api=e,this.pageCache.forEach(r=>r.api=e)),i&&(this.config=i,this.maxCacheSize=this.config.browser?.cache_size||10,this.pageCache.forEach(r=>r.config=i)),s&&(this.pinned=s,this.pageCache.forEach(r=>r.pinned=s))}navigateTo(t,e=null,i="forward"){if(!this.container)return;i==="forward"&&this.currentPageId&&this.history.push(this.currentPageId);let s=this.pageCache.get(t);s?(this.pageCache.delete(t),this.pageCache.set(t,s),s.requestUpdate&&s.requestUpdate(),t==="search"?e?.query&&typeof s.search=="function"&&s.search(e.query):(t.startsWith("artist:")||t.startsWith("album:")||t.startsWith("playlist:"))&&(s.pageId!==t||e&&s.data!==e)&&(s.pageId=t,s.data=e)):(s=this._createPage(t,e),this._addToCache(t,s));let r=this.currentPageId,n=this.pageCache.get(r),o=this.config?.appearance?.animations?.page_transition||"fade";this._executeTransition(s,n,o,i),this.currentPageId=t,this.currentPageData=e,this.dispatchEvent(new CustomEvent("route-changed",{detail:{pageId:t,data:e,direction:i,isHeroPage:this.isHeroPage(t)}}))}goBack(){if(this.history.length===0)return;let t=this.history.pop();this.navigateTo(t,null,"back")}resetToHome(){this.currentPageId!=="home"&&(this.history=[],this.navigateTo("home",null,"back"))}clearCache(){this.pageCache.forEach(t=>{t.parentNode&&t.parentNode.removeChild(t)}),this.pageCache.clear(),this.history=[],this.currentPageId=null,this.currentPageData=null}dropPage(t){let e=this.pageCache.get(t);e&&e.parentNode&&e.parentNode.removeChild(e),this.pageCache.delete(t),this.history=this.history.filter(i=>i!==t)}_addToCache(t,e){if(!this.pageCache.has(t)&&(this.pageCache.set(t,e),this.pageCache.size>this.maxCacheSize)){let i=this.pageCache.keys().next().value;if(i==="home"&&this.pageCache.size>1){let r=Array.from(this.pageCache.keys())[1];r&&(i=r)}let s=this.pageCache.get(i);s&&s.parentNode&&s.parentNode.removeChild(s),this.pageCache.delete(i)}}_createPage(t,e){if(t==="home"){let s=document.createElement("spotify-home");return s.classList.add("page","home-page"),this._injectProps(s),s.addEventListener("navigate",r=>this.navigateTo(r.detail.pageId,r.detail.data)),s}else if(t==="search"){let s=document.createElement("spotify-search");return s.classList.add("page","search-page"),this._injectProps(s),e&&e.query&&s.search(e.query),s.addEventListener("navigate",r=>this.navigateTo(r.detail.pageId,r.detail.data)),s.addEventListener("back",()=>this.goBack()),s}else if(t==="library"){let s=document.createElement("spotify-library");return s.classList.add("page","search-page"),this._injectProps(s),s.addEventListener("navigate",r=>this.navigateTo(r.detail.pageId,r.detail.data)),s}else if(t){let s=document.createElement("spotify-context-view");return s.classList.add("page","has-hero"),this._injectProps(s),s.pageId=t,s.data=e,s.addEventListener("header-scroll",r=>{this.dispatchEvent(new CustomEvent("header-scroll",{detail:r.detail}))}),s.addEventListener("navigate",r=>this.navigateTo(r.detail.pageId,r.detail.data)),s.addEventListener("back",()=>this.goBack()),s}let i=document.createElement("div");return i.classList.add("page"),i.innerHTML="Page not found",i}_injectProps(t){t.hass=this.hass,t.api=this.api,t.config=this.config,t.pinned=this.pinned}_executeTransition(t,e,i,s){if(this.container){if(i==="none"){t&&t.classList.remove("page-hidden"),e&&e!==t&&e.classList.add("page-hidden"),this.container.contains(t)||this.container.appendChild(t);return}t.classList.remove("page-hidden"),t.classList.remove("slide-in-right","slide-out-left","slide-in-left","slide-out-right","fade-in"),e&&e.classList.remove("slide-in-right","slide-out-left","slide-in-left","slide-out-right","fade-in"),i==="slide"?s==="forward"?e?(t.classList.add("slide-in-right"),e.classList.add("slide-out-left")):t.classList.add("fade-in"):s==="back"?(t.classList.add("slide-in-left"),e&&e.classList.add("slide-out-right")):t.classList.add("fade-in"):i==="fade"&&t.classList.add("fade-in"),this.container.contains(t)||this.container.appendChild(t),e&&e!==t&&setTimeout(()=>{e.classList.remove("slide-out-left","slide-out-right"),e.classList.add("page-hidden")},300)}}isHeroPage(t){return t?t==="likedsongs"||t.startsWith("artist:")||t.startsWith("album:")||t.startsWith("playlist:")||t.startsWith("artist-discography:"):!1}};var is=_`
    :host {
        display: block;
        position: absolute;
        top: 0; left: 0; width: 100%;
        height: calc(64px + var(--spf-safe-top, 0px)); /* Grows for Dynamic Island */
        z-index: 100002;
        pointer-events: none; /* Allow clicks through empty areas, but children have pointer-events: auto via .header */
    }
    
    /* --- Header --- */
    .header {
        position: absolute; top: 0; left: 0; right: 0;
        height: calc(64px + var(--spf-safe-top, 0px));
        padding-top: var(--spf-safe-top, 0px); /* Push content below Dynamic Island */
        display: flex; justify-content: space-between; align-items: center;
        padding-left: 24px; padding-right: 24px; padding-bottom: 0;
        background: rgba(18, 18, 18, 1);
        border-bottom: none !important; /* Force removal */
        z-index: 110; 
        box-sizing: border-box;
        
        /* Smooth transition for background/opacity changes */
        transition: background-color 0.3s ease, border-bottom 0.3s ease, backdrop-filter 0.3s ease;
        
        pointer-events: auto;
    }

    .header.transparent {
        background: rgba(18, 18, 18, var(--header-alpha, 0));
        box-shadow: none;
        /* Ensure transition applies here too */
        transition: background-color 0.3s ease, border-bottom 0.3s ease, backdrop-filter 0.3s ease;
    }
    /* Blur only once the header actually has alpha. A resting blur(0px) is
       still an ACTIVE backdrop-filter — iOS WebKit then leaves the content
       region behind the header unpainted (black strip eating the hero
       gradient AND its text). The .blurred class is toggled by the component
       when scrollAlpha > 0. */
    .header.transparent.blurred {
        backdrop-filter: blur(calc(var(--header-alpha, 0) * 20px));
        -webkit-backdrop-filter: blur(calc(var(--header-alpha, 0) * 20px));
    }
    
    .header-center-title {
        position: absolute; left: 50%; transform: translateX(-50%);
        font-weight: 700; font-size: var(--spf-text-lg, 17px); color: var(--spf-text-main);
        opacity: 0; transition: opacity 0.2s ease;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        max-width: 40%; pointer-events: none; z-index: 120; 
    }

    /* Mobile minimal header: grab handle for drag-to-close */
    .header-drag-pill {
        position: absolute; top: 8px; left: 50%; transform: translateX(-50%);
        width: 40px; height: 4px; border-radius: 2px;
        background: rgba(255,255,255,0.4);
        pointer-events: none;
    }

    .header-left, .header-right { display: flex; align-items: center; gap: 16px; }
    .spotify-logo { width: 32px; height: 32px; fill: var(--spf-text-main); }

    /* Account avatar (home only): sits right of the logo / collapse arrow */
    .header-avatar {
        width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
        background-size: cover; background-position: center;
        background-color: var(--spf-bg-card-hover);
        border: none; padding: 0; cursor: default;
        display: flex; align-items: center; justify-content: center;
        color: rgba(255,255,255,0.85);
        transition: transform 0.1s ease, box-shadow 0.2s ease;
    }
    .header-avatar.switchable { cursor: pointer; }
    .header-avatar svg { width: 20px; height: 20px; pointer-events: none; }
    @media (hover: hover) { .header-avatar.switchable:hover { box-shadow: 0 0 0 2px var(--spf-brand); } }
    .header-avatar.switchable:active { transform: scale(0.92); }
    
    .nav-btn {
        background: var(--spf-btn-bg); border: none; color: var(--spf-text-main);
        width: 32px; height: 32px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; transition: background 0.2s; flex-shrink: 0;
    }
    @media (hover: hover) { .nav-btn:hover { background: var(--spf-hover-white); } }
    .nav-btn:active { background: var(--spf-active-white); }
    .nav-btn svg { pointer-events: none; } 
    
    /* --- Search Box --- */
    .search-container {
        display: flex; align-items: center; justify-content: center; 
        background: var(--spf-btn-bg); 
        border-radius: 50%; width: 40px; height: 40px;
        padding: 0; overflow: hidden;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @media (hover: hover) { .search-container:not(.active):hover { background: var(--spf-hover-white); } }
    
    .search-container.active {
        width: 240px; background: var(--spf-text-main); border-radius: 20px;
        padding: 0 8px; justify-content: flex-start; 
    }
    .search-icon-btn {
        width: 40px; height: 40px; 
        background: none; border: none; color: var(--spf-text-main);
        cursor: pointer; padding: 0; margin: 0;
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0; position: relative; z-index: 2; 
    }
    .search-icon-btn svg { transform: translate(1px, 1px); }
    .search-container.active .search-icon-btn { color: #000; width: 32px; }

    .search-input {
        background: transparent !important; border: none; outline: none;
        color: #000; font-size: var(--spf-text-base, 13.5px); opacity: 0; width: 0; min-width: 0; 
        padding: 0; margin: 0; pointer-events: none; position: relative; z-index: 1; 
        transition: opacity 0.2s, width 0.3s ease; line-height: 40px; 
    }
    .search-container.active .search-input {
        opacity: 1; width: 100%; margin-left: 4px; pointer-events: auto;
    }

    /* Mobile home: the header only carries the collapse arrow + avatar, so shrink
       it and top-align its contents. This lets the page content (Pinned) start
       much higher instead of clearing a 64px bar full of empty space. */
    @media (max-width: 768px) {
        :host([avatarvisible]) { height: calc(48px + var(--spf-safe-top, 0px)); }
        :host([avatarvisible]) .header {
            height: calc(48px + var(--spf-safe-top, 0px));
            align-items: flex-start;
            padding-top: calc(var(--spf-safe-top, 0px) + 4px);
        }
    }
`;var Ve=class extends b{static get properties(){return{backButtonVisible:{type:Boolean},centerTitle:{type:String},titleOpacity:{type:Number},searchVisible:{type:Boolean},menuVisible:{type:Boolean},transparent:{type:Boolean},scrollAlpha:{type:Number},searchQuery:{type:String},minimal:{type:Boolean},avatarVisible:{type:Boolean,reflect:!0},avatarUrl:{type:String},avatarSwitchable:{type:Boolean}}}static get styles(){return[$,is]}constructor(){super(),this.backButtonVisible=!1,this.centerTitle="",this.searchVisible=!1,this.menuVisible=!1,this.transparent=!1,this.searchQuery="",this.minimal=!1,this.avatarVisible=!1,this.avatarUrl="",this.avatarSwitchable=!1,this._boundHandleWindowClick=this._handleWindowClick.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("click",this._boundHandleWindowClick)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("click",this._boundHandleWindowClick)}updated(t){if(t.has("searchVisible")&&this.searchVisible){let e=this.shadowRoot.getElementById("search-input");e&&(e.value=this.searchQuery||"",this._focusOnNextOpen&&(this._focusOnNextOpen=!1,setTimeout(()=>e.focus(),300)))}}focusOnOpen(){this._focusOnNextOpen=!0}_handleWindowClick(t){this.menuVisible&&(t.composedPath().includes(this)||this.dispatchEvent(new CustomEvent("close-menu")))}render(){return l`
            <div
                class="header ${this.transparent?"transparent":""} ${this.transparent&&this.scrollAlpha>.01?"blurred":""}"
                style="--header-alpha: ${this.transparent?this.scrollAlpha:1};"
            >
                <div class="header-left">
                    <button
                        class="nav-btn"
                        id="back-btn"
                        style="display: ${this.backButtonVisible?"flex":"none"}"
                        @pointerdown=${t=>t.stopPropagation()}
                        @click=${()=>this.dispatchEvent(new CustomEvent("back-click"))}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                    ${this.minimal&&!this.backButtonVisible?l`
                    <button
                        class="nav-btn"
                        id="collapse-btn"
                        @pointerdown=${t=>t.stopPropagation()}
                        @click=${()=>this.dispatchEvent(new CustomEvent("collapse-click"))}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" /></svg>
                    </button>
                    `:""}
                    ${!this.minimal&&!this.backButtonVisible?l`
                    <svg
                        class="spotify-logo"
                        viewBox="0 0 168 168"
                        @click=${()=>this.dispatchEvent(new CustomEvent("logo-click"))}
                    >
                        <path d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738zM121.49 121.36a4.789 4.789 0 0 1-6.574 1.574c-18.01-11.005-40.69-13.473-67.41-7.36a4.784 4.784 0 0 1-5.78-3.585 4.789 4.789 0 0 1 3.584-5.784c29.175-6.663 54.287-3.889 74.611 8.582a4.785 4.785 0 0 1 1.568 6.573zm9.457-21.207a5.996 5.996 0 0 1-8.22 1.991c-20.59-12.656-51.975-16.316-76.28-8.84a5.995 5.995 0 0 1-7.508-3.968 5.993 5.993 0 0 1 3.967-7.508c27.62-8.49 62.293-4.407 86.048 10.103a5.996 5.996 0 0 1 1.992 8.222zm1.102-22.266c-24.66-14.64-65.388-15.997-88.933-8.845a7.186 7.186 0 0 1-9.004-4.756 7.191 7.191 0 0 1 4.754-9.003c27.094-8.22 72.132-6.655 100.82 10.385a7.195 7.195 0 0 1 2.365 9.855 7.192 7.192 0 0 1-9.855 2.364h-.147z"/>
                    </svg>
                    `:""}
                    ${this.avatarVisible?l`
                    <button
                        class="header-avatar ${this.avatarSwitchable?"switchable":""}"
                        style=${this.avatarUrl?`background-image: url('${this.avatarUrl}')`:""}
                        aria-label=${this.avatarSwitchable?"Switch account":"Account"}
                        @pointerdown=${t=>t.stopPropagation()}
                        @click=${()=>this.dispatchEvent(new CustomEvent("avatar-click"))}
                    >
                        ${this.avatarUrl?"":l`<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`}
                    </button>
                    `:""}
                </div>

                ${this.minimal?l`<div class="header-drag-pill"></div>`:""}

                <div class="header-center-title" style="opacity: ${this.titleOpacity||0}">
                    ${this.centerTitle}
                </div>

                ${this.minimal?"":l`
                <div class="header-center" style="display: ${this.searchVisible?"flex":"none"}"></div>
                <div class="header-right">
                    <div class="search-container ${this.searchVisible?"active":""}" id="search-container">
                        <button
                            class="search-icon-btn"
                            id="search-toggle"
                            @click=${()=>this.dispatchEvent(new CustomEvent("search-toggle-click"))}
                        >
                            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                        </button>
                        <input
                            type="text"
                            class="search-input"
                            id="search-input"
                            placeholder="Search..."
                            @input=${t=>this.dispatchEvent(new CustomEvent("search-input",{detail:t.target.value}))}
                            @keydown=${t=>{t.key==="Enter"&&t.target.blur(),this.dispatchEvent(new CustomEvent("search-keydown",{detail:{key:t.key,value:t.target.value}}))}}
                        >
                    </div>
                    
                    <button 
                        class="nav-btn" 
                        id="queue-btn" 
                        style="margin-left: 4px;"
                        @click=${()=>this.dispatchEvent(new CustomEvent("queue-click"))}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                    </button>

                    <button 
                        class="nav-btn" 
                        id="menu-btn" 
                        style="margin-left:4px;"
                        @click=${()=>this.dispatchEvent(new CustomEvent("menu-click"))}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="5" cy="12" r="2"/></svg>
                    </button>
                    <button 
                        class="nav-btn" 
                        id="close-btn"
                        @click=${()=>this.dispatchEvent(new CustomEvent("close-click"))}
                    >
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    
                    <div class="dropdown-menu ${this.menuVisible?"visible":""}" id="dropdown-menu">
                        <div class="menu-item" @click=${()=>this.dispatchEvent(new CustomEvent("menu-item-click",{detail:"menu-library"}))}>Your Library</div>
                        <div class="menu-item" @click=${()=>this.dispatchEvent(new CustomEvent("menu-item-click",{detail:"menu-device"}))}>Device Playback</div>
                        <div class="menu-item" @click=${()=>this.dispatchEvent(new CustomEvent("menu-item-click",{detail:"menu-accounts"}))}>Switch Accounts</div>
                        <div class="menu-item" @click=${()=>this.dispatchEvent(new CustomEvent("menu-item-click",{detail:"menu-refresh"}))}>Refresh Data</div>
                    </div>
                </div>
                `}
            </div>
        `}};customElements.define("spotify-header",Ve);var ie=_`
    :host {
        display: block;
        position: absolute; 
        top: 63px; /* Overlap by 1px to ensure flush visual join */
        right: 0;
        left: auto;
        /* Force height calculation to avoid bottom:0 ambiguity */
        height: calc(100% - 63px);
        width: 350px;
        z-index: 100001;
        transform: translateX(100%);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
        box-sizing: border-box; 
    }
    
    :host * { box-sizing: border-box; } 

    :host([visible]) {
        transform: translateX(0);
        pointer-events: auto;
    }

    .queue-panel {
        position: relative !important;
        top: 0 !important;
        left: 0 !important;
        height: 100% !important;
        width: 100%;
        background: var(--spf-bg); 
        display: flex !important; 
        flex-direction: column !important;
        overflow: hidden; 
    }

    @media (max-width: 768px) {
        :host {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transform: translate3d(0, 100%, 0);
        }
        :host([visible]) {
            transform: translate3d(0, 0, 0);
        }
        .queue-panel {
            border-left: none;
        }
    }
    
    /* ================================================= */
    /* QUEUE PANEL & MINI PLAYER                         */
    /* ================================================= */

    .queue-header-wrapper {
        flex-shrink: 0;
        background: var(--spf-bg);
        border-bottom: 1px solid var(--spf-border-subtle);
        z-index: 5; 
        position: relative;
        box-shadow: 0 4px 12px rgba(0,0,0,0.4); 
        padding: 0 !important; 
        overflow: visible;
    }

    .queue-now-playing-row {
        position: relative;
        padding: 16px 16px 8px 16px; /* Adjusted padding */
        display: flex;
        flex-direction: column;
    }

    .queue-item-content { 
        display: flex; 
        align-items: center; 
        gap: 16px; 
    }

    .queue-art.large { 
        width: 56px; 
        height: 56px; 
        box-shadow: 0 4px 12px rgba(0,0,0,0.3); 
        border-radius: 4px;
        background-size: cover;
        background-position: center;
        flex-shrink: 0;
        background-color: var(--spf-skeleton-bg);
        animation: imageFadeIn 0.5s ease-out;
    }

    @keyframes imageFadeIn {
        0% { opacity: 0; transform: scale(0.95); }
        100% { opacity: 1; transform: scale(1); }
    }

    .queue-info { 
        flex: 1; 
        overflow: hidden; 
        display: flex; 
        flex-direction: column; 
        justify-content: center; 
        margin-right: 12px; 
        gap: 2px; 
        min-width: 0;
    }

    .queue-title { 
        font-size: var(--spf-text-base, 13.5px); 
        font-weight: 700; 
        color: var(--spf-text-main); 
        white-space: nowrap; 
        overflow: hidden; 
        text-overflow: ellipsis;
        line-height: 1.2;
    }
    .queue-title.active { color: var(--spf-brand); }

    .queue-artist {
        font-size: var(--spf-text-sm, 12px);
        color: var(--spf-text-sub);
        white-space: nowrap; 
        overflow: hidden; 
        text-overflow: ellipsis;
        line-height: 1.2;
    }

    .queue-device-row {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: var(--spf-text-xs, 11px); 
        font-weight: 500;
        color: var(--spf-brand); /* Green */
        opacity: 0.9;
        margin-top: 2px;
        line-height: 1.2;
        white-space: nowrap; 
        overflow: hidden; 
        text-overflow: ellipsis;
    }

    .queue-device-row svg {
        width: 12px; height: 12px;
        fill: currentColor;
        flex-shrink: 0;
    }

    .device-name-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* --- Big Play Button --- */
    .queue-play-btn.large-side-btn {
        width: 48px; height: 48px;
        border-radius: 50%;
        background: var(--spf-text-main); 
        color: black; 
        border: none;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; 
        transition: transform 0.2s;
        flex-shrink: 0;
    }

    .queue-play-btn.large-side-btn:hover {
        transform: scale(1.05);
        background: var(--spf-brand-hover);
    }

    .queue-play-btn.large-side-btn svg { fill: black; width: 28px; height: 28px; }

    /* --- Controls Row --- */
    .queue-mini-controls {
        display: flex;
        align-items: center;
        width: 100%;
        height: 48px;       
        margin-top: 0;    
        padding: 0 8px;    
        box-sizing: border-box;
        justify-content: space-between; 
    }

    .volume-control-container {
        display: flex; align-items: center;
        width: 100%; height: 48px; margin-top: 4px; padding: 0 8px; box-sizing: border-box;
        justify-content: center; animation: fadeIn 0.2s ease;
    }

    .mini-btn {
        background: transparent; 
        border: none; 
        color: var(--spf-text-sub); 
        cursor: pointer; 
        padding: 8px;
        display: flex; 
        align-items: center; 
        justify-content: center;
        transition: color 0.2s, transform 0.2s;
    }

    .mini-btn:hover { color: var(--spf-text-main); transform: scale(1.1); }
    .mini-btn svg { width: 20px; height: 20px; } /* Slightly smaller secondary controls */
    .mini-btn.is-favorite { color: var(--spf-brand); }
    .mini-btn.is-favorite svg { fill: var(--spf-brand); }

    .vol-icon {
        display: flex; align-items: center; justify-content: center;
        width: 24px; color: var(--spf-text-sub);
    }
    
    .volume-slider {
        flex: 1; 
        -webkit-appearance: none;
        height: 4px;
        background: rgba(255,255,255,0.2);
        border-radius: 2px;
        outline: none;
        margin: 0 12px; 
    }

    .volume-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 14px; height: 14px;
        background: #fff;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 6px rgba(0,0,0,0.4);
    }

    /* --- Progress Bar --- */
    .queue-progress-container {
        position: absolute; 
        bottom: 0;          
        left: 0;            
        width: 100%;        
        height: 2px;        
        margin: 0;
        padding: 0;
        background: rgba(255, 255, 255, 0.1);
        z-index: 10;
    }
    
    .queue-progress-bar {
        height: 100%;
        background: var(--spf-brand); /* Green progress */
        width: 0%;
        border-radius: 0 2px 2px 0;
        transition: width 0.5s linear;
    }

    .queue-progress-bar::after {
        content: ''; position: absolute; right: -3px; top: -3px;
        width: 8px; height: 8px; background: var(--spf-text-main);
        border-radius: 50%; opacity: 0; transition: opacity 0.2s;
    }

    .queue-header-wrapper:hover .queue-progress-bar::after { opacity: 1; }

    .queue-list { 
        flex: 1 1 auto; /* Grow and shrink as needed */
        min-height: 0;
        overflow-y: auto; 
        padding: 0 0 16px 0; 
        background: var(--spf-bg);
    }

    .queue-item {
        display: flex; 
        align-items: center; 
        padding: 8px 16px; 
        gap: 12px; 
        cursor: pointer;
        transition: background 0.2s;
        border-bottom: 1px solid rgba(255,255,255,0.03);
    }

    @media (hover: hover) { .queue-item:hover { background: var(--spf-border-subtle); } }

    .queue-art { 
        width: 40px; height: 40px; 
        border-radius: 4px; 
        background-size: cover; 
        background-position: center; 
        flex-shrink: 0;
        background-color: var(--spf-skeleton-bg);
    }

    .queue-row-play-btn {
        background: transparent; border: none; color: var(--spf-text-sub);
        cursor: pointer; padding: 8px; display: flex; align-items: center; justify-content: center;
        transition: color 0.2s, transform 0.2s;
    }

    .queue-row-play-btn:hover { color: var(--spf-text-main); transform: scale(1.1); }
    .queue-row-play-btn svg { width: 24px; height: 24px; }

    /* Per-row "..." menu button (queue / recent rows) */
    .row-menu-btn {
        flex-shrink: 0; width: 36px; height: 36px;
        background: transparent; border: none; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        color: var(--spf-text-sub);
    }
    .row-menu-btn:hover { color: var(--spf-text-main); }
    .row-menu-btn svg { fill: currentColor; }

    .queue-empty-state {
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        height: 200px; text-align: center; opacity: 0.5;
    }

    .empty-text { margin-top: 16px; font-weight: 700; font-size: var(--spf-text-md, 15px); }
    .empty-sub { font-size: var(--spf-text-base, 13.5px); }
    
    .queue-section-label { 
        padding: 12px 16px 4px; 
        font-size: var(--spf-text-sm, 12px); 
        font-weight: 700; 
        color: var(--spf-text-sub); 
        text-transform: uppercase; 
        letter-spacing: 1px; 
    }
`;var qe=class extends b{static get properties(){return{value:{type:Number},min:{type:Number},max:{type:Number},step:{type:Number},disabled:{type:Boolean,reflect:!0}}}static get styles(){return _`
            :host {
                display: block;
                width: 100%;
                height: 100%;
                position: relative;
                cursor: pointer;
                user-select: none;
                touch-action: none; 
            }

            .slider-container {
                position: relative;
                width: 100%;
                height: 100%;
                border-radius: 12px; /* Inherit or force? Let's assume container handles outer radius, but slider needs to fill */
                overflow: hidden;
            }

            /* The 'Track' background is assumed to be the container background provided by parent, 
               but we can add a subtle internal track if needed. 
               For now, we rely on the parent wrapper for the main 'card' background 
               or we make this component FULLY handle the visual.
               
               Plan says: "Encapsulate the 'Tile Card' styles (track, fill, marker)".
            */
            
            /* Disable transition during drag to prevent jank */
            .slider-container.dragging .slider-fill {
                transition: none;
            }

            .slider-track {
                position: absolute;
                top: 0; left: 0;
                width: 100%; height: 100%;
                background: transparent; /* Parent sets the inactive color */
            }

            .slider-fill {
                position: absolute;
                top: 0; left: 0;
                height: 100%;
                background: var(--spf-brand, #1ed760);
                opacity: 0.9;
                transition: width 0.1s linear;
                /* Add a marker at the end */
            }

            .slider-marker {
                position: absolute;
                top: 50%;
                right: 6px; /* Offset from end of fill */
                transform: translateY(-50%);
                width: 4px;
                height: 20px;
                background: rgba(0,0,0,0.5);
                border-radius: 2px;
                pointer-events: none;
            }

            :host([disabled]) {
                cursor: default;
            }

            :host([disabled]) .slider-fill {
                opacity: 0.35;
            }

            :host([disabled]) .native-input {
                cursor: default;
                pointer-events: none;
            }

            /* Native input overlay for accessibility and interaction */
            .native-input {
                position: absolute;
                top: 0; left: 0;
                width: 100%; height: 100%;
                opacity: 0;
                margin: 0;
                padding: 0;
                cursor: pointer;
                z-index: 2;
            }
        `}constructor(){super(),this.value=0,this.min=0,this.max=100,this.step=1,this.disabled=!1,this._isDragging=!1}_handleInput(t){t.stopPropagation(),!this.disabled&&(this.value=Number(t.target.value),this.dispatchEvent(new CustomEvent("input",{detail:{value:this.value},bubbles:!0,composed:!0})))}_handleChange(t){t.stopPropagation(),!this.disabled&&(this.value=Number(t.target.value),this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value},bubbles:!0,composed:!0})))}_handlePointerDown(){this.disabled||(this._isDragging=!0,this.requestUpdate())}_handlePointerUp(){this._isDragging=!1,this.requestUpdate()}render(){let t=this.max-this.min,e=t===0?0:(this.value-this.min)/t*100;return l`
            <div class="slider-container ${this._isDragging?"dragging":""}">
                <div class="slider-track"></div>
                <div class="slider-fill" style="width: ${e}%">
                    <div class="slider-marker"></div>
                </div>
                <input 
                    type="range" 
                    class="native-input"
                    .min=${this.min} 
                    .max=${this.max} 
                    .step=${this.step} 
                    .value=${this.value}
                    ?disabled=${this.disabled}
                    @input=${this._handleInput}
                    @change=${this._handleChange}
                    @pointerdown=${this._handlePointerDown}
                    @pointerup=${this._handlePointerUp}
                    @pointercancel=${this._handlePointerUp}
                >
            </div>
        `}};customElements.define("spotify-slider",qe);var Pt=class a{constructor(t,e,i){this.hass=t,this.config=e||{},this.storageManager=i,this._storageKey="device_manager",this._pendingWrite=null,this._now=()=>Date.now()}static PENDING_WRITE_MS=5e3;updateHass(t){this.hass=t,this.storageManager&&this.storageManager.updateHass(t)}checkAvailability(){return!!this.storageManager}get storageEntityId(){return this.storageManager?.sensorEntity||null}async _loadData(){return this._readData()}_readData(){if(!this.checkAvailability())return{settings:{version:1},devices:[]};try{let t=this.storageManager.getData(this._storageKey),e=this._pendingWrite;if(e)if(this._now()>e.until||JSON.stringify(t)===e.json)this._pendingWrite=null;else return JSON.parse(e.json);if(t&&!Array.isArray(t)&&typeof t=="object")return{settings:t.settings||{version:1},devices:Array.isArray(t.devices)?t.devices:[]};if(Array.isArray(t)){let i=t.find(r=>r.type==="SETTINGS")||{version:1},s=t.filter(r=>r.type!=="SETTINGS");return{settings:i,devices:s}}return{settings:{version:1},devices:[]}}catch(t){return console.error("[DeviceManager] Load failed:",t),{settings:{version:1},devices:[]}}}async getDevices(){return(await this._loadData()).devices}async getSettings(){return(await this._loadData()).settings}async saveDevices(t){let e=await this._loadData();return await this._save({settings:e.settings,devices:t})}async setDefault(t){let i=(await this.getDevices()).map(s=>({...s,is_default:s.id===t}));return await this.saveDevices(i)}async setBackup(t){let i=(await this.getDevices()).map(s=>({...s,is_backup:s.id===t?!s.is_backup:!1}));return await this.saveDevices(i)}async add(t){let e=await this.getDevices();if(e.find(s=>s.id===t.id))return{success:!1,error:"Device already exists"};let i={id:t.id,name:t.name,type:t.type||"Speaker",is_default:!1,is_backup:!1,visible:!0};return await this.saveDevices([...e,i])}async remove(t){let i=(await this.getDevices()).filter(s=>s.id!==t);return await this.saveDevices(i)}async update(t,e){let i=await this.getDevices(),s=i.findIndex(r=>r.id===t);return s===-1?{success:!1,error:"Device not found"}:(i[s]={...i[s],...e},await this.saveDevices(i))}async updateSetting(t,e){let i=await this._loadData(),s={...i.settings,[t]:e,last_updated:Date.now()};return await this._save({settings:s,devices:i.devices})}async rename(t,e){return await this.update(t,{name:e})}displayName(t,e){return t&&this._readData().devices.find(s=>s.id===t)?.name||e}async fetchMergedDevices(t,e={},i={}){let[s]=await Promise.all([t.fetchSpotifyPlus("get_spotify_connect_devices",{refresh:!!i.refresh}),this._refreshVolumeCapabilities(t)]),r=W(s);return await this.getMergedDevices(r,e,i)}async _refreshVolumeCapabilities(t){try{let e=await t.fetchSpotifyPlus("get_player_devices",{},!0,!1),i=Yi(e);if(!i.length)return;this._volumeCapability||(this._volumeCapability=new Map),i.forEach(s=>{let r=s.id||s.Id;r&&this._volumeCapability.set(r,s.supports_volume!==!1)})}catch(e){q("[DeviceManager] Volume capability refresh failed (non-fatal):",e)}}getVolumeCapability(t){return!t||!this._volumeCapability||!this._volumeCapability.has(t)?null:this._volumeCapability.get(t)}clearVolumeCapabilities(){this._volumeCapability=null}async getMergedDevices(t=[],e={},i={}){let s=await this.getDevices(),r=await this.getSettings(),n=new Map,o=new Set;s.forEach(h=>{n.set(h.id,h),o.add(h.id)});let c=new Map,d=e.sp_device_id||null,p=e.sp_device_name||e.source||null,u=d,g=null;if(t.forEach(h=>{c.set(h.id||h.Id,h),(h.is_active||h.IsActive)&&!u&&(u=h.id||h.Id)}),!u&&p){let h=t.find(m=>(m.name||m.Name)===p);if(h&&(u=h.id||h.Id),!u){let m=s.find(x=>x.name===p);m&&(u=m.id)}}let f=[];if(s.forEach(h=>{let m=c.get(h.id),x=h.id===u;x&&(g=h),f.push({id:h.id,name:h.name,type:h.type,brand:Be(m)||h.brand||null,isActive:x,isSaved:!0,isOnline:!!m,is_default:h.is_default,is_backup:h.is_backup,visible:h.visible!==!1,supportsVolume:this.getVolumeCapability(h.id)})}),t.forEach(h=>{let m=Q(h);if(!o.has(m.id)){let x=m.id===u;x&&(g=h),f.push({...m,isActive:x,isOnline:!0,visible:!0,supportsVolume:this.getVolumeCapability(m.id)})}}),r.hide_connect_devices&&!i.showHidden&&(f=f.filter(h=>h.isSaved===!0||h.isActive)),r.hide_offline_devices&&(f=f.filter(h=>h.isOnline===!0||h.isActive||h.isSaved===!1)),u){let h=f.findIndex(m=>m.id===u);if(h>0){let[m]=f.splice(h,1);m.isActive=!0,f.unshift(m)}else h===-1&&p&&f.unshift({id:u||"custom-active",name:p,type:"Speaker",isActive:!0,isSaved:!1,isOnline:!0,supportsVolume:this.getVolumeCapability(u)})}return f}async _save(t){if(!this.checkAvailability())return{success:!1};try{let e=await this.storageManager.saveData(this._storageKey,t);return(!e||e.success!==!1)&&(this._pendingWrite={json:JSON.stringify(t),until:this._now()+a.PENDING_WRITE_MS}),e}catch(e){return console.error("[DeviceManager] Save failed:",e),{success:!1,error:e.message}}}};var se="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",lr="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",ss="M8 5v14l11-7z",cr="M6 19h4V5H6v14zm8-14v14h4V5h-4z";function ns(a){return a?l`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="${se}"/></svg>`:l`<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="${se}"/></svg>`}function it(a,t=18){let e=a?"currentColor":"none";return t===28?l`<svg height="28" width="28" viewBox="0 0 24 24" fill="${e}" stroke="currentColor" stroke-width="2"><path d="${se}"/></svg>`:l`<svg width="18" height="18" fill="${e}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="${se}"/></svg>`}var os=l`<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="${lr}"/></svg>`,H=l`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="5" cy="12" r="2"/></svg>`;function Y(a=null){return a?l`<svg height="${a}" width="${a}" viewBox="0 0 24 24" fill="currentColor"><path d="${ss}"/></svg>`:l`<svg viewBox="0 0 24 24" fill="currentColor"><path d="${ss}"/></svg>`}function re(a=28){return l`<svg height="${a}" width="${a}" viewBox="0 0 24 24" fill="currentColor"><path d="${cr}"/></svg>`}function j(a=18){return l`<svg width="${a}" height="${a}" viewBox="0 0 24 24" fill="var(--spf-brand)"><rect x="4" y="10" width="3" height="10"><animate attributeName="height" values="5;10;3;10;5" dur="1s" repeatCount="indefinite" /><animate attributeName="y" values="14;9;16;9;14" dur="1s" repeatCount="indefinite" /></rect><rect x="10" y="5" width="3" height="15"><animate attributeName="height" values="10;15;5;15;10" dur="1s" repeatCount="indefinite" /><animate attributeName="y" values="9;4;14;4;9" dur="1s" repeatCount="indefinite" /></rect><rect x="16" y="8" width="3" height="12"><animate attributeName="height" values="8;12;4;12;8" dur="1s" repeatCount="indefinite" /><animate attributeName="y" values="11;7;15;7;11" dur="1s" repeatCount="indefinite" /></rect></svg>`}var va=l`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`,ba=l`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z"/></svg>`,ya=l`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`,_a=l`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`,ls=l`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>`,cs=l`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"/></svg>`,ds=l`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 7h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2z"/></svg>`,xa=l`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>`,wa=l`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,ae=l`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>`,ka=l`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,rs=l`<svg viewBox="0 0 24 24"><path d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-2 14H5V6h14v12z"/></svg>`,as=l`<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>`;function st(a,t="connect"){let e=(a||"").toLowerCase();return t==="manager"?e==="computer"?l`<svg viewBox="0 0 24 24"><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/></svg>`:e==="smartphone"||e==="phone"?l`<svg viewBox="0 0 24 24"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>`:e==="tablet"?rs:e==="castaudio"||e==="speaker"?as:e==="tv"?l`<svg viewBox="0 0 24 24"><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L22 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/></svg>`:e==="avr"||e==="stb"||e==="audiodongle"?l`<svg viewBox="0 0 24 24"><path d="M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm6 0h-2V5h2v2zm6 0h-2V5h2v2z"/></svg>`:as:e==="computer"?l`<svg viewBox="0 0 24 24"><path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/></svg>`:e==="smartphone"||e==="phone"?l`<svg viewBox="0 0 24 24"><path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V5h10v14z"/></svg>`:e==="tablet"?rs:e==="tv"?l`<svg viewBox="0 0 24 24"><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/></svg>`:l`<svg viewBox="0 0 24 24"><path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 2.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM12 19a4 4 0 110-8 4 4 0 010 8zm0-2a2 2 0 100-4 2 2 0 000 4z"/></svg>`}var Oe=class extends b{static get properties(){return{visible:{type:Boolean,reflect:!0},desktopModal:{type:Boolean,reflect:!0,attribute:"desktop-modal"},closeOnEscape:{type:Boolean,attribute:"close-on-escape"}}}static get styles(){return _`
            :host {
                position: fixed; inset: 0;
                z-index: var(--spf-sheet-z, 215000);
                pointer-events: none;
            }
            :host([visible]) { pointer-events: auto; }

            .backdrop {
                position: absolute; inset: 0;
                background: rgba(0,0,0,0.5);
                opacity: 0; visibility: hidden;
                transition: opacity 0.32s ease, visibility 0s linear 0.35s;
            }
            :host([visible]) .backdrop {
                opacity: 1; visibility: visible;
                transition: opacity 0.32s ease;
            }

            /* Closed panels hide via translateY(100%) below the wrapper — but
               translated content is still painted, and a programmatic scroll
               of an overflow:hidden ancestor (e.g. focus() revealing an input)
               can drag it into view. visibility:hidden (delayed so the
               slide-out still animates) makes closed sheets unrevealable. */
            .sheet {
                position: absolute; left: 0; right: 0; bottom: 0;
                /* Never climb into the top safe area (notch / Dynamic Island):
                   leave the inset plus 24px of breathing room above the sheet. */
                max-height: min(var(--spf-sheet-max-h, 88%), calc(100% - var(--spf-safe-top, 0px) - 24px));
                display: flex; flex-direction: column;
                background: #181818;
                border-radius: 16px 16px 0 0;
                box-sizing: border-box;
                padding: 8px 20px calc(20px + var(--spf-safe-bottom, 0px));
                color: #fff;
                box-shadow: 0 -8px 40px rgba(0,0,0,0.5);
                transform: translateY(100%);
                visibility: hidden;
                transition: transform 0.42s cubic-bezier(0.16, 1, 0.3, 1), visibility 0s linear 0.45s;
                will-change: transform;
            }
            :host([visible]) .sheet {
                transform: translateY(0);
                visibility: visible;
                transition: transform 0.42s cubic-bezier(0.16, 1, 0.3, 1);
            }

            /* ---- Desktop/tablet popup variant (opt-in via desktop-modal) ---- */
            @media (min-width: 769px) {
                :host([desktop-modal]) .sheet {
                    left: 50%; right: auto; bottom: auto; top: 50%;
                    width: min(480px, 92%);
                    max-height: min(var(--spf-sheet-max-h, 88%), 85%);
                    border-radius: 16px;
                    padding: 8px 20px 20px;
                    box-shadow: 0 25px 60px rgba(0,0,0,0.8);
                    border: 1px solid rgba(255,255,255,0.1);
                    transform: translate(-50%, -48%) scale(0.97);
                    opacity: 0;
                    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease, visibility 0s linear 0.3s;
                }
                :host([desktop-modal][visible]) .sheet {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 1;
                    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
                }
                :host([desktop-modal]) .grip-area { display: none; }
            }

            .grip-area {
                flex-shrink: 0;
                display: flex; justify-content: center;
                padding: 6px 0 14px;
                cursor: grab;
                touch-action: none; /* let us own the vertical drag */
            }
            .grip-area:active { cursor: grabbing; }
            .grip {
                width: 36px; height: 4px; border-radius: 3px;
                background: rgba(255,255,255,0.3);
            }

            .content {
                display: flex; flex-direction: column;
                flex: 1; min-height: 0;
                overflow: hidden;
            }
        `}constructor(){super(),this.visible=!1,this.desktopModal=!1,this.closeOnEscape=!1,this._onKeyDown=this._onKeyDown.bind(this),this._onDown=this._onDown.bind(this),this._onMove=this._onMove.bind(this),this._onUp=this._onUp.bind(this)}get _isModal(){return this.desktopModal&&typeof window<"u"&&window.matchMedia("(min-width: 769px)").matches}updated(t){(t.has("visible")||t.has("closeOnEscape"))&&(window.removeEventListener("keydown",this._onKeyDown),this.visible&&this.closeOnEscape&&window.addEventListener("keydown",this._onKeyDown))}_onKeyDown(t){t.key!=="Escape"||t.defaultPrevented||(t.preventDefault(),this._close())}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._onKeyDown),this._dragging=!1,window.removeEventListener("pointermove",this._onMove),window.removeEventListener("pointerup",this._onUp),window.removeEventListener("pointercancel",this._onUp)}_close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}_onDown(t){this._isModal||(this._sheet=this.shadowRoot.querySelector(".sheet"),this._backdrop=this.shadowRoot.querySelector(".backdrop"),this._sheet&&(this._startY=t.clientY,this._delta=0,this._dragging=!0,this._sheet.style.transition="none",window.addEventListener("pointermove",this._onMove,{passive:!1}),window.addEventListener("pointerup",this._onUp),window.addEventListener("pointercancel",this._onUp)))}_onMove(t){if(!(!this._dragging||!this._sheet)&&(t.preventDefault(),this._delta=Math.max(0,t.clientY-this._startY),this._sheet.style.transform=`translateY(${this._delta}px)`,this._backdrop)){let e=this._sheet.offsetHeight||500;this._backdrop.style.opacity=String(Math.max(0,1-this._delta/e))}}_onUp(){if(!this._dragging)return;this._dragging=!1,window.removeEventListener("pointermove",this._onMove),window.removeEventListener("pointerup",this._onUp),window.removeEventListener("pointercancel",this._onUp);let t=this._sheet,e=this._backdrop;if(!t)return;let i=t.offsetHeight||500;t.style.transition="",this._delta>Math.min(140,i*.3)?(t.style.transform="translateY(100%)",e&&(e.style.opacity="0"),this._close(),setTimeout(()=>{t.style.transform="",e&&(e.style.opacity="")},420)):(t.style.transform="",e&&(e.style.opacity=""))}render(){return l`
            <div class="backdrop" @click=${this._close}></div>
            <div class="sheet" role="dialog" aria-modal="true">
                <div class="grip-area" @pointerdown=${this._onDown}>
                    <div class="grip"></div>
                </div>
                <div class="content"><slot></slot></div>
            </div>
        `}};customElements.define("spotify-bottom-sheet",Oe);var ne=class extends b{static get styles(){return _`
            :host {
                display: contents;
                --spf-sheet-max-h: 96%;
                /* Below the context menu (215000) and alerts/toasts (230000). */
                --spf-sheet-z: 212000;
            }

            /* ---- Header ---- */
            .head {
                display: flex; align-items: center; justify-content: space-between;
                flex-shrink: 0;
                padding-bottom: 4px;
            }
            .title {
                margin: 0;
                font-size: var(--spf-text-xl, 22px); font-weight: 900;
                color: var(--spf-text-main, #fff);
            }
            .done {
                background: none; border: none; cursor: pointer;
                color: var(--spf-text-main, #fff);
                font: inherit; font-size: var(--spf-text-md, 15px); font-weight: 700;
                min-height: 44px; padding: 0 4px;
            }
            .done:active { opacity: 0.6; }

            /* ---- Body ---- */
            .body {
                flex: 1; min-height: 0;
                overflow-y: auto; overflow-x: hidden;
                -webkit-overflow-scrolling: touch;
                padding-bottom: 8px;
            }

            .label {
                display: flex; align-items: center; justify-content: space-between;
                margin: 22px 0 4px;
                font-size: var(--spf-text-xs, 11px); font-weight: 700;
                letter-spacing: 0.08em; text-transform: uppercase;
                color: var(--spf-text-sub, #b3b3b3);
                min-height: 20px;
            }
            .label:first-child { margin-top: 4px; }

            .empty {
                text-align: center;
                color: var(--spf-text-sub, #b3b3b3);
                font-size: var(--spf-text-base, 13.5px);
                padding: 28px 12px;
                line-height: 1.5;
            }

            /* ---- Rows ---- */
            .row {
                display: flex; align-items: center;
                min-height: 60px;
                border-bottom: 1px solid rgba(255,255,255,0.08);
                position: relative;
                transition: transform 0.15s ease;
            }
            .row.dragging {
                transition: none;
                background: #282828;
                box-shadow: 0 8px 24px rgba(0,0,0,0.5);
                border-radius: 8px;
                border-bottom-color: transparent;
                z-index: 1;
            }
            .row.dragging .grip { cursor: grabbing; }
            .grip:active { cursor: grabbing; }
            .grip, .more {
                flex-shrink: 0;
                width: 44px; height: 44px;
                background: none; border: none; padding: 0;
                color: var(--spf-text-sub, #b3b3b3);
                display: flex; align-items: center; justify-content: center;
                cursor: pointer;
                -webkit-tap-highlight-color: transparent;
            }
            .grip { touch-action: none; cursor: grab; }
            @media (hover: hover) { .more:hover { color: #fff; } }
            .grip svg, .more svg { width: 22px; height: 22px; fill: currentColor; }

            .text { flex: 1; min-width: 0; padding: 8px 0; }
            .name {
                font-size: var(--spf-text-md, 15px); font-weight: 700;
                color: var(--spf-text-main, #fff);
                white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                cursor: text;
            }
            .sub {
                display: flex; align-items: center; gap: 4px;
                margin-top: 2px;
                font-size: var(--spf-text-sm, 12px);
                color: var(--spf-text-sub, #b3b3b3);
                white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            }
            .sub.default { color: var(--spf-brand, #1ed760); }
            .sub svg { width: 12px; height: 12px; fill: currentColor; flex-shrink: 0; }

            .name-input {
                width: 100%; box-sizing: border-box;
                background: transparent;
                border: none; border-bottom: 1px solid rgba(255,255,255,0.35);
                color: var(--spf-text-main, #fff);
                font: inherit; font-size: var(--spf-text-md, 15px); font-weight: 700;
                padding: 0 0 2px; margin: 0;
                outline: none;
                caret-color: var(--spf-brand, #1ed760);
            }
            .name-input:focus { border-bottom-color: var(--spf-brand, #1ed760); }

            /* ---- Settings ---- */
            .set {
                display: flex; align-items: center; gap: 12px;
                min-height: 64px;
                border-bottom: 1px solid rgba(255,255,255,0.08);
            }
            .set.child { padding-left: 16px; }
            .set-text { flex: 1; min-width: 0; padding: 10px 0; }
            .set-label { font-size: var(--spf-text-md, 15px); font-weight: 700; color: var(--spf-text-main, #fff); }
            .set-desc { font-size: var(--spf-text-sm, 12px); color: var(--spf-text-sub, #b3b3b3); margin-top: 2px; line-height: 1.35; }

            .switch {
                position: relative; flex-shrink: 0;
                width: 44px; height: 26px;
                display: block; cursor: pointer;
                /* 44px tap target */
                padding: 9px 0; margin: -9px 0;
                box-sizing: content-box;
            }
            .switch input { position: absolute; opacity: 0; width: 0; height: 0; margin: 0; }
            .knob {
                position: absolute; left: 0; top: 9px;
                width: 44px; height: 26px; border-radius: 13px;
                background: #535353;
                transition: background 0.2s;
            }
            .knob::before {
                content: ""; position: absolute;
                left: 2px; top: 2px; width: 22px; height: 22px; border-radius: 50%;
                background: #fff;
                transition: transform 0.2s;
            }
            .switch input:checked + .knob { background: var(--spf-brand, #1ed760); }
            .switch input:checked + .knob::before { transform: translateX(18px); }

            /* ---- Network devices ---- */
            .refresh {
                width: 44px; height: 44px;
                background: none; border: none; padding: 0; cursor: pointer;
                color: var(--spf-text-sub, #b3b3b3);
                display: flex; align-items: center; justify-content: center;
            }
            .refresh svg { width: 20px; height: 20px; fill: currentColor; }
            .refresh.spinning svg { animation: spin 1s linear infinite; }
            @keyframes spin { to { transform: rotate(360deg); } }
            .ic {
                flex-shrink: 0; width: 44px;
                display: flex; align-items: center; justify-content: center;
                color: rgba(255,255,255,0.85);
            }
            .ic svg { width: 26px; height: 26px; fill: currentColor; }
            /* 44px tap target; the visible pill is drawn by ::before inside it. */
            .add {
                position: relative; flex-shrink: 0;
                min-height: 44px; margin-left: 8px; padding: 0 14px;
                background: none; border: none;
                color: var(--spf-text-main, #fff);
                font: inherit; font-size: var(--spf-text-sm, 12px); font-weight: 700;
                cursor: pointer;
                -webkit-tap-highlight-color: transparent;
            }
            .add::before {
                content: ""; position: absolute; left: 0; right: 0; top: 7px; bottom: 7px;
                border: 1px solid rgba(255,255,255,0.3); border-radius: 999px;
            }
            .add:active::before { background: rgba(255,255,255,0.12); }
            @media (hover: hover) { .add:hover::before { border-color: #fff; } }

            /* ---- Remove all ---- */
            .reset {
                width: 100%; min-height: 56px; margin-top: 12px;
                background: none; border: none; cursor: pointer;
                color: #f15e6c;
                font: inherit; font-size: var(--spf-text-base, 13.5px); font-weight: 700;
            }
            .reset:active { opacity: 0.6; }
        `}static get properties(){return{hass:{type:Object},deviceManager:{type:Object},api:{type:Object},visible:{type:Boolean},_savedDevices:{type:Array,state:!0},_liveDevices:{type:Array,state:!0},_isLoadingLive:{type:Boolean,state:!0},_settings:{type:Object,state:!0},_editingId:{type:String,state:!0},_dragIndex:{type:Number,state:!0}}}constructor(){super(),this._savedDevices=[],this._liveDevices=[],this._isLoadingLive=!1,this._settings={},this._editingId=null,this._dragIndex=null}updated(t){if(t.has("deviceManager")||t.has("visible")&&this.visible)this.refreshSaved();else if(t.has("hass")&&this.deviceManager&&this.hass){let e=this.deviceManager.storageEntityId,i=t.get("hass");if(i&&e){let s=i.states[e],r=this.hass.states[e];s!==r&&this.refreshSaved()}}t.has("visible")&&this.visible&&this.refreshLive(),t.has("visible")&&!this.visible&&(this._editingId=null,this._cancelDrag())}disconnectedCallback(){super.disconnectedCallback(),this._cancelDrag()}async refreshSaved(){this.deviceManager&&(this._savedDevices=await this.deviceManager.getDevices(),this._settings=await this.deviceManager.getSettings())}async refreshLive(){if(this.api){this._isLoadingLive=!0;try{let t=await this.api.fetchSpotifyPlus("get_spotify_connect_devices",{refresh:!0});this._liveDevices=W(t).map(Q)}catch(t){console.error("Failed to fetch live devices",t)}finally{this._isLoadingLive=!1}}}async handleToggleSetting(t){let e=t.target.getAttribute("data-key"),i=t.target.checked;this._settings={...this._settings||{},[e]:i},this.deviceManager&&await this.deviceManager.updateSetting(e,i)}async handleAdd(t){if(!this.deviceManager)return;let e={id:t.id,name:t.name,type:t.type||"Speaker",is_default:!1,is_backup:!1,visible:!0};this._savedDevices.find(i=>i.id===t.id)||(this._savedDevices=[...this._savedDevices,e],await this.deviceManager.saveDevices(this._savedDevices))}async handleReset(){this.deviceManager&&this.dispatchEvent(new CustomEvent("show-alert",{detail:{title:"Remove all saved devices",message:"This removes every saved device and its order. This can't be undone.",confirmText:"Remove all",onConfirm:async()=>{this._savedDevices=[],this.requestUpdate(),await this.deviceManager.saveDevices([])}},bubbles:!0,composed:!0}))}_openRowMenu(t,e){t.stopPropagation(),this.dispatchEvent(new CustomEvent("open-context-menu",{detail:{header:{name:e.name,subtitle:ct(e.type),icon:st(e.type)},items:[{id:"dm-default",label:e.is_default?"Default device":"Set as default",icon:"pin"},{id:"dm-rename",label:"Rename",icon:"pencil"},{id:"dm-remove",label:"Remove",icon:"trash",danger:!0}],anchor:t.currentTarget.getBoundingClientRect(),onAction:i=>this._onRowAction(i,e)},bubbles:!0,composed:!0}))}async _onRowAction(t,e){if(this.deviceManager)if(t==="dm-default"){if(e.is_default)return;this._savedDevices=this._savedDevices.map(i=>({...i,is_default:i.id===e.id})),await this.deviceManager.saveDevices(this._savedDevices)}else t==="dm-rename"?this._startRename(e):t==="dm-remove"&&(this._savedDevices=this._savedDevices.filter(i=>i.id!==e.id),await this.deviceManager.saveDevices(this._savedDevices))}async _startRename(t){this._editingId=t.id,await this.updateComplete;let e=this.shadowRoot.querySelector(".name-input");e&&(e.focus({preventScroll:!0}),e.select())}async _commitRename(t,e){if(this._editingId!==t.id)return;let i=Zi(e,t.name);this._editingId=null,!(!i||!this.deviceManager)&&(this._savedDevices=this._savedDevices.map(s=>s.id===t.id?{...s,name:i}:s),await this.deviceManager.saveDevices(this._savedDevices))}_renderRenameInput(t){return l`
            <input class="name-input" type="text" maxlength="100" .value=${t.name}
                @keydown=${e=>{e.key==="Enter"?(e.preventDefault(),this._commitRename(t,e.target.value)):e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),this._editingId=null)}}
                @blur=${e=>this._commitRename(t,e.target.value)}>
        `}_rowEls(){return[...this.shadowRoot.querySelectorAll(".row[data-index]")]}_recordMids(){this._dragMids=this._rowEls().map(t=>{let e=t.getBoundingClientRect();return e.top+e.height/2})}_draggedRowEl(){return this._dragIndex==null?null:this.shadowRoot.querySelector(`.row[data-index="${this._dragIndex}"]`)}_onGripDown(t,e){if(this._editingId||this._dragIndex!=null)return;t.preventDefault();let i=t.currentTarget;try{i.setPointerCapture(t.pointerId)}catch{}this._dragGrip=i,this._dragPointerId=t.pointerId,this._dragStartY=t.clientY,this._dragIndex=e,this._dragOriginalOrder=this._savedDevices.map(s=>s.id),this._dragStarted=!1,this._recordMids(),i.addEventListener("pointermove",this._onGripMove),i.addEventListener("pointerup",this._onGripUp),i.addEventListener("pointercancel",this._onGripUp),i.addEventListener("lostpointercapture",this._onGripUp),k("light")}_cancelDrag(){this._dragIndex==null&&!this._dragGrip||(this._dragOriginalOrder=null,this._onGripUp())}_onGripMove=async t=>{if(this._dragIndex==null)return;t.preventDefault();let e=t.clientY-this._dragStartY;if(!this._dragStarted){if(Math.abs(e)<=4)return;this._dragStarted=!0}let i=this._draggedRowEl();i&&(i.style.transform=`translateY(${e}px)`);let s=Ji(this._dragMids,t.clientY,this._dragIndex);s!==this._dragIndex&&(i&&(i.style.transform=""),this._savedDevices=Xi(this._savedDevices,this._dragIndex,s),this._dragIndex=s,this._dragStartY=t.clientY,await this.updateComplete,this._recordMids())};_onGripUp=async()=>{let t=this._dragGrip;if(t){t.removeEventListener("pointermove",this._onGripMove),t.removeEventListener("pointerup",this._onGripUp),t.removeEventListener("pointercancel",this._onGripUp),t.removeEventListener("lostpointercapture",this._onGripUp);try{t.releasePointerCapture(this._dragPointerId)}catch{}}let e=this._draggedRowEl();e&&(e.style.transform="");let i=this._dragOriginalOrder,s=this._savedDevices.map(n=>n.id),r=!!i&&i.join(`
`)!==s.join(`
`);this._dragGrip=null,this._dragIndex=null,this._dragOriginalOrder=null,r&&this.deviceManager&&(k("medium"),await this.deviceManager.saveDevices(this._savedDevices))};close(){this.dispatchEvent(new CustomEvent("close-dialog",{bubbles:!0,composed:!0}))}_sectionLabel(t,e=""){return l`<div class="label"><span>${t}</span>${e}</div>`}_renderSaved(){return l`
            ${this._sectionLabel("Saved devices")}
            ${this._savedDevices.length===0?l`<div class="empty">No saved devices yet.<br>Add one from the devices below.</div>`:this._savedDevices.map((t,e)=>l`
                    <div class="row ${this._dragIndex===e?"dragging":""}" data-index=${e}>
                        <button class="grip" aria-label="Reorder" @pointerdown=${i=>this._onGripDown(i,e)}>${cs}</button>
                        <div class="text">
                            ${this._editingId===t.id?this._renderRenameInput(t):l`<div class="name" @click=${()=>this._startRename(t)}>${t.name}</div>`}
                            <div class="sub ${t.is_default?"default":""}">
                                ${t.is_default?l`${ae}<span>Default · </span>`:""}<span>${ct(t.type)}</span>
                            </div>
                        </div>
                        <button class="more" aria-label="More" @click=${i=>this._openRowMenu(i,t)}>${H}</button>
                    </div>
                `)}
        `}_settingRow(t,e,i,{child:s=!1}={}){return l`
            <div class="set ${s?"child":""}">
                <div class="set-text">
                    <div class="set-label">${e}</div>
                    <div class="set-desc">${i}</div>
                </div>
                <label class="switch">
                    <input type="checkbox" data-key=${t}
                           .checked=${this._settings?.[t]===!0}
                           @change=${this.handleToggleSetting}>
                    <span class="knob"></span>
                </label>
            </div>
        `}_renderSettings(){let t=this._settings?.hide_connect_devices===!0;return l`
            ${this._sectionLabel("Settings")}
            ${this._settingRow("hide_connect_devices","Hide Connect devices","Only show saved devices in the picker")}
            ${t?this._settingRow("see_all_devices",'"See all" button',"Lets the picker reveal network devices on demand",{child:!0}):""}
            ${this._settingRow("hide_offline_devices","Hide offline devices","Hide saved devices that aren't available right now")}
        `}_refreshIcon(){return l`<svg viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>`}_renderNetwork(){let t=es(this._liveDevices,this._savedDevices),e=l`
            <button class="refresh ${this._isLoadingLive?"spinning":""}" aria-label="Refresh"
                    @click=${this.refreshLive}>${this._refreshIcon()}</button>`;return l`
            ${this._sectionLabel("Other devices on your network",e)}
            ${t.length?t.map(i=>l`
                    <div class="row">
                        <div class="ic">${st(i.type)}</div>
                        <div class="text">
                            <div class="name">${i.name}</div>
                            <div class="sub"><span>${ct(i.type)}</span></div>
                        </div>
                        <button class="add" @click=${()=>this.handleAdd(i)}>Add</button>
                    </div>`):l`<div class="empty">${this._isLoadingLive?"Scanning\u2026":l`No other devices found.<br>Start playback on a device to see it here.`}</div>`}
        `}_renderResetRow(){return this._savedDevices.length===0?"":l`<button class="reset" @click=${this.handleReset}>Remove all saved devices</button>`}render(){return l`
            <spotify-bottom-sheet desktop-modal close-on-escape .visible=${this.visible} @close=${t=>{t.stopPropagation(),this.close()}}>
                <div class="head">
                    <h2 class="title">Manage devices</h2>
                    <button class="done" @click=${this.close}>Done</button>
                </div>
                <div class="body">
                    ${this._renderSaved()}
                    ${this._renderSettings()}
                    ${this._renderNetwork()}
                    ${this._renderResetRow()}
                </div>
            </spotify-bottom-sheet>
        `}};customElements.define("spotify-popup-devicemanager",ne);var oe=class extends b{static get styles(){return _`
            :host { display: contents; }

            .head {
                display: flex; align-items: center; justify-content: space-between;
                flex-shrink: 0;
                padding-bottom: 6px;
            }
            .title {
                margin: 0;
                font-size: var(--spf-text-xl, 22px); font-weight: 900;
                color: var(--spf-text-main, #fff);
            }
            .x {
                width: 44px; height: 44px;
                background: none; border: none; padding: 0; cursor: pointer;
                color: var(--spf-text-main, #fff);
                display: flex; align-items: center; justify-content: center;
            }
            .x svg { width: 24px; height: 24px; fill: currentColor; }
            /* Phones dismiss with the grip / backdrop, like the Connect sheet. */
            @media (max-width: 768px) { .x { display: none; } }

            .list {
                flex: 1; min-height: 0;
                overflow-y: auto; overflow-x: hidden;
                -webkit-overflow-scrolling: touch;
            }
            .row {
                display: flex; align-items: center; gap: 16px;
                padding: 14px 4px;
                cursor: pointer;
                -webkit-tap-highlight-color: transparent;
            }
            .row:active { background: rgba(255,255,255,0.06); }
            .row-ic {
                width: 26px; height: 26px; flex-shrink: 0;
                color: rgba(255,255,255,0.85);
                display: flex; align-items: center; justify-content: center;
            }
            .row-ic svg, .row-ic img { width: 100%; height: 100%; fill: currentColor; }
            .row-ic ha-icon { --mdc-icon-size: 26px; }
            .row.active .row-ic { color: var(--spf-brand, #1ed760); }
            .row-text { min-width: 0; flex: 1; }
            .row-name {
                font-size: var(--spf-text-md, 15px); font-weight: 700; color: #fff;
                white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            }
            .row.active .row-name { color: var(--spf-brand, #1ed760); }
            .row-type {
                display: flex; align-items: center; gap: 6px;
                font-size: var(--spf-text-base, 13.5px); color: var(--spf-text-sub, #b3b3b3); margin-top: 2px;
                white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            }
            .row-type svg { width: 14px; height: 14px; fill: currentColor; flex-shrink: 0; }
            .row-now { flex-shrink: 0; color: var(--spf-brand, #1ed760); display: flex; }

            .empty {
                text-align: center; color: var(--spf-text-sub, #b3b3b3);
                padding: 28px 12px; font-size: var(--spf-text-base, 13.5px); line-height: 1.5;
            }

            .foot {
                flex-shrink: 0;
                display: flex;
                border-top: 1px solid rgba(255,255,255,0.08);
                margin-top: 6px;
            }
            .act {
                flex: 1; min-height: 52px;
                display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
                background: none; border: none; cursor: pointer;
                color: var(--spf-text-sub, #b3b3b3);
                font: inherit; font-size: var(--spf-text-sm, 12px); font-weight: 700;
                text-align: center; padding: 8px 4px;
                -webkit-tap-highlight-color: transparent;
            }
            .act svg { width: 18px; height: 18px; fill: currentColor; }
            .act:active, .act.on { color: #fff; }
            @media (hover: hover) { .act:hover { color: #fff; } }
        `}static get properties(){return{devices:{type:Array},config:{type:Object},readonly:{type:Boolean},showRevealButton:{type:Boolean},visible:{type:Boolean},_revealed:{type:Boolean,state:!0}}}constructor(){super(),this.devices=[],this.config={},this.readonly=!0,this.showRevealButton=!1,this.visible=!1,this._revealed=!1}updated(t){t.has("visible")&&!this.visible&&(this._revealed=!1)}_getDeviceIcon(t){let e=this.config?.devices?.icons;if(!e||!e.length)return null;let i=e.find(s=>s.id&&s.id===t.id||s.name&&s.name===t.name);return i?i.icon:null}_renderIcon(t){let e=this._getDeviceIcon(t);return e?e.startsWith("mdi:")?l`<ha-icon icon="${e}"></ha-icon>`:l`<img src="${e}" alt="">`:st(t.type)}_castIcon(){return l`<svg viewBox="0 0 24 24"><path d="M1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm0-4v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11zm20-7H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>`}_refreshIcon(){return l`<svg viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>`}_eyeIcon(t){return l`<svg viewBox="0 0 24 24"><path d="${t?"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z":"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-4 .7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"}"/></svg>`}_listIcon(){return l`<svg viewBox="0 0 24 24"><path d="M3 17v2h6v-2H3zM3 5v2h18V5H3zm0 6h12v-2H3v2z"/></svg>`}_xIcon(){return l`<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`}_emit(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}_close(){this._emit("close-popups")}_toggleReveal(){this._revealed=!this._revealed,this._emit("toggle-hidden-devices",{visible:this._revealed})}_isDefault(t){return!!t.is_default||this.config?.devices?.default===t.id}render(){let t=this.devices||[];return l`
            <spotify-bottom-sheet desktop-modal close-on-escape .visible=${this.visible} @close=${e=>{e.stopPropagation(),this._close()}}>
                <div class="head">
                    <h2 class="title">Connect to a device</h2>
                    <button class="x" aria-label="Close" @click=${this._close}>${this._xIcon()}</button>
                </div>

                <div class="list">
                    ${t.length===0?l`<div class="empty">No devices found.<br>Start playback on a device to see it here.</div>`:t.map(e=>l`
                            <div class="row ${e.isActive?"active":""}" @click=${()=>this._emit("device-selected",e)}>
                                <div class="row-ic">${this._renderIcon(e)}</div>
                                <div class="row-text">
                                    <div class="row-name">${e.name}</div>
                                    <div class="row-type">
                                        ${this._castIcon()}
                                        <span>${ct(e.type)}${this._isDefault(e)?" \xB7 Default":""}</span>
                                    </div>
                                </div>
                                ${e.isActive?l`<div class="row-now">${j(18)}</div>`:""}
                            </div>`)}
                </div>

                <div class="foot">
                    <button class="act" @click=${()=>this._emit("refresh-devices")}>
                        ${this._refreshIcon()} Refresh
                    </button>
                    ${this.showRevealButton?l`
                        <button class="act ${this._revealed?"on":""}" @click=${this._toggleReveal}>
                            ${this._eyeIcon(this._revealed)} ${this._revealed?"Hide network":"Show network"}
                        </button>`:""}
                    ${this.readonly?"":l`
                        <button class="act" @click=${()=>this._emit("open-manager")}>
                            ${this._listIcon()} Manage devices
                        </button>`}
                </div>
            </spotify-bottom-sheet>
        `}};customElements.define("spotify-popup-devices",oe);var le=class extends b{static get properties(){return{devices:{type:Array},visible:{type:Boolean},loading:{type:Boolean}}}static get styles(){return _`
             /* --- FLOATING DEVICE LIST --- */
            .floating-volume-container {
                position: absolute;
                top: 100%; /* Drop down below the row */
                margin-top: 4px;
                left: 12px; 
                right: 12px;
                max-height: 240px; /* Increased max height */
                background: rgba(30,30,30,0.95);
                border-radius: 12px;
                overflow: hidden;
                z-index: 200; 
                box-shadow: 0 4px 20px rgba(0,0,0,0.6);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                display: flex;
                flex-direction: column;
                align-items: stretch;
                /* overflow-y handled by inner list */
                padding: 0; /* Padding moved to children */
                opacity: 0;
                transform: translateY(-10px) scale(0.95);
                pointer-events: none;
                transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
            }

            .floating-volume-container.visible {
                opacity: 1;
                transform: translateY(0) scale(1);
                pointer-events: auto;
            }

            .device-list {
                flex: 1;
                overflow-y: auto;
                overflow-x: hidden;
                padding: 8px;
            }

            .device-row {
                display: flex; 
                align-items: center; 
                padding: 12px;
                cursor: pointer; 
                border-radius: 4px; 
                background: transparent;
                transition: background 0.2s;
            }

            .device-row:hover {
                background: rgba(255,255,255,0.1);
            }

            .device-row.active {
                background: rgba(30, 215, 96, 0.2);
            }

            .device-name {
                flex: 1; 
                color: #fff; 
                font-size: var(--spf-text-base, 13.5px);
                font-weight: 500;
            }
            .device-row.active .device-name {
                color: #1ed760;
            }

            .device-icon svg { width: 16px; height: 16px; fill: #1ed760; }
            
            .more-devices-row {
                flex-shrink: 0; /* Prevent shrinking */
                border-top: 1px solid rgba(255,255,255,0.1);
                padding: 12px 16px; /* Match row padding but slightly more side padding */
                color: #b3b3b3;
                background: rgba(0,0,0,0.2); /* Slightly darker bg for footer */
                display: flex;
                align-items: center;
                cursor: pointer;
                transition: color 0.2s, background 0.2s;
            }
            .more-devices-row:hover {
                color: #fff;
                background: rgba(255,255,255,0.1);
            }
            .more-devices-row .device-name {
                color: inherit; /* Inherit hover color */
                font-size: var(--spf-text-base, 13.5px);
            }
            .more-devices-row svg { fill: currentColor; }
        `}render(){return l`
            <div class="floating-volume-container ${this.visible?"visible":""}">
                ${this.loading?l`<div style="text-align: center; color: #b3b3b3; padding: 20px;">Scanning...</div>`:l`
                    <div class="device-list">
                        ${this.devices.map(t=>l`
                            <div class="device-row ${t.isActive?"active":""}" 
                                 @click=${()=>this._selectDevice(t)}>
                                <div class="device-name">
                                    ${t.name}
                                </div>
                                ${t.isActive?l`<div class="device-icon"><svg viewBox="0 0 24 24"><path d="M10 18l6-6-6-6v12z"/></svg></div>`:""}
                            </div>
                        `)}
                    </div>
                    
                    <!-- Fixed Footer -->
                    <div class="more-devices-row" @click=${this._openManager}>
                        <div class="device-name">More devices...</div>
                        <div class="device-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24"><path d="M3 17v2h6v-2H3zM3 5v2h18V5H3zm0 6h12v-2H3v2z"/></svg>
                        </div>
                    </div>
                `}
            </div>
        `}_selectDevice(t){this.dispatchEvent(new CustomEvent("device-selected",{detail:t,bubbles:!0,composed:!0}))}_openManager(){this.dispatchEvent(new CustomEvent("open-manager",{bubbles:!0,composed:!0}))}};customElements.define("spotify-device-picker-small",le);var He=class extends b{static get properties(){return{hass:{type:Object},api:{type:Object},config:{type:Object},track:{type:Object},isPlaying:{type:Boolean},isShuffle:{type:Boolean},isLiked:{type:Boolean},deviceManager:{type:Object},playerController:{type:Object},_volumeVisible:{type:Boolean,state:!0},_devicesVisible:{type:Boolean,state:!0},_devices:{type:Array,state:!0},_loadingDevices:{type:Boolean,state:!0}}}static get styles(){return _`
            :host {
                display: block;
                width: 100%;
            }
            * { box-sizing: border-box; }

            .queue-now-playing-row {
                position: relative;
                padding: 16px 16px 8px 16px; 
                display: flex;
                flex-direction: column;
            }

            .queue-item-content { 
                display: flex; 
                align-items: center; 
                gap: 16px; 
            }

            .queue-art.large { 
                width: 56px; 
                height: 56px; 
                box-shadow: 0 4px 12px rgba(0,0,0,0.3); 
                border-radius: 4px;
                background-size: cover;
                background-position: center;
                flex-shrink: 0;
                background-color: #282828;
                animation: imageFadeIn 0.5s ease-out;
                cursor: pointer;
                transition: transform 0.2s ease;
            }

            .queue-art.large:hover {
                transform: scale(1.02);
            }

            @keyframes imageFadeIn {
                0% { opacity: 0; transform: scale(0.95); }
                100% { opacity: 1; transform: scale(1); }
            }

            .queue-info { 
                flex: 1; 
                overflow: hidden; 
                display: flex; 
                flex-direction: column; 
                justify-content: center; 
                margin-right: 12px; 
                gap: 2px; 
                min-width: 0;
            }

            .queue-title { 
                font-size: var(--spf-text-base, 13.5px); 
                font-weight: 700; 
                color: #fff; 
                white-space: nowrap; 
                overflow: hidden; 
                text-overflow: ellipsis;
                line-height: 1.2;
            }
            .queue-title.active { color: var(--spf-brand, #1ed760); }
            
            .queue-artist {
                font-size: var(--spf-text-sm, 12px);
                color: #b3b3b3;
                white-space: nowrap; 
                overflow: hidden; 
                text-overflow: ellipsis;
                line-height: 1.2;
            }

            .queue-device-row {
                display: flex;
                align-items: center;
                gap: 4px;
                font-size: var(--spf-text-xs, 11px); 
                font-weight: 500;
                color: var(--spf-brand, #1ed760);
                opacity: 0.9;
                margin-top: 2px;
                line-height: 1.2;
                white-space: nowrap; 
                overflow: hidden; 
                text-overflow: ellipsis;
                /* Tap the device name to switch speakers (#5) */
                cursor: pointer;
                background: none; border: none; padding: 0; text-align: left;
                font-family: inherit;
                max-width: 100%;
            }
            .queue-device-row:hover { opacity: 1; text-decoration: underline; }

            .queue-device-row svg {
                width: 12px; height: 12px;
                fill: currentColor;
                flex-shrink: 0;
            }

            .device-name-text {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            /* --- Big Play Button --- */
            .queue-play-btn.large-side-btn {
                width: 48px; height: 48px;
                border-radius: 50%;
                background: #fff; 
                color: black; 
                border: none;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                display: flex; align-items: center; justify-content: center;
                cursor: pointer; 
                transition: transform 0.2s;
                flex-shrink: 0;
            }

            .queue-play-btn.large-side-btn:hover {
                transform: scale(1.05);
                background: var(--spf-brand-hover, #1fdf64);
            }

            .queue-play-btn.large-side-btn svg { fill: black; width: 28px; height: 28px; }

            /* --- Controls Row --- */
            .queue-mini-controls {
                display: flex;
                align-items: center;
                width: 100%;
                height: 48px;       
                margin-top: 0;    
                padding: 0 8px;    
                box-sizing: border-box;
                justify-content: space-between; 
            }

            .mini-btn {
                background: transparent; 
                border: none; 
                color: var(--spf-text-sub); 
                cursor: pointer; 
                padding: 8px;
                display: flex; 
                align-items: center; 
                justify-content: center;
                transition: color 0.2s, transform 0.2s;
            }

            .mini-btn:hover { color: var(--spf-text-main); transform: scale(1.1); }
            .mini-btn svg { width: 20px; height: 20px; } 
            .mini-btn.is-favorite { color: var(--spf-brand, #1ed760); }
            .mini-btn.is-favorite svg { fill: var(--spf-brand, #1ed760); }

            /* --- FLOATING VOLUME --- */
            .floating-volume-container {
                position: absolute;
                bottom: -50px; /* Overlap queue list */
                left: 12px; 
                right: 12px;
                height: 44px;
                background: rgba(30,30,30,0.9);
                border-radius: 12px;
                overflow: hidden;
                z-index: 200; /* Above queue content */
                box-shadow: 0 4px 20px rgba(0,0,0,0.6);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                display: flex;
                flex-direction: column;
                opacity: 0;
                transform: translateY(10px) scale(0.95);
                pointer-events: none;
                transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.2s ease;
            }

            .floating-volume-container.visible {
                opacity: 1;
                transform: translateY(0) scale(1);
                pointer-events: auto;
            }

            /* Grow to fit the capability hint below the slider row */
            .floating-volume-container.disabled {
                height: 62px;
            }

            .volume-row {
                position: relative;
                display: flex;
                align-items: center;
                height: 44px;
                flex-shrink: 0;
            }

            .volume-wrapper {
                flex: 1;
                position: relative;
                overflow: hidden;
            }

            .volume-hint {
                font-size: var(--spf-text-xs, 11px);
                color: rgba(255,255,255,0.6);
                text-align: center;
                padding: 0 12px 6px;
                line-height: 1.2;
            }

            .floating-icon {
                position: absolute;
                left: 12px;
                top: 50%;
                transform: translateY(-50%);
                width: 24px;
                height: 24px;
                /* Mix blend mode for visibility over the fill bar if needed */
                z-index: 10;
                pointer-events: none;
                color: #000;
                mix-blend-mode: overlay;
                opacity: 0.8;
            }

            /* --- Elapsed / remaining (#12) --- */
            .queue-time-row {
                display: flex;
                justify-content: space-between;
                padding: 0 8px 6px;
                font-size: var(--spf-text-xs, 11px);
                color: var(--spf-text-sub, #b3b3b3);
                font-variant-numeric: tabular-nums;
                line-height: 1;
            }

            /* --- Progress Bar --- */
            .queue-progress-container {
                position: absolute; 
                bottom: 0;          
                left: 0;            
                width: 100%;        
                height: 2px;        
                margin: 0;
                padding: 0;
                background: rgba(255, 255, 255, 0.1);
                z-index: 10;
            }
            
            .queue-progress-bar {
                height: 100%;
                background: var(--spf-brand, #1ed760);
                width: 0%;
                border-radius: 0 2px 2px 0;
                transition: width 0.5s linear;
            }

            .queue-progress-bar::after {
                content: ''; position: absolute; right: -3px; top: -3px;
                width: 8px; height: 8px; background: #fff;
                border-radius: 50%; opacity: 0; transition: opacity 0.2s;
            }

            .queue-now-playing-row:hover .queue-progress-bar::after { opacity: 1; }
        `}constructor(){super(),this._volumeVisible=!1,this._progressTimer=null,this._volumeTimeout=null,this._lastVolumeUpdate=0,this._pendingVolume=null,this._volumeThrottleTimer=null,this._localVolume=null,this._ignoreUpdatesUntil=0,this._devices=[],this._devicesVisible=!1,this._loadingDevices=!1,this._deviceTimeout=null}connectedCallback(){super.connectedCallback(),this._startProgressTimer()}disconnectedCallback(){super.disconnectedCallback(),this._stopProgressTimer(),this._volumeTimeout&&clearTimeout(this._volumeTimeout),this._volumeThrottleTimer&&clearTimeout(this._volumeThrottleTimer),this._deviceTimeout&&clearTimeout(this._deviceTimeout),this._overlayCloseTimer&&clearTimeout(this._overlayCloseTimer),this._volumeTimeout=null,this._volumeThrottleTimer=null,this._deviceTimeout=null,this._overlayCloseTimer=null}_startProgressTimer(){this._stopProgressTimer(),this._progressTimer=setInterval(()=>this._updateProgress(),1e3),this._updateProgress()}_stopProgressTimer(){this._progressTimer&&(clearInterval(this._progressTimer),this._progressTimer=null)}_updateProgress(){if(!this.hass||!this.config?.entity)return;let t=this.playerController?.playbackStateObj?.()||this.hass.states[this.config.entity];if(!t)return;let e=this.shadowRoot.getElementById("queue-progress-bar");if(!e)return;let i=0,s=1;t.attributes.media_duration?(i=O(t),s=t.attributes.media_duration):this.track?.duration_ms&&(s=this.track.duration_ms/1e3,i=(this.track.progress_ms||0)/1e3),i>s&&(i=s);let r=i/s*100;e.style.width=`${r}%`;let n=this.shadowRoot.getElementById("queue-time-cur"),o=this.shadowRoot.getElementById("queue-time-rem"),c=s>1;n&&(n.textContent=c?$t(i):"--:--"),o&&(o.textContent=c?`-${$t(s-i)}`:"--:--")}toggleVolumeOverlay(){this._volumeVisible=!this._volumeVisible,this.requestUpdate(),this._volumeVisible?(this._resetVolumeTimeout(),this.deviceManager&&this._fetchDevices()):this._volumeTimeout&&clearTimeout(this._volumeTimeout),this.dispatchEvent(new CustomEvent("volume-overlay-toggle",{detail:{visible:this._volumeVisible},bubbles:!0,composed:!0}))}_resetVolumeTimeout(){this._volumeTimeout&&clearTimeout(this._volumeTimeout),this._volumeTimeout=setTimeout(()=>{this._volumeVisible&&this.toggleVolumeOverlay()},6e3)}toggleDeviceOverlay(){this._devicesVisible=!this._devicesVisible,this._devicesVisible&&this._volumeVisible&&(this._volumeVisible=!1),this._devicesVisible?(this._fetchDevices(),this._resetDeviceTimeout()):this._deviceTimeout&&clearTimeout(this._deviceTimeout),this.requestUpdate(),this.dispatchEvent(new CustomEvent("volume-overlay-toggle",{detail:{visible:this._devicesVisible},bubbles:!0,composed:!0}))}_resetDeviceTimeout(){this._deviceTimeout&&clearTimeout(this._deviceTimeout),this._deviceTimeout=setTimeout(()=>{this._devicesVisible&&this.toggleDeviceOverlay()},8e3)}async _fetchDevices(){if(this.api){this._loadingDevices=!0,this.requestUpdate();try{if(this.deviceManager){let t=this.hass?.states[this.config?.entity]?.attributes||{};this._devices=await this.deviceManager.fetchMergedDevices(this.api,t,{refresh:!0})}else{let t=await this.api.fetchSpotifyPlus("get_spotify_connect_devices",{refresh:!0});this._devices=W(t).map(Q)}}catch(t){console.error("Failed to fetch devices",t)}finally{this._loadingDevices=!1,this.requestUpdate()}}}async _transferPlayback(t){this.api&&(this._devices=this._devices.map(e=>({...e,isActive:e.id===t.id})),this.requestUpdate(),this.playerController?.beginTransferHold(),await this.api.transferPlayback(t),this._overlayCloseTimer&&clearTimeout(this._overlayCloseTimer),this._overlayCloseTimer=setTimeout(()=>{this._overlayCloseTimer=null,this._devicesVisible&&this.toggleDeviceOverlay()},500))}async onVolumeChange(t){if(!this.api)return;let e=t.detail.value/100,i=this.config?.devices?.volume?.rate_control!==!1;if(this.config?.devices?.volume?.optimistic!==!1&&(this._localVolume=t.detail.value,this._ignoreUpdatesUntil=Date.now()+3e3,this.requestUpdate()),i){let r=Date.now();if(this._lastVolumeUpdate&&r-this._lastVolumeUpdate<200){this._pendingVolume=e,this._volumeThrottleTimer||(this._volumeThrottleTimer=setTimeout(()=>{this._volumeThrottleTimer=null,this._pendingVolume!==null&&(this.api.setVolume(this._pendingVolume),this._lastVolumeUpdate=Date.now(),this._pendingVolume=null)},200));return}this._lastVolumeUpdate=r}this.playerController?this.playerController.setVolume(e):this.api.setVolume(e),this._resetVolumeTimeout()}_handleArtClick(t){t.stopPropagation();let e=null;if(this.hass&&this.config&&this.config.entity){let s=this.hass.states[this.config.entity];s&&s.attributes&&(e=s.attributes.sp_context_uri||s.attributes.media_context_content_id)}let i=Jt(e);if(i&&["playlist","album","artist"].includes(i.type)){this.dispatchEvent(new CustomEvent("navigate",{detail:{pageId:`${i.type}:${i.id}`},bubbles:!0,composed:!0}));return}this.track&&this.track.album&&this.track.album.id?this.dispatchEvent(new CustomEvent("navigate",{detail:{pageId:`album:${this.track.album.id}`},bubbles:!0,composed:!0})):console.warn("[SidebarNowPlaying] Cannot navigate: Missing album ID and no Context",this.track)}render(){if(!this.track||!this.track.name)return l`
                <div class="queue-now-playing-row">
                    <div class="queue-item-content" style="opacity:0.5">
                        <div class="queue-art large" style="background-color:#333"></div>
                        <div class="queue-info">
                            <div class="queue-title">Nothing playing</div>
                            <div class="queue-artist">Select music to start</div>
                        </div>
                    </div>
                </div>`;let t=this.config?.queue?.miniplayer||{enabled:!0},e=this.playerController?.playbackStateObj?.()||this.hass?.states[this.config?.entity];return l`
            <div class="queue-now-playing-row">
                <div class="queue-item-content">
                    <div class="queue-art large" 
                         style="${this.track?.album?.images?.[0]?.url?`background-image: url('${this.track.album.images[0].url}')`:"background-color: #333"}"
                         @click=${this._handleArtClick}></div>
                    <div class="queue-info">
                        <div class="queue-title active">${this.track?.name||"Unknown Track"}</div>
                        <div class="queue-artist">${this.track?.artists?.map(i=>i.name).join(", ")||"Unknown Artist"}</div>
                        <button class="queue-device-row" @click=${i=>{i.stopPropagation(),this.toggleDeviceOverlay()}}
                                title="Switch device" aria-label="Switch device">
                            <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 3v9.28a4.39 4.39 0 0 0-1.5-.28 4.5 4.5 0 1 0 4.5 4.5V6h4V3h-7z" fill="none"/><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 6h-8v-1h8v1zm0-3h-8V4h8v1z" fill="none"/><path d="M7 24h2v-2H7v2zm-4 0h2v-2H3v2zm8 0h2v-2h-2v2zM2 9h2v2H2V9zm0 4h2v2H2v-2zm0 4h2v2H2v-2z" fill="none"/><path d="M19 1H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H5V3h14v14zM7 10h10v2H7zm0-4h10v2H7z"/></svg>
                            <span class="device-name-text">${this.playerController?.state?.activeDevice||e?.attributes?.source||"Device"}</span>
                        </button>
                    </div>
                    
                    <button class="queue-play-btn large-side-btn" @click=${()=>{this.playerController?this.playerController.pause():this.api.togglePlayback(!this.isPlaying)}}>
                        <svg viewBox="0 0 24 24"><path fill="currentColor" d="${this.isPlaying?"M6 19h4V5H6v14zm8-14v14h4V5h-4z":"M8 5v14l11-7z"}"/></svg>
                    </button>
                </div>
                
                ${this.renderControls(t)}
                ${this.renderFloatingVolume(e)}
                ${this.renderFloatingDevices()}

                <div class="queue-time-row">
                    <span id="queue-time-cur">--:--</span>
                    <span id="queue-time-rem">--:--</span>
                </div>
                
                <div class="queue-progress-container">
                    <div class="queue-progress-bar" id="queue-progress-bar"></div>
                </div>
            </div>
        `}renderControls(t){return t.enabled===!1?"":l`
            <div class="queue-mini-controls">
                ${t.shuffle!==!1?l`<button class="mini-btn ${this.isShuffle?"is-favorite":""}" @click=${()=>this.playerController?this.playerController.toggleShuffle():this.dispatchEvent(new CustomEvent("shuffle-toggle",{bubbles:!0,composed:!0}))}>
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/></svg>
                </button>`:""}

                ${t.device!==!1?l`<button class="mini-btn ${this._devicesVisible?"is-favorite":""}" @click=${()=>this.toggleDeviceOverlay()}>
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 3v9.28a4.39 4.39 0 0 0-1.5-.28 4.5 4.5 0 1 0 4.5 4.5V6h4V3h-7z" fill="none"/><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 6h-8v-1h8v1zm0-3h-8V4h8v1z" fill="none"/><path d="M7 24h2v-2H7v2zm-4 0h2v-2H3v2zm8 0h2v-2h-2v2zM2 9h2v2H2V9zm0 4h2v2H2v-2zm0 4h2v2H2v-2z" fill="none"/><path d="M19 1H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H5V3h14v14zM7 10h10v2H7zm0-4h10v2H7z"/></svg>
                </button>`:""}

                ${t.previous!==!1?l`<button class="mini-btn" @click=${()=>this.playerController?this.playerController.prev():this.api.fetchSpotifyPlus("player_media_previous_track")}><svg viewBox="0 0 24 24"><path fill="currentColor" d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg></button>`:""}

                ${t.next!==!1?l`<button class="mini-btn" @click=${()=>this.playerController?this.playerController.next():this.api.fetchSpotifyPlus("player_media_next_track")}><svg viewBox="0 0 24 24"><path fill="currentColor" d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg></button>`:""}

                ${t.like!==!1?l`<button class="mini-btn ${this.isLiked?"is-favorite":""}" @click=${()=>this.playerController?this.playerController.toggleLike():this.dispatchEvent(new CustomEvent("like-toggle",{bubbles:!0,composed:!0}))}>
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="${this.isLiked?"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z":"M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"}"/></svg>
                </button>`:""}

                ${t.volume!==!1?l`<button class="mini-btn ${this._volumeVisible?"is-favorite":""}" @click=${()=>this.toggleVolumeOverlay()}>
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                </button>`:""}
            </div>
        `}renderFloatingVolume(t){let e=(t?.attributes?.volume_level||0)*100;this.config?.devices?.volume?.optimistic!==!1&&this._ignoreUpdatesUntil&&Date.now()<this._ignoreUpdatesUntil&&this._localVolume!==null&&(e=this._localVolume);let s=t?.attributes?.sp_device_id||null,r=this.deviceManager?.getVolumeCapability(s)===!1;return l`
            <div class="floating-volume-container ${this._volumeVisible?"visible":""} ${r?"disabled":""}">
                <div class="volume-row">
                    <div class="volume-wrapper" style="margin: 3px; width: calc(100% - 6px); height: calc(100% - 6px);">
                        <spotify-slider
                            .value=${e}
                            .min=${0}
                            .max=${100}
                            .disabled=${r}
                            @input=${this.onVolumeChange}
                        ></spotify-slider>
                    </div>

                    <!-- Icon Overlay (Click through) -->
                    <div class="floating-icon">
                         <svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                    </div>
                </div>
                ${r?l`<div class="volume-hint">Volume is controlled on the device</div>`:""}
            </div>
        `}renderFloatingDevices(){return l`
            <spotify-device-picker-small
                .devices=${this._devices}
                .visible=${this._devicesVisible}
                .loading=${this._loadingDevices}
                @device-selected=${t=>this._transferPlayback(t.detail)}
            ></spotify-device-picker-small>
        `}};customElements.define("spotify-sidebar-nowplaying",He);var dr={panel:{row:"row",active:"now",art:"art",info:"meta",title:"name",artist:"sub"},sidebar:{row:"queue-item",active:"",art:"queue-art",info:"queue-info",title:"queue-title",artist:"queue-artist"}};function ce(a,{variant:t="sidebar",onClick:e=null,active:i=!1,titleIcon:s=null,trailing:r=null,playedAt:n=""}={}){let o=dr[t],c=a?.album?.images?.[0]?.url||"",d=a?.artists?.map(p=>p.name).join(", ")||"Unknown Artist";return l`
        <div class="${i?`${o.row} ${o.active}`:o.row}" @click=${e}>
            <div class="${o.art} ${c?"":"art-fallback"}" style="${c?`background-image: url('${c}')`:""}"></div>
            <div class="${o.info}">
                <div class="${o.title}">${s||""}${a?.name||"Unknown Track"}</div>
                <div class="${o.artist}">${d}</div>
                ${n?l`<div class="queue-context-sub">${n}</div>`:""}
            </div>
            ${r||""}
        </div>
    `}var je=class extends b{static get properties(){return{items:{type:Array},mode:{type:String},playerController:{type:Object}}}static get styles(){return[$,ie,_`
            :host {
                display: block;
                position: static;
                height: auto;
                width: 100%;
                transform: none;
                z-index: auto;
                pointer-events: auto;
            }
        `]}constructor(){super(),this.mode="queue"}render(){return!this.items||this.items.length===0?this.renderEmpty():l`
            <div class="queue-list">
                ${this.items.map(t=>this.renderRow(t))}
            </div>
        `}renderRow(t){let e=t.track||t;return ce(e,{onClick:()=>this._playTrack(e),playedAt:t.played_at?`${Ni(new Date(t.played_at).getTime())} ago`:"",trailing:l`
                <button class="row-menu-btn" @click=${i=>this._trackMenu(i,e)} aria-label="More options">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="5" cy="12" r="2"/></svg>
                </button>
            `})}_trackMenu(t,e){t.stopPropagation(),this.dispatchEvent(new CustomEvent("open-track-menu",{detail:{name:e?.name,artist:e?.artists?.map(i=>i.name).join(", ")||"",album:e?.album?.name||"",uri:e?.uri,id:e?.id,image:e?.album?.images?.[0]?.url,anchor:t.currentTarget.getBoundingClientRect(),context:{surface:"queue",sourceUri:this.playerController?.sourceContextUri()||null}},bubbles:!0,composed:!0}))}renderEmpty(){return this.mode==="recent"?l`
                <div class="queue-empty-state">
                    <div class="empty-text">No recent tracks found</div>
                    <button class="device-refresh-btn" style="margin-top:16px;" @click=${()=>this.playerController?.refreshRecent()}>Refresh</button>
                </div>
            `:l`
            <div class="queue-empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="1"><path d="M9 17H5v-2h4v2zm9-2h-4v2h4v-2zm-9-4H5v-2h4v2zm9-2h-4v2h4v-2zm-9-4H5V3h4v2zm9-2h-4v2h4V3zM3 21h18v-2H3v2z"/></svg>
                <div class="empty-text">Queue is empty</div>
                <div class="empty-sub">Add songs to start listening</div>
                <button class="device-refresh-btn" style="margin-top:16px;" @click=${()=>this.playerController?.refreshQueue()}>Refresh</button>
            </div>
        `}_playTrack(t){this.playerController&&this.playerController.playTrackFromQueue(t)}};customElements.define("spotify-sidebar-tracklist",je);var Ue=class extends b{static get properties(){return{hass:{type:Object},api:{type:Object},config:{type:Object},visible:{type:Boolean,reflect:!0},playerController:{type:Object},deviceManager:{type:Object},_state:{type:Object,state:!0},_activeTab:{type:String,state:!0},_isVolumeOverlayOpen:{type:Boolean,state:!0}}}static get styles(){return[$,ie,_`
            :host {
                display: flex;
                flex-direction: column;
                /* height & overflow handled by queueStyles to match layout positioning */
            }

            .queue-panel {
                display: flex;
                flex-direction: column;
                height: 100%;
                background-color: #000;
            }

            .queue-header-wrapper {
                flex-shrink: 0;
            }

            .queue-list-container {
                flex: 1;
                overflow-y: auto;
                position: relative;
                transition: filter 0.3s ease, opacity 0.3s ease;
            }

            .queue-list-container.blurred {
                filter: blur(8px);
                opacity: 0.4;
                pointer-events: none;
            }

            /* Tab Bar Styling */
            .tabs-container {
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #121212;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                padding: 0 16px;
                height: 60px;
                width: 100%;
                flex-shrink: 0; 
                z-index: 20; 
            }

            .tab-button {
                background: transparent;
                border: none;
                color: #b3b3b3;
                padding: 0 16px;
                height: 100%;
                font-size: var(--spf-text-base, 13.5px);
                font-weight: 700;
                cursor: pointer;
                transition: color 0.2s ease;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .tab-button:hover, .tab-button.active {
                color: #fff;
            }

            .tab-button.active::after {
                content: '';
                position: absolute;
                bottom: 0px; 
                left: 0;
                width: 100%; 
                height: 4px;
                border-radius: 2px 2px 0 0; 
                background-color: #1ed760; 
            }
        `]}constructor(){super(),this._activeTab="queue",this._isVolumeOverlayOpen=!1,this._onStateChange=this._onStateChange.bind(this)}connectedCallback(){super.connectedCallback(),this.playerController&&(this.playerController.addEventListener("state-changed",this._onStateChange),this._state=this.playerController.state)}disconnectedCallback(){super.disconnectedCallback(),this.playerController&&this.playerController.removeEventListener("state-changed",this._onStateChange)}updated(t){if(t.has("playerController")){let e=t.get("playerController");e&&e.removeEventListener("state-changed",this._onStateChange),this.playerController&&(this.playerController.addEventListener("state-changed",this._onStateChange),this._state=this.playerController.state,this.requestUpdate())}t.has("visible")&&this.visible&&this._refreshCurrentTab()}_onStateChange(t){this._state=t.detail,this.requestUpdate()}_refreshCurrentTab(){this._activeTab==="recent"?this.playerController?.refreshRecent():this.playerController?.refreshQueue()}_handleTabClick(t){this._activeTab!==t&&(this._activeTab=t,this._refreshCurrentTab())}_handleBlurClick(t){if(!this._isVolumeOverlayOpen)return;t.stopPropagation();let e=this.shadowRoot.querySelector("spotify-sidebar-nowplaying");e&&e.toggleVolumeOverlay()}render(){let t=this._state?.track,e=this._state?.queue||[],i=this._state?.recentTracks||[],s="Up Next";if(this.config&&this.hass){let n=this.hass.states[this.config.entity]?.attributes||{},o=n.sp_context_uri||n.media_playlist;o&&(o.includes(":playlist:")?s="Next From Playlist":o.includes(":album:")?s="Next From Album":o.includes(":artist:")?s="Next From Artist":o.includes(":collection")&&(s="Next From Liked"))}return l`
            <div class="queue-panel">
                <div class="queue-header-wrapper">
                    <!-- Mobile Drag Handle could go here -->
                    <spotify-sidebar-nowplaying
                        .hass=${this.hass}
                        .config=${this.config}
                        .api=${this.api}
                        .deviceManager=${this.deviceManager}
                        .playerController=${this.playerController}
                        .track=${t}
                        .isPlaying=${this._state?.isPlaying}
                        .isShuffle=${this._state?.isShuffle}
                        .isLiked=${this._state?.isLiked}
                        @volume-overlay-toggle=${r=>this._isVolumeOverlayOpen=r.detail.visible}
                    ></spotify-sidebar-nowplaying>
                </div>
                
                <div class="queue-list-container ${this._isVolumeOverlayOpen?"blurred":""}" @click=${this._handleBlurClick}>
                    ${this._activeTab==="queue"?l`<spotify-sidebar-tracklist mode="queue" .items=${e} .playerController=${this.playerController}></spotify-sidebar-tracklist>`:l`<spotify-sidebar-tracklist mode="recent" .items=${i} .playerController=${this.playerController}></spotify-sidebar-tracklist>`}
                </div>

                <div class="tabs-container">
                    <button class="tab-button ${this._activeTab==="queue"?"active":""}" @click=${()=>this._handleTabClick("queue")}>
                        ${s}
                    </button>
                    <button class="tab-button ${this._activeTab==="recent"?"active":""}" @click=${()=>this._handleTabClick("recent")}>
                        Recently Played
                    </button>
                </div>
            </div>
        `}};customElements.define("spotify-sidebar-player",Ue);var Fe=class extends b{static get properties(){return{visible:{type:Boolean,reflect:!0},hass:{type:Object},config:{type:Object},api:{type:Object},playerController:{type:Object},state:{type:Object}}}static get styles(){return _`
            /* Register the accent channels as animatable so the gradient
               cross-fades between tracks instead of snapping. Falls back to an
               instant change where @property is unsupported. */
            @property --np-r { syntax: '<number>'; initial-value: 40; inherits: true; }
            @property --np-g { syntax: '<number>'; initial-value: 40; inherits: true; }
            @property --np-b { syntax: '<number>'; initial-value: 48; inherits: true; }

            :host {
                position: fixed;
                inset: 0;
                z-index: 210000;
                transform: translateY(100%);
                transition: transform 0.42s cubic-bezier(0.16, 1, 0.3, 1);
                pointer-events: none;
                will-change: transform;
                --np-r: 40; --np-g: 40; --np-b: 48;
            }
            :host([visible]) {
                transform: translateY(0);
                pointer-events: auto;
            }

            .np {
                position: absolute; inset: 0;
                display: flex; flex-direction: column;
                padding: calc(12px + var(--spf-safe-top, 0px)) 20px 28px 20px;
                box-sizing: border-box;
                overflow: hidden;
                color: #fff;
                background: #101010;
            }

            /* Vibrant album-art accent gradient (Spotify-style). The selectors are
               scoped (.np > …) so they out-specify the .np > * content rule below
               and keep their absolute positioning / z-index. */
            .np > .np-bg {
                position: absolute; inset: 0;
                background: linear-gradient(180deg,
                    rgb(var(--np-r) var(--np-g) var(--np-b)) 0%,
                    rgb(var(--np-r) var(--np-g) var(--np-b) / 0.55) 26%,
                    rgb(var(--np-r) var(--np-g) var(--np-b) / 0.12) 46%,
                    #101010 72%);
                transition: --np-r 0.6s ease, --np-g 0.6s ease, --np-b 0.6s ease;
                z-index: 0;
            }
            .np > .np-bg-overlay {
                position: absolute; inset: 0;
                background: linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.45) 100%);
                z-index: 0;
            }
            .np > * { position: relative; z-index: 1; }

            /* Header */
            .np-header {
                display: flex; align-items: center; justify-content: space-between;
                flex-shrink: 0; height: 40px;
            }
            .np-header .np-context {
                font-size: var(--spf-text-base, 13.5px); font-weight: 700; letter-spacing: 0.4px;
                text-transform: uppercase; opacity: 0.95;
                white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                max-width: 60%; text-align: center;
            }
            .icon-btn {
                background: none; border: none; color: #fff; cursor: pointer;
                width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; padding: 0;
            }
            .icon-btn svg { width: 26px; height: 26px; fill: currentColor; }

            /* Album art carousel (swipe left/right to skip) */
            .np-art-wrap {
                flex: 1; position: relative; min-height: 0;
                overflow: hidden; padding: 16px 0;
            }
            .np-track {
                position: absolute; inset: 0;
                touch-action: pan-y; /* we own horizontal drags */
            }
            .np-card {
                position: absolute; top: 50%; left: 50%;
                width: min(78vw, 60vh, 420px);
                aspect-ratio: 1 / 1;
                border-radius: 8px;
                background-size: cover; background-position: center;
                background-color: var(--spf-skeleton-bg, #282828);
                transform: translate(-50%, -50%) translateX(var(--cx, 0px));
                will-change: transform;
            }
            /* Shadow only on the centered card — otherwise the off-screen
               neighbours' shadows bleed in as vertical bands at the edges. The
               negative spread keeps it from extending past the art's left/right
               edges, so it grounds the art from below without side shading. */
            .np-card.is-cur { box-shadow: 0 24px 40px -20px rgba(0,0,0,0.6); }
            .np-card.is-prev { --cx: calc(-1 * (min(78vw, 60vh, 420px) + 28px)); }
            .np-card.is-next { --cx: calc(min(78vw, 60vh, 420px) + 28px); }

            /* Track info row */
            .np-info {
                display: flex; align-items: center; gap: 16px;
                flex-shrink: 0; margin-top: 4px;
            }
            .np-info-text { flex: 1; min-width: 0; }
            .np-title {
                font-size: var(--spf-text-xl, 22px); font-weight: 900; line-height: 1.2;
                white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            }
            .np-artist {
                font-size: var(--spf-text-md, 15px); color: rgba(255,255,255,0.7); margin-top: 2px;
                white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            }
            .np-like {
                flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%;
                border: 2px solid rgba(255,255,255,0.7); background: transparent;
                color: rgba(255,255,255,0.8); cursor: pointer;
                display: flex; align-items: center; justify-content: center; padding: 0;
                transition: all 0.15s ease;
            }
            .np-like svg { width: 18px; height: 18px; fill: currentColor; }
            .np-like.liked {
                background: var(--spf-brand, #1ed760);
                border-color: var(--spf-brand, #1ed760);
                color: #000;
            }

            /* Progress */
            .np-progress { flex-shrink: 0; margin-top: 20px; }
            .np-bar {
                position: relative; height: 5px; border-radius: 3px;
                background: rgba(255,255,255,0.28); cursor: pointer;
            }
            .np-bar-fill {
                position: absolute; top: 0; left: 0; height: 100%;
                background: #fff; border-radius: 3px; width: 0%;
            }
            .np-times {
                display: flex; justify-content: space-between;
                font-size: var(--spf-text-xs, 11px); color: rgba(255,255,255,0.65); margin-top: 6px;
                font-variant-numeric: tabular-nums;
            }

            /* Controls */
            .np-controls {
                display: flex; align-items: center; justify-content: space-between;
                flex-shrink: 0; margin-top: 18px;
            }
            .ctrl-btn {
                background: none; border: none; color: #fff; cursor: pointer;
                display: flex; align-items: center; justify-content: center; padding: 8px;
            }
            .ctrl-btn svg { width: 30px; height: 30px; fill: currentColor; }
            .ctrl-btn.active { color: var(--spf-brand, #1ed760); }
            .ctrl-btn.active::after {
                content: ''; display: block; position: absolute;
            }
            .np-play {
                width: 68px; height: 68px; border-radius: 50%;
                background: #fff; color: #000; border: none; cursor: pointer;
                display: flex; align-items: center; justify-content: center;
                box-shadow: 0 6px 16px rgba(0,0,0,0.35);
                transition: transform 0.12s ease;
            }
            .np-play:active { transform: scale(0.94); }
            .np-play svg { width: 34px; height: 34px; fill: #000; }

            /* Bottom actions */
            .np-bottom {
                display: flex; align-items: center; justify-content: space-between;
                flex-shrink: 0; margin-top: 22px;
            }
            .np-device {
                display: flex; align-items: center; gap: 8px;
                background: none; border: none; cursor: pointer; padding: 0;
                color: rgba(255,255,255,0.85); max-width: 70%;
            }
            .np-device.connected { color: var(--spf-brand, #1ed760); }
            .np-device svg { width: 20px; height: 20px; fill: currentColor; flex-shrink: 0; }
            .np-device-name {
                font-size: var(--spf-text-base, 13.5px); font-weight: 700;
                white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            }
        `}constructor(){super(),this.visible=!1,this._progressTimer=null,this._swiping=!1,this._committing=!1,this._progressHoldUntil=0,this._onArtMove=this._onArtMove.bind(this),this._onArtUp=this._onArtUp.bind(this)}connectedCallback(){super.connectedCallback(),this._startProgressTimer()}disconnectedCallback(){super.disconnectedCallback(),this._stopProgressTimer(),this._cleanupSwipeListeners(),this._commitTimer&&clearTimeout(this._commitTimer),this._commitResetTimer&&clearTimeout(this._commitResetTimer)}updated(t){if(t.has("visible"))if(this.visible){this._startProgressTimer();let e=this.state?.track?.id;e&&this.playerController?.checkTrackFavorites(e)}else this._stopProgressTimer();if(t.has("state")&&this._updateAccent(this.state?.track?.album?.images?.[0]?.url||""),this._committing&&t.has("state")){this._committing=!1,this._fired=!1,this._commitTimer&&(clearTimeout(this._commitTimer),this._commitTimer=null),this._commitResetTimer&&(clearTimeout(this._commitResetTimer),this._commitResetTimer=null);let e=this.shadowRoot.getElementById("np-track");e&&(e.style.transition="none",e.style.transform="translateX(0)")}}_startProgressTimer(){this._stopProgressTimer(),this._progressTimer=setInterval(()=>this._updateProgress(),500),this._updateProgress()}_stopProgressTimer(){this._progressTimer&&(clearInterval(this._progressTimer),this._progressTimer=null)}_playerPosition(){let t=this.playerController?.playbackStateObj?.()||this.hass?.states[this.config?.entity];if(!t)return{position:0,duration:0};let i=t.attributes.media_duration||(this.state?.track?.duration_ms?this.state.track.duration_ms/1e3:0),s=O(t);return i&&s>i&&(s=i),{position:s,duration:i}}_updateProgress(){if(!this.visible)return;if(this._progressHoldUntil&&Date.now()<this._progressHoldUntil){let n=this.shadowRoot.getElementById("np-bar-fill"),o=this.shadowRoot.getElementById("np-time-cur");n&&(n.style.width="0%"),o&&(o.textContent="0:00");return}let{position:t,duration:e}=this._playerPosition(),i=this.shadowRoot.getElementById("np-bar-fill"),s=this.shadowRoot.getElementById("np-time-cur"),r=this.shadowRoot.getElementById("np-time-rem");i&&(i.style.width=e?`${Math.min(100,t/e*100)}%`:"0%"),s&&(s.textContent=this._fmt(t)),r&&(r.textContent=e?`-${this._fmt(e-t)}`:"--:--")}_fmt(t){return $t(t)}_handleSeek(t){if(!this.api)return;let{duration:e}=this._playerPosition();if(!e)return;let s=t.currentTarget.getBoundingClientRect(),r=Math.max(0,Math.min(1,(t.clientX-s.left)/s.width)),n=r*e;this.api.seek&&this.api.seek(n);let o=this.shadowRoot.getElementById("np-bar-fill");o&&(o.style.width=`${r*100}%`)}_close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}_playPause(){k("medium"),this.playerController?this.playerController.pause():this.api&&this.api.togglePlayback(!this.state?.isPlaying)}_next(){k("light"),this._holdProgressReset(),this.playerController?this.playerController.skipNext():this.api?.fetchSpotifyPlus("player_media_next_track")}_prev(){k("light"),this._holdProgressReset(),this.playerController?this.playerController.skipPrev({allowRestart:!0}):this.api?.fetchSpotifyPlus("player_media_previous_track")}_updateAccent(t){if(t!==this._accentArt){if(this._accentArt=t,!t){this._applyAccent([40,40,48]);return}Ki(t).then(e=>{this._accentArt===t&&this._applyAccent(e||[40,40,48])})}}_applyAccent([t,e,i]){this.style.setProperty("--np-r",String(t)),this.style.setProperty("--np-g",String(e)),this.style.setProperty("--np-b",String(i))}_holdProgressReset(){this._progressHoldUntil=Date.now()+2500;let t=this.shadowRoot.getElementById("np-bar-fill"),e=this.shadowRoot.getElementById("np-time-cur");t&&(t.style.width="0%"),e&&(e.textContent="0:00")}_cleanupSwipeListeners(){window.removeEventListener("pointermove",this._onArtMove),window.removeEventListener("pointerup",this._onArtUp),window.removeEventListener("pointercancel",this._onArtUp)}_onArtDown(t){if(this._swiping||this._committing||(this._track=this.shadowRoot.getElementById("np-track"),!this._track))return;this._startX=t.clientX,this._startY=t.clientY,this._dx=0,this._hLock=!1,this._swiping=!0;let e=this.shadowRoot.querySelector(".np-card.is-cur");this._step=(e?e.offsetWidth:this._track.offsetWidth*.8)+28,this._track.style.transition="none",window.addEventListener("pointermove",this._onArtMove,{passive:!1}),window.addEventListener("pointerup",this._onArtUp),window.addEventListener("pointercancel",this._onArtUp)}_onArtMove(t){if(!this._swiping||!this._track)return;let e=t.clientX-this._startX,i=t.clientY-this._startY;if(!this._hLock){if(Math.abs(e)<8&&Math.abs(i)<8)return;if(Math.abs(i)>Math.abs(e)){this._endSwipe(!1);return}this._hLock=!0}t.preventDefault(),this._dx=e,this._track.style.transform=`translateX(${e}px)`}_onArtUp(){if(!this._swiping||!this._track)return;if(!this._hLock){this._endSwipe(!1);return}let t=this._dx,e=this._step||300,i=e*.5;if(t<=-i)return this._commit("next",e);if(t>=i)return this._commit("prev",e);this._endSwipe(!0)}_endSwipe(t){this._cleanupSwipeListeners(),this._swiping=!1;let e=this._track;e&&(e.style.transition=t?"transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)":"none",e.style.transform="translateX(0)")}_commit(t,e){this._cleanupSwipeListeners(),this._swiping=!1,this._committing=!0,this._fired=!1;let i=this._track,s=!!this.shadowRoot.querySelector(t==="next"?".np-card.is-next":".np-card.is-prev"),r=()=>{this._fired||(this._fired=!0,k("light"),this._holdProgressReset(),t==="next"?this.playerController?.skipNext():this.playerController?.skipPrev({allowRestart:!1}))};if(s&&i){let n=t==="next"?-e:e;i.style.transition="transform 0.26s cubic-bezier(0.16, 1, 0.3, 1)",i.style.transform=`translateX(${n}px)`,i.addEventListener("transitionend",r,{once:!0}),this._commitTimer=setTimeout(r,320)}else i&&(i.style.transition="transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",i.style.transform="translateX(0)"),r();this._commitResetTimer=setTimeout(()=>{if(!this._committing)return;this._committing=!1;let n=this.shadowRoot.getElementById("np-track");n&&(n.style.transition="none",n.style.transform="translateX(0)")},1300)}_toggleShuffle(){k("light"),this.playerController?this.playerController.toggleShuffle():this.api?.fetchSpotifyPlus("player_shuffle",{state:!this.state?.isShuffle},!1),this._refreshQueueSoon()}_toggleLike(){k("success"),this.playerController&&this.playerController.toggleLike()}_cycleRepeat(){k("light");let t={off:"all",all:"one",one:"off"},e=this._repeatState();this.api?.fetchSpotifyPlus("player_repeat",{state:t[e]||"all"},!1),this._refreshQueueSoon()}_refreshQueueSoon(){this.playerController&&(setTimeout(()=>this.playerController.refreshQueue(),500),setTimeout(()=>this.playerController.refreshQueue(),1500))}_repeatState(){return(this.playerController?.playbackStateObj?.()||this.hass?.states[this.config?.entity])?.attributes?.repeat||"off"}_openDevices(){this.dispatchEvent(new CustomEvent("open-devices",{bubbles:!0,composed:!0}))}_openQueue(){this.dispatchEvent(new CustomEvent("open-queue",{bubbles:!0,composed:!0}))}_openMenu(){let t=this.state?.track;t&&this.dispatchEvent(new CustomEvent("open-track-menu",{detail:{name:t.name,artist:t.artists?.map(e=>e.name).join(", ")||"",album:t.album?.name||"",uri:t.uri,id:t.id,image:t.album?.images?.[0]?.url,context:{surface:"nowplaying",sourceUri:this.playerController?.sourceContextUri()||null}},bubbles:!0,composed:!0}))}render(){let t=this.state?.track,e=t?.album?.images?.[0]?.url||"",i=t?.name||"Nothing playing",s=t?.artists?.map(m=>m.name).join(", ")||"",r=!!this.state?.isPlaying,n=!!this.state?.isShuffle,o=!!this.state?.isLiked,c=this._repeatState(),d=this.playerController?.playbackStateObj?.()||this.hass?.states[this.config?.entity],p=this.state?.activeDevice||"This device",u=!!this.state?.activeDevice,g=d?.attributes?.media_playlist||"Now Playing",f=this.playerController?.peekPrev?.()?.album?.images?.[0]?.url||"",h=this.playerController?.peekNext?.()?.album?.images?.[0]?.url||"";return l`
            <div class="np">
                <div class="np-bg"></div>
                <div class="np-bg-overlay"></div>

                <div class="np-header">
                    <button class="icon-btn" @click=${this._close} aria-label="Close">
                        <svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
                    </button>
                    <div class="np-context">${g}</div>
                    <button class="icon-btn" @click=${this._openMenu} aria-label="More">
                        <svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
                    </button>
                </div>

                <div class="np-art-wrap">
                    <div class="np-track" id="np-track" @pointerdown=${this._onArtDown}>
                        ${f?l`<div class="np-card is-prev" style="background-image: url('${f}')"></div>`:""}
                        <div class="np-card is-cur" style="${e?`background-image: url('${e}')`:""}"></div>
                        ${h?l`<div class="np-card is-next" style="background-image: url('${h}')"></div>`:""}
                    </div>
                </div>

                <div class="np-info">
                    <div class="np-info-text">
                        <div class="np-title">${i}</div>
                        <div class="np-artist">${s}</div>
                    </div>
                    <button class="np-like ${o?"liked":""}" @click=${this._toggleLike} aria-label="Like">
                        <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    </button>
                </div>

                <div class="np-progress">
                    <div class="np-bar" @click=${this._handleSeek}>
                        <div class="np-bar-fill" id="np-bar-fill"></div>
                    </div>
                    <div class="np-times">
                        <span id="np-time-cur">0:00</span>
                        <span id="np-time-rem">--:--</span>
                    </div>
                </div>

                <div class="np-controls">
                    <button class="ctrl-btn ${n?"active":""}" @click=${this._toggleShuffle} aria-label="Shuffle">
                        <svg viewBox="0 0 24 24"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/></svg>
                    </button>
                    <button class="ctrl-btn" @click=${this._prev} aria-label="Previous">
                        <svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
                    </button>
                    <button class="np-play" @click=${this._playPause} aria-label="${r?"Pause":"Play"}">
                        <svg viewBox="0 0 24 24"><path d="${r?"M6 19h4V5H6v14zm8-14v14h4V5h-4z":"M8 5v14l11-7z"}"/></svg>
                    </button>
                    <button class="ctrl-btn" @click=${this._next} aria-label="Next">
                        <svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
                    </button>
                    <button class="ctrl-btn ${c!=="off"?"active":""}" @click=${this._cycleRepeat} aria-label="Repeat">
                        ${c==="one"?l`<svg viewBox="0 0 24 24"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2v-3.5h-.5l-1.5.5v.75l1.1-.35V15z"/></svg>`:l`<svg viewBox="0 0 24 24"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>`}
                    </button>
                </div>

                <div class="np-bottom">
                    <button class="np-device ${u?"connected":""}" @click=${this._openDevices} aria-label="Devices">
                        <svg viewBox="0 0 24 24"><path d="M4 6h16v9H4V6zm0 11h16v2H4v-2zM2 4v13h20V4H2z" fill="none"/><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/></svg>
                        <span class="np-device-name">${p}</span>
                    </button>
                    <button class="icon-btn" @click=${this._openQueue} aria-label="Queue" style="width:auto;">
                        <svg viewBox="0 0 24 24"><path d="M3 10h11v2H3v-2zm0-4h11v2H3V6zm0 8h7v2H3v-2zm13-1v5.55c-.3-.17-.64-.3-1-.36-1.1-.18-2.13.61-2.13 1.71 0 1.1 1.03 1.89 2.13 1.71.96-.16 1.87-1.13 1.87-2.61V8h4V6h-5v7z"/></svg>
                    </button>
                </div>
            </div>
        `}};customElements.define("spotify-now-playing-mobile",Fe);var Ne=class extends b{static get properties(){return{visible:{type:Boolean,reflect:!0},devices:{type:Array},state:{type:Object},loading:{type:Boolean}}}static get styles(){return _`
            :host { display: contents; }

            .title { font-size: var(--spf-text-2xl, 26px); font-weight: 900; margin: 0 0 18px; flex-shrink: 0; }

            /* --- Active device card --- */
            .card {
                background: #2a2a2a;
                border-radius: 12px;
                padding: 16px;
                flex-shrink: 0;
            }
            .card-top { display: flex; align-items: center; gap: 12px; }
            .card-name {
                flex: 1; min-width: 0;
                font-size: var(--spf-text-xl, 22px); font-weight: 900;
                white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            }
            .spk {
                flex-shrink: 0;
                width: 40px; height: 40px;
                color: var(--spf-brand, #1ed760);
            }
            .spk svg { width: 100%; height: 100%; }

            .card-sub {
                display: flex; align-items: center; gap: 8px;
                margin-top: 6px;
                color: var(--spf-brand, #1ed760);
                font-size: var(--spf-text-base, 13.5px); font-weight: 700;
                white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            }
            .card-sub svg { width: 16px; height: 16px; flex-shrink: 0; fill: currentColor; }
            .card-sub span { overflow: hidden; text-overflow: ellipsis; }

            .vol-row { display: flex; align-items: center; gap: 12px; margin-top: 18px; }
            .vol-row svg { width: 22px; height: 22px; fill: rgba(255,255,255,0.8); flex-shrink: 0; }

            input[type="range"] {
                -webkit-appearance: none; appearance: none;
                flex: 1; height: 6px; border-radius: 3px;
                background: #4d4d4d; outline: none; margin: 0; cursor: pointer;
            }
            input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none; appearance: none;
                width: 16px; height: 16px; border-radius: 50%;
                background: #fff; border: none; cursor: pointer;
            }
            input[type="range"]::-moz-range-thumb {
                width: 16px; height: 16px; border-radius: 50%;
                background: #fff; border: none; cursor: pointer;
            }

            .vol-row.disabled input[type="range"] { opacity: 0.4; cursor: default; }
            .vol-row.disabled input[type="range"]::-webkit-slider-thumb { cursor: default; }
            .vol-row.disabled input[type="range"]::-moz-range-thumb { cursor: default; }
            .vol-hint {
                margin-top: 8px;
                font-size: var(--spf-text-sm, 12px);
                color: var(--spf-text-sub, #b3b3b3);
                text-align: center;
            }

            /* --- Device list --- */
            .list {
                margin-top: 8px;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
                flex: 1; min-height: 0;
            }
            .row {
                display: flex; align-items: center; gap: 16px;
                padding: 14px 4px;
                cursor: pointer;
            }
            .row-ic {
                width: 26px; height: 26px; flex-shrink: 0;
                color: rgba(255,255,255,0.85);
                display: flex; align-items: center; justify-content: center;
            }
            .row.active .row-ic { color: var(--spf-brand, #1ed760); }
            .row-ic svg { width: 100%; height: 100%; fill: currentColor; }
            .row-text { min-width: 0; flex: 1; }
            .row-name {
                font-size: var(--spf-text-md, 15px); font-weight: 700; color: #fff;
                white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            }
            .row.active .row-name { color: var(--spf-brand, #1ed760); }
            .row-type {
                display: flex; align-items: center; gap: 6px;
                font-size: var(--spf-text-base, 13.5px); color: var(--spf-text-sub, #b3b3b3); margin-top: 2px;
            }
            .row-type svg { width: 14px; height: 14px; fill: currentColor; }

            .empty { text-align: center; color: var(--spf-text-sub, #b3b3b3); padding: 28px 0; font-size: var(--spf-text-base, 13.5px); }

            .more {
                display: flex; align-items: center; justify-content: center; gap: 8px;
                margin-top: 6px; padding: 14px;
                color: var(--spf-text-sub, #b3b3b3); font-size: var(--spf-text-base, 13.5px); font-weight: 700;
                background: none; border: none; cursor: pointer; width: 100%;
                border-top: 1px solid rgba(255,255,255,0.08);
            }
            .more svg { width: 18px; height: 18px; fill: currentColor; }
        `}constructor(){super(),this.visible=!1,this.devices=[],this.loading=!1,this._volDragging=!1}updated(){if(this.visible&&!this._volDragging){let t=this.shadowRoot.getElementById("vol-slider");if(t){let e=Math.round(this.state?.volume??0);t.value=String(e),this._sliderFill(t,e)}}}_speakerOutline(){return l`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="6" y="2" width="12" height="20" rx="2.5"/>
            <circle cx="12" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
            <circle cx="12" cy="14.5" r="3.2"/>
        </svg>`}_iconForType(t){return st(t)}_castIcon(){return l`<svg viewBox="0 0 24 24"><path d="M1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm0-4v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11zm20-7H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>`}_barsIcon(){return l`<svg viewBox="0 0 24 24"><rect x="3" y="10" width="4" height="11" rx="1"/><rect x="10" y="5" width="4" height="16" rx="1"/><rect x="17" y="13" width="4" height="8" rx="1"/></svg>`}_volLow(){return l`<svg viewBox="0 0 24 24"><path d="M7 9v6h4l5 5V4l-5 5H7z"/></svg>`}_volHigh(){return l`<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05A4.5 4.5 0 0016.5 12zM14 3.23v2.06a7 7 0 010 13.42v2.06a9 9 0 000-17.54z"/></svg>`}_activeDevice(){let t=this.state?.activeDevice;if(t){let i=(this.devices||[]).find(s=>s.name===t);return{name:t,type:i?.type||"Speaker",id:i?.id,supportsVolume:i?.supportsVolume}}let e=(this.devices||[]).find(i=>i.isActive);return e?{name:e.name,type:e.type,id:e.id,supportsVolume:e.supportsVolume}:null}_nowPlayingLine(){let t=this.state?.track;if(!t)return"";let e=t.artists?.map(i=>i.name).join(", ")||"";return e?`${t.name} \u2014 ${e}`:t.name}_sliderFill(t,e){t.style.background=`linear-gradient(to right, var(--spf-brand, #1ed760) ${e}%, #4d4d4d ${e}%)`}_onVolInput(t){this._volDragging=!0;let e=Number(t.target.value);this._sliderFill(t.target,e),this._volTimer&&clearTimeout(this._volTimer),this._volTimer=setTimeout(()=>{this.dispatchEvent(new CustomEvent("volume-change",{detail:e/100,bubbles:!0,composed:!0}))},120)}_onVolCommit(t){this._volDragging=!1;let e=Number(t.target.value);this._volTimer&&clearTimeout(this._volTimer),this.dispatchEvent(new CustomEvent("volume-change",{detail:e/100,bubbles:!0,composed:!0}))}_select(t){if(t.isActive||t.name===this.state?.activeDevice){this._close();return}k("medium"),this.dispatchEvent(new CustomEvent("device-selected",{detail:t,bubbles:!0,composed:!0}))}_close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}_openManager(){this.dispatchEvent(new CustomEvent("open-manager",{bubbles:!0,composed:!0}))}render(){let t=this._activeDevice(),e=t?.supportsVolume===!1,i=Math.round(this.state?.volume??0),s=this._nowPlayingLine(),r=(this.devices||[]).filter(n=>!(n.isActive||t&&n.name===t.name));return l`
            <spotify-bottom-sheet .visible=${this.visible}>
                <h2 class="title">Connect</h2>

                ${t?l`
                    <div class="card">
                        <div class="card-top">
                            <div class="card-name">${t.name}</div>
                            <div class="spk">${this._speakerOutline()}</div>
                        </div>
                        ${s?l`
                            <div class="card-sub">${this._barsIcon()}<span>${s}</span></div>
                        `:""}
                        <div class="vol-row ${e?"disabled":""}">
                            ${this._volLow()}
                            <input id="vol-slider" type="range" min="0" max="100" value=${String(i)}
                                   ?disabled=${e}
                                   style="background: linear-gradient(to right, var(--spf-brand, #1ed760) ${i}%, #4d4d4d ${i}%);"
                                   @input=${this._onVolInput} @change=${this._onVolCommit}>
                            ${this._volHigh()}
                        </div>
                        ${e?l`<div class="vol-hint">Volume is controlled on the device</div>`:""}
                    </div>
                `:""}

                <div class="list">
                    ${this.loading&&r.length===0?l`<div class="empty">Scanning for devices…</div>`:r.length?r.map(n=>l`
                                <div class="row" @click=${()=>this._select(n)}>
                                    <div class="row-ic">${this._iconForType(n.type)}</div>
                                    <div class="row-text">
                                        <div class="row-name">${n.name}</div>
                                        <div class="row-type">${this._castIcon()} ${n.type||"Spotify Connect"}</div>
                                    </div>
                                </div>`):l`<div class="empty">No other devices found.</div>`}

                    <button class="more" @click=${this._openManager}>
                        <svg viewBox="0 0 24 24"><path d="M3 17v2h6v-2H3zM3 5v2h18V5H3zm0 6h12v-2H3v2z"/></svg>
                        Manage devices
                    </button>
                </div>
            </spotify-bottom-sheet>
        `}};customElements.define("spotify-connect-panel",Ne);var Ge=class extends b{static get properties(){return{visible:{type:Boolean,reflect:!0},hass:{type:Object},config:{type:Object},state:{type:Object},playerController:{type:Object},_tab:{type:String,state:!0}}}static get styles(){return[Ct,_`
            :host { display: contents; }

            .q-head { flex-shrink: 0; margin-bottom: 8px; }
            .q-title { font-size: var(--spf-text-2xl, 26px); font-weight: 900; }
            .q-sub {
                font-size: var(--spf-text-base, 13.5px); color: var(--spf-text-sub, #b3b3b3); margin-top: 2px;
                white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            }
            .q-sub b { color: #fff; font-weight: 700; }

            .q-scroll {
                flex: 1; min-height: 0;
                overflow-y: auto; -webkit-overflow-scrolling: touch;
                margin: 0 -4px;
            }

            .row {
                display: flex; align-items: center; gap: 14px;
                padding: 10px 4px; cursor: pointer;
            }
            .art {
                width: 52px; height: 52px; border-radius: 4px; flex-shrink: 0;
                background-size: cover; background-position: center;
                background-color: var(--spf-skeleton-bg, #282828);
            }
            .meta { flex: 1; min-width: 0; }
            .name {
                font-size: var(--spf-text-md, 15px); font-weight: 700; color: #fff;
                white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                display: flex; align-items: center; gap: 8px;
            }
            .sub {
                font-size: var(--spf-text-base, 13.5px); color: var(--spf-text-sub, #b3b3b3); margin-top: 2px;
                white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            }
            .row.now .name { color: var(--spf-brand, #1ed760); }
            .eq { width: 16px; height: 16px; flex-shrink: 0; display: inline-flex; }
            .eq svg { width: 100%; height: 100%; fill: var(--spf-brand, #1ed760); }

            .np-toggle {
                flex-shrink: 0; width: 44px; height: 44px; border-radius: 50%;
                background: #fff; color: #000; border: none; cursor: pointer;
                display: flex; align-items: center; justify-content: center;
            }
            .np-toggle:active { transform: scale(0.94); }
            .np-toggle svg { width: 22px; height: 22px; fill: #000; }

            .row-menu-btn {
                flex-shrink: 0; width: 40px; height: 40px;
                background: transparent; border: none; cursor: pointer;
                display: flex; align-items: center; justify-content: center;
                color: var(--spf-text-sub, #b3b3b3);
            }
            .row-menu-btn:hover { color: var(--spf-text-main, #fff); }
            .row-menu-btn svg { fill: currentColor; }

            .empty { text-align: center; color: var(--spf-text-sub, #b3b3b3); padding: 40px 0; font-size: var(--spf-text-base, 13.5px); }

            /* Bottom tab switch */
            .tabs {
                flex-shrink: 0; display: flex; gap: 10px; padding-top: 14px;
            }
            .tab {
                flex: 1; padding: 12px; border-radius: 8px; cursor: pointer;
                background: rgba(255,255,255,0.08); color: var(--spf-text-sub, #b3b3b3);
                border: none; font-size: var(--spf-text-base, 13.5px); font-weight: 700; text-align: center;
                transition: color 0.15s ease, background 0.15s ease;
            }
            .tab.active { background: rgba(255,255,255,0.18); color: #fff; }
        `]}constructor(){super(),this.visible=!1,this._tab="queue"}_eqIcon(){return this.state?.isPlaying?l`<span class="eq">${j(16)}</span>`:l`<span class="eq"><svg viewBox="0 0 24 24"><rect x="3" y="10" width="4" height="11" rx="1"/><rect x="10" y="5" width="4" height="16" rx="1"/><rect x="17" y="13" width="4" height="8" rx="1"/></svg></span>`}_context(){return(this.hass?.states?.[this.config?.entity]?.attributes||{}).media_playlist||""}_close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}_setTab(t){this._tab!==t&&(this._tab=t,t==="recent"?this.playerController?.refreshRecent():this.playerController?.refreshQueue())}_togglePlay(t){t.stopPropagation(),k("medium"),this.playerController?.pause()}_playTrack(t){t&&(k("light"),this.playerController?.playTrackFromQueue(t))}_trackMenu(t,e){t.stopPropagation(),this.dispatchEvent(new CustomEvent("open-track-menu",{detail:{name:e?.name,artist:e?.artists?.map(i=>i.name).join(", ")||"",album:e?.album?.name||"",uri:e?.uri,id:e?.id,image:e?.album?.images?.[0]?.url,anchor:t.currentTarget.getBoundingClientRect(),context:{surface:"queue",sourceUri:this.playerController?.sourceContextUri()||null}},bubbles:!0,composed:!0}))}_row(t,{now:e=!1}={}){return ce(t,{variant:"panel",active:e,onClick:()=>e?null:this._playTrack(t),titleIcon:e?this._eqIcon():null,trailing:e?l`
                <button class="np-toggle" @click=${this._togglePlay} aria-label="${this.state?.isPlaying?"Pause":"Play"}">
                    <svg viewBox="0 0 24 24"><path d="${this.state?.isPlaying?"M6 19h4V5H6v14zm8-14v14h4V5h-4z":"M8 5v14l11-7z"}"/></svg>
                </button>
            `:l`
                <button class="row-menu-btn" @click=${i=>this._trackMenu(i,t)} aria-label="More options">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="5" cy="12" r="2"/></svg>
                </button>
            `})}_renderQueueTab(){let t=this.state?.track,e=this.state?.queue||[];return l`
            ${t?this._row(t,{now:!0}):""}
            ${e.length?e.map(i=>this._row(i)):l`<div class="empty">Nothing queued up next.</div>`}
        `}_renderRecentTab(){let t=this.state?.recentTracks||[];return t.length?l`${t.map(e=>this._row(e.track||e))}`:l`<div class="empty">No recently played tracks.</div>`}render(){let t=this._context();return l`
            <spotify-bottom-sheet .visible=${this.visible}>
                <div class="q-head">
                    <div class="q-title">Queue</div>
                    ${t?l`<div class="q-sub">Playing <b>${t}</b></div>`:""}
                </div>

                <div class="q-scroll">
                    ${this._tab==="queue"?this._renderQueueTab():this._renderRecentTab()}
                </div>

                <div class="tabs">
                    <button class="tab ${this._tab==="queue"?"active":""}" @click=${()=>this._setTab("queue")}>Queued</button>
                    <button class="tab ${this._tab==="recent"?"active":""}" @click=${()=>this._setTab("recent")}>Recently Played</button>
                </div>
            </spotify-bottom-sheet>
        `}};customElements.define("spotify-queue-panel",Ge);var We=class extends b{static get properties(){return{visible:{type:Boolean,reflect:!0},accounts:{type:Array},activeEntity:{type:String},currentImage:{type:String}}}static get styles(){return _`
            :host { display: contents; }

            .title { font-size: var(--spf-text-2xl, 26px); font-weight: 900; margin: 0 0 18px; flex-shrink: 0; }

            .list {
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
                flex: 1; min-height: 0;
            }
            .row {
                display: flex; align-items: center; gap: 16px;
                padding: 12px 4px;
                cursor: pointer;
            }
            .av {
                width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0;
                background-size: cover; background-position: center;
                background-color: #333;
                display: flex; align-items: center; justify-content: center;
                color: rgba(255,255,255,0.85);
            }
            .av svg { width: 28px; height: 28px; fill: currentColor; }
            .row-text { min-width: 0; flex: 1; }
            .row-name {
                font-size: var(--spf-text-lg, 17px); font-weight: 700; color: #fff;
                white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            }
            .row.active .row-name { color: var(--spf-brand, #1ed760); }
            .badge {
                flex-shrink: 0;
                font-size: var(--spf-text-sm, 12px); font-weight: 700;
                color: #000; background: var(--spf-brand, #1ed760);
                padding: 3px 10px; border-radius: 999px;
            }
            .empty { text-align: center; color: var(--spf-text-sub, #b3b3b3); padding: 28px 0; font-size: var(--spf-text-base, 13.5px); }
        `}constructor(){super(),this.visible=!1,this.accounts=[],this.activeEntity="",this.currentImage=""}_personIcon(){return l`<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`}_imageFor(t,e){return t.image||(e?this.currentImage:"")||""}_close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}_select(t,e){if(e){this._close();return}k("medium"),this.dispatchEvent(new CustomEvent("account-selected",{detail:t,bubbles:!0,composed:!0}))}render(){let t=this.accounts||[];return l`
            <spotify-bottom-sheet .visible=${this.visible}>
                <h2 class="title">Switch account</h2>
                <div class="list">
                    ${t.length?t.map(e=>{let i=e.entity===this.activeEntity,s=this._imageFor(e,i);return l`
                            <div class="row ${i?"active":""}" @click=${()=>this._select(e,i)}>
                                <div class="av" style=${s?`background-image: url('${s}')`:""}>
                                    ${s?"":this._personIcon()}
                                </div>
                                <div class="row-text">
                                    <div class="row-name">${e.name||e.entity}</div>
                                </div>
                                ${i?l`<span class="badge">Current</span>`:""}
                            </div>`}):l`<div class="empty">No accounts configured.</div>`}
                </div>
            </spotify-bottom-sheet>
        `}};customElements.define("spotify-account-panel",We);var hs=_`
    :host { display: block; }

    /* Tighten the gap above the first home section (Pinned) on mobile + desktop.
       The page already pads down past the header; the extra scroll-content top
       padding + first section margin pushed content too far down. */
    .scroll-content { padding-top: 0; }
    .home-section:first-child .section-header,
    .home-section:first-child .section-title { margin-top: 0; }

    /* --- Native-style pinned grid (mobile): 2 columns, up to 4 rows, then it
       slides sideways as a snapping carousel. --- */
    .pinned-grid-mobile {
        display: grid;
        grid-auto-flow: column;
        grid-template-rows: repeat(4, 56px);
        grid-auto-columns: calc((100% - 10px) / 2);
        gap: 8px 10px;
        overflow-x: auto;
        overflow-y: hidden;
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
        scrollbar-width: none;
        padding-bottom: 4px;
    }
    .pinned-grid-mobile::-webkit-scrollbar { display: none; }
    .pinned-grid-mobile .recent-pill {
        width: 100%;
        height: 56px;
        scroll-snap-align: start;
    }
    .pinned-grid-mobile .recent-pill-img { width: 56px; height: 56px; }

    /* --- Global Pills Grid --- */
    .recent-grid-layout {
        display: grid; grid-template-rows: repeat(2, 1fr); 
        grid-auto-flow: column; grid-auto-columns: 180px; 
        gap: 12px; overflow-x: auto; padding-bottom: 16px; 
        scroll-behavior: smooth; scrollbar-width: none;
    }
    .recent-grid-layout::-webkit-scrollbar { display: none; }

    .recent-pill {
        display: flex; align-items: center;
        background: var(--spf-bg-card); border-radius: 4px;
        
        /* FIX: Height is already set here, but ensure flex-shrink doesn't collapse it */
        height: 64px; 
        flex-shrink: 0;
        
        overflow: hidden; 
        transition: background 0.2s, transform 0.1s ease;
        cursor: pointer; border: 1px solid transparent;
        box-sizing: border-box;
    }
    @media (hover: hover) { .recent-pill:hover { background: var(--spf-bg-card-hover); border-color: var(--spf-border); } }
    .recent-pill:active { background: var(--spf-bg-card-hover); transform: scale(0.98); }
    
    .recent-pill-img { width: 64px; height: 64px; background-size: cover; background-position: center; flex-shrink: 0; }
    .recent-pill-text {
        flex: 1; min-width: 0;
        font-size: var(--spf-text-base, 13.5px); font-weight: 700; color: var(--spf-text-main);
        padding: 0 12px; white-space: normal; line-height: 1.3;
        display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    }
    /* Now-playing visualizer pinned to the far right of the pill. */
    .pill-eq {
        flex-shrink: 0; margin-left: auto; padding-right: 12px;
        display: flex; align-items: center;
    }

    @media (max-width: 768px) {
        .recent-grid-layout { grid-auto-columns: 160px; margin-left: -16px; margin-right: -16px; padding-left: 16px; padding-right: 16px; }
        .recent-pill { height: 56px; }
        .recent-pill-img { width: 56px; height: 56px; }
        .recent-pill-text { font-size: var(--spf-text-sm, 12px); }
    }

    /* Skeleton styles (.skeleton-pulse, @keyframes pulse, .card-*-sk) live in
       shared-styles.js, which spotify-home also imports. */
`;function dt(a,t,e){let i=t===!0||t==="artist",s=M(a),r=a.name||a.title||"Unknown",n=a.subtitle??(a.release_date?.split("-")[0]||a.type||"");return l`
        <div class="media-card interactive ${i?"artist-card":""}" 
             @click=${e}>
            <div class="media-image-wrapper">
                <div class="media-image ${s?"":"art-fallback"}" style="${s?`background-image: url('${s}');`:""} ${i?"border-radius: 50%;":""}"></div>
                ${i?"":l`
                <div class="play-btn-overlay">
                    ${Y(24)}
                </div>
                `}
            </div>
            <div class="media-title" style="${i?"text-align: center;":""}">${r}</div>
            ${i?"":l`<div class="media-subtitle">${n}</div>`}
        </div>
    `}function ps(a,t,e,i,s=!1,r=!1){let n=M(a,"track"),o=a.name||"Unknown";return l`
        <div class="artist-top-track interactive">
            <div class="track-art-left ${n?"":"art-fallback"}" style="${n?`background-image: url('${n}')`:""}">
                <button class="play-btn-overlay mini" @click=${c=>{c.stopPropagation(),t(c)}}>
                    ${r?j(24):Y()}
                </button>
            </div>
            <div class="track-info-middle">
                <div class="track-title" style="${r?"color: var(--spf-brand); font-weight: bold;":""}">
                    ${r?l`<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 4px; display:inline-block; vertical-align: middle;"><rect x="4" y="6" width="3" height="12"><animate attributeName="height" values="6;12;4;12;6" dur="0.8s" repeatCount="indefinite" /><animate attributeName="y" values="12;6;14;6;12" dur="0.8s" repeatCount="indefinite" /></rect><rect x="10" y="3" width="3" height="18"><animate attributeName="height" values="10;18;5;18;10" dur="0.9s" repeatCount="indefinite" /><animate attributeName="y" values="10;3;13;3;10" dur="0.9s" repeatCount="indefinite" /></rect><rect x="16" y="8" width="3" height="12"><animate attributeName="height" values="8;12;5;12;8" dur="1.1s" repeatCount="indefinite" /><animate attributeName="y" values="11;8;13;8;11" dur="1.1s" repeatCount="indefinite" /></rect></svg>`:""}
                    ${o}
                </div>
                <!-- Optional Meta info -->
            </div>
            <div class="track-actions-right">
                <button class="track-action-btn" @click=${i} style="${s?"color: var(--spf-brand);":""}">
                   ${ns(s)}
                </button>
                <button class="track-action-btn" @click=${e}>
                     ${H}
                </button>
            </div>
        </div>
    `}function rt(a=!1){return l`
      <div class="media-card skeleton-pulse ${a?"artist-card":""}">
        <div class="media-image-wrapper">
            <div class="card-image-sk" style="${a?"border-radius:50%":""}"></div>
        </div>
        <div class="card-text-sk"></div>
        <div class="card-text-sk short"></div>
      </div>
    `}function us(){return l`
        <div class="artist-top-track skeleton-pulse">
            <div class="track-art-left skeleton-pulse" style="background: var(--spf-bg-card-hover);"></div>
            <div class="track-info-middle">
                <div class="card-text-sk" style="width: 40%; margin-bottom: 4px;"></div>
                <div class="card-text-sk short" style="width: 25%;"></div>
            </div>
        </div>
    `}function fs(){return l`
        <div class="track-row skeleton-pulse" style="pointer-events: none;">
            <div class="track-num" style="width: 16px; height: 16px; background: rgba(255,255,255,0.1); border-radius: 4px;"></div>
            <div class="track-art-small" style="width: 40px; height: 40px; background: rgba(255,255,255,0.1); border-radius: 4px; margin-right: 12px;"></div>
            <div class="track-info">
                <div class="card-text-sk" style="width: 40%; margin-bottom: 6px;"></div>
                <div class="card-text-sk short" style="width: 25%;"></div>
            </div>
            <div class="track-actions-right"></div>
        </div>
    `}function gs(a,t,e,i={}){if(!a)return"";let s=a.artists?a.artists.map(v=>v.name).join(", "):"Unknown",r=a.album?.images?.[0]?.url,n={name:a.name,artist:s,album:a.album?.name||"",uri:a.uri,id:a.id,image:r},o=i.layout==="playlist",{isPlaying:c=!1,isAlbum:d=!1,liked:p=!1,onSave:u,onQueue:g,onMenu:f}=i,h=o&&r&&!d?l`<img src="${r}" style="width: 40px; height: 40px; border-radius: 4px; object-fit: cover;" loading="lazy">`:l`<div class="track-num">${t}</div>`,m=o?l`
            <div class="track-name" style="${c||d?"":"color: white;"}">
                ${c?l`<div class="track-eq" aria-label="Now playing"><span></span><span></span><span></span></div>`:""}
                <span class="track-name-text">${a.name}</span>
            </div>`:l`<div class="track-name">${a.name}</div>`,x=l`
        ${u?l`
            <button class="track-action-btn ${p?"is-favorite":""}" data-action="save" @click=${v=>u(v,a)}>
               ${it(p)}
            </button>`:""}
        ${g?l`
            <button class="track-action-btn" data-action="queue" @click=${v=>g(v,a)}>
               ${os}
            </button>`:""}
        ${f?l`
            <button class="track-action-btn" data-action="menu" @click=${v=>f(v,n)}>
                ${H}
            </button>`:""}`;return l`
        <div class="track-row interactive ${o?c?"playing":"":r?"with-art":""}"
             data-track-id="${a.id}"
             data-uri="${a.uri}"
             @click=${e?v=>e(v,a):null}>

            ${h}

            ${!o&&r?l`
            <div class="track-art-small" style="background-image: url('${r}');"></div>
            `:""}

            <div class="track-info">
                ${m}
                <div class="track-artist">${s}</div>
            </div>

            <div class="track-actions-right">
                ${x}
            </div>
        </div>
    `}function ms(a,t,e){let i=M(a,t),s=a.name||"Unknown",r="";a.owner?r=`By ${a.owner.display_name}`:a.artists&&Array.isArray(a.artists)?r=a.artists.map(o=>o.name).join(", "):t==="artist"?r="Artist":t==="album"&&(r=a.release_date?a.release_date.split("-")[0]:"Album");let n=t==="artist";return l`
        <div class="track-row interactive" 
             style="grid-template-columns: 80px 1fr auto; height: auto; padding: 12px;"
             @click=${e}>
            
            <div class="track-art-small ${i?"":"art-fallback"}" style="${i?`background-image: url('${i}');`:""} width: 64px; height: 64px; border-radius: ${n?"50%":"4px"}; margin-right: 16px;"></div>

            <div class="track-info">
                <div class="track-name" style="font-size: var(--spf-text-md, 15px); margin-bottom: 4px;">${s}</div>
                <div class="track-artist">${r}</div>
            </div>

            <div class="track-actions-right">
                <svg width="24" height="24" fill="var(--spf-text-sub)" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
            </div>
        </div>
    `}function de(a=[]){let t=new Set,e=[];return a.forEach(i=>{i.track&&i.track.album&&!t.has(i.track.album.id)&&(t.add(i.track.album.id),e.push({...i.track.album,name:i.track.name,artists:i.track.artists,type:"album",uri:i.track.album.uri}))}),e}var hr=8;function vs(a,t=[]){if(a==null)return null;let e=Array.isArray(a)?[...a]:[],i=new Set(e.map(s=>s.id));for(let s of t||[]){if(e.length>=hr)break;!s||!s.id||i.has(s.id)||(e.push({...s,type:s.type||s._fallbackType||"album"}),i.add(s.id))}return e}async function bs(a,t){return!a||!Array.isArray(t)||t.length===0?[]:(await Promise.all(t.map(async i=>{try{let s=await pr(a,i);if(!s)return null;let r=i.title||s.name||"";return{id:i.id,type:i.type,name:r,title:r,subtitle:s.subtitle||"",image:s.image||null,uri:s.uri||`spotify:${i.type}:${i.id}`,fixed:!0}}catch(s){return console.warn(`[SpotifyBrowser] pinned: could not load ${i.type} ${i.id}:`,s?.message||s),null}}))).filter(Boolean)}async function pr(a,t){let e=s=>s?.result||null;if(t.recommended)return{image:(await a.fetchSpotifyPlus("get_playlist_cover_image",{playlist_id:t.id}))?.result?.url||null,subtitle:"By Spotify",uri:`spotify:playlist:${t.id}`};if(t.type==="album"){let s=e(await a.fetchSpotifyPlus("get_album",{album_id:t.id}));return s&&{name:s.name,image:s.images?.[0]?.url,uri:s.uri,subtitle:(s.artists||[]).map(r=>r.name).join(", ")||"Album"}}if(t.type==="artist"){let s=e(await a.fetchSpotifyPlus("get_artist",{artist_id:t.id}));return s&&{name:s.name,image:s.images?.[0]?.url,uri:s.uri,subtitle:"Artist"}}if(t.type==="track"){let s=e(await a.fetchSpotifyPlus("get_track",{track_id:t.id}));return s&&{name:s.name,image:s.album?.images?.[0]?.url,uri:s.uri,subtitle:(s.artists||[]).map(r=>r.name).join(", ")}}let i=e(await a.fetchSpotifyPlus("get_playlist",{playlist_id:t.id}));return i&&{name:i.name,image:i.images?.[0]?.url,uri:i.uri,subtitle:i.owner?.display_name?`By ${i.owner.display_name}`:"Playlist"}}function ys(){return l`
      <div class="recent-pill skeleton-pulse">
        <div class="recent-pill-img"></div>
        <div class="recent-pill-text" style="width: 60%; height: 12px; background: #333; border-radius: 4px;"></div>
      </div>
    `}function ur(a,t){let e=a.subtitle;return!e&&a.owner&&(e=a.owner.display_name),!e&&a.artists&&Array.isArray(a.artists)&&(e=a.artists.map(i=>i.name).join(", ")),e||(e=t==="artist"?"Artist":""),e}var Qe=class extends b{static get properties(){return{hass:{type:Object},api:{type:Object},config:{type:Object},_offsets:{type:Object,state:!0},_totals:{type:Object,state:!0},_fetching:{type:Object,state:!0},_sectionData:{type:Object,state:!0},_expandedSections:{type:Object,state:!0}}}static get styles(){return[$,hs]}constructor(){super(),this._offsets={favorites:0,artists:0,albums:0,recent:0},this._totals={favorites:null,artists:null,albums:null,recent:null},this._fetching={favorites:!1,artists:!1,albums:!1,recent:!1},this._sectionData={},this._expandedSections=new Set,this._hasLoaded=!1,this._hassSig=void 0}firstUpdated(t){super.firstUpdated(t),this.hass&&this.api&&!this._hasLoaded&&this.loadHomeData()}disconnectedCallback(){super.disconnectedCallback(),this._clearLongPress()}shouldUpdate(t){if(t.has("hass")||t.has("api")||t.has("pinned")){if(this.hass&&this.api&&!this._hasLoaded&&this.loadHomeData(),this._hasLoaded&&this.hass&&this.pinned&&t.has("hass")){let e=t.get("hass");this.pinned.hasDataChanged(e,this.hass)&&this.fetchSectionData("pinned")}t.has("pinned")&&this.pinned&&this.fetchSectionData("pinned")}if(t.has("hass")){let e=this._hassRenderSignature(),i=e!==this._hassSig;if(this._hassSig=e,!i&&t.size===1)return!1}return!0}_hassRenderSignature(){let t=this.api?.entityId||this.config?.entity,e=ot(this.hass,t),i=e?.attributes||{};return[e?.state,i.media_content_id,i.media_context_content_id,!!this.pinned&&this.pinned.checkAvailability(),!!this.pinned&&this.pinned.canEdit()].join("|")}_onPinnedPointerDown(t){if(this._suppressClick=!1,this._clearLongPress(),t.pointerType==="mouse"&&t.button!==0)return;let e=t.target.closest(".interactive");!e||!e.closest('.home-section[data-section-id="pinned"]')||!this.pinned||!this.pinned.canEdit()||(this._lpStartX=t.clientX,this._lpStartY=t.clientY,this._longPressTimer=setTimeout(()=>{this._longPressTimer=null,this._suppressClick=!0,k("medium"),this.dispatchEvent(new CustomEvent("open-reorder",{bubbles:!0,composed:!0}))},500))}_onPinnedPointerMove(t){this._longPressTimer&&(Math.abs(t.clientX-this._lpStartX)>10||Math.abs(t.clientY-this._lpStartY)>10)&&this._clearLongPress()}_clearLongPress(){this._longPressTimer&&(clearTimeout(this._longPressTimer),this._longPressTimer=null)}_onScrollRight(t){t.stopPropagation();let e=t.currentTarget.closest(".carousel-wrapper"),i=e?e.querySelector(".carousel-layout"):null;if(i){let s=i.clientWidth*.75;i.scrollBy({left:s*1,behavior:"smooth"})}}_onReorderClick(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("open-reorder",{bubbles:!0,composed:!0}))}_onNavigateSection(t,e){t.stopPropagation(),this.dispatchEvent(new CustomEvent("navigate",{detail:{pageId:`section:${e}`},bubbles:!0,composed:!0}))}_toggleSectionView(t,e){t.stopPropagation();let i=new Set(this._expandedSections);i.has(e)?i.delete(e):i.add(e),this._expandedSections=i}_onItemClick(t,e,i=""){if(this._suppressClick){this._suppressClick=!1;return}let s=t.id,r=t.name||t.title||"Unknown";if(s==="user-library"){this.dispatchEvent(new CustomEvent("navigate",{detail:{pageId:"likedsongs"},bubbles:!0,composed:!0}));return}if(e==="track"){let n=t.uri||`spotify:track:${s}`;this.api.playMedia(n,"track");return}s&&e?this.dispatchEvent(new CustomEvent("navigate",{detail:{pageId:`${e}:${s}`,data:{title:r,type:e,subtitle:i}},bubbles:!0,composed:!0})):console.warn("[Home] Card click missing id or type:",{id:s,type:e})}_cardTemplate(t,e){let i=ur(t,e);return dt({...t,subtitle:i},e,()=>this._onItemClick(t,e,i))}_recentPillTemplate(t,e=null,i=!1){let s=t.id,r=t.uri,n=t.name||t.title||"Unknown",o=M(t),c=!1;return e&&t.type==="track"&&(s===e||r===`spotify:track:${e}`)&&(c=!0),l`
        <div class="recent-pill interactive" @click=${()=>this._onItemClick(t,t.type)}>
            <div class="recent-pill-img" style="background-image: url('${o}');">
                 ${c?l`<div class="play-btn-overlay mini" style="opacity: 1; background: rgba(0,0,0,0.7);">${j(18)}</div>`:""}
            </div>
            <div class="recent-pill-text" style="${c?"color: var(--spf-brand); font-weight: bold;":""}">${n}</div>
            ${i?l`<div class="pill-eq" aria-label="Now playing">${j(18)}</div>`:""}
        </div>
        `}_carouselSection(t,e,i=null){let s=!!i&&i.length>0,r=this._expandedSections.has(e),n;return i===null?n=Array(6).fill(0).map(()=>rt(e.includes("artists"))):i.length===0?n=l`<div style="padding:20px; opacity:0.5; white-space:nowrap;">No content found.</div>`:n=i.map(o=>this._cardTemplate(o,o.type||o._fallbackType)),l`
        <section class="home-section" data-section-id="${e}">
            <div class="section-header" style="display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center;">
                    <h3 class="section-title" style="margin:0;">${t}</h3>
                    <button class="icon-btn expand-btn" @click=${o=>this._toggleSectionView(o,e)} aria-label="Toggle View" style="background:none; border:none; color:var(--secondary-text-color, #b3b3b3); cursor:pointer; margin-left: 8px; padding: 4px; display: flex; align-items: center;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(${r?180:0}deg);">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>
                </div>
                ${s?l`<button class="see-all-btn" @click=${o=>this._onNavigateSection(o,e)}>See All</button>`:l`<button class="see-all-btn" style="display:none">See All</button>`}
            </div>
            <div class="carousel-wrapper">
                <div class="${r?"section-grid":"carousel-layout"}" id="carousel-${e}" data-section="${e}">
                    ${n}
                </div>
                <button class="scroll-btn right" @click=${this._onScrollRight} style="${s&&i.length>5&&!r?"":"display:none"}">
                    <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                </button>
            </div>
        </section>
        `}render(){if(!this.config)return l``;let t=window.matchMedia("(max-width: 768px)").matches,e=this._getSectionOrder();return this.pinned&&this.pinned.checkAvailability()||(e=e.filter(s=>s!=="pinned")),t?this.renderHomeMobile(e):this.renderHomeDesktop(e)}_pinnedDisplayItems(t){return vs(t,this._sectionData?.recent||[])}renderPinnedSection(t,e,i=null,s,r=!1){let n=!!this.pinned&&this.pinned.canEdit();return r?this.renderPinnedMobile(t,e,this._pinnedDisplayItems(i),s,n):(i=this._pinnedDisplayItems(i),i===null?l`
            <section class="home-section" data-section-id="${e}">
                <div class="carousel-wrapper">
                     <div class="carousel-layout" style="gap: 16px; padding-bottom: 8px;">
                        ${Array(6).fill(0).map(()=>rt())}
                     </div>
                </div>
            </section>
            `:i.length===0?"":l`
        <section class="home-section" data-section-id="${e}">
            <div class="carousel-wrapper">
                 <div class="carousel-layout" style="gap: 16px; padding-bottom: 8px;">
                    ${i.map(o=>this._cardTemplate(o,o.type||"playlist"))}
                 </div>
            </div>
        </section>
        `)}renderPinnedMobile(t,e,i,s,r){let n,o=4;if(i===null)n=Array(8).fill(0).map(()=>ys());else if(i.length===0){if(!r)return"";n=l`<div style="padding: 8px 0; color: var(--secondary-text-color); font-size: var(--spf-text-base, 13.5px); opacity: 0.7;">Nothing there.</div>`}else n=i.map(c=>this._recentPillTemplate(c,s,this._isContextPlaying(c.uri))),o=Math.min(4,i.length);return l`
        <section class="home-section" data-section-id="${e}">
            <div class="pinned-grid-mobile" id="grid-${e}" data-section="${e}" style="grid-template-rows: repeat(${o}, 56px);">
                ${n}
            </div>
        </section>
        `}renderHomeDesktop(t){let e=this._sectionData||{},i=this._getPlayingTrackId(),s={pinned:this.renderPinnedSection("Pinned","pinned",e.pinned,i),recent:this._carouselSection("Recently Played","recent",e.recent),favorites:this._carouselSection("Your Favorite Playlists","favorites",e.favorites),artists:this._carouselSection("Followed Artists","artists",e.artists),albums:this._carouselSection("Your Favorite Albums","albums",e.albums)};return l`<div class="scroll-content"
            @pointerdown=${this._onPinnedPointerDown}
            @pointermove=${this._onPinnedPointerMove}
            @pointerup=${this._clearLongPress}
            @pointercancel=${this._clearLongPress}
            @pointerleave=${this._clearLongPress}
        >${t.map(r=>s[r]||"")}</div>`}_getSectionOrder(){return this.config.home?.sort||["pinned","recent","favorites","artists","albums"]}_getPlayingTrackId(){return Zt(this.hass,this.api?.entityId||this.config?.entity)}_isContextPlaying(t){if(!t)return!1;let e=this.api?.entityId||this.config?.entity;if(t==="spotify:user-library"){let i=ot(this.hass,e);if(!i||i.state!=="playing")return!1;let s=i.attributes?.media_context_content_id||"";return/collection|liked/i.test(s)}return lt(this.hass,e,t)}renderHomeMobile(t){let e=this._sectionData||{},i=this._getPlayingTrackId(),s=r=>{if(r==="recent"){let n;return e.recent?e.recent.length===0?n="No recent items.":n=e.recent.map(o=>this._recentPillTemplate(o,i,this._isContextPlaying(o.uri))):n=Array(6).fill(0).map(()=>ys()),l`
                    <h3 class="section-title" style="margin-bottom:16px;">Good Morning</h3>
                    <div class="recent-grid-layout" id="grid-recent" data-section="recent" style="margin-bottom: 32px;">
                        ${n}
                    </div>
                `}else{if(r==="pinned")return this.renderPinnedSection("Pinned","pinned",e.pinned,i,!0);if(r==="favorites")return this._carouselSection("Your Playlists","favorites",e.favorites);if(r==="artists")return this._carouselSection("Your Artists","artists",e.artists);if(r==="albums")return this._carouselSection("Your Albums","albums",e.albums)}return""};return l`<div class="scroll-content"
            @pointerdown=${this._onPinnedPointerDown}
            @pointermove=${this._onPinnedPointerMove}
            @pointerup=${this._clearLongPress}
            @pointercancel=${this._clearLongPress}
            @pointerleave=${this._clearLongPress}
        >${t.map(r=>s(r))}</div>`}async loadHomeData(){if(!this.hass||!this.api)return;this._hasLoaded=!0,this._offsets={favorites:0,artists:0,albums:0,recent:0};let t=this.pinned&&this.pinned.checkAvailability(),e=this._getSectionOrder();t||(e=e.filter(s=>s!=="pinned"));let i=e.map(s=>this.fetchSectionData(s));await Promise.allSettled(i)}async _resolveConfigPins(){if(!(!this.pinned||!this.api||this._configPinsResolved)){if(!this.pinned.hasConfigItems()){this._configPinsResolved=!0;return}try{let t=await bs(this.api,this.pinned.configItems);this.pinned.setResolvedConfigPins(t),this._configPinsResolved=!0}catch(t){console.warn("[SpotifyHome] Could not resolve config pins:",t)}}}async fetchSectionData(t){if(this._fetching[t])return;if(this._fetching[t]=!0,this.requestUpdate(),t==="pinned"){await this._resolveConfigPins();let s=await this.pinned.getItems();s&&(this._sectionData={...this._sectionData,pinned:s}),this._fetching.pinned=!1,this.requestUpdate();return}let e=this._offsets[t];if(e>0&&this._totals[t]!==null&&e>=this._totals[t]){this._fetching[t]=!1;return}let i=20;try{let s=null,r="playlist";if(t==="favorites")s=(await this.api.fetchSpotifyPlus("get_playlist_favorites",{limit:i,offset:e,...et()}))?.result,r="playlist";else if(t==="recent"){if(e>0)return;let n=await this.api.fetchSpotifyPlus("get_player_recent_tracks",{limit:20});if(n?.result?.items){let o=de(n.result.items);s={items:o,total:o.length},r="album"}}else if(t==="artists"){if(e>0)return;let n=await this.api.fetchSpotifyPlus("get_artists_followed",{limit:i});n?.result&&(s=n.result,s.artists&&(s=s.artists)),r="artist"}else if(t==="albums"){let n=await this.api.fetchSpotifyPlus("get_album_favorites",{limit:i,offset:e});n?.result?.items&&(s={items:n.result.items.map(o=>o.album).filter(Boolean),total:n.result.total},r="album")}if(s&&Array.isArray(s.items)){s.total!==void 0&&(this._totals[t]=s.total),this._offsets[t]+=s.items.length;let n=this._sectionData[t]||[],o=s.items.map(c=>({...c,_fallbackType:r}));this._sectionData={...this._sectionData,[t]:[...n,...o]}}else e===0&&!this._sectionData[t]&&(this._sectionData={...this._sectionData,[t]:[]})}catch(s){console.error(`Error fetching ${t}: `,s),this._sectionData[t]||(this._sectionData={...this._sectionData,[t]:[]})}finally{this._fetching[t]=!1,this.requestUpdate()}}};customElements.define("spotify-home",Qe);var _s=[{type:null,label:"All",key:null},{type:"track",label:"Songs",key:"tracks"},{type:"playlist",label:"Playlists",key:"playlists"},{type:"artist",label:"Artists",key:"artists"},{type:"album",label:"Albums",key:"albums"}],fr={track:"Song",playlist:"Playlist",artist:"Artist",album:"Album"},Ye=class extends b{static get properties(){return{hass:{type:Object},api:{type:Object},config:{type:Object},_results:{type:Object},_query:{type:String},_filter:{type:String,state:!0},_topFollow:{type:Boolean,state:!0}}}static get styles(){return[$,_`
            :host { display: block; height: 100%; }

            .s-scroll {
                height: 100%; overflow-y: auto; overflow-x: hidden;
                background: var(--spf-bg);
            }

            /* ---- Top bar (mobile owns its own search input) ---- */
            .m-top {
                position: sticky; top: 0; z-index: 5;
                display: flex; align-items: center; gap: 12px;
                padding: calc(var(--spf-safe-top, 0px) + 10px) 16px 10px;
                background: var(--spf-bg);
            }
            .m-bar {
                flex: 1; display: flex; align-items: center; gap: 10px;
                height: 44px; padding: 0 12px; border-radius: 8px; background: #2a2a2a;
            }
            .m-bar svg { flex: 0 0 auto; }
            .m-bar input {
                flex: 1; min-width: 0; border: none; outline: none;
                background: transparent; color: #fff; font-size: var(--spf-text-md, 15px);
            }
            .m-bar input::placeholder { color: var(--spf-text-sub); }
            .m-clear { background: none; border: none; color: var(--spf-text-sub); cursor: pointer; padding: 4px; display: flex; }
            .m-cancel { background: none; border: none; color: #fff; font-size: var(--spf-text-md, 15px); cursor: pointer; white-space: nowrap; padding: 0; }

            /* ---- Filter pills ---- */
            .pills {
                position: sticky; z-index: 4;
                display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none;
                background: var(--spf-bg);
            }
            .pills::-webkit-scrollbar { display: none; }
            .pill {
                flex: 0 0 auto; border: none; cursor: pointer; white-space: nowrap;
                padding: 8px 16px; border-radius: 999px; font-size: var(--spf-text-base, 13.5px); font-weight: 700;
                background: #232323; color: #fff;
            }
            .pill.active { background: #fff; color: #000; }

            .body { padding-bottom: 120px; }
            .section-h { font-size: var(--spf-text-xl, 22px); font-weight: 700; color: #fff; padding: 18px 16px 8px; }
            .empty { padding: 48px 24px; text-align: center; color: var(--spf-text-sub); }

            /* ---- Top result (artist) ---- */
            .top-result { display: flex; align-items: center; gap: 16px; padding: 12px 16px 20px; }
            .top-avatar {
                width: 64px; height: 64px; border-radius: 50%;
                background-size: cover; background-position: center;
                background-color: var(--spf-bg-card-hover); flex: 0 0 auto;
            }
            .top-meta { flex: 1; min-width: 0; }
            .top-name {
                font-size: var(--spf-text-xl, 22px); font-weight: 900; color: #fff;
                display: flex; align-items: center; gap: 6px;
                white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            }
            .verified { color: #4cb3ff; flex: 0 0 auto; }
            .top-sub { color: var(--spf-text-sub); font-size: var(--spf-text-base, 13.5px); margin-top: 2px; }
            .follow-btn {
                flex: 0 0 auto; background: transparent; color: #fff;
                border: 1px solid rgba(255,255,255,0.4); border-radius: 999px;
                padding: 7px 18px; font-size: var(--spf-text-base, 13.5px); font-weight: 700; cursor: pointer;
            }
            .play-btn {
                flex: 0 0 auto; width: 48px; height: 48px; border-radius: 50%;
                background: var(--spf-brand); color: #000; border: none; cursor: pointer;
                display: none; align-items: center; justify-content: center;
            }
            .play-btn svg { width: 24px; height: 24px; fill: currentColor; }

            /* ---- Result rows ---- */
            .row {
                display: grid; grid-template-columns: 48px 1fr auto;
                align-items: center; gap: 12px; padding: 8px 16px; cursor: pointer; min-height: 64px;
            }
            @media (hover: hover) { .row:hover { background: var(--spf-hover-white); } }
            .art {
                width: 48px; height: 48px; border-radius: 4px;
                background-size: cover; background-position: center;
                background-color: var(--spf-bg-card-hover);
            }
            .art.circle { border-radius: 50%; }
            .info { min-width: 0; }
            .name { color: #fff; font-size: var(--spf-text-md, 15px); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
            .sub { color: var(--spf-text-sub); font-size: var(--spf-text-base, 13.5px); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
            .type-badge { display: none; color: var(--spf-text-sub); font-size: var(--spf-text-base, 13.5px); padding: 4px 10px; background: var(--spf-bg-card-hover); border-radius: 4px; white-space: nowrap; }
            .row-btn { background: none; border: none; color: var(--spf-text-sub); cursor: pointer; padding: 8px; display: flex; }
            @media (hover: hover) { .row-btn:hover { color: #fff; } }

            /* ---- Skeletons ---- */
            .skel { display: grid; grid-template-columns: 48px 1fr; gap: 12px; align-items: center; padding: 8px 16px; min-height: 64px; }
            /* skeleton-pulse (shared) fills the whole row; keep it transparent so
               only the art + text-line shapes read as a skeleton, not a flat block. */
            .skel.skeleton-pulse { background: transparent; }
            .skel .art { background: var(--spf-skeleton-bg); }
            .skel-lines > div { height: 12px; border-radius: 3px; background: var(--spf-skeleton-bg); }
            .skel-lines > div:first-child { width: 60%; margin-bottom: 8px; }
            .skel-lines > div:last-child { width: 35%; }

            /* ================= MOBILE ================= */
            @media (max-width: 768px) {
                .pills { top: calc(var(--spf-safe-top, 0px) + 64px); padding: 6px 16px 12px; }
            }

            /* ================= DESKTOP ================= */
            @media (min-width: 769px) {
                .body, .pills, .top-result, .row, .skel { max-width: 1100px; margin-left: auto; margin-right: auto; }
                .pills { top: 0; justify-content: flex-start; padding: 16px 16px 12px; }
                .m-top { display: none; }

                /* Top result becomes a card with a hover play button */
                .top-result {
                    margin: 8px 16px 24px; padding: 20px; border-radius: 8px;
                    background: var(--spf-bg-card, #1a1a1a);
                    transition: background 0.2s;
                }
                .top-result:hover { background: var(--spf-bg-card-hover, #2a2a2a); }
                .top-avatar { width: 80px; height: 80px; }
                .top-name { font-size: var(--spf-text-2xl, 26px); }
                .top-result:hover .play-btn { display: flex; }

                /* Rows gain a type badge column + show the add affordance */
                .row { grid-template-columns: 48px 1fr auto auto; }
                .type-badge { display: inline-block; }
            }
        `]}constructor(){super(),this._results=null,this._query="",this._filter=null,this._topFollow=null,this._isMobile=window.matchMedia("(max-width: 768px)").matches}firstUpdated(){if(this._isMobile){let t=this.shadowRoot.getElementById("page-search-input");t&&(this._query&&(t.value=this._query),setTimeout(()=>t.focus(),120))}}updated(t){t.has("_query")&&this._query&&this.api&&this._performSearch(this._query)}_onInput(t){let e=t.target.value;this._inputDebounce&&clearTimeout(this._inputDebounce),this._inputDebounce=setTimeout(()=>this.search(e),350)}search(t){t!==this._query&&(this._results=null,this._filter=null,this._topFollow=null),this._query=t}_clearQuery(){this._results=null,this._filter=null,this._query="";let t=this.shadowRoot.getElementById("page-search-input");t&&(t.value="",t.focus())}_cancel(){this.dispatchEvent(new CustomEvent("back",{bubbles:!0,composed:!0}))}_setFilter(t){this._filter=t}async _performSearch(t){if(!t)return;let e=this._searchId=(this._searchId||0)+1;try{let i=await this.api.fetchSpotifyPlus("search_all",{criteria:t,criteria_type:"album,artist,playlist,track",limit_total:20});if(e!==this._searchId)return;i&&i.result&&(this._results=i.result,this._checkTopFollow())}catch(i){console.error("Search failed:",i)}}async _checkTopFollow(){this._topFollow=null;let t=this._topArtist();if(!(!t?.id||!this.api))try{let e=await this.api.checkArtistsFollowing(t.id);typeof e=="boolean"?this._topFollow=e:Array.isArray(e)?this._topFollow=!!e[0]:e&&typeof e=="object"&&(this._topFollow=!!e[t.id])}catch{}}_topArtist(){let t=this._results?.artists?.items||[];if(!t.length)return null;let e=(this._query||"").trim().toLowerCase(),i=t[0],s=(i.name||"").toLowerCase();return s&&(s===e||s.startsWith(e)||e.startsWith(s))?i:null}render(){return l`
            <div class="s-scroll">
                ${this._isMobile?l`
                    <div class="m-top">
                        <div class="m-bar">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--spf-text-sub)" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                            <input id="page-search-input" type="text" placeholder="What do you want to listen to?" @input=${this._onInput}>
                            ${this._query?l`
                                <button class="m-clear" @click=${this._clearQuery} aria-label="Clear">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                                </button>`:""}
                        </div>
                        <button class="m-cancel" @click=${this._cancel}>Cancel</button>
                    </div>
                `:""}

                ${this._query?l`
                    <div class="pills">
                        ${_s.map(t=>l`
                            <button class="pill ${(this._filter||null)===t.type?"active":""}"
                                    @click=${()=>this._setFilter(t.type)}>${t.label}</button>`)}
                    </div>
                `:""}

                <div class="body">${this._renderBody()}</div>
            </div>
        `}_renderBody(){if(!this._query)return l`<div class="empty">Search for songs, artists, albums, and playlists.</div>`;if(!this._results)return l`${Array(8).fill(0).map(()=>l`
                <div class="skel skeleton-pulse"><div class="art"></div><div class="skel-lines"><div></div><div></div></div></div>`)}`;if(this._filter){let i=_s.find(r=>r.type===this._filter),s=this._results[i.key]?.items||[];return s.length?l`${s.map(r=>this._renderRow(r,this._filter))}`:l`<div class="empty">No ${i.label.toLowerCase()} found.</div>`}let t=this._topArtist(),e=this._mixedItems(t);return!t&&e.length===0?l`<div class="empty">No results found.</div>`:l`
            ${t?l`<div class="section-h">Top result</div>${this._renderTopResult(t)}`:""}
            ${e.length?l`
                <div class="section-h">Results</div>
                ${e.map(({item:i,type:s})=>this._renderRow(i,s))}
            `:""}
        `}_renderTopResult(t){let e=M(t,"artist"),i=this._topFollow;return l`
            <div class="top-result" @click=${()=>this._navigate("artist",t)}>
                <div class="top-avatar" style="background-image: url('${e}')"></div>
                <div class="top-meta">
                    <div class="top-name">
                        ${t.name}
                        <svg class="verified" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 2.4 3.3-.5.6 3.3L21 11l-2.4 2.4.5 3.3-3.3.6L12 21l-2.4-2.4-3.3.5-.6-3.3L3 11l2.4-2.4-.5-3.3 3.3-.6L12 2z"/><path d="M10.6 14.6L7.8 11.8l1.2-1.2 1.6 1.6 4-4 1.2 1.2-5.2 5.2z" fill="#000"/></svg>
                    </div>
                    <div class="top-sub">Artist</div>
                </div>
                ${i!==null?l`
                    <button class="follow-btn" @click=${s=>this._toggleFollow(s,t)}>
                        ${i?"Following":"Follow"}
                    </button>`:""}
                <button class="play-btn" @click=${s=>this._playArtist(s,t)} aria-label="Play">
                    <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </button>
            </div>
        `}_mixedItems(t){let e=this._results||{},i=[(e.tracks?.items||[]).map(n=>({item:n,type:"track"})),(e.playlists?.items||[]).map(n=>({item:n,type:"playlist"})),(e.albums?.items||[]).map(n=>({item:n,type:"album"})),(e.artists?.items||[]).filter(n=>!t||n.id!==t.id).map(n=>({item:n,type:"artist"}))],s=[],r=Math.max(...i.map(n=>n.length),0);for(let n=0;n<r&&s.length<30;n++)for(let o of i)o[n]&&s.push(o[n]);return s}_renderRow(t,e){let i=M(t,e),s=e==="artist",r=e==="track",n;if(s)n="Artist";else if(e==="playlist")n=`Playlist \u2022 ${t.owner?.display_name||"Spotify"}`;else if(e==="album"){let c=t.release_date?t.release_date.split("-")[0]:"",d=t.artists?.map(p=>p.name).join(", ")||"";n=`Album${c?" \u2022 "+c:""}${d?" \u2022 "+d:""}`}else n=`Song \u2022 ${t.artists?.map(c=>c.name).join(", ")||""}`;return l`
            <div class="row" @click=${()=>r?this._playTrack(t):this._navigate(e,t)}>
                <div class="art ${s?"circle":""}" style="background-image: url('${i}')"></div>
                <div class="info">
                    <div class="name">${t.name}</div>
                    <div class="sub">${n}</div>
                </div>
                <span class="type-badge">${fr[e]||""}</span>
                ${r?l`
                    <button class="row-btn" @click=${c=>this._trackMenu(c,t)} aria-label="More">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="5" cy="12" r="2"/></svg>
                    </button>
                `:l`
                    <button class="row-btn" aria-label="Open">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
                    </button>
                `}
            </div>
        `}_playTrack(t){this.api?.playMedia(t.uri,"track"),this.dispatchEvent(new CustomEvent("show-toast",{detail:{message:`Playing "${t.name}"`},bubbles:!0,composed:!0}))}_playArtist(t,e){t.stopPropagation(),this.api?.playMedia(e.uri,"artist")}_trackMenu(t,e){t.stopPropagation(),this.dispatchEvent(new CustomEvent("open-track-menu",{detail:{name:e.name,artist:e.artists?.map(i=>i.name).join(", ")||"",album:e.album?.name||"",uri:e.uri,id:e.id,image:M(e,"track"),anchor:t.currentTarget.getBoundingClientRect()},bubbles:!0,composed:!0}))}async _toggleFollow(t,e){if(t.stopPropagation(),!this.api||!e?.id)return;let i=!this._topFollow;this._topFollow=i;let s=i?await this.api.followArtist(e.id):await this.api.unfollowArtist(e.id);(!s||s.success===!1)&&(this._topFollow=!i,this.dispatchEvent(new CustomEvent("show-toast",{detail:{message:"Failed to update follow"},bubbles:!0,composed:!0})))}_navigate(t,e){this.dispatchEvent(new CustomEvent("navigate",{detail:{pageId:`${t}:${e.id}`,data:{title:e.name,type:t,subtitle:t==="artist"?"Artist":""}},bubbles:!0,composed:!0}))}};customElements.define("spotify-search",Ye);var ht=_`
    :host {
        display: block;
        width: 100%;
        height: 100%;
    }

    /* Hero & Artist Profile */
    .hero-banner, .artist-hero { 
        position: relative; height: 300px !important; width: 100%; overflow: hidden;
        transition: height 0.3s cubic-bezier(0.2, 0.8, 0.2, 1); will-change: height;
    }
    .page.is-refreshing .hero-banner, .page.is-refreshing .artist-hero { height: 360px !important; }
    
    .hero-bg {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        background: #181818; /* Fallback skeleton color */
        z-index: 0;
        overflow: hidden;
        transition: all 0.5s ease;
        transform-origin: top center; will-change: transform;
    }
    
    .hero-gradient, .artist-hero .hero-gradient { 
        position: absolute; top: 0; left: 0; right: 0; bottom: 0; 
        background: linear-gradient(to top, var(--spf-bg) 0%, transparent 25%);
        z-index: 1; pointer-events: none;
    }
    
    .hero-content, .artist-header-content { 
        position: absolute; bottom: 0; left: 0; width: 100%; 
        z-index: 2; padding: 24px; box-sizing: border-box;
        display: flex; align-items: flex-end; gap: 24px;
    }
    .artist-header-content { flex-direction: column !important; align-items: flex-start !important; justify-content: flex-end; }
    .artist-header-content .hero-actions { margin-top: 0; margin-left: 4px; }
    
    /* Ensure the skeleton art inside the hero is fixed size */
    .hero-art { 
        width: 180px; height: 180px; 
        box-shadow: 0 4px 60px rgba(0,0,0,0.5); 
        background: var(--spf-skeleton-bg); flex-shrink: 0; 
        /* FIX: Prevent collapse if image is missing */
        display: block; 
        position: relative;
        overflow: hidden;
    }
    /* Image inside hero-art */
    .hero-art-img {
        width: 100%; height: 100%;
        object-fit: cover;
        display: block;
    }
    .hero-text { flex: 1; }
    .hero-type { font-size: var(--spf-text-sm, 12px); text-transform: uppercase; font-weight: 700; margin-bottom: 4px; }
    .hero-title { font-size: 3rem; font-weight: 900; margin: 0 0 8px 0; line-height: 1; }
    .hero-subtitle { font-size: var(--spf-text-base, 13.5px); color: rgba(255,255,255,0.7); }
    .hero-actions { display: flex; align-items: center; gap: 16px; margin-top: 16px; }
    .artist-hero-name { position: static; margin-bottom: 16px; font-size: 4rem; font-weight: 900; color: white; text-shadow: 0 4px 12px rgba(0,0,0,0.5); }
    
    .hero-btn-play {
        width: 56px; height: 56px; border-radius: 50%; background: var(--spf-brand); color: black; border: none;
        display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.2s;
    }
    .hero-btn-play:hover { transform: scale(1.05); background: var(--spf-brand-hover); }
    .hero-btn-play svg { width: 28px; height: 28px; fill: currentColor; }
    
    .hero-btn-fav {
        background: transparent; border: 1px solid rgba(255,255,255,0.3); color: white;
        padding: 8px 16px; border-radius: 20px; display: flex; align-items: center; justify-content: center;
        cursor: pointer; transition: all 0.2s; font-size: var(--spf-text-sm, 12px); font-weight: 700; letter-spacing: 1px;
    }
    .hero-btn-fav:hover { border-color: white; transform: scale(1.05); }
    .hero-btn-fav.is-favorite { color: var(--spf-brand); border-color: var(--spf-brand); }

    .artist-track-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 32px; }
    @media (max-width: 600px) { .artist-track-grid { grid-template-columns: 1fr; } .artist-hero-name { font-size: 2.5rem; } }

    .artist-top-track { display: flex; align-items: center; background: rgba(255,255,255,0.05); border-radius: 6px; overflow: hidden; transition: background 0.2s; height: 56px; cursor: pointer; position: relative; padding-right: 8px; }
    @media (hover: hover) { 
        .artist-top-track:hover { background: var(--spf-hover-white); } 
        .artist-top-track:active { background: var(--spf-active-white); }
    }
    
    .artist-top-track.playing .track-title { color: var(--spf-brand); }
    .track-art-left { 
        width: 56px; height: 56px; 
        background-size: cover; background-position: center; 
        position: relative; flex-shrink: 0; margin-right: 12px; 
    }

    /* FIX: Standardize positioning so it matches the hover transform */
    .artist-top-track .play-btn-overlay.mini { 
        width: 32px; height: 32px; 
        
        /* Reset the conflicting centering method */
        bottom: auto; right: auto; margin: 0;
        
        /* Use standard centering (Top/Left 50%) */
        top: 50%; left: 50%; 
        transform: translate(-50%, -50%) scale(0.8); /* Start slightly smaller */
        
        opacity: 0; 
        transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    /* On Row Hover: Reveal and scale to normal */
    @media (hover: hover) { 
        .artist-top-track:hover .play-btn-overlay.mini { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1);
        } 
    }
    
    .track-info-middle { flex: 1; overflow: hidden; display: flex; flex-direction: column; justify-content: center; }
    .track-title { font-size: var(--spf-text-base, 13.5px); font-weight: 700; color: var(--spf-text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .track-meta { font-size: var(--spf-text-sm, 12px); color: var(--spf-text-sub); margin-top: 2px; }

    /* Track Rows — the base rules (columns, hover, text colours) live in
       shared-styles.js; this block only carries the context-view overrides. */
    .track-row {
        overflow: visible;
        display: grid;
        /* num/art | title+artist | action buttons (flush right) */
        grid-template-columns: 40px 1fr auto;
        gap: 16px;
        padding: 8px 16px;
        align-items: center; cursor: pointer;

        /* User Customization: Transparent default, hover effect only */
        background: transparent;
        border-radius: 8px;
        margin: 0 4px 4px 4px;

        /* FIX: Enforce minimum height to match loaded content */
        min-height: 56px;
        box-sizing: border-box;
    }
    /* Inline now-playing layout: equalizer sits left of the green title */
    .track-name { display: flex; align-items: center; gap: 6px; }
    .track-name-text { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

    /* Now-playing equalizer (inline, next to the track title) */
    .track-eq {
        flex: 0 0 auto;
        width: 14px; height: 14px;
        display: flex; align-items: flex-end; justify-content: center;
        gap: 2px; box-sizing: border-box;
    }
    .track-eq span {
        width: 2px; height: 100%; background: var(--spf-brand); border-radius: 1px;
        /* Animate scaleY (compositor-only) instead of height (layout per frame);
           bottom origin keeps the bars growing up from the baseline. */
        transform-origin: bottom;
        animation: track-eq-bounce 0.9s ease-in-out infinite;
    }
    .track-eq span:nth-child(1) { animation-delay: -0.2s; }
    .track-eq span:nth-child(2) { animation-delay: -0.5s; }
    .track-eq span:nth-child(3) { animation-delay: -0.1s; }
    @keyframes track-eq-bounce {
        0%, 100% { transform: scaleY(0.3); }
        50% { transform: scaleY(1); }
    }

    /* Skeleton styles (.skeleton-pulse, @keyframes pulse, .card-*-sk) live in
       shared-styles.js, which every consumer of this module also imports. */

    /* Artist View Specifics */
    .artist-content { padding-top: 24px; }
    .artist-section { margin-bottom: 40px; }
    .artist-section h2 { margin-bottom: 16px; font-size: var(--spf-text-xl, 22px); font-weight: 700; color: var(--spf-text-main); }

    /* ================= SPOTIFY-STYLE MOBILE TRACK LIST ================= */
    @media (max-width: 768px) {
        /* Native-style rows: art/index | title+artist | menu.
           The first column sizes to its content (40px art/eq, or the number),
           so the now-playing equalizer gets its own cell instead of breaking
           the grid. */
        .track-row {
            grid-template-columns: auto 1fr auto !important;
            padding: 6px 16px !important;
            margin: 0 !important;
            border-radius: 0 !important;
            min-height: 64px !important;
            gap: 12px !important;
        }

        /* Album track numbers: keep them, centered in the art column */
        .track-num {
            display: block !important;
            width: 48px;
        }

        /* Show album art thumbnails (playlists / liked songs) */
        .track-row > img:first-child {
            display: block !important;
            width: 48px !important;
            height: 48px !important;
            border-radius: 4px;
            object-fit: cover;
        }

        /* Shared list template renders number + art-div (4 children). */
        .track-row.with-art {
            grid-template-columns: auto auto 1fr auto !important;
        }
        .track-art-small {
            width: 48px !important;
            height: 48px !important;
        }

        /* Clean track text (sized to match the native app's mobile list). */
        .track-name {
            font-size: var(--spf-text-base, 13.5px) !important;
            font-weight: 500 !important;
        }

        .track-artist {
            font-size: var(--spf-text-sm, 12px) !important;
            margin-top: 3px !important;
        }

        /* Proper overflow for track info column */
        .track-info {
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-width: 0; /* Critical for text-overflow: ellipsis */
        }

        /* Hide heart and queue buttons — keep only "..." menu */
        .track-action-btn[data-action="save"],
        .track-action-btn[data-action="queue"] {
            display: none !important;
        }

        .track-actions-right {
            gap: 0 !important;
        }
    }
`;var Ke=class extends b{static get properties(){return{data:{type:Object},type:{type:String},layout:{type:String}}}static get styles(){return[$,_`
                :host { 
                    display: block; 
                    width: 100%; 
                    height: 100%; 
                    position: relative; 
                    z-index: 0;
                    box-sizing: border-box;
                    overflow: hidden; 
                }
                .list-container {
                    width: 100%;
                    height: 100%;
                    overflow-y: auto;
                    overflow-x: hidden;
                    overscroll-behavior-y: auto;
                    overscroll-behavior-x: none;
                    padding-bottom: 50px; /* Spacer */
                    background: var(--spf-bg);
                }
                .list-header {
                    padding: 16px 24px;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    /* sticky header? */
                    position: sticky; top: 0; z-index: 10;
                    background: rgba(18,18,18,0.95);
                    backdrop-filter: blur(8px);
                    border-bottom: 1px solid var(--spf-border);
                }
                .back-btn {
                    background: none; border: none; color: white; cursor: pointer;
                }
                .list-title {
                    font-size: var(--spf-text-lg, 17px); font-weight: bold; color: white;
                }

                .content-list {
                    display: flex;
                    flex-direction: column;
                    padding: 0;
                }

                .content-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                    gap: 16px;
                    padding: 24px;
                }

                /* Loader at bottom */
                .loading-indicator {
                    padding: 24px; text-align: center; color: var(--spf-text-sub);
                }
            `]}constructor(){super(),this.data={items:[],isLoading:!0},this.layout="list"}_handleScroll(t){let e=t.target;e.scrollTop+e.clientHeight>=e.scrollHeight-100&&!this.data.isLoading&&this.data.hasMore&&this.dispatchEvent(new CustomEvent("load-more",{bubbles:!0,composed:!0}))}_handleBack(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("back",{bubbles:!0,composed:!0}))}render(){let t=this.data?.items||[],e=this.data?.isLoading||!1,i=this.type||this.data?.type||"track",s=this.layout!=="grid";return l`
            <div class="list-container" @scroll=${this._handleScroll}>
                <div class="list-header">
                    <button class="back-btn" @click=${this._handleBack}>
                        <svg height="24" width="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                    </button>
                    <div class="list-title">${this.data?.name||"List"}</div>
                </div>

                <div class="${s?"content-list":"content-grid"}">
                    ${t.map(r=>{let n=r.type||i;return ms(r,n,()=>{this.dispatchEvent(new CustomEvent("navigate",{detail:{pageId:`${n}:${r.id}`,data:r},bubbles:!0,composed:!0}))})})}
                    
                    ${e?Array(10).fill(0).map(()=>fs()):""}
                </div>
                
                ${!e&&t.length===0?l`<div style="padding: 24px; text-align: center;">No items found</div>`:""}
            </div>
        `}};customElements.define("spotify-context-list",Ke);var Tt=class{constructor(t,{itemSelector:e,onDrop:i,isDraggable:s=null}){this.host=t,this.itemSelector=e,this.onDrop=i,this.isDraggable=s,this.dragIndex=null,this.dropIndex=null,this.dropPosition=null,this._rects=[]}get active(){return this.dragIndex!==null}start(t,e,i){if(t.button!==0&&t.pointerType==="mouse"||this.isDraggable&&!this.isDraggable(e)||!i)return;t.currentTarget.setPointerCapture(t.pointerId),this.dragIndex=e;let s=Array.from(i.querySelectorAll(this.itemSelector));this._rects=s.map((r,n)=>{let o=r.getBoundingClientRect();return{index:n,top:o.top,bottom:o.bottom,midpoint:o.top+o.height/2}}),this.host.requestUpdate()}move(t){if(this.dragIndex===null)return;let e=t.clientY,i=null,s=null;for(let r of this._rects)if(e>=r.top&&e<=r.bottom){i=r.index,s=e<r.midpoint?"before":"after";break}(this.dropIndex!==i||this.dropPosition!==s)&&(this.dropIndex=i,this.dropPosition=s,this.host.requestUpdate())}end(t){if(this.dragIndex===null)return;let{dragIndex:e,dropIndex:i,dropPosition:s}=this;if(this.dragIndex=null,this.dropIndex=null,this.dropPosition=null,this._rects=[],t?.target?.releasePointerCapture)try{t.target.releasePointerCapture(t.pointerId)}catch{}i!==null&&e!==i&&this.onDrop(e,i,s),this.host.requestUpdate()}rowClass(t){return this.dragIndex===t?"dragging ghost":this.dropIndex===t&&this.dropPosition==="before"?"drop-before":this.dropIndex===t&&this.dropPosition==="after"?"drop-after":""}static applyMove(t,e,i,s){let r=[...t],[n]=r.splice(e,1),o=s==="after"?i+1:i;return e<o&&o--,r.splice(o,0,n),r}};var Xe=class extends b{static get properties(){return{data:{type:Object},api:{type:Object},hass:{type:Object},config:{type:Object},pinned:{type:Object},playingTrackId:{type:String},currentTrackId:{type:String},isPlaying:{type:Boolean},pinnedSensorState:{type:Object},_isFollowing:{type:Boolean,state:!0},_currentUserId:{type:String,state:!0},_isPinned:{type:Boolean,state:!0},_pinnedEntity:{type:String,state:!0},_albumLiked:{type:Boolean,state:!0},_artistInfo:{type:Object,state:!0},_optimisticPlayState:{type:String,state:!0},_optimisticPlayingTrackId:{type:String,state:!0},_trackLikes:{type:Object,state:!0},_genrePills:{type:Array,state:!0},_activeGenre:{type:String,state:!0},_editMode:{type:Boolean,state:!0},_workingItems:{type:Array,state:!0},_editName:{type:String,state:!0},_editDescription:{type:String,state:!0},_saving:{type:Boolean,state:!0}}}static get styles(){return[$,ht,_`
                :host { 
                    display: block !important; 
                    width: 100% !important; 
                    height: 100% !important; 
                    position: relative !important;
                    overflow: hidden !important; 
                }
                .main-scroll-container {
                    width: 100%;
                    height: 100%;
                    overflow-y: auto;
                    overflow-x: hidden;
                    overscroll-behavior-y: auto;
                    overscroll-behavior-x: none;
                    position: relative;
                    background: var(--spf-bg);
                }
                .hero-banner { 
                    height: 375px !important; 
                    min-height: 375px !important; 
                    max-height: 375px !important;
                    display: block !important;
                    position: relative !important;
                    margin-top: 0 !important;
                    width: 100% !important;
                    overflow: visible !important;
                }
                .content-wrapper {
                    padding: 12px;
                    padding-bottom: 100px;
                    position: relative;
                    background: var(--spf-bg); 
                }
                .hero-bg { overflow: visible !important; }
                .hero-bg, .hero-bg img { width: 100%; height: 100%; object-fit: cover; }

                /* Hero layout/buttons come from spotify-context-view.styles.js;
                   only the playlist-specific differences live here. */
                .hero-art { width: 220px; height: 220px; background: #282828; }
                .hero-text { text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
                /* Native mobile-only text rows (shown in the mobile media query). */
                .hero-desc, .hero-owner, .hero-meta { display: none; }
                /* Album: shuffle + play grouped and pushed to the right edge as a
                   single unit (mirrors the single right-aligned play button used
                   elsewhere, which lays out reliably). */
                .ha-right { display: flex; align-items: center; gap: 16px; margin-left: auto; }

                /* ================= LIKED SONGS NATIVE STYLING ================= */
                /* Liked Songs has no album art (mirrors the native app), so the
                   hero is just the title + count + controls over the gradient.
                   Shrink the banner accordingly on desktop. The gradient is
                   painted on the banner itself — a composited child div (the old
                   .liked-gradient) left an unpainted strip behind the floating
                   header. 300px keeps the bottom-anchored text clear of the
                   header's 64px zone now that the hero truly starts at the top. */
                .liked-hero .hero-banner {
                    height: 300px !important; min-height: 300px !important; max-height: 300px !important;
                    background: linear-gradient(180deg, #4733b0 0%, #3a2f7a 45%, var(--spf-bg) 100%);
                }
                .liked-hero .hero-bg { background: transparent; }
                /* Over-scroll guard: a block of the gradient's top colour sitting
                   just above the content, so the rubber-band bounce reveals purple
                   instead of the black page background behind the scroller. */
                .main-scroll-container.liked-hero::before {
                    content: '';
                    position: absolute;
                    left: 0; right: 0; top: -400px; height: 400px;
                    background: #4733b0;
                    z-index: 0;
                    pointer-events: none;
                }
                .hero-btn-icon {
                    background: transparent; border: none; color: var(--spf-text-sub);
                    width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;
                    cursor: pointer; transition: color 0.2s;
                }
                .hero-btn-icon:hover { color: white; }
                .hero-btn-menu svg { fill: currentColor; width: 26px; height: 26px; }

                /* ================= PLAYLIST EDIT MODE ================= */
                .edit-bar {
                    position: sticky; top: 0; z-index: 20;
                    display: flex; align-items: center; justify-content: space-between;
                    gap: 12px;
                    padding: calc(var(--spf-safe-top, 0px) + 12px) 16px 12px;
                    background: var(--spf-bg);
                    border-bottom: 1px solid var(--spf-border-subtle, rgba(255,255,255,0.08));
                }
                .edit-bar-title { font-size: var(--spf-text-md, 15px); font-weight: 700; color: var(--spf-text-main); }
                .edit-bar-btn {
                    background: transparent; border: none; color: var(--spf-text-sub);
                    font-size: var(--spf-text-md, 15px); font-weight: 700; cursor: pointer; padding: 8px;
                }
                .edit-bar-btn.save { color: var(--spf-brand, #1DB954); font-weight: 700; }
                .edit-bar-btn:disabled { opacity: 0.5; cursor: default; }

                .edit-fields {
                    display: flex; flex-direction: column; gap: 14px;
                    padding: 18px 16px 8px;
                }
                .edit-name-input {
                    background: transparent;
                    border: none;
                    border-bottom: 1px solid rgba(255,255,255,0.25);
                    color: var(--spf-text-main);
                    font-size: var(--spf-text-xl, 22px); font-weight: 900; font-family: inherit;
                    padding: 2px 2px 10px;
                    outline: none;
                    caret-color: var(--spf-brand, #1ed760);
                }
                .edit-name-input:focus { border-bottom-color: rgba(255,255,255,0.55); }
                .edit-desc-input {
                    background: transparent;
                    border: none;
                    border-bottom: 1px solid rgba(255,255,255,0.15);
                    color: var(--spf-text-sub);
                    font-size: var(--spf-text-base, 13.5px); font-family: inherit;
                    padding: 2px 2px 8px;
                    outline: none; resize: none;
                    caret-color: var(--spf-brand, #1ed760);
                }
                .edit-desc-input:focus { border-bottom-color: rgba(255,255,255,0.45); color: var(--spf-text-main); }
                .edit-name-input::placeholder, .edit-desc-input::placeholder { color: rgba(255,255,255,0.3); }

                .edit-list { padding: 8px 8px 120px; }
                .edit-row {
                    display: flex; align-items: center; gap: 14px;
                    padding: 9px 8px;
                    position: relative;
                    user-select: none;
                    background: var(--spf-bg);
                    z-index: 1;
                }
                .edit-row.dragging {
                    z-index: 100;
                    background: #282828 !important;
                    transform: scale(1.02);
                    box-shadow: 0 15px 40px rgba(0,0,0,0.7);
                    border-radius: 8px;
                    border-bottom: none;
                    cursor: grabbing;
                }
                .edit-row.ghost { opacity: 0.35; }
                .edit-row.drop-before::before {
                    content: ''; position: absolute; top: -1px; left: 0; right: 0;
                    height: 3px; background: var(--spf-brand, #1DB954); z-index: 10;
                }
                .edit-row.drop-after::after {
                    content: ''; position: absolute; bottom: -1px; left: 0; right: 0;
                    height: 3px; background: var(--spf-brand, #1DB954); z-index: 10;
                }
                .edit-remove {
                    background: transparent; border: none;
                    color: var(--spf-text-sub);
                    cursor: pointer; display: flex; padding: 4px; flex-shrink: 0;
                }
                .edit-remove:hover { color: var(--spf-text-main); }
                .edit-remove svg { width: 26px; height: 26px; fill: currentColor; }
                .edit-art {
                    width: 56px; height: 56px; border-radius: 4px; flex-shrink: 0;
                    background-size: cover; background-position: center; background-color: #333;
                    position: relative;
                    display: flex; align-items: center; justify-content: center;
                }
                .edit-art-play {
                    display: flex; color: #fff;
                    filter: drop-shadow(0 1px 3px rgba(0,0,0,0.7));
                }
                .edit-text { flex: 1; min-width: 0; }
                .edit-name {
                    font-size: var(--spf-text-md, 15px); font-weight: 700; color: var(--spf-text-main);
                    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                }
                .edit-artist {
                    font-size: var(--spf-text-base, 13.5px); color: var(--spf-text-sub); margin-top: 3px;
                    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                }
                .edit-handle {
                    color: var(--spf-text-sub); cursor: grab; touch-action: none;
                    padding: 10px 4px; display: flex; flex-shrink: 0;
                }
                .edit-handle:hover { color: var(--spf-text-main); }
                .edit-handle svg { fill: currentColor; }
                .edit-empty { text-align: center; color: var(--spf-text-sub); padding: 40px 16px; }

                /* Album save button — mirrors the now-playing like button: an
                   outlined circle with a checkmark that fills green when saved. */
                .album-save {
                    flex-shrink: 0; width: 56px; height: 56px; border-radius: 50%;
                    border: 2px solid rgba(255,255,255,0.6); background: transparent;
                    color: rgba(255,255,255,0.85); cursor: pointer; padding: 0;
                    display: flex; align-items: center; justify-content: center;
                    transition: all 0.15s ease;
                }
                .album-save svg { width: 26px; height: 26px; fill: currentColor; }
                .album-save.saved {
                    background: var(--spf-brand, #1ed760);
                    border-color: var(--spf-brand, #1ed760);
                    color: #000;
                }

                /* Pin button — same styling as the album save button: outlined
                   circle when not pinned, green-filled when pinned. */
                .hero-pin {
                    flex-shrink: 0; width: 56px; height: 56px; border-radius: 50%;
                    border: 2px solid rgba(255,255,255,0.6); background: transparent;
                    color: rgba(255,255,255,0.85); cursor: pointer; padding: 0;
                    display: flex; align-items: center; justify-content: center;
                    transition: all 0.15s ease;
                }
                .hero-pin svg { width: 26px; height: 26px; fill: currentColor; }
                .hero-pin.pinned {
                    background: var(--spf-brand, #1ed760);
                    border-color: var(--spf-brand, #1ed760);
                    color: #000;
                }

                /* Album: clickable artist row + release line */
                .hero-artist {
                    display: flex; align-items: center; gap: 10px;
                    cursor: pointer; margin-bottom: 6px; width: fit-content;
                }
                .hero-artist-avatar {
                    width: 28px; height: 28px; border-radius: 50%; flex: 0 0 auto;
                    background-size: cover; background-position: center;
                    background-color: var(--spf-bg-card-hover, #282828);
                }
                .hero-artist-name {
                    color: var(--spf-text-main); font-size: var(--spf-text-base, 13.5px); font-weight: 700;
                }
                .hero-artist:hover .hero-artist-name { text-decoration: underline; }
                .hero-release {
                    color: var(--spf-text-sub); font-size: var(--spf-text-base, 13.5px); margin-bottom: 4px;
                }

                .genre-pills {
                    display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none;
                    padding: 4px 4px 12px; -webkit-overflow-scrolling: touch;
                }
                .genre-pills::-webkit-scrollbar { display: none; }
                .genre-pill {
                    flex: 0 0 auto; border: none; cursor: pointer; white-space: nowrap;
                    padding: 8px 16px; border-radius: 999px; font-size: var(--spf-text-base, 13.5px); font-weight: 500;
                    background: var(--spf-bg-card, #232323); color: white; transition: background 0.15s, color 0.15s;
                }
                .genre-pill:hover { background: #3a3a3a; }
                .genre-pill.active { background: var(--spf-brand); color: #000; }

                /* ================= SPOTIFY-STYLE MOBILE HERO ================= */
                @media (max-width: 768px) {
                    .hero-banner {
                        height: auto !important;
                        min-height: auto !important;
                        max-height: none !important;
                        padding-top: calc(64px + var(--spf-safe-top, 0px) + 16px);
                    }

                    /* Gradient fade from blurred bg into content area */
                    .hero-banner::after {
                        content: '';
                        position: absolute;
                        bottom: 0; left: 0; right: 0;
                        height: 50%;
                        background: linear-gradient(to top, var(--spf-bg) 0%, transparent 100%);
                        z-index: 1;
                        pointer-events: none;
                    }

                    .hero-content {
                        position: relative !important;
                        bottom: auto !important;
                        flex-direction: column !important;
                        align-items: center !important;
                        padding: 0 16px 20px !important;
                        gap: 20px !important;
                        z-index: 2 !important;
                    }

                    .hero-art {
                        width: min(68vw, 320px) !important;
                        height: min(68vw, 320px) !important;
                        border-radius: 6px !important;
                        box-shadow: 0 8px 28px rgba(0,0,0,0.55) !important;
                    }

                    .hero-text {
                        width: 100% !important;
                        text-align: left !important;
                        text-shadow: none !important;
                    }

                    .hero-title {
                        font-size: var(--spf-text-xl, 22px) !important;
                        font-weight: 900 !important;
                        line-height: 1.15 !important;
                        margin: 0 0 8px 0 !important;
                    }

                    /* Native hides the type eyebrow on mobile; for non-liked
                       playlists the description/owner/meta rows replace the
                       generic subtitle. */
                    .hero-type { display: none !important; }
                    .main-scroll-container:not(.liked-hero) .hero-subtitle { display: none !important; }

                    .liked-hero .hero-subtitle {
                        font-size: var(--spf-text-base, 13.5px) !important;
                        color: var(--spf-text-sub) !important;
                    }

                    /* Liked Songs: compact, left-aligned header (no art) like iOS.
                       Title sits just under the back button, then the count, then
                       the controls row with the green play pushed to the right. */
                    .liked-hero .hero-banner {
                        height: auto !important; min-height: auto !important; max-height: none !important;
                        padding-top: calc(56px + var(--spf-safe-top, 0px)) !important;
                    }
                    .liked-hero .hero-content {
                        align-items: flex-start !important;
                        gap: 10px !important;
                        padding-bottom: 12px !important;
                    }
                    .liked-hero .hero-actions { margin-top: 10px !important; }
                    .liked-hero .hero-btn-play { margin-left: auto !important; order: 10 !important; }

                    .hero-desc {
                        display: block !important;
                        font-size: var(--spf-text-md, 15px) !important;
                        line-height: 1.4 !important;
                        color: var(--spf-text-main) !important;
                        margin-bottom: 14px !important;
                    }

                    .hero-owner {
                        display: flex !important;
                        align-items: center !important;
                        gap: 8px !important;
                        font-size: var(--spf-text-base, 13.5px) !important;
                        color: var(--spf-text-main) !important;
                        margin-bottom: 6px !important;
                    }
                    .hero-owner svg { width: 24px !important; height: 24px !important; flex: 0 0 auto; }
                    .hero-owner b { font-weight: 700 !important; }

                    .hero-meta {
                        display: block !important;
                        font-size: var(--spf-text-base, 13.5px) !important;
                        color: var(--spf-text-sub) !important;
                    }

                    .hero-actions {
                        width: 100% !important;
                        margin-top: 6px !important;
                        gap: 20px !important;
                        align-items: center !important;
                    }
                    /* Native: secondary actions left, big green play on the right. */
                    .main-scroll-container:not(.liked-hero) .hero-btn-play {
                        order: 10;
                        margin-left: auto;
                    }

                    /* Album: slide the art up so its top lines up with the back
                       button instead of sitting well below the header. */
                    .main-scroll-container.album-hero .hero-banner {
                        padding-top: calc(var(--spf-safe-top, 0px) + 8px) !important;
                    }

                    /* Album: like/pin on the left, shuffle + play grouped right.
                       Cap the hero column + action row to the viewport so the
                       right-aligned play/shuffle can never be pushed off-edge. */
                    .album-hero .hero-content { max-width: 100vw !important; box-sizing: border-box !important; }
                    .album-hero .hero-text,
                    .album-hero .hero-actions { box-sizing: border-box !important; max-width: 100% !important; min-width: 0 !important; }
                    .album-hero .ha-right { gap: 12px !important; }
                    .album-hero .ha-right .hero-btn-play { margin-left: 0 !important; }
                    .album-hero .hero-btn-icon { width: 40px !important; height: 40px !important; }
                    .album-hero .album-save { width: 40px !important; height: 40px !important; }
                    .album-hero .album-save svg { width: 20px !important; height: 20px !important; }

                    .hero-btn-play {
                        width: 48px !important;
                        height: 48px !important;
                    }
                    .hero-btn-play svg {
                        width: 24px !important;
                        height: 24px !important;
                    }

                    /* Shrink fav/pin action circles */
                    .hero-btn-fav,
                    .hero-pin {
                        width: 40px !important;
                        height: 40px !important;
                    }
                    .hero-btn-fav svg,
                    .hero-pin svg {
                        width: 20px !important;
                        height: 20px !important;
                    }

                    .content-wrapper {
                        padding: 0 4px !important;
                        padding-bottom: 100px !important;
                    }
                }
            `]}constructor(){super(),this.playingTrackId=null,this.currentTrackId=null,this.isPlaying=!1,this.pinnedSensorState=void 0,this._mobileMql=window.matchMedia("(max-width: 768px)"),this._isFollowing=!1,this._currentUserId=null,this._isPinned=!1,this._pinnedEntity=null,this._albumLiked=!1,this._artistInfo=null,this._optimisticPlayState=null,this._optimisticPlayingTrackId=null,this._trackLikes={},this._genrePills=[],this._activeGenre=null,this._trackGenres={},this._editMode=!1,this._workingItems=null,this._origItems=null,this._saving=!1,this._drag=new Tt(this,{itemSelector:".edit-row",onDrop:(t,e,i)=>{k("light"),this._workingItems=Tt.applyMove(this._workingItems,t,e,i)}})}connectedCallback(){super.connectedCallback(),this._checkFollowStatus(),this._checkPinStatus()}disconnectedCallback(){super.disconnectedCallback(),this._optimisticTimer&&clearTimeout(this._optimisticTimer),this._optimisticTrackTimer&&clearTimeout(this._optimisticTrackTimer),this._likeVerifyTimer&&clearTimeout(this._likeVerifyTimer),this._scrollRaf&&cancelAnimationFrame(this._scrollRaf),this._optimisticTimer=null,this._optimisticTrackTimer=null,this._likeVerifyTimer=null,this._scrollRaf=null}shouldUpdate(t){return!(t.size===1&&t.has("hass"))}updated(t){t.has("data")&&(this._editMode&&this.data?.id!==this._editPlaylistId&&(this._editMode=!1,this._workingItems=null,this._origItems=null),this._checkFollowStatus(),this._checkPinStatus(),this._checkTrackLikes(),this.data?.type==="likedsongs"&&this._enrichGenres(),this.data?.type==="album"&&(this._checkAlbumLike(),this._fetchArtistInfo()),this.data?.autoEdit&&!this._editMode&&this.data.canEditItems&&this.data.tracksComplete&&(this.data.autoEdit=!1,this._enterEditMode())),this._optimisticPlayingTrackId&&t.has("currentTrackId")&&this.currentTrackId===this._optimisticPlayingTrackId&&(this._optimisticPlayingTrackId=null),t.has("pinnedSensorState")&&this.pinned&&this.pinned.sensorEntity&&t.get("pinnedSensorState")!==void 0&&this._checkPinStatus()}async _checkFollowStatus(){if(!(!this.data||this.data.type!=="playlist"||!this.api)){if(this.data.isOwner){this._isFollowing=!1;return}if(!this._currentUserId)try{this._currentUserId=await this.api.getCurrentUserId()}catch{}if(this._currentUserId&&this.data.id)try{let t=await this.api.checkUserFollowsPlaylist(this.data.id,this._currentUserId);t&&Array.isArray(t)&&t.length>0&&(this._isFollowing=t[0])}catch{}}}async _checkPinStatus(){if(!this.pinned||!this.data)return;if(!this.pinned.canEdit()){this._pinnedEntity=null;return}let t=await this.pinned.getItems(),e=this.data.id;this.data.type==="likedsongs"&&(e="user-library"),this._isPinned=!!t.find(i=>i.id===e),this._pinnedEntity=this.pinned.sensorEntity}_getIsPlaying(){return this._optimisticPlayState?this._optimisticPlayState==="playing":!!this.isPlaying}_getPlayingTrackId(){return this._optimisticPlayingTrackId?this._optimisticPlayingTrackId:this.playingTrackId||null}async _togglePin(){if(!this._pinnedEntity||!this.pinned)return;let t;this.data.type==="likedsongs"?t={id:"user-library",type:"library",title:"User Library",subtitle:"Your collection & liked songs",image:"https://www.gstatic.com/images/icons/material/system/2x/library_music_white_24dp.png",uri:"spotify:user-library"}:t={id:this.data.id,type:this.data.type,name:this.data.name||this.data.title,images:this.data.images,uri:this.data.uri,description:this.data.description};let e=await this.pinned.toggle(t);e.success?(this._isPinned=!this._isPinned,this.dispatchEvent(new CustomEvent("pinned-changed",{bubbles:!0,composed:!0}))):this.dispatchEvent(new CustomEvent("show-alert",{detail:{title:"Pinning Failed",message:e.error||"Unknown error",confirmText:"OK",size:"mini"},bubbles:!0,composed:!0}))}_handleScroll(t){this._scrollTarget=t.target,!this._scrollRaf&&(this._scrollRaf=requestAnimationFrame(()=>{this._scrollRaf=null,this._applyScroll(this._scrollTarget)}))}_applyScroll(t){if(!t)return;let e=t.scrollTop;if(!this.config?.appearance?.performance?.lite){let s=this._heroImgEl;if((!s||!s.isConnected)&&(s=this._heroImgEl=this.shadowRoot.querySelector(".hero-banner .hero-bg img")),s)if(e<0){let r=1-e/375;s.style.transform=`translateY(${e}px) scale(${r})`,s.style.transformOrigin="top center"}else s.style.transform="",s.style.transformOrigin="";if(t.classList.contains("has-hero")){let r=this._heroContentEl;if((!r||!r.isConnected)&&(r=this._heroContentEl=this.shadowRoot.querySelector(".hero-content")),r){r.style.opacity=Math.max(0,1-e/200);let n=1-e/1e3;n>.8&&(r.style.transform=`scale(${n})`,r.style.transformOrigin="center center")}}}if(t.classList.contains("has-hero")){let s,r;if(this._mobileMql.matches){let n=this._heroBannerEl;(!n||!n.isConnected)&&(n=this._heroBannerEl=this.shadowRoot.querySelector(".hero-banner"));let o=n?n.offsetHeight:375,c=Math.max(o-100,1),d=Math.max(c-80,0);s=Math.max(0,Math.min((e-d)/(c-d),1)),r=Math.max(0,Math.min((e-c)/50,1))}else s=Math.min(e/200,1),r=Math.max(0,Math.min((e-220)/60,1));this.dispatchEvent(new CustomEvent("header-scroll",{detail:{alpha:s,textAlpha:r,title:this.data?.name||""},bubbles:!0,composed:!0})),e+t.clientHeight>=t.scrollHeight-200&&this.dispatchEvent(new CustomEvent("load-more",{bubbles:!0,composed:!0}))}}_formatDuration(t){if(!t)return"";let e=Math.round(t/6e4),i=Math.floor(e/60),s=e%60;return i>0?`${i}h ${s}m`:`${s} min`}render(){if(!this.data)return l``;if(this._editMode)return this._renderEditMode();let t=this.data,e=t.description||(t.owner?`By ${t.owner.display_name}`:""),i=t.total||(t.tracks?t.tracks.total:null);if(i!=null){let v=new Intl.NumberFormat().format(i);e?e+=` \u2022 ${v} songs`:e=`${v} songs`}let s=t.type==="likedsongs",r=t.type==="album",n=t.tracks?.items||[],o=s&&this._activeGenre?n.filter(v=>(this._trackGenres[(v.track||v)?.id]||[]).includes(this._activeGenre)):n,c=s?"":t.description||"",d=s?"":t.owner?.display_name||"",p=n.reduce((v,y)=>v+((y.track||y)?.duration_ms||0),0),u=this._formatDuration(p),g=t.followers?.total,h=[g!=null?`${new Intl.NumberFormat().format(g)} saves`:"",u].filter(Boolean).join(" \u2022 "),m=l`
            <button class="hero-btn-play" @click=${()=>this._handleHeroPlayClick()}>
                ${this._getIsPlaying()?re(28):Y(28)}
            </button>`,x=this._pinnedEntity&&!s?l`
            <button class="hero-pin ${this._isPinned?"pinned":""}" @click=${this._togglePin} aria-label="${this._isPinned?"Unpin":"Pin"}" title="${this._isPinned?"Unpin":"Pin"}">
                <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
            </button>`:"";try{return l`
                <div class="main-scroll-container has-hero ${s?"liked-hero":""} ${r?"album-hero":""}" @scroll=${this._handleScroll}>
                    <div class="hero-banner" style="margin-top: 0; display: block !important; position: relative !important; top: 0; left: 0; z-index: 0;">
                        <div class="hero-bg">
                            ${s?"":l`<img src="${t.images?.[0]?.url}"
                                 style="width: 100%; height: 100%; object-fit: cover; filter: blur(20px) brightness(0.6); transform: scale(1.1); opacity: 0.5;">`}
                        </div>
                        <div class="hero-content">
                        ${s?"":l`
                        <div class="hero-art ${t.images?.[0]?.url?"":t.isLoading?"skeleton-pulse":"art-fallback"}">
                            ${t.images?.[0]?.url?l`
                                <img src="${t.images[0].url}"
                                     class="hero-art-img"
                                     style="opacity: 0; transition: opacity 0.5s ease;"
                                     onload="this.style.opacity = 1; this.parentElement.classList.remove('skeleton-pulse');"
                                     onerror="this.style.display='none'; this.parentElement.classList.remove('skeleton-pulse'); this.parentElement.classList.add('art-fallback');"
                                >
                            `:""}
                        </div>`}
                            <div class="hero-text">
                                <div class="hero-type">${s?"Playlist":t.type}</div>
                                <h1 class="hero-title">${t.name}</h1>
                                ${c?l`<div class="hero-desc">${c}</div>`:""}
                                <div class="hero-subtitle">${e}</div>
                                ${r&&this._artistInfo?l`
                                    <div class="hero-artist" @click=${this._navigateToArtist} role="button" tabindex="0">
                                        <div class="hero-artist-avatar ${this._artistInfo.image?"":"skeleton-pulse"}"
                                             style="${this._artistInfo.image||t.images?.[0]?.url?`background-image: url('${this._artistInfo.image||t.images[0].url}')`:""}"></div>
                                        <span class="hero-artist-name">${this._artistInfo.name}</span>
                                    </div>
                                `:""}
                                ${r&&this._formatReleaseDate()?l`
                                    <div class="hero-release">${this._albumTypeLabel()} • ${this._formatReleaseDate()}</div>
                                `:""}
                                ${d?l`
                                    <div class="hero-owner">
                                        <svg viewBox="0 0 168 168" aria-hidden="true"><path fill="#1ed760" d="M84 0C37.6 0 0 37.6 0 84s37.6 84 84 84 84-37.6 84-84S130.4 0 84 0zm38.5 121.2a5.2 5.2 0 0 1-7.2 1.7c-19.6-12-44.3-14.7-73.4-8a5.2 5.2 0 1 1-2.3-10.2c31.8-7.3 59.1-4.2 81.1 9.3a5.2 5.2 0 0 1 1.8 7.2zm10.3-22.9a6.5 6.5 0 0 1-9 2.1c-22.5-13.8-56.7-17.8-83.3-9.8a6.5 6.5 0 1 1-3.8-12.5c30.4-9.2 68.1-4.7 94 11.2a6.5 6.5 0 0 1 2.1 9zm.9-23.8C107 59.6 64.9 58.3 40.7 65.6a7.8 7.8 0 1 1-4.5-15c27.8-8.4 74.3-6.8 103.8 10.7a7.8 7.8 0 1 1-8 13.4z"/></svg>
                                        <span>By&nbsp;<b>${d}</b></span>
                                    </div>`:""}
                                ${h&&!r?l`<div class="hero-meta">${h}</div>`:""}
                                ${r?l`
                                    <div class="hero-actions">
                                        <button class="album-save ${this._albumLiked?"saved":""}" title="${this._albumLiked?"Remove from library":"Save to library"}" @click=${this._toggleLikeAlbum} aria-label="Save album">
                                            <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                                        </button>
                                        ${x}
                                        <div class="ha-right">
                                            ${m}
                                            <button class="hero-btn-icon hero-btn-shuffle" title="Shuffle play" @click=${()=>this._handleAlbumShuffle()}>
                                                <svg height="24" width="24" viewBox="0 0 24 24" fill="currentColor"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/></svg>
                                            </button>
                                        </div>
                                    </div>
                                `:l`
                                    <div class="hero-actions">
                                        ${s?l`
                                            <button class="hero-btn-icon" title="Shuffle play" @click=${()=>this._handleShufflePlay()}>
                                                <svg height="24" width="24" viewBox="0 0 24 24" fill="currentColor"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/></svg>
                                            </button>
                                        `:""}
                                        ${m}
                                        ${t.type==="playlist"&&!t.isOwner?l`
                                            <button class="hero-btn-fav" @click=${this._toggleFollowPlaylist} style="margin-left: 12px; background: transparent; border: 1px solid rgba(255,255,255,0.3); border-radius: 50%; width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: ${this._isFollowing?"#1DB954":"white"}; transition: all 0.2s ease;">
                                                ${it(this._isFollowing,28)}
                                            </button>
                                        `:""}
                                        ${x}
                                        ${t.type==="playlist"?l`
                                            <button class="hero-btn-icon hero-btn-menu" title="More options" aria-label="More options" @click=${this._openHeaderMenu}>
                                                ${H}
                                            </button>
                                        `:""}
                                    </div>
                                `}
                            </div>
                        </div>
                    </div>
                    <div class="content-wrapper">
                        ${s&&this._genrePills.length?l`
                            <div class="genre-pills">
                                ${this._genrePills.map(v=>l`
                                    <button class="genre-pill ${this._activeGenre===v.genre?"active":""}"
                                            @click=${()=>this._toggleGenre(v.genre)}>${v.label}</button>
                                `)}
                            </div>
                        `:""}
                        <div class="track-list">
                            ${(()=>{let v=this._getPlayingTrackId();return De(o,(y,w)=>`${(y.track||y)?.id||"na"}:${w}`,(y,w)=>this.renderTrackRow(y.track||y,w+1,v))})()}
                            ${s&&this._activeGenre&&o.length===0?l`<div style="padding: 32px 16px; text-align: center; color: var(--spf-text-sub);">No liked songs match this filter yet.</div>`:""}
                        </div>
                    </div>
                </div>
            `}catch(v){return console.error("[PlaylistView] RENDER ERROR:",v),l`<div style="padding: 20px; color: red;">Error Rendering View: ${v.message}</div>`}}renderTrackRow(t,e,i=null){if(!t)return"";try{let s=this.data?.type==="album",r=!!i&&t.id===i;return gs(t,e,(n,o)=>this._handleTrackClick(n,o,e-1),{layout:"playlist",isPlaying:r,isAlbum:s,liked:!!this._trackLikes[t.id],onSave:(n,o)=>this._handleSaveTrack(n,o),onQueue:(n,o)=>this._handleQueueTrack(n,o),onMenu:(n,o)=>this._handleTrackMenu(n,o)})}catch(s){return console.error("[PlaylistView] Track Render Error:",s,t),l`<div class="track-row error">Error loading track</div>`}}_handleTrackMenu(t,e){t.stopPropagation();let i={...e,anchor:t.currentTarget.getBoundingClientRect()};if(this.data?.type==="playlist"){let s=e?.uri,r=(this.data.tracks?.items||[]).filter(n=>(n?.track||n)?.uri===s).length;i={...i,context:{surface:"playlist",playlistId:this.data.id,canEditItems:!!this.data.canEditItems,snapshotId:this.data.snapshotId||null,uriCount:r}}}this.dispatchEvent(new CustomEvent("open-track-menu",{detail:i,bubbles:!0,composed:!0}))}_toast(t){this.dispatchEvent(new CustomEvent("show-toast",{detail:{message:t},bubbles:!0,composed:!0}))}async _checkTrackLikes(){if(!this.api||!this.data?.tracks?.items)return;let t=this.data.tracks.items.map(i=>(i.track||i)?.id).filter(Boolean);if(t.length===0)return;let e=await this.api.checkTrackFavorites(t);e&&typeof e=="object"&&(this._trackLikes={...this._trackLikes,...e})}async _enrichGenres(){if(this.config?.appearance?.performance?.lite||this._enrichingGenres)return;let t=this.data?.tracks?.items;if(!this.api||!t?.length)return;this._enrichedArtists||(this._enrichedArtists=new Set);let e=new Set;for(let s of t){let n=((s.track||s).artists||[]).map(o=>o?.id).filter(Boolean);for(let o of n)this._enrichedArtists.has(o)||e.add(o)}let i=[...e].slice(0,24);if(i.length===0){this._rebuildGenrePills();return}this._artistGenreLocal||(this._artistGenreLocal=new Map),this._enrichingGenres=!0;try{for(let r=0;r<i.length;r+=4){let n=i.slice(r,r+4),o=await Promise.all(n.map(c=>this.api.getArtistGenres(c)));if(n.forEach((c,d)=>{this._artistGenreLocal.set(c,o[d]||[]),this._enrichedArtists.add(c)}),!this.isConnected)return}for(let r of t){let n=r.track||r;if(!n?.id||this._trackGenres[n.id])continue;let o=new Set;for(let c of n.artists||[])for(let d of this._artistGenreLocal.get(c?.id)||[])o.add(d);o.size&&(this._trackGenres[n.id]=[...o])}this._rebuildGenrePills()}finally{this._enrichingGenres=!1}}_rebuildGenrePills(){let t=new Map;for(let i of Object.values(this._trackGenres))for(let s of i)t.set(s,(t.get(s)||0)+1);let e=[...t.entries()].filter(([,i])=>i>=2).sort((i,s)=>s[1]-i[1]).slice(0,12).map(([i])=>({genre:i,label:this._titleCase(i)}));this._activeGenre&&!e.some(i=>i.genre===this._activeGenre)&&(this._activeGenre=null),this._genrePills=e}_titleCase(t){return String(t).replace(/\b\w/g,e=>e.toUpperCase())}_toggleGenre(t){this._activeGenre=this._activeGenre===t?null:t}async _handleSaveTrack(t,e){if(t.stopPropagation(),!this.api||!e?.id)return;let i=!!this._trackLikes[e.id],s=!i;if(this._trackLikes={...this._trackLikes,[e.id]:s},!(s?await this.api.saveTrackFavorites(e.id):await this.api.removeTrackFavorites(e.id)).success){this._trackLikes={...this._trackLikes,[e.id]:i},this.dispatchEvent(new CustomEvent("show-toast",{detail:{message:s?"Failed to save track":"Failed to remove track"},bubbles:!0,composed:!0}));return}this.dispatchEvent(new CustomEvent("show-toast",{detail:{message:s?"Added to Liked Songs":"Removed from Liked Songs"},bubbles:!0,composed:!0})),this._likeVerifyTimer&&clearTimeout(this._likeVerifyTimer),this._likeVerifyTimer=setTimeout(async()=>{if(!this.isConnected)return;let n=await this.api.checkTrackFavorites(e.id);typeof n=="boolean"&&n!==this._trackLikes[e.id]&&(this._trackLikes={...this._trackLikes,[e.id]:n})},3e3)}async _handleQueueTrack(t,e){if(t.stopPropagation(),!this.api||!e?.uri)return;let i=await this.api.addToQueue(e.uri);this.dispatchEvent(new CustomEvent("show-toast",{detail:{message:i?.success?"Added to queue":"Failed to add to queue"},bubbles:!0,composed:!0}))}async _handleTrackClick(t,e,i=null){if(t.target.closest("button"))return;let s=this.data.type,r=i!=null&&!this._activeGenre?i:null;if(this._optimisticPlayingTrackId=e.id,this._optimisticPlayState="playing",this._optimisticTrackTimer&&clearTimeout(this._optimisticTrackTimer),this._optimisticTrackTimer=setTimeout(()=>{this._optimisticPlayingTrackId=null,this._optimisticPlayState=null},8e3),s==="likedsongs"){let n=await this.api.getCurrentUserId();if(n){let o=`spotify:user:${n}:collection`;await this.api.playMedia(o,"playlist",null,{offset_uri:e.uri,offset_position:r})}else await this.api.playMedia(e.uri,"track")}else await this.api.playMedia(this.data.uri,s,null,{offset_uri:e.uri,offset_position:r})}async _playContext(t,e="playlist"){!t||!this.api||await this.api.playMedia(t,e)}_handleShufflePlay(){this._optimisticPlayState="playing",this._optimisticTimer&&clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticPlayState=null},3e3),this._playContext(this.data.uri,this.data.type)}_handleHeroPlayClick(){k("light");let e=this._getIsPlaying()?"paused":"playing";this._optimisticPlayState=e,this._optimisticTimer&&clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticPlayState=null},3e3),e==="playing"?this._playContext(this.data.uri,this.data.type):this.api.togglePlayback(!1)}async _toggleFollowPlaylist(t){t?.stopPropagation();let e=this.data?.id;if(!e||!this.api)return;let i=!this._isFollowing;this._isFollowing=i;let s;i?s=await this.api.followPlaylist(e):s=await this.api.unfollowPlaylist(e),s.success?this.dispatchEvent(new CustomEvent("show-toast",{detail:{message:`${i?"Added to":"Removed from"} your library.`},bubbles:!0,composed:!0})):(this._isFollowing=!i,this.dispatchEvent(new CustomEvent("show-toast",{detail:{message:`Failed to ${i?"follow":"unfollow"} playlist.`},bubbles:!0,composed:!0})))}_openHeaderMenu(t){t?.stopPropagation();let e=this.data;if(!e)return;let i=!!e.isOwner,s=[];i?(s.push({id:"pm-edit",label:"Edit Playlist",icon:"pencil"}),s.push(e.public!==!1?{id:"pm-toggle-public",label:"Make Private",icon:"lock"}:{id:"pm-toggle-public",label:"Make Public",icon:"lock"}),s.push(e.collaborative?{id:"pm-toggle-collab",label:"Remove Collaborative",icon:"people"}:{id:"pm-toggle-collab",label:"Make Collaborative",icon:"people"})):s.push(this._isFollowing?{id:"pm-unfollow",label:"Remove from Your Library",icon:"heart-filled"}:{id:"pm-follow",label:"Add to Your Library",icon:"heart"}),this._pinnedEntity&&s.push({id:"pm-pin",label:this._isPinned?"Unpin from Home":"Pin to Home",icon:"pin"}),i&&s.push({id:"pm-delete",label:"Delete Playlist",icon:"trash",danger:!0}),this.dispatchEvent(new CustomEvent("open-context-menu",{detail:{header:{image:e.images?.[0]?.url||"",name:e.name,subtitle:e.owner?.display_name||"Playlist"},items:s,anchor:t?.currentTarget?.getBoundingClientRect?.()||null,onAction:r=>this._handleHeaderMenuAction(r)},bubbles:!0,composed:!0}))}_handleHeaderMenuAction(t){switch(t){case"pm-edit":this._enterEditMode();break;case"pm-toggle-public":this._togglePlaylistFlag("public");break;case"pm-toggle-collab":this._togglePlaylistFlag("collaborative");break;case"pm-pin":this._togglePin();break;case"pm-follow":case"pm-unfollow":this._toggleFollowPlaylist();break;case"pm-delete":this._confirmDelete();break}}async _togglePlaylistFlag(t){let e=this.data;if(!e?.id||!this.api)return;let i=e.public!==!1,s=!!e.collaborative;if(t==="public"?(i=!i,i&&(s=!1)):(s=!s,s&&(i=!1)),!(await this.api.changePlaylistDetails(e.id,{name:e.name,description:e.description||"",isPublic:i,collaborative:s})).success){this._toast("Couldn't update playlist settings");return}let n=s?!1:i;this._toast(t==="public"?n?"Playlist is now public":"Playlist is now private":s?"Playlist is now collaborative":"Collaborative turned off"),this.dispatchEvent(new CustomEvent("playlist-changed",{detail:{playlistId:e.id,action:"edit",patch:{public:n,collaborative:s}},bubbles:!0,composed:!0}))}_confirmDelete(){this.dispatchEvent(new CustomEvent("show-alert",{detail:{title:"Delete playlist?",message:`"${this.data.name}" will be removed from Your Library.`,confirmText:"Delete",onConfirm:async()=>{(await this.api.unfollowPlaylist(this.data.id)).success?(this._toast("Playlist deleted"),this.dispatchEvent(new CustomEvent("playlist-changed",{detail:{playlistId:this.data.id,action:"delete"},bubbles:!0,composed:!0}))):this._toast("Couldn't delete playlist")}},bubbles:!0,composed:!0}))}_enterEditMode(){if(this.data?.canEditItems){if(this.data.tracksComplete===!1){this._toast("Tracks are still loading \u2014 try again in a moment.");return}this._origItems=(this.data.tracks?.items||[]).map((t,e)=>({key:`${(t?.track||t)?.uri||"na"}:${e}`,item:t})),this._workingItems=[...this._origItems],this._editName=this.data.name||"",this._editDescription=this.data.description||"",this._editPlaylistId=this.data.id,this._editMode=!0}}_cancelEditMode(){this._saving||(this._editMode=!1,this._workingItems=null,this._origItems=null)}_removeWorkingItem(t){k("light");let e=[...this._workingItems];e.splice(t,1),this._workingItems=e}async _saveEdits(){if(this._saving||!this.api||!this.data?.id)return;let t=this._origItems||[],e=this._workingItems||[],i=(this._editName||"").trim();if(!i){this._toast("Playlist name can't be empty");return}let s=(this._editDescription||"").trim(),r=i!==(this.data.name||"")||s!==(this.data.description||"").trim(),n=!(e.length===t.length&&e.every((h,m)=>h.key===t[m].key));if(!r&&!n){this._cancelEditMode();return}let o=h=>(h.item?.track||h.item)?.uri,c=new Set(e.map(h=>h.key)),d=h=>{let m=new Map;for(let x of h){let v=o(x);m.set(v,(m.get(v)||0)+1)}return m},p=d(t),u=d(e),g=[],f=!1;for(let[h,m]of p){let x=u.get(h)||0;x===0?g.push(h):x<m&&(f=!0)}if(f&&e.length>100){this._toast("Spotify can't remove a single copy of a duplicated song in playlists over 100 tracks \u2014 remove all copies instead.");return}this._saving=!0;try{let h=this.data.snapshotId||null;if(r){let v=await this.api.changePlaylistDetails(this.data.id,{name:i,description:s,isPublic:this.data.public!==!1,collaborative:!!this.data.collaborative});if(!v.success)throw v.error||new Error("details change failed")}if(f){let v=await this.api.replacePlaylistItems(this.data.id,e.map(o));if(!v.success)throw v.error||new Error("replace failed");h=v.snapshotId||h}else{if(g.length){let w=await this.api.removePlaylistItems(this.data.id,g,h);if(!w.success)throw w.error||new Error("remove failed");h=w.snapshotId||h}let v=t.filter(w=>c.has(w.key)).map(w=>w.key),y=e.map(w=>w.key);for(let w=0;w<y.length;w++){if(v[w]===y[w])continue;let S=v.indexOf(y[w],w);if(S<0)throw new Error("reorder diff diverged");let T=await this.api.reorderPlaylistItems(this.data.id,S+1,w+1,1,h);if(!T.success)throw T.error||new Error("reorder failed");h=T.snapshotId||h,v.splice(S,1),v.splice(w,0,y[w])}}let m=e.map(v=>v.item),x={name:i,description:s,tracks:{...this.data.tracks,items:m,total:m.length},snapshotId:h,tracksComplete:!0};this._editMode=!1,this._workingItems=null,this._origItems=null,this._toast("Playlist updated"),this.dispatchEvent(new CustomEvent("playlist-changed",{detail:{playlistId:this.data.id,action:"items",patch:x},bubbles:!0,composed:!0}))}catch(h){console.error("[PlaylistView] Save edits failed:",h),this._editMode=!1,this._workingItems=null,this._origItems=null,this._toast("Couldn't save all changes \u2014 reloading playlist"),this.dispatchEvent(new CustomEvent("playlist-changed",{detail:{playlistId:this.data.id,action:"items"},bubbles:!0,composed:!0}))}finally{this._saving=!1}}_renderEditMode(){let t=this._workingItems||[];return l`
            <div class="main-scroll-container edit-mode">
                <div class="edit-bar">
                    <button class="edit-bar-btn" @click=${this._cancelEditMode} ?disabled=${this._saving}>Cancel</button>
                    <div class="edit-bar-title">Edit playlist</div>
                    <button class="edit-bar-btn save" @click=${this._saveEdits} ?disabled=${this._saving}>
                        ${this._saving?"Saving\u2026":"Save"}
                    </button>
                </div>
                <div class="edit-fields">
                    <input class="edit-name-input" type="text" maxlength="100"
                        placeholder="Playlist name"
                        .value=${this._editName||""}
                        ?disabled=${this._saving}
                        @input=${e=>{this._editName=e.target.value}} />
                    <textarea class="edit-desc-input" maxlength="300" rows="2"
                        placeholder="Add a description"
                        .value=${this._editDescription||""}
                        ?disabled=${this._saving}
                        @input=${e=>{this._editDescription=e.target.value}}></textarea>
                </div>
                <div class="track-list edit-list"
                     @pointermove=${e=>this._drag.move(e)}
                     @pointerup=${e=>this._drag.end(e)}
                     @pointercancel=${e=>this._drag.end(e)}>
                    ${De(t,e=>e.key,(e,i)=>this._renderEditRow(e,i))}
                    ${t.length===0?l`<div class="edit-empty">All tracks removed — Save to clear the playlist.</div>`:""}
                </div>
            </div>
        `}_renderEditRow(t,e){let i=t.item?.track||t.item,s=i?.album?.images,r=s&&(s[0]?.url||s[s.length-1]?.url)||"";return l`
            <div class="edit-row ${this._drag.rowClass(e)}">
                <button class="edit-remove" title="Remove" ?disabled=${this._saving}
                    @click=${()=>this._removeWorkingItem(e)}>
                    ${ls}
                </button>
                <div class="edit-art ${r?"":"art-fallback"}" style="${r?`background-image:url('${r}')`:""}">
                    ${r?l`<div class="edit-art-play">${Y(22)}</div>`:""}
                </div>
                <div class="edit-text">
                    <div class="edit-name">${i?.name}</div>
                    <div class="edit-artist">${(i?.artists||[]).map(n=>n.name).join(", ")}</div>
                </div>
                <div class="edit-handle"
                    @pointerdown=${n=>this._drag.start(n,e,this.shadowRoot.querySelector(".edit-list"))}>
                    ${ds}
                </div>
            </div>
        `}async _checkAlbumLike(){if(!(!this.api||!this.data?.id))try{let t=await this.api.checkAlbumFavorites(this.data.id);typeof t=="boolean"?this._albumLiked=t:t&&typeof t=="object"&&(this._albumLiked=t[this.data.id]===!0)}catch{}}async _fetchArtistInfo(){let t=this.data?.artists?.[0];if(!t?.id){this._artistInfo=null;return}if(this._artistInfo?.id!==t.id&&(this._artistInfo={id:t.id,name:t.name,image:""},!!this.api))try{let i=(await this.api.fetchSpotifyPlus("get_artist",{artist_id:t.id}))?.result?.images?.[0]?.url;i&&this._artistInfo?.id===t.id&&(this._artistInfo={...this._artistInfo,image:i})}catch{}}async _toggleLikeAlbum(t){if(t&&t.stopPropagation(),!this.api||!this.data?.id)return;k("success");let e=!this._albumLiked;this._albumLiked=e;let i=e?await this.api.saveAlbumFavorites(this.data.id):await this.api.removeAlbumFavorites(this.data.id);!i||i.success===!1?(this._albumLiked=!e,this.dispatchEvent(new CustomEvent("show-toast",{detail:{message:"Failed to update your library."},bubbles:!0,composed:!0}))):this.dispatchEvent(new CustomEvent("show-toast",{detail:{message:e?"Added to your library.":"Removed from your library."},bubbles:!0,composed:!0}))}_handleAlbumShuffle(){k("light"),this._optimisticPlayState="playing",this._optimisticTimer&&clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticPlayState=null},3e3);try{this.api?.fetchSpotifyPlus("player_shuffle",{state:"true"},!1)}catch{}this._playContext(this.data.uri,this.data.type)}_navigateToArtist(t){t&&t.stopPropagation();let e=this._artistInfo?.id||this.data?.artists?.[0]?.id;if(!e)return;let i=this._artistInfo?.name||this.data?.artists?.[0]?.name||"";this.dispatchEvent(new CustomEvent("navigate",{detail:{pageId:`artist:${e}`,data:{title:i,type:"artist",subtitle:"Artist"}},bubbles:!0,composed:!0}))}_albumTypeLabel(){let t=this.data?.album_type||this.data?.type||"album",e=this.data?.total_tracks||this.data?.tracks?.total||this.data?.tracks?.items?.length||0;return t==="single"?e>1&&e<=6?"EP":"Single":t==="compilation"?"Compilation":t==="album"&&e>0&&e<=6?"EP":"Album"}_formatReleaseDate(){let t=this.data?.release_date;if(!t)return"";if(this.data?.release_date_precision==="year"||/^\d{4}$/.test(t))return t.slice(0,4);let i=new Date(t);if(isNaN(i.getTime()))return t;let r=i.getFullYear()===new Date().getFullYear()?{month:"short",day:"numeric"}:{month:"short",day:"numeric",year:"numeric"};return i.toLocaleDateString(void 0,r)}};customElements.define("spotify-playlist-view",Xe);var Je=class extends b{static get styles(){return[$,ht,_`
                :host { 
                    display: block !important; 
                    width: 100% !important; 
                    height: 100% !important; 
                    position: relative !important;
                    overflow: hidden !important; 
                }
                .main-scroll-container {
                    width: 100%;
                    height: 100%;
                    overflow-y: auto;
                    overflow-x: hidden;
                    overscroll-behavior-y: auto;
                    overscroll-behavior-x: none;
                    position: relative;
                    background: var(--spf-bg);
                }
                .artist-hero { 
                    height: 375px !important; 
                    min-height: 375px !important; 
                    max-height: 375px !important;
                    display: block !important;
                    position: relative !important;
                    margin-top: 0 !important;
                    width: 100% !important;
                    overflow: visible !important;
                }
                /* Ensure this specific element behaves as expected */
                .artist-hero .hero-bg {
                     height: 100% !important;
                     overflow: visible !important;
                }
                .content-wrapper {
                    padding: 12px;
                    padding-bottom: 100px;
                    position: relative;
                    background: var(--spf-bg); 
                }
                .hero-bg, .hero-bg img { width: 100%; height: 100%; object-fit: cover; }

                /* Pin button — same styling as the playlist header: outlined
                   circle when not pinned, green-filled when pinned. */
                .hero-pin {
                    flex-shrink: 0; width: 56px; height: 56px; border-radius: 50%;
                    border: 2px solid rgba(255,255,255,0.6); background: transparent;
                    color: rgba(255,255,255,0.85); cursor: pointer; padding: 0;
                    display: flex; align-items: center; justify-content: center;
                    transition: all 0.15s ease;
                }
                .hero-pin svg { width: 26px; height: 26px; fill: currentColor; }
                .hero-pin.pinned {
                    background: var(--spf-brand, #1ed760);
                    border-color: var(--spf-brand, #1ed760);
                    color: #000;
                }
            `]}static get properties(){return{hass:{type:Object},data:{type:Object},api:{type:Object},config:{type:Object},pinned:{type:Object},playingTrackId:{type:String},currentTrackId:{type:String},isPlaying:{type:Boolean},_isFollowing:{type:Boolean,state:!0},_currentUserId:{type:String,state:!0},_isPinned:{type:Boolean,state:!0},_pinnedEntity:{type:String,state:!0},_trackLikes:{type:Object,state:!0},_optimisticPlayingTrackId:{type:String,state:!0},_optimisticPlayState:{type:String,state:!0}}}constructor(){super(),this.hass=null,this.playingTrackId=null,this.currentTrackId=null,this.isPlaying=!1,this._isPinned=!1,this._pinnedEntity=null,this._trackLikes={},this._optimisticPlayingTrackId=null,this._optimisticPlayState=null,this._currentHassIdAtClick=null}connectedCallback(){super.connectedCallback(),this._checkPinStatus()}disconnectedCallback(){super.disconnectedCallback(),this._optimisticTimer&&clearTimeout(this._optimisticTimer),this._optimisticContextTimer&&clearTimeout(this._optimisticContextTimer),this._scrollRaf&&cancelAnimationFrame(this._scrollRaf),this._optimisticTimer=null,this._optimisticContextTimer=null,this._scrollRaf=null}shouldUpdate(t){return!(t.size===1&&t.has("hass"))}updated(t){t.has("data")&&(this._checkPinStatus(),this._checkFollowStatus(),this._checkTrackLikes()),this._optimisticPlayingTrackId&&t.has("currentTrackId")&&this.currentTrackId===this._optimisticPlayingTrackId&&(this._optimisticPlayingTrackId=null),setTimeout(()=>this._updateHeaderState(),0)}_getPlayingTrackId(){return this._optimisticPlayingTrackId?this._optimisticPlayingTrackId:this.playingTrackId||null}_getIsPlaying(){return this._optimisticPlayState?this._optimisticPlayState==="playing":!!this.isPlaying}_handleHeroPlayClick(){let e=this._getIsPlaying()?"paused":"playing";this._optimisticPlayState=e,this._optimisticContextTimer&&clearTimeout(this._optimisticContextTimer),this._optimisticContextTimer=setTimeout(()=>{this._optimisticPlayState=null},3e3),e==="playing"?this._playContext(this.data.uri,"artist"):this.api.togglePlayback(!1)}async _checkPinStatus(){if(!this.pinned||!this.data)return;if(!this.pinned.canEdit()){this._pinnedEntity=null;return}let t=await this.pinned.getItems();this._isPinned=!!t.find(e=>e.id===this.data.id),this._pinnedEntity=this.pinned.sensorEntity}_getHassTrackId(){return this.currentTrackId||null}async _checkFollowStatus(){if(!this.api||!this.data)return;let t=await this.api.checkArtistsFollowing(this.data.id);t!==null&&(this._isFollowing=t)}async _toggleFollow(){if(!this.api||!this.data)return;let t=this._isFollowing,e=!t;this._isFollowing=e;let i;if(e?i=await this.api.followArtist(this.data.id):i=await this.api.unfollowArtist(this.data.id),!i.success){this._isFollowing=t,this.dispatchEvent(new CustomEvent("show-alert",{detail:{title:"Follow Action Failed",message:"Failed to update follow status.",confirmText:"OK",size:"mini"},bubbles:!0,composed:!0}));return}setTimeout(async()=>{if(!this.isConnected)return;let s=await this.api.checkArtistsFollowing(this.data.id);s!==null&&s!==e&&(console.warn("[SpotifyArtistView] Follow state mismatch detected after verification. Correcting."),this._isFollowing=s)},3e3)}async _togglePin(){if(!this._pinnedEntity||!this.pinned)return;let t={id:this.data.id,type:this.data.type,name:this.data.name||this.data.title,images:this.data.images,uri:this.data.uri},e=await this.pinned.toggle(t);e.success?(this._isPinned=!this._isPinned,this.dispatchEvent(new CustomEvent("pinned-changed",{bubbles:!0,composed:!0}))):this.dispatchEvent(new CustomEvent("show-alert",{detail:{title:"Pinning Failed",message:e.error||"Unknown error",confirmText:"OK",size:"mini"},bubbles:!0,composed:!0}))}async _checkTrackLikes(){if(!this.api||!this.data||!this.data.topTracks)return;let t=this.data.topTracks.map(i=>i.id||i.track?.id).filter(Boolean);if(t.length===0)return;let e=await this.api.checkTrackFavorites(t);e&&(this._trackLikes={...this._trackLikes,...e})}async _toggleTrackLike(t,e){if(e&&e.stopPropagation(),!this.api||!t)return;let i=!!this._trackLikes[t.id],s=!i;this._trackLikes={...this._trackLikes,[t.id]:s};let r;if(s?r=await this.api.saveTrackFavorites(t.id):r=await this.api.removeTrackFavorites(t.id),!r.success){this._trackLikes={...this._trackLikes,[t.id]:i},this.dispatchEvent(new CustomEvent("show-alert",{detail:{title:"Action Failed",message:"Failed to update favorite.",confirmText:"OK",size:"mini"},bubbles:!0,composed:!0}));return}setTimeout(async()=>{if(!this.isConnected)return;let n=await this.api.checkTrackFavorites(t.id);n!==null&&n!==s&&(console.warn(`[SpotifyArtistView] Track like mismatch for ${t.id}. Correcting.`),this._trackLikes={...this._trackLikes,[t.id]:n})},3e3)}_handleScroll(t){this._scrollTarget=t.currentTarget||t.target,!this._scrollRaf&&(this._scrollRaf=requestAnimationFrame(()=>{this._scrollRaf=null,this._applyScroll(this._scrollTarget)}))}_applyScroll(t){if(t){let e=t.scrollTop,i=this._heroImgEl;if((!i||!i.isConnected)&&(i=this._heroImgEl=this.shadowRoot.querySelector(".artist-hero .hero-bg img")),i)if(e<0){let s=1-e/375;i.style.transform=`translateY(${e}px) scale(${s})`,i.style.transformOrigin="top center"}else i.style.transform="",i.style.transformOrigin=""}this._updateHeaderState()}updateHeaderState(){this._updateHeaderState()}_updateHeaderState(){let t=this._scrollContainerEl;if((!t||!t.isConnected)&&(t=this._scrollContainerEl=this.shadowRoot.querySelector(".main-scroll-container")),!t)return;let e=t.scrollTop,i=200,s=Math.min(1,e/i),r=0;e>i-50&&(r=Math.min(1,(e-(i-50))/50)),this.dispatchEvent(new CustomEvent("header-scroll",{detail:{alpha:s,title:this.data?.name||"",textAlpha:r},bubbles:!0,composed:!0}))}_playPopularTrack(t){if(!t||!this.api||!this.data||!this.data.topTracks)return;let e=[...this.data.topTracks],i=t.id,s=e.findIndex(c=>c.id===i||c.track&&c.track.id===i);if(s===-1)return;this._currentHassIdAtClick=this._getHassTrackId(),this._optimisticTimer&&(clearTimeout(this._optimisticTimer),this._optimisticTimer=null),this._optimisticPlayingTrackId=i,this._optimisticTimer=setTimeout(()=>{this._optimisticPlayingTrackId===i&&(this._optimisticPlayingTrackId=null)},8e3);let[r]=e.splice(s,1);for(let c=e.length-1;c>0;c--){let d=Math.floor(Math.random()*(c+1));[e[c],e[d]]=[e[d],e[c]]}let o=[r,...e].map(c=>c.uri||c.track?.uri).filter(Boolean);o.length!==0&&this.api.playMedia(o,"track",null,{shuffle:!1})}_playContext(t,e="artist"){!t||!this.api||this.api.playMedia(t,e)}_navigateToAlbum(t,e){e&&e.stopPropagation(),this.dispatchEvent(new CustomEvent("navigate",{detail:{pageId:`album:${t.id}`,data:t},bubbles:!0,composed:!0}))}_navigateToArtist(t,e){e&&e.stopPropagation(),this.dispatchEvent(new CustomEvent("navigate",{detail:{pageId:`artist:${t.id}`,data:t},bubbles:!0,composed:!0}))}render(){return this.data?this.renderArtistProfile(this.data):l`<div class="loading-spinner"></div>`}renderArtistProfile(t){return l`
            <div class="main-scroll-container has-hero" @scroll=${this._handleScroll}>
                <div class="artist-hero">
                    <div class="hero-bg skeleton-pulse">
                         <img src="${t.images?.[0]?.url}" 
                             style="width: 100%; height: 100%; object-fit: cover; object-position: center 20%; opacity: 0; transition: opacity 0.5s ease;"
                             onload="this.style.opacity = 1; this.parentElement.classList.remove('skeleton-pulse');"
                        >
                    </div>
                    <div class="hero-gradient"></div>
                    <div class="artist-header-content">
                        <h1 class="artist-hero-name">${t.name}</h1>
                        <div class="hero-stats">
                            ${t.followers?.total?l`<span>${t.followers.total.toLocaleString()} followers</span>`:""}
                            ${t.genres?.length?l`<span> • ${t.genres.slice(0,3).join(", ")}</span>`:""}
                        </div>
                        <div class="hero-actions">
                            <button class="hero-btn-play" @click=${()=>this._handleHeroPlayClick()}>
                                ${this._getIsPlaying()?re(28):Y(28)}
                            </button>
                            ${this._pinnedEntity?l`
                                <button class="hero-pin ${this._isPinned?"pinned":""}" @click=${this._togglePin}
                                        aria-label="${this._isPinned?"Unpin":"Pin"}" title="${this._isPinned?"Unpin":"Pin"}">
                                    ${ae}
                                </button>
                            `:""}

                            <button
                                class="hero-btn-fav"
                                @click=${this._toggleFollow}
                                style="${this._isFollowing?"border-color: var(--spf-brand); color: var(--spf-brand);":""}"
                            >
                                ${this._isFollowing?"FOLLOWING":"FOLLOW"}
                            </button>
                        </div>
                    </div>
                </div>
                <div class="content-wrapper">
                    ${t.topTracks===null||t.topTracks?.length?l`
                        <section class="artist-section">
                            <h2>Popular</h2>
                            <div class="artist-track-grid">
                                ${t.topTracks===null?Array(5).fill(0).map(()=>us()):t.topTracks.map((e,i)=>this.renderArtistTopTrack(e.track||e))}
                            </div>
                        </section>
                    `:""}
                    
                    ${t.albums===null||t.albums?.length?l`
                        <section class="artist-section">
                            <div class="section-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                                <h2 style="margin: 0;">Discography</h2>
                                <button class="see-all-btn" @click=${()=>this.dispatchEvent(new CustomEvent("navigate",{detail:{pageId:`artist-discography:${t.id}`,data:{name:t.name,id:t.id}},bubbles:!0,composed:!0}))} style="background: none; border: none; color: #b3b3b3; font-size: var(--spf-text-sm, 12px); font-weight: 700; letter-spacing: 1px; cursor: pointer; text-transform: uppercase;">SEE ALL</button>
                            </div>
                            <div class="carousel-wrapper">
                                 <div class="carousel-layout">
                                    ${t.albums===null?Array(5).fill(0).map(()=>rt()):t.albums.map(e=>dt(e,"album",i=>this._navigateToAlbum(e,i)))}
                                 </div>
                            </div>
                        </section>
                    `:""}

                    ${t.playlists===void 0||t.playlists?.length?l`
                        <section class="artist-section">
                            <h2>Appears On</h2>
                            <div class="carousel-wrapper">
                                <div class="carousel-layout">
                                    ${t.playlists?t.playlists.map(e=>dt(e,"playlist",()=>{this.dispatchEvent(new CustomEvent("navigate",{detail:{pageId:`playlist:${e.id}`,data:e},bubbles:!0,composed:!0}))})):Array(5).fill(0).map(()=>rt())}
                                </div>
                            </div>
                        </section>
                    `:""}

                    ${t.similarArtists===null||t.similarArtists?.length?l`
                        <section class="artist-section">
                            <h2>Fans Also Like</h2>
                            <div class="carousel-wrapper">
                                <div class="carousel-layout circle-cards">
                                    ${t.similarArtists===null?Array(5).fill(0).map(()=>rt()):t.similarArtists.map(e=>dt(e,"artist",i=>this._navigateToArtist(e,i)))}
                                </div>
                            </div>
                        </section>
                    `:""}
                </div>
            </div>
        `}renderArtistTopTrack(t){let e=!!this._trackLikes[t.id],s=this._getPlayingTrackId()===t.id;return ps(t,r=>this._playPopularTrack(t),r=>{r.preventDefault(),r.stopPropagation();let n=t.album?.images?.[0]?.url,o={name:t.name,artist:t.artists?t.artists.map(c=>c.name).join(", "):"",album:t.album?.name||"",uri:t.uri,id:t.id,image:n,anchor:r.currentTarget.getBoundingClientRect()};this.dispatchEvent(new CustomEvent("open-track-menu",{detail:o,bubbles:!0,composed:!0}))},r=>this._toggleTrackLike(t,r),e,s)}};customElements.define("spotify-artist-view",Je);var Ze=class extends b{static get properties(){return{data:{type:Object}}}static get styles(){return[$,_`
                 :host { 
                     display: block; 
                     width: 100%; 
                     height: 100%; 
                     position: relative; 
                     z-index: 0;
                 }
                 .section-table-container {
                     padding: 0; /* Remove padding to allow full width rows */
                     /* Clear the app header (which overlays the top) + safe area */
                     padding-top: calc(64px + var(--spf-safe-top, 0px));
                     padding-bottom: 24px;
                     background: var(--spf-bg);
                     min-height: 100%;
                 }

                 /* Table Styles */
                 .table-row {
                     display: grid;
                     grid-template-columns: 56px 1fr; /* Image, Details */
                     gap: 16px;
                     padding: 8px 16px;
                     cursor: pointer;
                     transition: background 0.2s;
                     align-items: center;
                     border-bottom: 1px solid rgba(255,255,255,0.05);
                 }
                 .table-row:hover { background: rgba(255,255,255,0.1); }
                 .row-img { width: 48px; height: 48px; background-size: cover; background-position: center; border-radius: 4px; background-color: #282828; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }
                 .row-info { display: flex; flex-direction: column; justify-content: center; min-width: 0; }
                 .row-title { font-size: var(--spf-text-md, 15px); font-weight: 500; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                 .row-sub { font-size: var(--spf-text-base, 13.5px); color: #b3b3b3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 4px; }
                 
                 @media (min-width: 769px) {
                     .table-row {
                         grid-template-columns: 56px 2fr 1fr; /* Image, Title/Sub, Extra Info? */
                     }
                 }
            `]}updated(t){t.has("data")&&this._emitHeaderState()}updateHeaderState(){this._emitHeaderState()}_emitHeaderState(){this.dispatchEvent(new CustomEvent("header-scroll",{detail:{alpha:1,title:this.data?.name||"",textAlpha:1},bubbles:!0,composed:!0}))}disconnectedCallback(){super.disconnectedCallback(),this._scrollRaf&&cancelAnimationFrame(this._scrollRaf),this._scrollRaf=null}_handleScroll(t){this._scrollTarget=t.target,!this._scrollRaf&&(this._scrollRaf=requestAnimationFrame(()=>{this._scrollRaf=null,this._applyScroll(this._scrollTarget)}))}_applyScroll(t){t&&(this._emitHeaderState(),!(!this.data||this.data.isLoading||!this.data.hasMore)&&t.scrollTop+t.clientHeight>=t.scrollHeight-300&&this.dispatchEvent(new CustomEvent("load-more",{bubbles:!0,composed:!0})))}render(){if(!this.data)return l``;let{items:t,isLoading:e}=this.data;return l`
            <div class="main-scroll-container" @scroll=${this._handleScroll} style="height: 100%; overflow-y: auto; overflow-x: hidden; overscroll-behavior-y: auto; overscroll-behavior-x: none; position: relative;">
                <div class="section-table-container">
                    ${t&&t.length>0?t.map(i=>this.renderTableRow(i)):""}
                    ${e?l`<div style="padding: 20px; text-align: center; color: #b3b3b3;">Loading more...</div>`:""}
                </div>
            </div>
        `}renderTableRow(t){if(!t)return"";let e=t.name||"Unknown",i=M(t),s="";if(t.type==="playlist")t.owner?s=`By ${t.owner.display_name}`:t.description&&(s=t.description);else if(t.type==="album"){let o=t.artists?t.artists.map(d=>d.name).join(", "):"Unknown Artist",c=t.release_date?` \u2022 ${t.release_date.split("-")[0]}`:"";s=`${o}${c}`}else t.type==="artist"?s="Artist":t.artists?s=t.artists.map(o=>o.name).join(", "):t.owner&&(s=`By ${t.owner.display_name}`);let r=t.type,n=t.id;return l`
            <div class="table-row" @click=${o=>{this.dispatchEvent(new CustomEvent("navigate",{detail:{pageId:`${r}:${n}`,data:t},bubbles:!0,composed:!0}))}}>
                <div class="row-img" style="background-image: url('${i}'); ${r==="artist"?"border-radius: 50%;":""}"></div>
                <div class="row-info">
                    <div class="row-title">${e}</div>
                    <div class="row-sub">${s}</div>
                </div>
            </div>
        `}};customElements.define("spotify-section-view",Ze);var pt=class a extends b{static get properties(){return{hass:{type:Object},api:{type:Object},config:{type:Object},pageId:{type:String},data:{type:Object},_contextData:{type:Object,state:!0},_isFollowing:{type:Boolean,state:!0},_currentUserId:{type:String,state:!0},pinned:{type:Object}}}static get styles(){return[$,ht]}shouldUpdate(t){let e=this._deriveHassState();return!(t.size===1&&t.has("hass")&&t.get("hass")&&!e)}_deriveHassState(){let t=this.api?.entityId||this.config?.entity,e=Zt(this.hass,t),i=Re(this.hass,t),s=lt(this.hass,t,this._contextData?.uri),r=this.pinned?.sensorEntity&&this.hass?this.hass.states[this.pinned.sensorEntity]:void 0,n=e!==this._playingTrackId||i!==this._currentTrackId||s!==this._isPlaying||r!==this._pinnedSensorState;return this._playingTrackId=e,this._currentTrackId=i,this._isPlaying=s,this._pinnedSensorState=r,n}constructor(){super(),this._contextData=null,this._isFollowing=!1,this._currentUserId=null,this._playingTrackId=null,this._currentTrackId=null,this._isPlaying=!1,this._pinnedSensorState=void 0}connectedCallback(){super.connectedCallback()}updated(t){(t.has("pageId")||t.has("hass")||t.has("api"))&&this.pageId&&this.hass&&this.api&&this.loadPageData()}async _handleLoadMore(){if(!this._contextData||this._contextData.isLoading||!this._contextData.hasMore)return;let t=this._contextData.type,e=this._contextData.offset||0,i=50;this._contextData={...this._contextData,isLoading:!0},this.requestUpdate();try{let s=[],r=this._contextData.total;if(t==="likedsongs"){let n=await this.api.getTrackFavorites({limit:i,offset:e,sort_result:!1});s=n?.result?.items||[],r=n?.result?.total||r;let o=this._contextData.tracks?.items||[],c=s.length>0?[...o,...s]:o;this._contextData={...this._contextData,tracks:{items:c,total:r},total:r,offset:e+s.length,hasMore:s.length>0&&c.length<r,isLoading:!1},a.cacheSet(this.pageId,this._contextData),this.requestUpdate();return}else if(t==="collection-playlists"){let n=await this.api.getCurrentUserPlaylists({limit:i,offset:e});s=n?.result?.items||[],r=n?.result?.total||r}else if(t==="artist-discography"){let n=await this.api.fetchPaginated("get_artist_albums",{artist_id:this._contextData.id,include_groups:"album,single,compilation",offset:e},i);s=n.items,r=n.total||r}if(s.length>0){let n=[...this._contextData.items,...s];this._contextData={...this._contextData,items:n,total:r,offset:e+s.length,hasMore:n.length<r,isLoading:!1},a.cacheSet(this.pageId,this._contextData)}else this._contextData={...this._contextData,isLoading:!1,hasMore:!1};this.requestUpdate()}catch(s){console.error("[ContextView] Load More Failed:",s),this._contextData={...this._contextData,isLoading:!1},this.requestUpdate()}}static stateCache=new Map;static MAX_CACHE_ENTRIES=30;static cacheSet(t,e){this.stateCache.has(t)&&this.stateCache.delete(t),this.stateCache.set(t,e),this.stateCache.size>this.MAX_CACHE_ENTRIES&&this.stateCache.delete(this.stateCache.keys().next().value)}static invalidate(t){this.stateCache.delete(t)}static clearAll(){this.stateCache.clear()}async refresh(t=null){if(this.pageId){if(t&&this._contextData){this._contextData={...this._contextData,...t},a.cacheSet(this.pageId,this._contextData),this.requestUpdate();return}a.invalidate(this.pageId),this._playlistPagerToken=null,this._contextData=null,await this.loadPageData()}}async _loadRemainingPlaylistTracks(t){let e=Symbol("playlist-pager");this._playlistPagerToken=e;let i=this._contextData?.id;if(!i||!this._contextData?.tracks?.items)return;let s=this._contextData.tracks.total||0,r=this._contextData.tracks.items.length;for(;r<s;){let n=await this.api.getPlaylistItemsPage(i,r,50);if(this._playlistPagerToken!==e||this.pageId!==t)return;let o=this._contextData;if(!o?.tracks?.items||o.id!==i)return;let c=n?.items||[];if(c.length===0)break;let d={...o.tracks,items:[...o.tracks.items,...c]};r=d.items.length,this._contextData={...o,tracks:d,tracksComplete:r>=(d.total||s)},a.cacheSet(t,this._contextData),this.requestUpdate()}this._playlistPagerToken===e&&this.pageId===t&&this._contextData?.id===i&&!this._contextData.tracksComplete&&(this._contextData={...this._contextData,tracksComplete:!0},a.cacheSet(t,this._contextData),this.requestUpdate())}async loadPageData(){if(!this.pageId)return;let t,e;this.pageId==="likedsongs"?(t="likedsongs",e="me"):[t,e]=this.pageId.split(":");let i=t==="playlist"&&!!this.data?.autoEdit;if(i&&(this.data.autoEdit=!1),this._contextData&&this._contextData.id===e&&this._contextData.type===t&&!this._contextData.isLoading){i&&(this._contextData={...this._contextData,autoEdit:!0},this.requestUpdate());return}if(a.stateCache.has(this.pageId)){this._contextData=a.stateCache.get(this.pageId),i&&(this._contextData={...this._contextData,autoEdit:!0}),this.requestUpdate(),this._contextData?.type==="playlist"&&this._contextData.tracksComplete===!1&&this._loadRemainingPlaylistTracks(this.pageId);return}this._contextData={type:t,id:e,isLoading:!0,name:"Loading...",items:[],offset:0,total:null,hasMore:!0,images:[],tracks:null,albums:null,playlists:null,topTracks:null,similarArtists:null},this.requestUpdate();try{if(t==="section")await this._loadSectionData(e,0);else if(t==="playlist"){let s=await this.api.fetchSpotifyPlus("get_playlist",{playlist_id:e});if(s?.result){let r=s.result;this._currentUserId||(this._currentUserId=s.user_profile?.id||await this.api.getCurrentUserId()||null);let n=!!this._currentUserId&&r.owner?.id===this._currentUserId,o=r.tracks?.total??(r.tracks?.items?.length||0);if(this._contextData={...this._contextData,...r,type:"playlist",isLoading:!1,isOwner:n,canEditItems:n,snapshotId:r.snapshotId||r.snapshot_id||null,tracksComplete:(r.tracks?.items?.length||0)>=o,...i?{autoEdit:!0}:{}},!n&&this._currentUserId&&this._contextData.id){try{let c=await this.api.checkUserFollowsPlaylist(this._contextData.id,this._currentUserId);c&&Array.isArray(c)&&c.length>0&&(this._isFollowing=c[0])}catch{}this._contextData.canEditItems=!!this._contextData.collaborative&&this._isFollowing}a.cacheSet(this.pageId,this._contextData),this.requestUpdate(),this._contextData.tracksComplete||this._loadRemainingPlaylistTracks(this.pageId)}}else if(t==="artist"){let s=this.api.fetchSpotifyPlus("get_artist",{artist_id:e}),r=this.api.fetchPaginated("get_artist_albums",{artist_id:e,include_groups:"album,single"},12),n=(async()=>{try{let u=(await this.api.fetchSpotifyPlus("get_artist_top_tracks",{artist_id:e}))?.result,g=Array.isArray(u)?u:u?.items||u?.tracks||[];if(g.length)return g.slice(0,12)}catch{}try{let p=await s;if(!p?.result?.name)return[];let{items:u}=await this.api.fetchPaginated("search_tracks",{criteria:`artist:"${p.result.name}"`},12);return u}catch{return[]}})(),o=(async()=>{let p=await s;return p?.result?.name?this._fetchLastFmSimilarArtists(p.result.name):[]})(),c=await s;c?.result&&(this._contextData={...this._contextData,...c.result,isLoading:!1},a.cacheSet(this.pageId,this._contextData),this.requestUpdate()),r.then(({items:p})=>{this._contextData={...this._contextData,albums:p},a.cacheSet(this.pageId,this._contextData),this.requestUpdate()}),n.then(p=>{this._contextData={...this._contextData,topTracks:p},a.cacheSet(this.pageId,this._contextData),this.requestUpdate()}),(async()=>{try{let p=await s;return p?.result?.name?(await this.api.searchPlaylists(p.result.name,12))?.result?.items||[]:[]}catch{return[]}})().then(p=>{this._contextData={...this._contextData,playlists:p},a.cacheSet(this.pageId,this._contextData),this.requestUpdate()}),o.then(async p=>{if(p.length>0){let u=await this._hydrateSimilarArtists(p);this._contextData={...this._contextData,similarArtists:u}}else this._contextData={...this._contextData,similarArtists:[]};a.cacheSet(this.pageId,this._contextData),this.requestUpdate()})}else if(t==="album"){let s=await this.api.fetchSpotifyPlus("get_album",{album_id:e});if(s?.result){let r=s.result;if(!r.tracks||!r.tracks.items||r.tracks.items.length===0){let n=await this.api.fetchSpotifyPlus("get_album_tracks",{album_id:e,limit:50});n?.result?.items&&(r.tracks||(r.tracks={}),r.tracks.items=n.result.items,r.tracks.total=n.result.total)}this._contextData={...this._contextData,...r,type:"album",isLoading:!1},a.cacheSet(this.pageId,this._contextData),this.requestUpdate()}else console.error("[ContextView] Album Load Failed:",s)}else if(t==="artist-discography"){let s=this.data?.name;s||(s=(await this.api.fetchSpotifyPlus("get_artist",{artist_id:e}))?.result?.name||"Artist");let r=50,{items:n,total:o}=await this.api.fetchPaginated("get_artist_albums",{artist_id:e,include_groups:"album,single,compilation"},r);this._contextData={id:e,type:"artist-discography",name:`${s} Discography`,items:n,total:o,offset:n.length,hasMore:n.length<o,isLoading:!1},a.cacheSet(this.pageId,this._contextData),this.requestUpdate()}else if(t==="likedsongs"){this._contextData={type:"likedsongs",id:"me",isLoading:!0,name:"Liked Songs",images:[{url:"https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"}],tracks:null},this.requestUpdate();try{let s=await this.api.getTrackFavorites({limit:50,offset:0,sort_result:!1}),r=s?.result?.items||[],n=s?.result?.total??r.length,o=await this.api.getCurrentUserId();this._contextData={...this._contextData,tracks:{items:r,total:n},total:n,offset:r.length,hasMore:r.length<n,isLoading:!1,uri:o?`spotify:user:${o}:collection`:"spotify:user:me:collection"},a.cacheSet(this.pageId,this._contextData)}catch(s){console.error("[ContextView] Liked Songs load failed:",s),this._contextData={...this._contextData,isLoading:!1,hasMore:!1}}this.requestUpdate()}else if(t==="collection"&&e==="playlists"){this._contextData={type:"collection-playlists",id:"library",isLoading:!0,name:"Your Library",items:[],offset:0,total:null,hasMore:!0},this.requestUpdate();try{let s=await this.api.getCurrentUserPlaylists({limit:50}),r=s?.result?.items||[],n=s?.result?.total??r.length;this._contextData={...this._contextData,items:r,total:n,offset:r.length,hasMore:r.length<n,isLoading:!1},a.cacheSet(this.pageId,this._contextData)}catch(s){console.error("[ContextView] Library load failed:",s),this._contextData={...this._contextData,isLoading:!1,hasMore:!1}}this.requestUpdate()}else console.warn("[ContextView] No loader for page type:",t),this._contextData={...this._contextData,isLoading:!1,name:"Page not found"},this.requestUpdate()}catch(s){console.error("Failed to load context data",s)}}async _loadSectionData(t,e,i=null){let r=[],n=null,o="",c=null;try{if(t==="recent"){o="Recently Played";let x=await this.api.fetchSpotifyPlus("get_player_recent_tracks",{limit:50});e===0&&x?.result?.items&&(r=de(x.result.items),n=r.length)}else if(t==="favorites"){o="Your Favorite Playlists";let x=await this.api.fetchSpotifyPlus("get_playlist_favorites",{limit:50,offset:e,...et()});x?.result?.items&&(r=x.result.items,n=x.result.total)}else if(t==="albums"){o="Your Favorite Albums";let x=await this.api.fetchSpotifyPlus("get_album_favorites",{limit:50,offset:e});x?.result?.items&&(r=x.result.items.map(v=>v.album).filter(Boolean),n=x.result.total)}else if(t==="artists"){o="Followed Artists";let x={limit:15,sort_result:!1};i&&(x.after=i);let v=await this.api.fetchSpotifyPlus("get_artists_followed",x);v?.result&&(v.result.items?(r=v.result.items,n=v.result.total):v.result.artists&&v.result.artists.items&&(r=v.result.artists.items,n=v.result.artists.total),r.length>0&&(c=r[r.length-1].id))}let d=e===0?[]:this._contextData.items||[],p=new Set(d.map(x=>x.id)),u=r.filter(x=>!p.has(x.id)),g=[...d,...u],f=n!==null&&g.length>=n,h=r.length>0&&u.length===0,m=!1;f||h?m=!1:t==="artists"?m=c!==null&&r.length>0:m=n===null&&r.length>=50||n!==null&&g.length<n,this._contextData={...this._contextData,isLoading:!1,name:o,items:g,offset:e+r.length,total:n,hasMore:m,_lastFetchCount:r.length,nextCursor:m?c:null},a.cacheSet(this.pageId,this._contextData),this.requestUpdate()}catch(d){console.error("Error loading section data:",d),this._contextData={...this._contextData,isLoading:!1,hasMore:!1},this.requestUpdate()}}async _loadSectionMore(){!this._contextData||this._contextData.isLoading||!this._contextData.hasMore||(this._contextData={...this._contextData,isLoading:!0},this.requestUpdate(),await this._loadSectionData(this._contextData.id,this._contextData.offset,this._contextData.nextCursor))}async _fetchLastFmSimilarArtists(t){let e=this.config?.integrations?.lastfm?.api_key;if(!e||!t)return[];try{let s=`https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${encodeURIComponent(t)}&api_key=${e}&format=json&limit=10`,r=await fetch(s);if(!r.ok)return[];let n=await r.json();if(n?.similarartists?.artist&&Array.isArray(n.similarartists.artist))return n.similarartists.artist.map(o=>({name:o.name}))}catch(i){console.warn("Last.fm fetch failed:",i)}return[]}async _hydrateSimilarArtists(t){let e=t.slice(0,6),i=[];for(let s of e)try{let r=await this.api.fetchSpotifyPlus("search_artists",{criteria:s.name,limit:1});r?.result?.items?.[0]&&i.push(r.result.items[0])}catch{}return i}updateHeaderState(){let t=this.shadowRoot.querySelector("spotify-artist-view")||this.shadowRoot.querySelector("spotify-playlist-view")||this.shadowRoot.querySelector("spotify-context-list")||this.shadowRoot.querySelector("spotify-section-view");t&&typeof t.updateHeaderState=="function"&&t.updateHeaderState()}render(){if(!this._contextData)return l`<div class="scroll-content loading"><div class="loading-spinner"></div></div>`;let t=this._contextData.type;return t==="playlist"||t==="album"||t==="likedsongs"?l`
                <spotify-playlist-view
                    .data=${this._contextData}
                    .api=${this.api}
                    .hass=${this.hass}
                    .config=${this.config}
                    .pinned=${this.pinned}
                    .playingTrackId=${this._playingTrackId}
                    .currentTrackId=${this._currentTrackId}
                    .isPlaying=${this._isPlaying}
                    .pinnedSensorState=${this._pinnedSensorState}
                    @load-more=${this._handleLoadMore}
                    @navigate=${e=>{e.stopPropagation(),this.dispatchEvent(new CustomEvent("navigate",{detail:e.detail,bubbles:!0,composed:!0}))}}
                ></spotify-playlist-view>
            `:t==="artist"?l`
                <spotify-artist-view
                    .data=${this._contextData}
                    .api=${this.api}
                    .hass=${this.hass}
                    .config=${this.config}
                    .pinned=${this.pinned}
                    .playingTrackId=${this._playingTrackId}
                    .currentTrackId=${this._currentTrackId}
                    .isPlaying=${this._isPlaying}
                ></spotify-artist-view>
            `:t==="section"?l`
                <spotify-section-view
                    .data=${this._contextData}
                    .hass=${this.hass}
                    .api=${this.api}
                    @load-more=${this._loadSectionMore}
                ></spotify-section-view>
            `:t==="artist-discography"?l`
                <spotify-context-list 
                    .data=${this._contextData} 
                    .type=${"album"}
                    @load-more=${this._handleLoadMore}
                    @back=${e=>{e.stopPropagation(),this.dispatchEvent(new CustomEvent("back",{bubbles:!0,composed:!0}))}}
                    @navigate=${e=>{e.stopPropagation(),this.dispatchEvent(new CustomEvent("navigate",{detail:e.detail,bubbles:!0,composed:!0}))}}
                ></spotify-context-list>
            `:t==="collection-playlists"?l`
                <spotify-context-list 
                    .data=${this._contextData} 
                    .type=${"playlist"}
                    .layout=${"grid"}
                    @load-more=${this._handleLoadMore}
                    @back=${e=>{e.stopPropagation(),this.dispatchEvent(new CustomEvent("back",{bubbles:!0,composed:!0}))}}
                    @navigate=${e=>{e.stopPropagation(),this.dispatchEvent(new CustomEvent("navigate",{detail:e.detail,bubbles:!0,composed:!0}))}}
                ></spotify-context-list>
            `:l`
            <spotify-playlist-view
                .data=${this._contextData}
                .api=${this.api}
                .hass=${this.hass}
                .playingTrackId=${this._playingTrackId}
                .currentTrackId=${this._currentTrackId}
                .isPlaying=${this._isPlaying}
                .pinnedSensorState=${this._pinnedSensorState}
            ></spotify-playlist-view>
        `}};customElements.define("spotify-context-view",pt);var xs=_`
    :host { display: block; height: 100%; }

    .l-scroll {
        height: 100%; overflow-y: auto; overflow-x: hidden;
        background: var(--spf-bg);
    }

    /* ---- Top bar (mobile owns its own title + search affordance) ---- */
    .l-top {
        position: sticky; top: 0; z-index: 5;
        display: flex; align-items: center; gap: 12px;
        /* Explicit row height: 12 + 40 + 8 = 60px total, exactly the pills'
           sticky offset below — otherwise a seam opens between the two bars. */
        height: 40px;
        padding: calc(var(--spf-safe-top, 0px) + 12px) 16px 8px;
        background: var(--spf-bg);
    }
    .l-title { flex: 1; min-width: 0; font-size: var(--spf-text-xl, 22px); font-weight: 900; color: #fff; }
    .l-icon-btn {
        flex: 0 0 auto; background: none; border: none; color: #fff; cursor: pointer;
        padding: 6px; display: flex; align-items: center; justify-content: center;
    }
    @media (hover: hover) { .l-icon-btn:hover { color: var(--spf-text-sub); } }

    /* ---- Filter pills ---- */
    .pills {
        position: sticky; z-index: 4;
        display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none;
        background: var(--spf-bg);
    }
    .pills::-webkit-scrollbar { display: none; }
    .pill {
        flex: 0 0 auto; border: none; cursor: pointer; white-space: nowrap;
        padding: 8px 16px; border-radius: 999px; font-size: var(--spf-text-base, 13.5px); font-weight: 700;
        background: #232323; color: #fff;
    }
    .pill.active { background: #fff; color: #000; }

    .body { padding-bottom: 120px; }
    .empty { padding: 48px 24px; text-align: center; color: var(--spf-text-sub); }

    /* ---- Rows ---- */
    .row {
        display: grid; grid-template-columns: 56px 1fr auto;
        align-items: center; gap: 14px; padding: 8px 16px; cursor: pointer; min-height: 64px;
    }
    .row-menu-btn {
        background: none; border: none; cursor: pointer; color: var(--spf-text-sub);
        width: 40px; height: 40px; padding: 0;
        display: flex; align-items: center; justify-content: center;
    }
    @media (hover: hover) { .row-menu-btn:hover { color: #fff; } }
    @media (hover: hover) { .row:hover { background: var(--spf-hover-white); } }
    .art {
        width: 56px; height: 56px; border-radius: 4px;
        background-size: cover; background-position: center;
        background-color: var(--spf-bg-card-hover);
    }
    .art.circle { border-radius: 50%; }
    .art.liked {
        background: linear-gradient(135deg, #4a35d6 0%, #8d7bf0 100%);
        display: flex; align-items: center; justify-content: center;
    }
    .art.liked svg { width: 26px; height: 26px; fill: #fff; }
    .info { min-width: 0; }
    .name { color: #fff; font-size: var(--spf-text-md, 15px); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .name.playing { color: var(--spf-brand); }
    .sub {
        display: flex; align-items: center; gap: 5px;
        color: var(--spf-text-sub); font-size: var(--spf-text-base, 13.5px); margin-top: 2px;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .sub .pin { color: var(--spf-brand); flex: 0 0 auto; }

    /* ---- Skeletons ---- */
    .skel { display: grid; grid-template-columns: 56px 1fr; gap: 14px; align-items: center; padding: 8px 16px; min-height: 64px; }
    .skel.skeleton-pulse { background: transparent; }
    .skel .art { background: var(--spf-skeleton-bg); }
    .skel-lines > div { height: 12px; border-radius: 3px; background: var(--spf-skeleton-bg); }
    .skel-lines > div:first-child { width: 60%; margin-bottom: 8px; }
    .skel-lines > div:last-child { width: 35%; }

    /* ================= MOBILE ================= */
    @media (max-width: 768px) {
        .pills { top: calc(var(--spf-safe-top, 0px) + 60px); padding: 6px 16px 12px; }
    }

    /* "+ New" playlist pill: desktop-only — mobile has the l-top icon button. */
    .pill-create { display: none; }

    /* Sort toggle pill — right end of the pills row, same size as the tab pills. */
    .pill-sort {
        margin-left: auto;
        display: inline-flex; align-items: center; gap: 6px;
    }
    .pill-sort svg { color: var(--spf-text-sub); }
    @media (hover: hover) { .pill-sort:hover { color: var(--spf-brand); } }

    .scroll-sentinel { height: 1px; }

    /* ================= DESKTOP ================= */
    @media (min-width: 769px) {
        .l-top { display: none; }
        .pill-create { display: inline-flex; }
        /* Constrain the single-column list to a comfortable centered width so the
           rows don't stretch the full width of the modal with empty space. */
        .body, .pills, .row, .skel, .empty {
            max-width: 760px; margin-left: auto; margin-right: auto;
            box-sizing: border-box;
        }
        .pills { top: 0; justify-content: flex-start; padding: 16px 16px 12px; }
    }
`;var ws=[{type:"playlist",label:"Playlists"},{type:"album",label:"Albums"},{type:"artist",label:"Artists"}],gr=l`<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,at=50,mr=500,ti=class extends b{static get properties(){return{hass:{type:Object},api:{type:Object},config:{type:Object},pinned:{type:Object},_filter:{type:String,state:!0},_recent:{type:Array,state:!0},_playlists:{type:Array,state:!0},_albums:{type:Array,state:!0},_artists:{type:Array,state:!0}}}static get styles(){return[$,xs]}constructor(){super(),this._filter=null,this._recent=null,this._playlists=null,this._albums=null,this._artists=null,this._loading={},this._paging={}}firstUpdated(){this._loadRecent()}updated(){this._observer?.disconnect();let t=this.renderRoot.querySelector(".scroll-sentinel");t&&(this._observer||(this._observer=new IntersectionObserver(e=>{e.some(i=>i.isIntersecting)&&this._filter&&this._loadMore(this._filter)},{root:this.renderRoot.querySelector(".l-scroll"),rootMargin:"300px"})),this._observer.observe(t))}disconnectedCallback(){super.disconnectedCallback(),this._observer?.disconnect(),this._observer=null}async _loadRecent(){if(!(this._recent||this._loading.recent||!this.api)){this._loading.recent=!0;try{let t=y=>y.catch(()=>null),[e,i,s,r]=await Promise.all([this.api.fetchSpotifyPlus("get_player_recent_tracks",{limit:50}),t(this.api.fetchSpotifyPlus("get_album_favorites",{limit:12,sort_result:!1})),t(this.api.fetchSpotifyPlus("get_playlist_favorites",{limit:12,sort_result:!1})),t(this.api.fetchSpotifyPlus("get_artists_followed",{limit:12,sort_result:!1}))]),n=e?.result?.items||[],o=new Set,c=[],d=[],p=[];for(let y of n){if(c.length>=30)break;let w=y.context;if(w?.type==="playlist"&&w.uri){let T=w.uri.split(":").pop();if(!o.has("p"+T)){o.add("p"+T);let ut={type:"playlist",id:T,uri:w.uri,name:null};c.push(ut),d.push(ut)}}else if(y.track?.album?.id){let T=y.track.album;o.has("a"+T.id)||(o.add("a"+T.id),c.push({type:"album",id:T.id,uri:T.uri,name:T.name,images:T.images,artists:y.track.artists}))}let S=y.track?.artists?.[0];if(S?.id&&p.length<8&&!o.has("r"+S.id)&&c.length<30){o.add("r"+S.id);let T={type:"artist",id:S.id,uri:S.uri||`spotify:artist:${S.id}`,name:S.name};c.push(T),p.push(T)}}let u=(i?.result?.items||[]).map(y=>y.album).filter(Boolean),g=s?.result?.items||[],f=r?.result;f?.artists&&(f=f.artists);let h=f?.items||[],m=[{type:"playlist",prefix:"p",items:g},{type:"album",prefix:"a",items:u},{type:"artist",prefix:"r",items:h}],x=0;for(let y=0;x<12;y++){let w=!1;for(let S of m){if(x>=12)break;let T=S.items[y];if(!T?.id)continue;w=!0;let ut=S.prefix+T.id;o.has(ut)||(o.add(ut),c.push({...T,type:S.type}),x++)}if(!w)break}let v=new Map(h.map(y=>[y.id,y]));await Promise.all([...d.map(async y=>{try{let S=(await this.api.fetchSpotifyPlus("get_playlist",{playlist_id:y.id}))?.result;S&&(y.name=S.name,y.images=S.images,y.owner=S.owner,y.uri=S.uri||y.uri)}catch{}}),...p.map(async y=>{let w=v.get(y.id);if(w?.images?.length){y.images=w.images;return}try{let S=await this.api.fetchSpotifyPlus("get_artist",{artist_id:y.id});S?.result?.images&&(y.images=S.result.images)}catch{}})]),this._recent=c.filter(y=>y.type!=="playlist"||y.name)}catch(t){console.error("[Library] Recent load failed",t),this._recent=[]}finally{this._loading.recent=!1}}}_bucketKey(t){return t==="playlist"?"_playlists":t==="album"?"_albums":"_artists"}async _fetchPage(t,e){if(t==="playlist")return{items:(await this.api.fetchSpotifyPlus("get_playlist_favorites",e))?.result?.items||[]};if(t==="album")return{items:((await this.api.fetchSpotifyPlus("get_album_favorites",e))?.result?.items||[]).map(d=>d.album).filter(Boolean)};let{offset:i,...s}=e,n=(await this.api.fetchSpotifyPlus("get_artists_followed",s))?.result;n?.artists&&(n=n.artists);let o=n?.items||[];return{items:o,after:n?.cursors?.after||o[o.length-1]?.id||null}}async _loadBucket(t){let e=this._bucketKey(t);if(this[e]||this._loading[t]||!this.api)return;this._loading[t]=!0;let i=this._paging[t]={offset:0,after:null,hasMore:!1,visible:at};try{if(G(t)==="alpha"){let s=await this._fetchPage(t,{limit_total:mr,sort_result:!0});this[e]=s.items}else{let s=await this._fetchPage(t,{limit:at,offset:0,sort_result:!1});this[e]=s.items,i.offset=s.items.length,i.after=s.after||null,i.hasMore=s.items.length>=at}}catch(s){console.error(`[Library] ${t} load failed`,s),this[e]=[]}finally{this._loading[t]=!1,this.requestUpdate()}}async _loadMore(t){let e=this._bucketKey(t),i=this._paging[t],s=this[e];if(!(!i||!s||this._loading[t])){if(G(t)==="alpha"){i.visible<s.length&&(i.visible+=at,this.requestUpdate());return}if(i.hasMore){this._loading[t]=!0,this.requestUpdate();try{let r=t==="artist"?{limit:at,after:i.after,sort_result:!1}:{limit:at,offset:i.offset,sort_result:!1},n=await this._fetchPage(t,r);this[e]=s.concat(n.items),i.offset+=n.items.length,i.after=n.after||null,i.hasMore=n.items.length>=at}catch(r){console.error(`[Library] ${t} page load failed`,r),i.hasMore=!1}finally{this._loading[t]=!1,this.requestUpdate()}}}}_setFilter(t){this._filter=t,t&&this._loadBucket(t)}refresh(){this._playlists=null,this._recent=null,delete this._paging.playlist,this._filter?this._loadBucket(this._filter):this._loadRecent()}_createPlaylist(){this.dispatchEvent(new CustomEvent("open-playlist-dialog",{detail:{mode:"create"},bubbles:!0,composed:!0}))}_toggleSort(){let t=this._filter;t&&(ze(t,G(t)==="alpha"?"recents":"alpha"),this[this._bucketKey(t)]=null,delete this._paging[t],this._loadBucket(t),this.requestUpdate())}_isPlaying(t){return t?lt(this.hass,this.config?.entity,t):!1}_navigate(t,e){this.dispatchEvent(new CustomEvent("navigate",{detail:{pageId:`${t}:${e.id}`,data:{title:e.name,type:t,subtitle:t==="artist"?"Artist":""}},bubbles:!0,composed:!0}))}_navigateLiked(){this.dispatchEvent(new CustomEvent("navigate",{detail:{pageId:"likedsongs"},bubbles:!0,composed:!0}))}_openSearch(){this.dispatchEvent(new CustomEvent("navigate",{detail:{pageId:"search"},bubbles:!0,composed:!0}))}render(){return l`
            <div class="l-scroll">
                <div class="l-top">
                    <div class="l-title">Your Library</div>
                    <button class="l-icon-btn" @click=${this._openSearch} aria-label="Search">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                    </button>
                    <button class="l-icon-btn" @click=${this._createPlaylist} aria-label="Create playlist" title="Create playlist">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
                    </button>
                </div>

                <div class="pills">
                    ${ws.map(t=>l`
                        <button class="pill ${this._filter===t.type?"active":""}"
                                @click=${()=>this._setFilter(this._filter===t.type?null:t.type)}>${t.label}</button>`)}
                    <button class="pill pill-create" @click=${this._createPlaylist} title="Create playlist">+ New</button>
                    ${this._filter?l`
                        <button class="pill pill-sort" @click=${this._toggleSort} title="Change sort order">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4v14m0 0l-3-3m3 3l3-3M17 20V6m0 0l-3 3m3-3l3 3"/></svg>
                            ${G(this._filter)==="alpha"?"A\u2013Z":"Recents"}
                        </button>`:""}
                </div>

                <div class="body">${this._renderBody()}</div>
            </div>
        `}_renderBody(){return this._filter?this._renderBucket(this._filter):l`
            ${this._renderLikedRow()}
            ${this._recent===null?this._renderSkeletons(5):this._recent.map(t=>this._renderRow(t,t.type))}
        `}_renderBucket(t){let e=this[this._bucketKey(t)];if(e===null)return this._renderSkeletons(8);if(!e.length){let o=ws.find(c=>c.type===t)?.label.toLowerCase()||"items";return l`<div class="empty">No ${o} yet.</div>`}let i=this._paging[t],s=G(t)==="alpha",r=s&&i?e.slice(0,i.visible):e,n=s?r.length<e.length:!!i?.hasMore;return l`
            ${r.map(o=>this._renderRow(o,t))}
            ${this._loading[t]?this._renderSkeletons(2):""}
            ${n&&!this._loading[t]?l`<div class="scroll-sentinel"></div>`:""}
        `}_renderLikedRow(){return l`
            <div class="row" @click=${this._navigateLiked}>
                <div class="art liked">${gr}</div>
                <div class="info">
                    <div class="name">Liked Songs</div>
                    <div class="sub">
                        <svg class="pin" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z"/></svg>
                        Playlist
                    </div>
                </div>
            </div>
        `}_renderRow(t,e){let i=M(t,e),s=e==="artist",r;if(s)r="Artist";else if(e==="playlist")r=`Playlist \u2022 ${t.owner?.display_name||t.owner?.name||"Spotify"}`;else{let o=(t.artists||[]).map(c=>c.name).join(", ");r=`Album${o?" \u2022 "+o:""}`}let n=this._isPlaying(t.uri);return l`
            <div class="row" @click=${()=>this._navigate(e,t)}>
                <div class="art ${s?"circle":""} ${i?"":"art-fallback"}" style="${i?`background-image: url('${i}')`:""}"></div>
                <div class="info">
                    <div class="name ${n?"playing":""}">${t.name||""}</div>
                    <div class="sub">${r}</div>
                </div>
                ${s?"":l`
                    <button class="row-menu-btn" aria-label="More options"
                            @click=${o=>this._openRowMenu(o,t,e)}>${H}</button>`}
            </div>
        `}async _openRowMenu(t,e,i){t.stopPropagation();let s=t.currentTarget.getBoundingClientRect(),r=[],n={};if(i==="playlist"){let o=!!(this.pinned?.canEdit()&&this.pinned.sensorEntity),[c,d]=await Promise.all([this.api.getCurrentUserId().catch(()=>null),o?this.pinned.getItems().catch(()=>[]):Promise.resolve([])]);if(o){let p=!!d.find(u=>u.id===e.id);r.push({id:"lm-pin",label:p?"Unpin from Home":"Pin to Home",icon:"pin"}),n["lm-pin"]=()=>this._togglePinItem(e)}c&&e.owner?.id===c&&(r.push({id:"lm-edit",label:"Edit Playlist",icon:"pencil"}),n["lm-edit"]=()=>this.dispatchEvent(new CustomEvent("navigate",{detail:{pageId:`playlist:${e.id}`,data:{title:e.name,type:"playlist",autoEdit:!0}},bubbles:!0,composed:!0})),r.push({id:"lm-delete",label:"Delete Playlist",icon:"trash",danger:!0}),n["lm-delete"]=()=>this._confirmDeletePlaylist(e))}else if(i==="album"){let o=(e.artists||[]).find(c=>c.id);o&&(r.push({id:"lm-artist",label:"Go to Artist",icon:"artist"}),n["lm-artist"]=()=>this.dispatchEvent(new CustomEvent("navigate",{detail:{pageId:`artist:${o.id}`,data:{title:o.name,type:"artist",subtitle:"Artist"}},bubbles:!0,composed:!0})))}r.length&&this.dispatchEvent(new CustomEvent("open-context-menu",{detail:{header:{image:M(e,i),name:e.name,subtitle:i==="playlist"?"Playlist":"Album"},items:r,anchor:s,onAction:o=>n[o]?.()},bubbles:!0,composed:!0}))}async _togglePinItem(t){let e=await this.pinned.toggle({id:t.id,type:"playlist",name:t.name,images:t.images,uri:t.uri,description:t.description});e.success?this.dispatchEvent(new CustomEvent("pinned-changed",{bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("show-alert",{detail:{title:"Pinning Failed",message:e.error||"Unknown error",confirmText:"OK",size:"mini"},bubbles:!0,composed:!0}))}_confirmDeletePlaylist(t){this.dispatchEvent(new CustomEvent("show-alert",{detail:{title:"Delete playlist?",message:`"${t.name}" will be removed from Your Library.`,confirmText:"Delete",cancelText:"Cancel",onConfirm:async()=>{if(!(await this.api.unfollowPlaylist(t.id))?.success){this.dispatchEvent(new CustomEvent("show-toast",{detail:{message:"Couldn't delete playlist"},bubbles:!0,composed:!0}));return}this.dispatchEvent(new CustomEvent("playlist-changed",{detail:{playlistId:t.id,action:"delete"},bubbles:!0,composed:!0}))}},bubbles:!0,composed:!0}))}_renderSkeletons(t){return l`${Array(t).fill(0).map(()=>l`
            <div class="skel skeleton-pulse"><div class="art"></div><div class="skel-lines"><div></div><div></div></div></div>`)}`}};customElements.define("spotify-library",ti);var ks=_`
    :host {
        /* OVERRIDE shared-styles 0x0 */
        display: block;
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        z-index: 230000; /* Ensure container (Alerts/Toasts) is on top of Manager (212000) */
        pointer-events: none; /* Let clicks pass through empty areas */
    }

    /* --- Device Popup --- */
    .device-popup-backdrop {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
        z-index: 200; 
        display: none; align-items: center; justify-content: center;
        opacity: 0; pointer-events: none; transition: opacity 0.3s;
    }
    .device-popup-backdrop.visible { opacity: 1; pointer-events: auto; display: flex; }
    
    .device-popup-content {
        background: var(--spf-bg); width: 90%; max-width: 400px;
        border-radius: 16px; padding: 24px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.8);
        display: flex; flex-direction: column; gap: 16px;
    }
    .device-popup-title { margin: 0; font-size: var(--spf-text-lg, 17px); font-weight: 700; text-align: center; color: var(--spf-text-main); }
    .device-list { max-height: 300px; overflow-y: auto; }
    
    .device-row {
        display: flex; align-items: center; gap: 12px;
        padding: 12px; border-radius: 8px; cursor: pointer;
        transition: background 0.2s; color: var(--spf-text-sub);
    }
    @media (hover: hover) { .device-row:hover { background: var(--spf-hover-white); color: var(--spf-text-main); } }
    .device-row:active { background: var(--spf-active-white); color: var(--spf-text-main); }
    .device-row.active { color: var(--spf-brand); }
    
    .device-icon { width: 24px; height: 24px; }
    .device-info { flex: 1; }
    .device-name { font-weight: 700; font-size: var(--spf-text-base, 13.5px); display:flex; align-items:center; gap:6px; }
    .device-type { font-size: var(--spf-text-sm, 12px); opacity: 0.7; text-transform: capitalize; }
    .device-active-icon { display: flex; }
    .device-default-badge { color: var(--spf-brand); font-size: var(--spf-text-xs, 11px); border: 1px solid var(--spf-brand); border-radius: 4px; padding: 0 4px; margin-left: 6px; }
    .device-close-btn { background: transparent; border: none; color: var(--spf-text-main); font-weight: 700; padding: 12px; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; align-self: center; }
    
    .device-empty-state {
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        padding: 32px 0; color: var(--spf-text-sub); text-align: center;
    }
    .device-empty-state svg { margin-bottom: 12px; opacity: 0.5; }
    
    .device-refresh-btn {
        margin-top: 16px; background: transparent; 
        border: 1px solid var(--spf-border);
        color: var(--spf-text-main); padding: 8px 20px; 
        border-radius: 20px; cursor: pointer; 
        font-size: var(--spf-text-sm, 12px); font-weight: 700; 
        text-transform: uppercase; letter-spacing: 1px;
        transition: all 0.2s;
    }
    .device-refresh-btn:hover { border-color: var(--spf-text-main); background: var(--spf-hover-white); }
    
    /* --- Dropdown Menu --- */
    .dropdown-menu {
        position: absolute; top: 60px; right: 60px;
        background: var(--spf-bg-card-hover); border-radius: 8px;
        width: 180px; box-shadow: 0 8px 24px rgba(0,0,0,0.5);
        display: none; flex-direction: column; z-index: 30;
    }
    .dropdown-menu.visible { display: flex; }
    
    .menu-item { padding: 12px 16px; cursor: pointer; font-size: var(--spf-text-base, 13.5px); color: var(--spf-text-main); transition: background 0.2s; }
    @media (hover: hover) { .menu-item:hover { background: var(--spf-hover-white); } }
    .menu-item:active { background: var(--spf-active-white); }
    .menu-item:first-child { border-radius: 8px 8px 0 0; }
    .menu-item:last-child { border-radius: 0 0 8px 8px; }

    /* --- Reusable Alert Modal --- */
    .alert-content {
        background: var(--spf-bg-card); border: 1px solid var(--spf-border);
        border-radius: 12px; width: 85%; max-width: 320px;
        padding: 24px; text-align: center;
        box-shadow: 0 12px 40px rgba(0,0,0,0.8);
        transform: scale(0.9); transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .alert-content.mini { max-width: 260px; padding: 20px; }
    .alert-content.medium { max-width: 320px; }
    .alert-content.large { max-width: 480px; }
    .popup-backdrop.visible .alert-content { transform: scale(1); }

    .alert-title { font-size: var(--spf-text-lg, 17px); font-weight: 700; color: var(--spf-text-main); margin-bottom: 8px; }
    .alert-message { font-size: var(--spf-text-base, 13.5px); color: var(--spf-text-sub); line-height: 1.5; margin-bottom: 24px; }

    .alert-btn {
        background: transparent; border: 1px solid var(--spf-border);
        color: var(--spf-text-main); padding: 12px; border-radius: 24px;
        font-size: var(--spf-text-base, 13.5px); font-weight: 700; cursor: pointer;
        text-transform: uppercase; letter-spacing: 1px;
        transition: background 0.2s;
    }
    .alert-btn:hover { background: var(--spf-hover-white); }
    .alert-btn.primary { background: var(--spf-brand); border-color: var(--spf-brand); color: black; }
    .alert-btn.primary:hover { background: var(--spf-brand-hover); }

    /* The device picker is a bottom sheet inside this host (z 215000); keep
       "Scanning for devices..." toasts visible above it. */
    .toast-container { z-index: 220000; }
`;var ei=class extends b{static get properties(){return{devices:{type:Array},config:{type:Object},deviceVisible:{type:Boolean},canManageDevices:{type:Boolean},showRevealButton:{type:Boolean},blur:{type:Boolean},_toasts:{type:Array},_alert:{type:Object}}}static get styles(){return[$,ks]}constructor(){super(),this.devices=[],this.config={},this.deviceVisible=!1,this.canManageDevices=!1,this.showRevealButton=!1,this.blur=!0,this._toasts=[],this._alert=null}showToast(t,e=3e3){let i=Date.now();this._toasts=[...this._toasts,{id:i,message:t,hiding:!1}],this.requestUpdate(),setTimeout(()=>this._hideToast(i),e)}showAlert(t,e,i,s="OK",r="Cancel",n="medium"){this._alert={title:t,message:e,onConfirm:i,confirmText:s,cancelText:r,size:n},this.requestUpdate()}_hideToast(t){let e=this._toasts.findIndex(i=>i.id===t);e>-1&&(this._toasts[e].hiding=!0,this.requestUpdate(),setTimeout(()=>{this._toasts=this._toasts.filter(i=>i.id!==t),this.requestUpdate()},300))}_closeAlert(){this._alert=null,this.requestUpdate()}_confirmAlert(){this._alert&&this._alert.onConfirm&&this._alert.onConfirm(),this._closeAlert()}render(){return l`
            <div @click=${t=>{t.target.classList.contains("popup-backdrop")&&this.dispatchEvent(new CustomEvent("close-popups"))}}>
                ${this.renderDevicePopup()}
                ${this.renderAlert()}
                ${this.renderToasts()}
            </div>
        `}_renderBackdrop(t,e){return l`
            <div class="popup-backdrop ${t?"visible":""} ${this.blur?"":"no-blur"}">
                ${e}
            </div>
        `}renderDevicePopup(){return l`
            <spotify-popup-devices
                .devices=${this.devices}
                .config=${this.config}
                .readonly=${!this.canManageDevices}
                .showRevealButton=${this.showRevealButton}
                .visible=${this.deviceVisible}
                @close-popups=${t=>{t.stopPropagation(),this.dispatchEvent(new CustomEvent("close-popups"))}}
            ></spotify-popup-devices>
        `}renderAlert(){if(!this._alert)return"";let t=l`
            <div class="popup-content alert-dialog alert-content ${this._alert.size||"medium"}">
                <h3 class="popup-title alert-title">${this._alert.title}</h3>
                <div class="alert-message">${this._alert.message}</div>
                <div class="alert-buttons">
                    ${this._alert.cancelText?l`<button class="alert-btn" @click=${this._closeAlert}>${this._alert.cancelText}</button>`:""}
                    <button class="alert-btn primary" @click=${this._confirmAlert}>${this._alert.confirmText}</button>
                </div>
            </div>
        `;return this._renderBackdrop(!0,t)}renderToasts(){return this._toasts.length===0?"":l`
            <div class="toast-container">
                ${this._toasts.map(t=>l`
                    <div class="toast-message ${t.hiding?"hiding":""}">${t.message}</div>
                `)}
            </div>
        `}};customElements.define("spotify-popups",ei);var ii=class extends b{static get properties(){return{items:{type:Array},visible:{type:Boolean},allowBlur:{type:Boolean},_draggedItemIndex:{type:Number,state:!0},_dropTargetIndex:{type:Number,state:!0},_dropPosition:{type:String,state:!0},_confirmDeleteId:{type:String,state:!0},_showResetConfirm:{type:Boolean,state:!0},_showUriInput:{type:Boolean,state:!0},_uriInputValue:{type:String,state:!0}}}static get styles(){return[$,_`
                :host {
                    display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 200000;
                    pointer-events: none;
                    font-family: var(--spf-font-family, sans-serif);
                }

                /* Backdrop & Container */
                .dialog-backdrop {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.2s ease;
                }
                
                .dialog-backdrop.visible {
                    opacity: 1;
                    pointer-events: auto;
                }

                .dialog-backdrop.blur {
                    background: rgba(0, 0, 0, 0.7);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                }

                .dialog-content {
                    background: var(--spf-bg-alt, #181818);
                    border-radius: 12px;
                    width: 90%;
                    max-width: 500px;
                    max-height: 80vh;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 25px 60px rgba(0,0,0,0.8);
                    border: 1px solid rgba(255,255,255,0.1);
                    position: relative;
                    overflow: hidden;
                }

                /* Header */
                .dialog-header {
                    padding: 20px;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .dialog-title {
                    margin: 0;
                    font-size: var(--spf-text-lg, 17px);
                    font-weight: bold;
                    color: #fff;
                }

                /* Body & List */
                .dialog-body {
                    flex: 1;
                    overflow-y: auto;
                    padding: 10px 0;
                    -webkit-overflow-scrolling: touch;
                }

                .reorder-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    position: relative;
                }

                .reorder-item {
                    display: flex;
                    align-items: center;
                    padding: 10px 16px;
                    background: transparent;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    cursor: grab;
                    user-select: none;
                    touch-action: none; 
                    position: relative;
                    transition: background 0.2s;
                    z-index: 1;
                }

                /* Liked Songs row: locked at the top, not draggable. */
                .reorder-item.locked { cursor: default; }
                .reorder-item.locked .handle { opacity: 0.45; }

                /* GHOST & FLOAT LOGIC */
                .reorder-item.dragging {
                    z-index: 100;
                    background: #282828 !important;
                    transform: scale(1.05);
                    box-shadow: 0 15px 40px rgba(0,0,0,0.7);
                    cursor: grabbing;
                    border-radius: 8px;
                    border-bottom: none;
                }

                .reorder-item.ghost {
                    opacity: 0.2;
                    background: rgba(255, 255, 255, 0.05);
                }

                /* Drop Indicators */
                .reorder-item.drop-before::before {
                    content: '';
                    position: absolute;
                    top: -1px; left: 0; right: 0;
                    height: 3px;
                    background: var(--spf-brand, #1DB954);
                    z-index: 10;
                }
                
                .reorder-item.drop-after::after {
                    content: '';
                    position: absolute;
                    bottom: -1px; left: 0; right: 0;
                    height: 3px;
                    background: var(--spf-brand, #1DB954);
                    z-index: 10;
                }

                /* Item Content */
                .handle { color: #b3b3b3; margin-right: 12px; display: flex; }
                .item-thumb {
                    width: 44px; height: 44px;
                    border-radius: 4px;
                    background-size: cover;
                    background-position: center;
                    margin-right: 12px;
                    background-color: #282828;
                    flex-shrink: 0;
                }
                .item-info { flex: 1; min-width: 0; }
                .item-title { font-size: var(--spf-text-md, 15px); color: #fff; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .item-subtitle { font-size: var(--spf-text-sm, 12px); color: #b3b3b3; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

                /* Action Buttons */
                .action-btn {
                    background: none; border: none; color: #b3b3b3;
                    cursor: pointer; padding: 8px; border-radius: 50%;
                    transition: 0.2s;
                    display: flex;
                }
                .action-btn:hover { color: #fff; background: rgba(255,255,255,0.1); }
                .action-btn.delete:hover { color: #e91e63; background: rgba(233, 30, 99, 0.1); }

                /* Footer */
                .dialog-footer {
                    padding: 16px 20px;
                    border-top: 1px solid rgba(255,255,255,0.1);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .btn-base {
                    border: none;
                    padding: 10px 24px;
                    border-radius: 24px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: transform 0.1s, background 0.2s;
                }

                .library-toggle-btn {
                    background: transparent;
                    color: #fff;
                    border: 1px solid rgba(255,255,255,0.3);
                }

                .library-toggle-btn.active {
                    background: var(--spf-brand, #1DB954);
                    border-color: var(--spf-brand, #1DB954);
                    color: #000;
                }

                .close-btn { background: #fff; color: #000; }
                .close-btn:hover { transform: scale(1.04); }

                .alert-btn:hover { background: var(--spf-hover-white, rgba(255,255,255,0.1)); }
                .alert-btn.primary { background: var(--spf-brand, #1DB954); border-color: var(--spf-brand, #1DB954); color: black; }
                .alert-btn.primary:hover { background: var(--spf-brand-hover, #1ed760); }
                .alert-btn.danger { background: transparent; border-color: #e91e63; color: #e91e63; }
                .alert-btn.danger:hover { background: rgba(233, 30, 99, 0.1); }
            `]}constructor(){super(),this.items=[],this.visible=!1,this._draggedItemIndex=null,this._dropTargetIndex=null,this._cachedRects=[]}_handlePointerDown(t,e){if(t.button!==0&&t.pointerType==="mouse"||t.target.closest("button")||this.items[e]?.fixed||this.items[e]?.id==="user-library")return;t.currentTarget.setPointerCapture(t.pointerId),this._draggedItemIndex=e;let s=this.shadowRoot.querySelector(".reorder-list"),r=Array.from(s.querySelectorAll(".reorder-item"));this._cachedRects=r.map((n,o)=>{let c=n.getBoundingClientRect();return{index:o,top:c.top,bottom:c.bottom,midpoint:c.top+c.height/2}})}_handlePointerMove(t){if(this._draggedItemIndex===null)return;let e=t.clientY,i=null,s=null;for(let r of this._cachedRects)if(e>=r.top&&e<=r.bottom){i=r.index,s=e<r.midpoint?"before":"after";break}(this._dropTargetIndex!==i||this._dropPosition!==s)&&(this._dropTargetIndex=i,this._dropPosition=s)}_handlePointerUp(t){this._draggedItemIndex!==null&&(this._dropTargetIndex!==null&&this._draggedItemIndex!==this._dropTargetIndex&&this._reorderItems(this._draggedItemIndex,this._dropTargetIndex,this._dropPosition),this._resetDragState(t))}_resetDragState(t){this._draggedItemIndex=null,this._dropTargetIndex=null,this._dropPosition=null,this._cachedRects=[],t?.target&&t.target.releasePointerCapture(t.pointerId)}_reorderItems(t,e,i){let s=[...this.items],[r]=s.splice(t,1),n=i==="after"?e+1:e;t<n&&n--;let o=0;for(;o<s.length&&(s[o]?.fixed||s[o]?.id==="user-library");)o++;n<o&&(n=o),s.splice(n,0,r),this.items=s,this._dispatchUpdate()}_handleAddUri(){this._uriInputValue&&(this.dispatchEvent(new CustomEvent("add-custom-uri",{detail:this._uriInputValue})),this._showUriInput=!1,this._uriInputValue="")}_requestDelete(t,e){e&&(e.stopPropagation(),e.preventDefault()),this.dispatchEvent(new CustomEvent("show-alert",{detail:{title:"Remove item?",message:"This will remove the item from your pinned list.",confirmText:"Delete",cancelText:"Cancel",size:"mini",onConfirm:()=>this.dispatchEvent(new CustomEvent("delete-item",{detail:t}))},bubbles:!0,composed:!0}))}_confirmReset(){this.dispatchEvent(new CustomEvent("show-alert",{detail:{title:"Reset Everything?",message:"This will remove ALL pinned items and restore the default state.",confirmText:"Reset",cancelText:"Cancel",size:"medium",onConfirm:()=>this.dispatchEvent(new CustomEvent("reset-pinned-items"))},bubbles:!0,composed:!0}))}_dispatchUpdate(){this.dispatchEvent(new CustomEvent("reorder",{detail:this.items}))}_close(){this.dispatchEvent(new CustomEvent("close"))}render(){return l`
            <div class="dialog-backdrop ${this.visible?"visible":""} ${this.allowBlur?"blur":""}"
                 @click=${t=>{t.target===t.currentTarget&&this._close()}}>
                
                <div class="dialog-content">
                    <div class="dialog-header">
                        <h2 class="dialog-title">Reorder Pinned Items</h2>
                        <button class="action-btn" @click=${this._close}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                        </button>
                    </div>

                    <div class="dialog-body">
                        ${this.items.length===0?l`<div style="text-align:center; padding:40px; color:#b3b3b3;">No pinned items found.</div>`:l`
                                <ul class="reorder-list" 
                                    @pointermove=${this._handlePointerMove} 
                                    @pointerup=${this._handlePointerUp}
                                    @pointercancel=${this._handlePointerUp}>
                                    ${this.items.map((t,e)=>{let i=!!t.fixed||t.id==="user-library",s=t.id==="user-library"?"Always pinned":"Pinned in card config";return l`
                                        <li class="reorder-item ${i?"locked":""}
                                            ${this._draggedItemIndex===e?"dragging ghost":""}
                                            ${this._dropTargetIndex===e&&this._dropPosition==="before"?"drop-before":""}
                                            ${this._dropTargetIndex===e&&this._dropPosition==="after"?"drop-after":""}"
                                            @pointerdown=${r=>this._handlePointerDown(r,e)}
                                        >
                                            <div class="handle">
                                                ${i?l`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10z"/></svg>`:l`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>`}
                                            </div>
                                            <div class="item-thumb" style="background-image: url('${t.image||""}')"></div>
                                            <div class="item-info">
                                                <div class="item-title">${t.title||t.name||"(Untitled Item)"}</div>
                                                <div class="item-subtitle">${i?s:t.subtitle||""}</div>
                                            </div>
                                            <div style="display:flex; align-items:center;">
                                                ${i?"":l`
                                                    <button class="action-btn delete" @click=${r=>this._requestDelete(t.id,r)} title="Remove">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                                                    </button>
                                                `}
                                            </div>
                                        </li>
                                    `})}
                                </ul>
                            `}
                    </div>

                    <div class="dialog-footer">
                        ${this._showUriInput?l`
                            <div style="display:flex; width:100%; gap:8px;">
                                <input type="text" placeholder="Spotify URI (spotify:type:id)" 
                                    style="flex:1; background:rgba(255,255,255,0.1); border:none; border-radius:4px; padding:0 12px; color:#fff; height:40px;"
                                    .value=${this._uriInputValue||""}
                                    @input=${t=>this._uriInputValue=t.target.value}
                                    @keydown=${t=>t.key==="Enter"&&this._handleAddUri()}
                                >
                                <button class="btn-base" style="background:var(--spf-brand); color:#000; padding:0 16px;" @click=${this._handleAddUri}>Add</button>
                                <button class="btn-base" style="background:transparent; color:#fff; padding:0 16px;" @click=${()=>this._showUriInput=!1}>Cancel</button>
                            </div>
                        `:l`
                            <div style="display:flex; gap:8px;">
                                <button class="btn-base library-toggle-btn" @click=${()=>this._showUriInput=!0}>
                                    + Add Item
                                </button>
                                <button class="btn-base library-toggle-btn" style="border-color: #ffffff;" @click=${this._confirmReset}>
                                    Reset
                                </button>
                            </div>
                            <button class="btn-base close-btn" @click=${this._close}>Done</button>
                        `}
                    </div>
                </div>
            </div>
        `}};customElements.define("spotify-reorder-dialog",ii);var si=class a extends b{static DEDUPE_CHECK_CAP=500;static get properties(){return{visible:{type:Boolean,reflect:!0},api:{type:Object},track:{type:Object},_playlists:{type:Array,state:!0},_loading:{type:Boolean,state:!0},_busy:{type:Boolean,state:!0},_filter:{type:String,state:!0},_selected:{type:Object,state:!0},_likedSelected:{type:Boolean,state:!0}}}static get styles(){return[Ct,_`
            :host {
                display: contents;
                --spf-sheet-max-h: 96%;
            }

            .hdr {
                position: relative; flex-shrink: 0;
                display: flex; align-items: center; justify-content: center;
                padding: 2px 0 14px;
            }
            .hdr-cancel {
                position: absolute; left: 0;
                background: transparent; border: none; cursor: pointer;
                color: var(--spf-text-main, #fff);
                font-size: var(--spf-text-md, 15px); font-weight: 700; font-family: inherit;
                padding: 6px 4px;
            }
            .hdr-title { font-size: var(--spf-text-lg, 17px); font-weight: 900; color: var(--spf-text-main, #fff); }

            .newpl-row { display: flex; justify-content: center; flex-shrink: 0; margin: 2px 0 18px; }
            .newpl {
                background: #fff; color: #000;
                border: none; border-radius: 999px;
                font-size: var(--spf-text-md, 15px); font-weight: 700; font-family: inherit;
                padding: 13px 30px; cursor: pointer;
                transition: transform 0.15s ease;
            }
            .newpl:active { transform: scale(0.97); }

            .search {
                flex-shrink: 0;
                display: flex; align-items: center; gap: 10px;
                background: var(--spf-bg-card-hover, #2a2a2a);
                border-radius: 8px;
                padding: 11px 12px;
                margin-bottom: 14px;
            }
            .search svg { width: 18px; height: 18px; flex-shrink: 0; stroke: var(--spf-text-sub, #b3b3b3); }
            .search input {
                flex: 1; min-width: 0;
                background: transparent; border: none; outline: none;
                color: var(--spf-text-main, #fff);
                font-size: var(--spf-text-md, 15px); font-family: inherit;
            }
            .search input::placeholder { color: var(--spf-text-sub, #b3b3b3); }

            .list-label {
                flex-shrink: 0;
                display: flex; align-items: center; gap: 8px;
                background: none; border: none; cursor: pointer;
                font-size: var(--spf-text-base, 13.5px); font-weight: 700; font-family: inherit;
                color: var(--spf-text-main, #fff);
                padding: 2px 0 8px;
            }
            .list-label svg { color: var(--spf-text-sub, #b3b3b3); flex-shrink: 0; }

            .list {
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
                flex: 1; min-height: 0;
                padding-bottom: 96px; /* keep last rows clear of the Done pill */
            }
            .row {
                display: flex; align-items: center; gap: 14px;
                padding: 9px 2px;
                cursor: pointer;
                border-radius: 6px;
            }
            .row:hover { background: var(--spf-hover-white, rgba(255,255,255,0.08)); }
            .row.busy { opacity: 0.5; pointer-events: none; }
            .art {
                width: 52px; height: 52px; border-radius: 4px; flex-shrink: 0;
                background-size: cover; background-position: center;
                background-color: #333;
                display: flex; align-items: center; justify-content: center;
            }
            .art.liked { background: linear-gradient(135deg, #4733f0, #8fb5f5); }
            .art.liked svg { width: 22px; height: 22px; fill: #fff; }
            .row-text { min-width: 0; flex: 1; }
            .row-name {
                font-size: var(--spf-text-md, 15px); font-weight: 700; color: var(--spf-text-main, #fff);
                white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            }
            .row-sub { font-size: var(--spf-text-base, 13.5px); color: var(--spf-text-sub, #b3b3b3); margin-top: 2px; }

            .sel {
                flex-shrink: 0;
                width: 26px; height: 26px; border-radius: 50%;
                border: 1.5px solid var(--spf-text-sub, #b3b3b3);
                box-sizing: border-box;
                display: flex; align-items: center; justify-content: center;
            }
            .row.selected .sel {
                background: var(--spf-brand, #1ed760);
                border-color: var(--spf-brand, #1ed760);
            }
            .sel svg { width: 15px; height: 15px; fill: #000; display: none; }
            .row.selected .sel svg { display: block; }

            .empty, .loading-row {
                text-align: center; color: var(--spf-text-sub, #b3b3b3);
                padding: 28px 0; font-size: var(--spf-text-base, 13.5px);
            }

            /* Floating Done pill (absolute against the sheet panel). */
            .done-wrap {
                position: absolute;
                left: 0; right: 0;
                bottom: calc(22px + var(--spf-safe-bottom, 0px));
                display: flex; justify-content: center;
                pointer-events: none;
            }
            .done-btn {
                pointer-events: auto;
                background: var(--spf-brand, #1ed760); color: #000;
                border: none; border-radius: 999px;
                font-size: var(--spf-text-md, 15px); font-weight: 700; font-family: inherit;
                padding: 14px 44px; cursor: pointer;
                box-shadow: 0 8px 24px rgba(0,0,0,0.5);
                transition: transform 0.15s ease, opacity 0.15s ease;
            }
            .done-btn:active { transform: scale(0.97); }
            .done-btn:disabled { opacity: 0.4; cursor: default; }

            /* Popup variant (tablet/desktop): keep the dialog comfortably tall
               even with only a couple of playlists. */
            @media (min-width: 769px) {
                .list { min-height: 320px; }
            }
        `]}constructor(){super(),this.visible=!1,this.api=null,this.track=null,this._playlists=[],this._loading=!1,this._busy=!1,this._filter="",this._selected=new Set,this._likedSelected=!1,this._likedInitial=!1,this._likedKnown=!1}updated(t){t.has("visible")&&this.visible&&(this._busy=!1,this._filter="",this._selected=new Set,this._likedSelected=!1,this._likedInitial=!1,this._likedKnown=!1,this._loadPlaylists(),this._loadLikedState())}async _loadPlaylists(){if(this.api){this._loading=!0;try{this._playlists=await this.api.getCurrentUserOwnedPlaylists()}catch(t){console.warn("[PlaylistPicker] load failed:",t),this._playlists=[]}finally{this._loading=!1}}}async _loadLikedState(){let t=this.track?.id;if(!(!t||!this.api))try{let e=await this.api.checkTrackFavorites(t);typeof e=="boolean"&&(this._likedInitial=e,this._likedSelected=e,this._likedKnown=!0,this.requestUpdate())}catch{}}_close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}_toast(t){this.dispatchEvent(new CustomEvent("show-toast",{detail:{message:t},bubbles:!0,composed:!0}))}_dispatchChanged(t){this.dispatchEvent(new CustomEvent("playlist-changed",{detail:{playlistId:t,action:"items"},bubbles:!0,composed:!0}))}_newPlaylist(){k("light"),this.dispatchEvent(new CustomEvent("open-playlist-dialog",{detail:{mode:"create",pendingTrackUri:this.track?.uri},bubbles:!0,composed:!0}))}_togglePlaylist(t){if(this._busy)return;k("light");let e=new Set(this._selected);e.has(t)?e.delete(t):e.add(t),this._selected=e}_toggleLiked(){this._busy||(k("light"),this._likedSelected=!this._likedSelected)}_toggleSort(){this._busy||this._loading||(Qi(Le()==="alpha"?"recents":"alpha"),this._loadPlaylists(),this.requestUpdate())}get _hasChanges(){return this._selected.size>0||this._likedSelected!==this._likedInitial}async _done(){if(this._busy||!this.api)return;let t=this.track?.uri,e=(this._playlists||[]).filter(s=>this._selected.has(s.id)),i=this._likedSelected!==this._likedInitial;if(!i&&e.length===0){this._close();return}this._busy=!0,k("light");try{let s=0,r=!1;i&&this.track?.id&&(this._likedSelected?await this.api.saveTrackFavorites(this.track.id):await this.api.removeTrackFavorites(this.track.id)).success&&(this._likedSelected?s++:r=!0);let n=[];for(let c of e){if(!t)break;if(await this._playlistContains(c,t)){n.push(c);continue}(await this.api.addPlaylistItems(c.id,[t])).success&&(s++,this._dispatchChanged(c.id))}let o=c=>c===1?"Added to 1 playlist":`Added to ${c} playlists`;if(n.length){let c=n.map(d=>`"${d.name}"`).join(", ");s&&this._toast(o(s)),this._close(),this.dispatchEvent(new CustomEvent("show-alert",{detail:{title:"Already added",message:`"${this.track?.name}" is already in ${c}. Add it anyway?`,confirmText:"Add Anyway",onConfirm:async()=>{let d=0;for(let p of n)(await this.api.addPlaylistItems(p.id,[t])).success&&(d++,this._dispatchChanged(p.id));d&&this._toast(o(d))}},bubbles:!0,composed:!0}));return}s?this._toast(o(s)):r&&this._toast("Removed from Liked Songs"),this._close()}finally{this._busy=!1}}async _playlistContains(t,e){if((t?.tracks?.total||0)>a.DEDUPE_CHECK_CAP)return!1;let s=0;for(;s<a.DEDUPE_CHECK_CAP;){let r=await this.api.getPlaylistItemsPage(t.id,s,50,"items(track(uri)),next"),n=r?.items||[];if(n.some(o=>(o?.track||o)?.uri===e))return!0;if(n.length<50||!r?.next)return!1;s+=n.length}return!1}_checkSvg(){return l`<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`}render(){let t=(this._filter||"").trim().toLowerCase(),e=(this._playlists||[]).filter(s=>!t||(s.name||"").toLowerCase().includes(t)),i=!!this.track?.id&&(!t||"liked songs".includes(t));return l`
            <spotify-bottom-sheet .visible=${this.visible} desktop-modal>
                <div class="hdr">
                    <button class="hdr-cancel" @click=${this._close}>Cancel</button>
                    <div class="hdr-title">Add to playlist</div>
                </div>

                <div class="newpl-row">
                    <button class="newpl" @click=${this._newPlaylist}>New playlist</button>
                </div>

                <div class="search">
                    <svg viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                    <input type="text" placeholder="Find playlist"
                        .value=${this._filter}
                        @input=${s=>{this._filter=s.target.value}} />
                </div>

                <button class="list-label" @click=${this._toggleSort} title="Change sort order">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4v14m0 0l-3-3m3 3l3-3M17 20V6m0 0l-3 3m3-3l3 3"/></svg>
                    ${Le()==="alpha"?"A\u2013Z":"Recents"}
                </button>

                <div class="list">
                    ${i?l`
                        <div class="row ${this._likedSelected?"selected":""} ${this._busy?"busy":""}" @click=${this._toggleLiked}>
                            <div class="art liked">
                                <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                            </div>
                            <div class="row-text">
                                <div class="row-name">Liked Songs</div>
                                <div class="row-sub">Playlist</div>
                            </div>
                            <div class="sel">${this._checkSvg()}</div>
                        </div>
                    `:""}
                    ${this._loading?l`<div class="loading-row">Loading your playlists…</div>`:e.map(s=>l`
                            <div class="row ${this._selected.has(s.id)?"selected":""} ${this._busy?"busy":""}"
                                 @click=${()=>this._togglePlaylist(s.id)}>
                                <div class="art ${s.images?.[0]?.url?"":"art-fallback"}" style=${s.images?.[0]?.url?`background-image: url('${s.images[0].url}')`:""}></div>
                                <div class="row-text">
                                    <div class="row-name">${s.name}</div>
                                    <div class="row-sub">${s.tracks?.total??0} songs</div>
                                </div>
                                <div class="sel">${this._checkSvg()}</div>
                            </div>
                        `)}
                    ${!this._loading&&e.length===0&&!i?l`<div class="empty">${t?"No playlists match.":"No playlists you can add to yet."}</div>`:""}
                </div>

                <div class="done-wrap">
                    <button class="done-btn" ?disabled=${!this._hasChanges||this._busy} @click=${this._done}>
                        ${this._busy?"Adding\u2026":"Done"}
                    </button>
                </div>
            </spotify-bottom-sheet>
        `}};customElements.define("spotify-playlist-picker",si);var ri=class extends b{static get properties(){return{visible:{type:Boolean,reflect:!0},api:{type:Object},dialogProps:{type:Object},_name:{type:String,state:!0},_saving:{type:Boolean,state:!0}}}static get styles(){return _`
            :host {
                display: contents;
                --spf-sheet-max-h: 96%;
                --spf-sheet-z: 230000; /* above the picker sheet it can be launched from */
            }

            .body {
                flex: 1; min-height: 0;
                display: flex; flex-direction: column;
                align-items: center;
                padding: 0 12px;
            }
            .close-row {
                width: 100%;
                display: flex; justify-content: flex-end;
                flex-shrink: 0;
            }
            .close-btn {
                background: transparent; border: none; cursor: pointer;
                color: var(--spf-text-main, #fff);
                width: 44px; height: 44px;
                display: flex; align-items: center; justify-content: center;
            }
            .close-btn svg { width: 26px; height: 26px; fill: currentColor; }

            .heading {
                margin: 10vh 0 0;
                font-size: var(--spf-text-xl, 22px); font-weight: 900;
                color: var(--spf-text-main, #fff);
                text-align: center;
            }

            .name-input {
                width: min(480px, 90%);
                margin-top: 48px;
                background: transparent;
                border: none;
                border-bottom: 1px solid rgba(255,255,255,0.35);
                color: var(--spf-text-main, #fff);
                font-size: var(--spf-text-hero, 34px); font-weight: 900; font-family: inherit;
                text-align: center;
                padding: 4px 8px 12px;
                outline: none;
                caret-color: var(--spf-brand, #1ed760);
            }
            .name-input::placeholder { color: rgba(255,255,255,0.35); }
            .name-input:focus { border-bottom-color: rgba(255,255,255,0.6); }

            .create-btn {
                margin-top: 44px;
                background: var(--spf-brand, #1ed760);
                color: #000;
                border: none; border-radius: 999px;
                font-size: var(--spf-text-md, 15px); font-weight: 700; font-family: inherit;
                padding: 14px 40px;
                cursor: pointer;
                transition: transform 0.15s ease, opacity 0.15s ease;
            }
            .create-btn:active { transform: scale(0.97); }
            .create-btn:disabled { opacity: 0.4; cursor: default; }

            /* Popup variant (tablet/desktop): compact the phone's airy spacing. */
            @media (min-width: 769px) {
                .body { min-height: 300px; }
                .heading { margin-top: 12px; }
                .name-input { margin-top: 32px; font-size: var(--spf-text-2xl, 26px); }
                .create-btn { margin: 32px 0 8px; }
            }
        `}constructor(){super(),this.visible=!1,this.api=null,this.dialogProps=null,this._name="",this._saving=!1}updated(t){t.has("visible")&&(clearTimeout(this._focusTimer),this.visible&&(this._name="",this._saving=!1,this._focusTimer=setTimeout(()=>{this.shadowRoot.querySelector(".name-input")?.focus({preventScroll:!0})},450)))}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._focusTimer)}_close(){this._saving||this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}_toast(t){this.dispatchEvent(new CustomEvent("show-toast",{detail:{message:t},bubbles:!0,composed:!0}))}async _create(){let t=(this._name||"").trim();if(!(!t||this._saving||!this.api)){this._saving=!0,k("light");try{let e=await this.api.createPlaylist({name:t,description:"",isPublic:!0,collaborative:!1});if(!e.success||!e.playlist){this._toast("Couldn't create playlist");return}let i=this.dialogProps?.pendingTrackUri;if(i){let s=await this.api.addPlaylistItems(e.playlist.id,[i]);this._toast(s.success?`Created "${t}" and added the track`:`Created "${t}" \u2014 couldn't add the track`)}else this._toast(`Created "${t}"`);this.dispatchEvent(new CustomEvent("playlist-created",{detail:{playlist:e.playlist}}))}finally{this._saving=!1}}}render(){return l`
            <spotify-bottom-sheet .visible=${this.visible} desktop-modal>
                <div class="body">
                    <div class="close-row">
                        <button class="close-btn" aria-label="Close" @click=${this._close}>
                            <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                        </button>
                    </div>
                    <h2 class="heading">Give your playlist a name</h2>
                    <input class="name-input" type="text" maxlength="100"
                        placeholder="My playlist"
                        .value=${this._name}
                        @input=${t=>{this._name=t.target.value}}
                        @keydown=${t=>{t.key==="Enter"&&this._create()}} />
                    <button class="create-btn" ?disabled=${!(this._name||"").trim()||this._saving}
                        @click=${this._create}>
                        ${this._saving?"Creating\u2026":"Create"}
                    </button>
                </div>
            </spotify-bottom-sheet>
        `}};customElements.define("spotify-playlist-create-sheet",ri);var D=a=>l`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${a}</svg>`,vr={play:D(I`<path d="M8 5.5v13l11-6.5z"/>`),queue:D(I`<path d="M5 3.5v5M2.5 6h5M11 6h10.5M3.5 12h18M3.5 18h18"/>`),"queue-list":D(I`<rect x="4" y="6" width="16" height="3.6" rx="1.8"/><rect x="4" y="14.4" width="16" height="3.6" rx="1.8"/>`),artist:D(I`<circle cx="12" cy="8" r="3.6"/><path d="M4.8 19.5c1.3-3.1 4-4.7 7.2-4.7s5.9 1.6 7.2 4.7"/>`),playlist:D(I`<path d="M12 17V5.5L19 4v11.5"/><circle cx="9.2" cy="17" r="2.8"/><circle cx="16.2" cy="15.5" r="2.8"/>`),album:D(I`<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.6"/>`),"playlist-add":D(I`<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>`),pencil:D(I`<path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5 17z"/><path d="M14.5 7.5l3 3"/>`),trash:D(I`<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>`),"minus-circle":D(I`<circle cx="12" cy="12" r="9"/><path d="M8 12h8"/>`),plus:D(I`<path d="M12 5v14M5 12h14"/>`),heart:it(!1),"heart-filled":it(!0),pin:D(I`<path d="M12 21.5S5 14.6 5 9.5a7 7 0 0 1 14 0c0 5.1-7 12-7 12z"/><circle cx="12" cy="9.5" r="2.4"/>`),"drag-handle":D(I`<path d="M4 9.5h16M4 14.5h16"/>`),lock:D(I`<rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3"/>`),people:D(I`<circle cx="9" cy="8.5" r="3"/><path d="M3.5 19c1.1-2.6 3-4 5.5-4s4.4 1.4 5.5 4"/><circle cx="16.8" cy="9.5" r="2.4"/><path d="M16.5 15.2c2 .3 3.4 1.5 4.2 3.4"/>`)},ai=class extends b{static get properties(){return{visible:{type:Boolean,reflect:!0},header:{type:Object},items:{type:Array},anchor:{type:Object}}}static get styles(){return _`
            :host { display: contents; }

            /* ---- Shared item rows (sheet + popover) ----
               Metrics measured off the Spotify iOS app at 3x: ~13px labels
               (regular), ~22px thin-stroke icons, ~56px row pitch, 46px header
               art, wrapping header text. */
            .menu-header {
                display: flex; align-items: center; gap: 13px;
                padding: 4px 4px 12px;
                border-bottom: 1px solid rgba(255,255,255,0.1);
                margin-bottom: 6px;
            }
            .menu-art {
                width: 46px; height: 46px; border-radius: 4px; flex: 0 0 auto;
                background-size: cover; background-position: center;
                background-color: #333;
            }
            .menu-art--icon { display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.8); }
            .menu-art--icon svg { width: 26px; height: 26px; fill: currentColor; }
            .menu-info { min-width: 0; }
            .menu-name {
                color: #fff; font-size: var(--spf-text-base, 13.5px); font-weight: 700; line-height: 1.35;
                display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
                overflow: hidden;
            }
            .menu-sub {
                color: rgba(255,255,255,0.6); font-size: var(--spf-text-base, 13.5px); margin-top: 2px; line-height: 1.35;
                display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
                overflow: hidden;
            }
            .menu-item {
                display: flex; align-items: center; gap: 15px;
                width: 100%; min-height: 56px; padding: 4px 4px;
                background: none; border: none; cursor: pointer;
                color: #fff; font-size: var(--spf-text-base, 13.5px); font-weight: 400; font-family: inherit; text-align: left;
            }
            .menu-item svg { flex: 0 0 auto; width: 22px; height: 22px; color: rgba(255,255,255,0.8); }
            .menu-item.danger, .menu-item.danger svg { color: #f15e6c; }
            @media (hover: hover) {
                .menu-item:hover { color: var(--spf-brand, #1ed760); }
                .menu-item:hover svg { color: var(--spf-brand, #1ed760); }
                .menu-item.danger:hover, .menu-item.danger:hover svg { color: #ff8b96; }
            }
            .menu-list { overflow-y: auto; min-height: 0; }

            /* ---- Desktop/tablet anchored popover ---- */
            .pop-overlay {
                position: fixed; inset: 0;
                z-index: var(--spf-sheet-z, 215000);
            }
            .menu-card {
                position: fixed;
                width: 270px;
                max-height: calc(100vh - 16px);
                display: flex; flex-direction: column;
                box-sizing: border-box;
                padding: 12px 14px;
                background: #282828;
                border: 1px solid rgba(255,255,255,0.08);
                border-radius: 12px;
                box-shadow: 0 16px 50px rgba(0,0,0,0.7);
                opacity: 0;
                transform: scale(0.95);
                transition: opacity 0.15s ease, transform 0.15s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .menu-card.placed { opacity: 1; transform: scale(1); }
            /* Popover keeps the same visual language, slightly compact. */
            .menu-card .menu-item { min-height: 42px; font-size: var(--spf-text-base, 13.5px); gap: 14px; border-radius: 6px; padding: 4px 8px; }
            .menu-card .menu-item svg { width: 20px; height: 20px; }
            .menu-card .menu-art { width: 40px; height: 40px; }
            .menu-card .menu-name { font-size: var(--spf-text-base, 13.5px); }
            .menu-card .menu-sub { font-size: var(--spf-text-sm, 12px); }
            @media (hover: hover) { .menu-card .menu-item:hover { background: rgba(255,255,255,0.08); } }
        `}constructor(){super(),this.visible=!1,this.header=null,this.items=[],this.anchor=null,this._onKeyDown=this._onKeyDown.bind(this)}get _isDesktop(){return typeof window<"u"&&window.matchMedia("(min-width: 769px)").matches}updated(t){t.has("visible")&&(this.visible?(window.addEventListener("keydown",this._onKeyDown,!0),this._isDesktop&&this._placePopover()):window.removeEventListener("keydown",this._onKeyDown,!0))}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._onKeyDown,!0)}_onKeyDown(t){t.key==="Escape"&&(t.preventDefault(),this._close())}_close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}_pick(t){this.dispatchEvent(new CustomEvent("action",{detail:t,bubbles:!0,composed:!0}))}_placePopover(){let t=this.renderRoot.querySelector(".menu-card");if(!t)return;t.classList.remove("placed");let e=this.renderRoot.querySelector(".pop-overlay"),i=e?e.getBoundingClientRect():{left:0,top:0,width:window.innerWidth,height:window.innerHeight},{left:s,top:r,origin:n}=ts(this.anchor,i,{width:t.offsetWidth,height:t.offsetHeight});t.style.left=`${s}px`,t.style.top=`${r}px`,t.style.transformOrigin=n,requestAnimationFrame(()=>t.classList.add("placed"))}_renderHeader(){let t=this.header;return t?l`
            <div class="menu-header">
                ${!t.image&&t.icon?l`<div class="menu-art menu-art--icon">${t.icon}</div>`:l`<div class="menu-art" style="${t.image?`background-image: url('${t.image}')`:""}"></div>`}
                <div class="menu-info">
                    <div class="menu-name">${t.name||""}</div>
                    ${t.subtitle?l`<div class="menu-sub">${t.subtitle}</div>`:""}
                </div>
            </div>
        `:""}_renderItems(){return l`
            <div class="menu-list">
                ${(this.items||[]).map(t=>l`
                    <button class="menu-item ${t.danger?"danger":""}" @click=${()=>this._pick(t.id)}>
                        ${vr[t.icon]||""}
                        ${t.label}
                    </button>
                `)}
            </div>
        `}render(){return this._isDesktop?this.visible?l`
                <div class="pop-overlay" @click=${t=>{t.target===t.currentTarget&&this._close()}}>
                    <div class="menu-card" role="menu">
                        ${this._renderHeader()}
                        ${this._renderItems()}
                    </div>
                </div>
            `:"":l`
            <spotify-bottom-sheet .visible=${this.visible} @close=${t=>{t.stopPropagation(),this._close()}}>
                ${this._renderHeader()}
                ${this._renderItems()}
            </spotify-bottom-sheet>
        `}};customElements.define("spotify-context-menu",ai);var br='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4a35d6"/><stop offset="1" stop-color="#8d7bf0"/></linearGradient></defs><rect width="100" height="100" fill="url(#g)"/><g transform="translate(26,26) scale(2)"><path fill="#fff" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></g></svg>',yr=`data:image/svg+xml,${encodeURIComponent(br)}`,At={id:"user-library",type:"library",name:"User Library",title:"User Library",subtitle:"Your collection & liked songs",image:yr,uri:"spotify:user-library",fixed:!0},Et=7,ni="Pinned by the card config \u2014 edit home.pinned.items to change it",he=class{constructor(t,e,i){this.hass=t,this.config=e||{},this.storageManager=i,this._entity=this.config.entity||null,this._pendingWrite=null,this._pendingWriteAt=0,this._resolvedConfigPins=null}get _pinnedCfg(){return this.config?.home?.pinned||{}}get scope(){return this._pinnedCfg.scope==="account"?"account":"shared"}get _storageKey(){return this.scope==="account"&&this._entity?`pinned_items:${this._entity}`:"pinned_items"}setAccount(t){!t||t===this._entity||(this._entity=t,this._pendingWrite=null,this._resolvedConfigPins=null)}get configItems(){let t=Array.isArray(this._pinnedCfg.items)?this._pinnedCfg.items:[],e=(this.config?.accounts||[]).find(r=>r&&r.entity===this._entity),i=Array.isArray(e?.pinned)?e.pinned:[],s=new Set(t.map(r=>r.id));return[...t,...i.filter(r=>r&&!s.has(r.id))]}hasConfigItems(){return this.configItems.length>0}isConfigPinned(t){return this.configItems.some(e=>e.id===t)}setResolvedConfigPins(t){this._resolvedConfigPins=Array.isArray(t)?t:null}_configPins(){let t=this.configItems;if(t.length===0)return[];let e=new Map((this._resolvedConfigPins||[]).map(i=>[i.id,i]));return t.map(i=>e.get(i.id)||{id:i.id,type:i.type,name:i.title||"",title:i.title||"",subtitle:"",image:null,uri:`spotify:${i.type}:${i.id}`,fixed:!0})}_readItems(){let t=this.storageManager?.getData(this._storageKey),e=Array.isArray(t)?t:[];if(this._pendingWrite)if(Date.now()-this._pendingWriteAt>1e4||JSON.stringify(e)===JSON.stringify(this._pendingWrite))this._pendingWrite=null;else return this._pendingWrite;return e}updateHass(t){this.hass=t,this.storageManager&&this.storageManager.updateHass(t)}updateConfig(t){this.config=t||{}}checkAvailability(){return this.hasConfigItems()?!0:this._hasBackend()}_hasBackend(){return this.storageManager?this.storageManager.writeStatus()!=="no_backend":!1}canEdit(){return this.storageManager?this.storageManager.writeStatus()==="ok":!1}get sensorEntity(){return this.storageManager?.config?.sensor||"sensor.spotify_browser_data"}_normalize(t){let i=(Array.isArray(t)?t:[]).filter(s=>s&&s.id!=="user-library"&&!this.isConfigPinned(s.id)).slice(0,Et);return[{...At},...i]}_withConfigPins(t){let[e,...i]=t;return[e,...this._configPins(),...i]}async getItems(){if(!this.checkAvailability())return[];try{let t=this._hasBackend()?this._readItems():[];return this._withConfigPins(this._normalize(t))}catch(t){return console.error("[PinnedItemsManager] Failed to fetch items:",t),this._withConfigPins([{...At}])}}isPinned(t){if(!this.checkAvailability())return!1;if(t==="user-library"||this.isConfigPinned(t))return!0;if(!this._hasBackend())return!1;try{return!!this._readItems().find(e=>e.id===t)}catch{return!1}}async add(t){if(!this._hasBackend())return{success:!1,error:"No storage configured"};if(t.id==="user-library")return{success:!0};if(this.isConfigPinned(t.id))return{success:!1,error:ni};try{let i=this._normalize(this._readItems()).filter(o=>o.id!=="user-library");if(i.find(o=>o.id===t.id))return{success:!1,error:"Already pinned"};if(i.length>=Et)return{success:!1,error:`Pinned is full (max ${Et} items besides Liked Songs)`};let s=t.name||t.title||t.album?.name||"",r={id:t.id,type:t.type,name:s,title:s,subtitle:t.subtitle||t.description||"",image:t.image||t.images?.[0]?.url||t.album?.images?.[0]?.url||null,uri:t.uri},n=[{...At},r,...i].slice(0,1+Et);return await this._save(n)}catch(e){return console.error("[PinnedItemsManager] Add failed:",e),{success:!1,error:e.message}}}async remove(t){if(!this._hasBackend())return{success:!1,error:"No storage"};if(t==="user-library")return{success:!0};if(this.isConfigPinned(t))return{success:!1,error:ni};try{let e=this._normalize(this._readItems()),i=e.filter(s=>s.id!==t);return i.length===e.length?{success:!0}:await this._save(i)}catch(e){return{success:!1,error:e.message}}}async toggle(t){return this.isConfigPinned(t.id)?{success:!1,error:ni}:this._normalize(this._readItems()).find(s=>s.id===t.id)?await this.remove(t.id):await this.add(t)}async addByUri(t,e){if(!this._hasBackend())return{success:!1,error:"No storage configured"};if(!e||!e.startsWith("spotify:"))return{success:!1,error:"Invalid URI format"};let i=e.split(":"),s=i[1],r=i[2];if(i[1]==="user"&&i[3]==="playlist"&&(s="playlist",r=i[4]),!["album","playlist","track","artist"].includes(s))return{success:!1,error:"URI must be for an Album, Playlist, Track, or Artist."};if(!r)return{success:!1,error:"Invalid URI: Missing ID"};try{let o=null,c="",d="",p=null;if(s==="artist"){let g=await t.fetchSpotifyPlus("get_artist",{artist_id:r},!0);g&&(o=g.result||g,c=o.name,d="Artist",p=o.images?.[0]?.url)}else if(s==="album"){let g=await t.fetchSpotifyPlus("get_album",{album_id:r},!0);g&&(o=g.result||g,c=o.name,d=o.artists?o.artists.map(f=>f.name).join(", "):"Album",p=o.images?.[0]?.url)}else if(s==="playlist"){let g=await t.fetchSpotifyPlus("get_playlist",{playlist_id:r},!0);g&&(o=g.result||g,c=o.name,d=o.description||(o.owner?`By ${o.owner.display_name}`:"Playlist"),p=o.images?.[0]?.url)}else if(s==="track"){let g=await t.fetchSpotifyPlus("get_track",{track_id:r},!0);if(g){o=g.result||g,c=o.name;let f=o.artists?o.artists.map(m=>m.name).join(", "):"",h=o.album?o.album.name:"";d=f?`${f} \u2022 ${h}`:h,p=o.album?.images?.[0]?.url}}if(!o)return{success:!1,error:`Could not fetch details for ${s}`};let u={id:r,type:s,title:c,subtitle:d,image:p,uri:e};return await this.add(u)}catch(o){return{success:!1,error:o.message||"Fetch failed"}}}async reorder(t){if(!this._hasBackend())return{success:!1};try{let e=this._normalize(this._readItems()),i=new Map(e.map(o=>[o.id,o])),s=[],r=new Set;for(let o of t){let c=typeof o=="object"&&o.id?o.id:o;c==="user-library"||this.isConfigPinned(c)||r.has(c)||(r.add(c),typeof o=="object"?s.push(o):i.has(c)&&s.push(i.get(c)))}let n=[{...At},...s.slice(0,Et)];return await this._save(n)}catch(e){return{success:!1,error:e.message}}}async _save(t){if(!this._hasBackend())return{success:!1};this._pendingWrite=t,this._pendingWriteAt=Date.now();try{let e=await this.storageManager.saveData(this._storageKey,t);return e&&e.success===!1&&(this._pendingWrite=null),e}catch(e){return console.error("[PinnedItemsManager] Save failed:",e),this._pendingWrite=null,{success:!1,error:e.message}}}hasDataChanged(t,e){if(!t||!e)return!1;let i=this.sensorEntity,s=t.states[i],r=e.states[i];if(!s||!r||s===r)return!1;let n=s.attributes.data,o=r.attributes.data;if(n===o)return!1;let c=u=>{if(typeof u!="string")return u;try{return JSON.parse(u)}catch{return null}},d=c(n)?.[this._storageKey],p=c(o)?.[this._storageKey];return JSON.stringify(d)!==JSON.stringify(p)}async reset(){return this._hasBackend()?await this._save([{...At}]):{success:!1}}};var pe=class a{constructor(t,e=null){this.hass=t,this.config=e||{enabled:!1,device_map:[]},this.onDegraded=null,this._unmappedNotified=!1,this._lastEntity=null,this._launchGraceUntil=0}noteLaunch(t){t&&(this._lastEntity=t,this._launchGraceUntil=Date.now()+3e4,this.log(`noteLaunch: ${t} is the playback target (30s grace)`))}setHass(t){this.hass=t}get enabled(){return!!this.config?.enabled}get launchMode(){return this.config?.launch_mode==="spotifyplus"?"spotifyplus":"local"}reportUnmapped(t){this.log(`Sonos detected but no HA entity resolved for "${t||"unknown"}" \u2192 falling back to SpotifyPlus. Add a device_map entry.`),!this._unmappedNotified&&(this._unmappedNotified=!0,this.onDegraded?.(`Sonos "${t||"device"}" isn't mapped \u2014 some features are limited. Add a sonos.device_map entry.`))}log(...t){this.config?.debug&&console.log("%c[Sonos]","color:#1ed760;font-weight:bold",...t)}get _deviceMap(){return this.config?.device_map||[]}_preferredMappedEntity(){let t=this.hass?.states||{},e=this._deviceMap.map(s=>s.entity).filter(Boolean),i=s=>{for(let r of e){let n=t[r];if(n&&s.includes(n.state)&&n.attributes?.media_title)return{entity:r,state:n.state}}return null};return i(["playing","buffering"])||i(["paused"])}_mapEntryFor(t){if(!t)return null;let e=String(t).toLowerCase();return this._deviceMap.find(i=>i.spotify&&String(i.spotify).toLowerCase()===e)||null}isSonosTarget(t=null,e={}){if(!this.enabled)return!1;let i=t?.name||e?.sp_device_name||e?.source,s=t?.id||e?.sp_device_id;if((this._mapEntryFor(i)||this._mapEntryFor(s))?.is_sonos||t?.brand&&String(t.brand).toLowerCase().includes("sonos")||e?.sp_device_is_brand_sonos===!0||e?.sp_device_is_brand_sonos==="true")return!0;let n=this.resolveSonosEntity(t,e);return!!(n&&this.hass?.entities?.[n]?.platform==="sonos")}resolveSonosEntity(t=null,e={}){let i=t?.name||e?.sp_device_name||e?.source,s=t?.id||e?.sp_device_id,r=this._mapEntryFor(i)||this._mapEntryFor(s);if(r?.entity)return r.entity;if(!i||!this.hass)return null;let n=String(i).toLowerCase().trim(),o=this.hass.entities||{},c=this.hass.states||{},d=Object.keys(c).filter(h=>h.startsWith("media_player.")),p=h=>String(c[h]?.attributes?.friendly_name||"").toLowerCase().trim(),u=h=>o[h]?.platform==="sonos",g=d.filter(u),f=g.length?g:d;return f.find(h=>p(h)===n)||f.find(h=>p(h).includes(n)||n.includes(p(h)))||null}activeTarget(t={}){if(!this.enabled)return{isSonos:!1,entity:null};if(this.config?.prefer_sonos){let e=this._preferredMappedEntity();if(e&&(e.state!=="paused"||!(t?.sp_device_name||t?.source)))return this._lastEntity!==e.entity&&this.log(`activeTarget: preferred mapped speaker ${e.entity} (${e.state})`),this._lastEntity=e.entity,{isSonos:!0,entity:e.entity}}if(this.isSonosTarget(null,t)){let e=this.resolveSonosEntity(null,t);return e&&(this._lastEntity=e),{isSonos:!0,entity:e}}if(t?.sp_device_name||t?.source)return this._lastEntity=null,{isSonos:!1,entity:null};if(this._lastEntity){let e=this.hass?.states?.[this._lastEntity]?.state;if(e==="playing"||e==="paused"||e==="buffering"||Date.now()<this._launchGraceUntil)return{isSonos:!0,entity:this._lastEntity};this._lastEntity=null}for(let e of this._deviceMap){let i=e.entity?this.hass?.states?.[e.entity]:null;if(i?.state==="playing"&&String(i.attributes?.media_content_id||"").startsWith("x-sonos-spotify"))return this._lastEntity=e.entity,this.log(`activeTarget: adopted ${e.entity} (playing Spotify content, no active Connect device)`),{isSonos:!0,entity:e.entity}}return{isSonos:!1,entity:null}}coordinatorFor(t){if(!t||!this.hass)return t;let e=this.hass.states?.[t]?.attributes?.sonos_group;return Array.isArray(e)&&e.length&&e[0]!==t?(this.log(`coordinatorFor(${t}) \u2192 ${e[0]} (grouped)`),e[0]):t}static _normalizeQueueItem(t){let e=kt(t?.media_content_id),i=e?e.split(":")[2]:null,s=t?.media_artist||t?.media_album_artist||"",r=t?.media_image_url?[{url:t.media_image_url}]:[];return{uri:e||t?.media_content_id||"",id:i,name:t?.media_title||"Unknown",artists:s?[{name:s}]:[],album:{name:t?.media_album_name||"",images:r}}}async getQueue(t){if(!t||!this.hass)return null;t=this.coordinatorFor(t);try{let e=await this.hass.callWS({type:"call_service",domain:"sonos",service:"get_queue",service_data:{entity_id:t},return_response:!0}),i=e?.response??e,s=[];Array.isArray(i)?s=i:i&&typeof i=="object"&&(s=i[t]||Object.values(i).find(n=>Array.isArray(n))||[]);let r=s.map(a._normalizeQueueItem);return this.log(`get_queue(${t}) \u2192 ${r.length} items (LOCAL Sonos queue, bypassing SpotifyPlus)`),r}catch(e){return console.warn("[SonosBridge] get_queue failed:",e),null}}async addToQueue(t,e,i="add"){if(!t||!e||!this.hass)return{success:!1};t=this.coordinatorFor(t);try{return this.log(`addToQueue(${t}, ${e}, ${i}) \u2192 LOCAL Sonos enqueue`),await this.hass.callService("media_player","play_media",{entity_id:t,media_content_id:e,media_content_type:"music",enqueue:i}),{success:!0}}catch(s){return console.error("[SonosBridge] addToQueue failed:",s),{success:!1,error:s}}}async playContext(t,e,{offsetPosition:i=0}={}){if(!t||!e||!this.hass)return!1;let s=String(e).split(":")[1];if(s!=="playlist"&&s!=="album")return!1;t=this.coordinatorFor(t);try{return this.log(`playContext(${t}, ${e}, offset=${i}) \u2192 LOCAL Sonos launch`),await this.hass.callService("media_player","play_media",{entity_id:t,media_content_id:e,media_content_type:s==="playlist"?"playlist":"music",enqueue:"replace"}),i>0&&await this.jumpWhenLoaded(t,i),!0}catch(r){return console.warn("[SonosBridge] playContext failed, falling back to SpotifyPlus:",r),!1}}async playTrack(t,e){if(!t||!e||!this.hass)return!1;t=this.coordinatorFor(t);try{return this.log(`playTrack(${t}, ${e}) \u2192 LOCAL Sonos play`),await this.hass.callService("media_player","play_media",{entity_id:t,media_content_id:e,media_content_type:"music",enqueue:"play"}),!0}catch(i){return console.warn("[SonosBridge] playTrack failed, falling back to SpotifyPlus:",i),!1}}async jumpWhenLoaded(t,e,{tries:i=16,intervalMs:s=500}={}){for(let r=0;r<i;r++){let n=await this.getQueue(t);if(n&&n.length>e)return(await this.playQueuePosition(t,e)).success;await new Promise(o=>setTimeout(o,s))}return this.log(`jumpWhenLoaded(${t}, ${e}) timed out \u2014 playing from start`),!1}async playQueuePosition(t,e){if(!t||e==null||!this.hass)return{success:!1};t=this.coordinatorFor(t);try{return this.log(`playQueuePosition(${t}, ${e}) \u2192 LOCAL Sonos jump`),await this.hass.callService("sonos","play_queue",{entity_id:t,queue_position:e}),{success:!0}}catch(i){return console.error("[SonosBridge] playQueuePosition failed:",i),{success:!1,error:i}}}};var ue=class{constructor(t,e){this.hass=t,this.config=e||{},this._sensorEntity=this.config.sensor||"sensor.spotify_browser_data",this._eventType=this.config.event||"spotify_browser_store_data",this._writeScript=this.config.script||null,this._storageAttribute="data"}updateHass(t){this.hass=t}get _isNonAdmin(){return this.hass?.user?.is_admin===!1}writeStatus(){return!this.hass||this.hass.states[this._sensorEntity]===void 0?"no_backend":this._isNonAdmin?this._writeScript?"ok":"guest_local":"ok"}checkStatus(){if(!this.hass)return"error";let t=this.hass.states[this._sensorEntity];if(!t)return"error";let e=t.attributes[this._storageAttribute];if(e==null)return"empty";if(typeof e=="string")try{let i=JSON.parse(e);if(typeof i!="object"||i===null)return"corrupted"}catch{return"corrupted"}else if(typeof e!="object")return"corrupted";return"ok"}getData(t){if(!this.hass)return null;let e=this.hass.states[this._sensorEntity];if(!e||!e.attributes)return null;let i=e.attributes[this._storageAttribute];if(typeof i=="string")try{i=JSON.parse(i)}catch(s){return console.error("[DataTriggerTemplate] Failed to parse storage attribute:",s),null}return!i||typeof i!="object"?null:i[t]||null}async _write(t){return this._writeScript&&this._isNonAdmin?this._callScript(t):this._fireEvent({[this._storageAttribute]:t})}async _fireEvent(t){if(!this.hass||!this.hass.connection)throw new Error("No Home Assistant connection available.");return this.hass.connection.sendMessagePromise({type:"fire_event",event_type:this._eventType,event_data:t})}async _callScript(t){if(!this.hass)throw new Error("No Home Assistant connection available.");let e=this._writeScript.includes(".")?this._writeScript.split(".").slice(1).join("."):this._writeScript;return this.hass.callService("script",e,{[this._storageAttribute]:t})}async saveData(t,e){if(!this.hass)return{success:!1,error:"No connection"};try{let i=this.hass.states[this._sensorEntity],s=i&&i.attributes&&i.attributes[this._storageAttribute]?i.attributes[this._storageAttribute]:{};if(typeof s=="string")try{s=JSON.parse(s)}catch{s={}}return s={...s,[t]:e},await this._write(s),{success:!0}}catch(i){return console.error("[DataTriggerTemplate] Save failed:",i),{success:!1,error:i.message}}}async resetStorage(){if(!this.hass)return{success:!1,error:"No connection"};console.warn("[DataTriggerTemplate] Wiping persistent data...");try{return await this._write({}),{success:!0}}catch(t){return console.error("[DataTriggerTemplate] Reset failed:",t),{success:!1,error:t.message}}}};var fe=class{constructor(t,e){this.hass=t,this.config=e||{},this.triggerStrategy=new ue(t,e)}updateHass(t){this.hass=t,this.triggerStrategy.updateHass(t)}get sensorEntity(){return this.config.sensor||null}checkStatus(){return this.triggerStrategy.checkStatus()}writeStatus(){return this.triggerStrategy.writeStatus()}getData(t){return this.triggerStrategy.getData(t)}async saveData(t,e){return await this.triggerStrategy.saveData(t,e)}async resetStorage(){return await this.triggerStrategy.resetStorage()}};var ge=class extends EventTarget{constructor(t){super(),this.api=t,this.hass=null,this.config=null,this.sonosBridge=null,this._sonosQueueBase=0,this.state={track:null,isPlaying:!1,isShuffle:!1,isLiked:!1,queue:[],recentTracks:[],volume:0,isMuted:!1,activeDevice:null},this._lastStateObj=null,this._optimisticTrack=null,this._optimisticFromUri=null,this._richCurrent=null,this._optimisticTimer=null,this._queueBackup=null,this._lastTrackId=null,this._cachedApiQueue=null,this._eosTimer=null,this._queueFetchId=0,this._transferHoldTrack=null,this._transferHoldUntil=0}beginTransferHold(){this.state.track&&(this._transferHoldTrack=this.state.track,this._transferHoldUntil=Date.now()+15e3)}_transferHoldActive(){return!!this._transferHoldTrack&&Date.now()<this._transferHoldUntil}destroy(){this._optimisticTimer&&clearTimeout(this._optimisticTimer),this._refreshTimer&&clearTimeout(this._refreshTimer),this._eosTimer&&clearTimeout(this._eosTimer),this._optimisticTimer=null,this._refreshTimer=null,this._eosTimer=null,this._queueFetchId++}updateConfig(t){this.config=t}setSonosBridge(t){this.sonosBridge=t}playbackEntityId(){let t=this._sonosContext();return t.isSonos&&t.entity?t.entity:this.config?.entity}playbackStateObj(){return this.hass?.states?.[this.playbackEntityId()]||null}sourceContextUri(){let t=this.hass?.states?.[this.config?.entity]?.attributes||{};return t.sp_context_uri||t.media_context_content_id||null}_sonosContext(){if(!this.sonosBridge)return{isSonos:!1,entity:null};let t=this.hass?.states?.[this.config?.entity]?.attributes||{};return this.sonosBridge.activeTarget(t)}updateHass(t){t&&(this.hass=t,this._updateStateFromHass())}_updateStateFromHass(){if(!this.hass||!this.config||!this.config.entity)return;let t=this._sonosContext(),e=this.hass.states[this.config.entity],i=!!(t.isSonos&&t.entity&&this.hass.states[t.entity]),s=i?this.hass.states[t.entity]:e;this._lastStateObj=s;let r=i?t.entity:this.config.entity;if(this._lastSourceKey!==r&&(this._lastSourceKey=r,this.sonosBridge?.log(i?`player state \u2190 ${t.entity} (LOCAL Sonos entity)`:`player state \u2190 ${this.config.entity} (SpotifyPlus)`)),!s){console.warn("[PlayerController] Entity not found in HASS:",this.config.entity);return}let n=s.attributes,o=t.isSonos?e?.attributes?.source||n.friendly_name||null:n.source||null,c=o?this.api?.deviceManager?.displayName(e?.attributes?.sp_device_id,o)??o:null,d=this._calculateEffectiveTrack(s);d?.id&&d.id!==this._likedCheckId&&(this._likedCheckId=d.id,this.checkTrackFavorites(d.id));let p=!n.media_title&&this._transferHoldActive(),u=this._optimisticTrack||p?!0:s.state==="playing",g={track:d,isPlaying:u,isShuffle:n.shuffle===!0,isLiked:this.state.isLiked,volume:(n.volume_level||0)*100,isMuted:n.is_volume_muted||!1,activeDevice:c,queue:this.state.queue,recentTracks:this.state.recentTracks},f=n.media_content_id||n.media_title;if(this._lastTrackId!==f&&(this._lastTrackId=f,this.state.queue.length===0?this.refreshQueue():this._debounceRefreshQueue(),this.refreshRecent(),this._preloadNeighborArt()),this._optimisticTrack){let h=this._optimisticTrack.uri,m=this._optimisticTrack.name,x=kt(n.media_content_id)||n.media_content_id,v=n.media_title,y=h&&x&&x.includes(h)||m&&v===m,w=this._optimisticFromUri&&x&&x.includes(this._optimisticFromUri);y&&(this._richCurrent=this._optimisticTrack),(y||!w)&&(this._optimisticTrack=null,this._optimisticFromUri=null,this._queueBackup=null,this._optimisticTimer&&clearTimeout(this._optimisticTimer))}this._resyncEOSTimer(s),this._statesEqual(this.state,g)||(this.state=g,this.dispatchEvent(new CustomEvent("state-changed",{detail:this.state})))}_statesEqual(t,e){return t.isPlaying===e.isPlaying&&t.isShuffle===e.isShuffle&&t.isLiked===e.isLiked&&t.volume===e.volume&&t.isMuted===e.isMuted&&t.activeDevice===e.activeDevice&&t.queue===e.queue&&t.recentTracks===e.recentTracks&&this._tracksEqual(t.track,e.track)}_tracksEqual(t,e){return t===e?!0:!t||!e?!1:t.uri===e.uri&&t.id===e.id&&t.name===e.name&&t.duration_ms===e.duration_ms&&t.is_optimistic_match===e.is_optimistic_match&&t.artists?.[0]?.name===e.artists?.[0]?.name&&t.album?.images?.[0]?.url===e.album?.images?.[0]?.url}_calculateEffectiveTrack(t){let e=t.attributes;if(!e.media_title)return this._transferHoldActive()?this._transferHoldTrack:(this._richCurrent=null,this._transferHoldTrack=null,null);this._transferHoldTrack=null;let i=kt(e.media_content_id)||e.media_content_id,s=n=>n&&(n.uri===i||n.name===e.media_title);if(this._optimisticTrack){let n=this._optimisticTrack,o=n.uri&&i&&i.includes(n.uri)||n.name&&e.media_title===n.name,c=this._optimisticFromUri&&i&&i.includes(this._optimisticFromUri);if(o||c)return{...n,is_optimistic_match:!0}}if(this._richCurrent&&s(this._richCurrent))return this._richCurrent;let r=this.state.queue.find(n=>s(n));if(!r){let n=this.state.recentTracks.find(o=>s(o)||o.track&&s(o.track));n&&(r=n.track||n)}return!r&&this._cachedApiQueue?.currently_playing&&s(this._cachedApiQueue.currently_playing)&&(r=this._cachedApiQueue.currently_playing),r||(r={name:e.media_title,artists:[{name:e.media_artist}],album:{name:e.media_album_name,images:[{url:e.entity_picture}]},duration_ms:e.media_duration*1e3,id:Jt(i)?.id||null,uri:i}),this._richCurrent=r,r}async refreshQueue(){if(!this.api)return;let t=this._sonosContext();if(t.isSonos&&t.entity)return this._refreshSonosQueue(t.entity);let e=++this._queueFetchId;try{let i=await this.api.fetchSpotifyPlus("get_player_queue_info");if(e!==this._queueFetchId)return;i&&i.result&&(this._cachedApiQueue=i.result,this.state.queue=i.result.queue||[],this._updateStateFromHass())}catch(i){console.error("[PlayerController] Queue fetch failed",i)}}async _refreshSonosQueue(t){let e=++this._queueFetchId;try{let i=await this.sonosBridge.getQueue(t);if(e!==this._queueFetchId||!Array.isArray(i))return;let s=this.hass?.states?.[t]?.attributes||{},r=Number.isInteger(s.queue_position)?s.queue_position:-1;if(r<0){let n=this.state.track?.uri||this._lastStateObj?.attributes?.media_content_id;r=n?i.findIndex(o=>o.uri===n):-1}this._sonosQueueBase=r>=0?r+1:0,this._cachedSonosQueue=i,this.state={...this.state,queue:i.slice(this._sonosQueueBase)},this.dispatchEvent(new CustomEvent("state-changed",{detail:this.state})),this._enrichSonosArt(e)}catch(i){console.error("[PlayerController] Sonos queue fetch failed",i)}}async _enrichSonosArt(t,e=30){if(!this.api?.getTrackArt)return;let s=(this.state.queue||[]).slice(0,e).filter(n=>n?.id&&!n.album?.images?.length);if(!s.length)return;let r=!1;await Promise.all(s.map(async n=>{let o=await this.api.getTrackArt(n.id);o&&(n.album={...n.album||{},images:[{url:o}]},r=!0)})),!(!r||t!==this._queueFetchId)&&(this.state={...this.state,queue:[...this.state.queue]},this.dispatchEvent(new CustomEvent("state-changed",{detail:this.state})))}async refreshRecent(){if(this.api)try{let t=await this.api.fetchSpotifyPlus("get_player_recent_tracks",{limit:30});if(t){let e=[];t.result&&t.result.items?e=t.result.items:t.items&&(e=t.items),this.state.recentTracks=e,this.dispatchEvent(new CustomEvent("state-changed",{detail:this.state}))}}catch(t){console.error("[PlayerController] Recent fetch failed",t)}}async checkTrackFavorites(t){if(!this.api||!t)return;let e=await this.api.checkTrackFavorites(t),i;if(typeof e=="boolean")i=e;else if(e&&typeof e=="object")i=e[t]===!0;else return;this.state.isLiked!==i&&(this.state={...this.state,isLiked:i},this.dispatchEvent(new CustomEvent("state-changed",{detail:this.state})))}async play(t){this.api&&await this.api.playMedia(t,"track")}async pause(){await this.api.togglePlayback(!this.state.isPlaying)}async next(){await this.api.fetchSpotifyPlus("player_media_next_track")}async prev(){await this.api.fetchSpotifyPlus("player_media_previous_track")}async setVolume(t){await this.api.setVolume(t)}async toggleShuffle(){await this.api.fetchSpotifyPlus("player_shuffle",{state:!this.state.isShuffle},!1)}async toggleLike(){let t=this.state.track;!t||!t.id||(this.state={...this.state,isLiked:!this.state.isLiked},this.dispatchEvent(new CustomEvent("state-changed",{detail:this.state})),this.state.isLiked?await this.api.saveTrackFavorites(t.id):await this.api.removeTrackFavorites(t.id),this.checkTrackFavorites(t.id))}async playTrackFromQueue(t){if(!this.api||!t||!t.uri)return;this._optimisticFromUri=this.state.track?.uri,this._optimisticTrack=t,this._queueFetchId++;let e=this.state.queue.findIndex(s=>s.uri===t.uri);e!==-1&&(this._queueBackup=[...this.state.queue],this.state.queue=this.state.queue.slice(e+1)),this._optimisticTimer&&clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticTrack&&(this._optimisticTrack=null,this._optimisticFromUri=null,this._queueBackup&&(this.state.queue=this._queueBackup,this._queueBackup=null),this.dispatchEvent(new CustomEvent("state-changed",{detail:this.state})))},8e3),this.dispatchEvent(new CustomEvent("state-changed",{detail:this.state}));let i=this._sonosContext();if(i.isSonos&&i.entity&&e!==-1){await this.sonosBridge.playQueuePosition(i.entity,this._sonosQueueBase+e);return}await this._playTrackInContext(t)}async _playTrackInContext(t){if(!this.api||!t||!t.uri)return;let e=this._sonosContext();if(e.isSonos&&e.entity&&Array.isArray(this._cachedSonosQueue)){let o=this._cachedSonosQueue.findIndex(c=>c.uri===t.uri);if(o!==-1){await this.sonosBridge.playQueuePosition(e.entity,o);return}}let s=this.hass?.states?.[this.config?.entity]?.attributes||{},r=s.sp_context_uri||s.media_playlist;if(r&&(r.includes(":playlist:")||r.includes(":album:")||r.includes(":collection"))){let o=await this.api.fetchSpotifyPlus("player_media_play_context",{context_uri:r,offset_uri:t.uri},!1);if(o&&o.success!==!1){this.api.triggerScan();return}}await this.api.playMedia(t.uri,"track")}peekNext(){return this.state.queue&&this.state.queue[0]||null}peekPrev(){if(Array.isArray(this._cachedSonosQueue)&&this._sonosContext().isSonos){let e=this._cachedSonosQueue[this._sonosQueueBase-2];if(e)return e}let t=this.state.track?.uri;for(let e of this.state.recentTracks||[]){let i=e.track||e;if(i&&i.uri&&i.uri!==t)return i}return null}_currentPositionSec(){return O(this._lastStateObj)}_preloadNeighborArt(){[this.peekNext(),this.peekPrev()].forEach(t=>{let e=t?.album?.images?.[0]?.url;if(e){let i=new Image;i.src=e}})}_armOptimistic(t,e=null){this._optimisticTrack=t,this._optimisticFromUri=e,this._queueFetchId++,this._optimisticTimer&&clearTimeout(this._optimisticTimer),this._optimisticTimer=setTimeout(()=>{this._optimisticTrack=null,this._optimisticFromUri=null,this._queueBackup=null,this.refreshQueue(),this.refreshRecent()},8e3)}async skipNext(){let t=this.peekNext();if(t){let e=this.state.track;this.state={...this.state,track:t,queue:this.state.queue.slice(1),recentTracks:e?[{track:e},...this.state.recentTracks||[]]:this.state.recentTracks||[]},this._armOptimistic(t,e?.uri),this.dispatchEvent(new CustomEvent("state-changed",{detail:this.state})),this._preloadNeighborArt()}this.api&&(await this.api.fetchSpotifyPlus("player_media_next_track"),this.api.triggerScan?.())}async skipPrev({allowRestart:t=!1}={}){if(t&&this._currentPositionSec()>3){this.api&&await this.api.seek(0);return}let e=this.peekPrev();if(!e){this.api&&await this.api.seek(0);return}let i=this.state.track;this.state={...this.state,track:e,recentTracks:(this.state.recentTracks||[]).filter(s=>(s.track||s)?.uri!==e.uri),queue:i?[i,...this.state.queue||[]]:this.state.queue||[]},this._armOptimistic(e,i?.uri),this.dispatchEvent(new CustomEvent("state-changed",{detail:this.state})),this._preloadNeighborArt(),await this._playTrackInContext(e)}_debounceRefreshQueue(){this._refreshTimer&&clearTimeout(this._refreshTimer),this._refreshTimer=setTimeout(()=>this.refreshQueue(),1e3)}_resyncEOSTimer(t){if(this._eosTimer&&(clearTimeout(this._eosTimer),this._eosTimer=null),t.state!=="playing")return;let e=t.attributes.media_position,i=t.attributes.media_duration;if(e===void 0||i===void 0)return;let s=i-O(t);if(s<=0){this._eosTimer=setTimeout(()=>this.refreshQueue(),300);return}let r=s*1e3+300;r>0&&r<36e5&&(this._eosTimer=setTimeout(()=>this.refreshQueue(),r))}};var _r="/local/spotify-browser-fonts",xr=[["Book",400],["Medium",500],["Bold",700],["Black",900]];function $s(){if(typeof document>"u"||document.getElementById("spf-circular-font"))return;let a=document.createElement("style");a.id="spf-circular-font",a.textContent=xr.map(([t,e])=>`
        @font-face {
            font-family: 'Circular Std';
            font-weight: ${e};
            font-style: normal;
            font-display: swap;
            src: url('${_r}/CircularStd-${t}.woff2') format('woff2');
        }`).join(`
`),document.head.appendChild(a)}var oi=class extends b{static get properties(){return{hass:{type:Object},config:{type:Object},api:{type:Object},_isOpen:{type:Boolean},_entered:{type:Boolean,state:!0},_currentPageId:{type:String},_currentPageData:{type:Object},_searchVisible:{type:Boolean},_menuVisible:{type:Boolean},_queueVisible:{type:Boolean},_devicePopupVisible:{type:Boolean},_accountSheetVisible:{type:Boolean,state:!0},_currentProfileImg:{type:String,state:!0},_ctxMenuVisible:{type:Boolean,state:!0},_ctxMenuHeader:{type:Object,state:!0},_ctxMenuItems:{type:Array,state:!0},_ctxMenuAnchor:{type:Object,state:!0},_playlistPickerVisible:{type:Boolean,state:!0},_playlistPickerTrack:{type:Object,state:!0},_playlistDialogVisible:{type:Boolean,state:!0},_playlistDialogProps:{type:Object,state:!0},_devices:{type:Array},_currentSearchQuery:{type:String},_isDesktop:{type:Boolean,state:!0},_reorderVisible:{type:Boolean,state:!0},_pinnedItems:{type:Array,state:!0},_deviceManagerVisible:{type:Boolean,state:!0},_showRevealButton:{type:Boolean,state:!0},_playerState:{type:Object,state:!0},_nowPlayingVisible:{type:Boolean,state:!0},_connectPanelVisible:{type:Boolean,state:!0},_connectLoading:{type:Boolean,state:!0},_mobileQueueVisible:{type:Boolean,state:!0}}}static get styles(){return $}constructor(){super(),this.router=null,this._isOpen=!1,this._entered=!1,this.hass=null,this.config={},this.api=null,this.playerController=null,this._lastCloseTime=0,this._lastActivityTime=0,this._idleCheckTimer=null,this._currentPageId="home",this._currentPageData=null,this._searchVisible=!1,this._menuVisible=!1,this._queueVisible=!1,this._devicePopupVisible=!1,this._accountSheetVisible=!1,this._currentProfileImg="",this._ctxMenuVisible=!1,this._ctxMenuHeader=null,this._ctxMenuItems=null,this._ctxMenuAnchor=null,this._menuTrack=null,this._menuContext=null,this._menuOnAction=null,this._playlistPickerVisible=!1,this._playlistPickerTrack=null,this._playlistDialogVisible=!1,this._playlistDialogProps=null,this._devices=[],this._reorderVisible=!1,this._pinnedItems=[],this._deviceManagerVisible=!1,this._showRevealButton=!1,this._queueInitDone=!1,this._playerState=null,this._nowPlayingVisible=!1,this._pendingNowPlaying=!1,this._pendingNowPlayingTimer=null,this._connectPanelVisible=!1,this._connectLoading=!1,this._mobileQueueVisible=!1,this._onPlayerStateChange=this._onPlayerStateChange.bind(this),this._onDragStart=this._onDragStart.bind(this),this._onDragMove=this._onDragMove.bind(this),this._onDragEnd=this._onDragEnd.bind(this),this._headerAlpha=1,this._headerTitle="",this._headerTitleOpacity=0,this._isDesktop=window.matchMedia("(min-width: 769px)").matches}shouldUpdate(t){if(t.has("hass")){let e=t.get("hass"),i=this.hass;if(!e||!i)return!0;if(this.config&&this.config.entity){let r=e.states[this.config.entity],n=i.states[this.config.entity];if(r!==n)return!0}let s=this.config?.storage?.sensor;if(s&&e.states[s]!==i.states[s])return!0;if(t.size===1)return!1}return!0}firstUpdated(t){$s();let e=this.shadowRoot.querySelector(".page-container");this.router=new ee(this,e,this.config),this._mediaQuery=window.matchMedia("(min-width: 769px)"),this._onMediaQueryChange=i=>{this._isDesktop=i.matches,this._isDesktop?this._stopMiniPlayerProgressTimer():this._playerState?.isPlaying&&this._startMiniPlayerProgressTimer()};try{this._mediaQuery.addEventListener("change",this._onMediaQueryChange)}catch{this._mediaQuery.addListener(this._onMediaQueryChange)}this._isDesktop=this._mediaQuery.matches,this._onOrientation=()=>setTimeout(()=>this._captureAppHeight(),250),window.addEventListener("orientationchange",this._onOrientation),this._onViewportResize=()=>this._updateAppHeight(),window.visualViewport?.addEventListener("resize",this._onViewportResize),window.addEventListener("resize",this._onViewportResize),this._windowBlurredAt=0,this._onAppVisibility=()=>{document.hidden?this._handleAppBackgrounded():this._handleAppForegrounded()},this._onPageHide=()=>this._handleAppBackgrounded(),this._onWindowBlur=()=>{this._windowBlurredAt=Date.now()},this._onWindowFocus=()=>{document.hidden||!this._windowBlurredAt||Date.now()-this._windowBlurredAt<5e3||(this._windowBlurredAt=0,this._handleAppForegrounded())},document.addEventListener("visibilitychange",this._onAppVisibility),window.addEventListener("pagehide",this._onPageHide),window.addEventListener("blur",this._onWindowBlur),window.addEventListener("focus",this._onWindowFocus),this._onUserActivity=i=>{i.isTrusted&&(this._lastActivityTime=Date.now())};for(let i of["pointerdown","keydown","wheel","touchmove"])this.addEventListener(i,this._onUserActivity,{capture:!0,passive:!0});this.router.addEventListener("route-changed",i=>{let{pageId:s,data:r,isHeroPage:n,direction:o}=i.detail;if(this._headerAlpha=n?0:1,this._headerTitle="",this._headerTitleOpacity=0,this.router&&this.router.pageCache.has(s)){let c=this.router.pageCache.get(s);setTimeout(()=>{typeof c.updateHeaderState=="function"&&c.updateHeaderState()},0)}s!=="search"&&(this._searchVisible=!1),this._currentPageId=s,this._currentPageData=r,this.requestUpdate()}),this.router.addEventListener("header-scroll",i=>{this._headerAlpha=i.detail.alpha,this._headerTitle=i.detail.title,this._headerTitleOpacity=i.detail.textAlpha,this.requestUpdate()}),this._initApi()}disconnectedCallback(){if(super.disconnectedCallback(),this.playerController&&this.playerController.removeEventListener("state-changed",this._onPlayerStateChange),this._stopMiniPlayerProgressTimer(),this._onOrientation&&window.removeEventListener("orientationchange",this._onOrientation),this._onViewportResize&&(window.visualViewport?.removeEventListener("resize",this._onViewportResize),window.removeEventListener("resize",this._onViewportResize)),this._mediaQuery&&this._onMediaQueryChange)try{this._mediaQuery.removeEventListener("change",this._onMediaQueryChange)}catch{this._mediaQuery.removeListener(this._onMediaQueryChange)}if(this._onAppVisibility&&document.removeEventListener("visibilitychange",this._onAppVisibility),this._onPageHide&&window.removeEventListener("pagehide",this._onPageHide),this._onWindowBlur&&window.removeEventListener("blur",this._onWindowBlur),this._onWindowFocus&&window.removeEventListener("focus",this._onWindowFocus),this._onUserActivity)for(let t of["pointerdown","keydown","wheel","touchmove"])this.removeEventListener(t,this._onUserActivity,{capture:!0});this._stopIdleWatch(),this._restoreViewport()}_applyKeyboardOverlayViewport(){let t=document.querySelector('meta[name="viewport"]');if(!t)return;this._origViewport==null&&(this._origViewport=t.getAttribute("content")||"");let e=this._origViewport.replace(/,?\s*interactive-widget\s*=\s*[^,]*/i,"").replace(/^\s*,|,\s*$/g,"").trim();t.setAttribute("content",`${e}, interactive-widget=overlays-content`)}_restoreViewport(){if(this._origViewport==null)return;let t=document.querySelector('meta[name="viewport"]');t&&t.setAttribute("content",this._origViewport),this._origViewport=null}_captureAppHeight(){let t=Math.round(window.innerHeight);t&&(this._fullVH=t),this._updateAppHeight()}_updateAppHeight(){if(!this._isOpen)return;let t=this._fullVH||Math.round(window.innerHeight),e=this.shadowRoot?.querySelector(".browser-wrapper");if(!this._isDesktop){this.style.setProperty("--spf-app-height",t+"px");return}Math.round(window.innerHeight)<t-120?(this.style.setProperty("--spf-app-height",t+"px"),e?.classList.add("kb-open")):(this.style.removeProperty("--spf-app-height"),e?.classList.remove("kb-open"))}updated(t){if(this._initApi(),this._ensureManagers(),t.has("hass")&&this.hass&&(this.api&&this.api.updateHass(this.hass),this.storageManager&&this.storageManager.updateHass(this.hass),this.deviceManager&&this.deviceManager.updateHass(this.hass),this.sonosBridge&&this.sonosBridge.setHass(this.hass),this.pinnedManager&&this.pinnedManager.updateHass(this.hass),this.playerController&&this.playerController.updateHass(this.hass),this.router&&this.router.updateDependencies({hass:this.hass})),t.has("api")&&this.api&&(this.router&&this.router.updateDependencies({api:this.api}),this._loadProfileImage()),t.has("config")&&this.config&&(Wi(this.config.browser.debug===!0),this.router&&this.router.updateDependencies({config:this.config}),!this._queueInitDone&&this._isDesktop&&(this.config.queue.open_on_desktop&&(this._queueVisible=!0),this._queueInitDone=!0)),t.has("_isOpen"))if(this._isOpen){this._applyKeyboardOverlayViewport(),this._captureAppHeight(),requestAnimationFrame(()=>requestAnimationFrame(()=>{this._isOpen&&(this._entered=!0)}));let e=this.shadowRoot.querySelector(".page-container");this.router&&e&&(this.router.container=e);let i=this.config.browser.home_on_exit,s=i.enabled!==!1;s&&i.timeout>0&&this._lastCloseTime&&(Date.now()-this._lastCloseTime)/1e3<i.timeout&&(s=!1),s&&this.router.resetToHome(),this._currentPageId&&this.router&&this.router.navigateTo(this._currentPageId,this._currentPageData,"none"),this._refreshAfterReturn(),this._lastActivityTime=Date.now(),this._startIdleWatch()}else this._entered=!1,this._lastCloseTime=Date.now(),this._closeAllPopups(),this._stopIdleWatch(),this._restoreViewport(),this.style.removeProperty("--spf-app-height"),this.shadowRoot?.querySelector(".browser-wrapper")?.classList.remove("kb-open");(t.has("_searchVisible")||t.has("_currentPageId"))&&(this._searchCloseTimer&&(clearTimeout(this._searchCloseTimer),this._searchCloseTimer=null),this._searchVisible&&this._currentPageId!=="search"&&(this._searchCloseTimer=setTimeout(()=>{this._searchVisible=!1},3e4)))}open(t={}){this._isOpen=!0,t.nowPlaying&&!this._isDesktop&&(this._pendingNowPlaying=!0,this._maybeShowPendingNowPlaying(),clearTimeout(this._pendingNowPlayingTimer),this._pendingNowPlayingTimer=setTimeout(()=>{this._pendingNowPlaying=!1},2500))}_maybeShowPendingNowPlaying(){!this._pendingNowPlaying||!this._playerState?.track||(this._pendingNowPlaying=!1,clearTimeout(this._pendingNowPlayingTimer),requestAnimationFrame(()=>requestAnimationFrame(()=>{this._nowPlayingVisible=!0})))}render(){if(!this.config||!this.hass||!this._isOpen)return l``;let t="";if(this._isDesktop){let e=this.config.appearance.desktop;if(e.fullscreen||e.mode==="fullscreen"){let i=e.margin_top||"0px",s=e.margin_bottom||"0px",r=e.margin_left||"0px",n=e.margin_right||"0px";t=`
                    position: fixed;
                    top: ${i};
                    left: ${r};
                    width: calc(100vw - ${r} - ${n});
                    height: calc(100vh - ${i} - ${s});
                    max-width: none;
                    max-height: none;
                    border-radius: ${parseInt(i)>0||parseInt(r)>0?"16px":"0"};
                    transform: none !important; /* Override CSS centering transform */
                `}else e.mode==="fixed"&&(t=`
                    width: ${e.width};
                    height: ${e.height};
                    max-width: none;
                    max-height: none;
                `)}return l`
            <div class="backdrop ${this._entered?"open":""}" @click=${()=>this._animateClose()}></div>
            <div class="browser-wrapper ${this._entered?"open":""} ${this._queueVisible?"queue-open":""} anim-${this.config.appearance.animations.browser_open} ${this.config.appearance.animations.blur?"":"no-blur"}"
                style="${t}"
                @show-toast=${this._handleShowToast}
                @show-alert=${this._handleShowAlert}
                @open-reorder=${this._handleOpenReorder}
                @pinned-changed=${this._handlePinnedChanged}
                @open-track-menu=${this._handleOpenTrackMenu}
                @open-context-menu=${this._handleOpenContextMenu}
                @open-playlist-dialog=${this._handleOpenPlaylistDialog}
                @playlist-changed=${this._handlePlaylistChanged}
            >
                ${!this._isDesktop&&(this._currentPageId==="search"||this._currentPageId==="library")?"":l`
                <spotify-header
                    .minimal=${!this._isDesktop}
                    @pointerdown=${this._isDesktop?null:this._onDragStart}
                    .backButtonVisible=${this.router&&this.router.history.length>0}
                    .searchVisible=${this._currentPageId==="search"||this._searchVisible}
                    .menuVisible=${this._menuVisible}
                    .transparent=${this._headerAlpha<1}
                    .scrollAlpha=${this._headerAlpha}
                    .centerTitle=${this._headerTitle}
                    .titleOpacity=${this._headerTitleOpacity}
                    .searchQuery=${this._currentSearchQuery||""}
                    .avatarVisible=${this._currentPageId==="home"}
                    .avatarUrl=${this._resolveAvatar()}
                    .avatarSwitchable=${this.config.accounts.length>1}
                    @avatar-click=${this._handleAvatarClick}
                    @back-click=${()=>this.router.goBack()}
                    @logo-click=${()=>{this.router.resetToHome(),this._menuVisible=!1}}
                    @search-toggle-click=${()=>{this._handleSearchToggleClick(),this._menuVisible=!1}}
                    @search-input=${this._handleSearchInput}
                    @search-keydown=${this._handleSearchKeydown}
                    @queue-click=${()=>{this._queueVisible=!this._queueVisible,this._menuVisible=!1}}
                    @menu-click=${this._handleMenuClick}
                    @close-click=${()=>this._isOpen=!1}
                    @collapse-click=${()=>this._animateClose()}
                    @close-menu=${()=>this._menuVisible=!1}
                    @menu-item-click=${this._handleMenuItemClick}
                >
                </spotify-header>
                `}

                <div class="page-container ${this.router?.isHeroPage(this._currentPageId)?"has-hero":""}">
                </div>

                <spotify-sidebar-player
                    .hass=${this.hass}
                    .api=${this.api}
                    .config=${this.config}
                    .visible=${this._queueVisible}
                    .deviceManager=${this.deviceManager}
                    .playerController=${this.playerController}
                    @navigate=${this._handleNavigate}
                    @close-queue=${()=>this._queueVisible=!1}
                    @open-manager=${()=>{this._queueVisible=!1,this._devicePopupVisible=!1,this._deviceManagerVisible=!0}}
                ></spotify-sidebar-player>

                <spotify-reorder-dialog
                    .visible=${this._reorderVisible}
                    .items=${this._pinnedItems||[]}
                    .allowBlur=${this.config.appearance.animations.blur}
                    @close=${()=>this._reorderVisible=!1}
                    @reorder=${this._handleReorderSave}
                    @delete-item=${this._handleReorderDelete}
                    @add-custom-uri=${this._handleAddCustomUri}
                    @reset-pinned-items=${this._handleResetPinnedItems}
                ></spotify-reorder-dialog>

               <spotify-popup-devicemanager
                    .hass=${this.hass}
                    .deviceManager=${this.deviceManager}
                    .api=${this.api}
                    .visible=${this._deviceManagerVisible}
                    @close-dialog=${()=>{this._deviceManagerVisible=!1,this._pendingDeviceResolution&&(this._pendingDeviceResolution(null),this._pendingDeviceResolution=null)}}
                ></spotify-popup-devicemanager>

                <spotify-popups
                    id="popups"
                    .devices=${this._devices}
                    .config=${this.config}
                    .deviceVisible=${this._devicePopupVisible}
                    .canManageDevices=${!!this.deviceManager}
                    .showRevealButton=${this._showRevealButton}
                    .blur=${this.config.appearance.animations.blur}
                    @close-popups=${()=>{this._devicePopupVisible=!1,this._pendingDeviceResolution&&(this._pendingDeviceResolution(null),this._pendingDeviceResolution=null)}}
                    @device-selected=${this._handleDeviceSelected}
                    @reveal-all-devices=${this._handleRevealAllDevices}
                    @toggle-hidden-devices=${this._handleToggleHiddenDevices}
                    @refresh-devices=${this._handleRefreshDevices}
                    @open-manager=${()=>{this._devicePopupVisible=!1,this._deviceManagerVisible=!0}}
                ></spotify-popups>

                <spotify-context-menu
                    .visible=${this._ctxMenuVisible}
                    .header=${this._ctxMenuHeader}
                    .items=${this._ctxMenuItems||[]}
                    .anchor=${this._ctxMenuAnchor}
                    @action=${this._handleMenuAction}
                    @close=${()=>{this._ctxMenuVisible=!1}}
                ></spotify-context-menu>

                <spotify-playlist-picker
                    .visible=${this._playlistPickerVisible}
                    .api=${this.api}
                    .track=${this._playlistPickerTrack}
                    @close=${()=>{this._playlistPickerVisible=!1}}
                    @open-playlist-dialog=${e=>{e.stopPropagation(),this._playlistPickerVisible=!1,this._handleOpenPlaylistDialog(e)}}
                ></spotify-playlist-picker>

                <spotify-playlist-create-sheet
                    .visible=${this._playlistDialogVisible}
                    .api=${this.api}
                    .dialogProps=${this._playlistDialogProps}
                    @close=${()=>{this._playlistDialogVisible=!1}}
                    @playlist-created=${this._handlePlaylistCreated}
                ></spotify-playlist-create-sheet>

                <spotify-account-panel
                    .visible=${this._accountSheetVisible}
                    .accounts=${this.config.accounts}
                    .activeEntity=${this.config.entity}
                    .currentImage=${this._currentProfileImg}
                    @close=${()=>{this._accountSheetVisible=!1}}
                    @account-selected=${this._handleAccountSelected}
                ></spotify-account-panel>

                ${!this._isDesktop&&this._playerState&&this._playerState.track?l`
                    <div class="mobile-mini-player" @click=${this._handleMiniPlayerClick}>
                        <div class="mini-player-art" style="${this._playerState.track?.album?.images?.[0]?.url?`background-image: url('${this._playerState.track.album.images[0].url}')`:""}"></div>
                        <div class="mini-player-info">
                            <div class="mini-player-title">
                                ${this._playerState.track?.name||"Unknown Track"}
                                ${this._playerState.track?.artists?.length?l`<span class="mini-player-sep"> • </span><span class="mini-player-artist-inline">${this._playerState.track.artists.map(e=>e.name).join(", ")}</span>`:""}
                            </div>
                            ${this._playerState.activeDevice?l`
                                <div class="mini-player-device-line" @click=${this._handleMiniDeviceClick}>
                                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm0-4v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11zm20-7H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
                                    <span>${this._playerState.activeDevice}</span>
                                </div>
                            `:""}
                        </div>
                        <button class="mini-player-device-btn ${this._playerState.activeDevice?"connected":""}" @click=${this._handleMiniDeviceClick} aria-label="Connect to a device">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="6" y="2" width="12" height="20" rx="2.5"/>
                                <circle cx="12" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
                                <circle cx="12" cy="14.5" r="3.2"/>
                            </svg>
                        </button>
                        <button class="mini-player-play-btn" @click=${this._handleMiniPlayerPlayPause}>
                            <svg viewBox="0 0 24 24">
                                <path fill="currentColor" d="${this._playerState.isPlaying?"M6 19h4V5H6v14zm8-14v14h4V5h-4z":"M8 5v14l11-7z"}"/>
                            </svg>
                        </button>
                        <div class="mini-player-progress">
                            <div class="mini-player-progress-bar" id="mini-player-progress-bar"></div>
                        </div>
                    </div>
                `:""}

                ${this._isDesktop?"":l`
                    <spotify-now-playing-mobile
                        .visible=${this._nowPlayingVisible}
                        .hass=${this.hass}
                        .config=${this.config}
                        .api=${this.api}
                        .playerController=${this.playerController}
                        .state=${this._playerState}
                        @close=${()=>this._nowPlayingVisible=!1}
                        @open-devices=${()=>this._openConnectPanel()}
                        @open-queue=${()=>this._openMobileQueue()}
                    ></spotify-now-playing-mobile>

                    <spotify-connect-panel
                        .visible=${this._connectPanelVisible}
                        .devices=${this._devices}
                        .state=${this._playerState}
                        .loading=${this._connectLoading}
                        @close=${()=>this._connectPanelVisible=!1}
                        @device-selected=${this._handleConnectDeviceSelected}
                        @volume-change=${e=>this.api?.setVolume(e.detail)}
                        @open-manager=${()=>{this._connectPanelVisible=!1,this._deviceManagerVisible=!0}}
                    ></spotify-connect-panel>

                    <spotify-queue-panel
                        .visible=${this._mobileQueueVisible}
                        .hass=${this.hass}
                        .config=${this.config}
                        .state=${this._playerState}
                        .playerController=${this.playerController}
                        @close=${()=>this._mobileQueueVisible=!1}
                    ></spotify-queue-panel>
                `}

                ${this._isDesktop?"":l`
                    <div class="mobile-bottom-nav">
                        <div class="nav-tab ${this._currentPageId==="home"?"active":""}" @click=${()=>this._handleNavTabClick("home")}>
                            <svg viewBox="0 0 24 24">
                                <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                            </svg>
                            <span>Home</span>
                        </div>
                        <div class="nav-tab ${this._currentPageId==="search"?"active":""}" @click=${()=>this._handleNavTabClick("search")}>
                            <svg viewBox="0 0 24 24">
                                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                            </svg>
                            <span>Search</span>
                        </div>
                        <div class="nav-tab ${this._currentPageId==="library"?"active":""}" @click=${()=>this._handleNavTabClick("library")}>
                            <svg viewBox="0 0 24 24">
                                <path fill="currentColor" d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0-2-.9-2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/>
                            </svg>
                            <span>Your Library</span>
                        </div>
                    </div>
                `}
            </div>
        `}_handleSearchToggleClick(){this._searchVisible=!this._searchVisible,this._searchVisible&&this.shadowRoot.querySelector("spotify-header")?.focusOnOpen()}_handleSearchInput(t){let e=t.detail;this._currentSearchQuery=e,this._searchDebounceTimer&&clearTimeout(this._searchDebounceTimer),e&&(this._searchDebounceTimer=setTimeout(()=>{if(this._currentPageId==="search"){let i=this.router?.pageCache.get("search");i?i.search(e):this.router.navigateTo("search",{query:e})}else this.router.navigateTo("search",{query:e})},400))}_handleSearchKeydown(t){if(t.detail.key==="Enter"){let e=t.detail.value;this._searchDebounceTimer&&clearTimeout(this._searchDebounceTimer),e&&this.router.navigateTo("search",{query:e})}}_handleMenuClick(){this._menuVisible=!this._menuVisible}_ensureManagers(){if(this.hass){if(this.storageManager||(this.storageManager=new fe(this.hass,this.config?.storage),this._validateStorage()),!this.pinnedManager&&this.config?.home?.pinned?.enabled)try{this.pinnedManager=new he(this.hass,this.config,this.storageManager),this.router&&this.router.updateDependencies({pinned:this.pinnedManager})}catch(t){console.error("[SpotifyBrowser] Failed to initialize PinnedItemsManager",t)}if(!this.deviceManager&&this.config)try{this.deviceManager=new Pt(this.hass,this.config.devices,this.storageManager),this.api&&this.api.setDeviceManager(this.deviceManager)}catch(t){console.error("[SpotifyBrowser] Failed to initialize DeviceManager",t)}}}_validateStorage(){let t=this.storageManager.checkStatus();t==="empty"||t==="corrupted"&&!this._storageCorruptPrompted&&(this._storageCorruptPrompted=!0,setTimeout(()=>{this.dispatchEvent(new CustomEvent("show-alert",{detail:{id:"storage-corruption",title:"Storage Error",message:"Persistent storage data appears to be corrupted. Reset checks and saved items to defaults?",confirmText:"Reset Data",cancelText:"Ignore",onConfirm:()=>this.storageManager.resetStorage()},bubbles:!0,composed:!0}))},1e3))}_initApi(){this.api||!this.hass||!this.config.entity||(this.api=new te(this.hass,this.config.entity,this._handleDeviceResolution.bind(this),this.config.devices.volume,t=>{let e=this.shadowRoot.getElementById("popups");e&&e.showToast(t)},t=>{let e=this.shadowRoot.getElementById("popups"),i=St(t);if(i){e&&e.showToast(i.message,i.duration),i.reopenPicker&&this._openDevicePicker();return}let s=t.code||"",r=t.message||"";s==="service_validation_error"||r.includes("Validation error")?(e&&e.showToast("Device unavailable. Please select a player."),this._openDevicePicker()):e&&e.showToast(`Error: ${r}`)}),this.sonosBridge=new pe(this.hass,this.config.sonos),this.sonosBridge.onDegraded=t=>{let e=this.shadowRoot?.getElementById("popups");e&&e.showToast(t,6e3)},this.api.setSonosBridge(this.sonosBridge),this.deviceManager&&this.api.setDeviceManager(this.deviceManager),this.playerController=new ge(this.api),this.playerController.updateConfig(this.config),this.playerController.setSonosBridge(this.sonosBridge),this.playerController.addEventListener("state-changed",this._onPlayerStateChange),this._playerState=this.playerController.state,this.hass&&this.playerController.updateHass(this.hass),this._turnOnOffPlayers(),this.requestUpdate())}_turnOnOffPlayers(){let e=[...new Set([this.config.entity,...this.config.accounts.map(i=>i.entity)].filter(Boolean))].filter(i=>this.hass.states[i]?.state==="off");e.length&&this.hass.callService("media_player","turn_on",{entity_id:e}).catch(i=>console.warn("[SpotifyBrowser] Failed to turn on player(s):",e,i))}_playerAttributes(){return this.hass?.states[this.config?.entity]?.attributes||{}}async _scanDevices(t={}){if(this.deviceManager){this._devices=await this.deviceManager.fetchMergedDevices(this.api,this._playerAttributes(),t);let e=await this.deviceManager.getSettings();this._showRevealButton=!!(e.hide_connect_devices&&e.see_all_devices)}else{let e=await this.api.fetchSpotifyPlus("get_spotify_connect_devices",{refresh:!!t.refresh});this._devices=W(e).map(Q)}return this.requestUpdate(),this._devices}async _openDevicePicker(t={}){this._deviceManagerVisible=!1,this._devicePopupVisible=!0;let e=this.shadowRoot.getElementById("popups");e&&t.refresh&&e.showToast("Scanning for devices...");try{await this._scanDevices(t)}catch(i){console.error("[App] Failed to load devices for picker",i),e&&e.showToast("Failed to scan devices.")}}async _handleDeviceResolution(){if(this.deviceManager){let e=(await this.deviceManager.getDevices()).find(i=>i.is_default);if(e)return q("Using Default Device from Manager:",e.name),e}return new Promise(t=>{this.deviceManager&&this.deviceManager.getMergedDevices([],this._playerAttributes()).then(i=>{this._devices=i,this.requestUpdate()}),this._deviceManagerVisible=!1,this._devicePopupVisible=!0,this._pendingDeviceResolution=t;let e=this.shadowRoot.getElementById("popups");e&&e.showToast("Scanning for devices..."),this._scanDevices({refresh:!0}).catch(i=>{console.error("[App] Device scan failed",i)})})}_handleDeviceSelected(t){if(this._pendingDeviceResolution){this._pendingDeviceResolution(t.detail),this._pendingDeviceResolution=null,this._deviceManagerVisible=!1,this._devicePopupVisible=!1;let e=this.shadowRoot.getElementById("popups");e&&e.showToast(`Connecting to ${t.detail.name}...`)}else{this._devicePopupVisible=!1,this._deviceManagerVisible=!1;let e=this.shadowRoot.getElementById("popups"),i=this.api.hasPendingPlay();e&&e.showToast(i?`Starting playback on ${t.detail.name}...`:`Transferring playback to ${t.detail.name}`),this.playerController?.beginTransferHold(),this.api.transferPlayback(t.detail).then(s=>{!s.success&&!s.reported&&e&&e.showToast(`Transfer to ${t.detail.name} failed`)})}}async _handleMenuItemClick(t){if(this._menuVisible=!1,this.api||this._initApi(),!!this.api)switch(t.detail){case"menu-device":this._openDevicePicker({refresh:!0});break;case"menu-accounts":this._accountSheetVisible=!0;break;case"menu-library":this.router.navigateTo("library");break}}switchAccount(t){!t||t===this.config.entity||(this.config={...this.config,entity:t},this.pinnedManager&&(this.pinnedManager.updateConfig(this.config),this.pinnedManager.setAccount(t)),this.api&&this.api.destroy(),this.api=null,this.deviceManager&&this.deviceManager.clearVolumeCapabilities(),this.playerController&&(this.playerController.removeEventListener("state-changed",this._onPlayerStateChange),this.playerController.destroy()),this.playerController=null,this._initApi(),this.router&&(this.router.updateDependencies({api:this.api,config:this.config}),this.router.clearCache(),this.router.navigateTo("home")),pt.clearAll(),this._handlePinnedChanged())}_handleAccountSelected(t){this.switchAccount(t.detail.entity),this._accountSheetVisible=!1}_resolveAvatar(){return(this.config?.accounts||[]).find(i=>i.entity===this.config?.entity)?.image||this._currentProfileImg||""}_handleAvatarClick(){this.config.accounts.length>1&&(this._accountSheetVisible=!0)}async _loadProfileImage(){let t=this.config?.entity;if(!(!this.api||!t||this._profileImgFor===t)){this._profileImgFor=t,this._currentProfileImg="";try{let i=(await this.api.getCurrentUserProfile())?.images?.[0]?.url;i&&this.config?.entity===t&&(this._currentProfileImg=i)}catch{}}}_handleMenuAction(t){let e=t.detail,i=this._menuTrack,s=this._menuContext,r=this._menuOnAction;if(this._ctxMenuVisible=!1,r){r(e);return}switch(e){case"tm-queue":this.api.addToQueue(i.uri);break;case"tm-artist":this._nowPlayingVisible=!1,this._mobileQueueVisible=!1,this._navigateToTrackArtist(i);break;case"tm-add-playlist":this._playlistPickerTrack=i,this._playlistPickerVisible=!0;break;case"tm-remove-from-playlist":this._removeTrackFromPlaylist(i,s);break;case"tm-goto-queue":this._isDesktop?this._queueVisible=!0:this._openMobileQueue();break;case"tm-goto-context":{let n=(s?.sourceUri||"").split(":"),o=n[n.length-2],c=n[n.length-1];(o==="playlist"||o==="album")&&c&&(this._nowPlayingVisible=!1,this._mobileQueueVisible=!1,this.router.navigateTo(`${o}:${c}`));break}}}async _removeTrackFromPlaylist(t,e){let i=e?.playlistId;if(!i||!t?.uri||!this.api)return;let s=this.shadowRoot.getElementById("popups"),r=async()=>{(await this.api.removePlaylistItems(i,[t.uri],e?.snapshotId)).success?(s&&s.showToast(`Removed "${t.name}" from playlist`),this._handlePlaylistChanged({detail:{playlistId:i,action:"items"}})):s&&s.showToast("Couldn't remove track from playlist")};if((e.uriCount||1)>1){s&&s.showAlert("Remove all copies?",`"${t.name}" appears ${e.uriCount} times in this playlist. Spotify removes every copy at once.`,r,"Remove All");return}r()}async _handlePlaylistChanged(t){let{playlistId:e,action:i,patch:s}=t.detail||{};if(!e)return;let r=`playlist:${e}`;if(pt.invalidate(r),i==="delete"){this.router?.currentPageId===r&&(this.router.history.length>0?this.router.goBack():this.router.resetToHome()),this.router?.dropPage(r);try{await this.pinnedManager?.remove(e),this._handlePinnedChanged()}catch{}}else{let o=this.router?.pageCache.get(r);o?.refresh&&o.refresh(s||null)}let n=this.router?.pageCache.get("library");n?.refresh&&n.refresh(),(i==="create"||i==="delete")&&this._refreshHomePinned()}_handleOpenPlaylistDialog(t){this._playlistDialogProps=t.detail||{mode:"create"},this._playlistDialogVisible=!0}_handlePlaylistCreated(t){let e=t.detail?.playlist;this._playlistDialogVisible=!1,e?.id&&(this._handlePlaylistChanged({detail:{playlistId:e.id,action:"create"}}),this.router?.navigateTo(`playlist:${e.id}`,{title:e.name}))}async _navigateToTrackArtist(t){let e=t?.artists?.[0]?.name||t?.artist?.split(",")[0]?.trim();if(!e){let i=this.shadowRoot.getElementById("popups");i&&i.showToast("Artist not found");return}try{let s=(await this.api.fetchSpotifyPlus("search_artists",{criteria:e,limit:1}))?.result?.items?.[0];if(s?.id){this.router.navigateTo(`artist:${s.id}`,{title:s.name});return}}catch{}this.router.navigateTo("search",{query:e})}_handleOpenTrackMenu(t){let e=t.detail||{};k("light"),this._menuTrack=e,this._menuContext=e.context||null,this._menuOnAction=null,this._ctxMenuHeader={image:e.image,name:e.name,subtitle:[e.artist,e.album].filter(Boolean).join(" \u2022 ")},this._ctxMenuItems=this._composeTrackMenuItems(e.context),this._ctxMenuAnchor=e.anchor||null,this._ctxMenuVisible=!0}_composeTrackMenuItems(t){let e=[{id:"tm-queue",label:"Add to Queue",icon:"queue"},{id:"tm-add-playlist",label:"Add to Playlist",icon:"playlist-add"},{id:"tm-artist",label:"Go to Artist",icon:"artist"}];if(t?.surface==="playlist"&&t.canEditItems&&e.push({id:"tm-remove-from-playlist",label:"Remove from this Playlist",icon:"minus-circle",danger:!0}),t?.surface==="nowplaying"&&e.push({id:"tm-goto-queue",label:"Go to Queue",icon:"queue-list"}),t?.surface==="nowplaying"||t?.surface==="queue"){let i=t.sourceUri||"";i.includes(":playlist:")?e.push({id:"tm-goto-context",label:"Go to Playlist",icon:"playlist"}):i.includes(":album:")&&e.push({id:"tm-goto-context",label:"Go to Album",icon:"album"})}return e}_handleOpenContextMenu(t){let{header:e,items:i,onAction:s,anchor:r}=t.detail||{};!e||!i||!i.length||(k("light"),this._menuTrack=null,this._menuContext=null,this._menuOnAction=s||null,this._ctxMenuHeader={image:e.image,name:e.name,subtitle:e.subtitle||e.artist,icon:e.icon},this._ctxMenuItems=i,this._ctxMenuAnchor=r||null,this._ctxMenuVisible=!0)}_handleShowToast(t){let e=this.shadowRoot.getElementById("popups");e&&e.showToast(t.detail.message,t.detail.duration)}_handleShowAlert(t){let e=this.shadowRoot.getElementById("popups");if(e){let{title:i,message:s,onConfirm:r,confirmText:n,cancelText:o,size:c}=t.detail;e.showAlert(i,s,r,n,o,c)}}_handlePinnedChanged(){this.pinnedManager&&(this.pinnedManager.getItems().then(t=>{this._pinnedItems=t}),this._refreshHomePinned())}_refreshHomePinned(){let t=this.router?.pageCache.get("home");t?.fetchSectionData&&t.fetchSectionData("pinned")}_handleOpenReorder(){this.pinnedManager&&this.pinnedManager.getItems().then(t=>{this._pinnedItems=t,this._reorderVisible=!0,this.requestUpdate()})}_handleReorderSave(t){let e=t.detail;if(!this.pinnedManager)return;Array.isArray(e)&&typeof e[0]=="object"&&(this._pinnedItems=e,this.requestUpdate());let i=this.pinnedManager.reorder(e);this._refreshHomePinned(),i.then(()=>{this._refreshHomePinned()}).catch(s=>{console.error("Reorder failed",s)})}async _handleAddCustomUri(t){let e=t.detail;if(!this.pinnedManager||!this.api)return;let i=this.shadowRoot.getElementById("popups");i&&i.showToast("Fetching item details...");let s=await this.pinnedManager.addByUri(this.api,e);s.success?(i&&i.showToast("Item pinned successfully"),this.pinnedManager.getItems().then(r=>{this._pinnedItems=r}),this._refreshHomePinned()):(console.error("Failed to add custom URI:",s.error),i&&i.showAlert("Failed to add item",s.error||"Unknown error (Check logs)",null,"OK",null,"medium"))}async _handleResetPinnedItems(){if(!this.pinnedManager)return;let t=this.shadowRoot.getElementById("popups");t&&t.showToast("Resetting pinned items...");let e=await this.pinnedManager.reset();e.success?(t&&t.showToast("Pinned items reset to default."),this.pinnedManager.getItems().then(i=>{this._pinnedItems=i}),this._refreshHomePinned()):(console.error("Reset failed",e.error),t&&t.showToast("Reset failed: "+e.error))}async _handleRefreshDevices(){this._openDevicePicker({refresh:!0})}async _handleToggleHiddenDevices(t){this._openDevicePicker({showHidden:t.detail.visible})}async _handleRevealAllDevices(){this._openDevicePicker({refresh:!0,showHidden:!0})}_handleReorderDelete(t){let e=t.detail;if(this.pinnedManager){this._pinnedItems=(this._pinnedItems||[]).filter(s=>s.id!==e);let i=this.pinnedManager.remove(e);this._refreshHomePinned(),i.then(s=>{if(s.success)this._refreshHomePinned();else{let r=this.shadowRoot.getElementById("popups");r&&r.showToast("Failed to remove item: "+(s.error||"Unknown"))}}).catch(s=>{console.error("Delete failed",s)})}}_handleNavigate(t){this.router&&this.router.navigateTo(t.detail.pageId,t.detail.data)}_onPlayerStateChange(t){this._playerState=t.detail,this._maybeShowPendingNowPlaying(),this._playerState?.isPlaying&&!this._isDesktop?this._startMiniPlayerProgressTimer():this._stopMiniPlayerProgressTimer()}_startMiniPlayerProgressTimer(){this._stopMiniPlayerProgressTimer(),this._miniPlayerProgressTimer=setInterval(()=>this._updateMiniPlayerProgress(),1e3),this._updateMiniPlayerProgress()}_stopMiniPlayerProgressTimer(){this._miniPlayerProgressTimer&&(clearInterval(this._miniPlayerProgressTimer),this._miniPlayerProgressTimer=null)}_updateMiniPlayerProgress(){if(this._isDesktop||!this.hass||!this.config?.entity)return;let t=this.hass.states[this.config.entity];if(!t)return;let e=this.shadowRoot.getElementById("mini-player-progress-bar");if(!e)return;let i=0,s=1;t.attributes.media_duration?(i=O(t),s=t.attributes.media_duration):this._playerState?.track?.duration_ms&&(s=this._playerState.track.duration_ms/1e3,i=(this._playerState.track.progress_ms||0)/1e3),i>s&&(i=s);let r=i/s*100;e.style.width=`${r}%`}_handleNavTabClick(t){this.router&&this._currentPageId!==t&&(t==="home"?this.router.resetToHome():this.router.navigateTo(t))}_handleMiniPlayerClick(t){t.target.closest(".mini-player-play-btn")||t.target.closest(".mini-player-device-btn")||(this._nowPlayingVisible=!0)}_handleMiniDeviceClick(t){t.stopPropagation(),k("light"),this._openConnectPanel()}_openMobileQueue(){this._mobileQueueVisible=!0,this.playerController?.refreshQueue(),this.playerController?.refreshRecent()}async _openConnectPanel(){this._connectPanelVisible=!0,this._connectLoading=!(this._devices&&this._devices.length);try{await this._scanDevices({refresh:!0})}catch(t){console.error("[App] Connect panel device scan failed",t)}finally{this._connectLoading=!1}}async _handleConnectDeviceSelected(t){let e=t.detail;this._connectPanelVisible=!1;let i=this.shadowRoot.getElementById("popups"),s=this.api?.hasPendingPlay();i&&i.showToast(s?`Starting playback on ${e.name}...`:`Transferring playback to ${e.name}`),this.playerController?.beginTransferHold();let r=await this.api?.transferPlayback(e);r&&!r.success&&!r.reported&&i&&i.showToast(`Transfer to ${e.name} failed`)}_onDragStart(t){this._isDesktop||(this._dragWrapper=this.shadowRoot.querySelector(".browser-wrapper"),this._dragWrapper&&(this._dragStartY=t.clientY,this._dragDelta=0,this._dragging=!0,this._dragWrapper.style.transition="none",window.addEventListener("pointermove",this._onDragMove,{passive:!1}),window.addEventListener("pointerup",this._onDragEnd),window.addEventListener("pointercancel",this._onDragEnd)))}_onDragMove(t){if(!this._dragging||!this._dragWrapper)return;this._dragDelta=Math.max(0,t.clientY-this._dragStartY),this._dragWrapper.style.transform=`translateY(${this._dragDelta}px)`;let e=this.shadowRoot.querySelector(".backdrop");e&&(e.style.opacity=String(Math.max(0,1-this._dragDelta/500)))}_onDragEnd(){if(!this._dragging)return;this._dragging=!1,window.removeEventListener("pointermove",this._onDragMove),window.removeEventListener("pointerup",this._onDragEnd),window.removeEventListener("pointercancel",this._onDragEnd);let t=this._dragWrapper,e=this.shadowRoot.querySelector(".backdrop");if(t)if(t.style.transition="transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",this._dragDelta>140){t.style.transform="translateY(100%)";let i=!1,s=()=>{i||(i=!0,this._isOpen=!1,t.style.transform="",t.style.transition="",e&&(e.style.opacity=""))};t.addEventListener("transitionend",s,{once:!0}),setTimeout(s,360)}else t.style.transform="",e&&(e.style.opacity=""),setTimeout(()=>{t&&(t.style.transition="")},320)}_closeAllPopups(){this._searchVisible=!1,this._menuVisible=!1,this._devicePopupVisible=!1,this._ctxMenuVisible=!1,this._ctxMenuHeader=null,this._ctxMenuItems=null,this._ctxMenuAnchor=null,this._menuTrack=null,this._menuContext=null,this._menuOnAction=null,this._playlistPickerVisible=!1,this._playlistPickerTrack=null,this._playlistDialogVisible=!1,this._playlistDialogProps=null,this._accountSheetVisible=!1,this._reorderVisible=!1,this._deviceManagerVisible=!1,this._nowPlayingVisible=!1,this._connectPanelVisible=!1,this._connectLoading=!1,this._mobileQueueVisible=!1,this._pendingNowPlaying=!1,clearTimeout(this._pendingNowPlayingTimer),this._queueVisible=!!(this._isDesktop&&this.config?.queue?.open_on_desktop),this._pendingDeviceResolution&&(this._pendingDeviceResolution(null),this._pendingDeviceResolution=null)}_animateClose(){if(this._isDesktop){this._isOpen=!1;return}let t=this.shadowRoot.querySelector(".browser-wrapper"),e=this.shadowRoot.querySelector(".backdrop");if(!t){this._isOpen=!1;return}t.style.transition="transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",t.style.transform="translateY(100%)",e&&(e.style.opacity="0");let i=!1,s=()=>{i||(i=!0,this._isOpen=!1,t.style.transform="",t.style.transition="",e&&(e.style.opacity=""))};t.addEventListener("transitionend",s,{once:!0}),setTimeout(s,420)}_handleAppBackgrounded(){this._isDesktop||!this._isOpen||(this._isOpen=!1)}_startIdleWatch(){this._stopIdleWatch(),this._idleCheckTimer=setInterval(()=>this._checkIdleClose(),5e3)}_stopIdleWatch(){this._idleCheckTimer&&(clearInterval(this._idleCheckTimer),this._idleCheckTimer=null)}_checkIdleClose(){let t=this.config?.auto_close;return!this._isOpen||!t?.enabled||!(t.timeout>0)||(Date.now()-this._lastActivityTime)/1e3<t.timeout?!1:(document.hidden?this._isOpen=!1:this._animateClose(),!0)}_handleAppForegrounded(){this._isOpen&&(this._checkIdleClose()||setTimeout(()=>this._refreshAfterReturn(),0))}async _refreshAfterReturn(){this.api&&(await this.api.scanWhenReady(),this.playerController?.refreshQueue(),this.playerController?.refreshRecent())}_handleMiniPlayerPlayPause(t){if(t.stopPropagation(),k("medium"),this.playerController)this.playerController.pause();else if(this.api){let e=this._playerState?.isPlaying||!1;this.api.togglePlayback(!e)}}};customElements.define("spotify-browser-app",oi);var It={title:"Spotify Browser",label:"launch",icon:"mdi:spotify",color:"#1DB954"};function wr(a){let t=String(a||"").trim();return t?/^(#|rgb|hsl|var\()/i.test(t)?t:`var(--${t}-color, ${t})`:It.color}var li=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}setConfig(t){this._config=t||{};let e=this._config.card&&typeof this._config.card=="object"?this._config.card:{};this._card={title:e.title!=null?String(e.title):It.title,label:e.label!=null?String(e.label):It.label,icon:e.icon||It.icon,color:wr(e.color)},this.isConnected&&this._render()}getCardSize(){return 1}getGridOptions(){return{rows:1,columns:6,min_rows:1,min_columns:3}}connectedCallback(){this._render()}_render(){let{title:t,label:e,icon:i,color:s}=this._card||It;this.shadowRoot.innerHTML=`
            <style>
                :host { display: block; height: 100%; }
                ha-card {
                    height: 100%;
                    --tile-color: ${s};
                }
                .tile {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    height: 100%;
                    box-sizing: border-box;
                    padding: 10px;
                    cursor: pointer;
                    border-radius: var(--ha-card-border-radius, 12px);
                    outline: none;
                    -webkit-tap-highlight-color: transparent;
                }
                .tile:hover,
                .tile:focus-visible {
                    background: color-mix(in srgb, var(--primary-text-color, #212121) 6%, transparent);
                }
                .tile:active {
                    background: color-mix(in srgb, var(--primary-text-color, #212121) 12%, transparent);
                }
                .badge {
                    flex: 0 0 auto;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--tile-color);
                    background: color-mix(in srgb, var(--tile-color) 20%, transparent);
                }
                .badge ha-icon {
                    --mdc-icon-size: 24px;
                    width: 24px;
                    height: 24px;
                }
                .text {
                    min-width: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                .primary,
                .secondary {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .primary {
                    color: var(--primary-text-color, #212121);
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 20px;
                }
                .secondary {
                    color: var(--secondary-text-color, #727272);
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 16px;
                }
            </style>
            <ha-card>
                <div class="tile" role="button" tabindex="0">
                    <div class="badge"><ha-icon></ha-icon></div>
                    <div class="text">
                        <span class="primary"></span>
                        <span class="secondary"></span>
                    </div>
                </div>
            </ha-card>
        `,this.shadowRoot.querySelector("ha-icon").setAttribute("icon",i),this.shadowRoot.querySelector(".primary").textContent=t,this.shadowRoot.querySelector(".secondary").textContent=e;let r=this.shadowRoot.querySelector(".tile"),n=()=>window.dispatchEvent(new CustomEvent("spotify-browser-open"));r.addEventListener("click",n),r.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),n())})}};customElements.get("spotify-browser-card")||customElements.define("spotify-browser-card",li);var ci=class{constructor(){this.app=null,this.config=null,this.initialized=!1,this.hass=null,this._boundCheckHash=this._checkHash.bind(this),this.init()}async init(){for(;!document.querySelector("home-assistant")?.hass;)await new Promise(i=>setTimeout(i,500));let t=document.querySelector("home-assistant");this.hass=t.hass;let e=await this._findLovelaceConfig();if(!e){console.warn("[SpotifyBrowser] No 'spotify_browser:' config found in dashboard YAML.");return}try{this.config=Lt.parse(e),this.app=document.createElement("spotify-browser-app"),this.app.config=this.config,this.app.hass=this.hass,document.body.appendChild(this.app),this.initialized=!0,this._checkHash()}catch(i){console.error("[SpotifyBrowser] Init Failed:",i);return}this._startHassLoop(),window.addEventListener("spotify-browser-open",()=>this._open()),window.addEventListener("spotify-browser-open-now-playing",()=>this._open(!0)),window.addEventListener("hashchange",this._boundCheckHash),window.addEventListener("location-changed",this._boundCheckHash)}_checkHash(){if(!this.initialized||!this.config)return;let t=window.location.hash;if(!t)return;let e="-now-playing",i=t.endsWith(e),s=i?t.slice(0,-e.length):t,r=s.includes(this.config.browser.hash),o=this.config.accounts.find(c=>c.hash===s);(r||o)&&(history.replaceState(null,null,window.location.pathname+window.location.search),o&&this.app&&o.entity!==this.app.config.entity&&this.app.switchAccount(o.entity),this._open(i))}_open(t=!1){!this.initialized||!this.app||this.app.open(t?{nowPlaying:!0}:void 0)}async _findLovelaceConfig(){let t=null;for(;!t;)t=document.querySelector("home-assistant")?.shadowRoot.querySelector("home-assistant-main")?.shadowRoot.querySelector("ha-panel-lovelace")?.lovelace,t||await new Promise(e=>setTimeout(e,200));return t.config.spotify_browser?t.config.spotify_browser:this._findCard(t.config.views)||null}_findCard(t){if(Array.isArray(t)){for(let e of t){let i=this._findCard(e);if(i)return i}return null}if(t&&typeof t=="object"){if(t.type==="custom:spotify-browser-card")return t;for(let e of["views","sections","cards","card"])if(t[e]){let i=this._findCard(t[e]);if(i)return i}}return null}_startHassLoop(){setInterval(()=>{let t=document.querySelector("home-assistant");t&&t.hass&&t.hass!==this.hass&&(this.hass=t.hass,this.app&&(this.app.hass=this.hass))},200)}};new ci;})();
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
