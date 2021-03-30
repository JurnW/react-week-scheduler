import classcat from 'classcat';
import {
  differenceInMilliseconds,
  getHours,
  getMinutes,
  setHours,
  setMinutes,
} from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
// @ts-ignore
import Alert from '../components/assets/alert-icon';
// @ts-ignore
import Clock from '../components/assets/clock-icon';
// @ts-ignore
import InformationIcon from '../components/assets/information-icon';
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
  meetingDuration: number;
}
export const Modal: React.FC<Props> = (props: Props) => {
  const {
    isOpen,
    handleOpen,
    handleDelete,
    ranges,
    rangeIndex,
    onChange,
    meetingDuration,
  } = props;
  const padLeft = (number: number | string) =>
    number.toString().padStart(2, '0');
  const [nameError, setNameError] = useState<
    Array<{
      field: string;
      error: string;
    }>
  >([]);

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
  const startTime = setMinutes(
    setHours(ranges[rangeIndex][0], Number(startHours)),
    Number(startMinutes),
  );
  const endTime = setMinutes(
    setHours(ranges[rangeIndex][1], Number(endHours)),
    Number(endMinutes),
  );
  const durationInWords = (minutes: number) => {
    var hrs = Math.floor(minutes / 60);
    var mins = minutes % 60;
    return `(${hrs > 0 ? `${hrs}h ` : ''}${mins}m)`;
  };
  const durationTooShort =
    nameError?.filter(o => o.field === 'duration').length === 1;
  const overlapWarning =
    nameError?.filter(o => o.field === 'overlap').length === 1;

  const clickRef = useRef(null);

  useOutsideClick(clickRef, () => {
    handleOpen(false);
  });

  const saveResult = (index: number) => {
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

  const validateTimes = (rangeIndex: number) => {
    const errors = [];
    const hourFields = [
      ['startHours', startHours],
      ['endHours', endHours],
    ];

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

    if (Number(startHours + startMinutes) > Number(endHours + endMinutes)) {
      errors.push({
        field: '',
        error: 'The start time can not exceed the end time',
      });
    }

    if (errors.length !== 0) {
      setNameError(errors);
    } else {
      setNameError([]);
      saveResult(rangeIndex);
    }
  };

  useEffect(() => {
    if (!isOpen || startHours.length !== 2 || endHours.length !== 2) {
      return;
    }

    const errors = [];
    const currentDuration = differenceInMilliseconds(
      new Date(endTime),
      new Date(startTime),
    );

    if (currentDuration < meetingDuration * 60000) {
      errors.push({
        field: 'duration',
        error: 'Availability can not be shorter than the meeting duration',
      });
    }

    const hasConflicts = ranges.map((meeting, meetingIndex) => {
      const sameIndex = rangeIndex === meetingIndex;
      const timeRangeOverlaps =
        new Date(startTime) < meeting[1] && new Date(endTime) > meeting[0];
      return !sameIndex && timeRangeOverlaps;
    });

    if (hasConflicts.includes(true)) {
      errors.push({
        field: 'overlap',
        error:
          'Please note: This availability overlaps another one of your events',
      });
    }

    if (errors.length !== 0) {
      setNameError(errors);
    } else {
      setNameError([]);
    }
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
                    nameError?.filter(o => o.field === 'endHours').length ===
                      1 || durationTooShort,
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
          {nameError[0] && (
            <div
              className={classcat([
                classes['notice'],
                {
                  [classes['notice-warning']]: overlapWarning,
                },
              ])}
            >
              {overlapWarning ? <InformationIcon /> : <Alert />}
              <span>{`${nameError[0].error} ${
                durationTooShort ? durationInWords(meetingDuration) : ''
              }`}</span>
            </div>
          )}
          <button
            className={classcat([classes['save-btn']])}
            disabled={durationTooShort}
            onClick={e => {
              durationTooShort ? e.preventDefault : validateTimes(rangeIndex);
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
