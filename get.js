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
})
  return routes
}