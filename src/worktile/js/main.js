function headerMenu() {
  const doms = {
    headerMenu: document.querySelector(".header-menu"),
    menuBoard: document.querySelector(".menu-board"),
  };
  if (!doms.headerMenu) {
    return (void 0);
  }
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
  if (!doms.logoArrow) {
    return (void 0);
  }
  doms.logoArrow.onclick = function (e) {
    e.stopPropagation();
    doms.logoArrow.classList.add("show-logo-nav");
    doms.panel.classList.add("show-logo-nav");
  };
  document.body.onclick = function () {
    doms.logoArrow.classList.remove("show-logo-nav");
    doms.panel.classList.remove("show-logo-nav");
  };
}

module.exports = {
  init: function () {
    headerMenu();
    logoHoverSwitchPanel();
  },
};
