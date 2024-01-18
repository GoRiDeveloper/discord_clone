'use client';

import { Component, ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
    fallback: ReactNode;
    children: ReactNode;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
    state = { hasError: false, error: '' };

    constructor(props: Readonly<ErrorBoundaryProps>) {
        super(props);
        this.state = { hasError: false, error: '' };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: ErrorInfo): void {
        console.error(error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}
