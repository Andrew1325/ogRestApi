module.exports = ({db, express}) => {
  const routes = express.Router()

  routes.post('/event', (req, res) => {
    const title = req.body.title
    const subtitle = req.body.subtitle
    const description = req.body.description
    const image_url = req.body.image_url
    const start_date = req.body.start_date
    const end_date = req.body.end_date
    const time = req.body.time
    const price = req.body.price
    const id = req.body.id
    let values = [title, subtitle, description, image_url, start_date, end_date, time, price, id]
    console.log(values)
    if ( !title || !subtitle || !description || !image_url || !start_date) {
      return res.status(400).json({type: 'error', message: 'All fields must be completed'})
    }
    let postRequest = 'UPDATE events SET title = ?, subtitle = ?, description = ?, image_url = ?, start_date = ?, end_date = ?, time = ?, price = ? WHERE id = ?'
    
    db.query(postRequest, values, (error, result) => {
      if (result) {
        console.log(result);
        res.json({type: 'success', message: 'Test OK', result})
      } else {
        return res.status(500).json({type: 'error', message: 'DB error', error})
      }      
    })
  })

  routes.post('/post', (req, res) => {
    const title = req.body.title
    const preview = req.body.preview
    const content = req.body.content
    const titleImage = req.body.titleImage
    const id = req.body.id
    let values = [title, preview, content, titleImage, id]
    console.log(values)
    if ( !title || !preview || !content || !titleImage || !id) {
      return res.status(400).json({type: 'error', message: 'All fields must be completed'})
    }
    let postRequest = 'UPDATE posts SET title = ?, preview = ?, content = ?, title_image = ?, edited_at = CURRENT_TIMESTAMP WHERE id = ?'
    
    db.query(postRequest, values, (error, result) => {
      if (result) {
        console.log(result);
        res.json({type: 'success', message: 'Test OK', result})
      } else {
        console.log(error);
        return res.status(500).json({type: 'error', message: 'DB error', error})
      }      
    })
  })

  return routes
}