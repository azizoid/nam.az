export const DMath = {
  dtr: (d: number) => (d * Math.PI) / 180.0,
  rtd: (r: number) => (r * 180.0) / Math.PI,

  sin: (d: number) => Math.sin((d * Math.PI) / 180.0),
  cos: (d: number) => Math.cos((d * Math.PI) / 180.0),
  tan: (d: number) => Math.tan((d * Math.PI) / 180.0),

  arcsin: (d: number) => (Math.asin(d) * 180.0) / Math.PI,
  arccos: (d: number) => (Math.acos(d) * 180.0) / Math.PI,
  arctan: (d: number) => (Math.atan(d) * 180.0) / Math.PI,

  arccot: (x: number) => (Math.atan(1 / x) * 180.0) / Math.PI,
  arctan2: (y: number, x: number) => (Math.atan2(y, x) * 180.0) / Math.PI,

  fixAngle: (a: number) => DMath.fix(a, 360),
  fixHour: (a: number) => DMath.fix(a, 24),

  fix: (a: number, b: number) => {
    a = a - b * Math.floor(a / b)
    return a < 0 ? a + b : a
  }
}