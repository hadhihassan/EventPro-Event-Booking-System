import { format } from 'date-fns';

const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMMM d, yyyy");
}
export default formatTime