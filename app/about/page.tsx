'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Heart, CheckCircle2, ShieldCheck, Award, ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function AboutPage() {
  const { siteContent } = useStore();

  return (
    <div className="bg-brandBg min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Brand Mission Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider">
            Our Brand Philosophy
          </span>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-dark tracking-tight">
            Crafting Better Homes For Modern India
          </h1>
          <p className="text-gray-600 text-base leading-relaxed font-sans">
            GharCraft was born out of a simple observation: standard imported home organization products were never built for the realities of Indian living.
          </p>
        </div>

        {/* Story Grid */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-soft grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-heading font-bold text-2xl text-dark">Why We Built GharCraft</h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
              Indian kitchens are culinary powerhouses filled with aromatic spices, heavy brass kadais, and bulk grains. Indian wardrobes hold delicate silk sarees, zari embroidery, and heavy winter quilts.
            </p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
              Generic clear plastic tubs warp under heat and stain permanently from turmeric. We engineered lead-free borosilicate glass with silicone bamboo seals, anodized space aluminum, and modular bamboo cutlery dividers that accommodate rolling pins (belan) and chimta tongs effortlessy.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div>
                <strong className="font-heading font-bold text-2xl text-primary block">100,000+</strong>
                <span className="text-xs text-gray-500">Indian Homes Organized</span>
              </div>
              <div>
                <strong className="font-heading font-bold text-2xl text-accent block">19,000+</strong>
                <span className="text-xs text-gray-500">Pincodes Delivered</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white">
            <Image
              src={siteContent.aboutImg}
              alt="GharCraft Design Studio"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Quality Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-dark">Scandinavian Aesthetics</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Clean lines, warm organic bamboo textures, and luxury white space inspired by Nordic minimalism.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-dark">Non-Toxic & BPA-Free</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Safe for food storage, baby utensils, and long-term grain preservation through all weather seasons.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-700">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-dark">Crafted For Happiness</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every organized shelf brings peace of mind and reduces morning clutter stress for working families.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
