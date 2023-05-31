import React, { useEffect, useState } from 'react'
import { DownloadText, FileWrapper, Textarea, UserContentsWrapper } from './TextareaAndFile.styled'
import { useFormContext } from 'react-hook-form'
import { TOrderForm } from '../../FormOrder/lib/schema'
import { PreviewFile } from './PreviewFile/PreviewFile'

export const TextareaAndFile = () => {
  const [length, setLength] = useState(0)
  console.log('🚀  length:', length)
  const { watch, register } = useFormContext<TOrderForm>()
  const file = watch('file') as FileList | undefined
  const text = watch('text')

  useEffect(() => {
    if (!file?.length || !file) return
    const currentFile = file[0]

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setLength(content.length)
    }
    reader.readAsText(currentFile)
  }, [file])

  useEffect(() => {
    if (!text) return
    setLength(text.split('\n').join('').trim().length)
  }, [text])

  return (
    <UserContentsWrapper>
      {!file?.length && <Textarea {...register('text')}></Textarea>}
      {!text && (
        <FileWrapper className={length ? 'visually-hidden' : ''}>
          <span>Введіть текст або</span>
          <label>
            {' '}
            <DownloadText>завантажте файл</DownloadText>
            <input type="file" {...register('file')} className="visually-hidden" />
          </label>
        </FileWrapper>
      )}
      {!!file?.length && !!length && (
        <PreviewFile setLength={setLength} file={file[0]} length={length} />
      )}
    </UserContentsWrapper>
  )
}
