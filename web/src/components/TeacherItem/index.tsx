import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

const TeacherItem = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars3.githubusercontent.com/u/59920486?s=460&u=a1da5fda61a53ad672112420ac11ac45d3245a48&v=4"
          alt="João Azevedo"
        />

        <div>
          <strong>João Azevedo</strong>
          <span>Química</span>
        </div>
      </header>

      <p>
        Entusiasta das melhores tecnologias de química avançada.
            <br /> <br />
            Apaixonado por explodir coisas em laboratório e por mudar a vida
            das pessoas através de experiências. Mais de 200.000 pessoas já
            passaram por uma das minhas explosões.
          </p>

      <footer>
        <p>
          Preço/hora
              <strong>R$ 70,00</strong>
        </p>

        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp" />
              Entrar em contato
            </button>
      </footer>
    </article>
  )
}

export default TeacherItem