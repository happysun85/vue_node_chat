<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="code"
      label="卡号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="createdAt"
      label="消费时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="消费地点">
    </el-table-column>
    <el-table-column
      prop="amount"
      label="消费次数">
    </el-table-column>
    <el-table-column
      prop="total"
      label="消费金额">
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: 'zyb',
  data(){
    return {
      tableData: [
        {
          code: 1001,
          createdAt: '2017-6-23',
          address: '巴中',
          amount: '30次',
          total: '5683元'
        },
        {
          code: 1002,
          createdAt: '2017-6-23',
          address: '巴中',
          amount: '20次',
          total: '3283元'
        },
        {
          code: 1003,
          createdAt: '2017-6-23',
          address: '成都',
          amount: '60次',
          total: '8383元'
        }
      ]
    }
  }

}
</script>
<style scoped>
</style>
