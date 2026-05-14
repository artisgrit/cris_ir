import { getInfoModulePath } from '../app-routing-paths';

export const END_USER_AGREEMENT_PATH = 'end-user-agreement';
export const PRIVACY_PATH = 'privacy';
export const FEEDBACK_PATH = 'feedback';
export const COAR_NOTIFY_SUPPORT = 'coar-notify-support';
export const ACCESSIBILITY_SETTINGS_PATH = 'accessibility';
export const HOW_TO_DEPOSIT_PATH = 'how-to-deposit';
export const DATA_REUSE_PATH = 'data-reuse';
export const GOVERNANCE_POLICIES_PATH = 'governance-policies';

export function getEndUserAgreementPath() {
  return getSubPath(END_USER_AGREEMENT_PATH);
}

export function getPrivacyPath() {
  return getSubPath(PRIVACY_PATH);
}

export function getFeedbackPath() {
  return getSubPath(FEEDBACK_PATH);
}

export function getCOARNotifySupportPath(): string {
  return getSubPath(COAR_NOTIFY_SUPPORT);
}

export function getAccessibilitySettingsPath() {
  return getSubPath(ACCESSIBILITY_SETTINGS_PATH);
}

export function getHowToDepositPath() {
  return getSubPath(HOW_TO_DEPOSIT_PATH);
}

export function getDataReusePath() {
  return getSubPath(DATA_REUSE_PATH);
}

export function getGovernancePoliciesPath() {
  return getSubPath(GOVERNANCE_POLICIES_PATH);
}

function getSubPath(path: string) {
  return `${getInfoModulePath()}/${path}`;
}
