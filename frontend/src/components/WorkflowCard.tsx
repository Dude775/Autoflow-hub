'use client';

import Link from 'next/link';
import { ArrowLeft, Download, Star, Tag } from 'lucide-react';
import { Workflow } from '@/lib/api';

interface WorkflowCardProps {
  workflow: Workflow;
}

export default function WorkflowCard({ workflow }: WorkflowCardProps) {
  return (
    <div className="card group hover:scale-[1.02] transition-all duration-300 overflow-hidden">
      {/* Header with Gradient or Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 overflow-hidden">
        {/* If image exists, display it */}
        {workflow.image_url ? (
          <img
            src={workflow.image_url}
            alt={workflow.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            {/* Background effect */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl" />
            </div>

            {/* Header content */}
            <div className="relative h-full flex items-center justify-center p-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Tag className="w-8 h-8 text-white" />
                </div>
                <p className="text-white/90 text-sm font-medium">
                  {workflow.category}
                </p>
              </div>
            </div>
          </>
        )}

        {/* Price badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <p className="text-primary-600 font-bold text-lg">
              ₪{workflow.price.toFixed(0)}
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="absolute bottom-4 right-4 flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <Download className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">
              {workflow.downloads}
            </span>
          </div>
          <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <span className="text-white text-sm font-medium">
              {workflow.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
          {workflow.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {workflow.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {workflow.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="badge-primary text-xs"
            >
              {tag}
            </span>
          ))}
          {workflow.tags.length > 3 && (
            <span className="badge bg-gray-100 text-gray-600 text-xs">
              +{workflow.tags.length - 3}
            </span>
          )}
        </div>

        {/* Button */}
        <Link
          href={`/workflow/${workflow.id}`}
          className="flex items-center justify-center gap-2 w-full btn-primary group-hover:shadow-xl"
        >
          <span>View Details</span>
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
        </Link>
      </div>

      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    </div>
  );
}