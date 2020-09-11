//lets capture the video id
const axios = require('axios');

function getID(url) {
	var id = ''
	//if url is given
	if (url.includes('=')) {
		id = url.split('=')[1];
	}

	return id;
}
//let download the video
function download(response, req, qs, url) {
	var id = getID(url);
	//if id is not given
	console.trace(id);
	if (id == '') {
		return 0;
	}
	// "http://youtube.com/get_video_info?video_id=
	//request youtube to give us video info
	axios.get("http://youtube.com/get_video_info?video_id=" + id)
		.then(body => {
			// console.log(body.data);
			var data = qs.parse(body.data);
			var streams = data['url_encoded_fmt_stream_map'];
			streams = streams.split(',');
			// var streams = body.data.split(',');
			for (var i in streams) {
				var stream = streams[i];
				var dt = qs.parse(stream);
				const type = dt['type'];
				var quality = dt['quality'];
				//check the video type and quality we want, in this case MP4 and medium quality
				if (type.includes('video/mp4') && quality.includes('medium')) {
					//video link
					var link = dt['url'];
					//request video stream from youtube
					var stream = req.get(link);
					//video name
					var title = 'downloadeVideo.mp4';
					//stream video to client as a download
					response.writeHead(200, {
						'Content-Type': 'application/octet-stream',
						'Content-Disposition': 'attachment;filename=' + title
					});
					stream.pipe(response);
				}
			}
		})
		.catch(err => console.log(err))
}

module.exports.download = download;