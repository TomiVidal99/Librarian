import { useContext } from "react"
import { LanguageContext } from "../../../../../../state"
import { Button } from "./../../../../components"

export const ResetSettings = (): JSX.Element => {
  const { getTranslated } = useContext(LanguageContext);
  const handleResetSettings = () => {
    window.api.resetSettings();
  }
  return (
    <Button type="delete" content={getTranslated("resetButton")} callback={handleResetSettings} />
  )
}
