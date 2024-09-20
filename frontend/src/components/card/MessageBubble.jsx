import React from 'react';

const MessageBubble = (data) => {
    return (
        <div
            style={
                data.data.user === "me" ?
                    {
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        flexDirection: "row",
                        margin: "2rem 1rem"
                    }
                    :
                    {
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        flexDirection: "row",
                        margin: "2rem 1rem"
                    }
            }
            className='messageBubble'
        >
            <div
                style={
                    data.data.user === "me" ?
                        {
                            maxWidth: '50%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            gap: "1rem",
                            alignItems: "flex-end",
                        }
                        :
                        {
                            maxWidth: '50%',
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            justifyContent: "space-between",
                            gap: "1rem",
                            alignItems: "flex-end",
                            float: "right",
                        }
                }
            >
                <div style={{ margin: "1rem 0", display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                    <img alt="UserAvt" src={data.data.avt} style={{ borderRadius: '50%', width: '40px', height: '40px' }} />
                </div>
                <div style={{
                    display: 'flex',
                    minWidth: '15rem',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: data.data.user==="me" ? "#626262": "rgb(208 188 255)",
                    borderRadius: "8px",
                    border:"none",
                    color:data.data.user==="me" ? "white": "black",
                }}>
                    <img
                        style={{
                            maxWidth: "50%",
                        }}
                        src="https://meliawedding.com.vn/wp-content/uploads/2022/03/avatar-gai-xinh-1.jpg"
                        alt="Live from space album cover"
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', width: "100%", justifyContent: "flex-end", paddingRight: "1rem" }}>
                        <div style={{ flex: '1 0 auto', padding: '1rem' }}>
                            <h6 style={{ margin: 0 ,fontSize:"1.2rem", fontWeight:"500"}}>
                                {data.data.content}
                            </h6>
                        </div>
                        <div style={{ display: 'flex', width: "100%", paddingLeft: '1rem', paddingBottom: '1rem' }}>
                            {data.data.time} phút trước
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessageBubble;
