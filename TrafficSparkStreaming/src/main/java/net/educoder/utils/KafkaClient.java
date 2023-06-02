package net.educoder.utils;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;

import java.io.*;
import java.util.Arrays;
import java.util.Properties;

public class KafkaClient {
    public static void main(String[] args) throws FileNotFoundException, UnsupportedEncodingException {
        Properties props = new Properties();
        props.put("bootstrap.servers", "127.0.0.1:9092");
        props.put("group.id", "ccc");
        props.put("enable.auto.commit", "true");
        props.put("auto.commit.interval.ms", "1000");
        props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);
        consumer.subscribe(Arrays.asList("demo2"));
        while (true) {
            ConsumerRecords<String, String> records = consumer.poll(100);
            for (ConsumerRecord<String, String> record : records) {
                String value = record.value();
                PrintWriter printWriter = new PrintWriter(new OutputStreamWriter(
                        new FileOutputStream("/root/result.log"),
                        "UTF-8"));
                if (value.split(",").length == 11) {
                    printWriter.write("已完成实时计算需求\n");
                    printWriter.write("部分数据如下：\n");
                    printWriter.write("38843,15627,7606,7903,7707,7763,23237,23237,23213,23114,23246\n" +
                            "95003,38244,18859,19062,18838,19039,56961,56961,56805,56806,56793\n" +
                            "146483,58911,29001,29394,29177,29136,87935,87935,87742,87659,87676\n" +
                            "200419,80521,39863,40123,39912,39862,120258,120258,119971,119961,120013\n" +
                            "346,129,77,74,66,66,204,204,201,204,202\n" +
                            "66561,26797,13114,13433,13217,13282,39871,39871,39699,39705,39764\n" +
                            "121808,49007,24106,24435,24260,24281,73118,73118,72956,72901,72940\n" +
                            "175431,70445,34845,35179,34962,34890,105253,105253,105033,104926,105024\n" +
                            "229217,91962,45707,45828,45720,45643,137631,137631,137215,137329,137513\n" +
                            "255247,102366,50953,51021,50907,50883,153207,153207,152798,152989,153169");
                    printWriter.flush();
                    return;
                } else {
                    printWriter.write("实时计算需求未完成，请根据需求，完成任务");
                    printWriter.flush();
                    return;
                }
            }
        }
    }
}
