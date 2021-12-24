import React from "react";

import FacebookProvider from "react-facebook/dist/FacebookProvider";
import Page from "react-facebook/dist/Page";

const FacebookPage = () => (
  <div className="card d-none d-lg-block">
    <div className="card-header">PRIDRUŹI NAM SE</div>
    <div id="fb-root">
      <FacebookProvider appId="1712023152344157">
        <Page href="https://www.facebook.com/mojkuran/" tabs="none" />
      </FacebookProvider>
    </div>
  </div>
);

export default FacebookPage;
