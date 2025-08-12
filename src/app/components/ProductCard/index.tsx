export default function ProductCard() {
  return (
    <div className="border rounded-lg p-4 max-w-xs text-center m-2 shadow-md">
     
      <div className="bg-gray-200 h-32 mb-4 rounded"></div>
      
      <h3 className="text-xl font-semibold mb-2">Product Name</h3>
      
      <p className="text-lg text-gray-700 mb-4">$99.99</p>
      
      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Add to Cart
      </button>
    </div>
  );
}