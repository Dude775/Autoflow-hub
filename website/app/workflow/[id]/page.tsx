'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Workflow {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  demo_url?: string | null;
  download_url?: string | null;
  tags: string[];
  workflow_json?: string | null;
  image_url?: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function WorkflowPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params?.id);

  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id || Number.isNaN(id)) {
      setError('Invalid workflow ID');
      setLoading(false);
      return;
    }

    const fetchWorkflow = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/workflows/${id}`);
        if (!res.ok) {
          throw new Error('Error loading workflow');
        }
        const data = await res.json();
        const wf: Workflow = {
          ...data.data,
          tags: data.data.tags || [],
        };
        setWorkflow(wf);
      } catch (err: any) {
        setError(err.message || 'Error loading workflow');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflow();
  }, [id]);

  const handleCopyJson = async () => {
    if (!workflow?.workflow_json) {
      setError('No JSON found for this workflow');
      return;
    }

    try {
      await navigator.clipboard.writeText(workflow.workflow_json);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy JSON to clipboard');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading workflow...</p>
      </div>
    );
  }

  if (error || !workflow) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="mb-4 text-red-600 font-semibold">
          {error || 'Workflow not found'}
        </p>
        <button
          onClick={() => router.push('/catalog')}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Back to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back button */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => router.push('/catalog')}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800"
          >
            ← Back to Catalog
          </button>
          <span className="text-sm text-gray-500">
            Category: <span className="font-medium">{workflow.category}</span>
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 grid gap-6 lg:grid-cols-[2fr,1fr]">
        {/* Workflow details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          {/* Workflow image */}
          {workflow.image_url && (
            <div className="mb-6 rounded-xl overflow-hidden shadow-md">
              <img
                src={workflow.image_url}
                alt={workflow.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <h1 className="text-2xl font-bold mb-3 text-gray-900">
            {workflow.title}
          </h1>
          <p className="text-gray-700 mb-4 leading-7">{workflow.description}</p>

          {workflow.tags && workflow.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {workflow.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {workflow.demo_url && (
            <a
              href={workflow.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 underline"
            >
              View Demo
            </a>
          )}
        </div>

        {/* Action card */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-1">Price</p>
            <p className="text-2xl font-bold text-emerald-600 mb-4">Free</p>

            <button
              onClick={handleCopyJson}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
            >
              Copy Workflow JSON
            </button>

            {copied && (
              <p className="mt-2 text-sm text-emerald-600">
                JSON copied to clipboard! You can paste it directly into N8N.
              </p>
            )}

            {workflow.download_url && (
              <a
                href={workflow.download_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-sm text-gray-600 underline"
              >
                Or download JSON file
              </a>
            )}
          </div>

          {workflow.workflow_json && (
            <div className="bg-gray-900 text-gray-100 rounded-2xl p-4 text-xs overflow-hidden">
              <p className="mb-2 text-gray-400">JSON preview:</p>
              <pre className="whitespace-pre-wrap break-all max-h-64 overflow-auto">
                {workflow.workflow_json.slice(0, 500)}…
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
