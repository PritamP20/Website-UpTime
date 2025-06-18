"use client";
import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Globe, Plus, Moon, Sun, AlertCircle, RefreshCw, Trash2 } from 'lucide-react';
import { useWebsites } from '@/hooks/useWebsites';
import axios from 'axios';
import { API_BACKEND_URL } from '@/config';
import { useAuth } from '@clerk/nextjs';

type UptimeStatus = "good" | "bad" | "unknown";

function StatusCircle({ status }: { status: UptimeStatus }) {
  return (
    <div className={`w-3 h-3 rounded-full ${
      status === 'good' ? 'bg-emerald-500' : 
      status === 'bad' ? 'bg-red-500' : 
      'bg-gray-400'
    } shadow-sm`} />
  );
}

function UptimeTicks({ ticks }: { ticks: UptimeStatus[] }) {
  return (
    <div className="flex gap-1 mt-3">
      {ticks.map((tick, index) => (
        <div
          key={index}
          className={`h-6 w-8 rounded-sm ${
            tick === 'good' ? 'bg-emerald-500' : 
            tick === 'bad' ? 'bg-red-500' : 
            'bg-gray-300 dark:bg-gray-900'
          } transition-all duration-200 hover:scale-110`}
          title={`Status ${index + 1}: ${tick === 'good' ? 'Online' : tick === 'bad' ? 'Offline' : 'Unknown'}`}
        />
      ))}
    </div>
  );
}

