webpackJsonp([71],{1142:function(n,e,t){"use strict";function o(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function i(n,e){if(!n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!==typeof e&&"function"!==typeof e?n:e}function r(n,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);n.prototype=Object.create(e&&e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(n,e):n.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a=t(0),l=t.n(a),c=t(49),s=t(235),p=t(415),d=t(38),f=t(3762),h=function(){function n(n,e){for(var t=0;t<e.length;t++){var o=e[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}return function(e,t,o){return t&&n(e.prototype,t),o&&n(e,o),e}}(),u=function(n){function e(){return o(this,e),i(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return r(e,n),h(e,[{key:"render",value:function(){return l.a.createElement(f.a,{className:"isoResetPassPage"},l.a.createElement("div",{className:"isoFormContentWrapper"},l.a.createElement("div",{className:"isoFormContent"},l.a.createElement("div",{className:"isoLogoWrapper"},l.a.createElement(c.a,{to:"/dashboard"},l.a.createElement(d.a,{id:"page.resetPassTitle"}))),l.a.createElement("div",{className:"isoFormHeadText"},l.a.createElement("h3",null,l.a.createElement(d.a,{id:"page.resetPassSubTitle"})),l.a.createElement("p",null,l.a.createElement(d.a,{id:"page.resetPassDescription"}))),l.a.createElement("div",{className:"isoResetPassForm"},l.a.createElement("div",{className:"isoInputWrapper"},l.a.createElement(s.d,{size:"large",type:"password",placeholder:"New Password"})),l.a.createElement("div",{className:"isoInputWrapper"},l.a.createElement(s.d,{size:"large",type:"password",placeholder:"Confirm Password"})),l.a.createElement("div",{className:"isoInputWrapper"},l.a.createElement(p.b,{type:"primary"},l.a.createElement(d.a,{id:"page.resetPassSave"})))))))}}]),e}(l.a.Component);e.default=u},2093:function(n,e,t){n.exports=t.p+"static/media/image5.603427e6.jpg"},3762:function(n,e,t){"use strict";var o=t(24),i=t(34),r=(t.n(i),t(2093)),a=t.n(r),l=t(36),c=function(n,e){return Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}(["\n  width: 100%;\n  min-height: 100vh;\n  height: 100vh;\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  position: relative;\n  background: url(",") no-repeat center center;\n  background-size: cover;\n\n  &:before {\n    content: '';\n    width: 100%;\n    height: auto;\n    display: flex;\n    background-color: rgba(0, 0, 0, 0.3);\n    position: absolute;\n    z-index: 1;\n    top: 0;\n    left: ",";\n    right: ",";\n  }\n\n  .isoFormContentWrapper {\n    width: 500px;\n    height: 100%;\n    overflow-y: auto;\n    z-index: 10;\n    position: relative;\n  }\n\n  .isoFormContent {\n    min-height: 100%;\n    display: flex;\n    flex-direction: column;\n    padding: 70px 50px;\n    position: relative;\n    background-color: #ffffff;\n\n    @media only screen and (max-width: 767px) {\n      width: 100%;\n      padding: 70px 20px;\n    }\n\n    .isoLogoWrapper {\n      width: 100%;\n      display: flex;\n      margin-bottom: 70px;\n      justify-content: center;\n\n      a {\n        font-size: 24px;\n        font-weight: 300;\n        line-height: 1;\n        text-transform: uppercase;\n        color: ",";\n      }\n    }\n\n    .isoFormHeadText {\n      width: 100%;\n      display: flex;\n      flex-direction: column;\n      margin-bottom: 15px;\n      justify-content: center;\n\n      h3 {\n        font-size: 14px;\n        font-weight: 500;\n        line-height: 1.2;\n        margin: 0 0 7px;\n        color: ",";\n      }\n\n      p {\n        font-size: 13px;\n        font-weight: 400;\n        line-height: 1.2;\n        margin: 0;\n        color: ",";\n      }\n    }\n\n    .isoResetPassForm {\n      width: 100%;\n      display: flex;\n      flex-shrink: 0;\n      flex-direction: column;\n\n      .isoInputWrapper {\n        margin-bottom: 10px;\n\n        &:last-child {\n          margin-bottom: 0;\n        }\n\n        input {\n          &::-webkit-input-placeholder {\n            color: ",";\n          }\n\n          &:-moz-placeholder {\n            color: ",";\n          }\n\n          &::-moz-placeholder {\n            color: ",";\n          }\n          &:-ms-input-placeholder {\n            color: ",";\n          }\n        }\n\n        button {\n          height: 42px;\n          width: 100%;\n          font-weight: 500;\n          font-size: 13px;\n        }\n      }\n    }\n  }\n"],["\n  width: 100%;\n  min-height: 100vh;\n  height: 100vh;\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  position: relative;\n  background: url(",") no-repeat center center;\n  background-size: cover;\n\n  &:before {\n    content: '';\n    width: 100%;\n    height: auto;\n    display: flex;\n    background-color: rgba(0, 0, 0, 0.3);\n    position: absolute;\n    z-index: 1;\n    top: 0;\n    left: ",";\n    right: ",";\n  }\n\n  .isoFormContentWrapper {\n    width: 500px;\n    height: 100%;\n    overflow-y: auto;\n    z-index: 10;\n    position: relative;\n  }\n\n  .isoFormContent {\n    min-height: 100%;\n    display: flex;\n    flex-direction: column;\n    padding: 70px 50px;\n    position: relative;\n    background-color: #ffffff;\n\n    @media only screen and (max-width: 767px) {\n      width: 100%;\n      padding: 70px 20px;\n    }\n\n    .isoLogoWrapper {\n      width: 100%;\n      display: flex;\n      margin-bottom: 70px;\n      justify-content: center;\n\n      a {\n        font-size: 24px;\n        font-weight: 300;\n        line-height: 1;\n        text-transform: uppercase;\n        color: ",";\n      }\n    }\n\n    .isoFormHeadText {\n      width: 100%;\n      display: flex;\n      flex-direction: column;\n      margin-bottom: 15px;\n      justify-content: center;\n\n      h3 {\n        font-size: 14px;\n        font-weight: 500;\n        line-height: 1.2;\n        margin: 0 0 7px;\n        color: ",";\n      }\n\n      p {\n        font-size: 13px;\n        font-weight: 400;\n        line-height: 1.2;\n        margin: 0;\n        color: ",";\n      }\n    }\n\n    .isoResetPassForm {\n      width: 100%;\n      display: flex;\n      flex-shrink: 0;\n      flex-direction: column;\n\n      .isoInputWrapper {\n        margin-bottom: 10px;\n\n        &:last-child {\n          margin-bottom: 0;\n        }\n\n        input {\n          &::-webkit-input-placeholder {\n            color: ",";\n          }\n\n          &:-moz-placeholder {\n            color: ",";\n          }\n\n          &::-moz-placeholder {\n            color: ",";\n          }\n          &:-ms-input-placeholder {\n            color: ",";\n          }\n        }\n\n        button {\n          height: 42px;\n          width: 100%;\n          font-weight: 500;\n          font-size: 13px;\n        }\n      }\n    }\n  }\n"]),s=o.b.div(c,a.a,function(n){return"rtl"===n["data-rtl"]?"inherit":"0"},function(n){return"rtl"===n["data-rtl"]?"0":"inherit"},Object(i.palette)("secondary",2),Object(i.palette)("text",0),Object(i.palette)("text",2),Object(i.palette)("grayscale",0),Object(i.palette)("grayscale",0),Object(i.palette)("grayscale",0),Object(i.palette)("grayscale",0));e.a=Object(l.a)(s)}});