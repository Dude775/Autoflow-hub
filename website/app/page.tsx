import Link from 'next/link';
import { ArrowLeft, Zap, Shield, TrendingUp, Sparkles, CheckCircle2, BarChart3, Mail, MessageCircle, Clock, ArrowRight } from 'lucide-react';

// Blog posts data
const blogPosts = [
  {
    icon: BarChart3,
    title: "How to Automate SAP Business One Sales Reporting",
    description: "Step-by-step guide to extracting sales data, processing with AI, and generating automated reports via Telegram. Reduce manual work by 20+ hours/week.",
    tags: ["SAP B1", "n8n", "AI", "Real-Workflow"],
    readTime: "8 min read",
    href: "/blog/sap-automation",
    buttonText: "Read Guide"
  },
  {
    icon: Mail,
    title: "Building an AI-Powered Email Management System",
    description: "Real case study: 31-node workflow that classifies 2,000+ emails daily with 99.7% accuracy using Claude AI and LangChain. Complete architecture breakdown.",
    tags: ["Email", "AI", "LangChain", "Production"],
    readTime: "12 min read",
    href: "/blog/email-ai-system",
    buttonText: "View Case Study"
  },
  {
    icon: MessageCircle,
    title: "Multi-Modal WhatsApp Automation with AI Agents",
    description: "Learn how to build conversational AI agents that handle text, voice, and images. Includes GPT integration and long-term memory patterns.",
    tags: ["WhatsApp", "AI Agent", "Multi-Modal"],
    readTime: "10 min read",
    href: "/blog/whatsapp-ai-agent",
    buttonText: "Explore Tutorial"
  }
];

export default async function HomePage() {

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative gradient-bg py-20 md:py-32">
        {/* Decorative effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-secondary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">
                The Leading Hub for N8N Workflows
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 animate-slide-up font-display leading-tight">
              Transform Your Business
              <br />
              <span className="gradient-text">Into a Smart Automation</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up delay-200">
              Discover hundreds of ready-to-use workflows with N8N. Save time, boost efficiency, and focus on what really matters.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up delay-300">
              <Link
                href="/catalog"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center gap-2 group"
              >
                <span>Discover Workflows</span>
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              </Link>

              <a
                href="#features"
                className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center"
              >
                Learn More
              </a>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-gray-600 animate-fade-in delay-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success-600" />
                <span>200+ workflows</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success-600" />
                <span>5,000+ downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success-600" />
                <span>4.8/5 rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Why AutoFlow Hub?</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              The most advanced platform for acquiring and implementing ready-made workflows
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card p-8 text-center group hover:shadow-xl transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Fast Implementation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Download a workflow and start working within minutes. All templates are tested and ready for immediate use.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card p-8 text-center group hover:shadow-xl transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Guaranteed Reliability
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Every workflow undergoes rigorous quality checks. Get full support and ongoing updates.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card p-8 text-center group hover:shadow-xl transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Proven ROI
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Save dozens of work hours every month. One-time investment with long-term returns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-20 gradient-bg">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Latest Insights & Guides</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Learn automation best practices and real-world implementation strategies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {blogPosts.map((post, index) => {
              const IconComponent = post.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                >
                  <div className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl mb-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={post.href}
                      className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
                    >
                      <span>{post.buttonText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              href="/catalog"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 group"
            >
              <span>View Workflow Catalog</span>
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
            Ready to Get Started?
          </h2>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto">
            Join thousands of users already using AutoFlow Hub to accelerate their business
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-xl hover:shadow-2xl group"
          >
            <span>Start Now</span>
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </section>

      {/* Creator Attribution Section */}
      <section className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 py-16">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">About the Creator</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Built by David Rubin - Technical Lead & AI Infrastructure Architect.
            These workflows represent production systems generating ₪150K+ revenue.
          </p>
          <a href="https://system-portfolio.vercel.app"
             className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block">
            View Full Portfolio →
          </a>
        </div>
      </section>
    </div>
  );
}