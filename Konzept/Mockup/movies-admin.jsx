import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Film, Plus, Edit2, Trash2, Search, Calendar, Clock, IndianRupee, TrendingUp, TrendingDown, Users, Ticket, Settings, LayoutDashboard, Armchair, Megaphone, FileText, ChevronDown, Bell, Monitor, Sun, Moon, Menu, X, Eye, Star } from 'lucide-react';

const salesData = [
  { name: 'Mo', sales: 12400, tickets: 145 },
  { name: 'Di', sales: 18200, tickets: 210 },
  { name: 'Mi', sales: 15600, tickets: 180 },
  { name: 'Do', sales: 22100, tickets: 255 },
  { name: 'Fr', sales: 31500, tickets: 365 },
  { name: 'Sa', sales: 42800, tickets: 495 },
  { name: 'So', sales: 38200, tickets: 440 },
];

const monthlyData = [
  { month: 'Jan', revenue: 284000 },
  { month: 'Feb', revenue: 312000 },
  { month: 'Mär', revenue: 298000 },
  { month: 'Apr', revenue: 356000 },
  { month: 'Mai', revenue: 389000 },
  { month: 'Jun', revenue: 425000 },
];

const genreData = [
  { name: 'Action', value: 35, color: '#3B82F6' },
  { name: 'Drama', value: 25, color: '#10B981' },
  { name: 'Komödie', value: 20, color: '#F59E0B' },
  { name: 'Horror', value: 12, color: '#EF4444' },
  { name: 'Sci-Fi', value: 8, color: '#8B5CF6' },
];

const initialMovies = [
  { id: 1, title: 'Dune: Part Two', genre: 'Sci-Fi', duration: '166 min', rating: 8.8, status: 'Läuft', ticketsSold: 2450, revenue: 245000, poster: '🏜️', showTimes: 5 },
  { id: 2, title: 'Oppenheimer', genre: 'Drama', duration: '180 min', rating: 8.9, status: 'Läuft', ticketsSold: 3200, revenue: 320000, poster: '💣', showTimes: 4 },
  { id: 3, title: 'Deadpool & Wolverine', genre: 'Action', duration: '127 min', rating: 8.2, status: 'Bald', ticketsSold: 0, revenue: 0, poster: '🦸', showTimes: 6 },
  { id: 4, title: 'Inside Out 2', genre: 'Animation', duration: '96 min', rating: 8.4, status: 'Läuft', ticketsSold: 4100, revenue: 287000, poster: '😊', showTimes: 7 },
  { id: 5, title: 'Joker: Folie à Deux', genre: 'Drama', duration: '138 min', rating: 7.5, status: 'Bald', ticketsSold: 0, revenue: 0, poster: '🃏', showTimes: 0 },
  { id: 6, title: 'Godzilla x Kong', genre: 'Action', duration: '115 min', rating: 7.8, status: 'Beendet', ticketsSold: 5600, revenue: 448000, poster: '🦖', showTimes: 0 },
];

