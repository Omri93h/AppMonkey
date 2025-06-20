import React from 'react'
import ConvertButton from './ConvertButton'
import DownloadLink from './DownloadLink'

export default function FileItem({
  file, status, url, downloadName, onConvert
}) {
  return (
    <div className="flex gap-4 items-center mb-2">
      <span className="truncate flex-1">{file.name}</span>
      <ConvertButton status={status} onClick={() => onConvert(file)} />
      <DownloadLink url={url} filename={downloadName} />
    </div>
  )
}
