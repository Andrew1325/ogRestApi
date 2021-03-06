module.exports = ({db, express, bcrypt, jwt, jwtToken}) => {
  const routes = express.Router()
  routes.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    if (!email || !password) return res.status(400).json({type: 'error', message: 'email and password fields are essential for authentication.'})
    db.query('select * from `users` where `email`=?', email, (error, results) => {
      if (error) return res.status(500).json({type: 'error', message: 'db error', error})
      if (results.length == 0) return res.status(403).json({type: 'error', message: 'User with provided email not found in database.'})
      const user = results[0]
      bcrypt.compare(password, user.password, (error, result) => {
        if (error) {
          return res.status(500).json({type: 'error', message: 'bcrypt error', error})
        }
      })
      res.json({
        type: 'success',
        message: 'User logged in.',
        user: {id: user.id, email: user.email, name: user.name, role: user.role},
        token: jwt.sign({id: user.id, email: user.email}, jwtToken)
      })
    })
  })
  routes.post('/register', (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const role = 'user'
    const saltRounds = 10
    const password = bcrypt.hashSync(req.body.password, saltRounds)
    const subscribe = req.body.subscribe
    
    if (!email || !password || !name) return res.status(400).json({type: 'error', message: 'name, email and password fields are essential for registration.'})
    let postRequest = 'INSERT INTO users (`email`, `name`, `role`, `password`, `subscribe`) VALUES (?,?,?,?,?)'
      let values = [email, name, role, password, subscribe]
      db.query(postRequest, values, (error, result) => {
      if (error) return res.status(500).json({type: 'error', message: 'db error', error})
      if (result) {
        res.json({
          type: 'success',
          message: 'User is registered.'
        })
      }
    })
  })
  routes.get('/me', (req, res, next) => {
    const token = req.headers['x-access-token']
      if (!token) return res.status(400).json({type: 'error', message: 'x-access-token header not found.'})
      jwt.verify(token, jwtToken, (error, result) => {
        if (error) return res.status(403).json({type: 'error', message: 'Provided token is invalid.'})
        return res.json({
          type: 'success',
          message: 'Provided token is valid.'
        })
      })
  })
  routes.post('/setadmin', (req, res) => {
    const email = req.body.email
    const role = 'admin'
    if (!email) return res.status(400).json({type: 'error', message: 'email is essential for registration.'})
    let postRequest = 'UPDATE users SET role = ? WHERE email = ?'
      let values = [role, email]
      db.query(postRequest, values, (error, result) => {
      if (error) return res.status(500).json({type: 'error', message: 'db error', error})
      if (result) {
        res.json({
          type: 'success',
          message: 'User is admin.'
        })
      }
    })
  })
  return routes
}