import React, { useState, FormEvent } from 'react'

import PageHeader from '../../components/PageHeader'
import TeacherItem from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'

import './styles.css'

import api from '../../services/api'

import { TeacherProps } from '../../Interfaces/Teacher'

function TeacherList() {
  const [ subject, setSubject  ] = useState('')
  const [ week_day, setWeekDay ] = useState("")
  const [ time, setTime ] = useState("")

  const [teachers, setTeachers] = useState<TeacherProps[]>([])

  async function searchTeachers(event: FormEvent) {
    event.preventDefault()

    const data = {
      subject,
      week_day,
      time
    }

    const res = await api.get('/classes', { params: data })

    setTeachers(res.data)
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader
        title="Estes são os proffys disponíveis."
      >
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Máteria"
            value={subject}
            changeState={setSubject}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Educação Física', label: 'Educação Física' },
              { value: 'Física', label: 'Física' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'História', label: 'História' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Português', label: 'Português' },
              { value: 'Química', label: 'Química' }
            ]}
          />

          <Select
            name="week_day"
            label="Dia da Semana"
            value={week_day}
            changeState={setWeekDay}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />

          <Input type="time" name="time" label="Hora" value={time} changeState={setTime} />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {
          teachers.map(teacher => {
            return <TeacherItem key={teacher.id} teacher={teacher} />
          })
        }
      </main>
    </div>
  )
}

export default TeacherList