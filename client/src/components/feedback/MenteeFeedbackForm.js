import React, { useState } from 'react';
import { ChevronDown, Star, Send } from 'lucide-react';

const MenteeFeedbackForm = () => {
  const [formData, setFormData] = useState({
    conceptualClarity: '',
    supportAndEncouragement: '',
    behaviorAndApproachability: '',
    overallRating: 0,
    additionalFeedback: ''
  });

  const [activeSection, setActiveSection] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRatingChange = (rating) => {
    setFormData({
      ...formData,
      overallRating: rating
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted feedback:', formData);
    // Here you would typically send this data to your backend
    alert('Feedback submitted successfully!');
  };

  const FeedbackSection = ({ title, description, name, options }) => {
    const isActive = activeSection === name;

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div 
          onClick={() => setActiveSection(isActive ? null : name)}
          className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <ChevronDown 
            className={`w-6 h-6 text-gray-500 transform transition-transform ${isActive ? 'rotate-180' : ''}`} 
          />
        </div>
        
        {isActive && (
          <div className="p-4 pt-0 space-y-2 animate-fade-in">
            {options.map((option) => (
              <label 
                key={option} 
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-blue-50 transition group"
              >
                <input
                  type="radio"
                  name={name}
                  value={option}
                  checked={formData[name] === option}
                  onChange={handleInputChange}
                  className="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 group-hover:text-blue-700 transition">{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-6">
          <h2 className="text-3xl font-bold mb-2">Mentor Feedback</h2>
          <p className="text-blue-100 opacity-90">Your insights help improve mentorship</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <FeedbackSection 
            title="Conceptual Clarity & Guidance"
            description="How well does the mentor explain concepts?"
            name="conceptualClarity"
            options={[
              'Extremely clear and helpful',
              'Mostly clear, but some gaps',
              'Sometimes unclear',
              'Often difficult to understand'
            ]}
          />

          <FeedbackSection 
            title="Support & Encouragement"
            description="How supportive is the mentor in your journey?"
            name="supportAndEncouragement"
            options={[
              'Very supportive and motivating',
              'Somewhat supportive',
              'Neutral',
              'Not very supportive'
            ]}
          />

          <FeedbackSection 
            title="Behavior & Approachability"
            description="How approachable and respectful is the mentor?"
            name="behaviorAndApproachability"
            options={[
              'Always approachable and respectful',
              'Usually approachable, with occasional lapses',
              'Sometimes difficult to approach',
              'Often unapproachable'
            ]}
          />
          
          {/* Overall Rating */}
          <div className="space-y-4 bg-gray-50 p-4 rounded-xl">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Overall Rating</h3>
              <p className="text-sm text-gray-500">How would you rate your mentorship experience?</p>
            </div>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="focus:outline-none transform hover:scale-110 transition"
                >
                  <Star 
                    fill={star <= formData.overallRating ? '#FBBF24' : '#E5E7EB'} 
                    color={star <= formData.overallRating ? '#FBBF24' : '#E5E7EB'}
                    className="w-8 h-8"
                  />
                </button>
              ))}
              <span className="ml-3 text-gray-600 font-medium">
                {formData.overallRating > 0 ? `${formData.overallRating}/5` : 'Rate your experience'}
              </span>
            </div>
          </div>
          
          {/* Additional Feedback */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Additional Thoughts</h3>
              <p className="text-sm text-gray-500">Any suggestions or appreciation? (Optional)</p>
            </div>
            <textarea
              name="additionalFeedback"
              value={formData.additionalFeedback}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 text-gray-700 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition"
              placeholder="Share your detailed thoughts here..."
            ></textarea>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-xl hover:from-blue-700 hover:to-blue-600 transition transform hover:-translate-y-1 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Send className="w-5 h-5" />
            <span className="font-semibold">Submit Feedback</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default MenteeFeedbackForm;