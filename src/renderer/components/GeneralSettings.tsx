/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MODULES ~~~~~ */
import { ReactElement, useContext } from 'react';
import { StateContext } from 'renderer/contexts/StateContext';
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ COMPONENTS ~~~~~ */
import ACTIONS from 'renderer/STATE_ACTIONS';
import DropDownMenu from './DropDownMenu';
import Checkbox from './Checkbox';
// import Button from './Button';
import '../styles/GeneralSettings.global.css';
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TYPES ~~~~~ */
// interface GeneralSettingsProps {}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MAIN CONTENT ~ */
const availableLanguages = ['en-US', 'es-AR'];
const GeneralSettings = (): ReactElement => {
  const { state, setState } = useContext(StateContext);
  const handleLanguage = (language: string) => {
    setState({
      type: ACTIONS.UPDATE_STATE,
      payload: {
        language,
      },
    });
  };
  const handleArchivesNotifications = (isChecked: boolean) => {
    setState({
      type: ACTIONS.UPDATE_STATE,
      payload: {
        archivesNotifications: isChecked,
      },
    });
  };
  const handleGeneralNotifications = (isChecked: boolean) => {
    setState({
      type: ACTIONS.UPDATE_STATE,
      payload: {
        generalNotifications: isChecked,
      },
    });
  };
  // const handleClearData = () => {
  // console.log('clicked on clear data');
  // window.electron.ipcRenderer.clearState();
  // };
  return (
    <section className="general_settings section">
      <h3 className="section__title">General Settings</h3>
      {/* LANGUAGE */}
      {/* TODO: remove d-none class when language handling is done */}
      <div className="list_item general_settings__language d-none">
        <DropDownMenu
          options={availableLanguages}
          defaultValue={
            state.language ? availableLanguages.indexOf(state.language) : 0
          }
          label="Languages"
          handleItemCallback={(lang) => {
            handleLanguage(lang);
          }}
        />
      </div>
      {/* New archives notifications */}
      <div className="list_item general_settings__archives_notifications">
        <Checkbox
          checked={
            state.archivesNotifications ? state.archivesNotifications : false
          }
          label="Warn me on new archives without filter"
          name="archivesNotifications"
          callback={handleArchivesNotifications}
        />
      </div>
      {/* New archives notifications */}
      <div className="list_item general_settings__general_notifications">
        <Checkbox
          checked={
            state.generalNotifications ? state.generalNotifications : false
          }
          label="General notifications"
          name="generalNotifications"
          callback={handleGeneralNotifications}
        />
        {/* Clear all data */}
        {/* 
        <div className="list_item general_settings__clear_data">
          <Button content="Clear All Data" callback={handleClearData} />
        </div>
       */}
      </div>
    </section>
  );
};

export default GeneralSettings;