export default function MoviesAdmin() {
  const [movies, setMovies] = useState(initialMovies);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingMovie, setEditingMovie] = useState(null);

  const [newMovie, setNewMovie] = useState({
    title: '',
    genre: 'Action',
    duration: '',
    rating: '',
    status: 'Bald',
    showTimes: 0,
    poster: '🎬'
  });

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || movie.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalRevenue = movies.reduce((sum, m) => sum + m.revenue, 0);
  const totalTickets = movies.reduce((sum, m) => sum + m.ticketsSold, 0);
  const activeMovies = movies.filter(m => m.status === 'Läuft').length;

  const handleAddMovie = () => {
    const movie = {
      ...newMovie,
      id: Date.now(),
      ticketsSold: 0,
      revenue: 0,
      rating: parseFloat(newMovie.rating) || 0,
      showTimes: parseInt(newMovie.showTimes) || 0
    };
    setMovies([...movies, movie]);
    setShowAddModal(false);
    setNewMovie({ title: '', genre: 'Action', duration: '', rating: '', status: 'Bald', showTimes: 0, poster: '🎬' });
  };

  const handleDeleteMovie = (id) => {
    setMovies(movies.filter(m => m.id !== id));
  };

  const handleEditMovie = (movie) => {
    setEditingMovie(movie);
    setNewMovie(movie);
    setShowAddModal(true);
  };

  const handleUpdateMovie = () => {
    setMovies(movies.map(m => m.id === editingMovie.id ? { ...newMovie, id: editingMovie.id } : m));
    setShowAddModal(false);
    setEditingMovie(null);
    setNewMovie({ title: '', genre: 'Action', duration: '', rating: '', status: 'Bald', showTimes: 0, poster: '🎬' });
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    { icon: Film, label: 'Filme', id: 'movies', active: true },
    { icon: Armchair, label: 'Säle', id: 'seats' },
    { icon: Ticket, label: 'Tickets', id: 'tickets' },
    { icon: Settings, label: 'Einstellungen', id: 'settings' },
    { icon: Megaphone, label: 'Werbung', id: 'ads' },
    { icon: FileText, label: 'Berichte', id: 'reports' },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: '#FDCD1F', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');
        
        * { box-sizing: border-box; }
        
        .sidebar {
          background: linear-gradient(180deg, #1e3a5f 0%, #0f2744 100%);
          box-shadow: 4px 0 24px rgba(0,0,0,0.15);
        }
        
        .card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
        }
        
        .card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          transform: translateY(-2px);
        }
        
        .stat-card {
          background: white;
          border-radius: 16px;
          padding: 20px 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        
        .nav-item {
          transition: all 0.2s ease;
          border-radius: 12px;
          margin: 4px 12px;
        }
        
        .nav-item:hover {
          background: rgba(255,255,255,0.1);
        }
        
        .nav-item.active {
          background: rgba(255,255,255,0.15);
          border-left: 3px solid #FDCD1F;
        }
        
        .table-row {
          transition: all 0.2s ease;
        }
        
        .table-row:hover {
          background: #FEF9E7;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59,130,246,0.4);
        }
        
        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }
        
        .status-running {
          background: #D1FAE5;
          color: #059669;
        }
        
        .status-soon {
          background: #FEF3C7;
          color: #D97706;
        }
        
        .status-ended {
          background: #FEE2E2;
          color: #DC2626;
        }
        
        .tab-btn {
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          background: transparent;
          color: #64748B;
        }
        
        .tab-btn.active {
          background: white;
          color: #1e3a5f;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }
        
        .modal {
          background: white;
          border-radius: 20px;
          padding: 32px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          animation: modalIn 0.3s ease;
        }
        
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .input-field {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #E2E8F0;
          border-radius: 10px;
          font-size: 14px;
          transition: all 0.2s ease;
          outline: none;
        }
        
        .input-field:focus {
          border-color: #3B82F6;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
        }
        
        .search-input {
          background: white;
          border: 2px solid #E2E8F0;
          border-radius: 12px;
          padding: 12px 16px 12px 44px;
          width: 300px;
          outline: none;
          transition: all 0.2s ease;
        }
        
        .search-input:focus {
          border-color: #3B82F6;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
        }
        
        .action-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        
        .action-btn:hover {
          transform: scale(1.1);
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #F1F5F9;
          border-radius: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #CBD5E1;
          border-radius: 3px;
        }
      `}</style>

      {/* Sidebar */}
      <aside className="sidebar w-64 min-h-screen flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: '#FDCD1F' }}>
            🎬
          </div>
          <span className="text-white font-bold text-xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Truelabs</span>
        </div>

        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`nav-item flex items-center gap-3 px-4 py-3 cursor-pointer ${item.active ? 'active' : ''}`}
            >
              <item.icon size={20} className={item.active ? 'text-yellow-400' : 'text-gray-400'} />
              <span className={item.active ? 'text-white font-medium' : 'text-gray-400'}>{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="p-6">
          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                SM
              </div>
              <div>
                <div className="text-white font-medium text-sm">Satyajit Mane</div>
                <div className="text-gray-400 text-xs">Admin</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Filme <span className="text-blue-600">Verwaltung</span>
            </h1>
            <p className="text-gray-600 mt-1">Verwalten Sie Ihre Filme, Vorstellungen und Verkäufe</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/80 rounded-xl px-4 py-2">
              <Calendar size={18} className="text-gray-500" />
              <span className="text-gray-700 font-medium">Jun 26 - Aug 5, 2024</span>
              <ChevronDown size={18} className="text-gray-500" />
            </div>
            <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Bell size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-sm font-medium">Gesamtumsatz</span>
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <IndianRupee size={20} className="text-blue-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800">₹{(totalRevenue / 100).toLocaleString()}</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp size={16} className="text-green-500" />
              <span className="text-green-500 text-sm font-medium">+24.5%</span>
              <span className="text-gray-400 text-sm ml-1">vs. letzte Woche</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-sm font-medium">Tickets Verkauft</span>
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <Ticket size={20} className="text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800">{totalTickets.toLocaleString()}</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp size={16} className="text-green-500" />
              <span className="text-green-500 text-sm font-medium">+18.2%</span>
              <span className="text-gray-400 text-sm ml-1">vs. letzte Woche</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-sm font-medium">Aktive Filme</span>
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Film size={20} className="text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800">{activeMovies}</div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-gray-400 text-sm">von {movies.length} Filmen</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-sm font-medium">Ø Bewertung</span>
              <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
                <Star size={20} className="text-yellow-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {(movies.reduce((sum, m) => sum + m.rating, 0) / movies.length).toFixed(1)}
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-yellow-500">★★★★☆</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 bg-white/50 p-1.5 rounded-xl w-fit">
          {['overview', 'movies', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            >
              {tab === 'overview' ? 'Übersicht' : tab === 'movies' ? 'Alle Filme' : 'Analysen'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-3 gap-6">
            {/* Weekly Sales Chart */}
            <div className="card col-span-2 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-800 text-lg">Wöchentliche Verkäufe</h3>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-500">Umsatz (₹)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-500">Tickets</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={salesData} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'white', 
                      border: 'none', 
                      borderRadius: '12px', 
                      boxShadow: '0 4px 20px rgba(0,0,0,0.15)' 
                    }} 
                  />
                  <Bar dataKey="sales" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="tickets" fill="#10B981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Genre Distribution */}
            <div className="card p-6">
              <h3 className="font-bold text-gray-800 text-lg mb-6">Genre Verteilung</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={genreData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {genreData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-3 mt-4">
                {genreData.map((genre) => (
                  <div key={genre.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: genre.color }}></div>
                    <span className="text-sm text-gray-600">{genre.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performing Movies */}
            <div className="card col-span-2 p-6">
              <h3 className="font-bold text-gray-800 text-lg mb-4">Top Performer</h3>
              <div className="space-y-4">
                {movies
                  .filter(m => m.ticketsSold > 0)
                  .sort((a, b) => b.ticketsSold - a.ticketsSold)
                  .slice(0, 4)
                  .map((movie, index) => (
                    <div key={movie.id} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div className="text-2xl">{movie.poster}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{movie.title}</div>
                        <div className="text-sm text-gray-500">{movie.genre}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-800">{movie.ticketsSold.toLocaleString()} Tickets</div>
                        <div className="text-sm text-green-600">₹{(movie.revenue / 100).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Monthly Revenue Trend */}
            <div className="card p-6">
              <h3 className="font-bold text-gray-800 text-lg mb-4">Monatlicher Trend</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    strokeWidth={3} 
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#3B82F6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'movies' && (
          <div className="card p-6">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Film suchen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="input-field w-auto"
                >
                  <option value="all">Alle Status</option>
                  <option value="Läuft">Läuft</option>
                  <option value="Bald">Bald</option>
                  <option value="Beendet">Beendet</option>
                </select>
              </div>
              <button className="btn-primary" onClick={() => setShowAddModal(true)}>
                <Plus size={20} />
                Film hinzufügen
              </button>
            </div>

            {/* Movies Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">Film</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">Genre</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">Dauer</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">Bewertung</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">Status</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">Vorstellungen</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">Tickets</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">Umsatz</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-600 text-sm">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMovies.map((movie) => (
                    <tr key={movie.id} className="table-row border-b border-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{movie.poster}</div>
                          <span className="font-semibold text-gray-800">{movie.title}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{movie.genre}</td>
                      <td className="py-4 px-4 text-gray-600">{movie.duration}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1">
                          <Star size={16} className="text-yellow-500 fill-yellow-500" />
                          <span className="font-medium text-gray-800">{movie.rating}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`status-badge ${
                          movie.status === 'Läuft' ? 'status-running' : 
                          movie.status === 'Bald' ? 'status-soon' : 'status-ended'
                        }`}>
                          {movie.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{movie.showTimes}</td>
                      <td className="py-4 px-4 font-medium text-gray-800">{movie.ticketsSold.toLocaleString()}</td>
                      <td className="py-4 px-4 font-medium text-green-600">₹{(movie.revenue / 100).toLocaleString()}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button 
                            className="action-btn bg-blue-100 text-blue-600 hover:bg-blue-200"
                            onClick={() => handleEditMovie(movie)}
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            className="action-btn bg-red-100 text-red-600 hover:bg-red-200"
                            onClick={() => handleDeleteMovie(movie.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-2 gap-6">
            <div className="card p-6 col-span-2">
              <h3 className="font-bold text-gray-800 text-lg mb-6">Umsatz nach Monat</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(v) => `₹${v/1000}k`} />
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Umsatz']} />
                  <Bar dataKey="revenue" fill="url(#blueGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#1D4ED8" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="card p-6">
              <h3 className="font-bold text-gray-800 text-lg mb-4">Verkaufskanäle</h3>
              <div className="space-y-4 mt-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Online Buchung</span>
                    <span className="font-semibold">68%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Vor Ort Kasse</span>
                    <span className="font-semibold">25%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Partner Apps</span>
                    <span className="font-semibold">7%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" style={{ width: '7%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-bold text-gray-800 text-lg mb-4">Spitzenzeiten</h3>
              <div className="grid grid-cols-7 gap-2 mt-6">
                {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day, i) => (
                  <div key={day} className="text-center">
                    <div className="text-sm text-gray-500 mb-2">{day}</div>
                    <div 
                      className="mx-auto rounded-lg"
                      style={{ 
                        width: '100%', 
                        height: `${[40, 50, 45, 60, 85, 100, 90][i]}px`,
                        background: i >= 4 ? 'linear-gradient(180deg, #3B82F6 0%, #1D4ED8 100%)' : '#E2E8F0'
                      }}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-xl">
                <div className="text-sm text-blue-700 font-medium">📈 Höchste Auslastung: Samstag 19:00 - 21:00</div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add/Edit Movie Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => { setShowAddModal(false); setEditingMovie(null); }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {editingMovie ? 'Film bearbeiten' : 'Neuen Film hinzufügen'}
              </h2>
              <button 
                className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                onClick={() => { setShowAddModal(false); setEditingMovie(null); }}
              >
                <X size={18} className="text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filmtitel</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="z.B. Avengers: Endgame"
                  value={newMovie.title}
                  onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
                  <select
                    className="input-field"
                    value={newMovie.genre}
                    onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
                  >
                    <option>Action</option>
                    <option>Drama</option>
                    <option>Komödie</option>
                    <option>Horror</option>
                    <option>Sci-Fi</option>
                    <option>Animation</option>
                    <option>Thriller</option>
                    <option>Romantik</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dauer</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="z.B. 120 min"
                    value={newMovie.duration}
                    onChange={(e) => setNewMovie({ ...newMovie, duration: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bewertung (IMDb)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    className="input-field"
                    placeholder="z.B. 8.5"
                    value={newMovie.rating}
                    onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vorstellungen/Tag</label>
                  <input
                    type="number"
                    min="0"
                    className="input-field"
                    placeholder="z.B. 5"
                    value={newMovie.showTimes}
                    onChange={(e) => setNewMovie({ ...newMovie, showTimes: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    className="input-field"
                    value={newMovie.status}
                    onChange={(e) => setNewMovie({ ...newMovie, status: e.target.value })}
                  >
                    <option value="Bald">Bald</option>
                    <option value="Läuft">Läuft</option>
                    <option value="Beendet">Beendet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Poster Emoji</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="🎬"
                    value={newMovie.poster}
                    onChange={(e) => setNewMovie({ ...newMovie, poster: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  className="flex-1 py-3 rounded-xl border-2 border-gray-200 font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                  onClick={() => { setShowAddModal(false); setEditingMovie(null); }}
                >
                  Abbrechen
                </button>
                <button
                  className="flex-1 py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)' }}
                  onClick={editingMovie ? handleUpdateMovie : handleAddMovie}
                >
                  {editingMovie ? 'Speichern' : 'Hinzufügen'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
