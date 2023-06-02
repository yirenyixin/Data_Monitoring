package net.educoder.app.utils;

import java.util.Random;

public class DataUtils {

    static int CountNum = 23595932;

    public static int randomNumInRange(int min, int max) {
        Random random = new Random();
        int i = random.nextInt(max);
        while (i < min) {
            i = random.nextInt(max);
        }
        return i;
    }

    public static int getCarCount() {
        Random random = new Random();
        CountNum = CountNum + random.nextInt(1000);
        return CountNum;
    }

    public static String randomData() {
        //   在线数、活跃数、致命故障数量、严重故障数量、一般故障数量、轻微故障数量、房车报警数量、旅行车报警数量、桥跑车报警数量、跑车报警数量、敞篷车报警数量
        Random random = new Random();
        int onlineNum = random.nextInt(10000000);
        int activeNum = random.nextInt(10000000);
        while (onlineNum < 1000000 || onlineNum > 23595932) {
            onlineNum = random.nextInt(10000000);
        }
        while (activeNum < 1000000 || activeNum > 10000000 || activeNum > onlineNum) {
            activeNum = Integer.parseInt(random.nextInt(100000000) + "");
        }
        String result = onlineNum + "," + activeNum + "," + randomNumInRange(10000, 100000) + "," + randomNumInRange(10000, 100000) + "," +
                randomNumInRange(10000, 100000) + "," + randomNumInRange(10000, 100000) + "," + randomNumInRange(10000, 100000) + "," + randomNumInRange(10000, 100000)
                + "," + randomNumInRange(10000, 100000) + "," + randomNumInRange(10000, 100000) + "," + randomNumInRange(10000, 100000);
        return result;
    }


}
