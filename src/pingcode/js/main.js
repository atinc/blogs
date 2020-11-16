const jquery = require('jquery');
const BLOG_SHARE_APP_ID = 'wxedc101aec3d70448';
const HOST = location.hostname === 'localhost' ? 'http://pingcode.live' : 'https://pingcode.com';

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
  if (/miniProgram/i.test(navigator.userAgent) && checkList.checkUrlParams) {
    document.querySelector('body').className += ' site-wx-program-environment';
  }
}

function getShareConfig() {
  jquery.ajax({
    method: "GET",
    url: HOST + '/api/siren/wechat/signature',
    data: { url: encodeURIComponent(location.href) }
  })
    .then(data => {
      console.log('response data:>> ', data);
      console.log('wx.config :>> ', wx.config);
      const { nonceStr, signature, timestamp } = data.data.value;
      wx.config({
        debug: false,
        appId: BLOG_SHARE_APP_ID,
        timestamp,
        nonceStr,
        signature,
        jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'],
      });
    })
    .done(function (msg) {
      console.log('msg :>> ', msg);
      const title = document.querySelector('meta[property="og:title"]').getAttribute('content') || 'pingcode-blog分享';
      const desc = document.querySelector('meta[property="og:description"]').getAttribute('content') || 'pingcode-desc描述';
      const imgUrl = location.origin + '/favicon.ico';
      wx.ready(function () {
        wx.updateAppMessageShareData({
          title, // 分享标题
          desc, // 分享描述
          imgUrl, // 分享图标
          success: function () {
            // 设置成功
            console.log(' updateAppMessageShareData 成功');
          }
        })
        wx.updateTimelineShareData({
          title, // 分享标题
          imgUrl, // 分享图标
          success: function () {
            // 设置成功
            console.log(' updateTimelineShareData 成功');
          }
        })
      });
      wx.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        console.error(res);
      });
    });
}

module.exports = {
  init: function () {
    getShareConfig();
    checkWxProgram();
    headerMenu();
    // logoHoverSwitchPanel();
  },
};
