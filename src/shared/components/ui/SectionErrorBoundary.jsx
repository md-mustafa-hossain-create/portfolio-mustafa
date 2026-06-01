import { Component } from 'react';
import PropTypes from 'prop-types';
import { AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * @fileoverview SectionErrorBoundary limits the impact of JavaScript errors
 * to individual page sections rather than crashing the entire application.
 */

export default class SectionErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Set flag to render fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log failures locally for debugging
    console.error(`Error caught by section boundary [${this.props.sectionName || 'Unnamed Section'}]:`, error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full py-12 px-4 flex flex-col items-center justify-center">
          <div className="w-full max-w-xl glass border border-red-500/20 bg-red-500/5 rounded-3xl p-8 text-center relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 blur-2xl rounded-full"></div>
            
            <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>

            <h3 className="text-lg font-bold text-white mb-2">
              Failed to load {this.props.sectionName || 'this section'}
            </h3>
            
            <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-6 leading-relaxed">
              An error occurred while rendering this module. You can try refreshing the section.
            </p>

            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-medium text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Try Again
            </button>

            {import.meta.env.DEV && this.state.error && (
              <div className="mt-4 text-left bg-zinc-950/80 rounded-xl p-3 border border-red-500/15 overflow-auto max-h-24 text-[10px] font-mono text-red-400/90 leading-tight">
                {this.state.error.toString()}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

SectionErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  sectionName: PropTypes.string,
  onRetry: PropTypes.func,
};
