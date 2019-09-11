import { format, formatDistance, formatRelative, subDays } from 'date-fns'

const formatTimestamp = (time: number) => {
    return formatDistance(new Date(time), new Date());
}

export default formatTimestamp;