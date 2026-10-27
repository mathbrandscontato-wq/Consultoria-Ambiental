// Motion ranges from Daiwiik Harihar's Perspective Tunnel Hero, supplied by the owner.
export const clamp = (value, min=0, max=1) => Math.max(min, Math.min(max, value));
export function interpolate(value, stops, values) {
  if (value <= stops[0]) return values[0];
  for (let i=1;i<stops.length;i++) if (value <= stops[i]) {
    const t=(value-stops[i-1])/(stops[i]-stops[i-1]);
    return values[i-1]+t*(values[i]-values[i-1]);
  }
  return values.at(-1);
}
export function cardState(progress,index,total,mobile=false) {
  const start=index/total*.45;
  const local=clamp((progress-start)/.55);
  return {
    z:interpolate(local,[0,1],mobile?[-1200,350]:[-1700,500]),
    opacity:interpolate(local,[0,.18,.82,.98],[0,1,1,0]),
    angle:index*137.5*Math.PI/180,
    radiusX:.28+(index%3)*.08,
    radiusY:.26+(index%2)*.09,
    rotation:(index%2===0?1:-1)*(3+(index%5)*2)
  };
}
export const titleState = progress => ({
  scale:interpolate(progress,[0,.5,1],[.7,1,1.35]),
  opacity:interpolate(progress,[0,.12,.85,1],[.25,1,1,0])
});
