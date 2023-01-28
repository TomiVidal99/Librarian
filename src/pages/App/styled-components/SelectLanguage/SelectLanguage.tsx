import { LanguageType } from "../../../../utils";
import { Select } from "../../components";

interface IProps {
  availableLanguages: LanguageType[];
  selectedLanguageCallback: (arg0: LanguageType) => void;
  defaultValue: LanguageType;
}

export const LanguageSelector = ({
  availableLanguages,
  selectedLanguageCallback,
  defaultValue,
}: IProps): JSX.Element => {
  return (
    <Select<LanguageType>
      availableOptions={availableLanguages}
      selectedOptionsCallback={selectedLanguageCallback}
      defaultValue={defaultValue}
    />
  );
};
