var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var uid = require('uid-safe');

var imgs = [{imageName: 'mammooth.png', imageURL: '/uploads/mammooth.png', extension: '.png'},
			{imageName: 'mammoth_back.png', imageURL: '/uploads/mammoth_back.png', extension:'.png'},
			{imageName: 'mammoth_happy.png', imageURL: '/uploads/mammoth_happy.png', extension:'.png'},
			{imageName: 'mammoth_seated.png', imageURL: '/uploads/mammoth_seated.png', extension:'.png'},
		];

router.get('/single/:image_id', (req, res) => {
	res.json({ images: 
		[{imageName: req.params.image_id, imageURL: '/img/mammooth.png'},
		]});
});

router.get('/all', (req, res) => {
	res.json({ images: imgs});
});


router.post('/upload',  (req, res) => {

	var tempPath = req.files[0].path;
	var str = uid.sync(7);
	var extension = req.files[0].originalname.split('.').pop();
	console.log('files received: ' + str);
	str = str + '.' + extension;
	var TARGET_PATH = path.resolve(__dirname, '../public/uploads/');
	var targetPath = path.join(TARGET_PATH, str);
  
  is = fs.createReadStream(tempPath);
  os = fs.createWriteStream(targetPath);
  is.pipe(os);
  // file write error
  is.on('error', function(err) {
      if (err) {
        console.log(err);
      }
    });
	// file end
	is.on('end', function() {
  //delete file from temp folder
    fs.unlink(tempPath, function(err) {
      if (err) {
        return res.send(500, 'Something went wrong');
      }
    });
  });
	var x = '/uploads/' + str;
	imgs.push({imageName: str, imageURL: x, extension: '.png'});
	res.json({ message: 'ok'});
});

router.get('/images/:image_id', (req, res) => {
	console.log(req.originalUrl);

	
	var imgUrl = req.protocol + '://' + req.get('host') + '/uploads/' + req.params.image_id + '.png'; 
	const html = `
    <!DOCTYPE html>
    <html>
     <head>
     <title>Isomorphimg</title>
		 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">	
     </head>
     <body>
     <h1>Image Page</h1>
     <div id="app"><img src=${imgUrl} /></div>
     </body>
    </html>
  `;
  // send to the browser
  res.send(html);
});



router.delete('/:image_id', (req, res) => {
  res.json({ message: 'Successfully deleted' });
});



module.exports = router;