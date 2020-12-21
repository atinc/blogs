import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";

import "@worktile/pc-site-styx/static/header";
import "@worktile/pc-site-styx/static/footer";
import "@worktile/pc-site-styx/static/styles/header.css";
import "@worktile/pc-site-styx/static/styles/footer.css";

import "./css/index.scss";
import { init } from "./js/main";

init();

UIkit.use(Icons);
