var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var uid = require('uid-safe');

var imgs = [{imageName: 'MammothNormal', imageURL: '/uploads/mammooth.png'},
			{imageName: 'MammothBack', imageURL: '/uploads/mammoth_back.png'},
			{imageName: 'MammothHappy', imageURL: '/uploads/mammoth_happy.png'},
			{imageName: 'MammothSeated', imageURL: '/uploads/mammoth_seated.png'},
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
	console.log('files received');

	var tempPath = req.files[0].path;
	var str = uid.sync(7);
	var extension = req.files[0].originalname.split('.').pop();
	console.log(str);
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
	imgs.push({imageName: str, imageURL: x});
	res.json({ message: 'ok'});
});

router.post('/upload/:image_id', (req, res) => {

  res.json({ message: 'One Image added', name: req.params.image_id });
});



router.delete('/:image_id', (req, res) => {
  res.json({ message: 'Successfully deleted' });
});



module.exports = router;