import ScrollToTop from "@/base-components/scroll-to-top/Main";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { DebugObserver } from "./stores/DebugObserver";
import { NotificationGlobal } from "@/base-components";

import Router from "./router";

function App() {
  return (
    <RecoilRoot>
      {/* EN PRO QUITAR EL DEBUG */}
      <DebugObserver />
      <BrowserRouter>
        <Router />
        <ScrollToTop />
      </BrowserRouter>
      <NotificationGlobal />
    </RecoilRoot>
  );
}

export default App;
