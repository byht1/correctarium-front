import React, { Dispatch, FC, SetStateAction } from 'react'
import { AnotherFile, FileName, Length, Wrapper } from './PreviewFile.styled'

type PreviewFileProps = {
  length: number
  file: File
  setLength: Dispatch<SetStateAction<number>>
}

export const PreviewFile: FC<PreviewFileProps> = ({ length, file, setLength }) => {
  const triggerFileInput = () => {
    const inputRef = document.querySelector('input[name="file"]') as HTMLElement
    inputRef.click()
    setLength(0)
  }

  return (
    <Wrapper>
      <FileName>{file?.name || ''}</FileName>
      <Length>Кількість символів: {length}</Length>
      <AnotherFile type="button" onClick={triggerFileInput}>
        завантажити файл
      </AnotherFile>
    </Wrapper>
  )
}
