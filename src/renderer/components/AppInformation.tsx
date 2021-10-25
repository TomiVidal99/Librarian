/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MODULES ~~~~~ */
import { ReactElement } from 'react';
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ COMPONENTS ~~~~~ */
import '../styles/AppInformation.global.css';
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TYPES ~~~~~ */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MAIN CONTENT ~ */
const AppInformation = (): ReactElement => {
  return (
    <section className="section app_information">
      <h2 className="section__title">Information and Usage</h2>
      <div className="information_container">
        <p className="app_information_body">
          This apps keeps tracks of new files inside the &quot;Origin
          Folders&quot;, once a new file appears inside the folder is moved to a
          &quot;Destination Folder&quot; based on the &quot;Filters&quot;
          selected previously.
        </p>
        <p className="app_information_body">
          To start add a &quot;Origin Folder&quot;, after add a
          &quot;Destination Folder&quot; (sort your files by a name pattern or
          by the format, regular expression are currently not available), and
          that&quot;s it! Now just sit back and watch all files being sorted.
        </p>
      </div>
    </section>
  );
};

export default AppInformation;
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */
