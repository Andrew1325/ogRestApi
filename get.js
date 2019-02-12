module.exports = ({db, express}) => {
  const routes = express.Router()

  routes.get('/posts', (req, res) => {
      const productQuery = 'SELECT * FROM posts WHERE deleted_at IS NULL'
      db.query(productQuery, (error, results) => {
          if (error) {
            return res.status(500).json({type: 'error', error})
          }
          res.json({type: 'success', message: 'Test OK', results})
      })
  })
  routes.get('/events', (req, res) => {
    // WHERE start_date >= NOW() --add this to query
    const productQuery = 'SELECT * FROM events'
    db.query(productQuery, (error, results) => {
      if (error) {
        return res.status(500).json({type: 'error', error})
      }
      res.json({type: 'success', message: 'Test OK', results})
  })
  routes.get('/registered', (req, res) => {
    const event_id = req.query.eventId
    const user_id = req.query.userId
    let values = [user_id, event_id]
    const productQuery = 'SELECT * FROM registered WHERE user_id = ? AND event_id = ?'
    db.query(productQuery,values, (error, results) => {
      if (error) {
        return res.status(500).json({type: 'error', error})
      }
      res.json({type: 'success', message: 'Got OK', results})
    })
  })
  routes.get('/comments', (req, res) => {
    const id = req.query.id
    const commentQuery = 'SELECT * FROM comments WHERE post_id = ?'
    db.query(commentQuery, id, (error, results) => {
        if (error) {
          return res.status(500).json({type: 'error', error})
        }
        res.json({type: 'success', message: 'Test OK', results})
    })
  })
  routes.get('/replys', (req, res) => {
    const id = req.query.id
    const replyQuery = 'SELECT * FROM replys WHERE reply_post_id = ?'
    db.query(replyQuery, id, (error, results) => {
        if (error) {
          return res.status(500).json({type: 'error', error})
        }
        res.json({type: 'success', message: 'Test OK', results})
    })
  })
  routes.get('/users', (req, res) => {
    const userQuery = 'SELECT * FROM users'
    db.query(userQuery, (error, results) => {
        if (error) {
          return res.status(500).json({type: 'error', error})
        }
        res.json({type: 'success', message: 'Test OK', results})
      })
    })
  })
  return routes
}