import react from 'react'
import moment from 'moment'

function Time({ time }) {
    const VideoTime = moment().startOf("day").seconds(time).format("H:mm:ss")
    return (
        <div>
        <span className='absolute bottom-2 right-2 bg-block text-white px-2 py-1 text-x5 rounded-md'>
            {VideoTime}
            
        </span>
        </div>
    );
}
export default Time;