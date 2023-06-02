package net.educoder.app.utils;
import com.alibaba.fastjson.JSON;
import net.educoder.app.entity.Event;
import net.educoder.app.service.WebSocketServer;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import javax.websocket.Session;
import java.io.IOException;
import java.util.Arrays;
import java.util.Properties;
public class kafkaClient implements Runnable {
    private Session session;
    public kafkaClient(Session session) {
        this.session = session;
    }
    /********** begin **********/
    @Override
    public void run() {
        // 1. 创建 Properties 对象
        Properties props = new Properties();
        // 2. 配置连接 kafka 的参数
        /**
         *      bootstrap.servers:127.0.0.1:9092
         *      group.id:my_group
         *      enable.auto.commit:true
         *      auto.commit.interval.ms:1000
         *      key.deserializer:org.apache.kafka.common.serialization.StringDeserializer
         *      value.deserializer:org.apache.kafka.common.serialization.StringDeserializer
         */
        props.put("bootstrap.servers", "127.0.0.1:9092");
        props.put("group.id", "my_group");
        props.put("enable.auto.commit", "true");
        props.put("auto.commit.interval.ms", "1000");
        props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        //3. 创建 KafkaConsumer 对象
        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);
        //4. 订阅名为 demo2 的 topic
        consumer.subscribe(Arrays.asList("demo2"));
        //5. 死循环，不断消费订阅的数据
        while (true) {
            //6. 使用 KafkaConsumer 拉取数据
            ConsumerRecords<String, String> records = consumer.poll(100);
            //7. 遍历数据，将数据封装到 Event 对象中，使用 fastjson 将 Event 对象转换成 JSON 字符串，最后调用 session.getBasicRemote().sendText(String msg); 将数据推送到前端页面
            /**
             *
             * kafka消费的数据如下：
             *      在线数,活跃数,致命故障数量,严重故障数量,一般故障数量,轻微故障数量,房车报警数量,旅行车报警数量,桥跑车报警数量,跑车报警数量,敞篷车报警数量
             *      3608335,1802435,25809,63260,15879,38612,77507,29697,10542,67913,42963
             *      1745818,1365579,29449,46912,58208,29464,46830,55611,90398,94499,89332
             *      3768443,2243235,32830,12980,26930,61768,44310,20354,11672,91021,52017
             *
             *
             *  Event对象属性如下：
             *          private String onlineCount;     在线数
             *          private String activeCount;     活跃数
             *          private String fault4Count;     致命故障数量
             *          private String fault3Count;     严重故障数量
             *          private String fault2Count;     一般故障数量
             *          private String fault1Count;     轻微故障数量
             *          private String warning5Count;   房车报警数量
             *          private String warning4Count;   旅行车报警数量
             *          private String warning3Count;   桥跑车报警数量
             *          private String warning2Count;   跑车报警数量
             *          private String warning1Count;   敞篷车报警数量
             *
             *  Event 对象有参构造如下：
             *      public Event(String onlineCount, String activeCount, String fault4Count, String fault3Count, String fault2Count, String fault1Count, String warning5Count, String warning4Count, String warning3Count, String warning2Count, String warning1Count){....}
             *
             */
            for (ConsumerRecord<String, String> record : records) {
                String value = record.value();
                String[] arr = value.split(",");
                if (arr.length == 11) {
                    //   在线数、活跃数、致命故障数量、严重故障数量、一般故障数量、轻微故障数量、房车报警数量、旅行车报警数量、桥跑车报警数量、跑车报警数量、敞篷车报警数量
                    Event event = new Event(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[8], arr[9], arr[10]);
                    String s = JSON.toJSONString(event);
                    try {
                        session.getBasicRemote().sendText(s);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }
    /********** end **********/
}