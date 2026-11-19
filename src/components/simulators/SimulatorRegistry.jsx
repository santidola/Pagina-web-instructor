/**
 * Open/Closed Principle (OCP) & Liskov Substitution Principle (LSP):
 * Maps simulator keys to interchangeable React components.
 * Adding a new simulator requires only registering it here without altering SessionPanel.
 */
import React from 'react';
import { MobileOsSimulator } from './MobileOsSimulator';
import { EmailBuilderSimulator } from './EmailBuilderSimulator';
import { ExcelBudgetSimulator } from './ExcelBudgetSimulator';
import { PhishingDetectorSimulator } from './PhishingDetectorSimulator';
import { AiPromptLabSimulator } from './AiPromptLabSimulator';

const SIMULATOR_REGISTRY = {
  'mobile-os': MobileOsSimulator,
  'email-builder': EmailBuilderSimulator,
  'excel-budget': ExcelBudgetSimulator,
  'phishing-detector': PhishingDetectorSimulator,
  'ai-prompt-lab': AiPromptLabSimulator
};

export function SessionSimulator({ simulatorKey, session, course }) {
  if (!simulatorKey) return null;
  const SimulatorComponent = SIMULATOR_REGISTRY[simulatorKey];
  if (!SimulatorComponent) return null;

  return <SimulatorComponent session={session} course={course} />;
}
