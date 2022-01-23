import { Card } from "../../ui/Card/Card"

export const FacebookPage = (): JSX.Element => (
  <Card title="PRIDRUŹI NAM SE" className={"px-0 py-0"}>
    <div
      className="fb-page object-fill w-full"
      data-href="https://www.facebook.com/mojkuran/"
      data-width="500"
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
  </Card>
)

export default FacebookPage
