import { Request, Response } from 'express'

import connection from '../database/connection'
import convertHourToMinute from '../utils/convertHourToMinutes'

interface ScheduleItem {
  week_day: number
  from: string
  to: string
}

class ClassesController {
  async index(req: Request, res: Response) {
    const filters = req.query

    if(!filters.week_day || !filters.subject || !filters.time) {
      return res.status(400).json({
        error: "Missing filters to search classes"
      })
    }

    const timeInMinutes = convertHourToMinute(String(filters.time));

    const classes = await connection('classes')
      .whereExists(function() {
        this.from('class_schedule')
          .select('class_schedule.*')
          .whereRaw('`class_schedule`.`classes_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(filters.week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
      })
      .where('classes.subject', String(filters.subject))
      .join('users', 'users.id', '=', 'classes.user_id')

    return res.json(classes)
  }

  async store(req: Request, res: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = req.body
  
    const trx = await connection.transaction()
  
    try {
      const [user_id] = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio
      })
  
      const [classes_id] = await trx("classes").insert({
        subject,
        cost,
        user_id
      })
  
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          classes_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinute(scheduleItem.from),
          to: convertHourToMinute(scheduleItem.to)
        };
      })
  
      await trx('class_schedule').insert(classSchedule)
      
      await trx.commit()
      
      return res.status(201).send()
    } catch (e) {
      await trx.rollback()
  
      return res.status(400).json({ 
        error: "Unexpected error while creating new class!"
      })
    }
  }
}

export default ClassesController