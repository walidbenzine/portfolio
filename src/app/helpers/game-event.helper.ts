import { GameEventMap } from "../maps/game-events.map";

export function onGameEvent<K extends keyof GameEventMap>(
  type: K,
  handler: (event: CustomEvent<GameEventMap[K]>) => void
) {
  window.addEventListener(type as string, handler as EventListener);
}

export function emitGameEvent<K extends keyof GameEventMap>(
  type: K,
  detail: GameEventMap[K]): void {
  window.dispatchEvent(
    new CustomEvent(type as string, { detail })
  );
}

export function removeGameEventListener<K extends keyof GameEventMap>(
  type: K,
  handler: (event: CustomEvent<GameEventMap[K]>) => void
): void {
  window.removeEventListener(type as string, handler as EventListener);
}