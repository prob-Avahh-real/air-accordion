# 空气手风琴 (Air Accordion)

手势驱动虚拟手风琴。手机倾斜推拉风箱，触摸低音/旋律键；支持智能戒指与手杖。

## 目标平台

| 平台 | 方式 | 产出 |
|------|------|------|
| 🤖 Android | Capacitor → Gradle | APK |
| 📱 手机浏览器 | 单文件 HTML | 调试/试玩 |
| ⌚ 手表 | 窄屏 CSS | 同 APK |
| 💍 智能戒指 | DeviceOrientation | 选音 / 延音 |
| 🦯 智能手杖 | DeviceMotion | 触键 / 风箱·八度 |

## 技术栈

- Web Audio API 簧片合成（失谐锯齿 + 滤波 + 颤音）
- DeviceOrientation / DeviceMotion
- Capacitor Android 包装 (`com.skat.airaccordion`)

## Harness / Loop（助手）

- 遵循根 `/Users/skat/AGENTS.md`：**Harness Engineering** + **Loop Engineering**
- Guide = 本文件；Sensor = 下方验证命令；同类失误第二次须沉淀规则或测试（棘轮）
- 开干前写清 **Done**；每切片过验证环；显式停止（成功 / 上限 / 无进展 / 人审）
- 详解：`docs/HARNESS_ENGINEERING.md`、`docs/LOOP_ENGINEERING.md`

## 验证环 / Done

```bash
npm install
npm test          # 若有
npm run build     # 或 build:web
npx cap sync android   # 若有 android/
# 可选：JAVA_HOME=…/openjdk@17 npm run apk:debug
```

**Done 示例**：测试通过（若有）+ web 产物进 `www/`/`dist/` + `cap sync` 无报错。可选穿戴未做可搁置，不纳入强制 Done。
