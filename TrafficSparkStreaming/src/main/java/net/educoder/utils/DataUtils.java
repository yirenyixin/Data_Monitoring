package net.educoder.utils;

import com.alibaba.fastjson.JSON;
import java.util.Random;
import java.util.UUID;

public class DataUtils {
    public static int randomNumInRange(int min, int max) {
        Random random = new Random();
        int i = random.nextInt(max);
        while (i < min) {
            i = random.nextInt(max);
        }
        return i;
    }

    public static String createData() {
        int[] carArr = {1, 2, 3, 4, 5};
        int[] faultArr = {0, 1, 2, 3, 4};
        Random random = new Random();
        String id = UUID.randomUUID().toString();
        int car = carArr[random.nextInt(carArr.length)];
        int fault = faultArr[random.nextInt(faultArr.length)];
        Double[] position = {-random.nextDouble() * 16, random.nextDouble() * random.nextInt(100)};
        String s = JSON.toJSONString(position);
        int warning = random.nextInt(2);
        int speed = 0;
        if (fault == 0 || fault == 1) {
            speed = randomNumInRange(10, 200);
        }
        String str = id + "\t" + car + "\t" + s + "\t" + warning + "\t" + fault + "\t" + speed + "\t" + System.currentTimeMillis();
        return str;
    }
}
