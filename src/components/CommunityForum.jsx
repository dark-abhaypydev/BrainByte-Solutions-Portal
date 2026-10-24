import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  ThumbsUp, 
  Send, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Tag, 
  Search,
  Filter
} from 'lucide-react';
import { COMMUNITY_POSTS } from '../data/portalData';

export default function CommunityForum({ user }) {
  const [posts, setPosts] = useState(COMMUNITY_POSTS);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [activeFilterTab, setActiveFilterTab] = useState('All');

  const tags = ['All', 'Machine Learning', 'Deep Learning', 'Python', 'Milestone', 'GenAI'];

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPostObj = {
      id: `post-${Date.now()}`,
      author: {
        name: user.name,
        role: user.role,
        avatar: user.avatar
      },
      title: newTitle,
      content: newContent,
      tag: selectedTag === 'All' ? 'Machine Learning' : selectedTag,
      timestamp: 'Just now',
      upvotes: 1,
      commentsCount: 0,
      hasInstructorAnswer: false
    };

    setPosts([newPostObj, ...posts]);
    setNewTitle('');
    setNewContent('');
  };

  const handleUpvote = (postId) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p));
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* Header Section matching screenshot */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30 flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            COMMUNITY & PEER DISCUSSIONS
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Community
        </h1>
        <p className="text-sm text-slate-400">
          Ask questions, share ideas and learn together with fellow AI practitioners.
        </p>
      </div>

      {/* Post Composer matching screenshot */}
      <div className="p-5 rounded-2xl bg-[#0d1628]/95 border border-blue-500/30 shadow-neon-blue space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Ask or Share with Community</span>
        </h3>

        <form onSubmit={handleCreatePost} className="space-y-3">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Post Title: e.g. How to fine-tune Llama-3 with LoRA weights?"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#070b16] border border-[#1e335a] focus:border-blue-500 text-xs sm:text-sm text-white focus:outline-none"
          />

          <textarea
            rows={3}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Describe your issue, share code snippet or milestone..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#070b16] border border-[#1e335a] focus:border-blue-500 text-xs text-white focus:outline-none leading-relaxed"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400">Tag:</span>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-[#070b16] border border-[#1e335a] text-xs text-blue-300 focus:outline-none"
              >
                {tags.filter(t => t !== 'All').map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="px-6 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-neon-blue flex items-center gap-1.5 transition-all"
            >
              <span>Post Question</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>

      {/* Filter Tabs matching screenshot: All, My Posts, Mentions */}
      <div className="flex items-center justify-between gap-4 border-b border-[#1a2b4c] pb-3">
        <div className="flex items-center gap-2">
          {['All', 'My Posts', 'Mentions'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilterTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeFilterTab === tab
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-2.5 py-1 rounded-md text-[11px] whitespace-nowrap transition-colors ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white bg-slate-800/40'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Community Feed matching screenshot */}
      <div className="space-y-4">
        {posts
          .filter(p => selectedTag === 'All' || p.tag === selectedTag)
          .map((post) => (
            <div
              key={post.id}
              className="p-5 rounded-2xl bg-[#0d1628]/95 border border-[#1a2b4c] hover:border-blue-500/40 transition-all space-y-3"
            >
              {/* Author & Tag */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full object-cover border border-slate-700" />
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">{post.author.name}</p>
                    <p className="text-[10px] text-slate-400 leading-tight">{post.author.role} • {post.timestamp}</p>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  #{post.tag}
                </span>
              </div>

              {/* Title & Body */}
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">{post.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">{post.content}</p>
              </div>

              {/* Instructor Verified Answer Box (if present) */}
              {post.hasInstructorAnswer && post.instructorReply && (
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-950/60 via-[#0e1c38] to-cyan-950/40 border border-blue-500/40 space-y-2">
                  <div className="flex items-center gap-2">
                    <img src={post.instructorReply.avatar} alt="Dr. Sharma" className="w-6 h-6 rounded-full border border-amber-400 object-cover" />
                    <span className="text-xs font-bold text-amber-300">{post.instructorReply.author}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono border border-amber-500/40">
                      Instructor Verified Answer
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed pl-8">
                    {post.instructorReply.content}
                  </p>
                </div>
              )}

              {/* Upvotes & Comments Bar */}
              <div className="pt-2 border-t border-[#1e335a] flex items-center justify-between text-xs text-slate-400">
                <button
                  onClick={() => handleUpvote(post.id)}
                  className="px-3 py-1.5 rounded-lg bg-[#070b16] hover:bg-blue-600/20 text-blue-300 border border-[#1e335a] flex items-center gap-1.5 transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{post.upvotes} Upvotes</span>
                </button>

                <div className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  <span>{post.commentsCount} replies</span>
                </div>
              </div>

            </div>
          ))}
      </div>

    </div>
  );
}
