import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function DatenTimePicker() {
    const [dateValue, setDateValue] = React.useState<Dayjs | null>(dayjs('2023-12-01'));
    const [timeValue, setTimeValue] = React.useState<Dayjs | null>(dayjs('0000-00-00'));

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'TimePicker']}>
                <DatePicker
                    label="Service Date"
                    value={dateValue}
                    onChange={(newValue) => setDateValue(newValue)}
                />
                <TimePicker
                    label="Service Time"
                    value={timeValue}
                    onChange={(newValue) => setTimeValue(newValue)}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
