import React from 'react'

const Header: React.FC = () => {
    return (
        <div className='p-4 bg-[#ccbafa] rounded-b-2xl'>
            <p className='text-white flex items-center'>
                <span className='font-bold text-7xl'>B</span>
                <span className='font-semibold leading-4 mt-[1px]'> Event <br /> Booking <br /> System </span>
            </p>
        </div>
    )
}

export default Header
