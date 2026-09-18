# Surface 产品数据模型与 Schema 设计 (Data Model Architecture)

## 1. 实体关系模型概览 (Entity-Relationship Overview)

为了避免未来新增配置时数据库失控，系统采用业界最佳实践 **Product (基准产品) + Variant (具体子型号/配置变体)** 的双层数据架构：

```
[Series (系列)]
   │ 1:N
   ▼
[Product (基准机型)] ──1:N── [AccessoryCompatibility (配件兼容)]
   │ 1:N
   ▼
[Variant (配置变体)]
   │ 1:N
   ▼
[SpecValue (规格值)] ──N:1── [Specification (参数定义)]
   │ 1:1
   ▼
[SourceMeta (溯源元数据)]
```

---

## 2. 核心实体定义 (Entity Definitions)

### 2.1 Product (基准产品实体)
代表某一代核心机型（例如 Surface Pro 13 第 12 代、Surface Laptop 8）：

```typescript
export interface Product {
  id: string;                         // 唯一标识符，如 'pro-12-13'
  seriesId: 'pro' | 'laptop' | 'sls' | 'book' | 'go' | 'laptopgo' | 'studio' | 'duo';
  name: string;                       // 产品名称，如 'Surface Pro 13 英寸 (第 12 代)'
  nameEn: string;                     // 官方英文全称
  generation: string;                 // 代际描述，如 '第 12 代 (2026)'
  releaseYear: number;                // 发布年份 (2026)
  releaseDate: string;                // 发布年月 ('2026-08')
  status: 'current_cn' | 'current_global' | 'upcoming' | 'discontinued' | 'legacy';
  targetAudience: 'consumer' | 'commercial' | 'both';
  tagline: string;                    // 定位口号
  prevGenerationId?: string;          // 上一代机型 ID (用于快速跳转比对)
  nextGenerationId?: string;          // 下一代机型 ID
  chassisMaterial: string;            // 机身材质
  kickstandType: string;              // 铰链与支架类型
  variants: Variant[];                // 该机型包含的具体配置变体
  officialUrl?: string;               // 官方商城/支持文档链接
}
```

### 2.2 Variant (配置变体实体)
处理同一机型下的不同芯片平台、屏幕尺寸或网络版本：

```typescript
export interface Variant {
  id: string;                         // 如 'pro-12-x2-oled-5g'
  productId: string;
  skuName: string;                    // 如 '高通骁龙 X2 Elite 12核 / 32G / 1T / 5G / OLED'
  processorModel: string;             // 'Snapdragon X2 Elite'
  processorArch: 'arm64' | 'x86_64';
  screenSize: number;                 // 13.0
  panelType: 'oled' | 'lcd';
  ramGb: number;                      // 32
  storageGb: number;                  // 1024
  hasCellular: boolean;               // true
  specs: Record<string, SpecValue>;   // 展开的具体规格项集合
}
```

### 2.3 SpecValue (规格取值与未知治理)

```typescript
export type ValueState = 'VALID' | 'NOT_DISCLOSED' | 'NOT_APPLICABLE' | 'NULL';

export interface SpecValue {
  value: any;                         // 实际值，如 58.0、'120Hz'、['亮铂金', '典黑']
  displayValue?: string;              // 格式化文本
  state: ValueState;                  // 状态：有效 / 官方未披露 / 不适用 / 空
  unit?: string;                      // 单位：'Wh', 'TOPS', 'g', 'nits'
  source?: SourceMeta;                // 数据来源溯源
}

export interface SourceMeta {
  sourceType: 'microsoft_official' | 'microsoft_support' | 'microsoft_datasheet' | 'third_party_verified';
  sourceUrl?: string;
  verifiedAt: string;                 // '2026-09-16'
  notes?: string;
}
```

### 2.4 AccessoryCompatibility (双向配件兼容模型)

```typescript
export interface AccessoryCompatibility {
  accessoryId: string;                // 'flex-keyboard'
  accessoryName: string;              // 'Surface Pro Flex 键盘'
  accessoryCategory: 'keyboard' | 'pen' | 'dock' | 'power';
  supportedDeviceIds: string[];       // 该配件支持的全部机型列表
  compatNotes: Record<string, {
    level: 'FULL' | 'PARTIAL' | 'UNSUPPORTED';
    description: string;              // 如 '需通过磁吸连接，不支持离机蓝牙无线输入'
  }>;
}
```

---

## 3. 13 大类参数分组规范 (The 13 Spec Groups)

| 分组 ID | 中文名称 | 包含关键字段 |
| :--- | :--- | :--- |
| `basic` | 基础与外观 | 官方代际、发布时间、在售状态、机身配色、外壳材质、支架开合、系统支持 |
| `processor` | 处理器与 AI | CPU型号、架构、核心线程、GPU浮点、**NPU芯片、NPU算力TOPS、Copilot+ PC认证** |
| `memory_storage`| 内存与存储 | 内存规格/容量、SSD协议、**可快拆SSD设计**、存储扩展槽 |
| `display` | 显示屏 PixelSense | 尺寸、材质、**3:2黄金比例**、分辨率、PPI、刷新率、亮度、杜比视界IQ、触控防眩光 |
| `camera` | 摄像头 | 前置镜头规格、Windows Hello人脸红外、后置镜头、Studio Effects特效 |
| `audio` | 音频声效 | 矩阵麦克风/语音聚焦、扬声器杜比全景声、3.5mm耳机孔 |
| `connectivity` | 接口与网络 | Wi-Fi协议、蓝牙、5G蜂窝网络、NFC、Surface Connect、雷电4/USB4 |
| `power` | 电池与电源 | **额定容量Wh**、日常办公续航、本地视频续航、充电器功率、快充时间 |
| `input` | 输入与手写笔 | MPP协议、**Slim Pen 2纸感触觉震动**、键盘盖支持、触觉触控板 |
| `security` | 安全与企业 | TPM 2.0、Secured-core PC、Pluton处理器、NFC安全密钥、Autopilot/Intune |
| `design` | 工业设计 | 长宽高厚度、**裸机净重**、含键盘整机重量、风道散热设计 |
| `service` | 维修与质保 | **官方易修性设计评分 (iFixit)**、模块化备件供应、官方硬件质保政策 |
| `metadata` | 资料与手册 | 首发价、国行指导价、官方技术规格页、维修指南PDF下载 |
