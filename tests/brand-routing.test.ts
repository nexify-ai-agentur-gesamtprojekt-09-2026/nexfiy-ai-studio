import { test } from 'node:test';
import assert from 'node:assert/strict';
import { legacyTeileklarRedirect, LEGACY_TEILEKLAR_PATHS } from '../src/lib/brand-routing.ts';

test('NeXify public domain redirects all legacy TEILEKLAR links to the separate shop brand', () => {
  for (const host of ['nexifyai.de', 'www.nexifyai.de']) {
    for (const [legacy, destination] of Object.entries(LEGACY_TEILEKLAR_PATHS)) {
      assert.equal(legacyTeileklarRedirect(`https://${host}${legacy}`), `https://teileklar.shop${destination}`);
      assert.equal(legacyTeileklarRedirect(`https://${host}${legacy}/`), `https://teileklar.shop${destination}`);
    }
    assert.equal(legacyTeileklarRedirect(`https://${host}/teileklar`), 'https://teileklar.shop/');
    assert.equal(legacyTeileklarRedirect(`https://${host}/teileklar/unbekannt`), 'https://teileklar.shop/');
  }
});

test('cross-tenant redirects drop all query strings including potentially personal data', () => {
  assert.equal(legacyTeileklarRedirect('https://www.nexifyai.de/teileklar/suche?q=bremsen&email=person%40beispiel.de'), 'https://teileklar.shop/shop');
});

test('never reroute other domains, private .cloud domains, or POST to the shop', () => {
  for (const src of [
    'https://www.nexifyai.cloud/teileklar',
    'https://teilklar.shop/teileklar',
    'https://www.nexifyai.de.evil.test/teileklar',
    'https://www.nexifyai.de/portale',
    'invalid',
    'http://www.nexifyai.de/teileklar',
  ]) assert.equal(legacyTeileklarRedirect(src), null);
  assert.equal(legacyTeileklarRedirect('https://www.nexifyai.de/teileklar/kasse','POST'), null);
  assert.equal(legacyTeileklarRedirect('https://www.nexifyai.de/teileklar/kasse','HEAD'), 'https://teileklar.shop/shop');
});
