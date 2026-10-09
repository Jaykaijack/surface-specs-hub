/** Historical device-level badges cannot certify changed or unbound values. */
const VERIFICATION_STATUS = {
  generatedAt: '2026-10-09',
  canClaimSafe100Percent: false,
  claimNote: '来源链接与结构检查不等于逐字段真实性核验',
  resolve() {
    return {code:'P',status:'pending',label:'待核验',tone:'warn',reason:'旧核验未绑定当前值；请以具体地区与配置的原始证据为准'};
  }
};
if (typeof window !== 'undefined') window.VERIFICATION_STATUS = VERIFICATION_STATUS;
if (typeof module !== 'undefined') module.exports = VERIFICATION_STATUS;
