# 空气手风琴 · Air Accordion

Gesture-driven virtual accordion for **phone** and **smart hardware** (watch / ring / cane). Not a pure webpage product — Capacitor Android APK is the mobile deliverable; single-file HTML is the playable core.

---

## 怎么玩 / How to play

### 手机 · Phone
1. Open `index.html` in a mobile browser, or install the debug APK.
2. Tap **开始演奏** (Start).
3. Tap **启用动作传感器** on iOS (or the 💍/🦯 chips) to allow motion.
4. **Tilt** the phone left/right (γ) to push/pull the bellows — volume & reed character follow.
5. **Left pad** = bass chords (C / F / G / Am / …). **Right pad** = melody (C major + accidentals).
6. Drag the accordion body on desktop to simulate bellows.

### 智能硬件 · Smart hardware
| Device | Sensor | Action |
|--------|--------|--------|
| **Smart ring** 💍 | `DeviceOrientation` | Tilt > 5° → select melody note; shake > 20° → sustain toggle. Throttled ~8 frames. |
| **Smart cane** 🦯 | `DeviceMotion` | Accel spike > 8 → attack selected note; swing > 3 → bellows; strong swing → octave. Throttled ~6 frames. |
| **Watch** | CSS | `@media (max-width: 280px), (max-height: 300px)` compact UI. |

### 键盘 · Keyboard (desktop)
| Keys | Action |
|------|--------|
| `1`–`8` | Melody C–C5 |
| `Q` `W` `E` `R` | C# D# F# G# |
| `Z` `X` `C` `V` `A` `S` `D` `F` | Bass chords |
| `←` `→` | Bellows pull / push |
| `↑` `↓` | Octave |
| `Space` | Sustain toggle |

---

## 项目结构 / Layout

```
air-accordion/
  index.html              # playable core
  www/index.html          # Capacitor web root
  android/                # Capacitor Android (com.skat.airaccordion)
  package.json
  capacitor.config.json
  build.sh                # sync + assembleDebug
  scripts/build-web.js
  README.md
```

---

## 构建 APK / Build APK

```bash
cd /Users/skat/Projects/active/air-accordion
npm install
cp index.html www/index.html
node scripts/build-web.js          # also copies into android assets
npx cap sync android               # optional if node_modules ready
cd android && ./gradlew assembleDebug
```

Or:

```bash
chmod +x build.sh && ./build.sh
```

APK output:

`android/app/build/outputs/apk/debug/app-debug.apk`

**Requirements:** JDK 17, Android SDK (`ANDROID_HOME`, typically `~/Library/Android/sdk`).  
After HTML edits, always re-copy to `www/index.html` and `android/app/src/main/assets/public/index.html` before rebuilding.

---

## 传感器提示 / Sensor tips

- iOS Safari requires a **user gesture** before `DeviceOrientationEvent.requestPermission()` / `DeviceMotionEvent.requestPermission()`.
- Android Chrome usually exposes orientation/motion without a permission prompt (HTTPS or local Capacitor WebView).
- Ring & cane share the phone’s IMU when testing; on real wearables, map the same thresholds in your bridge layer.

---

## App id

- Application ID: `com.skat.airaccordion`
- App name: 空气手风琴 / Air Accordion
