'use-strict';

var config = require('./config.js')();

var src = config.root + config.src;
var dest = config.root + config.dist;

module.exports = {
	to: {
		src: config.src,
        dist: config.dist,
		pug: {
			in: src +  config.views + '*.pug',
			out: dest
		},
		sass: {
			in: src + config.sass,
			out: dest + config.css
		},
		js: {
			in: src + config.js + '/**/*.js',
			out: dest + 'assets/' + config.js
		},
		images: {
			in: src + config.images + '/**/*.*',
			out: dest + config.images
        },
       	vendors: {
       		in: src + config.vendors,
       		out: dest + config.vendors
       	},
		favicon: {
			in: src + config.favicon,
			out: dest
		}
	}
};