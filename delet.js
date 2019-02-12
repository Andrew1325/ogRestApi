module.exports = ({db, express}) => {
  const routes = express.Router()

  routes.post('/post', (req, res) => {
    const id = req.body.id
    let deleteRequest = 'UPDATE `posts` SET `deleted_at` = CURRENT_TIMESTAMP WHERE `id` =?'
    db.query(deleteRequest, id, (error, result) => {
      if (result) {
        console.log("1 record deleted, ID: " + id);
        res.json({type: 'success', message: 'Test OK', result})
      } else {
        return res.status(500).json({type: 'error', message: 'DB error', error})
      }     
    })
  })
  routes.post('/foreverPost', (req, res) => {
      const id = req.body.id
      console.log(req.body)
      let deleteRequest = 'DELETE FROM `posts` WHERE `id` =?'
      db.query(deleteRequest, id, (error, result) => {
          if (result) {
          console.log("1 record deleted, ID: " + id);
          res.json({type: 'success', message: 'Test OK', result})
          } else {
          return res.status(500).json({type: 'error', message: 'DB error', error})
          }     
      })
  })
  routes.post('/comment', (req, res) => {
    const id = req.body.id
    let deleteRequest = 'DELETE FROM `comments` WHERE `id` =?'
    db.query(deleteRequest, id, (error, result) => {
      if (result) {
        console.log("1 record deleted, ID: " + id);
        res.json({type: 'success', message: 'Test OK', result})
      } else {
        return res.status(500).json({type: 'error', message: 'DB error', error})
      }     
    })
  })
  routes.post('/reply', (req, res) => {
    const id = req.body.id
    let deleteRequest = 'DELETE FROM `replys` WHERE `id` =?'
    db.query(deleteRequest, id, (error, result) => {
      if (result) {
        console.log("1 record deleted, ID: " + id);
        res.json({type: 'success', message: 'Test OK', result})
      } else {
        return res.status(500).json({type: 'error', message: 'DB error', error})
      }     
    })
  })
  routes.post('/event', (req, res) => {
    const id = req.body.id
    let values = [id]
    let deleteRequest = 'DELETE FROM events WHERE id = ?'
    console.log(values)
    db.query(deleteRequest, values, (error, result) => {
      if (result) {
        console.log("1 record deleted, ID: " + id);
        res.json({type: 'success', message: 'Test OK', result})
      } else {
        console.log(error) 
        return res.status(500).json({type: 'error', message: 'DB error', error})
      }     
    })
  })

  return routes
}
