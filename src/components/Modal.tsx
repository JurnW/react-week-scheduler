import classcat from 'classcat';
import { getHours, getMinutes, setHours, setMinutes } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
// @ts-ignore
import Clock from '../components/assets/clock-icon';
import useOutsideClick from '../hooks/useOutsideClick';
import { classes } from '../styles';
import { OnChangeCallback, ScheduleType } from '../types';

interface Props {
  isOpen?: boolean;
  handleOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
  ranges: ScheduleType;
  rangeIndex: number;
  onChange: OnChangeCallback;
}
export const Modal: React.FC<Props> = (props: Props) => {
  const {
    isOpen,
    handleOpen,
    handleDelete,
    ranges,
    rangeIndex,
    onChange,
  } = props;
  const padLeft = (number: number) => number.toString().padStart(2, '0');
  const [nameError, setNameError] = useState<Array<{
    field: string;
    error: string;
  }> | null>(null);

  const [startHours, setStartHours] = useState(
    padLeft(getHours(ranges[rangeIndex][0])),
  );
  const [startMinutes, setStartMinutes] = useState(
    padLeft(getMinutes(ranges[rangeIndex][0])),
  );
  const [endHours, setEndHours] = useState(
    padLeft(getHours(ranges[rangeIndex][1])),
  );
  const [endMinutes, setEndMinutes] = useState(
    padLeft(getMinutes(ranges[rangeIndex][1])),
  );

  const clickRef = useRef(null);

  useOutsideClick(clickRef, () => {
    handleOpen(false);
  });

  const saveResult = (index: number) => {
    let startTime = setMinutes(
      setHours(ranges[rangeIndex][0], Number(startHours)),
      Number(startMinutes),
    );
    let endTime = setMinutes(
      setHours(ranges[rangeIndex][1], Number(endHours)),
      Number(endMinutes),
    );

    if (
      ranges[rangeIndex][0] === startTime &&
      ranges[rangeIndex][1] === endTime
    ) {
      return;
    }
    const newDate: [Date, Date, string, string] = [
      startTime,
      endTime,
      'local',
      '',
    ];

    onChange(newDate, index);
  };

  const validateHours = (rangeIndex: number) => {
    const errors = [];
    const hourFields = [
      ['startHours', startHours],
      ['endHours', endHours],
    ];

    if (
      Number(startHours) + Number(startMinutes) >
      Number(endHours) + Number(endMinutes)
    ) {
      errors.push({
        field: '',
        error: 'The start time can not exceed the end time',
      });
    }

    for (const field of hourFields) {
      if (field[1] === '') {
        errors.push({
          field: field[0],
          error: "This field can't be empty",
        });
      } else if (field[1].match(/^[0-9]+$/) === null) {
        errors.push({
          field: field[0],
          error: 'Please input a number',
        });
      } else if (Number(field[1]) < 0 || Number(field[1]) > 24) {
        errors.push({
          field: field[0],
          error: 'Please input a number between 0-24',
        });
      }
    }

    if (errors.length !== 0) {
      setNameError(errors);
    } else {
      setNameError(null);
      saveResult(rangeIndex);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    // Check if it overlaps any other range

    // Check if it is shorter than meetingDuration
    let startTime = setMinutes(
      setHours(ranges[rangeIndex][0], Number(startHours)),
      Number(startMinutes),
    );
    let endTime = setMinutes(
      setHours(ranges[rangeIndex][1], Number(endHours)),
      Number(endMinutes),
    );

    console.log(new Date(startTime));

    // const currentDuration = intervalToDuration({
    //   start: new Date(startTime),
    //   end: new Date(endTime),
    // });

    // console.log(currentDuration);

    // get start time date
    // get end time date
    // calculate meeting duration
    // compare to meetingDuration props
  }, [startHours, startMinutes, endHours, endMinutes]);

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
        ref={clickRef}
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
              required
              onChange={e => setStartHours(e.target.value)}
              pattern="[0-9]*"
              type="text"
              name="startHours"
              className={classcat([
                classes['time-input'],
                {
                  [classes['input-error']]:
                    nameError?.filter(o => o.field === 'startHours').length ===
                    1,
                },
              ])}
            ></input>
            <span>:</span>
            <div className={classcat([classes['dropdown']])}>
              <select
                name="minutes"
                className={classcat([classes['dropdown-select']])}
                value={Number(startMinutes)}
                onChange={e => setStartMinutes(e.target.value)}
              >
                <option value="00">00 Minutes</option>
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
              required
              onChange={e => setEndHours(e.target.value)}
              pattern="[0-9]*"
              type="text"
              name="hours"
              className={classcat([
                classes['time-input'],
                {
                  [classes['input-error']]:
                    nameError?.filter(o => o.field === 'endHours').length === 1,
                },
              ])}
            ></input>
            <span>:</span>
            <div className={classcat([classes['dropdown']])}>
              <select
                name="minutes"
                className={classcat([classes['dropdown-select']])}
                value={Number(endMinutes)}
                onChange={e => setEndMinutes(e.target.value)}
              >
                <option value="00">00 Minutes</option>
                <option value="15">15 Minutes</option>
                <option value="30">30 Minutes</option>
                <option value="45">45 Minutes</option>
              </select>
              <span className={classcat([classes['dropdown-label']])}>
                {endMinutes}
              </span>
            </div>
          </div>
          {nameError && (
            <span style={{ color: '#e54918' }}>{nameError[0].error}</span>
          )}
          <button
            className={classcat([classes['save-btn']])}
            // disabled={error.length > 0}
            onClick={() => {
              validateHours(rangeIndex);
            }}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
function intervalToDuration(arg0: { start: Date; end: Date }) {
  throw new Error('Function not implemented.');
}
