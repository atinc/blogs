function headerMenu() {
  const doms = {
    headerMenu: document.querySelector(".header-menu"),
    menuBoard: document.querySelector(".menu-board"),
  };
  doms.headerMenu.onclick = function () {
    if (doms.headerMenu.classList.contains("header-menu--show-close")) {
      doms.headerMenu.classList.remove("header-menu--show-close");
      doms.menuBoard.classList.remove("menu-board--show");
    } else {
      doms.headerMenu.classList.add("header-menu--show-close");
      doms.menuBoard.classList.add("menu-board--show");
    }
  };
}

function logoHoverSwitchPanel() {
  const doms = {
    logoArrow: document.querySelector("#logo-switch"),
    panel: document.querySelector("#logo-switch-panel"),
  };
  doms.logoArrow.onmouseenter = function (e) {
    e.stopPropagation();
    doms.logoArrow.classList.add("show-logo-nav");
    doms.panel.classList.add("show-logo-nav");
  };
  doms.logoArrow.onmouseleave = function () {
    doms.logoArrow.classList.remove("show-logo-nav");
    doms.panel.classList.remove("show-logo-nav");
  };
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

function checkWxProgram() {
  const checkList = {
    checkUrlParams: getQueryVariable("access_environment") && getQueryVariable("access_environment") === "wx_program",
  };
  if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
    //首先判断当前是否存在微信桥
    document.addEventListener(
      "WeixinJSBridgeReady",
      function () {
        //微信桥不存在则监听微信桥准备事件
        if (window.__wxjs_environment === "miniprogram") {
          //当微信桥挂在上了之后则判断当前微信环境是否为小程序
          if (checkList.checkUrlParams) {
            document.querySelector('body').className += ' site-wx-program-environment';
          }
        }
      },
      false
    );
  }
}

module.exports = {
  init: function () {
    checkWxProgram();
    headerMenu();
    // logoHoverSwitchPanel();
  },
};
