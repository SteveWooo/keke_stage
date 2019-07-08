/**
* 保持检查perBlock的状况：
* 如果同样的块超过2/3个总节点数，就删除，写入最新区块数据中。
* 如果perBlock存在时间超过N秒，则删除（测试N=10就可以了）
*/
module.exports = async function(swc, options){

}