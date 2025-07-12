import type { Component } from '..';

// Basic position component
export interface AbsolutePositionComponentOptions {
    x: number;
    y: number;
}
export interface AbsolutePositionComponent extends Component, AbsolutePositionComponentOptions {
    readonly type: 'absolute-position';
}

// Factory functions to create components with default values
export function createAbsolutePositionComponent(
    options: AbsolutePositionComponentOptions
): AbsolutePositionComponent {
    const { x, y } = options;
    return { 
        type: 'absolute-position',
        x,
        y
    };
}

export interface ResponsivePositionComponentOptions {
    xFloat: 'right' | 'center' | 'left',
    yFloat: 'top' | 'center' | 'bottom',
    xOffset: number,
    yOffset: number,
}

// Basic position component
export interface ResponsivePositionComponent extends Component, ResponsivePositionComponentOptions {
    readonly type: 'responsive-position';
}

// Factory functions to create components with default values
export function createResponsivePositionComponent(
    options: ResponsivePositionComponentOptions
): ResponsivePositionComponent {
    const { xFloat, yFloat, xOffset, yOffset } = options;
    return { 
        type: 'responsive-position',
        xFloat,
        yFloat,
        xOffset,
        yOffset,
    };
}