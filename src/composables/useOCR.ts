import Tesseract from 'tesseract.js'

export const useOCR = () => {
  const recognizer = (imageUrl: Tesseract.ImageLike, options?: Partial<Tesseract.WorkerOptions>) => {
    return Tesseract.recognize(imageUrl, 'jpn', options)
  }

  return recognizer
}
