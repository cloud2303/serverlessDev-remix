/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: "app",
  browserBuildDirectory: "public/build",
  publicPath: "/build/", 
  //publicpath设置为存储桶的地址+build文件夹
  //比如：http://{存储桶名字}.oss-cn-hangzhou.aliyuncs.com/build/
  serverBuildDirectory: "server/build",
  devServerPort: 8002
};