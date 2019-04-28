import { create } from "zoid/dist/zoid";

export default create({
  tag: "login-with-azimuth",
  url: "/frame.html",
  defaultContext: "popup",
  dimensions: {
    width: "250px",
    height: "400px",
  },
  prerenderTemplate: function containerTemplate({ doc }) {
    return null;
  },
});
