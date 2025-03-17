// import { Play, X } from 'lucide-react';
// import { useState } from 'react';
// const images = [
//   {
//     id: 1,
//     type: 'image',
//     url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1746&q=80',
//     caption: 'Paris, France',
//   },
//   {
//     id: 2,
//     type: 'video',
//     thumbnail: 'https://images.unsplash.com/photo-1578922746465-3a80a228f223?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80',
//     videoUrl: 'https://player.vimeo.com/video/355578651',
//     caption: 'Bali, Indonesia',
//   },
//   {
//     id: 3,
//     type: 'image',
//     url: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1766&q=80',
//     caption: 'Venice, Italy',
//   },
//   {
//     id: 4,
//     type: 'image',
//     url: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
//     caption: 'Santorini, Greece',
//   },
//   {
//     id: 5,
//     type: 'video',
//     thumbnail: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
//     videoUrl: 'https://player.vimeo.com/video/76979871',
//     caption: 'New York, USA',
//   },
//   {
//     id: 6,
//     type: 'image',
//     url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
//     caption: 'Maldives',
//   },
// ];

const Gallery = () => {
  // const [selectedItem, setSelectedItem] = useState(null);

  // const openModal = (item) => {
  //   setSelectedItem(item);
  // };

  // const closeModal = () => {
  //   setSelectedItem(null);
  // };

  return (
    <>
    
    {/* <section id="gallery" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Travel Gallery</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Explore stunning images and videos from our most popular destinations.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((item) => (
            <div 
              key={item.id} 
              className="relative h-64 rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => openModal(item)}
            >
              <img 
                src={item.type === 'image' ? item.url : item.thumbnail} 
                alt={item.caption} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                {item.type === 'video' && (
                  <div className="bg-white bg-opacity-80 rounded-full p-3">
                    <Play className="h-8 w-8 text-blue-600" />
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <p className="text-white font-medium">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
        
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
            <div className="relative max-w-4xl w-full">
              <button 
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white hover:text-gray-300"
              >
                <X className="h-8 w-8" />
              </button>
              
              {selectedItem.type === 'image' ? (
                <img 
                  src={selectedItem.url} 
                  alt={selectedItem.caption} 
                  className="w-full h-auto max-h-[80vh] object-contain" 
                />
              ) : (
                <div className="relative pb-[56.25%] h-0 overflow-hidden">
                  <iframe 
                    src={`${selectedItem.videoUrl}?autoplay=1`} 
                    className="absolute top-0 left-0 w-full h-full" 
                    frameBorder="0" 
                    allow="autoplay; fullscreen" 
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              
              <p className="text-white text-center mt-4 text-lg">{selectedItem.caption}</p>
            </div>
          </div>
        )}
      </div>
    </section> */}
    </>
  );
};

export default Gallery;