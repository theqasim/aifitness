function Loadinganimation() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-black p-5 rounded-lg flex items-center justify-center">
        <div className="border-t-4 border-blue-500 rounded-full w-6 h-6 animate-spin mr-3"></div>
        <span className="text-white">Generating your workout..</span>
      </div>
    </div>
  );
}

export default Loadinganimation;
