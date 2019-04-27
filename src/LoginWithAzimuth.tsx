import { create } from "zoid/dist/zoid";

export default create({
  tag: "login-with-azimuth",
  url: "/frame.html",
  defaultContext: "popup",
  // prerenderTemplate: function containerTemplate({ doc }) {
  //   const p = doc.createElement("html");
  //   p.innerText = "Please wait while the component loads...";
  //   return p;
  // },
});
