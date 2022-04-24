import { metadata } from "../../assets/metadata"
import { SoorahListItem } from "./SoorahListItem"

export const SoorahList = () => (
  <div className="mt-2 border-t border-gray-300">
    {metadata.map((soorah) => (
      <SoorahListItem key={soorah.id} soorah={soorah} />
    ))}
  </div>
)
