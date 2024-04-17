import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { iState } from 'components/QuoteInput';

interface IProps {
    state: iState;
    setState: React.Dispatch<React.SetStateAction<iState>>;
}

export default function DatenTimePicker({ state, setState }: IProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'TimePicker']}>
                <DatePicker
                    label="Service Date"
                    value={state?.date}
                    onChange={(newValue) => setState((prev) => ({ ...prev, date: newValue }))}
                />
                <TimePicker
                    label="Service Time"
                    value={state?.time}
                    onChange={(newValue) => setState((prev) => ({ ...prev, time: newValue }))}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
