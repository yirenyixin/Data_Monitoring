package net.educoder.app;

import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest;

//@RunWith(SpringRunner.class)
@SpringBootTest
public class AppTests {

    @Test
    public void contextLoads() {
        int runningNum = 84660286;
        if (runningNum < 1000000 || runningNum > 10000000) {
            System.out.println("ss");
        }
    }

}
