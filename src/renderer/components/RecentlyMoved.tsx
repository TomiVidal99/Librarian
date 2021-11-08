/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MODULES ~~~~~ */
import { ReactElement, useContext } from 'react';
import { StateContext } from 'renderer/contexts/StateContext';
import getRandomIds from 'renderer/utils/getRandomIds';
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ COMPONENTS ~~~~~ */
import MovedFile from './MovedFile';
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TYPES ~~~~~ */
// interface RecentlyMovedProps {}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MAIN CONTENT ~ */
const RecentlyMoved = (): ReactElement => {
  const { state } = useContext(StateContext);
  return (
    <section
      style={{
        display: state.recentlyMoved.length > 0 ? 'flex' : 'none',
      }}
      className="recently_moved section"
    >
      <h3 className="section__title">Recently Moved</h3>
      <ul className="list" style={{ flexDirection: 'column-reverse' }}>
        {state.recentlyMoved.map(
          ({ name, origin, destination, time }: RecentlyMovedType) => {
            // if the date is string get the date from it
            let date: Date | null = null;
            if (time !== date) {
              date = new Date(time);
            } else {
              date = time;
            }

            return (
              <MovedFile
                key={getRandomIds()}
                filename={name}
                date={`${date.toLocaleTimeString()} - ${date.toLocaleDateString()}`}
                fromPath={origin}
                toPath={destination}
              />
            );
          }
        )}
      </ul>
    </section>
  );
};

export default RecentlyMoved;
