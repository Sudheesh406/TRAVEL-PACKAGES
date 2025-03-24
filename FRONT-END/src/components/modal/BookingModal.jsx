import { useState } from 'react';

function BookingModal({ setShow, packageDetails }) { 
  const [itemCount, setItemCount] = useState(0);
  const PRICE_PER_ITEM = packageDetails.price;
  const TAX_RATE = 0.00; 

  const handleIncrement = () => {
    if (itemCount < packageDetails.vehicleSeatNumber) {
      setItemCount(itemCount + 1);
    }
  };

  const handleDecrement = () => {
    if (itemCount > 0) {
      setItemCount(itemCount - 1);
    }
  };

  const subtotal = itemCount * PRICE_PER_ITEM;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className="absolute inset-0 bg-opacity-20 backdrop-blur-xs"
        onClick={() => setShow(false)} 
      ></div>

      <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md z-10">
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>

        <div className="border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-center text-red-600">Reserve Your Seats</h1>
          <p className="text-center text-gray-500 text-sm mt-2">Maximum {packageDetails.vehicleSeatNumber} Seats Available</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700">Regular Ticket</span>
            <span className="text-red-600 font-semibold">₹{PRICE_PER_ITEM}</span>
          </div>
          
          <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm">
            <button
              onClick={handleDecrement}
              disabled={itemCount === 0}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                itemCount === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              -
            </button>
            
            <span className="text-xl font-bold text-gray-800">{itemCount}</span>
            
            <button
              onClick={handleIncrement}
              disabled={itemCount === 10}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                itemCount === 10
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              +
            </button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax </span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
              <span className="text-gray-800">Total</span>
              <span className="text-red-600">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button
          disabled={itemCount === 0}
          className={`w-full py-4 rounded-lg text-lg font-bold text-white transition-colors ${
            itemCount === 0
              ? 'bg-gray-200 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {itemCount === 0 ? 'Select tickets to continue' : `Proceed to Pay ₹${total.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
}

export default BookingModal;
