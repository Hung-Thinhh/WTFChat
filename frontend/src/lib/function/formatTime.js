export const timePassed = (datestring) => {
    const date = new Date(datestring);
    const now = new Date();

    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffSeconds = Math.floor(diffTime / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.ceil(diffDays / 30.44);
    const diffYears = Math.floor(diffDays / 365.25);

    if (diffSeconds <= 10) {
        return `bây giờ`;
    } else if (diffSeconds <= 60) {
        return `${diffSeconds} giây trước`;
    } else if (diffMinutes <= 60) {
        return `${diffMinutes} phút trước`;
    } else if (diffHours <= 24) {
        return `${diffHours} giờ trước`;
    } else if (diffDays <= 30) {
        return `${diffDays} ngày trước`;
    } else if (diffDays <= 365) {
        return `${diffMonths} tháng trước`;
    } else {
        return `${diffYears} năm trước`;
    }
};