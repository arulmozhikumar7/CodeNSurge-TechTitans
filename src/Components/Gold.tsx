import { useState, useEffect } from "react";

const Gold = () => {
  const [currentInfo, setCurrentInfo] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", "goldapi-5e4husm1g7y8bx-io");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch("https://www.goldapi.io/api/XAU/INR", requestOptions)
      .then(response => response.json())
      .then(result => {
        setCurrentInfo(result);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch data');
        setLoading(false);
        console.log('Error:', error);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-5 text-xl">Loading gold rates...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 p-5 text-xl">{error}</div>;
  }

  return (
    <div className="p-3 my-6 transform hover:scale-105 transition duration-500 ease-in-out bg-gradient-to-r from-yellow-100 to-yellow-300 rounded-lg shadow-lg w-1/3 mx-auto">
      <h1 className="text-2xl font-bold text-center text-yellow-800 mb-4">Gold Rates</h1>
      <p className="text-center text-sm text-gray-600 mb-2">Date: {new Date().toLocaleDateString()}</p>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="font-semibold">Price per gram (24k):</span>
          <span className="text-yellow-800">{currentInfo?.price_gram_24k} INR</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Price per gram (22k):</span>
          <span className="text-yellow-800">{currentInfo?.price_gram_22k} INR</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Price per gram (21k):</span>
          <span className="text-yellow-800">{currentInfo?.price_gram_21k} INR</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Price per gram (18k):</span>
          <span className="text-yellow-800">{currentInfo?.price_gram_18k} INR</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Price per gram (10k):</span>
          <span className="text-yellow-800">{currentInfo?.price_gram_10k} INR</span>
        </div>
      </div>
    </div>
  );
};

export default Gold;
