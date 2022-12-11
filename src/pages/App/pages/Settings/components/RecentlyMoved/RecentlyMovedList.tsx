import { RecentlyMovedItem } from ".."
import { IRecentlyMovedFolder } from "../../../../../../models"

import "./RecentlyMovedList.style.scss"

interface IProps {
  list: IRecentlyMovedFolder[];
  className?: string;
}

export const RecentlyMovedList = ({ list, className }: IProps) => {
  return (
    <ul className={`recently-moved-list ${className}`}>
      {list.map((item) =>
        <RecentlyMovedItem key={item.id} item={item} />
      )}
    </ul>
  )
}
