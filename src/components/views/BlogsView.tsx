import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BlogsView: React.FC = () => {
  const { navigateTo } = useApp();

  const blogPosts = [
    {
      id: 'post-1',
      title: 'Top 10 E-Visas for Indian Travelers in 2026',
      excerpt: 'Discover the easiest international destinations where Indian passport holders can get instant e-visas online.',
      author: 'Travel Specialist',
      date: '02 Aug 2026',
      readTime: '5 min read',
      category: 'E-Visa',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'post-2',
      title: 'Schengen Visa Documentation Checklist: Step-by-Step Guide',
      excerpt: 'Everything you need to know about bank statements, travel insurance, flight reservations, and cover letters.',
      author: 'Immigration Expert',
      date: '28 Jul 2026',
      readTime: '7 min read',
      category: 'Guides',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'post-3',
      title: 'How to Get Fast-Track Dubai Tourist Visas in 24 Hours',
      excerpt: 'Learn about express 30-day and 60-day Dubai visa processing options without embassy hassle.',
      author: 'UAE Desk Manager',
      date: '15 Jul 2026',
      readTime: '4 min read',
      category: 'Express Visa',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="w-full bg-[#F8FAFC] py-14 relative overflow-hidden min-h-screen pb-24 lg:pb-16">
      {/* Ambient background glow blobs */}
      <div className="ambient-glow-blue top-12 left-1/4 -translate-x-1/2"></div>
      <div className="ambient-glow-sky top-96 right-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-pill text-[#036CFB] text-xs font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#036CFB] animate-pulse"></span>
            <span>OUR LATEST TRAVEL & VISA ARTICLES</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#062544] tracking-tight">
            Travel & Visa <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#036CFB] via-[#0284C7] to-[#38BDF8]">Insights</span>
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-600 max-w-xl mx-auto">Stay updated with the latest visa policies, travel tips, and digital destination guides.</p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="glass-frost glass-card-hover rounded-3xl overflow-hidden border border-white/80 shadow-md hover:shadow-2xl transition-all group flex flex-col justify-between backdrop-blur-xl">
              <div className="relative h-56 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <span className="absolute top-4 left-4 glass-frost-navy text-[#38BDF8] text-[10px] font-extrabold px-3 py-1 rounded-full border border-white/20 shadow-md">{post.category}</span>
              </div>

              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-4 text-xs font-semibold text-slate-400">
                    <span className="flex items-center space-x-1.5"><Calendar className="w-3.5 h-3.5 text-[#036CFB]" /> <span>{post.date}</span></span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-extrabold text-lg sm:text-xl text-[#062544] group-hover:text-[#036CFB] transition-colors leading-snug">{post.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{post.excerpt}</p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">By {post.author}</span>
                  <button onClick={() => navigateTo('/visas')} className="text-xs font-extrabold text-[#036CFB] hover:text-[#062544] flex items-center space-x-1 min-h-[36px]">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
