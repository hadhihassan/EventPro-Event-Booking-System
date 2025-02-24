import React, { useState } from "react";

interface FormProps {
    onSubmit: (value: string) => void;
    onClose: () => void;
}

const Form: React.FC<FormProps> = (
    { onSubmit, onClose }
) => {
    
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(inputValue);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="eventName" className="block text-gray-700">
                    Event Name:
                </label>
                <input
                    id="eventName"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    placeholder="Enter event name"
                    required
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={onClose}
                    className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Create
                </button>
            </div>
        </form>
    );
};

export default Form;