// src/pages/PersonalLibrary.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Import all the icons we'll need from lucide-react
import {
  Search,
  Upload,
  ChevronsUpDown,
  Folder,
  FileText,
  File as FileIcon
} from 'lucide-react';

// --- FAKE DATA (replaces a database for now) ---
// This is the static data we'll show on the page
const folders = [
  { id: 1, name: 'Physics 101-2023', details: [] },
  { id: 2, name: 'Physics 101-Fall 2023', details: ['24', 'History Seminar-Notes'] },
  { id: 3, name: 'History Seminar-Notes', details: [] },
];

const recentFiles = [
  { id: 1, name: 'Lecture 3 Slides.pdf', uploaded: 'Oct 25', type: 'pdf' },
  { id: 2, name: 'Lecture 3 Slides.pdf', uploaded: 'Oct 21', type: 'pdf' },
  { id: 3, name: 'Kant_Critique_Reading.pdf', uploaded: 'Oct 25', type: 'pdf' },
];

// --- MAIN PAGE COMPONENT ---
const PersonalLibrary = () => {
  return (
    // Main container for the whole page
    <div className="w-full max-w-7xl mx-auto p-4">

      {/* 1. HEADER SECTION (Title, Search, Buttons) */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Personal Library
        </h1>
        
        <div className="flex w-full md:w-auto items-center gap-2">
          {/* Search Bar */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-purple"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          
          {/* Upload Button */}
          <button className="flex items-center gap-2 bg-primary-purple text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-primary-purple/90 transition-all">
            <Upload className="w-5 h-5" />
            Upload Materials
          </button>
          
          {/* Organize Button */}
          <button className="flex items-center gap-2 bg-white text-gray-700 font-semibold py-2 px-4 rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 transition-all">
            Organize
            <ChevronsUpDown className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </header>

      {/* 2. FILE FOLDERS SECTION */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">File Folders</h2>
        {/* Grid for the folders */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {/* We .map() over our fake data to create a card for each folder */}
          {folders.map(folder => (
            <FolderCard key={folder.id} folder={folder} />
          ))}
        </div>
      </section>

      {/* 3. RECENT FILES SECTION */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Files</h2>
        {/* Grid for the files */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {/* We .map() over our fake data to create a card for each file */}
          {recentFiles.map(file => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      </section>

    </div>
  );
};

// --- REUSABLE CARD COMPONENTS ---

// FolderCard Component
// This component is for the purple folder cards
const FolderCard = ({ folder }) => {
  // This is a link. For now, it just goes to "#", 
  // but later it can go to /study-tools/personal-library/folder/{folder.id}
  return (
    <Link to={`/study-tools/personal-library/${folder.id}`} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[140px]">
      <div>
        <Folder className="w-12 h-12 text-primary-purple" strokeWidth={1.5} />
        <h3 className="mt-2 font-semibold text-gray-800 break-words">{folder.name}</h3>
      </div>
      {/* This part only shows if there are extra details */}
      {folder.details.length > 0 && (
        <div className="mt-2 text-sm text-gray-500">
          {folder.details.map((detail, index) => (
            <p key={index}>{detail}</p>
          ))}
        </div>
      )}
    </Link>
  );
};

// FileCard Component
// This component is for the recent file cards
const FileCard = ({ file }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      {/* Logic to show the right icon (PDF vs. other) */}
      {file.type === 'pdf' ? (
        <FileText className="w-8 h-8 text-red-500" />
      ) : (
        <FileIcon className="w-8 h-8 text-gray-500" />
      )}
      <h3 className="mt-3 font-medium text-gray-800 break-words">{file.name}</h3>
      <p className="mt-1 text-sm text-gray-500">Uploaded: Oct {file.uploaded}</p>
    </div>
  );
};

export default PersonalLibrary;