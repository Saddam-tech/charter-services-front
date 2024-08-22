import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CommonAlertDialog({ header, content, actionBtn, open, setOpen, exec }: { header: string; content?: string; actionBtn: string; open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, exec: () => void }) {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" sx={{ width: '100%', minWidth: '400px' }}>
                {header}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{"Cancel"}</Button>
                <Button onClick={exec} autoFocus>
                    {actionBtn}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
