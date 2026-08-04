export const weddingTabRoutes = {
  home: "/",
  us: "/nosotros",
  day: "/ese-dia",
  rsvp: "/rsvp",
  location: "/ubicacion",
  gifts: "/mesa-de-regalos",
  closing: "/cierre",
} as const;

export type WeddingTabId = keyof typeof weddingTabRoutes;

export const weddingRoutePaths = Object.values(weddingTabRoutes);

export function getWeddingTabId(pathname: string): WeddingTabId | null {
  const normalizedPathname = pathname.replace(/\/+$/, "") || "/";

  for (const tabId of Object.keys(weddingTabRoutes) as WeddingTabId[]) {
    if (weddingTabRoutes[tabId] === normalizedPathname) return tabId;
  }

  return null;
}

export function getWeddingTabPath(tabId: string): string | null {
  if (!(tabId in weddingTabRoutes)) return null;
  return weddingTabRoutes[tabId as WeddingTabId];
}
