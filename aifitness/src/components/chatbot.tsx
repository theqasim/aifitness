function Chatbot() {
  return (
    <div className="mt-20 w-2/4 bg-white rounded-md shadow-lg font-mons">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">FitnessAI Coach</h2>
      </div>

      {/* Chat display area */}
      <div className="p-4 h-96 overflow-y-auto">
        <div className="mb-4">
          <div className="text-green-600 mb-2">Coach</div>
          <div className="bg-green-100 p-2 rounded-md">
            <p>Hello! How can I assist you with your workout plan today?</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-blue-600 mb-2">You</div>
          <div className="bg-blue-100 p-2 rounded-md">
            <p>I'm looking for a strength training routine.</p>
          </div>
        </div>

        {/* Add more chat bubbles as needed */}
      </div>

      {/* Chat input area */}
      <div className="p-4 border-t">
        <textarea
          rows={2} // decides the initial visible number of lines
          placeholder="Type your message..."
          className="w-full p-2 rounded-md border focus:outline-none focus:border-blue-500 resize-y" // resize-y allows vertical resizing
        ></textarea>

        <button className="mt-2 bg-blue-500 text-white p-2 rounded-md">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
