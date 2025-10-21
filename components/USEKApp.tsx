import React, { useState } from 'react';
import { Car, MessageSquare, BookOpen, Calendar, Send, Plus, Clock, MapPin, Users, Hash } from 'lucide-react';

export default function USEKApp() {
  const [activeTab, setActiveTab] = useState('carpool');
  const [carpoolData, setCarpoolData] = useState({
    type: '',
    location: '',
    time: ''
  });
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Sarah M. - Engineering Senior', message: 'Does anyone know when registration for next semester opens?', time: '2 hours ago' },
    { id: 2, user: 'John K. - Business Junior', message: 'It usually opens in mid-November. Check your email for exact dates!', time: '1 hour ago' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [items, setItems] = useState([
    { id: 1, user: 'Mike T.', item: 'Engineering Mathematics Notes', course: 'MATH 201', available: true },
    { id: 2, user: 'Lisa A.', item: 'Biology Lab Coat (Size M)', course: 'BIO 101', available: true }
  ]);
  const [newItem, setNewItem] = useState({ item: '', course: '' });
  const [bookingData, setBookingData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    people: '',
    studentId: ''
  });
  const [matches, setMatches] = useState([]);
  const [showMatch, setShowMatch] = useState(false);

  const tabs = [
    { id: 'carpool', name: 'Carpool', icon: Car },
    { id: 'community', name: 'Community', icon: MessageSquare },
    { id: 'marketplace', name: 'Marketplace', icon: BookOpen },
    { id: 'rooms', name: 'Study Rooms', icon: Calendar }
  ];

  const handleCarpoolSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    const match = {
      name: carpoolData.type === 'driver' ? 'Maria K.' : 'Alex R.',
      type: carpoolData.type === 'driver' ? 'needs a ride' : 'is driving',
      location: carpoolData.location,
      time: carpoolData.time,
      people: carpoolData.type === 'driver' ? 2 : 1
    };
    setMatches([match]);
    setShowMatch(true);
    
    // Simulate sending to Green USEK
    setTimeout(() => {
      alert(`✅ Green USEK notified:\n${match.people} ${match.people > 1 ? 'people' : 'person'} arriving at ${carpoolData.time}`);
    }, 1000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, {
        id: chatMessages.length + 1,
        user: 'You',
        message: newMessage,
        time: 'Just now'
      }]);
      setNewMessage('');
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.item && newItem.course) {
      setItems([...items, {
        id: items.length + 1,
        user: 'You',
        item: newItem.item,
        course: newItem.course,
        available: true
      }]);
      setNewItem({ item: '', course: '' });
    }
  };

  const handleBookRoom = (e) => {
    e.preventDefault();
    alert(`✅ Study room booked successfully!\n\nDate: ${bookingData.date}\nTime: ${bookingData.startTime} - ${bookingData.endTime}\nPeople: ${bookingData.people}\nStudent ID: ${bookingData.studentId}\n\nYou'll receive a confirmation email shortly.`);
    setBookingData({ date: '', startTime: '', endTime: '', people: '', studentId: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-green-700 text-white p-4 shadow-lg">
        <h1 className="text-2xl font-bold text-center">USEK Campus Hub</h1>
        <p className="text-center text-green-100 text-sm mt-1">Holy Spirit University of Kaslik</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white shadow-md border-b">
        <div className="max-w-6xl mx-auto flex overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-green-700 border-b-2 border-green-700'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                <Icon size={20} />
                {tab.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Carpool Tab */}
        {activeTab === 'carpool' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Campus Carpool</h2>
            
            {!showMatch ? (
              <form onSubmit={handleCarpoolSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">I am...</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setCarpoolData({...carpoolData, type: 'driver'})}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        carpoolData.type === 'driver'
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <Car className="mx-auto mb-2 text-green-600" size={32} />
                      <p className="font-medium">Driving</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCarpoolData({...carpoolData, type: 'passenger'})}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        carpoolData.type === 'passenger'
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <Users className="mx-auto mb-2 text-green-600" size={32} />
                      <p className="font-medium">Need a Ride</p>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline mr-2" size={16} />
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Jounieh, Byblos, Beirut..."
                    value={carpoolData.location}
                    onChange={(e) => setCarpoolData({...carpoolData, location: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline mr-2" size={16} />
                    First Class Time
                  </label>
                  <input
                    type="time"
                    value={carpoolData.time}
                    onChange={(e) => setCarpoolData({...carpoolData, time: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={!carpoolData.type}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Find Match
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-green-800 mb-3">🎉 Match Found!</h3>
                  {matches.map((match, idx) => (
                    <div key={idx} className="space-y-2">
                      <p className="text-gray-700"><span className="font-medium">{match.name}</span> {match.type}</p>
                      <p className="text-gray-600">📍 {match.location}</p>
                      <p className="text-gray-600">🕐 {match.time}</p>
                      <p className="text-sm text-green-700 mt-3">✓ Green USEK has been notified</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setShowMatch(false);
                    setCarpoolData({ type: '', location: '', time: '' });
                    setMatches([]);
                  }}
                  className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  New Search
                </button>
              </div>
            )}
          </div>
        )}

        {/* Community Tab */}
        {activeTab === 'community' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Community Q&A</h2>
            
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="border-l-4 border-green-500 bg-gray-50 p-4 rounded-r-lg">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-green-700">{msg.user}</p>
                    <p className="text-xs text-gray-500">{msg.time}</p>
                  </div>
                  <p className="text-gray-700">{msg.message}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="Ask your question..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        )}

        {/* Marketplace Tab */}
        {activeTab === 'marketplace' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Marketplace</h2>
            
            <form onSubmit={handleAddItem} className="mb-6 p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-3">List an Item</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Item name (e.g., Calculator, Notes, Lab Coat)"
                  value={newItem.item}
                  onChange={(e) => setNewItem({...newItem, item: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Course code (e.g., MATH 201)"
                  value={newItem.course}
                  onChange={(e) => setNewItem({...newItem, course: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Add Item
                </button>
              </div>
            </form>

            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">{item.item}</h3>
                      <p className="text-sm text-gray-600">
                        <Hash className="inline" size={14} />
                        {item.course}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">by {item.user}</p>
                    </div>
                    {item.available && (
                      <button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                        Request
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Study Rooms Tab */}
        {activeTab === 'rooms' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Study Room</h2>
            
            <form onSubmit={handleBookRoom} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <input
                    type="time"
                    value={bookingData.startTime}
                    onChange={(e) => setBookingData({...bookingData, startTime: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                  <input
                    type="time"
                    value={bookingData.endTime}
                    onChange={(e) => setBookingData({...bookingData, endTime: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="inline mr-2" size={16} />
                  Number of People
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  placeholder="How many people?"
                  value={bookingData.people}
                  onChange={(e) => setBookingData({...bookingData, people: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
                <input
                  type="text"
                  placeholder="Enter your student ID"
                  value={bookingData.studentId}
                  onChange={(e) => setBookingData({...bookingData, studentId: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Book Room
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
