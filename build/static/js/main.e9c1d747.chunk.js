(this.webpackJsonpgears=this.webpackJsonpgears||[]).push([[0],{123:function(e,t,n){},144:function(e,t,n){e.exports=n.p+"static/media/image-preview.6c925526.md"},163:function(e,t,n){e.exports=n(375)},172:function(e,t,n){},175:function(e,t,n){},231:function(e,t,n){},320:function(e,t,n){},321:function(e,t,n){},322:function(e,t,n){},323:function(e,t,n){},324:function(e,t,n){},325:function(e,t,n){},334:function(e,t,n){},374:function(e,t,n){},375:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(5),l=n.n(c),o=n(45),i=n(10),u=(n(376),n(54)),m=(n(170),n(49)),s=n(379),f=n(380),d=n(381),p=n(382),h=n(31),v=(n(172),n(173),n(160)),E=(n(175),function(e){var t=Object(a.useRef)(null);return r.a.createElement("div",{className:"g-code-paper-wrapper"},r.a.createElement("textarea",{ref:t,defaultValue:e.text,className:"g-code-paper-textarea ".concat(e.className)}),e.handleClick&&r.a.createElement("button",{onClick:function(){var n=t.current.value;e.handleClick&&e.handleClick(n)}},e.buttonText?e.buttonText:"\u66f4\u65b0\u6570\u636e"))}),g=(n(231),function(e){var t=e.style,n=e.className,a=e.children;return r.a.createElement("div",{className:"g-isolate-block-wrapper ".concat(n),style:t},a)}),b=n(142),w=n.n(b),y=n(143),O=n.n(y),x=n(52),j=n.n(x),k=n(144),S=n.n(k),C=n(99),N=n(33),M=(n(320),function(e){var t=e.menu,n=e.children,c=Object(a.useState)({x:0,y:0}),l=Object(i.a)(c,2),o=l[0],u=l[1],m=Object(a.useState)(!1),s=Object(i.a)(m,2),f=s[0],d=s[1],p={position:"fixed",left:o.x,top:o.y,backgroundColor:"white",borderRadius:"4px",padding:"4px"},h=function(e){d(!1),e.stopPropagation()};return t?r.a.createElement("div",{onClick:h,onContextMenu:function(e){e.preventDefault(),u({x:e.clientX,y:e.clientY}),d(!0)}},n,f&&r.a.createElement("div",{className:"g-context-menu-default",style:p},function(e){return e instanceof Array?r.a.createElement(r.a.Fragment,null,e.map((function(e){return r.a.createElement("div",{key:e.name,onClick:e.method},e.name)}))):e}(t))):r.a.createElement("div",{onClick:h},n)}),q=(n(321),{w:0,h:0,r:0,l:0,t:0}),A={bar:["zoom-in","zoom-out","free-rotate","free-drag","reset"],contextMenu:["rotate","free-rotate","free-drag"]};function z(e){var t=e.url,n=e.fixedOnScreen,c=void 0===n||n,l=e.onClose,o=e.operator,u=void 0===o?A:o,m=!c||e.visible,s=Object(a.useState)(q),f=Object(i.a)(s,2),d=f[0],p=f[1],h=Object(a.useState)(q),v=Object(i.a)(h,2),E=v[0],g=v[1],b=Object(a.useRef)(null),w={cursor:"move",position:"absolute",left:"".concat(d.l,"px"),top:"".concat(d.t,"px"),width:"".concat(d.w,"px"),height:"".concat(d.h,"px"),transform:"translate(-50%, -50%) rotate(".concat(d.r,"deg)")};Object(a.useEffect)((function(){var e=function(e){return e.preventDefault()},t=function(){return document.removeEventListener("wheel",e)};return m?document.addEventListener("wheel",e,{passive:!1}):t(),t}),[m]);console.log("imageLoadedState",E);var y=function(){S("free-drag"),F(!1),Y(!1),p(E)},O=function(){y(),l&&l()},x=Object(a.useState)("free-drag"),j=Object(i.a)(x,2),k=j[0],S=j[1],z=function(e){return S(e)},I=Object(a.useState)({x:0,y:0}),L=Object(i.a)(I,2),P=L[0],B=L[1],D=Object(a.useState)(!1),T=Object(i.a)(D,2),W=T[0],Y=T[1],R=Object(a.useState)(!1),X=Object(i.a)(R,2),J=X[0],F=X[1],G=Object(a.useState)({x:0,y:0}),H=Object(i.a)(G,2),U=H[0],K=H[1],Q={"zoom-in":function(){p((function(e){return Object(N.a)({},e,{w:1.05*d.w,h:1.05*d.h})}))},"zoom-out":function(){p((function(e){return Object(N.a)({},e,{w:.95*d.w,h:.95*d.h})}))},rotate:function(){p((function(e){return Object(N.a)({},e,{r:e.r+90})}))},"free-drag":function(){return z("free-drag")},"free-rotate":function(){return z("free-rotate")},reset:y};return m?r.a.createElement("div",{className:"g-image-preview-wrapper g-fixed-wrapper",onClick:O},r.a.createElement("div",{className:"g-image-preview-icon-close",onClick:O},"X"),r.a.createElement(M,{menu:function(){if(!u||!u.contextMenu)return null;if(u.contextMenu instanceof Array){var e=[],t=!0,n=!1,a=void 0;try{for(var r,c=u.contextMenu[Symbol.iterator]();!(t=(r=c.next()).done);t=!0){var l=r.value,o=Q[l];if(o){var i={name:l,method:o};e=[].concat(Object(C.a)(e),[i])}}}catch(m){n=!0,a=m}finally{try{t||null==c.return||c.return()}finally{if(n)throw a}}return e}return u.contextMenu}()},r.a.createElement("img",{className:"g-image-preview-image g-image-preview-image-fixed",onMouseDown:function(e){"free-drag"===k?function(e){e.preventDefault(),Y(!0),B({x:e.clientX-b.current.offsetLeft,y:e.clientY-b.current.offsetTop})}(e):function(e){e.preventDefault(),K({x:e.clientX,y:e.clientY}),F(!0)}(e)},onMouseMove:function(e){"free-drag"===k?function(e){if(W){var t=e.clientX-P.x,n=e.clientY-P.y;p((function(e){return Object(N.a)({},e,{l:t,t:n})}))}}(e):function(e){if(J){var t={x:e.clientX,y:e.clientY},n=function(e,t){return Math.sqrt(Math.pow(Math.abs(e.x-t.x),2)+Math.pow(Math.abs(e.y-t.y),2))},a=b.current.getBoundingClientRect(),r={x:(a.left+a.right)/2,y:(a.top+a.bottom)/2},c=n(t,U),l=n(t,r),o=n(U,r),i=(l*l+o*o-c*c)/(2*l*o),u=180*Math.acos(i)/3.1415,m=[[U.x-r.x,t.x-r.x],[U.y-r.y,t.y-r.y]],s=m[0][0]*m[1][1]-m[0][1]*m[1][0]>=0?1:-1;p((function(e){return Object(N.a)({},e,{r:e.r+s*u})})),K(t)}}(e)},onMouseUp:function(e){"free-drag"===k?Y(!1):function(e){K({x:e.clientX,y:e.clientY}),F(!1)}(e)},onContextMenu:function(){S("free-drag"),Y(!1),F(!1)},style:w,onLoad:function(){if(console.log("image-loaded"),b.current){var e=function(e){var t=window.innerWidth/2,n=window.innerHeight/2,a=.9*window.innerWidth,r=.9*window.innerHeight-100,c=e.naturalWidth,l=e.naturalHeight,o=c/a,i=l/r,u=o<1&&i<1?{w:c,h:l}:o>i?{w:a,h:l/o}:{w:c/i,h:r},m={t:n,l:t,w:u.w,h:u.h},s=Object(N.a)({},d,{},m);return p(s),s}(b.current);g(e)}},ref:b,src:t,alt:"\u56fe\u7247",onWheel:function(e){var t=e.deltaY<0?.05:-.05,n=e.clientX-d.l,a=e.clientY-d.t,r=d.w*(1+t),c=d.h*(1+t),l=d.l,o=d.t,i=l-t*n,u=o-t*a;p((function(e){return Object(N.a)({},e,{w:r,h:c,l:i,t:u})}))}})),function(){if(!u||!u.bar)return null;if(u.bar instanceof Array){var e=[],t=!0,n=!1,a=void 0;try{for(var c,l=u.bar[Symbol.iterator]();!(t=(c=l.next()).done);t=!0){var o=c.value,i=Q[o];if(i){var m={name:o,method:i};e=[].concat(Object(C.a)(e),[m])}else console.warn("can't find method which refers ".concat(o))}}catch(s){n=!0,a=s}finally{try{t||null==l.return||l.return()}finally{if(n)throw a}}return r.a.createElement("div",{className:"g-image-preview-action-bar",onClick:function(e){return e.stopPropagation()}},e.map((function(e){return r.a.createElement("i",{key:e.name,onClick:e.method},e.name)})))}return u.bar}()):r.a.createElement(r.a.Fragment,null)}n(322);var I="https://cdn.pixabay.com/photo/2020/03/08/11/21/british-4912211_960_720.jpg",L=(n(123),function(e){var t=e.level,n=e.depth,c=e.route,l=Object(a.useState)(!!window.location.pathname.match(c)),o=Object(i.a)(l,2),u=o[0],m=o[1],s=function(e){return window.location.replace(e)},f=function(e){return console.log(e)};return r.a.createElement("div",{key:t.name,className:function(e){return"g-levels-link ".concat(e?"g-small-font":"")}(n),onClick:function(){return function(e,t){return m((function(e){return!e})),e.static?s(e.route):f(t)}(t,c)},style:u?{color:"#2dc6ad"}:void 0},r.a.createElement("span",{style:{paddingLeft:"".concat(n,"em")}}),t.name)}),P=function(e){var t=e.data,n=e.fontSize,a=void 0===n?45:n;return r.a.createElement("div",{className:"g-levels-wrapper"},t.map((function(e){return function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,c=arguments.length>2?arguments[2]:void 0,l=c?"".concat(c,"/").concat(t.route):t.route;return r.a.createElement("div",{key:t.name},r.a.createElement(L,{level:t,depth:n,route:l,fontSize:a}),t.deep&&t.deep.map((function(t){return e(t,n+1,l)})))}(e)})))},B=[{name:"Pipeline",route:"pipeline"},{name:"Github",route:"https://github.com/",static:!0},{name:"Ground",route:"ground",deep:[{name:"Solid",route:"solid",deep:[{name:"Dust",route:"dust"},{name:"Germ",route:"germ"}]},{name:"Liquid",route:"liquid"}]}],D=(n(323),function(e){return r.a.createElement("span",{className:"g-icon-rotate",onClick:e.handleClick})}),T=(n(324),function(e){var t=e.children,n=e.column,c=void 0===n?3:n,l=function(e){for(var t=0;t<e;t++)"".concat(" 1fr");return""},o=Object(a.useState)({}),u=Object(i.a)(o,2),m=u[0],s=u[1];return Object(a.useEffect)((function(){var e={gridTemplateColumns:l(c)};s(e),console.log(e)}),[c]),r.a.createElement("div",{className:"g-waterfall-wrapper",style:m},t)}),W=(n(325),function(e){var t=e.routes;return r.a.createElement("div",{className:"p-comp"},r.a.createElement(h.c,null,t.map((function(e){return r.a.createElement($,Object.assign({key:e.key},e))}))))}),Y=(n(124),n(32)),R=(n(328),n(161)),X=(n(126),n(15)),J=(n(330),n(154)),F=(n(377),n(159)),G=(n(334),F.a.Meta),H=[{key:"home",icon:"home",title:"\u9996\u9875",exact:!0,component:function(){var e,t=(new Date).getHours(),n=t>=12&&t<=17?"\u4e0b\u5348\u597d, \u8bb0\u5f97\u591a\u8d77\u6765\u52a8\u52a8":t>=17&&t<=23?"\u665a\u4e0a\u597d, \u8981\u591a\u591a\u73a9\u800d~":t>23||t<5?"\u6df1\u591c\u4e86, \u5feb\u4f11\u606f\u5427":"\u65e9\u4e0a\u597d, \u8fce\u63a5\u4e00\u5929\u6700\u597d\u7684\u9633\u5149";return r.a.createElement("div",{className:"p-home"},r.a.createElement("h3",null," \u7ec4\u4ef6\u5e73\u53f0 "),r.a.createElement(Y.a,null,r.a.createElement(X.a,{span:20},r.a.createElement(G,{avatar:r.a.createElement(J.a,{style:{marginTop:5},size:"large",src:j.a}),title:"".concat(n),description:"\u7ec4\u4ef6\u76ee\u5f55\u5728\u4fa7\u680f, \u8bf7\u9009\u62e9\u67e5\u770b"})),r.a.createElement(X.a,{style:{marginTop:-13},span:4},r.a.createElement(R.a,{title:"\u5f53\u524d\u7ec4\u4ef6\u603b\u6570",value:null===(e=H[1].routes)||void 0===e?void 0:e.length}))))},inMenu:!0,path:"/"},{key:"comp",icon:"gold",title:"\u7ec4\u4ef6",inMenu:!0,component:W,path:"/comp",routes:[{key:"image-preview",title:"\u56fe\u7247\u9884\u89c8 \xb7 ImagePreview",component:function(){var e=Object(a.useState)(-1),t=Object(i.a)(e,2),n=t[0],c=t[1],l=Object(a.useState)(""),o=Object(i.a)(l,2),u=o[0],m=o[1],s=Object(a.useState)(""),f=Object(i.a)(s,2),d=f[0],p=f[1];Object(a.useEffect)((function(){fetch(S.a).then((function(e){return e.text()})).then((function(e){return p(e)}))}),[]);var h=function(){c(null)};return Object(a.useEffect)((function(){var e=localStorage.getItem("image-preview-url");e&&m(e)}),[]),r.a.createElement("div",null,r.a.createElement("h2",null,"\u7ec4\u4ef6\u540d\u79f0\uff1a\u56fe\u7247\u9884\u89c8\uff08ImagePreview\uff09"),r.a.createElement("p",null,"\u57fa\u7840\u64cd\u4f5c: \u6eda\u8f6e\u7f29\u653e \u62d6\u62fd"),r.a.createElement("p",null,"\u83dc\u5355\u64cd\u4f5c: \u65cb\u8f6c \u91cd\u7f6e"),r.a.createElement("div",{className:"g-table"},r.a.createElement(g,null,r.a.createElement("h4",null,"\u57fa\u672c\u793a\u4f8b"),r.a.createElement("p",null,"\u65e0\u83dc\u5355"),r.a.createElement("img",{src:j.a,alt:"\u56fe\u7247",className:"g-sample-image",onClick:function(){c(0)}}),r.a.createElement(z,{url:j.a,fixedOnScreen:!0,visible:0===n,onClose:h,operator:{bar:null,contextMenu:null}})),r.a.createElement(g,null,r.a.createElement("h4",null,"\u529f\u80fd\u83dc\u5355"),r.a.createElement("p",null,"\u542b\u9ed8\u8ba4\u53f3\u952e\u83dc\u5355"),r.a.createElement("img",{alt:"\u56fe\u7247",className:"g-sample-image",src:I,onClick:function(){c(1)}}),r.a.createElement(z,{url:I,fixedOnScreen:!0,visible:1===n,onClose:h}),r.a.createElement("br",null)),r.a.createElement(g,null,r.a.createElement("h4",null,"\u7f51\u7edc\u56fe\u7247"),r.a.createElement("p",null,"\u9ed8\u8ba4\u83dc\u5355"),r.a.createElement("p",null,"\u5c06\u60f3\u8981\u6d4b\u8bd5\u56fe\u7247\u5730\u5740\u8f93\u5165(\u7a7a\u767d\u4f7f\u7528\u9ed8\u8ba4\u56fe\u7247)"),r.a.createElement(E,{text:u,handleClick:function(e){e&&(m(e),localStorage.setItem("image-preview-url",e)),c(2)},buttonText:"\u663e\u793a\u9884\u89c8",className:"small-size"}),r.a.createElement(z,{url:u,operator:{bar:null,contextMenu:["zoom-in","zoom-out"]},fixedOnScreen:!0,visible:2===n,onClose:h}))),r.a.createElement(w.a,{source:d,plugins:[O.a]}))},path:"/comp/image-preview"},{key:"levels",title:"\u9636\u7ea7\u5bfc\u822a \xb7 Levels",component:function(){var e=Object(a.useState)(B),t=Object(i.a)(e,2),n=t[0],c=t[1];return r.a.createElement("div",{className:"demo-levels-wrapper"},r.a.createElement("h3",null,"\u7ec4\u4ef6\u540d\u79f0\uff1a\u5c42\u7ea7\u5bfc\u822a\uff08Levels\uff09"),r.a.createElement("h4",null,"(\u5f00\u53d1\u4e2d)"),r.a.createElement("h4",null,"\u793a\u4f8b"),"\u5f53\u524d\u6570\u636e:",r.a.createElement(E,{text:"".concat(JSON.stringify(B)),handleClick:function(e){try{c(JSON.parse(e))}catch(t){console.error("error: INVALID JSON ARRAY FORMAT")}}}),r.a.createElement(P,{data:n}))},path:"/comp/levels"},{key:"code-paper",title:"\u4ee3\u7801\u5757 \xb7 CodePaper",component:function(){return r.a.createElement("div",null,r.a.createElement("h3",null,"\u4ee3\u7801\u5757"),r.a.createElement(E,{text:"",handleClick:function(e){v.a.info(e)}}))},path:"/comp/code-paper"},{key:"rolling-banner",title:"\u6eda\u52a8\u5e45 \xb7 RollingBanner",component:function(){return r.a.createElement("div",null,r.a.createElement(D,null))},path:"/comp/rolling-banner"},{key:"waterfall",title:"\u7011\u5e03\u56fe \xb7 Waterfall",component:function(){return r.a.createElement("div",null,r.a.createElement(T,null,r.a.createElement(g,null,"conhdianqi cece na case cat"),r.a.createElement(g,null,"istals psrm"),r.a.createElement(g,null,"onhdianqi cece na case catonhdianqi cece na case cat"),r.a.createElement(g,null,"onhdianqi cece na case cat"),r.a.createElement(g,null,"onhdianqi cece na caonhdianqi cece na case catse catonhdianqi cece na case cat"),r.a.createElement(g,null,"onhdianqi cece na case catonhdianqi cece na case cat"),r.a.createElement(g,null,"onhdianqi cece na case cat"),r.a.createElement(g,null,"onhdianqi cece na conhdianqi cece na case catonhdianqi cece na case catonhdianqi cece na case catase cat"),r.a.createElement(g,null,"onhdianqi cece na case cat")))},path:"/comp/waterfall"}]}],U=function(){return r.a.createElement("div",null,"NOTFOUND")},K=m.a.Header,Q=m.a.Sider,V=m.a.Content,_=u.a.SubMenu;function $(e){return r.a.createElement(h.a,{path:e.path,render:function(t){return r.a.createElement(e.component,Object.assign({},t,{routes:e.routes}))}})}var Z=Object(h.f)((function(){var e=Object(a.useState)(!1),t=Object(i.a)(e,2),n=t[0],c=t[1],l=function(){return c(!n)};Object(a.useEffect)((function(){var e=/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent);c(!!e)}),[]);var v=function(e){return r.a.createElement("span",null,r.a.createElement(s.a,null),r.a.createElement("span",null,e.title))};return r.a.createElement("div",{className:"App"},r.a.createElement(m.a,null,r.a.createElement(Q,{width:250,trigger:null,reverseArrow:!0,collapsible:!0,collapsed:n},r.a.createElement("div",{className:"logo"},"Gears \u7ec4\u4ef6\u5f00\u53d1\u5e73\u53f0"),r.a.createElement(u.a,{theme:"dark",mode:"inline",defaultSelectedKeys:["home"],defaultOpenKeys:["comp"]},H.map((function(e){return e.routes?r.a.createElement(_,{key:e.key,title:v(e)},e.routes.map((function(e){return r.a.createElement(u.a.Item,{key:e.key},r.a.createElement(o.b,{to:e.path},e.icon&&r.a.createElement(f.a,null),r.a.createElement("span",null,e.title)))}))):e.component?r.a.createElement(u.a.Item,{key:e.key},r.a.createElement(o.b,{to:e.path},e.icon&&r.a.createElement(f.a,null),r.a.createElement("span",null,e.title))):null})))),r.a.createElement(m.a,null,r.a.createElement(K,{style:{background:"#fff",padding:0}},n?r.a.createElement(d.a,{onClick:l,className:"trigger"}):r.a.createElement(p.a,{onClick:l,className:"trigger"}),"\u6298\u53e0"),r.a.createElement(V,{className:"App-content"},r.a.createElement(h.c,null,"123",H.map((function(e){return r.a.createElement($,Object.assign({key:e.key},e))})),r.a.createElement(h.a,{component:U}))))))}));n(374),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(o.a,null,r.a.createElement(Z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},52:function(e,t,n){e.exports=n.p+"static/media/panda.6c7f1359.png"}},[[163,1,2]]]);
//# sourceMappingURL=main.e9c1d747.chunk.js.map