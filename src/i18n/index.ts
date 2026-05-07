import { zhCN } from './zh-CN';

function resolve(obj: unknown, segments: string[]): string | undefined {
  let cur: unknown = obj;
  for (const key of segments) {
    if (cur === null || typeof cur !== 'object') return undefined;
    cur = (cur as Record<string, unknown>)[key];
  }
  return typeof cur === 'string' ? cur : undefined;
}

/** Dot-path lookup into default zh-CN messages (e.g. `brand.name`). */
export function t(path: string): string {
  const hit = resolve(zhCN, path.split('.'));
  return hit ?? path;
}
