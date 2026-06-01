/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ScreenState = 'SPLASH' | 'DASHBOARD';

export interface Stage {
  id: string;
  number: number;
  title: string;
  description: string;
  unlockPercent: number;
  isUnlocked: boolean;
  concept: string;
  themeColor: string; // Tailwind class coloring
  glowColor: string;  // Glow shadow coloring
  iconName: 'grid' | 'palette' | 'triangle' | 'scissors' | 'layout';
}
