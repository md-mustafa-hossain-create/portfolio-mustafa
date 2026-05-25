import { Component } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

/**
 * @fileoverview React Error Boundary component to catch JavaScript errors anywhere
 * in the child component tree, log those errors, and display a fallback UI.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service here
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 selection:bg-brand-500/20 crt-screen crt-flicker">
          <div className="max-w-md w-full bg-zinc-900/40 backdrop-blur-lg border border-white/10 rounded-[2rem] p-8 text-center shadow-2xl relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl rounded-full"></div>
            
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            
            <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
              Oops! System Error
            </h1>
            <p className="text-sm text-zinc-400 mb-8 font-mono leading-relaxed">
              A critical error occurred in the application interface. The issue has been logged.
            </p>
            
            <button
              onClick={this.handleReload}
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-brand-500 text-white font-medium hover:bg-brand-600 transition-colors shadow-[0_0_20px_rgba(var(--brand-500-rgb),0.3)]"
            >
              <RefreshCcw className="w-4 h-4" />
              Reboot System
            </button>
            
            {/* Optional: Show brief error message in dev or for debugging */}
            {import.meta.env.DEV && this.state.error && (
              <div className="mt-6 text-left bg-zinc-950/80 rounded-lg p-4 border border-red-500/20 overflow-auto max-h-32 text-xs font-mono text-red-400">
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

export default ErrorBoundary;
