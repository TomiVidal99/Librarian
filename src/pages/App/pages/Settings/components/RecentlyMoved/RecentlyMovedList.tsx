import { useContext } from "react";
import { LanguageContext } from "../../../../../../state";
import { RecentlyMovedItem } from "..";
import { IRecentlyMovedFolder } from "../../../../../../models";

import "./RecentlyMovedList.style.scss";

interface IProps {
  list: IRecentlyMovedFolder[];
  className?: string;
}

export const RecentlyMovedList = ({ list, className }: IProps) => {
  const { getTranslated } = useContext(LanguageContext);
  return (
    <ul className={`recently-moved-list ${className}`}>
      {list.map((item) => (
        <RecentlyMovedItem
          translationData={[
            getTranslated("recentlyMovedFrom"),
            getTranslated("recentlyMovedTo"),
          ]}
          key={item.id}
          item={item}
        />
      ))}
    </ul>
  );
};
