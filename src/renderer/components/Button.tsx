/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MODULES ~~~~~ */
import { CSSProperties, ReactElement } from 'react';
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ COMPONENTS ~~~~~ */
import '../styles/Button.global.css';

const DeleteIconSVG = (): ReactElement => {
  return (
    <svg
      className="btn_icon delete_icon"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      style={{ verticalAlign: '-0.125em' }}
      width="32"
      height="32"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 512 512"
    >
      <path
        fill="red"
        d="M96 472a23.82 23.82 0 0 0 23.579 24h272.842A23.82 23.82 0 0 0 416 472V152H96zm32-288h256v280H128z"
      />
      <path fill="red" d="M168 216h32v200h-32z" />
      <path fill="red" d="M240 216h32v200h-32z" />
      <path fill="red" d="M312 216h32v200h-32z" />
      <path
        fill="red"
        d="M328 88V40c0-13.458-9.488-24-21.6-24H205.6C193.488 16 184 26.542 184 40v48H64v32h384V88zM216 48h80v40h-80z"
      />
    </svg>
  );
};

const AddIconSVG = () => {
  return (
    <svg
      className="btn_icon add_icon"
      id="add-icon"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill="#435168" fillOpacity="0.21" />
      <rect x="18" y="10" width="4" height="20" rx="2" fill="#5C9E45" />
      <rect
        x="10"
        y="22"
        width="4"
        height="20"
        rx="2"
        transform="rotate(-90 10 22)"
        fill="#5C9E45"
      />
    </svg>
  );
};
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TYPES ~~~~~ */
interface ButtonProps {
  content: string;
  callback: () => void;
  type?: 'default' | 'delete' | null;
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */
interface StyleType {
  default: CSSProperties;
  delete: CSSProperties;
}
const style: StyleType = {
  default: {},
  delete: {
    background: 'var(--delete-bg)',
    color: 'var(--delete-color)',
    fontFamily: 'var(--delete-ff)',
    fontWeight: 'var(--delete-fw)' as any,
  },
};
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MAIN CONTENT ~ */
const Button = ({
  content,
  callback,
  type = 'default',
}: ButtonProps): ReactElement => {
  return (
    <div className="button_container">
      <button
        style={type === 'default' ? style.default : style.delete}
        type="button"
        className="button"
        onClick={callback}
      >
        {type === 'default' ? <AddIconSVG /> : <DeleteIconSVG />}
        {content}
      </button>
    </div>
  );
};

Button.defaultProps = {
  type: 'default',
};

export default Button;
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */
