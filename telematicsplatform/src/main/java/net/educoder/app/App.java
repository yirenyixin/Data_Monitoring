package net.educoder.app;

import net.educoder.app.utils.KafkaProducer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class App {

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
        new Thread(new KafkaProducer()).start();
    }

}
