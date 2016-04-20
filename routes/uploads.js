var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var uid = require('uid-safe');

// **** IMAGES ****
var imgs = [{imageName: 'mammooth', imageURL: '/uploads/mammooth.png', extension: '.png', created: 10000},
			{imageName: 'mammoth_back', imageURL: '/uploads/mammoth_back.png', extension:'.png', created: 9999},
			{imageName: 'mammoth_happy', imageURL: '/uploads/mammoth_happy.png', extension:'.png', created: 9998},
			{imageName: 'mammoth_seated', imageURL: '/uploads/mammoth_seated.png', extension:'.png', created: 9997},
		];

router.get('/all', (req, res) => {
	// Simulating server delay
	setTimeout(function() {
      res.json({ images: imgs});
    },500);
});

router.get('/images/getimage/:imageName', (req, res) => {
	let name = req.params.imageName;
	let foundImg = '';
	for (var i in imgs) {
  	if (imgs[i].imageName === name){
  		foundImg = imgs[i];
  		res.json(foundImg);
  		break;
  	}
	}
	if (foundImg === '') {
		res.status(404).send('Sorry cant find that!');	
	}
});

router.get('/getone', (req, res) => {
	let paramDate = req.query.created_before;
	var returnImages = [];

	if (paramDate == 'all') {
		for (var i = 0; i < 4; i++) {
			returnImages.push(imgs[i]);
		}
	} else{
		for (var i in imgs) {
  		if (imgs[i].created < req.query.created_before){
  			returnImages.push(imgs[i]);
  			break;
  		}
		}
		// simulate
		if (returnImages.length == 0) {
			simulateImageRetrieval(returnImages);	
		}
	}

	setTimeout(function() {
      res.json({ images: returnImages});
   	}, 1000);
});


function simulateImageRetrieval(returnImages){
	// generate random name for picture
	let name = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
	// make image older than oldest currently available image
	let fakeOldDate = imgs[imgs.length - 1].created - 1;
	let fakeImg = {imageName: name, imageURL: '/uploads/mammooth.png', extension: '.png', created: fakeOldDate};
	imgs.push(fakeImg);
	returnImages.push(fakeImg);
}


// **** COMMENTS ****
var comments = {
   	mammooth: { comments: [
  		{id: 1, author: 'Damien Hirst', text: 'I always feel like the art\'s there and I just see it, so its not really a lot of work.'},
 			{id: 2, author: 'Luke Maywalker', text: 'May the 4th be with you'}
 		]},
 		mammoth_back: { comments: [
  	{id: 1, author: 'Nick Nolte', text: 'The only people who ever called me a rebel were people who wanted me to do what they wanted.'},
 		{id: 2, author: 'George Best', text: 'I spent a lot of money on booze, birds and fast cars. The rest I just squandered.'}
 		]}
	};

// Comments ------------------

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
        return res.send(500, 'Something went wrong');
      }
    });
  });
	var x = '/uploads/' + str;
	imgs.unshift({imageName: str, imageURL: x, extension: '.png', created: Date.now()});
	res.json({ message: 'ok'});
});



module.exports = router;