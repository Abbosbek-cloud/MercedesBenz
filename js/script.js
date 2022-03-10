import accordion from "./modules/accordion";
import classes from "./modules/classes";
import data from "./modules/data";
import form from "./modules/form";
import loader from "./modules/loader";
import modal from "./modules/modal";
import slider from "./modules/slider";
// import tabs from "./modules/tab";

window.addEventListener("DOMContentLoaded", () => {
  accordion();
  classes();
  data();
  form();
  loader();
  modal();
  slider();
  // tabs();
});
