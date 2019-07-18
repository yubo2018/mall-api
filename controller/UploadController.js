'use strict';

import fs from 'fs'
import multer from 'multer'
import formidable from 'formidable'

import baseComponent from '../prototype/baseComponent'

const chunkBasePath = '~uploads/';
const fileBasePath = 'uploads/';

class Upload extends baseComponent {
	constructor() {
		super()
		this.merge_chunks = this.merge_chunks.bind(this)
		this.upload_chunks = this.upload_chunks.bind(this)
	}
	async upload_chunks(req, res, next) {
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			// 创建chunk的目录
			// hash 是前端传递过来的
			const chunkTmpDir = chunkBasePath + fields.hash + '/';
			// 判断目录是否存在
			if (!fs.existsSync(chunkTmpDir)) fs.mkdirSync(chunkTmpDir);
			// 移动切片文件
			fs.renameSync(req.file.path, chunkTmpDir + fields.hash + '-' + fields.index);
			res.send(req.file);
		})
	}
	async merge_chunks(req, res, next) {
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			const total = fields.total;
			const hash = fields.hash;
			const saveDir = fileBasePath + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate() + '/';
			const savePath = saveDir + Date.now() + hash + '.' + fields.ext;
			const chunkDir = chunkBasePath + '/' + hash + '/';
			try {
				// 创建保存的文件夹(如果不存在)
				if (!fs.existsSync(saveDir)) fs.mkdirSync(saveDir);
				// 创建文件
				fs.writeFileSync(savePath, '');
				// 读取所有的chunks 文件名存放在数组中
				const chunks = fs.readdirSync(chunkBasePath + hash);
				// 检查切片数量是否正确
				if (chunks.length !== total || chunks.length === 0) return res.send({ code: -1, msg: '切片文件数量不符合' });
				for (let i = 0; i < total; i++) {
					// 追加写入到文件中
					fs.appendFileSync(savePath, fs.readFileSync(chunkDir + hash + '-' + i));
					// 删除本次使用的chunk
					fs.unlinkSync(chunkDir + hash + '-' + i);
				}
				// 删除chunk的文件夹
				fs.rmdirSync(chunkDir);
				// 返回uploads下的路径，不返回uploads
				res.json({ code: 0, msg: '文件上传成功', data: { path: savePath.split(fileBasePath)[savePath.split(fileBasePath).length - 1] } });
			} catch (err) {
				res.json({ code: -1, msg: '出现异常,上传失败' });
			}
		})
	}
}

export default new Upload()