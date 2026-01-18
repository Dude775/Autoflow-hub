'use client';

import { useEffect, useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import WorkflowCard from '@/components/WorkflowCard';
import FilterBar from '@/components/FilterBar';
import { getAllWorkflows, getCategories, Workflow } from '@/lib/api';

export default function CatalogPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [filteredWorkflows, setFilteredWorkflows] = useState<Workflow[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load workflows and categories
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [workflowsData, categoriesData] = await Promise.all([
          getAllWorkflows(),
          getCategories()
        ]);

        setWorkflows(workflowsData);
        setFilteredWorkflows(workflowsData);
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Error loading data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Filter workflows by category and search
  useEffect(() => {
    let filtered = workflows;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(w => w.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(w =>
        w.title.toLowerCase().includes(query) ||
        w.description.toLowerCase().includes(query) ||
        w.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredWorkflows(filtered);
  }, [workflows, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="gradient-bg py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 font-display">
              <span className="gradient-text">Workflows</span> Catalog
            </h1>
            <p className="text-xl text-gray-600">
              Discover hundreds of ready-to-use workflows in every field
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container-custom py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
            <p className="text-gray-600">Loading workflows...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-danger-700 font-medium">{error}</p>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Filters */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                {/* Search */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Search className="w-5 h-5 text-primary-600" />
                    <h3 className="text-lg font-bold text-gray-900">Search</h3>
                  </div>
                  <input
                    type="text"
                    placeholder="Search workflow..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input"
                  />
                </div>

                {/* Filter by category */}
                <FilterBar
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />

                {/* Statistics */}
                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl border border-primary-100 p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Statistics</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total workflows</span>
                      <span className="font-bold text-primary-600">{workflows.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Currently shown</span>
                      <span className="font-bold text-secondary-600">{filteredWorkflows.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              {filteredWorkflows.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-600">
                      Found <span className="font-bold text-gray-900">{filteredWorkflows.length}</span> workflows
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredWorkflows.map((workflow) => (
                      <WorkflowCard key={workflow.id} workflow={workflow} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-20">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 max-w-md mx-auto">
                    <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      No Results Found
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Try changing your search or filter criteria
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        setSearchQuery('');
                      }}
                      className="btn-primary"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}