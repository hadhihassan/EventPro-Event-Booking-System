import React, { useState } from "react";
import SlotsContainer from "../components/SlotContainer";
import useBookingStore, { BookingSystemState } from "../hooks/useBookingStore";
import Modal from "../components/eventModal";
import Form from "../components/eventForm";

const HomePage: React.FC = () => {

    const initialSlots = parseInt(process.env.REACT_APP_TOTAL_SLOTS || '10', 10);
    const initialState: BookingSystemState = {
        events: [{ id: crypto.randomUUID(), name: "React Workshop", availableSlots: initialSlots, bookings: [], waitingList: [], history: [] }],
    };

    const [store, setStore] = useState<BookingSystemState>(() => {
        const storedState = localStorage.getItem("bookingState");
        return storedState ? JSON.parse(storedState) : initialState;
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addEvent, bookSlot, deleteEvent, resetStore, slotCancel } = useBookingStore(store, setStore);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleFormSubmit = (value: string) => {
        addEvent(value);
        handleCloseModal();
    };

    return (
        <>
            <button
                className="p-2 bg-[#bda3fd] text-white rounded font-semibold my-5 mx-4"
                onClick={handleOpenModal}
            >
                Create Event
            </button>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <Form onSubmit={handleFormSubmit} onClose={handleCloseModal} />
            </Modal>

            {store.events.map((event, index: number) => (
                <div className="p-4" key={event.id}>
                    <div className="flex justify-between text-gray-700">
                        <p className="font-semibold text-xl">{event.name}</p>
                    </div>
                    <SlotsContainer event={event} key={event.id} bookSlot={bookSlot} deleteEvent={deleteEvent} resetStore={resetStore} slotCancel={slotCancel} />
                </div>
            ))}
        </>
    );
};

export default HomePage;