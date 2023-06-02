#/bin/bash

cd TrafficSparkStreaming

mvn clean package  -Dmaven.test.skip=true > /root/info.log

cat /root/info.log | grep "ERROR" > /root/error.log

if test -s /root/error.log; then
    cat /root/error.log
else
    cp target/TrafficSparkStreaming-1.0-SNAPSHOT.jar /root
	nohup java -cp /root/TrafficSparkStreaming-1.0-SNAPSHOT.jar net.educoder.utils.kafkaProduce >/dev/null  2>&1 &
	nohup /opt/spark/dist/bin/spark-submit --packages org.apache.spark:spark-sql-kafka-0-10_2.11:2.2.0 --class net.educoder.spark.KafkaSparkStreaming /root/TrafficSparkStreaming-1.0-SNAPSHOT.jar  >/root/spark.log 2>&1 &
	java -cp /root/TrafficSparkStreaming-1.0-SNAPSHOT.jar net.educoder.utils.KafkaClient >/root/1.log 2>&1
	cat /root/result.log
    ps -efww|grep -w 'kafkaProduce'|grep -v grep|cut -c 9-15|xargs kill
    ps -efww|grep -w 'SparkSubmit'|grep -v grep|cut -c 9-15|xargs kill
fi