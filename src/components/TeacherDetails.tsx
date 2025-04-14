import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface Teacher {
  name: string;
  role: string;
  image: string;
  experience: string;
}

interface TeacherDetailsProps {
  teacher: Teacher;
  onClose: () => void;
  isDarkMode: boolean;
}

const TeacherDetails: React.FC<TeacherDetailsProps> = ({ teacher, onClose, isDarkMode }) => {
  return (
    <div className={`fixed inset-0 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} z-50 overflow-y-auto`}>
      <div className="container mx-auto px-6 py-8">
        <button
          onClick={onClose}
          className={`flex items-center ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-8`}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Teachers
        </button>

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <img
              src={teacher.image}
              alt={teacher.name}
              className="w-64 h-64 object-cover rounded-lg shadow-lg"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2">{teacher.name}</h1>
              <h2 className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{teacher.role}</h2>
              <div className="prose max-w-none">
                <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} whitespace-pre-line`}>
                  {teacher.experience}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;