function CreateWebsiteModal({ isOpen, onClose }: { isOpen: boolean; onClose: (url: string | null) => void }) {
  const [url, setUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(true);
  
  if (!isOpen) return null;

  const validateUrl = (input: string) => {
    try {
      new URL(input);
      setIsValidUrl(true);
      return true;
    } catch (e) {
      setIsValidUrl(input === '' || input.startsWith('http'));
      return false;
    }
  };

  const handleSubmit = () => {
    if (validateUrl(url)) {
      onClose(url);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm transition-opacity duration-200">
      <div className="bg-white dark:bg-[#0d0d0d] rounded-lg shadow-xl p-6 w-full max-w-md border dark:border-gray-700 transform transition-all duration-200">
        <h2 className="text-xl font-bold mb-4 dark:text-white flex items-center">
          <Globe className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
          Add New Website
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Website URL
          </label>
          <div className="relative">
            <input
              type="url"
              className={`w-full px-4 py-3 border ${
                isValidUrl ? 'border-gray-300 dark:border-gray-600' : 'border-red-500'
              } rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200`}
              placeholder="https://example.com"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                validateUrl(e.target.value);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              autoFocus
            />
            {!isValidUrl && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          {!isValidUrl && (
            <p className="mt-1 text-sm text-red-500">Please enter a valid URL (e.g., https://example.com)</p>
          )}
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={() => onClose(null)}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!isValidUrl || url.trim() === ''}
            className={`px-4 py-2 text-sm font-medium text-white ${
              isValidUrl && url.trim() !== '' 
                ? 'bg-blue-600 hover:bg-blue-500' 
                : 'bg-blue-400 cursor-not-allowed'
            } rounded-lg transition-colors duration-200`}
          >
            Add Website
          </button>
        </div>
      </div>
    </div>
  );
}

interface ProcessedWebsite {
  id: string;
  url: string;
  status: UptimeStatus;
  uptimePercentage: number;
  lastChecked: string;
  uptimeTicks: UptimeStatus[];
}

function WebsiteCard({ website, onDelete }: { website: ProcessedWebsite, onDelete?: (id: string) => void }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Format domain name for display
  const displayUrl = useMemo(() => {
    try {
      const url = new URL(website.url);
      return url.hostname;
    } catch (e) {
      return website.url;
    }
  }, [website.url]);
  
  const statusText = website.status === 'good' ? 'Online' : website.status === 'bad' ? 'Offline' : 'Unknown';

  return (
    <div 
      className="bg-white dark:bg-[#0d0d0d] rounded-lg shadow-md overflow-hidden border border-gray-500 dark:border-gray-700 transition-all duration-200 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="p-4 cursor-pointer flex items-center justify-between hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-4">
          <div className={`p-2 rounded-full ${
            website.status === 'good' ? 'bg-emerald-100 dark:bg-emerald-900/30' : 
            website.status === 'bad' ? 'bg-red-100 dark:bg-red-900/30' : 
            'bg-gray-100 dark:bg-gray-900'
          }`}>
            <StatusCircle status={website.status} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
              {displayUrl}
              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                website.status === 'good' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' : 
                website.status === 'bad' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : 
                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}>
                {statusText}
              </span>
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{website.url}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {website.uptimePercentage.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">uptime</div>
          </div>
          <div className="flex items-center space-x-2">
            {isHovered && onDelete && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(website.id);
                }}
                className="p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-200"
                title="Delete website"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            )}
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-5 pb-5 pt-2 border-t border-gray-500 dark:border-gray-700 bg-gray-600 dark:bg-gray-750/50">
          <div className="mt-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status history (last 30 minutes):
            </p>
            <UptimeTicks ticks={website.uptimeTicks} />
          </div>
          <div className="flex justify-between items-center mt-4 text-xs text-gray-500 dark:text-gray-400">
            <p>
              Last checked: {website.lastChecked}
            </p>
            <button className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">
              <RefreshCw className="w-3 h-3" />
              <span>Refresh now</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const {websites, refreshWebsites} = useWebsites();
  const { getToken } = useAuth();

  const processedWebsites = useMemo(() => {
    return websites?.map((website:any) => {
      // Sort ticks by creation time
      const sortedTicks = [...website.ticks].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Get the most recent 30 minutes of ticks
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
      const recentTicks = sortedTicks.filter(tick => 
        new Date(tick.createdAt) > thirtyMinutesAgo
      );

      // Aggregate ticks into 3-minute windows (10 windows total)
      const windows: UptimeStatus[] = [];

      for (let i = 0; i < 10; i++) {
        const windowStart = new Date(Date.now() - (i + 1) * 3 * 60 * 1000);
        const windowEnd = new Date(Date.now() - i * 3 * 60 * 1000);
        
        const windowTicks = recentTicks.filter(tick => {
          const tickTime = new Date(tick.createdAt);
          return tickTime >= windowStart && tickTime < windowEnd;
        });

        // Window is considered up if majority of ticks are up
        const upTicks = windowTicks.filter(tick => tick.status === 'Good').length;
        windows[9 - i] = windowTicks.length === 0 ? "unknown" : (upTicks / windowTicks.length) >= 0.5 ? "good" : "bad";
      }

      // Calculate overall status and uptime percentage
      const totalTicks = sortedTicks.length;
      const upTicks = sortedTicks.filter(tick => tick.status === 'Good').length;
      const uptimePercentage = totalTicks === 0 ? 100 : (upTicks / totalTicks) * 100;

      // Get the most recent status
      const currentStatus = sortedTicks.length > 0 
        ? (sortedTicks[0].status === 'Good' ? 'good' : 'bad')
        : 'unknown';

      // Format the last checked time
      const lastChecked = sortedTicks[0]
        ? new Date(sortedTicks[0].createdAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
        : 'Never';

      return {
        id: website.id,
        url: website.url,
        status: currentStatus,
        uptimePercentage,
        lastChecked,
        uptimeTicks: windows,
      };
    }) || [];
  }, [websites]);

  // Handle website deletion
  const handleDeleteWebsite = async (id: string) => {
    if (confirm('Are you sure you want to remove this website from monitoring?')) {
      try {
        const token = await getToken();
        await axios.delete(`${API_BACKEND_URL}/api/v1/website/${id}`, {
          headers: {
            Authorization: token,
          }
        });
        refreshWebsites();
      } catch (error) {
        console.error('Error deleting website:', error);
        alert('Failed to delete website');
      }
    }
  };

  // Handle refresh 
  const handleRefresh = async () => {
    setIsLoading(true);
    await refreshWebsites();
    setIsLoading(false);
  };

  // Toggle dark mode
  React.useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Calculate overall stats
  const stats = useMemo(() => {
    const totalSites = processedWebsites.length;
    const upSites = processedWebsites.filter(site => site.status === 'good').length;
    const downSites = processedWebsites.filter(site => site.status === 'bad').length;
    const unknownSites = processedWebsites.filter(site => site.status === 'unknown').length;
    
    return { totalSites, upSites, downSites, unknownSites };
  }, [processedWebsites]);

  return (
    <div className="min-h-screen bg-black-900 dark:bg-black-900 transition-colors duration-200 pt-28 pb-20 md:pt-36 md:pb-32 relative overflow-hidden">

      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Stats overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-[#0d0d0d] rounded-lg shadow-sm p-4 border border-gray-500 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-colors duration-200">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Websites</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalSites}</div>
          </div>
          <div className="bg-white dark:bg-[#0d0d0d] rounded-lg shadow-sm p-4 border border-gray-500 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors duration-200">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Online</div>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{stats.upSites}</div>
          </div>
          <div className="bg-white dark:bg-[#0d0d0d] rounded-lg shadow-sm p-4 border border-gray-500 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-800 transition-colors duration-200">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Offline</div>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">{stats.downSites}</div>
          </div>
          <div className="bg-white dark:bg-[#0d0d0d] rounded-lg shadow-sm p-4 border border-gray-500 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-colors duration-200">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Unknown</div>
            <div className="text-2xl font-bold text-gray-600 dark:text-gray-400 mt-1">{stats.unknownSites}</div>
          </div>
        </div>
        
        {/* Website list */}
        {processedWebsites.length > 0 ? (
          <div className="space-y-4">
            {processedWebsites.map((website:any) => (
              <WebsiteCard 
                key={website.id} 
                website={website} 
                onDelete={handleDeleteWebsite}
              />
            ))}
            <div className="text-center py-16 bg-white dark:bg-[#0d0d0d] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transition-colors duration-200">
              <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Add your new Websites to monitor</h3>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>Add Your Website</span>
              </button>
            </div>
            </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-[#0d0d0d] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transition-colors duration-200">
            <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No websites added yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Start monitoring your websites by adding your first URL</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your First Website</span>
            </button>
          </div>
        )}
      </main>

      <footer className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800">
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Uptime Monitor © {new Date().getFullYear()} • Checks performed every 3 minutes
        </div>
      </footer>

      <CreateWebsiteModal
        isOpen={isModalOpen}
        onClose={async (url) => {
          if (url === null) {
            setIsModalOpen(false);
            return;
          }

          try {
            setIsLoading(true);
            const token = await getToken();
            setIsModalOpen(false);
            await axios.post(`${API_BACKEND_URL}/api/v1/website`, {
              url,
              userId: "1"
            }, {
              headers: {
                Authorization: token,
              },
            });
            await refreshWebsites();
          } catch (error) {
            console.error('Error adding website:', error);
            alert('Failed to add website');
          } finally {
            setIsLoading(false);
          }
        }}
      />
    </div>
  );
}

export default App;