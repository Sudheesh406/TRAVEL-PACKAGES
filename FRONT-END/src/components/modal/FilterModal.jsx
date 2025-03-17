
export default function Filter({ showFilter, setShowFilter, handleChangeFilter, checked, setSubmit }) {
  const priceRanges = [
    
    '2,000 - 5,000',
    '6,000 - 9,000',
    '10,000 - 13,000',
    '14,000 - 17,000',
    '18,000 - 21,000',
    '22,000 - Above',
    "Show All"
  ];

  function handleSubmit(){
    setSubmit(true)
    setShowFilter(false)
  }

  return (
    <div
      className={`fixed z-50 top-0 right-0 h-full w-[200px] bg-white text-white p-4 transition-transform ${
        showFilter ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between text-black items-center mb-4">
        <h2 className="text-lg font-semibold">Filter</h2>
        <button onClick={() => setShowFilter(false)} className="text-xl">
          ✕
        </button>
      </div>
      <h3 className="pb-2 text-black font-semibold">Amount</h3>
      <div className="space-y-2 pl-2 text-black">
        {priceRanges.map((range, index) => (
          <div key={index} className="flex items-center">
            <input 
              type="checkbox" 
              id={`range-${index}`} 
              className="mr-2"
              onChange={(e) => handleChangeFilter(range, e.target.checked)}
              checked={checked == range}
            />
            <label htmlFor={`range-${index}`}>{range}</label>
          </div>
        ))}
      </div>
      <div className="w-full">
      <button className="px-2 py-1 flex items-self-end mt-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition" onClick={handleSubmit}>Apply</button>
      </div>
    </div>
  );
}
