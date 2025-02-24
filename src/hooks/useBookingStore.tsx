import { useEffect } from 'react';
import toast from 'react-hot-toast';

export interface Booking {
    id: string;
    timestamp: string;
}

export interface BookingHistory {
    id: string;
    action: "BOOKED" | "CANCELLED" | "PROMOTED";
    timestamp: string;
}

export interface Event {
    id: string;
    name: string;
    availableSlots: number;
    bookings: Booking[];
    waitingList: Booking[];
    history: BookingHistory[];
}

export interface BookingSystemState {
    events: Event[]
}


const useBookingStore = (store:BookingSystemState, setStore:React.Dispatch<React.SetStateAction<BookingSystemState>>) => {

    const initialSlots = parseInt(process.env.REACT_APP_TOTAL_SLOTS || '10', 10);

    useEffect(() => {
        localStorage.setItem('bookingState', JSON.stringify(store));
    }, [store, store.events]);

    // Add New Event
    const addEvent = (name: string) => {
        const existingEvent = store.events.find((event) => event.name === name);
        if (existingEvent) {
            toast.error('Event already exists.');
            return;
        }

        const newEvent: Event = {
            id: Math.floor(100000 + Math.random() * 900000).toString(),
            name,
            availableSlots: initialSlots,
            bookings: [],
            waitingList: [],
            history: []
        };

        setStore((prev) => ({
            ...prev,
            events: [...prev.events, newEvent],
        }));
    };

    // Book a slot in event
    const bookSlot = (eventName: string) => {
        setStore((prev) => {
            const updatedEvents = prev.events.map((event) => {
                if (event.name === eventName) {
                    if (event.availableSlots > 0) {
                        const newBooking: Booking = {
                            id: Math.floor(100000 + Math.random() * 900000).toString(),
                            timestamp: new Date().toISOString(),
                        };
                        const historyEntry: BookingHistory = {
                            id: newBooking.id,
                            action: "BOOKED",
                            timestamp: new Date().toISOString(),
                        };

                        return {
                            ...event,
                            availableSlots: event.availableSlots - 1,
                            bookings: [...event.bookings, newBooking],
                            history: [...event.history, historyEntry],
                        };
                    } else {
                        const newWaiting: Booking = {
                            id: Math.floor(100000 + Math.random() * 900000).toString(),
                            timestamp: new Date().toISOString(),
                        };
                        toast.success('No slots available. Your joined the waiting list.')
                        return {
                            ...event,
                            waitingList: [...event.waitingList, newWaiting],
                        };
                    }
                }
                return event;
            });
            return { ...prev, events: updatedEvents };
        });
    };

    // Cancel slot booked slot in a event
    const slotCancel = (id: string, eventId: string) => {
        setStore((prevState) => {
            const updatedEvents = prevState.events.map((event) => {
                if (event.id !== eventId) return event;
                const historyEntry: BookingHistory = {
                    id: Math.floor(100000 + Math.random() * 900000).toString(),
                    action: "CANCELLED",
                    timestamp: new Date().toISOString(),
                };
                const updatedBookings = event.bookings.filter((booking) => {
                    if (booking.id !== id) {
                        return booking
                    } else {
                        historyEntry.id = booking.id
                    }
                });
                let updatedWaitingList = [...event.waitingList];

                if (updatedWaitingList.length > 0) {
                    const promotedBooking = updatedWaitingList.shift();
                    updatedBookings.push(promotedBooking!);
                    historyEntry.action = "PROMOTED";
                    historyEntry.id = promotedBooking?.id
                } else {
                    event.availableSlots += 1;
                }

                return {
                    ...event,
                    bookings: updatedBookings,
                    waitingList: updatedWaitingList,
                    history: [...event.history, historyEntry],
                };
            });

            return { ...prevState, events: updatedEvents };
        });
    };

    // Restart all event (clean all data)
    const resetStore = (eventId: string) => {
        setStore((prev) => {
            const updatedEvents = prev.events.map((event) =>
                event.id === eventId
                    ? { ...event, availableSlots: initialSlots, bookings: [], waitingList: [] ,history:[]}
                    : event
            );
            const updatedStore = { ...prev, events: updatedEvents };
            localStorage.setItem("bookingState", JSON.stringify(updatedStore));

            return updatedStore;
        });
    };

    // Delete an Event
    const deleteEvent = (eventId: string) => {
        setStore((prev) => {
            const updatedEvents = prev.events.filter((event) => event.id !== eventId);
            const updatedStore = { ...prev, events: updatedEvents };
            localStorage.setItem("bookingState", JSON.stringify(updatedStore));
            return updatedStore;
        });
    };

    return { store, addEvent, bookSlot, slotCancel, resetStore, deleteEvent };
};

export default useBookingStore