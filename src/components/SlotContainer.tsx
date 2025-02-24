import React from 'react'
import { Event } from '../hooks/useBookingStore'
import formatTime from '../utils/timeFormater'

interface SlotsContainerProps {
    event: Event
    bookSlot: (eventName: string) => void
    slotCancel: (id: string, eventId: string) => void
    resetStore: (id: string) => void
    deleteEvent: (id: string) => void
}

const SlotsContainer: React.FC<SlotsContainerProps> = (
    { event, bookSlot, slotCancel, deleteEvent, resetStore }
) => {

    if (!event) return null

    return (
        <div className='bg-white w-full mt-5 h-auto shadow-lg border border-[#bda3fd] rounded-md md:flex md:flex-wrap' key={event?.id}>
            {/* Event Container */}
            <div className='md:w-6/12 grow border-r border-[#bda3fd] p-2'>
                {/* Slots */}
                <div className='flex justify-between'>
                    <p className='bg-[#bda3fd] p-2 text-white font-semibold rounded'>{event.name} - {event?.availableSlots} slots left</p>
                    <button className='bg-[#bda3fd] p-2 text-white font-semibold rounded' onClick={() => bookSlot(event?.name)}>Book Now</button>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-3 m-5">
                    {event?.bookings?.map((slot) => (
                        <div className="flex flex-col items-center gap-1 relative group" key={slot?.id}>
                            <div className="bg-green-200 h-20 w-20 rounded-md relative">
                                <div className="absolute bottom-full mb-2 w-40 hidden group-hover:flex items-center justify-center bg-black text-white text-xs rounded-md px-2 py-1">
                                    Slot ID: {slot?.id}
                                    Date : {formatTime(slot?.timestamp)}
                                </div>
                            </div>
                            <button
                                className="text-white text-xs bg-[#bda3fd] w-20 rounded-md"
                                onClick={() => slotCancel(slot?.id, event?.id)}
                            >
                                Cancel
                            </button>
                        </div>
                    ))}
                    {
                        Array.from({ length: (10 - event.bookings.length) }).map((item, index) => (
                            <div className='flex flex-col items-center gap-1' key={index}>
                                <div className="border border-green-200 h-20 w-20 rounded-md" data-tooltip-target="tooltip-animation"></div>

                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='md:w-6/12 grow p-2'>
                {/* Waitings */}
                <div className='flex justify-end'>
                    <p className='text-[#a685fc] font-semibold text-xl m-2'>: Waiting List</p>
                </div>
                <ol className='text-end m-5 gap-2 grid'>
                    {event?.waitingList?.map((slot) => (
                        <li className='bg-gray-100 rounded-lg p-1 text-xs' key={slot?.id}>
                            <p>{slot?.id} : Id</p>
                            <p>{formatTime(slot?.timestamp)} : Date</p>
                        </li>
                    ))}
                    {
                        event?.waitingList.length < 1 && <p className='bg-gray-100 text-center font-semibold text-xs rounded'>No Waiting Slots</p>
                    }
                </ol>
                {/* Booking History */}
                <div className="mt-4 text-end">
                    <h3 className="text-[#a685fc] font-semibold text-xl m-2">: Booking History</h3>
                    <ul className=" pl-4">
                        {event?.history?.map((entry) => (
                            <li key={entry?.id} className="text-xs md:text-sm text-gray-600">
                                {formatTime(entry?.timestamp)}:  (booking Id: {entry?.id}) {entry?.action}<span className='px-2'>-</span>
                            </li>
                        ))}
                        {
                            event?.history.length < 1 && <p className='bg-gray-100 text-center font-semibold rounded text-xs'>No </p>
                        }
                    </ul>
                </div>
            </div>
            {/* Actions */}
            <div className='m-2 flex items-center justify-center md:justify-start'>
                <button className='bg-[#bda3fd] md:p-2 py-2 px-5 m-2 md:text-sm text-white md:font-semibold rounded' onClick={() => resetStore(event?.id)}>Reset</button>
                <button className='bg-[#bda3fd] md:p-2 py-2 px-5 m-2 md:text-sm text-white md:font-semibold rounded' onClick={() => deleteEvent(event?.id)}>delete</button>
            </div>
        </div>
    );
};

export default SlotsContainer