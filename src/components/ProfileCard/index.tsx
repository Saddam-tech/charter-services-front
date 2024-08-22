import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';
import { ProfileCreds } from 'configs/types';
import { EPS, provider } from 'configs/axios';
import { Input } from '@mui/joy';
import styled from 'styled-components';
import { useToasts } from 'react-toast-notifications';
import { MESSAGES } from 'utils/messages';
import { defaultAdmin } from 'configs/constants';

interface IProps {
    adminInfo: ProfileCreds;
    setState: React.Dispatch<React.SetStateAction<ProfileCreds>>;
}

export default function ProfileCard({ adminInfo, setState }: IProps) {
    const {
        firstname,
        lastname,
        username,
        bio,
        profileImgUrl,
    } = adminInfo;
    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [passwordCheck, setPasswordCheck] = React.useState<string>("");
    const [pwDanger, setPwDanger] = React.useState<boolean>(false);
    const [updateData, setUpdateData] = React.useState<ProfileCreds>(defaultAdmin);
    const { addToast } = useToasts();

    function handleImageClickWhileEditing() {
        if (isEditing && fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setState((prev) => ({ ...prev, profileImgUrl: URL.createObjectURL(file) }));
            setUpdateData(prev => ({ ...prev, file }))
        }
    }

    async function handleEdit() {
        try {
            if (updateData?.password !== passwordCheck) {
                addToast(MESSAGES.PW_NO_MATCH, {
                    appearance: 'error',
                    autoDismiss: true
                })
                return;
            }
            const formData = new FormData();
            for (let [key, value] of Object.entries(updateData || {})) {
                if (value !== "") {
                    formData.append(key, value);
                }

            }
            const { data: { admin } } = await provider.put(EPS.ADMIN_UPDATE, formData);
            console.log({ admin })
            setState(admin);
            addToast(MESSAGES.EDIT_COMPLETE("Admin credentials"), {
                appearance: 'success',
                autoDismiss: true
            })
            setUpdateData((prev) => ({ ...prev, password: "" }))
            setPasswordCheck("");
            setIsEditing(false);
        } catch (err) {
            addToast(MESSAGES.EDIT_FAILURE("admin credentials"), {
                appearance: 'error',
                autoDismiss: true
            })
            console.log(err);
        }
    }

    React.useEffect(() => {
        if (updateData.password !== passwordCheck) {
            setPwDanger(true);
        } else {
            setPwDanger(false);
        }
    }, [updateData.password, passwordCheck])


    return (
        <Card
            sx={{
                width: "100%",
                maxWidth: 700,
                boxShadow: 'lg',
            }}
        >
            <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                <>
                    <Avatar onClick={handleImageClickWhileEditing} src={profileImgUrl} sx={{ '--Avatar-size': '4rem', cursor: 'pointer' }} />
                    {isEditing && <input ref={fileInputRef} id="blogInput" type="file" name="blogInput" onChange={handleFileChange} hidden />}
                </>
                <Chip
                    size="sm"
                    variant="soft"
                    color="primary"
                    sx={{
                        mt: -1,
                        mb: 1,
                        border: '3px solid',
                        borderColor: 'background.surface',
                    }}
                >
                    {username}
                </Chip>
                <Typography level="title-lg">{firstname} {lastname}</Typography>
                {isEditing && <Container>
                    <InputWrap>
                        <LineWrap>
                            <Typography level="title-lg">Username</Typography>
                            <Input variant="soft" value={updateData.username || username} placeholder="Username here..." onChange={(e) => setUpdateData(prev => ({ ...prev, username: e.target.value }))} />
                        </LineWrap>
                        <LineWrap>
                            <Typography level="title-lg">Firstname</Typography>
                            <Input variant="soft" value={updateData.firstname || firstname} placeholder="Firstname here..." onChange={(e) => setUpdateData(prev => ({ ...prev, firstname: e.target.value }))} />
                        </LineWrap>
                        <LineWrap>
                            <Typography level="title-lg">Lastname</Typography>
                            <Input variant="soft" value={updateData.lastname || lastname} placeholder="Lastname here..." onChange={(e) => setUpdateData(prev => ({ ...prev, lastname: e.target.value }))} />
                        </LineWrap>
                        <LineWrap>
                            <Typography level="title-lg">Password</Typography>
                            <Input color={pwDanger ? 'danger' : 'neutral'} variant="soft" value={updateData.password} placeholder="Password here..." onChange={(e) => setUpdateData(prev => ({ ...prev, password: e.target.value }))} />
                        </LineWrap>
                        <LineWrap>
                            <Typography level="title-lg">Pw-Check</Typography>
                            <Input color={pwDanger ? 'danger' : 'neutral'} variant="soft" value={passwordCheck} placeholder="Password here..." onChange={(e) => setPasswordCheck(e.target.value)} />
                        </LineWrap>
                    </InputWrap>
                </Container>}
                {isEditing ? <Textarea value={updateData.bio || bio} onChange={(e) => setUpdateData(prev => ({ ...prev, bio: e.target.value }))} placeholder="Type Header" /> : <Typography level="body-sm">
                    {bio}
                </Typography>}
            </CardContent>
            <CardOverflow sx={{ bgcolor: 'background.level1' }}>
                <CardActions buttonFlex="1">
                    <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
                        {isEditing && (
                            <>
                                <Button onClick={handleEdit}>Save</Button>
                                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                            </>
                        )}
                        {!isEditing && <Button onClick={() => setIsEditing(true)}>Edit</Button>}
                    </ButtonGroup>
                </CardActions>
            </CardOverflow>
        </Card>
    );
}

const Container = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const InputWrap = styled.section`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;
    flex-direction: column;
    padding: 20px;
`

const LineWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

const Textarea = styled.textarea`
    max-width: 600px;
    width: 100%;
    height: 500px;
    background-color: rgb(255, 255, 255, 0.3);
    border: none;
    border-radius: 10px;
    padding: 10px;
    @media screen and (max-width: 728px) {
        width: 100%;
    }
`