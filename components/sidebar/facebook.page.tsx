import Script from "next/script"

const FacebookPage = (): JSX.Element => (
  <div className="card d-none d-lg-block">
    <div id="fb-root"></div>
    <Script
      async
      defer
      crossOrigin="anonymous"
      src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0&appId=783652468370643&autoLogAppEvents=1"
      nonce="YNCdRN8r"
    />
    <div className="card-header">PRIDRUŹI NAM SE</div>
    <div className="col">
      <div
        className="fb-page"
        data-href="https://www.facebook.com/mojkuran/"
        data-width="416"
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
        data-lazy="true"
      >
        <blockquote
          cite="https://www.facebook.com/mojkuran/"
          className="fb-xfbml-parse-ignore"
        >
          <a href="https://www.facebook.com/mojkuran/">Moj Kur&#039;an</a>
        </blockquote>
      </div>
      {/* <iframe
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fmojkuran&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId"
        width="340"
        height="130"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe> */}
    </div>
  </div>
)

export default FacebookPage
