import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";

import "@worktile/site-styx/static/header";
import "@worktile/site-styx/static/footer";
import "@worktile/site-styx/static/styles/header.css";
import "@worktile/site-styx/static/styles/footer.css";

import "./css/index.scss";
import { init } from "./js/main";

init();

UIkit.use(Icons);
