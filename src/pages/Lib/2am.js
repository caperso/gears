/**
 * @description 2am 个人js库
 * @author Caper
 * @date 2019-06-02 15:03:58
 * @usage 直接复制模块
 */


 // 根据字符串直接生成dom对象,自动补全
 `<div class=""><p><span></span></p></div>`

// axios post
function post(path, data, config) {
    if (!config) config = {}
    if (!config.headers) {
        config.headers = {
            'Content-Type': 'application/json',
            Authorization: '' // as TOKEN
        }
    } else {
        config.headers['Content-Type'] = 'application/json'
        config.headers['Authorization'] = '' // authorizationToken
    }

    if (!data) data = {}
    data = JSON.stringify(data) // 看服务端需求来 字符串化

    return new Promise((resolve, reject) => {
        axios
            .post(`${path}`, data, config) // 本身就是一个promise
            .then(res => {
                // 此块高度自由化 根据服务端返回的数据格式自定义
                if (res.result) resolve(res.data)
                else reject(res)
            }).catch(e => console.log('网络请求出错', e))
    })
}


// 拆解url
class disarmUrl {
    constructor(url) {
        // 折开http/https   
        // 折开domain域名
        // 折开url参数
    }
}


// 合并上下文的text,刷新内部index,
records.forEach((item, index) => {
    const record = records[index]
    let length = records.length
    if (record.type === 0) {
        for (let next = index + 1; next < length; next) {
            const nextRecord = records[next]
            if (nextRecord.type === 0) {
                record.content.text = record.content.text.concat(
                    `\n${nextRecord.content.text}`
                )
                records.splice(next, 1)
                length = records.length
            } else break
        }
    }
})
// 设定内容


class holidayMoment {
    // 配合momentjs或者是别的
    // 建立节假日剔除的日期接口js
    // 可参考 https://www.cnblogs.com/webSong/p/9342498.html
}

class getParentObject {
    // 我在函数中指定了 target = this.records[index].content.items[order]
    // 目标是 依靠target拿到 父对象 也就是items的内容,是否可行? 或是没必要?
}

class FileHandle {
    // 粗代码
    // 伪代码
}
/**
 * @description: 处理文件的打包,上传,分类处理等
 * @author: caper
 * @date 2019-06-05 11:27:10
 */

/**
 * @function fileHandle
 * @description  处理文件上传,插入(文件设置Dom文件框,图片则直接插入)
 * @param {Object} file 当前文件对象
 * @param {Object} editor 当前编辑器对象
 * @date 2019-05-29 17:23:09
 */
async function fileHandle(file) {
    const isImage = /^image/.test(file.type)
    const fileName = file.name.slice(0, file.name.indexOf('.'))
    const fileExt = file.name.slice(file.name.indexOf('.'))
    const fileSizeString =
        file.size / 1024 > 1000 ?
        `${(file.size / 1024 / 1024).toFixed(2)} M` :
        `${(file.size / 1024).toFixed(2)} K`
    // 上传数据包
    let dataPackage = {
        base64: '',
        path: isImage ? 'image' : 'file', // 服务器文件路径
        filename: fileName,
        fileext: fileExt
    }
    let fileInfo = {
        type: isImage ? 'image' : 'file',
        name: fileName,
        ext: fileExt,
        sizeString: fileSizeString
    }
    // 上传回声
    let response = {}
    try {
        dataPackage.base64 = await readFile(file)
    } catch {
        return console.log('文件无内容')
    }
    try {
        response = await WorkLogService.post('User/UploadFile', dataPackage)
    } catch {
        return console.log('传输出错')
    }
    console.log('文件处理完毕,地址:%s', response.url)
    return {
        url: response.url,
        fileInfo
    }
}

/**
 * @function readFile
 * @description 解析文件:无内容则返回,有内容裁剪至base64字段起始点
 * @date 2019-05-30 10:43:23
 */
function readFile(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = function () {
            if (this.result === 'data:') reject(alert('这是个空文件'))
            let data = this.result.slice(this.result.indexOf(',') + 1)
            resolve(data)
        }
        reader.readAsDataURL(file)
    })
}

/**
 * @function fileDomGenerator
 * @description 文件链接的dom生成(针对文件)
 * @param file 文件对象 {file.url:必须,file.name,file.ext.file.sizeString}
 * @param cb 回调函数,用于传入删除函数
 * @date 2019-05-29 17:23:09
 */
function fileDomGenerator(file, cb) {
    if (!file.url) return console.warn('该文件不包含url地址,无法生成文件DOM')
    let $file = document.createElement('div')
    let $icon = document.createElement('span')
    let $info = document.createElement('span')
    let $name = document.createElement('span')
    let $size = document.createElement('span')
    let $download = document.createElement('a')

    $name.innerText = file.name || '文件'
    $size.innerText = file.sizeString || '大小未知'

    let iconName = ''
    switch (file.ext) {
        case '.xls':
        case '.xlsx':
        case '.xlsm':
            iconName = 'icon-excel'
            break
        case '.doc':
        case '.docx':
            iconName = 'icon-word'
            break
        case '.ppt':
        case '.pptx':
            iconName = 'icon-ppt'
            break
        case '.pdf':
            iconName = 'icon-pdf'
            break
        case '.txt':
            iconName = 'icon-txt'
            break
        case '.jpg':
            iconName = 'icon-pic'
            break
        default:
            iconName = 'icon-unknown-type'
            break
    }

    $icon.classList.add('file-icon', 'iconfont', iconName)
    $file.classList.add('log-file')
    $info.classList.add('file-info')
    $name.classList.add('file-name')
    $size.classList.add('file-size')
    $download.classList.add('file-icon', 'iconfont', 'icon-down-load')
    $download.setAttribute('href', file.url) // 超链接文件
    $file.setAttribute('download', `${file.name}${file.ext}`)
    $file.setAttribute('contenteditable', 'false') // 禁止编辑内容
    // url = url.replace(/^(https:\/\/)|^(http:\/\/)/gi, '') // 去除https保证强制下载

    $info.appendChild($name)
    $info.appendChild($size)
    $file.appendChild($icon)
    $file.appendChild($info)
    $file.appendChild($download)

    if (cb) {
        let $remove = document.createElement('span')
        $remove.classList.add('file-icon', 'iconfont', 'icon-close')
        $remove.setAttribute('data-url', file.url)
        $remove.addEventListener('click', cb)
        $file.appendChild($remove)
    }
    // 扩展:如何简单添加一个dom块并可轻松删掉它
    return $file
}

// 图片压缩





























































/**
 * @part 第三方
 * @description
 * @content 
 * ```
 * 1.lodash.js 很多方法不熟,注意es6,或者es future有替换的
 * 注意, 很多lodash之类的库只是简化了你的工作,但是对算法和数据结构一点好处都没
 * 2.moment.js 可以熟悉下源码,和你一般实现时间的方式区别在哪
 * ```
 * @date 2019-06-02 15:05:13
 */
// import _ from 'https://cdn.bootcss.com/lodash.js/4.17.12-pre/lodash.core.js'
// _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);

// import moment from './openlibs/moment.js'
