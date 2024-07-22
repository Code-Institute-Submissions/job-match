import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Education, WorkExperience } from '../types/types'

interface ModalProps {
  show: boolean
  onClose: () => void
  onSave: (data: WorkExperience | Education) => void
  data: WorkExperience | Education | any
  type: 'experience' | 'education'
}

const ExperinceModal: React.FC<ModalProps> = ({
  show,
  onClose,
  onSave,
  data,
  type,
}) => {
  const [formData, setFormData] = useState(data)

  useEffect(() => {
    setFormData(data)
  }, [data])

  useEffect(() => {
    console.log('Modal show state:', show)
  }, [show])

  if (!show) return null

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSave = () => {
    onSave(formData)
    onClose()
  }

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContainer onClick={handleModalClick}>
        <FormField>
          <Label>{type === 'experience' ? 'Titel:' : 'Skola:'}</Label>
          <Input
            name={type === 'experience' ? 'occupation_title' : 'school_name'}
            type="text"
            value={
              type === 'experience'
                ? formData.occupation_title
                : formData.school_name || ''
            }
            onChange={handleChange}
          />
        </FormField>
        {type === 'experience' && (
          <FormField>
            <Label>Företag:</Label>
            <Input
              name="company_name"
              type="text"
              value={formData.company_name}
              onChange={handleChange}
            />
          </FormField>
        )}
        <FormField>
          <Label>År:</Label>
          <Input
            name="years"
            type="text"
            value={formData.years}
            onChange={handleChange}
          />
        </FormField>
        {type === 'education' && (
          <>
            <FormField>
              <Label>Nivå:</Label>
              <Input
                name="level"
                type="text"
                value={formData.level}
                onChange={handleChange}
              />
            </FormField>
            <FormField>
              <Label>Inriktning:</Label>
              <Input
                name="orientation"
                type="text"
                value={formData.orientation}
                onChange={handleChange}
              />
            </FormField>
          </>
        )}
        <FormField>
          <Label>Beskrivning:</Label>
          <TextArea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </FormField>
        <Button onClick={handleSave}>Spara</Button>
        <Button onClick={onClose}>Avbryt</Button>
      </ModalContainer>
    </ModalBackdrop>
  )
}

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 80%;
`

const FormField = styled.div`
  margin-bottom: 15px;
`

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const TextArea = styled.textarea`
  width: 90%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  min-height: 100px;
`

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #0056b3;
  }
`

export default ExperinceModal