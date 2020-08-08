import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css'

import api from '../../services/api'

function TeacherForm() {
  const history = useHistory()

  const initialSchedule = { week_day: 0, from: '', to: '' }
  const [scheduleItems, setScheduleItems] = useState([initialSchedule])

  const [name, setName] = useState("")
  const [avatar, setAvatar] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [bio, setBio] = useState("")

  const [subject, setSubject] = useState("")
  const [cost, setCost] = useState(0)

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, initialSchedule])
  }

  function setScheduleItemsValues(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if(index === position) {
        return { ...scheduleItem, [field]: value }
      }

      return scheduleItem
    })

    setScheduleItems(updatedScheduleItems)
  }

  async function handleCreateClass(event: FormEvent) {
    event.preventDefault()

    const data = {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule: scheduleItems
    }

    await api.post('/classes', data)
      .then(() => alert('Cadastro feito com sucesso'))
      .catch(() => alert('Erro no cadastro!'))

    history.push("/")
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input name="name" label="Nome Completo" changeState={setName} />

            <Input name="avatar" label="Avatar" changeState={setAvatar} />
            <Input name="whatsapp" label="Whatsapp" changeState={setWhatsapp} />
            <Textarea name="bio" label="Biografia" changeState={setBio} />
          </fieldset>

          <fieldset>
            <legend>Sobre Aula</legend>

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
            <Input name="cost" label="Custo da sua hora por aula" changeState={setCost} />
          </fieldset>

          <fieldset>
            <legend>
              Horários Disponíveis
            <button type="button" onClick={addNewScheduleItem}>+ Novo Horário</button>
            </legend>

            {
              scheduleItems.map((scheduleItem, index) => {
                return (
                  <div key={index} className="schedule-item">
                    <Select
                      name="week_day"
                      label="Dia da Semana"
                      value={scheduleItem.week_day}
                      onChange={(e) => setScheduleItemsValues(index, 'week_day', e.target.value)}
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

                    <Input
                      name="from"
                      label="Das"
                      type="time"
                      value={scheduleItem.from}
                      onChange={(e) => setScheduleItemsValues(index, 'from', e.target.value)}
                    />

                    <Input
                      name="to"
                      label="Até"
                      type="time"
                      value={scheduleItem.to}
                      onChange={(e) => setScheduleItemsValues(index, 'to', e.target.value)}
                    />
                  </div>
                )
              })
            }
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso Importante" />
              Importante! <br />
              Preencha todos os Dados!
            </p>

            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm