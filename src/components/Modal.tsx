import classcat from 'classcat';
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
// @ts-ignore
import Clock from '../components/assets/clock-icon';
import { classes } from '../styles';

interface Props {
  isOpen?: boolean;
  handleOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
}
export const Modal: React.FC<Props> = (props: Props) => {
  const { isOpen, handleOpen, handleDelete } = props;

  const wrapperRef = useRef(null);

  return ReactDOM.createPortal(
    <div className="layout">
      <div
        className={classcat([
          classes.modal,
          classes['modal-wrapper'],
          {
            [classes['show-up-to-laptops']]: isOpen,
          },
        ])}
        style={{ display: isOpen ? 'block' : 'none' }}
        ref={wrapperRef}
      >
        <div className={classcat([classes['header']])}>
          <span className={classcat([classes['title']])}>Edit time slot</span>
          <button
            className={classcat([classes['remove-btn']])}
            onClick={e => {
              e.preventDefault();
              handleDelete();
              handleOpen(false);
            }}
          >
            Remove
          </button>
          <button
            className={classcat([classes['close']])}
            onClick={e => {
              e.preventDefault();
              handleOpen(false);
            }}
          ></button>
        </div>
        <div className={classcat([classes['modal-body']])}>
          <div className={classcat([classes['time-row']])}>
            <Clock />
            <label htmlFor="start-time">Start time</label>{' '}
            <input
              defaultValue={11}
              pattern="[0-9]*"
              type="text"
              name="hours"
              className={classcat([classes['time-input']])}
            ></input>
            <span>:</span>
            <div className={classcat([classes['dropdown']])}>
              <span className={classcat([classes['dropdown-label']])}>15</span>
              <select
                name="minutes"
                className={classcat([classes['dropdown-select']])}
              >
                <option value="0">0 Minutes</option>
                <option value="15">15 Minutes</option>
                <option value="30">30 Minutes</option>
                <option value="45">45 Minutes</option>
              </select>
            </div>
          </div>
          <div className={classcat([classes['time-row']])}>
            <Clock />
            <label htmlFor="end-time">End time</label>{' '}
            <input
              defaultValue={11}
              pattern="[0-9]*"
              type="text"
              name="hours"
              className={classcat([classes['time-input']])}
            ></input>
            <span>:</span>
            <div className={classcat([classes['dropdown']])}>
              <span className={classcat([classes['dropdown-label']])}>15</span>
              <select
                name="minutes"
                className={classcat([classes['dropdown-select']])}
              >
                <option value="0">0 Minutes</option>
                <option value="15">15 Minutes</option>
                <option value="30">30 Minutes</option>
                <option value="45">45 Minutes</option>
              </select>
            </div>
          </div>
          <button className={classcat([classes['save-btn']])}>
            Save changes
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
