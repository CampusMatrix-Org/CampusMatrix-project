// src/pages/Notebook.jsx
import React from 'react';
import { Copyright, Search, ChevronDown, Square, Book, ArrowLeft } from 'lucide-react';
import { useParams, Link } from 'react-router-dom'; 

// --- FAKE DATA (to populate the page) ---
const notebooks = [
  { id: 1, name: 'Physics 101' },
  { id: 2, name: 'History Seminar' },
  { id: 3, name: 'Physics 101' }, 
  { id: 4, name: 'Calculus III' },
  { id: 5, name: 'Homework' },
];

const tags = [
  { id: 1, name: 'Exam Prep' },
  { id: 2, name: 'Lecture Notes' },
];

const notes = [
  { id: 1, title: 'Quantum Mechanics Intro', snippet: 'Frarna biayst ee peentos liltro', time: '1032 IM', date: '2021.871.02' },
  { id: 2, title: "Newton's Laws Review", snippet: 'Onrna biayst iac eplas lnto', time: '1047 IM', date: '2021.671.02' },
  { id: 3, title: "Newton's Laws Review", snippet: 'Prouet teyet lscenics liltto', time: '2032 IM', date: '2021.s91.03' },
  { id: 4, title: 'Waves & Optics', snippet: 'Dama biayst ts:te ian boost rencnget', time: '2036 IM', date: '2021.873.01' },
  { id: 5, title: "Newton's Laws Review", snippet: 'Onrna biayst ias muto Diew', time: '2039 IM', date: '2021.891.01', active: true }, 
  { id: 6, title: 'Waves & Optics', snippet: 'Opma biayes larte alynboost remanget', time: '2039 IM', date: '2021.692.01' },
  { id: 7, title: 'Waves & Optics', snippet: 'Dema biayst tsb eo enotes lito', time: '2039 IM', date: '2021.561.04' },
  { id: 8, title: 'Odicinlaye Oopen', snippet: 'Dema iesbconfetude e pmp', time: '2318 IM', date: '2021.863.04' },
];

// --- MAIN NOTEBOOK COMPONENT ---
const Notebook = () => {
  const { folderId } = useParams(); 
  // We can use the folderId to look up the correct folder name, but for now we'll hardcode 'Physics 101'

  return (
    <div className="flex flex-col h-full bg-gray-100">
      
      {/* 1. TOP HEADER (within the main content area) */}
      <header className="flex items-center gap-4 p-4 bg-white border-b border-gray-200">
        <Link 
          to="/study-tools/personal-library"
          className="text-gray-500 hover:text-primary-purple transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <Copyright className="w-6 h-6 text-gray-700" />
        <span className="text-xl font-semibold text-gray-800">CampusMatrix</span>
      </header>
      
      {/* 2. MAIN CONTENT (Two Columns) */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* 2a. LEFT SIDEBAR (Notebooks & Tags) */}
        <aside className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-purple"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          {/* Notebooks List */}
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-gray-600 uppercase mb-3">Notebooks</h2>
            <nav className="space-y-1">
              {notebooks.map(book => (
                <div 
                  key={book.id} 
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${
                    book.name === 'Physics 101' ? 'bg-gray-200' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Square className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-gray-800">{book.name}</span>
                  </div>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </nav>
          </section>

          {/* Tags List */}
          <section>
            <h2 className="text-sm font-semibold text-gray-600 uppercase mb-3">Tags</h2>
            <nav className="space-y-1">
              {tags.map(tag => (
                <div key={tag.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <Square className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-800">{tag.name}</span>
                </div>
              ))}
            </nav>
          </section>
        </aside>

        {/* 2b. RIGHT CONTENT (Note List) */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Header Tabs */}
          <div className="flex items-center gap-6 mb-4">
            <button className="py-2 px-5 bg-primary-purple text-white rounded-lg font-semibold shadow-md">
              Physics 101 Notes
            </button>
            <button className="flex items-center gap-2 py-2 px-4 text-gray-600 font-semibold hover:bg-gray-200 rounded-lg">
              All Notes
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          
          {/* Search Bars (Screenshot shows two) */}
          <div className="space-y-4 mb-6">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary-purple"
            />
            <input
              type="text"
              placeholder="Search"
              className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary-purple"
            />
          </div>

          {/* Note List */}
          <div className="space-y-3">
            {notes.map(note => (
              <div
                key={note.id}
                className={`p-4 bg-white rounded-lg border hover:shadow-md cursor-pointer ${
                  note.active 
                    ? 'border-primary-purple bg-primary-purple/10' 
                    : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  {/* Left Side: Title & Snippet */}
                  <div>
                    <h3 className="font-semibold text-gray-900">{note.title}</h3>
                    <p className="text-sm text-gray-600">{note.snippet}</p>
                  </div>
                  {/* Right Side: Time & Date */}
                  <div className="text-right text-xs text-gray-500 whitespace-nowrap pl-4">
                    <p>{note.time}</p>
                    <p>{note.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notebook;
