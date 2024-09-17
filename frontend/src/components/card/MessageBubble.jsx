import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

const MessageBubble = (data) => {
    return (
        <div
        sx={{
            with: "100% !important",
        }}
        className='messageBubble'
        >
            <Stack
                sx={
                    data.data.user = "me" ?
                        {
                            maxWidth: '50%',
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            justifyContent: "space-between",
                            gap: "1rem",
                            alignItems: "flex-end",
                            float: "right",
                        } :
                        {
                            maxWidth: '50%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            gap: "1rem",
                            alignItems: "flex-end",
                        }
                }
            >
                <Stack direction="row" spacing={1} useFlexGap sx={{ margin: "1rem 0" }}>
                    <Avatar alt="UserAvt" src={data.data.avt} />
                </Stack>
                <Card sx={{
                    display: 'flex',
                    minWidth: '15rem',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <CardMedia
                        component="img"
                        sx={{
                            maxWidth: "50%",
                        }}
                        image="https://meliawedding.com.vn/wp-content/uploads/2022/03/avatar-gai-xinh-1.jpg"
                        alt="Live from space album cover"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%", justifyContent: "flex-end", paddingRight: "1rem" }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h6">
                                {data.data.content}
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', width: "100%", pl: 1, pb: 1 }}>
                            {data.data.time} phút trước
                        </Box>
                    </Box>
                </Card>
            </Stack>
        </div>
    );
}

export default MessageBubble;