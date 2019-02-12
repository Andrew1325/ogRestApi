var stripe = require("stripe")("sk_test_kZ4dbv9DavYUiTNXPGJTS3LA")
const nodemailer = require('nodemailer')
module.exports = ({db, express}) => {
    const routes = express.Router()
  
      routes.post('/post', (req, res) => {
        const user = JSON.parse(req.headers['user-details'])
        const content = req.body.content
        const title = req.body.title
        const category = req.body.category
        const preview = req.body.preview
        const title_image = req.body.titleImage
        const user_id = user.id
        if (!title || !category || !preview || !title_image || !content) {
          return res.status(400).json({type: 'error', message: 'All fields must be completed'})
        }
        
        let postRequest = 'INSERT INTO posts (`title`, `category`, `preview`, `content`, `title_image`, user_id) VALUES (?,?,?,?,?,?)'
        let values = [title, category, preview, content, title_image, user_id]
        console.log(values)
        db.query(postRequest, values, (error, result) => {
          if (result) {
            console.log(result);
            res.json({type: 'success', message: 'Test OK', result})
          } else {
            console.log(error)
            return res.status(500).json({type: 'error', message: 'DB error', error})
          }      
        })
      })
      routes.post('/comment', (req, res) => {
        const content = req.body.content
        const post_id = req.body.post_id
        const user_id = req.body.user_id
        if (!post_id || !user_id || !content) {
          return res.status(400).json({type: 'error', message: 'All fields must be completed'})
        }

        
        let postRequest = 'INSERT INTO comments (`post_id`, `user_id`, `content`) VALUES (?,?,?)'
        let values = [post_id, user_id, content]
        db.query(postRequest, values, (error, result) => {
          if (result) {
            console.log(result);
            res.json({type: 'success', message: 'Test OK', result})
          } else {
            return res.status(500).json({type: 'error', message: 'DB error', error})
          }      
        })
      })
      routes.post('/reply', (req, res) => {
        const content = req.body.reply_content
        const post_id = req.body.reply_post_id
        const user_id = req.body.reply_user_id
        const comment_id = req.body.comment_id
        if (!post_id || !user_id || !content) {
          return res.status(400).json({type: 'error', message: 'All fields must be completed'})
        }

        
        let postRequest = 'INSERT INTO replys (`reply_post_id`, `comment_id`, `reply_user_id`, `reply_content`) VALUES (?,?,?,?)'
        let values = [post_id, comment_id,  user_id, content]
        db.query(postRequest, values, (error, result) => {
          if (result) {
            console.log(result);
            res.json({type: 'success', message: 'Test OK', result})
          } else {
            return res.status(500).json({type: 'error', message: 'DB error', error})
          }      
        })
      })
      routes.post('/register', (req, res) => {
        console.log(req.body)
        const name = req.body.name
        const email = req.body.email
        const eventName = req.body.eventName
        const startDate = req.body.startDate
        const endDate = req.bodyendDate
        const time = req.body.time
        const event_id = req.body.eventId
        const user_id = req.body.id

        if (!event_id || !user_id) {
          return res.status(400).json({type: 'error', message: 'All fields must be completed'})
        }
        let postRequest = 'INSERT INTO registered (`event_id`, `user_id`, `user_name`, `user_email`) VALUES (?,?,?,?)'
        let values = [event_id, user_id, name, email]
        db.query(postRequest, values, (error, result) => {
          if (result) {
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            let start = new Date(startDate).toLocaleDateString('en-EN', options)
            let end = new Date(endDate).toLocaleDateString('en-EN', options)
            let duration = endDate === null ? ' on '+start+' at '+time : ' from '+start+' to '+end
            const body = 'This email is confirming your registration for '+eventName+' which will be held'+duration+'. This will be a wonderful event and we look forward to seeing you there. Should you have any questions please email us at admin@ordinarygoddesses.com.au or through our facebook page. We will contact you again closer to the date with further information relating to the event. We thank you for your registration.'
            const heading = 'You have been registered'

            const transporter = nodemailer.createTransport({
              sendmail: true,
              newline: 'unix',
              path: '/usr/sbin/sendmail'
            })
            transporter.sendMail({
                from: 'noreply@ordinarygoddesses.com.au',
                to: email,
                subject: heading,
                html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/><title>Automatic Email</title><meta name="viewport" content="width=device-width, initial-scale=1.0"/><style media="screen">@font-face {font-family: `Hind`;font-style: normal;font-weight: 400;src: local(`Hind Regular`), local(`Hind-Regular`),url(https://fonts.gstatic.com/s/hind/v8/5aU69_a8oxmIdGl4BDGwgDI.woff2) format(`woff2`);unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}</style></head><body style="margin:0; padding:10px 0 0 0;" bgcolor="#F8F8F8"><table align="center" border="0" cellpadding="0" cellspacing="0" width="95%%"><tr><td align="center"><table align="center" border="0" cellpadding="0" cellspacing="0" width="600"style="font-family: `Hind`, serif; border-collapse: separate; border-spacing: 0px; box-shadow: 1px 0 1px 1px #B8B8B8;"bgcolor="FFFFFF"><tr><td align="center" style="padding: 5px 5px 5px 5px; background-color:#00C9A7"><a href="http://www.ordinarygoddesses.com.au" target="_blank"><img src="http://www.ordinarygoddesses.com.au/logo.svg" alt="Logo" style="width:244px;border:0;"/></a></td></tr><tr><td align="center" style="padding: 5px 5px 5px 5px; background-color:#777777; color: #FFFFFF"><h3>'+heading+'</h3></td></tr><tr><td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px; color: #842EC2"><table border="0" cellpadding="0" cellspacing="0" width="100%%"><tr><td style="padding: 10px 0 10px 0; font-family: Avenir, sans-serif; font-size: 16px;"><p>Dear '+name+',</p><p>'+body+'</p></td></tr></table></td></tr><tr><td bgcolor="#E8E8E8"><table border="0" cellpadding="0" cellspacing="0" width="100%%" style="padding: 20px 10px 10px 10px;"><tr><td width="260" valign="top" style="padding: 0 0 15px 0;"><table border="0" cellpadding="0" cellspacing="0" width="100%%"><tr><td align="center"><a href="http://www.ordinarygoddesses.com.au/blog" target="_blank"><img src="http://www.ordinarygoddesses.com.au/book.svg" height="80px" alt="Blog Page" style="display: block;"/></a></td></tr><tr><td align="center" style="color:#707070;font-size: 13px;padding: 10px 0 0 0;">See the latest from our blog</td></tr></table></td><td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td><td width="260" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%%" ><tr><td align="center"><a href="http://www.ordinarygoddesses.com.au/shop"><img src="http://www.ordinarygoddesses.com.au/gift.svg"  height="80px" alt="Shop Page" style="display:block;"/></a></td></tr><tr><td align="center" style="font-family: Avenir, sans-serif; color:#707070;font-size: 13px;padding: 10px 0 0 0;">Visit our store</td></tr></table></td><td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td><td width="260" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center"><a href="http://www.ordinarygoddesses.com.au/events" target="_blank"><img src="http://www.ordinarygoddesses.com.au/calendar.svg" height="80px" alt="Events Page" style="display: block;"/></a></td></tr><tr><td align="center" style="font-family: Avenir, sans-serif; color:#707070;font-size: 13px;padding: 10px 0 0 0;">Check out our upcoming events</td></tr></table></td></tr></table></td></tr><tr><td bgcolor="#00C9A7" style="padding: 15px 15px 15px 15px;"><table border="0" cellpadding="0" cellspacing="0" width="100%%"><tr><td align="center"><table border="0" cellpadding="0" cellspacing="0"><tr><td><a href="https://www.facebook.com/groups/ordinarygoddesses/" target="_blank"><img src="http://www.ordinarygoddesses.com.au/facebook.svg" alt="Facebook" width="40" height="40" style="display: block;" border="0"/></a></td><td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td><td><a href="https://www.instagram.com/ordinarygoddesses/" target="_blank"><img src="http://www.ordinarygoddesses.com.au/instagram.svg" alt="Instagram" width="40" height="40" style="display: block;" border="0"/></a></td><td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td><td><a href="http://www.ordinarygoddesses.com.au" target="_blank"><img src="http://www.ordinarygoddesses.com.au/desktop.svg" alt="Website" width="40" height="40" style="display: block;" border="0"/></a></td></tr></table></td></tr><tr><td height="20"></td></tr><tr><td align="center" style="font-size:10pt; color: #DDDDDD">Icons by&nbsp;<a style="border:0px;" href="https://fontawesome.com/license/free" target="_blank"><img src="http://www.ordinarygoddesses.com.au/font-awesome.svg" alt="Font Awesome" width="14" height="14" style="display: inline-block;" border="0"/></a></td></tr></table></td></tr></table></td></tr></table></body></html>'
            })
            
            res.json({type: 'success', message: 'Test OK', result})
          } else {
            return res.status(500).json({type: 'error', message: 'DB error', error})
          }      
        })
      })
      routes.post('/event', (req, res) => {
        const user_id = req.body.user_id
        const title = req.body.title
        const subtitle = req.body.subtitle
        const description = req.body.description
        const image_url = req.body.image_url
        const start_date = req.body.start_date
        const end_date = req.body.end_date
        const time = req.body.time
        const price = req.body.price
        if ( !user_id || !title || !subtitle || !description || !image_url || !start_date) {
          return res.status(400).json({type: 'error', message: 'All fields must be completed'})
        }

        
        let postRequest = 'INSERT INTO events (`user_id`, `title`, `subtitle`, `description`, `image_url`, `start_date`, `end_date`, `time`, `price`) VALUES (?,?,?,?,?,?,?,?,?)'
        let values = [user_id, title, subtitle, description, image_url, start_date, end_date, time, price]
        db.query(postRequest, values, (error, result) => {
          if (result) {
            console.log(result);
            res.json({type: 'success', message: 'Test OK', result})
          } else {
            return res.status(500).json({type: 'error', message: 'DB error', error})
          }      
        })
      })
      routes.post('/order', (req, res) => {
        const event = JSON.parse(req.headers['event-booking'])
        const donation = event.donation
        const price = event.price
        const pay = (donation + price)*100

        const token = req.body.id
        let id = null
        if (event.id) {
          id = event.id
        }
        const name = event.name
        const email = event.email
        const event_id = event.eventId
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let start = new Date(event.startDate).toLocaleDateString('en-EN', options)
        let end = new Date(event.endDate).toLocaleDateString('en-EN', options)
        let duration = event.endDate === null ? ' on '+start+' at '+event.time : ' from '+start+' to '+end
        const body = 'This email is confirming your registration for '+event.eventName+' which will be held'+duration+'. This will be a wonderful event and we look forward to seeing you there. Should you have any questions please email us at admin@ordinarygoddesses.com.au or through our facebook page. We will contact you again closer to the date with further information relating to the event. We have received payment of $'+pay/100+' from you today. We thank you for your payment.'
        const heading = 'You have been registered'

        const charge = stripe.charges.create({
          amount: pay,
          currency: 'aud',
          description: 'Event Donation',
          source: token,
        })

        let postRequest = 'INSERT INTO registered (`event_id`, `user_id`, `user_name`, `user_email`, `donation`, `payment`) VALUES (?,?,?,?,?,?)'
        let values = [event_id, id, name, email, donation, price]
        db.query(postRequest, values, (error, result) => {
          if (result) {
            const transporter = nodemailer.createTransport({
              sendmail: true,
              newline: 'unix',
              path: '/usr/sbin/sendmail'
            })
            transporter.sendMail({
                from: 'noreply@ordinarygoddesses.com.au',
                to: email,
                subject: heading,
                html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/><title>Automatic Email</title><meta name="viewport" content="width=device-width, initial-scale=1.0"/><style media="screen">@font-face {font-family: `Hind`;font-style: normal;font-weight: 400;src: local(`Hind Regular`), local(`Hind-Regular`),url(https://fonts.gstatic.com/s/hind/v8/5aU69_a8oxmIdGl4BDGwgDI.woff2) format(`woff2`);unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}</style></head><body style="margin:0; padding:10px 0 0 0;" bgcolor="#F8F8F8"><table align="center" border="0" cellpadding="0" cellspacing="0" width="95%%"><tr><td align="center"><table align="center" border="0" cellpadding="0" cellspacing="0" width="600"style="font-family: `Hind`, serif; border-collapse: separate; border-spacing: 0px; box-shadow: 1px 0 1px 1px #B8B8B8;"bgcolor="FFFFFF"><tr><td align="center" style="padding: 5px 5px 5px 5px; background-color:#00C9A7"><a href="http://www.ordinarygoddesses.com.au" target="_blank"><img src="http://www.ordinarygoddesses.com.au/img/logo3.svg" alt="Logo" style="width:244px;border:0;"/></a></td></tr><tr><td align="center" style="padding: 5px 5px 5px 5px; background-color:#777777; color: #FFFFFF"><h3>'+heading+'</h3></td></tr><tr><td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px; color: #842EC2"><table border="0" cellpadding="0" cellspacing="0" width="100%%"><tr><td style="padding: 10px 0 10px 0; font-family: Avenir, sans-serif; font-size: 16px;"><p>Dear '+name+',</p><p>'+body+'</p></td></tr></table></td></tr><tr><td bgcolor="#E8E8E8"><table border="0" cellpadding="0" cellspacing="0" width="100%%" style="padding: 20px 10px 10px 10px;"><tr><td width="260" valign="top" style="padding: 0 0 15px 0;"><table border="0" cellpadding="0" cellspacing="0" width="100%%"><tr><td align="center"><a href="http://www.ordinarygoddesses.com.au/blog" target="_blank"><img src="http://www.ordinarygoddesses.com.au/img/book.svg" height="80px" alt="Blog Page" style="display: block;"/></a></td></tr><tr><td align="center" style="color:#707070;font-size: 13px;padding: 10px 0 0 0;">See the latest from our blog</td></tr></table></td><td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td><td width="260" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%%" ><tr><td align="center"><a href="http://www.ordinarygoddesses.com.au/shop"><img src="http://www.ordinarygoddesses.com.au/img/gift.svg"  height="80px" alt="Shop Page" style="display:block;"/></a></td></tr><tr><td align="center" style="font-family: Avenir, sans-serif; color:#707070;font-size: 13px;padding: 10px 0 0 0;">Visit our store</td></tr></table></td><td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td><td width="260" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center"><a href="http://www.ordinarygoddesses.com.au/events" target="_blank"><img src="http://www.ordinarygoddesses.com.au/img/calendar.svg" height="80px" alt="Events Page" style="display: block;"/></a></td></tr><tr><td align="center" style="font-family: Avenir, sans-serif; color:#707070;font-size: 13px;padding: 10px 0 0 0;">Check out our upcoming events</td></tr></table></td></tr></table></td></tr><tr><td bgcolor="#00C9A7" style="padding: 15px 15px 15px 15px;"><table border="0" cellpadding="0" cellspacing="0" width="100%%"><tr><td align="center"><table border="0" cellpadding="0" cellspacing="0"><tr><td><a href="https://www.facebook.com/groups/ordinarygoddesses/" target="_blank"><img src="http://www.ordinarygoddesses.com.au/img/facebook.svg" alt="Facebook" width="40" height="40" style="display: block;" border="0"/></a></td><td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td><td><a href="https://www.instagram.com/ordinarygoddesses/" target="_blank"><img src="http://www.ordinarygoddesses.com.au/img/instagram.svg" alt="Instagram" width="40" height="40" style="display: block;" border="0"/></a></td><td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td><td><a href="http://www.ordinarygoddesses.com.au" target="_blank"><img src="http://www.ordinarygoddesses.com.au/img/desktop.svg" alt="Website" width="40" height="40" style="display: block;" border="0"/></a></td></tr></table></td></tr><tr><td height="20"></td></tr><tr><td align="center" style="font-size:10pt; color: #DDDDDD">Icons by&nbsp;<a style="border:0px;" href="https://fontawesome.com/license/free" target="_blank"><img src="http://www.ordinarygoddesses.com.au/img/font-awesome.svg" alt="Font Awesome" width="14" height="14" style="display: inline-block;" border="0"/></a></td></tr></table></td></tr></table></td></tr></table></body></html>'
            })
            res.json({type: 'success', message: 'Test OK', result})
            return result
          } else {
            console.log(error)
            return res.status(500).json({type: 'error', message: 'DB error', error})
          }      
        })
      })
    return routes
  }
