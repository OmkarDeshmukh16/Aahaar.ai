'use client'

import React, { Component, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

/**
 * Error boundary for the WebGL canvas.
 * On failure, renders a styled gradient fallback hero so the page
 * degrades to a 2D experience rather than breaking entirely.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[Aahaar AI] Canvas error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            className="fixed inset-0 z-0"
            style={{
              background:
                'radial-gradient(ellipse at center, #0c0c0f 0%, #09090b 70%, #050507 100%)',
            }}
          >
            {/* Subtle animated gradient orbs for visual interest */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute w-[600px] h-[600px] rounded-full opacity-[0.05] blur-[120px]"
                style={{
                  background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)',
                  top: '20%',
                  left: '30%',
                }}
              />
              <div
                className="absolute w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px]"
                style={{
                  background: 'radial-gradient(circle, #10b981 0%, transparent 70%)',
                  bottom: '20%',
                  right: '20%',
                }}
              />
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
