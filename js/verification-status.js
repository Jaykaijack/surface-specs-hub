/** Auto-generated from docs/full-library-verification-registry.json — do not hand-edit. */
/** GeneratedAt: 2026-09-22T10:05:00+08:00 (Asia/Shanghai) */
/** codes: V=已核验 S=部分可讲/政策禁讲 P=待核验 */
window.VERIFICATION_STATUS = {
  generatedAt: "2026-09-22T10:05:00+08:00",
  canClaimSafe100Percent: false,
  claimNote: "假徽章已移除；pro-12-13 消费专页404；撤销安全100%",
  keyFields: ["screenSize", "resolution", "refreshRate", "touchAndPenProtocol", "cpuModel", "npuTops", "batteryCapacityWh", "startingPriceCny", "officialDocUrl"],
  codes: {"pro-12-13-intel":"V","pro-12-13-snap":"V","pro-12-13":"S","pro-12-inch":"V","pro-11-13":"S","pro-10-biz":"S","pro-9":"S","pro-8":"S","pro-7-plus":"S","pro-7":"S","pro-6":"S","pro-5":"S","pro-4":"S","pro-3":"S","pro-2":"S","pro-1":"S","pro-x":"S","laptop-8-138-intel":"V","laptop-8-138-snap":"V","laptop-8-150-intel":"S","laptop-8-150-snap":"S","laptop-8-138":"S","laptop-8-150":"S","laptop-7-138":"S","laptop-6-biz":"S","laptop-5":"S","laptop-4":"S","laptop-3":"S","laptop-2":"S","laptop-1":"S","sls-2":"S","sls-1":"S","go-4":"S","go-3":"S","laptop-go-3":"S","studio-2-plus":"S","duo-2":"S","book-3-15":"S","book-3-135":"S","book-2-15":"S","book-1":"S","go-2":"S","go-1":"S","laptop-go-2":"S","laptop-go-1":"S","studio-2":"S","studio-1":"S","hub-2s":"S","duo-1":"S","pro-12-inch-biz":"V","laptop-13-inch-biz":"S","pro-11-biz-snap":"S","pro-11-biz-intel":"S","laptop-7-biz-snap":"S","laptop-7-biz-intel":"V","hub-3":"S","laptop-go-3-biz":"S","pro-9-biz":"S","pro-8-biz":"S","laptop-5-biz":"S","sls-2-biz":"S","sls-1-biz":"S","go-3-biz":"S","studio-2-plus-biz":"S"},
  meta: {
    V: { status: "verified", label: "已核验", tone: "ok" },
    S: { status: "policy_partial", label: "部分可讲/政策禁讲", tone: "policy" },
    P: { status: "pending", label: "待核验", tone: "warn" }
  },
  resolve(deviceId) {
    const code = (this.codes && this.codes[deviceId]) || "P";
    const m = this.meta[code] || this.meta.P;
    return { ...m, code, reason: code === "P" && !this.codes[deviceId] ? "缺 registry" : "" };
  }
};
