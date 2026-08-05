(function exposeRoundAccess(globalObject) {
  function hasEditRight(round, clientId, now = Date.now()) {
    const lock = round?.totals?.editLock;
    return Boolean(
      lock &&
      String(lock.owner || '') === String(clientId || '')
    );
  }

  function openDestination(round, status, clientId, now = Date.now()) {
    const canEdit = status === 'playing' && hasEditRight(round, clientId, now);
    return {
      canEdit,
      view: canEdit ? 'play' : 'leaderboard'
    };
  }

  function canShareScorecard(round, status) {
    return Boolean(round && status !== 'playing');
  }

  globalObject.SIMPLE_GOLF_ROUND_ACCESS = { hasEditRight, openDestination, canShareScorecard };
})(typeof window === 'undefined' ? globalThis : window);
