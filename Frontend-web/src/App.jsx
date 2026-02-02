import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { MessageCircle, Send, Sparkles, Shield, BarChart3, Network, TrendingUp, Clock, AlertTriangle, CheckCircle, XCircle, Filter, Search, Download, Eye, Brain, Zap, Target, Activity, Layers, GitBranch, Lock, LogOut, User, Menu, X, ChevronRight, FileText, Database, Settings } from 'lucide-react';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [userMode, setUserMode] = useState('chat');
  
  // User chatbot state
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hey there! I\'m here to help with any issues you\'re running into. Just describe what\'s going on, and I\'ll make sure it gets to the right team.', timestamp: new Date() }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');
  
  // Admin state
  const [activeAdminTab, setActiveAdminTab] = useState('dashboard');
  const [issues, setIssues] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  
  const chatEndRef = useRef(null);

  // Sample dataset with percentage-based priorities
  const sampleIssues = [
    {
      issue_id: 'TKT-001',
      timestamp: new Date('2024-02-01T09:30:00'),
      user_text: 'WiFi not working in building A, unable to connect to campus network',
      category: 'Network',
      priority: 75,
      keywords_extracted: ['wifi', 'network', 'connection', 'building'],
      sentiment_score: -0.6,
      status: 'Resolved',
      resolution_time: '2.5h',
      assigned_to: 'IT Team'
    },
    {
      issue_id: 'TKT-002',
      timestamp: new Date('2024-02-01T10:15:00'),
      user_text: 'Air conditioning broken in lecture hall 301, room is too hot',
      category: 'Facilities',
      priority: 68,
      keywords_extracted: ['conditioning', 'lecture', 'hall', 'temperature'],
      sentiment_score: -0.4,
      status: 'In Progress',
      resolution_time: null,
      assigned_to: 'Facilities Team'
    },
    {
      issue_id: 'TKT-003',
      timestamp: new Date('2024-02-01T11:00:00'),
      user_text: 'Cannot access course materials on learning portal, getting error 404',
      category: 'Academic',
      priority: 92,
      keywords_extracted: ['course', 'portal', 'error', 'access'],
      sentiment_score: -0.7,
      status: 'Open',
      resolution_time: null,
      assigned_to: 'Academic Support'
    },
    {
      issue_id: 'TKT-004',
      timestamp: new Date('2024-02-01T11:45:00'),
      user_text: 'Need transcript for job application, how to request official documents?',
      category: 'Admin',
      priority: 35,
      keywords_extracted: ['transcript', 'documents', 'application', 'official'],
      sentiment_score: 0.2,
      status: 'Resolved',
      resolution_time: '1.2h',
      assigned_to: 'Admin Office'
    },
    {
      issue_id: 'TKT-005',
      timestamp: new Date('2024-02-01T13:20:00'),
      user_text: 'Laptop provided by IT not turning on, urgent need for assignment deadline',
      category: 'IT Support',
      priority: 88,
      keywords_extracted: ['laptop', 'hardware', 'urgent', 'assignment'],
      sentiment_score: -0.8,
      status: 'In Progress',
      resolution_time: null,
      assigned_to: 'IT Support'
    },
    {
      issue_id: 'TKT-006',
      timestamp: new Date('2024-02-01T14:30:00'),
      user_text: 'Library printer jam, paper stuck and not printing',
      category: 'Facilities',
      priority: 42,
      keywords_extracted: ['printer', 'library', 'paper', 'facilities'],
      sentiment_score: -0.3,
      status: 'Resolved',
      resolution_time: '0.8h',
      assigned_to: 'Library Staff'
    },
    {
      issue_id: 'TKT-007',
      timestamp: new Date('2024-02-02T08:00:00'),
      user_text: 'Campus VPN connection keeps dropping, cannot access remote resources',
      category: 'Network',
      priority: 71,
      keywords_extracted: ['connection', 'network', 'remote', 'resources'],
      sentiment_score: -0.5,
      status: 'Open',
      resolution_time: null,
      assigned_to: 'Network Team'
    },
    {
      issue_id: 'TKT-008',
      timestamp: new Date('2024-02-02T09:15:00'),
      user_text: 'Grade not updated in system after exam, showing incorrect marks',
      category: 'Academic',
      priority: 85,
      keywords_extracted: ['grade', 'exam', 'marks', 'system'],
      sentiment_score: -0.6,
      status: 'In Progress',
      resolution_time: null,
      assigned_to: 'Academic Office'
    }
  ];

  useEffect(() => {
    setIssues(sampleIssues);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Helper to get priority label from percentage
  const getPriorityLabel = (priority) => {
    if (priority >= 80) return 'Critical';
    if (priority >= 60) return 'High';
    if (priority >= 40) return 'Medium';
    return 'Low';
  };

  // Helper to get priority color
  const getPriorityColor = (priority) => {
    if (priority >= 80) return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' };
    if (priority >= 60) return { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' };
    if (priority >= 40) return { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' };
    return { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' };
  };

  // ML-like categorization logic
  const categorizeIssue = (text) => {
    const lowerText = text.toLowerCase();
    
    const categoryKeywords = {
      'Network': ['wifi', 'internet', 'network', 'connection', 'vpn', 'ethernet'],
      'Facilities': ['conditioning', 'temperature', 'room', 'building', 'lights', 'printer'],
      'Academic': ['course', 'class', 'lecture', 'exam', 'grade', 'assignment', 'portal'],
      'Admin': ['transcript', 'document', 'certificate', 'registration', 'application'],
      'IT Support': ['laptop', 'computer', 'software', 'hardware', 'login', 'password']
    };

    let bestCategory = 'IT Support';
    let maxScore = 0;

    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      const score = keywords.filter(keyword => lowerText.includes(keyword)).length;
      if (score > maxScore) {
        maxScore = score;
        bestCategory = category;
      }
    }

    return bestCategory;
  };

  // Priority prediction as percentage
  const predictPriority = (text) => {
    const lowerText = text.toLowerCase();
    
    const urgentKeywords = ['urgent', 'critical', 'emergency', 'asap', 'deadline', 'broken', 'error'];
    const highKeywords = ['important', 'need', 'problem', 'issue', 'cannot', 'not working'];
    const normalKeywords = ['how', 'help', 'request', 'question'];
    
    const urgentCount = urgentKeywords.filter(k => lowerText.includes(k)).length;
    const highCount = highKeywords.filter(k => lowerText.includes(k)).length;
    const normalCount = normalKeywords.filter(k => lowerText.includes(k)).length;
    
    // Base priority calculation
    let priority = 50;
    
    if (urgentCount > 0) {
      priority += urgentCount * 15;
    }
    if (highCount > 0) {
      priority += highCount * 8;
    }
    if (normalCount > 0) {
      priority -= normalCount * 5;
    }
    
    // Cap between 20 and 95
    return Math.min(95, Math.max(20, priority));
  };

  // Sentiment analysis
  const analyzeSentiment = (text) => {
    const lowerText = text.toLowerCase();
    const negativeWords = ['broken', 'not working', 'error', 'problem', 'urgent', 'critical'];
    const positiveWords = ['thank', 'please', 'help'];
    
    let score = 0;
    negativeWords.forEach(word => {
      if (lowerText.includes(word)) score -= 0.2;
    });
    positiveWords.forEach(word => {
      if (lowerText.includes(word)) score += 0.1;
    });
    
    return Math.max(-1, Math.min(1, score));
  };

  const handleUserSubmit = async () => {
    if (!userInput.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: userInput,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setUserInput('');
    setIsTyping(true);

    setTimeout(() => {
      const category = categorizeIssue(userInput);
      const priority = predictPriority(userInput);
      const sentiment = analyzeSentiment(userInput);
      const newTicketId = `TKT-${String(issues.length + 1).padStart(3, '0')}`;
      
      const newIssue = {
        issue_id: newTicketId,
        timestamp: new Date(),
        user_text: userInput,
        category: category,
        priority: priority,
        keywords_extracted: userInput.toLowerCase().split(' ').filter(w => w.length > 3).slice(0, 4),
        sentiment_score: sentiment,
        status: 'Open',
        resolution_time: null,
        assigned_to: category === 'Network' ? 'Network Team' :
                      category === 'Facilities' ? 'Facilities Team' :
                      category === 'Academic' ? 'Academic Support' :
                      category === 'Admin' ? 'Admin Office' : 'IT Support'
      };

      setIssues([...issues, newIssue]);
      setTicketNumber(newTicketId);

      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        text: `Got it! I've logged your issue as ${newTicketId}. Based on what you described, this looks like a ${category} issue with ${priority}% priority. The ${newIssue.assigned_to} will look into this. You should hear back soon!`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleLogin = () => {
    if (loginData.username === 'admin' && loginData.password === 'admin123') {
      setIsAdmin(true);
      setShowLogin(false);
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setUserMode('chat');
  };

  // Filter issues
  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.user_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.issue_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || issue.category === filterCategory;
    const matchesPriority = filterPriority === 'all' || 
                            (filterPriority === 'critical' && issue.priority >= 80) ||
                            (filterPriority === 'high' && issue.priority >= 60 && issue.priority < 80) ||
                            (filterPriority === 'medium' && issue.priority >= 40 && issue.priority < 60) ||
                            (filterPriority === 'low' && issue.priority < 40);
    const matchesStatus = filterStatus === 'all' || issue.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });

  // Analytics calculations
  const totalIssues = issues.length;
  const openIssues = issues.filter(i => i.status === 'Open').length;
  const inProgressIssues = issues.filter(i => i.status === 'In Progress').length;
  const resolvedIssues = issues.filter(i => i.status === 'Resolved').length;
  const avgResolutionTime = issues.filter(i => i.resolution_time).length > 0
    ? (issues.filter(i => i.resolution_time).reduce((acc, i) => acc + parseFloat(i.resolution_time), 0) / 
       issues.filter(i => i.resolution_time).length).toFixed(1)
    : 0;

  const categoryDistribution = [
    { name: 'Network', value: issues.filter(i => i.category === 'Network').length, color: '#3b82f6' },
    { name: 'Facilities', value: issues.filter(i => i.category === 'Facilities').length, color: '#8b5cf6' },
    { name: 'Academic', value: issues.filter(i => i.category === 'Academic').length, color: '#ec4899' },
    { name: 'Admin', value: issues.filter(i => i.category === 'Admin').length, color: '#10b981' },
    { name: 'IT Support', value: issues.filter(i => i.category === 'IT Support').length, color: '#f59e0b' }
  ].filter(item => item.value > 0);

  const priorityDistribution = [
    { name: 'Critical (80%+)', value: issues.filter(i => i.priority >= 80).length, color: '#ef4444' },
    { name: 'High (60-79%)', value: issues.filter(i => i.priority >= 60 && i.priority < 80).length, color: '#f97316' },
    { name: 'Medium (40-59%)', value: issues.filter(i => i.priority >= 40 && i.priority < 60).length, color: '#eab308' },
    { name: 'Low (<40%)', value: issues.filter(i => i.priority < 40).length, color: '#22c55e' }
  ].filter(item => item.value > 0);

  const statusTrend = [
    { date: 'Mon', open: 3, resolved: 2, inProgress: 1 },
    { date: 'Tue', open: 2, resolved: 3, inProgress: 2 },
    { date: 'Wed', open: 1, resolved: 2, inProgress: 1 },
    { date: 'Thu', open: 2, resolved: 4, inProgress: 2 },
  ];

  // Extract all keywords and count frequency
  const allKeywords = issues.flatMap(i => i.keywords_extracted);
  const keywordCounts = allKeywords.reduce((acc, kw) => {
    acc[kw] = (acc[kw] || 0) + 1;
    return acc;
  }, {});
  const topPatterns = Object.entries(keywordCounts)
    .map(([keyword, count]) => ({ keyword, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Login Modal */}
      {showLogin && !isAdmin && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="card rounded-3xl p-8 w-96 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Admin Access</h2>
            </div>
            <input
              type="text"
              placeholder="Username"
              value={loginData.username}
              onChange={(e) => setLoginData({...loginData, username: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white mb-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white mb-4"
            />
            <div className="flex gap-3">
              <button onClick={handleLogin} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition">
                Login
              </button>
              <button onClick={() => setShowLogin(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-xl transition">
                Cancel
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">Default: admin / admin123</p>
          </div>
        </div>
      )}

      {/* User Chat Interface */}
      {!isAdmin && (
        <div className="min-h-screen flex flex-col">
          <div className="bg-black/20 backdrop-blur-md border-b border-white/10 px-6 py-4">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Issue Assistant</h1>
                  <p className="text-sm text-gray-400">Here to help sort things out</p>
                </div>
              </div>
              <button 
                onClick={() => setShowLogin(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-white transition"
              >
                <Lock className="w-4 h-4" />
                <span className="text-sm">Admin</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="max-w-4xl mx-auto space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-lg ${
                    msg.type === 'user' 
                      ? 'bg-blue-600 text-white rounded-2xl rounded-br-md' 
                      : 'card text-gray-100 rounded-2xl rounded-bl-md'
                  } px-5 py-3`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className="text-xs opacity-60 mt-2">{msg.timestamp.toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="card px-5 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-md border-t border-white/10 px-6 py-4">
            <div className="max-w-4xl mx-auto flex gap-3">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleUserSubmit()}
                placeholder="Describe your issue..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
              />
              <button 
                onClick={handleUserSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition flex items-center gap-2 font-semibold"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Dashboard */}
      {isAdmin && (
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className={`${showSidebar ? 'w-64' : 'w-0'} bg-black/20 backdrop-blur-md border-r border-white/10 transition-all overflow-hidden`}>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Admin Panel</h2>
                  <p className="text-xs text-gray-400">Issue Management</p>
                </div>
              </div>

              <nav className="space-y-2">
                {[
                  { id: 'dashboard', icon: BarChart3, label: 'Overview' },
                  { id: 'issues', icon: FileText, label: 'All Issues' },
                  { id: 'patterns', icon: Network, label: 'Patterns' },
                  { id: 'dataset', icon: Database, label: 'Data' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveAdminTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                      activeAdminTab === tab.id 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>

              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition mt-8"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1">
                    {activeAdminTab === 'dashboard' && 'Dashboard'}
                    {activeAdminTab === 'issues' && 'Issue Tracker'}
                    {activeAdminTab === 'patterns' && 'Keyword Patterns'}
                    {activeAdminTab === 'dataset' && 'Dataset Info'}
                  </h1>
                  <p className="text-gray-400">
                    {activeAdminTab === 'dashboard' && 'Quick overview of all issues'}
                    {activeAdminTab === 'issues' && `Showing ${filteredIssues.length} of ${totalIssues} issues`}
                    {activeAdminTab === 'patterns' && 'Most common keywords across issues'}
                    {activeAdminTab === 'dataset' && 'Schema and sample data'}
                  </p>
                </div>
                <button 
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white transition"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>

              {/* DASHBOARD TAB */}
              {activeAdminTab === 'dashboard' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="card rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-3">
                        <FileText className="w-8 h-8 text-blue-400" />
                        <div className="text-3xl font-bold text-white">{totalIssues}</div>
                      </div>
                      <div className="text-sm text-gray-400">Total Issues</div>
                    </div>
                    
                    <div className="card rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-3">
                        <AlertTriangle className="w-8 h-8 text-yellow-400" />
                        <div className="text-3xl font-bold text-white">{openIssues}</div>
                      </div>
                      <div className="text-sm text-gray-400">Open</div>
                    </div>
                    
                    <div className="card rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Activity className="w-8 h-8 text-orange-400" />
                        <div className="text-3xl font-bold text-white">{inProgressIssues}</div>
                      </div>
                      <div className="text-sm text-gray-400">In Progress</div>
                    </div>
                    
                    <div className="card rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-3">
                        <CheckCircle className="w-8 h-8 text-green-400" />
                        <div className="text-3xl font-bold text-white">{resolvedIssues}</div>
                      </div>
                      <div className="text-sm text-gray-400">Resolved</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="card rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-white mb-4">Issue Categories</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={categoryDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            dataKey="value"
                          >
                            {categoryDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ background: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="card rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-white mb-4">Priority Levels</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={priorityDistribution}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="name" stroke="#9ca3af" />
                          <YAxis stroke="#9ca3af" />
                          <Tooltip 
                            contentStyle={{ background: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                          />
                          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                            {priorityDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {/* ISSUES TAB */}
              {activeAdminTab === 'issues' && (
                <div className="space-y-6">
                  <div className="card rounded-2xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search issues..."
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white"
                      />
                      <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white">
                        <option value="all">All Categories</option>
                        {['Network', 'Facilities', 'Academic', 'Admin', 'IT Support'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white">
                        <option value="all">All Priorities</option>
                        <option value="critical">Critical (80%+)</option>
                        <option value="high">High (60-79%)</option>
                        <option value="medium">Medium (40-59%)</option>
                        <option value="low">Low (&lt;40%)</option>
                      </select>
                      <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white">
                        <option value="all">All Status</option>
                        {['Open', 'In Progress', 'Resolved'].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {filteredIssues.map((issue) => {
                      const priorityColor = getPriorityColor(issue.priority);
                      return (
                        <div key={issue.issue_id} className="card rounded-xl p-5 hover:bg-white/5 transition">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className="mono text-sm font-bold text-blue-400">{issue.issue_id}</span>
                              <div className={`priority-badge flex items-center gap-2 px-3 py-1 rounded-full border ${priorityColor.bg} ${priorityColor.text} ${priorityColor.border}`}>
                                <div className="w-2 h-2 rounded-full bg-current"></div>
                                <span className="text-xs font-bold">{issue.priority}%</span>
                                <span className="text-xs opacity-75">• {getPriorityLabel(issue.priority)}</span>
                              </div>
                              <span className="px-2 py-1 rounded text-xs font-bold bg-purple-500/20 text-purple-400">{issue.category}</span>
                            </div>
                            <span className={`px-3 py-1 rounded text-xs font-bold ${
                              issue.status === 'Resolved' ? 'bg-green-500/20 text-green-400' :
                              issue.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>{issue.status}</span>
                          </div>
                          
                          <div className="mb-3">
                            <div className="priority-bar bg-white/5 overflow-hidden">
                              <div 
                                className={`h-full ${
                                  issue.priority >= 80 ? 'bg-red-500' :
                                  issue.priority >= 60 ? 'bg-orange-500' :
                                  issue.priority >= 40 ? 'bg-yellow-500' :
                                  'bg-green-500'
                                }`}
                                style={{ width: `${issue.priority}%` }}
                              />
                            </div>
                          </div>

                          <p className="text-gray-300 mb-3">{issue.user_text}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {issue.keywords_extracted.map((kw, idx) => (
                              <span key={idx} className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded">#{kw}</span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{issue.assigned_to}</span>
                            <span>{issue.timestamp.toLocaleString()}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PATTERNS TAB */}
              {activeAdminTab === 'patterns' && (
                <div className="space-y-6">
                  <div className="card rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Most Common Keywords</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {topPatterns.map((pattern, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4 text-center hover:scale-105 transition">
                          <div className="text-3xl font-bold text-white mb-2">{pattern.count}</div>
                          <div className="text-sm text-blue-400">#{pattern.keyword}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Keyword Frequency</h3>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={topPatterns} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis type="number" stroke="#9ca3af" />
                        <YAxis dataKey="keyword" type="category" stroke="#9ca3af" width={100} />
                        <Tooltip contentStyle={{ background: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }} />
                        <Bar dataKey="count" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* DATASET TAB */}
              {activeAdminTab === 'dataset' && (
                <div className="space-y-6">
                  <div className="card rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Dataset Schema</h3>
                    <div className="bg-black/40 rounded-xl p-4 border border-white/10 mono text-sm space-y-1 text-gray-300">
                      <p>{'{'}</p>
                      <p className="ml-4">issue_id: string,</p>
                      <p className="ml-4">timestamp: datetime,</p>
                      <p className="ml-4">user_text: string,</p>
                      <p className="ml-4">category: enum,</p>
                      <p className="ml-4">priority: number (0-100), <span className="text-yellow-400">// percentage-based</span></p>
                      <p className="ml-4">keywords_extracted: array,</p>
                      <p className="ml-4">sentiment_score: float,</p>
                      <p className="ml-4">status: enum,</p>
                      <p className="ml-4">resolution_time: string | null,</p>
                      <p className="ml-4">assigned_to: string</p>
                      <p>{'}'}</p>
                    </div>
                  </div>

                  <div className="card rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Sample Data ({issues.length} records)</h3>
                    <div className="bg-black/40 rounded-xl p-4 border border-white/10 overflow-auto max-h-96">
                      <pre className="text-xs mono text-gray-300">{JSON.stringify(issues.slice(0, 2), null, 2)}</pre>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
