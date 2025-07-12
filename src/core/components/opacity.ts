import type { Component } from '..';

// Basic position component
export interface OpacityComponentOptions {
    opacity: number;
}
export interface OpacityComponent extends Component, OpacityComponentOptions {
    readonly type: 'opacity';
}
// Factory functions to create components with default values
export function createOpacityComponent(
    options: OpacityComponentOptions
): OpacityComponent {
    const { opacity } = options;
    return { 
        type: 'opacity',
        opacity
    };
}