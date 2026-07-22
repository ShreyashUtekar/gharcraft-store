'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BLOG_POSTS } from '@/data/blogs';
import { Sparkles, ArrowRight, BookOpen, User, Calendar } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="bg-brandBg min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider">
            GharCraft Magazine
          </span>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-dark tracking-tight">
            Organization Guides & Home Hacks
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Practical storage solutions, spice preservation tips, and seasonal wardrobe care advice curated specifically for modern Indian living.
          </p>
        </div>

        {/* Featured Main Article */}
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-soft mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8">
          <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden">
            <Image
              src={BLOG_POSTS[0].image}
              alt={BLOG_POSTS[0].title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-md">
              {BLOG_POSTS[0].category}
            </span>
            <h2 className="font-heading font-bold text-2xl text-dark leading-tight">{BLOG_POSTS[0].title}</h2>
            <p className="text-xs text-gray-600 leading-relaxed font-sans">{BLOG_POSTS[0].excerpt}</p>
            <div className="flex items-center gap-4 text-xs text-gray-400 pt-2">
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {BLOG_POSTS[0].author}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {BLOG_POSTS[0].date}</span>
            </div>
            <Link
              href={`#${BLOG_POSTS[0].id}`}
              className="inline-flex items-center gap-2 text-xs font-heading font-bold text-primary hover:underline pt-2"
            >
              Read Full Feature Story <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Grid of Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} id={post.id} className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-soft p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-brandBg">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                  {post.category}
                </span>
                <h3 className="font-heading font-bold text-lg text-dark leading-snug">{post.title}</h3>
                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed font-sans">{post.content}</p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span>{post.readTime}</span>
                <span className="font-semibold text-primary">{post.author}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
