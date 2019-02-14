import bootstrap from "./bootstrap";
import createStore from "./create-store";

let store = createStore();

bootstrap(store);

if (module.hot) {
  module.hot.accept(() => {
    require("./bootstrap").default(store);
  });
}
