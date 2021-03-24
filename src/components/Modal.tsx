import classcat from 'classcat';
import { getHours, getMinutes } from 'date-fns';
import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
// @ts-ignore
import Clock from '../components/assets/clock-icon';
import { classes } from '../styles';

interface Props {
  isOpen?: boolean;
  handleOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
  rangeString: [Date, Date, string, string];
}
export const Modal: React.FC<Props> = (props: Props) => {
  const { isOpen, handleOpen, handleDelete, rangeString } = props;
  const [startHours, setStartHours] = useState(getHours(rangeString[0]));
  const [startMinutes, setStartMinutes] = useState(
    getMinutes(rangeString[0])
      .toString()
      .padStart(2, '0'),
  );
  const [endHours, setEndHours] = useState(getHours(rangeString[1]));
  const [endMinutes, setEndMinutes] = useState(
    getMinutes(rangeString[1])
      .toString()
      .padStart(2, '0'),
  );

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
              defaultValue={startHours}
              onChange={e => setStartHours(Number(e.target.value))}
              pattern="[0-9]*"
              type="text"
              name="hours"
              className={classcat([classes['time-input']])}
            ></input>
            <span>:</span>
            <div className={classcat([classes['dropdown']])}>
              <select
                name="minutes"
                className={classcat([classes['dropdown-select']])}
                onChange={e => setStartMinutes(e.target.value)}
              >
                <option value="00">0 Minutes</option>
                <option value="15">15 Minutes</option>
                <option value="30">30 Minutes</option>
                <option value="45">45 Minutes</option>
              </select>
              <span className={classcat([classes['dropdown-label']])}>
                {startMinutes}
              </span>
            </div>
          </div>
          <div className={classcat([classes['time-row']])}>
            <Clock />
            <label htmlFor="end-time">End time</label>{' '}
            <input
              defaultValue={endHours}
              onChange={e => setEndHours(Number(e.target.value))}
              pattern="[0-9]*"
              type="text"
              name="hours"
              className={classcat([classes['time-input']])}
            ></input>
            <span>:</span>
            <div className={classcat([classes['dropdown']])}>
              <select
                name="minutes"
                className={classcat([classes['dropdown-select']])}
                onChange={e => setEndMinutes(e.target.value)}
              >
                <option value="00">0 Minutes</option>
                <option value="15">15 Minutes</option>
                <option value="30">30 Minutes</option>
                <option value="45">45 Minutes</option>
              </select>
              <span className={classcat([classes['dropdown-label']])}>
                {endMinutes}
              </span>
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
