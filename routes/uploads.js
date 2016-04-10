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


router.get('/all', (req, res) => {
	res.json({ images: imgs});
});

var comments = {
   	mammooth: { comments: [
  		{id: 1, author: 'Pete Hunt', text: 'This is one comment'},
 			{id: 2, author: 'Jordan Walke', text: 'This is *another* comment'}
 		]},
 		mammoth_back: { comments: [
  	{id: 1, author: 'Jerry Jones', text: 'First comment'},
 		{id: 2, author: 'Jordan James', text: 'Second comment'}
 		]}
	};

router.get('/comments/:imageName', (req, res) => {
	let name = req.params.imageName;
  res.json(comments[name]);
});

router.post('/comments/:imageName', (req, res) => {
	let jsonobj = JSON.parse(req.body.comments);
	let imageName = req.params.imageName;
	if (imageName in comments) {
		jsonobj.id = Object.keys(comments[imageName].comments).length + 1;
		comments[imageName].comments.push(jsonobj);	
	} else{
		
		jsonobj.id = 1;
		comments[imageName] = {comments: [jsonobj]};
	}

	res.json({ message: 'ok'});
});


router.post('/upload',  (req, res) => {
	var tempPath = req.files[0].path;
	var str = uid.sync(7);
	var extension = req.files[0].originalname.split('.').pop();
	console.log('files received: ' + str);
	str = str + '.' + extension;
	var TARGET_PATH = path.resolve(__dirname, '../public/uploads/');
	var targetPath = path.join(TARGET_PATH, str);
  
  var is = fs.createReadStream(tempPath);
  var os = fs.createWriteStream(targetPath);
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
      	console.log('fuck');
        return res.send(500, 'Something went wrong');
      }
    });
  });
	var x = '/uploads/' + str;
	imgs.push({imageName: str, imageURL: x, extension: '.png'});
	res.json({ message: 'ok'});
});



module.exports = router;