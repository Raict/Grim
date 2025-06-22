export const  getSupportedFontWeightsCanvas = (fontFamily: string = "Arial"): number[] => {
    const testWeights = [100,200,300,400,500,600,700,800,900]
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const fontSize = 32
    const text = "BoldTest"
  
    if (!ctx) return [400, 700]
  
    let prevWidth: number | null = null
    const supported: number[] = []
  
    testWeights.forEach(weight => {
      ctx.font = `${weight} ${fontSize}px ${fontFamily}`
      const width = ctx.measureText(text).width
      if (supported.length === 0 || Math.abs(width - (prevWidth ?? width+1)) > 1) {
        supported.push(weight)
        prevWidth = width
      }
    })
    return supported
}
  



export const getSupportedFontWeights = (fontFamily: string): number[] => {
  return FONT_WEIGHTS[fontFamily] || [400, 700];
}