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
    <div className="w-full bg-[#F8FAFC] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F5B800] block">OUR LATEST ARTICLES</span>
          <h1 className="text-4xl font-extrabold text-[#062544]">Travel & Visa Insights</h1>
          <p className="text-sm font-medium text-slate-600 max-w-xl mx-auto">Stay updated with the latest visa policies, travel tips, and destination guides.</p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all group flex flex-col justify-between">
              <div className="relative h-56 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-[#062544] text-[#F5B800] text-[10px] font-extrabold px-3 py-1 rounded-full">{post.category}</span>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-4 text-xs font-semibold text-slate-400">
                    <span className="flex items-center space-x-1"><Calendar className="w-3.5 h-3.5 text-[#F5B800]" /> <span>{post.date}</span></span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-extrabold text-xl text-[#062544] group-hover:text-[#F5B800] transition-colors">{post.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{post.excerpt}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">By {post.author}</span>
                  <button onClick={() => navigateTo('/visas')} className="text-xs font-extrabold text-[#062544] hover:text-[#F5B800] flex items-center space-x-1">
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
