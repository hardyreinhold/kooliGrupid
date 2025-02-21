import Image from 'next/image'

const opetaja = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
              <div className="flex justify-center mt-4">
                <button className="w-full py-2 p-4 font-semibold text-gray-700 bg-white border rounded-md shadow-md hover:bg-gray-100 flex items-center justify-center">
                <Image 
                src="https://www.svgrepo.com/show/355037/google.svg" 
                alt="Google logo"
                width={20}
                height={20}
                className = "m-2" />Login with Google
                </button>
            </div>
      </div>
  
    );
  };
  
  export default opetaja;
