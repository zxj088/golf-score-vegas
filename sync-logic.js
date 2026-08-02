(function exposeSyncLogic(root) {
  function mergeRoundSnapshots(localRounds, remoteRounds, options = {}) {
    const normalize = options.normalize || (value => value);
    const isDeleted = options.isDeleted || (() => false);
    const limit = Math.max(1, Number(options.limit) || 200);
    const merged = new Map();

    (localRounds || [])
      .map(normalize)
      .filter(round => round?.id && !isDeleted(round))
      .forEach(round => merged.set(round.id, round));
    (remoteRounds || [])
      .map(normalize)
      .filter(round => round?.id && !isDeleted(round))
      .forEach(round => merged.set(round.id, round));

    return Array.from(merged.values())
      .sort((a, b) => Number(b.savedAt || 0) - Number(a.savedAt || 0))
      .slice(0, limit);
  }

  root.SIMPLE_GOLF_SYNC = Object.freeze({ mergeRoundSnapshots });
})(globalThis);
