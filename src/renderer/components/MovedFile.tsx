/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MODULES ~~~~~ */
import { ReactElement } from 'react';
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ COMPONENTS ~~~~~ */
import '../styles/MovedFile.global.css';

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TYPES ~~~~~ */
interface MovedFileProps {
  filename: string;
  date: string;
  fromPath: string;
  toPath: string;
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MAIN CONTENT ~ */
const MovedFile = ({
  filename,
  date,
  fromPath,
  toPath,
}: MovedFileProps): ReactElement => {
  // opens the folder of the containing file
  const handleOpenFileFolder = () => {
    window.electron.ipcRenderer.openFolder(toPath);
  };
  return (
    <li
      role="presentation"
      onClick={handleOpenFileFolder}
      className="list_item moved_file"
    >
      <div className="moved_file__filename">{filename}</div>
      <div className="moved_file__date">{date}</div>
      <div className="moved_file__paths">
        From: {fromPath}
        <br />
        To: {toPath}
      </div>
    </li>
  );
};

export default MovedFile;
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */
