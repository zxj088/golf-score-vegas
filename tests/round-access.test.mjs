import assert from 'node:assert/strict';
import test from 'node:test';

await import('../round-access.js');

const { hasEditRight, openDestination, canShareScorecard } = globalThis.SIMPLE_GOLF_ROUND_ACCESS;
const now = 10_000;
const roundWithLock = (owner, expiresAt) => ({ totals: { editLock: { owner, expiresAt } } });

test('live lock owned by this phone opens Play with edit rights', () => {
  const result = openDestination(roundWithLock('phone-a', now + 1), 'playing', 'phone-a', now);
  assert.deepEqual(result, { canEdit: true, view: 'play' });
});

test('another phone, expired lock and missing lock open read-only Leaderboard', () => {
  assert.equal(openDestination(roundWithLock('phone-b', now + 1), 'playing', 'phone-a', now).view, 'leaderboard');
  assert.equal(openDestination(roundWithLock('phone-a', now), 'playing', 'phone-a', now).view, 'leaderboard');
  assert.equal(openDestination({}, 'playing', 'phone-a', now).view, 'leaderboard');
});

test('finished rounds are always read-only even if a stale lock remains', () => {
  const round = roundWithLock('phone-a', now + 1_000);
  assert.equal(hasEditRight(round, 'phone-a', now), true);
  assert.deepEqual(openDestination(round, 'history', 'phone-a', now), { canEdit: false, view: 'leaderboard' });
});

test('only completed rounds offer a final scorecard share action', () => {
  assert.equal(canShareScorecard({ id: 'round-1' }, 'history'), true);
  assert.equal(canShareScorecard({ id: 'round-1' }, 'playing'), false);
  assert.equal(canShareScorecard(null, 'history'), false);
});
