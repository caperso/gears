(this.webpackJsonpgears=this.webpackJsonpgears||[]).push([[0],{112:function(e,t,n){},142:function(e,t,n){e.exports=n(252)},153:function(e,t,n){},157:function(e,t,n){},205:function(e,t,n){},206:function(e,t,n){},209:function(e,t,n){},210:function(e,t,n){},220:function(e,t,n){},251:function(e,t,n){},252:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(7),o=n.n(r),l=n(48),i=(n(147),n(10)),u=n(17),m=(n(253),n(60)),s=(n(151),n(51)),p=n(34),f=(n(153),n(154),n(139)),d=(n(98),n(41)),h=(n(157),function(e){var t=Object(a.useRef)(null);return c.a.createElement("div",{className:"g-code-paper-wrapper"},c.a.createElement("textarea",{ref:t,defaultValue:e.text,className:"g-code-paper-textarea ".concat(e.className)}),e.handleClick&&c.a.createElement(d.a,{onClick:function(){var n=t.current.value;e.handleClick&&e.handleClick(n)}},e.buttonText?e.buttonText:"\u66f4\u65b0\u6570\u636e"))}),E=(n(203),n(137)),v=n(56),g=n.n(v),w=(n(205),n(30)),b=(n(206),{w:0,h:0,r:0,s:1,l:0,t:0,centerX:0,centerY:0,wStatic:0,hStatic:0,rotateTime:0,everRotated:!1}),O={w:0,h:0,wMax:0,hMax:0};function k(e){var t=e.url,n=Object(a.useState)(b),r=Object(u.a)(n,2),o=r[0],l=r[1],i=Object(a.useState)(O),m=Object(u.a)(i,2),s=m[0],p=m[1],f=Object(a.useRef)(null),d=Object(a.useRef)(null),h=Object(a.useState)(0),E=Object(u.a)(h,2),v=E[0],g=E[1],k=Object(a.useState)(0),j=Object(u.a)(k,2),y=j[0],x=j[1],N=Object(a.useState)(!1),S=Object(u.a)(N,2),C=S[0],M=S[1];return c.a.createElement("div",{className:"g-image-preview-wrapper"},c.a.createElement("div",{ref:f,style:{overflow:"hidden",position:"relative",width:"".concat(s.w,"px"),height:"".concat(s.h,"px"),maxHeight:"".concat(s.hMax,"px"),maxWidth:"".concat(s.wMax,"px")},onMouseMove:function(e){if(C){var t=e.clientX-v,n=e.clientY-y;l((function(e){return Object(w.a)({},e,{l:t,t:n})})),f.current.onselectstart=function(){return!1}}},onMouseUp:function(e){M(!1),f.current.onselectstart=null}},c.a.createElement("img",{className:"g-image-preview-image",style:{cursor:"move",position:"absolute",left:"".concat(o.l,"px"),top:"".concat(o.t,"px"),width:"".concat(o.w,"px"),height:"".concat(o.h,"px"),transform:"translate3d(0, 0, 0) rotate(".concat(o.r,"deg) scale(").concat(o.s,", ").concat(o.s,")")},onLoad:function(){d.current&&function(e){var t=.9*window.innerWidth,n=.9*window.innerHeight-100,a=e.naturalWidth,c=e.naturalHeight,r=a/t,o=c/n,i=r<1&&o<1?{w:a,h:c}:r>o?{w:t,h:c/r}:{w:a/o,h:n};l((function(e){var t={w:i.w,h:i.h,wStatic:i.w,hStatic:i.h};return console.log("\u56fe\u7247\u5143\u7d20\u66f4\u65b0\u72b6\u6001",t),Object(w.a)({},e,{},t)})),p((function(e){return Object(w.a)({},e,{wMax:t,hMax:n,w:i.w,h:i.h})}))}(d.current)},ref:d,src:t,alt:"\u56fe\u7247",onWheel:function(e){e.stopPropagation();var t=e.deltaY<0?.05:-.05;console.log("\u7f29\u653e\u6bd4\u4f8b",t);var n=d.current.getBoundingClientRect(),a=n.left,c=n.top,r=n.width,i=n.height;if(console.log("\u56fe\u7247\u5bf9\u7a97\u53e3\u5de6\u504f\u79fb\u91cf",n.left,"\u5149\u6807\u5bf9\u7a97\u53e3\u5de6\u504f\u79fb\u91cf",e.clientX),o.rotateTime%2===1){var u=[i,r];r=u[0],i=u[1]}var m=r*(1+t),s=i*(1+t),p=o.l,f=o.t,h=p-t*(e.clientX-a),E=f-t*(e.clientY-c);l((function(e){var t=Object(w.a)({},e,{w:m,h:s,l:h,t:E,everRotated:!1});return console.log("origin",e,"current",t),t}))},onMouseDown:function(e){e.preventDefault(),e.persist(),console.log("drag"),M(!0),g(e.clientX-d.current.offsetLeft),x(e.clientY-d.current.offsetTop)}})),c.a.createElement("div",{className:"g-image-preview-operation-bar"},c.a.createElement("i",{className:"iconfont operator",onClick:function(){return l((function(e){return Object(w.a)({},e,{w:1.05*o.w,h:1.05*o.h})}))}},"+"),c.a.createElement("i",{className:"iconfont operator",onClick:function(){return l((function(e){return Object(w.a)({},e,{w:.95*o.w,h:.95*o.h})}))}},"-"),c.a.createElement("i",{className:"iconfont operator",onClick:function(){l((function(e){var t=Object(w.a)({},e);return t.l=0,t.t=0,t.everRotated=!0,t.r=e.r+90,t.rotateTime=++e.rotateTime,t})),p((function(e){var t=Object(w.a)({},e);return o.wStatic/o.hStatic>1?t.h=e.w:t.w=e.h,t}))}},"ROTATE"),c.a.createElement("i",{className:"iconfont operator",onClick:function(e){l(b),p(O)}},"RESET")))}n(112);var j=function(e){var t=e.level,n=e.depth,r=e.route,o=Object(a.useState)(!!window.location.pathname.match(r)),l=Object(u.a)(o,2),i=l[0],m=l[1],s=function(e){return window.location.replace(e)},p=function(e){return console.log(e)};return c.a.createElement("div",{key:t.name,className:function(e){return"g-levels-link ".concat(e?"g-small-font":"")}(n),onClick:function(){return function(e,t){return m((function(e){return!e})),e.static?s(e.route):p(t)}(t,r)},style:i?{color:"#2dc6ad"}:void 0},c.a.createElement("span",{style:{paddingLeft:"".concat(n,"em")}}),t.name)},y=function(e){var t=e.data,n=e.fontSize,a=void 0===n?45:n;return c.a.createElement("div",{className:"g-levels-wrapper"},t.map((function(e){return function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2?arguments[2]:void 0,o=r?"".concat(r,"/").concat(t.route):t.route;return c.a.createElement("div",{key:t.name},c.a.createElement(j,{level:t,depth:n,route:o,fontSize:a}),t.deep&&t.deep.map((function(t){return e(t,n+1,o)})))}(e)})))},x=[{name:"Pipeline",route:"pipeline"},{name:"Github",route:"https://github.com/",static:!0},{name:"Ground",route:"ground",deep:[{name:"Solid",route:"solid",deep:[{name:"Dust",route:"dust"},{name:"Germ",route:"germ"}]},{name:"Liquid",route:"liquid"}]}],N=(n(209),function(e){return c.a.createElement("span",{className:"g-icon-rotate",onClick:e.handleClick})}),S=(n(210),function(e){var t=e.routes;return c.a.createElement("div",{className:"p-comp"},c.a.createElement(p.c,null,t.map((function(e){return c.a.createElement(P,Object.assign({key:e.key},e))}))))}),C=(n(114),n(36)),M=(n(214),n(138)),T=(n(116),n(19)),R=(n(216),n(132)),A=(n(254),n(136)),I=(n(220),A.a.Meta),L=[{key:"home",icon:"home",title:"\u9996\u9875",exact:!0,component:function(){var e,t=(new Date).getHours(),n=t>=12&&t<=17?"\u4e0b\u5348\u597d":t>=17&&t<=24?"\u665a\u4e0a\u597d":"\u65e9\u4e0a\u597d";return c.a.createElement("div",{className:"p-home"},c.a.createElement("h3",null," \u7ec4\u4ef6\u5e73\u53f0 "),c.a.createElement(C.a,null,c.a.createElement(T.a,{span:20},c.a.createElement(I,{avatar:c.a.createElement(R.a,{style:{marginTop:5},size:"large",src:g.a}),title:"".concat(n),description:"\u7ec4\u4ef6\u76ee\u5f55\u5728\u4fa7\u680f, \u8bf7\u9009\u62e9\u67e5\u770b"})),c.a.createElement(T.a,{style:{marginTop:-13},span:4},c.a.createElement(M.a,{title:"\u5f53\u524d\u7ec4\u4ef6\u603b\u6570",value:null===(e=L[1].routes)||void 0===e?void 0:e.length}))))},inMenu:!0,path:"/"},{key:"comp",icon:"gold",title:"\u7ec4\u4ef6",inMenu:!0,component:S,path:"/comp",routes:[{key:"image-preview",title:"\u56fe\u7247\u9884\u89c8 \xb7 ImagePreview",component:function(){var e=Object(a.useState)(!1),t=Object(u.a)(e,2),n=t[0],r=t[1],o=Object(a.useState)(""),l=Object(u.a)(o,2),i=l[0],m=l[1];return c.a.createElement("div",null,c.a.createElement("h3",null,"\u7ec4\u4ef6\u540d\u79f0\uff1a\u56fe\u7247\u9884\u89c8\uff08ImagePreview\uff09"),c.a.createElement("h4",null,"\u793a\u4f8b\u56fe\u7247"),c.a.createElement("img",{src:g.a,alt:"\u56fe\u7247",onClick:function(){m(""),r(!0)}}),c.a.createElement("h4",null,"\u7f51\u7edc\u56fe\u7247"),c.a.createElement("p",null,"\u5c06\u60f3\u8981\u6d4b\u8bd5\u56fe\u7247\u5730\u5740\u8f93\u5165(\u7a7a\u767d\u4f7f\u7528\u9ed8\u8ba4\u56fe\u7247)"),c.a.createElement(h,{text:"",handleClick:function(e){console.log(e),m(e),r(!0)},buttonText:"\u663e\u793a\u9884\u89c8",className:"small-size"}),c.a.createElement(E.a,{className:"preview-modal",onCancel:function(){r(!1)},footer:null,visible:n},c.a.createElement("h3",null,"\u56fe\u7247\u9884\u89c8"),c.a.createElement(k,{url:i||g.a})))},path:"/comp/image-preview"},{key:"levels",title:"\u9636\u7ea7\u5bfc\u822a \xb7 Levels",component:function(){var e=Object(a.useState)(x),t=Object(u.a)(e,2),n=t[0],r=t[1];return c.a.createElement("div",{className:"demo-levels-wrapper"},"\u5f53\u524d\u6570\u636e:",c.a.createElement(h,{text:"".concat(JSON.stringify(x)),handleClick:function(e){try{r(JSON.parse(e))}catch(t){console.error("error: INVALID JSON ARRAY FORMAT")}}}),c.a.createElement(y,{data:n}))},path:"/comp/levels"},{key:"code-paper",title:"\u4ee3\u7801\u5757 \xb7 CodePaper",component:function(){return c.a.createElement("div",null,c.a.createElement("h3",null,"\u4ee3\u7801\u5757"),c.a.createElement(h,{text:"",handleClick:function(e){f.a.info(e)}}))},path:"/comp/code-paper"},{key:"loading",title:"\u52a0\u8f7d \xb7 Loading",component:function(){return c.a.createElement("div",null,c.a.createElement(N,null))},path:"/comp/loading"}]}],D=function(){return c.a.createElement("div",null,"NOTFOUND")},W=s.a.Header,Y=s.a.Sider,H=s.a.Content,J=m.a.SubMenu;function P(e){return c.a.createElement(p.a,{path:e.path,render:function(t){return c.a.createElement(e.component,Object.assign({},t,{routes:e.routes}))}})}var X=Object(p.f)((function(){var e=Object(a.useState)(!1),t=Object(u.a)(e,2),n=t[0],r=t[1],o=function(e){return c.a.createElement("span",null,e.icon&&c.a.createElement(i.a,{type:e.icon}),c.a.createElement("span",null,e.title))};return c.a.createElement("div",{className:"App"},c.a.createElement(s.a,null,c.a.createElement(Y,{trigger:null,collapsible:!0,collapsed:n},c.a.createElement("div",{className:"logo"}),c.a.createElement(m.a,{theme:"dark",mode:"inline",defaultSelectedKeys:["home"],defaultOpenKeys:["comp"]},L.map((function(e){return e.routes?c.a.createElement(J,{key:e.key,title:o(e)},e.routes.map((function(e){return c.a.createElement(m.a.Item,{key:e.key},c.a.createElement(l.b,{to:e.path},e.icon&&c.a.createElement(i.a,{type:e.icon}),c.a.createElement("span",null,e.title)))}))):e.component?c.a.createElement(m.a.Item,{key:e.key},c.a.createElement(l.b,{to:e.path},e.icon&&c.a.createElement(i.a,{type:e.icon}),c.a.createElement("span",null,e.title))):null})))),c.a.createElement(s.a,null,c.a.createElement(W,{style:{background:"#fff",padding:0}},c.a.createElement(i.a,{className:"trigger",type:n?"menu-unfold":"menu-fold",onClick:function(){return r(!n)}})),c.a.createElement(H,{className:"App-content"},c.a.createElement(p.c,null,"123",L.map((function(e){return c.a.createElement(P,Object.assign({key:e.key},e))})),c.a.createElement(p.a,{component:D}))))))}));n(251),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(l.a,null,c.a.createElement(X,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},56:function(e,t,n){e.exports=n.p+"static/media/panda.6c7f1359.png"}},[[142,1,2]]]);
//# sourceMappingURL=main.8023a2b4.chunk.js.map