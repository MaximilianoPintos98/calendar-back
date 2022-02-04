const { response } = require("express");

const Event = require("../models/model-event");

const getEvent = async (req, res = response) => {

  const events = await Event.find().populate('user', 'name')

  res.json({
    ok: true,
    events: events
  });
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);

  try {

    event.user = req.uid;

    const eventSave = await event.save();

    res.json({
      ok: true,
      evento: eventSave
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el admin",
    });
  }
};

const putEvent = async (req, res = response) => {

  const eventId = req.params.id
  const uid = req.uid

  try {
    
    const event = await Event.findById( eventId )

    if ( !event ) {
      return res.status(404).json({
        ok: false,
        msg: 'El evento no existe con ese id'
      })
    }

    if ( event.user.toString() !== uid ) {
      return res.status(401).json({
        ok: false,
        msg: "no tiene los permisos para editar este evento"
      })
    }

    const newEvent = {
      ...req.body,
      user: uid
    }

    const eventPut = await Event.findByIdAndUpdate( eventId, newEvent, { new: true })

    res.json({
      ok: true,
      event: eventPut
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hablar con un admin'
    })
  }
};

const dropEvent = async (req, res = response) => {

  const eventId = req.params.id
  const uid = req.uid

  try {
    
    const event = await Event.findById( eventId )

    if ( !event ) {
      return res.status(404).json({
        ok: false,
        msg: 'El evento no existe con ese id'
      })
    }

    if ( event.user.toString() !== uid ) {
      return res.status(401).json({
        ok: false,
        msg: "no tiene los permisos para editar este evento"
      })
    }

    await Event.findByIdAndDelete( eventId )

    res.json({ ok: true })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hablar con un admin'
    })
  }
};

module.exports = {
  getEvent,
  createEvent,
  putEvent,
  dropEvent,
};
