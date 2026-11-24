const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

/** Mirrors index.html updateBellowsAudio AND-gate */
function bellowsGainTarget(bellows, dead = 0.12) {
  const absB = Math.abs(bellows);
  if (absB <= dead) return 0.0001;
  const mag = Math.min(1, (absB - dead) / (1 - dead));
  return 0.08 + mag * 0.55;
}

describe('air-accordion bellows gate', () => {
  it('silences reeds inside deadzone (including zero)', () => {
    assert.equal(bellowsGainTarget(0), 0.0001);
    assert.equal(bellowsGainTarget(0.1), 0.0001);
    assert.equal(bellowsGainTarget(-0.11), 0.0001);
  });

  it('opens air past deadzone with rising gain', () => {
    const a = bellowsGainTarget(0.3);
    const b = bellowsGainTarget(0.8);
    assert.ok(a > 0.08);
    assert.ok(b > a);
    assert.ok(bellowsGainTarget(1) <= 0.08 + 0.55 + 1e-9);
  });

  it('treats push and pull symmetrically', () => {
    assert.equal(bellowsGainTarget(0.5), bellowsGainTarget(-0.5));
  });
});

describe('air-accordion protocol', () => {
  const protocol = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'protocol', 'air-accordion.json'), 'utf8')
  );

  it('declares bellows AND-gate model', () => {
    assert.equal(protocol.model.idle_auto_sway, false);
    assert.equal(protocol.model.bellows_deadzone, 0.12);
    assert.match(protocol.model.bellows, /deadzone|AND/i);
  });

  it('maps ring/cane/phone gestures', () => {
    assert.equal(protocol.gestures.phone.tilt_gamma.action, 'bellows');
    assert.equal(protocol.gestures.ring.shake.action, 'toggle_sustain');
    assert.equal(protocol.gestures.cane.tap.action, 'attack_selected');
    assert.equal(protocol.gestures.cane.swing.threshold, 3);
    assert.equal(protocol.gestures.ring.tilt.threshold_deg, 5);
  });

  it('lists bass and melody sets', () => {
    assert.equal(protocol.bass_ids.length, 8);
    assert.equal(protocol.melody_labels.length, 12);
    assert.ok(protocol.bass_ids.includes('G7'));
  });
});

describe('air-accordion HTML core', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

  it('includes brand and watch media query', () => {
    assert.match(html, /空气手风琴/);
    assert.match(html, /max-width:\s*280px/);
    assert.match(html, /max-height:\s*300px/);
  });

  it('implements bellows gate without idle auto-sway', () => {
    assert.match(html, /dead\s*=\s*0\.12/);
    assert.match(html, /No idle auto-sway/);
    assert.match(html, /bellowsGain\.gain\.value = 0\.0001/);
    assert.doesNotMatch(html, /gentle idle bellows sway/);
  });

  it('wires ring and cane handlers', () => {
    assert.match(html, /DeviceOrientationEvent/);
    assert.match(html, /DeviceMotionEvent/);
    assert.match(html, /handlePhoneOri/);
    assert.match(html, /handleCane/);
  });

  it('keeps www/ in sync with index.html', () => {
    const www = fs.readFileSync(path.join(__dirname, '..', 'www', 'index.html'), 'utf8');
    assert.equal(www, html);
  });
});
