import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { useEffect, useRef, useState } from 'react'
import { ErrorMessage, Loading } from '../common/ui.tsx'

GlobalWorkerOptions.workerSrc = workerUrl

/** The widest a page is drawn, in pixels: sharp on a 2x screen at the page's ~800px width. */
const MAX_RENDER_WIDTH = 1600

/**
 * Draws every page of a PDF with pdf.js and shows it as an image, so the sheet is part of the
 * page on every device, phones included. Loaded only on a task sheet's page (React.lazy).
 */
export default function PdfPages({ url, title }: { url: string; title: string }) {
  const [pages, setPages] = useState<string[]>([])
  const [total, setTotal] = useState(0)
  const [failed, setFailed] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // As wide as the page shows it on this screen, so a phone draws smaller, faster pictures.
    const shownWidth = containerRef.current?.clientWidth || 800
    const renderWidth = Math.min(
      MAX_RENDER_WIDTH,
      Math.round(shownWidth * Math.min(window.devicePixelRatio || 1, 2)),
    )
    let cancelled = false
    const imageUrls: string[] = []
    const task = getDocument({ url })
    setPages([])
    setTotal(0)
    setFailed(false)

    void (async () => {
      try {
        const pdf = await task.promise
        if (cancelled) return
        setTotal(pdf.numPages)
        for (let number = 1; number <= pdf.numPages && !cancelled; number++) {
          const page = await pdf.getPage(number)
          const viewport = page.getViewport({
            scale: renderWidth / page.getViewport({ scale: 1 }).width,
          })
          const canvas = document.createElement('canvas')
          canvas.width = Math.ceil(viewport.width)
          canvas.height = Math.ceil(viewport.height)
          await page.render({ canvas, viewport }).promise
          // JPEG encodes many times faster than PNG; pdf.js paints the page white, so no transparency.
          const blob = await new Promise<Blob | null>((resolve) =>
            canvas.toBlob(resolve, 'image/jpeg', 0.9),
          )
          canvas.width = 0
          page.cleanup()
          if (!blob || cancelled) return
          const imageUrl = URL.createObjectURL(blob)
          imageUrls.push(imageUrl)
          setPages((list) => [...list, imageUrl])
        }
      } catch {
        if (!cancelled) setFailed(true)
      }
    })()

    return () => {
      cancelled = true
      void task.destroy()
      for (const imageUrl of imageUrls) URL.revokeObjectURL(imageUrl)
    }
  }, [url])

  if (failed) {
    return (
      <ErrorMessage>The task sheet could not be shown here, open the PDF instead.</ErrorMessage>
    )
  }

  return (
    <div ref={containerRef} className="flex flex-col gap-4">
      {pages.map((page, index) => (
        <img
          key={page}
          src={page}
          alt={`${title}, page ${index + 1} of ${total}`}
          className="w-full rounded-sm border border-line/30 bg-white shadow-sm"
        />
      ))}
      {(total === 0 || pages.length < total) && (
        <Loading>
          {total ? `Loading page ${pages.length + 1} of ${total}…` : 'Loading the task sheet…'}
        </Loading>
      )}
    </div>
  )
}
