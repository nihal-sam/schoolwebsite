import React, { useState, useEffect } from 'react';
import { Sun, Moon, Facebook, Instagram, MessageCircle, School, Users, BookOpen, Image, Phone, ChevronDown, ArrowLeft, MessageSquarePlus, Menu } from 'lucide-react';
import EnquiryForm from './components/EnquiryForm';
import AdminLogin from './components/AdminLogin';
import TeacherDetails from './components/TeacherDetails';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showEnquiryPopup, setShowEnquiryPopup] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEnquiryPopup(true);
    }, 20000); // Changed to 20 seconds

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleContactSubmit = (e) => {
    // Store the contact form data in localStorage for demo purposes
    const contactData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
      date: new Date().toISOString()
    };
    const existingContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    localStorage.setItem('contacts', JSON.stringify([...existingContacts, contactData]));
    
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
    e.target.reset();
  };

  const teachers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Lead Teacher",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=500&auto=format",
      experience: `15 years of experience in early childhood education. Specialized in Montessori teaching methods and child development psychology.

Key Achievements:
• Led numerous successful early learning programs and workshops
• Developed innovative curriculum for ages 2-6
• Certified Montessori instructor with advanced child psychology training
• Published articles on early childhood development
• Regular speaker at education conferences

Teaching Philosophy:
"Every child is unique and deserves an individualized approach to learning. I believe in creating an environment where children feel safe to explore, question, and grow at their own pace."`,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Art & Music Teacher",
      image: "https://images.unsplash.com/photo-1601935111741-ae98b2b230b0?w=500&auto=format",
      experience: `10 years of experience in children's art and music education. Certified in early childhood music therapy and art education.

Specializations:
• Early childhood music therapy
• Creative arts integration
• Child-centered art instruction
• Music and movement education
• Special needs arts education

Notable Programs:
• Created "Little Artists" program combining visual arts and music
• Developed sensory-rich art experiences for young learners
• Established annual children's art exhibition
• Leads weekly music therapy sessions
• Conducts parent-child music workshops`,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Physical Education Teacher",
      image: "https://images.unsplash.com/photo-1589525231707-f2de2428f59c?w=500&auto=format",
      experience: `8 years of experience in children's physical education. Expert in developmental movement patterns and childhood motor skills.

Areas of Expertise:
• Age-appropriate fitness programs
• Motor skill development
• Group movement activities
• Sports introduction
• Safety and injury prevention

Program Highlights:
• Designed "Tiny Athletes" program for toddlers
• Created inclusive physical activities for all ability levels
• Implements yoga and mindfulness for children
• Organizes seasonal sports events
• Conducts parent education workshops on child physical development`,
    }
  ];

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&auto=format",
      caption: "Art & Craft Activities"
    },
    {
      url: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=800&auto=format",
      caption: "Music & Dance"
    },
    {
      url: "https://images.unsplash.com/photo-1604881991720-f91add269bed?w=800&auto=format",
      caption: "Outdoor Play"
    },
    {
      url: "https://images.unsplash.com/photo-1567057419565-4349c49d8a04?w=800&auto=format",
      caption: "Story Time"
    },
    {
      url: "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?w=800&auto=format",
      caption: "Science Experiments"
    },
    {
      url: "https://images.unsplash.com/photo-1602001313216-95c9f42a1207?w=800&auto=format",
      caption: "Group Activities"
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} transition-colors duration-300`}>
      {/* Admission Banner */}
      <div className="bg-green-500 text-white py-2 px-4 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          School Admissions are now open for 2024-25!
        </div>
      </div>

      {/* Navigation */}
      <nav className={`sticky top-0 z-50 ${isDarkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-white'} shadow-lg`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <School className={`h-8 w-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'} animate-bounce`} />
              <span className="ml-2 text-xl font-bold">
                VT Kindergarten School
              </span>
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#home" className="hover:text-green-500">Home</a>
              <a href="#about" className="hover:text-green-500">About</a>
              <a href="#education" className="hover:text-green-500">Education</a>
              <a href="#teachers" className="hover:text-green-500">Teachers</a>
              <a href="#gallery" className="hover:text-green-500">Gallery</a>
              <a href="#contact" className="hover:text-green-500">Contact</a>
              <button onClick={() => setShowAdminLogin(true)} className="hover:text-green-500">Admin</button>
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200">
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className={`md:hidden fixed top-0 right-0 h-full w-64 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}>
              <div className="p-6">
                <button 
                  className="absolute top-4 right-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
                <div className="flex flex-col space-y-4 mt-8">
                  <a href="#home" className="hover:text-green-500" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
                  <a href="#about" className="hover:text-green-500" onClick={() => setIsMobileMenuOpen(false)}>About</a>
                  <a href="#education" className="hover:text-green-500" onClick={() => setIsMobileMenuOpen(false)}>Education</a>
                  <a href="#teachers" className="hover:text-green-500" onClick={() => setIsMobileMenuOpen(false)}>Teachers</a>
                  <a href="#gallery" className="hover:text-green-500" onClick={() => setIsMobileMenuOpen(false)}>Gallery</a>
                  <a href="#contact" className="hover:text-green-500" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
                  <button onClick={() => { setShowAdminLogin(true); setIsMobileMenuOpen(false); }} className="hover:text-green-500">Admin</button>
                  <button onClick={toggleTheme} className="hover:text-green-500 flex items-center">
                    {isDarkMode ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="h-5 w-5 mr-2" />}
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="home" className="relative h-screen flex items-center justify-center">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?w=1600&auto=format"
              alt="Kindergarten"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
          <div className="relative text-center text-white">
            <h1 className="text-6xl font-bold mb-4 animate-fade-in">Welcome to VT Kindergarten School</h1>
            <p className="text-2xl mb-8">Where Learning Meets Fun</p>
            <a href="#contact" className="bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition-colors">
              Enroll Now
            </a>
          </div>
          <ChevronDown className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white h-8 w-8" />
        </section>

        {/* About Section */}
        <section id="about" className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format"
                  alt="About Us"
                  className="rounded-lg shadow-xl"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-4xl font-bold mb-6">About VT Kindergarten School</h2>
                <p className="text-lg mb-6">
                  Founded in 2010, VT Kindergarten School has been a cornerstone of early childhood education in our community. We believe in nurturing young minds through a perfect blend of play-based learning and structured activities.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-md`}>
                    <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                    <p>To create a loving and stimulating environment where children can grow and learn.</p>
                  </div>
                  <div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-md`}>
                    <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                    <p>To be the leading early childhood education center that shapes future leaders.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Our Educational Approach</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300`}>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Play-Based Learning</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Interactive activities that make learning fun and engaging while developing essential skills.</p>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300`}>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Social Development</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Focus on building social skills, emotional intelligence, and positive relationships.</p>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300`}>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Image className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Creative Expression</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Art, music, and movement activities that foster creativity and self-expression.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Teachers Section */}
        <section id="teachers" className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Our Amazing Teachers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teachers.map((teacher) => (
                <div key={teacher.id} className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
                  <img src={teacher.image} alt={teacher.name} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{teacher.name}</h3>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{teacher.role}</p>
                    <button
                      onClick={() => setSelectedTeacher(teacher)}
                      className="text-green-500 hover:text-green-600 font-semibold"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Our Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-xl font-semibold">{image.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-6 w-6 mr-3 text-green-500" />
                    <p>+1 (555) 123-4567</p>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-6 w-6 mr-3 text-green-500" />
                    <p>info@vtkindergarten.com</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Address:</p>
                    <p>43/23 Kovil Nagar<br />Karaikudi, 625601</p>
                  </div>
                </div>
              </div>
              <div>
                <form onSubmit={(e) => { e.preventDefault(); handleContactSubmit(e); }} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input type="text" name="name" className={`w-full px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : ''} focus:ring-2 focus:ring-green-500`} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input type="email" name="email" className={`w-full px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : ''} focus:ring-2 focus:ring-green-500`} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea name="message" className={`w-full px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : ''} focus:ring-2 focus:ring-green-500`} rows={4} required></textarea>
                  </div>
                  <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-gray-900 border-t border-gray-800' : 'bg-gray-800'} text-white py-12`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center">
              <School className="h-8 w-8 text-green-400 animate-bounce" />
              <span className="ml-2 text-xl font-bold">VT Kindergarten School</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="hover:text-green-400">About</a></li>
                <li><a href="#education" className="hover:text-green-400">Education</a></li>
                <li><a href="#teachers" className="hover:text-green-400">Teachers</a></li>
                <li><a href="#gallery" className="hover:text-green-400">Gallery</a></li>
                <li><a href="#contact" className="hover:text-green-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-green-400 transform hover:scale-110 transition-transform"><Facebook /></a>
                <a href="#" className="hover:text-green-400 transform hover:scale-110 transition-transform"><Instagram /></a>
                <a href="#" className="hover:text-green-400 transform hover:scale-110 transition-transform"><MessageCircle /></a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">School Hours</h3>
              <p>Monday - Friday</p>
              <p>8:00 AM - 3:00 PM</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Enquiry Button */}
      <button
        onClick={() => setShowEnquiryPopup(true)}
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50 group"
      >
        <MessageSquarePlus className="h-6 w-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Modals and Popups */}
      {showEnquiryPopup && (
        <EnquiryForm onClose={() => setShowEnquiryPopup(false)} isDarkMode={isDarkMode} />
      )}

      {showAdminLogin && (
        <AdminLogin onClose={() => setShowAdminLogin(false)} isDarkMode={isDarkMode} />
      )}

      {selectedTeacher && (
        <TeacherDetails teacher={selectedTeacher} onClose={() => setSelectedTeacher(null)} isDarkMode={isDarkMode} />
      )}

      {showSuccessMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          Message has been sent! We will contact you soon.
        </div>
      )}
    </div>
  );
}

export default App;