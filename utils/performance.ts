import { InteractionManager } from 'react-native';
import React from 'react';

interface PerformanceMetrics {
  componentName: string;
  renderTime: number;
  timestamp: number;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics[] = [];
  private isEnabled: boolean = __DEV__;

  private constructor() {}

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startMeasure(componentName: string): () => void {
    if (!this.isEnabled) return () => {};

    const startTime = performance.now();
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      this.metrics.push({
        componentName,
        renderTime,
        timestamp: Date.now(),
      });

      if (renderTime > 16) { // Frame budget of 16ms (60fps)
        console.warn(
          `Performance warning: ${componentName} took ${renderTime.toFixed(2)}ms to render`
        );
      }
    };
  }

  getMetrics(): PerformanceMetrics[] {
    return this.metrics;
  }

  clearMetrics(): void {
    this.metrics = [];
  }

  enable(): void {
    this.isEnabled = true;
  }

  disable(): void {
    this.isEnabled = false;
  }
}

export const withPerformanceTracking = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string
): React.FC<P> => {
  return function PerformanceTrackedComponent(props: P) {
    const monitor = PerformanceMonitor.getInstance();
    const endMeasure = monitor.startMeasure(componentName);

    React.useEffect(() => {
      InteractionManager.runAfterInteractions(() => {
        endMeasure();
      });
    });

    return React.createElement(WrappedComponent, props);
  };
};

export const performanceMonitor = PerformanceMonitor.getInstance(); 