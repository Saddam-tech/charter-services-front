import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { EPS, provider } from 'configs/axios';
import { useToasts } from 'react-toast-notifications';
import { MESSAGES } from 'utils/messages';

export default function AlertDialog({ section_id, itemuuid, open, setOpen, loadBanners }: { section_id: number, itemuuid: string, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, loadBanners: (section_id: number) => Promise<void> }) {
    const { addToast } = useToasts();

    async function deleteHandler(uuid: string) {
        try {
            await provider.delete(EPS.DELETE_BANNER + `/${uuid}`);
            loadBanners(section_id);
            addToast(MESSAGES.DELETE_COMPLETE, {
                appearance: 'success',
                autoDismiss: true,
            });
            setOpen(false);
        } catch (err) {
            setOpen(false);
            console.log(err);
        }
    }

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
                {"Are you sure to delete?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {"Action can not be undone!"}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{"Cancel"}</Button>
                <Button onClick={() => deleteHandler(itemuuid)} autoFocus>
                    {"Delete"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
