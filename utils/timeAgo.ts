export default function timeAgo(date:Date | string):string {
    const providedDate = new Date(date)
    const isValidDate = !isNaN(providedDate.getTime())

    if(!isValidDate) return String(date)

    const now = new Date() ;
    const secondsPast = Math.floor((now.getTime() - providedDate.getTime()) / 1000);

    if (secondsPast < 60) {
        return secondsPast === 1 ? 'one second ago' : `${secondsPast} seconds ago`;
    }
    if (secondsPast < 3600) {
        const minutes = Math.floor(secondsPast / 60);
        return minutes === 1 ? 'one minute ago' : `${minutes} minutes ago`;
    }
    if (secondsPast < 86400) {
        const hours = Math.floor(secondsPast / 3600);
        return hours === 1 ? 'one hour ago' : `${hours} hours ago`;
    }
    if (secondsPast < 2592000) { // 30 days
        const days = Math.floor(secondsPast / 86400);
        return days === 1 ? 'one day ago' : `${days} days ago`;
    }
    if (secondsPast < 31536000) { // 365 days
        const months = Math.floor(secondsPast / 2592000);
        return months === 1 ? 'one month ago' : `${months} months ago`;
    }
    const years = Math.floor(secondsPast / 31536000);
    return years === 1 ? 'one year ago' : `${years} years ago`;
}

