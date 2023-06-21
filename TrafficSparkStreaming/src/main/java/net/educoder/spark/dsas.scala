package net.educoder.spark

import org.apache.spark.sql.SparkSession

object KafkaSparkStreaming {
  def main(args: Array[String]): Unit = {
    val spark = SparkSession.builder().master("local").appName("demo").getOrCreate()
    spark.sparkContext.setLogLevel("error")

    /** ******begin *********/
    val df = spark
      .readStream
      .format("kafka")
      .option("kafka.bootstrap.servers", "host1:port1,host2:port2")
      .option("subscribe", "topic1")
      .load()
    val frame=df.selectExpr("CAST(value AS STRING)")

        import spark.implicits._
    //map是Spark Streaming中DataFrame API中的一个转换操作，用于将输入数据集中的每个元素x进行映射转换为另一个类型的元素。
    //frame.as[String]表示将DataFrame转换为字符串类型的Dataset[Strng]，然后使用map对其中的每个字符串进行处理，最终生成一个新的Dataset[Event]类型的query对象
        val query = frame.as[String].map(x => {

          val arr = x.split("\t")
          val carType = arr(1).toInt
          val warning = arr(3).toInt
          val fault = arr(4).toInt
          val speed = arr(5).toInt
          //  在线数、活跃数、致命故障数量、严重故障数量、一般故障数量、轻微故障数量、房车报警数量、旅行车报警数量、桥跑车报警数量、跑车报警数量、敞篷车报警数量
          val online = 1
          val activeCount = if (speed > 0) 1 else 0
          val fault_4 = if (fault == 4) 1 else 0
          val fault_3 = if (fault == 3) 1 else 0
          val fault_2 = if (fault == 2) 1 else 0
          val fault_1 = if (fault == 1) 1 else 0
          val warning_5 = if (warning == 1 || carType == 5) 1 else 0
          val warning_4 = if (warning == 1 || carType == 4) 1 else 0
          val warning_3 = if (warning == 1 || carType == 3) 1 else 0
          val warning_2 = if (warning == 1 || carType == 2) 1 else 0
          val warning_1 = if (warning == 1 || carType == 1) 1 else 0
          event(online, activeCount, fault_4, fault_3, fault_2, fault_1, warning_5, warning_4, warning_3, warning_2, warning_1, 0)
        })
    //query是一个Dataset[Event]对象,使用groupBy按照flag字段进行分组操作
    //map将结果转换成字符串格式,sum函数对各个指标字段求和
        query.groupBy("flag")
          .sum("onlineCount", "activeCount", "fault_4", "fault_3", "fault_2", "fault_1", "warning_4", "warning_4", "warning_3", "warning_2", "warning_1")
          .map(x => {
            var result = ""
            for (i <- 1 to 11) {
              result = result + x.get(i) + ","
            }
            result.substring(0, result.length - 1)
          })
          .writeStream.outputMode("complete")
          .format("kafka")
          .option("kafka.bootstrap.servers", "127.0.0.1:9092")
          .option("checkpointLocation", "/root/sparkStreming")
          .option("topic", "demo2")
          .start().awaitTermination()//start()方法开启流式计算操作，并阻塞等待直到计算完成




    /** ******end *********/

  }

  //  在线数、活跃数、致命故障数量、严重故障数量、一般故障数量、轻微故障数量、房车报警数量、旅行车报警数量、桥跑车报警数量、跑车报警数量、敞篷车报警数量
  case class event(onlineCount: Int, activeCount: Int, fault_4: Int, fault_3: Int, fault_2: Int, fault_1: Int, warning_5: Int, warning_4: Int, warning_3: Int, warning_2: Int, warning_1: Int, flag: Int)

}
