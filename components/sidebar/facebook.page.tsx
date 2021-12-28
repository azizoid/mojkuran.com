const FacebookPage = (): JSX.Element => (
  <div className="card d-none d-lg-block">
    <div className="card-header">PRIDRUŹI NAM SE</div>
    <div className="col">
      <iframe
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fmojkuran&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId"
        width="340"
        height="130"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    </div>
  </div>
)

export default FacebookPage
