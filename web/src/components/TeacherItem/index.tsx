import React, { FC } from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import { TeacherProps } from '../../Interfaces/Teacher'

import './styles.css'

import api from '../../services/api'

interface Teacher {
  teacher: TeacherProps
}

const TeacherItem: FC<Teacher> = ({ teacher }) => {
  function createNewConnection() {
    api.post('/connections', { user_id: teacher.id })
  }

  return (
    <article className="teacher-item">
      <header>
        <img
          src={teacher.avatar}
          alt={teacher.name}
        />

        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <footer>
        <p>Preço/hora <strong>R$ {teacher.cost}</strong></p>

        <a
          onClick={createNewConnection}
          href={`https://wa.me/${teacher.whatsapp}`}
          target="_blank"
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  )
}

export default TeacherItem